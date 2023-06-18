from flask_sqlalchemy import SQLAlchemy
from firebase_admin import storage
import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=True)
    last_name = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    security_question = db.Column(db.String(100), unique=False, nullable=False)
    security_answer = db.Column(db.String(150), unique=False, nullable=False)
    profile_pic = db.Column(db.String(150))

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        bucket = storage.bucket(name = "cookbook-ai.appspot.com")
        if(self.profile_pic != None):
            resource = bucket.blob(self.profile_pic)
            picture_url = resource.generate_signed_url(version = "v4", expiration = datetime.timedelta(minutes=15), method = "GET")
        else:
            picture_url = ""
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_active": self.is_active,
            "is_admin": self.is_admin,
            "security_question": self.security_question,
            "security_answer": self.security_answer,
            "profile_pic": picture_url
            # do not serialize the password, its a security breach
        }


class TokenBlockedList(db.Model):
    __tablename__ = "token_blocked_list"
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(40), nullable=False)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=False)

    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
            # do not serialize the password, its a security breach
        }


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5000), unique=True, nullable=False)
    description = db.Column(db.String(8000), unique=False, nullable=False)
    ingredients = db.Column(db.String(10000), unique=False)
    elaboration = db.Column(db.String(10000), unique=False)
    image = db.Column(db.String(8000), unique=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_recommended = db.Column(db.Boolean(), unique=False, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    category = db.relationship(Category)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)


    def __repr__(self):
        return f'<Recipe {self.name}>'

    def serialize(self):
        bucket = storage.bucket(name = "cookbook-ai.appspot.com")
        if(self.image != None):
            resource = bucket.blob(self.image)
            recipe_picture_url = resource.generate_signed_url(version = "v4", expiration = datetime.timedelta(minutes=15), method = "GET")
        else:
            recipe_picture_url = ""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": recipe_picture_url,
            "ingredients": self.ingredients,
            "elaboration": self.elaboration,
            "user_id": self.user.id,
            "user_first_name": self.user.first_name
            # do not serialize the password, its a security breach
        }


class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    recipe = db.relationship(Recipe)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)

    def __repr__(self):
        return f'<Favorite {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_firstname": self.user.first_name,
            "user_lastname": self.user.last_name,
            "user_email": self.user.email,
            "recipe_id": self.recipe_id,
            "recipe_name": self.recipe.name,
            "recipe_description": self.recipe.description,
            "recipe_elaboration": self.recipe.elaboration,
            "recipe_image": self.recipe.image
            # do not serialize the password, its a security breach
        }