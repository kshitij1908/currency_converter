from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

# Free API for exchange rates
API_URL = "https://api.exchangerate-api.com/v4/latest/"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/rates/<base_currency>')
def get_rates(base_currency):
    try:
        response = requests.get(f"{API_URL}{base_currency}")
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
