from flask import Blueprint, request, jsonify
from annoy import AnnoyIndex
from resources.resources import hf_encoder

def get_embeds(docs):
    embeddings = []
    
    for doc in docs:
        embedding = doc.get('embedding')
        if embedding is None:
            return False
        embeddings.append(embedding)

    return embeddings

ann_bp = Blueprint('ann', __name__)

@ann_bp.route("/api/ann", methods=["POST"])
def ann():
    # Get Data
    data = request.get_json()
    queries = data.get('queries')
    docs = data.get('docs')

    # Validate
    if not queries or len(queries) == 0:
        return jsonify({"error": "No queries provided"}), 400
    if not docs or len(docs) == 0:
        return jsonify({"error": "No docs provided"}), 400
    
    try:
        # Prepare Embeddings
        d_embeds = get_embeds(docs)

        if not d_embeds:
            return jsonify({"error": "Missing at least one embedding in data"}), 400

        d_dim = len(d_embeds[0])

        # Encode queries
        q_embeds = hf_encoder.encode(queries)

        # Create Annoy Index
        annoy_index = AnnoyIndex(d_dim, 'angular')

        # Add document embeddings to the index
        for idx, d_embed in enumerate(d_embeds):
            annoy_index.add_item(idx, d_embed)
        
        # Build index
        n_trees = 10
        annoy_index.build(n_trees)

        # Perform ANN search of docs indexes
        indexes = []
        n = 2

        for q_embed in q_embeds:
            ann_idx = annoy_index.get_nns_by_vector(q_embed, n)
            indexes.extend(ann_idx)

        indexes = sorted(set(indexes))

        # Filter docs
        filteredDocs = [docs[idx] for idx in indexes]

        # Return
        return jsonify({"filtered": filteredDocs}), 200
    
    except Exception as e:
        print(f"faiss queries: {queries}")  # debug
        return jsonify({"error": e}), 500

