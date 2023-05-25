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

@api.route('/login', methods=['POST'])
def user_login():
    user_username = request.json.get("username")
    user_password = request.json.get("password")
    user = User.query.filter_by(username=user_username).first()
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