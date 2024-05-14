from flask import Blueprint, jsonify
import torch

helloworld_bp = Blueprint('helloworld', __name__)

@helloworld_bp.route("/api/hellomiika", methods=["GET"])
def hellomiika():
    return jsonify({'status' : torch.cuda.is_available()}), 200