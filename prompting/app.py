from flask import Flask, request, jsonify, render_template
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

PORT = 3004
if __name__ == '__main__':
    app.run(port=PORT, debug=True)
    print(f"Prompting running at {PORT}")
