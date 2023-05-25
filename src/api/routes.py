"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)

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
    return jsonify({"accessToken": access_token})

@api.route('/passwordRecovery', methods=['POST'])
def user_password_recovery():
    user_email = request.json.get("email")
    user_password = request.json.get("password")
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
    secure_password = bcrypt.generate_password_hash(user_password, rounds=None).decode("utf-8")
    user = User(email=user_email, password=secure_password, is_active=True, security_question=user_security_question, security_answer=user_security_answer)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/helloprotected', methods=['GET'])
@jwt_required()
def hello_protected_get():
    user_id = get_jwt_identity()
    return jsonify({"userId": user_id, "msg": "hello protected route"})