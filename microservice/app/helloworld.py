from flask import request, jsonify
from app import app

@app.route("/", methods=["GET"])
def main():
    return jsonify("Hello, world!"), 200