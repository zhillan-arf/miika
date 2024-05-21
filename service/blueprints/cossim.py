import numpy as np
from flask import Blueprint, jsonify

cossim_bp = Blueprint('cossim', __name__)

def cosine_similarity(embeddings, query_embedding):
    query_norm = np.linalg.norm(query_embedding)
    embeddings_norms = np.linalg.norm(embeddings, axis=1)
    dot_products = np.dot(embeddings, query_embedding)
    return dot_products / (embeddings_norms * query_norm)

@cossim_bp.route("/cossim", methods=['POST'])
def cossim():
    data = request.get_json()
    embeddings = np.array(data['embeddings'])
    query_embedding = np.array(data['queryEmbedding'])
    min_cossim = data['minCossim']

    similarities = cosine_similarity(query_embedding, embeddings)
    result = np.where(similarities > min_cossim)[0].tolist()

    return jsonify(result)