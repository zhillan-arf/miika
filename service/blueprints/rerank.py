from flask import Blueprint, request, jsonify
from resources.resources import tokenizer, model
import os, torch, json

rerank_bp = Blueprint('rerank', __name__)

@rerank_bp.route("/rerank", methods=['POST'])
def rerank():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input provided"}), 400
    
    query = data.get("query")
    docs = data.get("docs")
    minLogit = data.get("minLogit")

    if not query or not docs or minLogit is None:
        return jsonify({"error": "Missing required parameters"}), 400

    query_tokens = tokenizer(query, return_tensors='pt')
    docs_tokens = [tokenizer(doc, return_tensors='pt') for doc in docs]

    with torch.no_grad():
        query_output = model(**query_tokens)
    
    reranked_docs = []
    for doc, doc_tokens in zip(docs, docs_tokens):
        with torch.no_grad():
            doc_output = model(**doc_tokens)
        
        logit_value = doc_output.logits.item()
        
        if logit_value > minLogit:
            reranked_docs.append({
                "doc": doc,
                "logit": logit_value
            })
    
    reranked_docs = sorted(reranked_docs, key=lambda x: x["logit"], reverse=True)
    
    return jsonify({"reranked_docs": reranked_docs})