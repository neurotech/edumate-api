# echo "Generating cert in ./private"
# echo "Note: Make sure you specify the correct domain!"

# openssl req -new -key private/server.key -out private/server.csr
# openssl x509 -req -days 365 -in private/server.csr -signkey private/server.key -out private/server.crt

# echo "Generating self-signed cert in ./private"
# mkdir private
#
openssl genrsa -des3 -passout pass:x -out private/server.pass.key 2048
openssl rsa -passin pass:x -in private/server.pass.key -out private/server.key
rm private/server.pass.key

# Generated version
openssl req -new -key private/server.key -out private/server.csr
openssl x509 -req -days 365 -in private/server.csr -signkey private/server.key -out private/server.crt
