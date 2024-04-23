from flask import Blueprint, jsonify

helloworld_bp = Blueprint('helloworld', __name__)

@helloworld_bp.route("/", methods=["GET"])
def helloworld():
    return jsonify({'message' : 'Hello, world!'}), 200