from app import app

PORT = 3001
if __name__ == '__main__':
    app.run(debug=True, port=PORT)