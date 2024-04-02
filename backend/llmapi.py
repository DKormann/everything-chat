
#%%
import requests
import dotenv
import json

dotenv.load_dotenv()
mistral_key = dotenv.get_key(".env","mistral_key")


def get_answer(messages:list):
  url = "https://api.mistral.ai/v1/chat/completions"  
  response = requests.post(url, 
    headers={
      "Content-Type": "application/json",
      "Accept": "application",
      "Authorization": f"Bearer {mistral_key}",
    },
    json={
      "model": "mistral-small-latest",
      "messages": messages,
      "stream": True,
    })
  for line in response.iter_lines():
    line:bytes
    if line and line.strip() != b'data: [DONE]':
      chunk = json.loads(line.decode("utf-8")[6:])
      yield chunk['choices'][0]['delta']['content']

def get_embed(messages:list):
  url = "https://api.mistral.ai/v1/embeddings"
  response = requests.post(url,
    headers = {
      "Content_Type": "application/json",
      "Accept": "application",
      "Authorization": f"Bearer {mistral_key}",
    },
    json = {
      "model": "mistral-embed",
      "input": messages,
      "encoding_format": "float",
    })
  res = response.json()
  return [item['embedding'] for item in res['data']]
  
if __name__ == "__main__":
  messages = [{
    "role": "user",
    "content": "What is the capital of France? (short answer)"
  }]
  response = get_answer(messages)
  for chunk in response:
    print(chunk,end='')
