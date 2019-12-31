#!/bin/sh

CERT_FILE="certs/app-local.crt"
KEY_FILE="certs/app-local.key"
APP_NAME="SSO Boilerplate"

openssl req -new \
    -newkey rsa:4096 \
    -x509 -sha256 -days 365 \
    -subj "/C=US/OU=$APP_NAME/CN=localhost/title=$APP_NAME Local" \
    -nodes \
    -out $CERT_FILE \
    -keyout $KEY_FILE
