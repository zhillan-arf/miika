from flask import Blueprint, request, jsonify
from resources.resources import hf_encoder

def get_type(input_data):
    if isinstance(input_data, str):
        return 'string'
    elif isinstance(input_data, list) and all(isinstance(element, str) for element in input_data):
        return 'array'
    else:
        return False
    
embed_bp = Blueprint('embed', __name__)

@embed_bp.route("/api/embed", methods=["POST"])
def embed():
    data = request.get_json()
    texts = data.get('text')

    if not texts:
        return jsonify({"error": "No embed input provided"}), 400
    
    datatype = get_type(texts)
    if not datatype:
        return jsonify({"error": "Data is not string nor an array of it"}), 400
    
    embeddings = hf_encoder.encode(texts)

    if datatype == "string":
        response = {
            "text": texts, 
            "embedding": embeddings.tolist()
        }
    else:
        response = [{
            "text": text, 
            "embedding": embedding.tolist()
        } for text, embedding in zip(texts, embeddings)]
    
    return jsonify(response), 200


