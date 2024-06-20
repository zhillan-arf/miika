from flask import Blueprint, request, jsonify
from resources.resources import tokenizer, encoder

infer_bp = Blueprint('infer', __name__)

@infer_bp.route("/api/embed", methods=["POST"])
def embed():
    texts = request.get_json().get('texts')
    if not texts:
        return jsonify({"error": "No embed input provided"}), 400
    
    embeddings = encoder.encode(texts)

    pairs = [{
        "text": text, 
        "embedding": embedding.tolist()
    } for text, embedding in zip(texts, embeddings)]
    
    return jsonify(pairs)


