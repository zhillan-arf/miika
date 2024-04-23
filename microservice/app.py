from flask import Flask, jsonify
from routes.helloworld import helloworld_bp
from routes.infer import infer_bp

app = Flask(__name__)

app.register_blueprint(helloworld_bp)
app.register_blueprint(infer_bp)

PORT = 3001
if __name__ == '__main__':
    app.run(debug=True, port=PORT)