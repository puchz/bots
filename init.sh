#!/usr/bin/env bash

BASE64_TOKEN=$(echo $BOT_TOKEN | base64 --wrap=0)
if [ -z "${BASE64_TOKEN}" ]; then
  echo "BASE64_TOKEN is empty"
  echo "export BOT_TOKEN = <token>"
  exit 1
fi

cat > bot-token.yaml <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: bot-token-secret
type: Opaque
data:
  token: ${BASE64_TOKEN}
EOF

# Creo namespace para el bot
kubectl create namespace bots

# Crear secret agregando el token en data.token
kubectl apply -f ./bot-token.yaml -n bots

# Deploy bot
helm upgrade -i con-lo-ojo-bot -n bots -f values.yaml .

rm ./bot-token.yaml

echo 'listo!'
