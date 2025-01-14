"""
Créé par Claude Sonnet
https://poe.com/s/eFpygbHX1CDkrTLzRY0Z

Création du certificat auto-signé
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes

getIPofDefaultInterface IP
echo -e "https://$IP:4443\n"
python3 pyerver_https.py


"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl


def create_https_server(port=4443):

    # Création du serveur HTTP
    server_address = ("localhost", port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

    # Configuration SSL
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain("cert.pem", "key.pem")

    # Wrapping du serveur HTTP avec SSL
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    print(f"https://localhost:{port}")
    httpd.serve_forever()


if __name__ == "__main__":
    try:
        create_https_server()
    except KeyboardInterrupt:
        pass
