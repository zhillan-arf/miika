from flask import Blueprint, jsonify

cossim_bp = Blueprint('cossim', __name__)

@cossim_bp.route("/", methods=['POST'])
def cossim():
    return jsonify({'message' : 'Hello, world!'}), 200