import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app)

# Initialize AI & Translator
genai.configure(api_key="AIzaSyCkSvqEvEXQBrIbSyLJ-2Q0OuaeS4hdBO8")
translator = Translator()

@app.route('/chat', methods=['POST'])
def chatbot():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Detect language
    detected_lang = translator.detect(user_message).lang

    # Translate to English if needed
    if detected_lang != "en":
        user_message = translator.translate(user_message, src=detected_lang, dest="en").text

    # Generate AI response
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(user_message)

    # Translate back to Telugu if user spoke in Telugu
    response_text = response.text
    if detected_lang == "te":
        response_text = translator.translate(response_text, src="en", dest="te").text

    return jsonify({"response": response_text})

if __name__ == '__main__':
    app.run(debug=True)
