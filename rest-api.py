import requests

req = requests.get('https://localhost:8089/services/apps/local')

reqq = req.json()

print(req)
print(reqq)
