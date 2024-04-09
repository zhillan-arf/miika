from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def main():
    return jsonify("Hello, world!"), 200

import inference