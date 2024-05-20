from flask import Blueprint, jsonify

rerank_bp = Blueprint('rerank', __name__)

@rerank_bp.route("/", methods=['POST'])
def rerank():
    return jsonify({'message' : 'Hello, world!'}), 200