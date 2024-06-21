from flask import Blueprint, request, jsonify
from resources.resources import encoder
import numpy as np
import faiss

infer_bp = Blueprint('faiss', __name__)

@infer_bp.route("/api/faiss", methods=["POST"])
def embed():
    data = request.get_json()
    queries = data.get('queries')
    docs = data.get('docs')

    q_embeds = encoder.encode(queries)
    embeddings = np.array([doc['embedding'] for doc in docs]).astype('float32')

    # FAISS index
    d = embeddings.shape[1]
    M = 32
    index = faiss.IndexHNSWFlat(d, M)
    index.add(embeddings)

    # Create response object
    results = []
    for q_embed in q_embeds:
        D, I = index.search(np.array([q_embed]), 7)  # 7 NN = working memory
        selected_docs = [docs[i] for i in I[0]]
        results.extend(selected_docs)

    return jsonify({"results": results}), 200
