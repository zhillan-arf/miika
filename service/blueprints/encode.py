from flask import Blueprint, request, jsonify
from resources.resources import hf_encoder

# View Function
encode_bp = Blueprint('encode', __name__)

@encode_bp.route("/api/encode", methods=["POST"])
def encode():
    data = request.get_json()
    if "text" not in data:
        return jsonify({"error": "No input provided"}), 400

    text = data["text"]

    embedding = hf_encoder.encode(text)

    return jsonify({"embedding": embedding.tolist()}), 200
