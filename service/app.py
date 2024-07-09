from flask import Flask, jsonify
from blueprints.helloworld import helloworld_bp
from blueprints.infer import infer_bp
from blueprints.embed import embed_bp
from blueprints.ann import ann_bp
import os

app = Flask(__name__)

app.register_blueprint(helloworld_bp)
app.register_blueprint(infer_bp)
app.register_blueprint(embed_bp)
app.register_blueprint(ann_bp)

PORT = 3001
PORT = os.environ.get("PORT", 3001)
if __name__ == '__main__':
    app.run(port=PORT)
    print(f"Server running at {PORT}")
