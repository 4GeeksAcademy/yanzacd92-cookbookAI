"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Recipe, Category
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
import openai
import json

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)

# Register an user
@api.route('/signup', methods=['POST'])
def user_create():
    data = request.get_json()
    new_user = User.query.filter_by(email=data["email"]).first()
    if(new_user is not None):
        return jsonify({
            "message": "Registered user"
        }), 400
    secure_password = bcrypt.generate_password_hash(data["password"], rounds=None).decode("utf-8")
    new_user = User(email=data["email"], password=secure_password, is_active=True, security_question=data["security_question"],security_answer=data["security_answer"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# Allow to login into the application
@api.route('/login', methods=['POST'])
def user_login():
    user_email = request.json.get("email")
    user_password = request.json.get("password")
    user = User.query.filter_by(email=user_email).first()
    if(user is None):
        return jsonify({
            "message": "User not found"
        }), 401
    # verify password
    if not bcrypt.check_password_hash(user.password, user_password):
        return jsonify({"message": "Wrong password"}), 401
    
    # generate token
    access_token = create_access_token(identity = user.id)
    return jsonify({"accessToken": access_token, "id": user.id})

# Recovery the password
@api.route('/passwordRecovery', methods=['PUT'])
def user_password_recovery():
    user_email = request.json.get("email")
    user_new_password = request.json.get("new_password")
    user_security_question = request.json.get("security_question")
    user_security_answer = request.json.get("security_answer")
    user = User.query.filter_by(email=user_email).first()
    if(user is None):
        return jsonify({
            "message": "User not found"
        }), 401
    # verify security question and security answer
    if not (user_security_question == user.security_question and user_security_answer == user.security_answer):
        return jsonify({"message": "Security question and answer do not match"}), 401
    
    # change password
    secure_password = bcrypt.generate_password_hash(user_new_password, rounds=None).decode("utf-8")
    user.password = secure_password

    db.session.commit()
    return jsonify(user.serialize()), 200

# Deactivate an user by ID
@api.route("/deleteUser/<int:userId>", methods=["DELETE"])
def user_delete(userId):
    user = User.query.get(str(userId))
    if(user is None):
        return jsonify({
            "message": "User not found"
        }), 400
    db.session.delete(user)
    db.session.commit()

    return jsonify(user.serialize()), 200

# Add a new category
@api.route('/addCategory', methods=['POST'])
def category_create():
    data = request.get_json()

    new_category = Category(
        name=data["name"], description=data["description"]
    )
    db.session.add(new_category)
    db.session.commit()
    return jsonify(new_category.serialize()), 201

# Show the all categories
@api.route('/showCategories', methods=['GET'])
def category_show_all():
    get_categories = Category.query.all()
    #category_schema = Category(many=True)
    #categories = json.dumps(get_categories)
    return jsonify({"categories": str(get_categories)})

# Show a single category by ID
@api.route('/showCategory/<int:categoryId>', methods=['GET'])
def category_show_by_id(categoryId):
    category = Category.query.filter_by(id=categoryId).first()
    if(category is None):
        return jsonify({
            "message": "Category does not exist"
        }), 400
    return jsonify({"category": category.serialize()}), 200

# Show the all recipes
@api.route('/showRecipes', methods=['GET'])
def recipes_all_show():
    recipes = Recipe.query.all()
    return jsonify({"recipes": str(recipes)}), 200

# Show the all recipes into a specific category by ID
@api.route('/showRecipes/<int:categoryId>', methods=['GET'])
def recipes_by_category_show(categoryId):
    recipe = Recipe.query.filter_by(category_id=categoryId).all()
    print("RECIPE: " + str(recipe))
    if(recipe is None):
        return jsonify({
            "message": "Recipe does not exist with this category"
        }), 400
    return jsonify({"recipes": str(recipe)}), 201

# Edit a specific recipe by ID
@api.route('/updateRecipe/<int:recipeId>', methods=['PUT'])
def recipe_update(recipeId):
    data = request.get_json()
    updated_recipe = Recipe.query.filter(id=recipeId).first()
    updated_recipe["name"] = data["name"]
    updated_recipe["description"] = data["description"]
    updated_recipe["is_active"] = data["is_active"]
    updated_recipe["elaboration"] = data["elaboration"]
    updated_recipe["image"] = data["image"]
    updated_recipe["category_id"] = data["category_id"]

    db.session.commit()
    return jsonify(updated_recipe.serialize()), 200

# Add recipe with the information
@api.route('/addRecipe', methods=['POST'])
def recipe_create():
    data = request.get_json()

    new_recipe = Recipe(
        name=data["name"], description=data["description"], is_active=True,
        elaboration=data["elaboration"], image=data["image"], category_id=data["category_id"],
        user_id=data["user_id"]
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify(new_recipe.serialize()), 201

@api.route("/deleteRecipe/<int:recipeId>", methods=["DELETE"])
def recipe_delete(recipeId):
    recipe = Recipe.query.get(recipeId)
    db.session.delete(recipe)
    db.session.commit()

    return jsonify(recipe.serialize()), 200

@api.route('/call-chatGPT', methods=['GET'])
def generateChatResponse(prompt):
    return call_chatGPTApi(prompt)

@api.route('/helloprotected', methods=['GET'])
@jwt_required()
def hello_protected_get():
    user_id = get_jwt_identity()
    return jsonify({"userId": user_id, "msg": "hello protected route"})


def call_chatGPTApi(prompt):
    messages = []
    messages.append({"role": "system", "content": "Your name is Karabo. You are a helpful assistant."})
    question = {}
    question['role'] = 'user'
    question['content'] = prompt
    messages.append(question)
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=messages)
    try:
        answer = response['choices'][0]['message']['content'].replace('\n', '<br>')
    except:
        answer = 'Oops you beat the AI, try a different question, if the problem persists, come back later.'
    return answer