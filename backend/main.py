

#%%
from flask import Flask, request
from llmapi import get_answer
from flask import Flask, request
from flask_cors import CORS
from llmapi import get_answer

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
  return 'Hello, World!'

@app.route('/answer', methods=['POST'])
def answer():
  messages = request.json['messages']
  print("past:", messages)
  answer = get_answer(messages)
  return answer

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
  
  
