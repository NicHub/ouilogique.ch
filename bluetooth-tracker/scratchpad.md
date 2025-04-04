# Générez un certificat SSL auto-signé avec OpenSSL (à installer si ce n'est pas déjà fait) :
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem

# Lancez le serveur
node server.js

