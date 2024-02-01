#!/bin/bash

IP=$(hostname -I | awk '{print $1}')

ENV_FILE="./.env"

echo "MONGODB_URI=mongodb://$IP:27017/" > $ENV_FILE
echo "NEXT_PUBLIC_API_URL=http://$IP:3001" >> $ENV_FILE
echo "MONGO_INITDB_DATABASE=catho" >> $ENV_FILE

cp $ENV_FILE "./catho-back/"
cp $ENV_FILE "./catho-portal/"

echo "Arquivos .env atualizados com sucesso."

docker-compose up -d

read -p "Deseja executar o script de seed para o MongoDB? (y/n) " answer
if [[ $answer = [Yy]* ]]; then
    echo "Executando script de seed..."
    cd catho-back && node_modules/ts-node/dist/bin.js data/seed-mongo/seed.ts
    echo "Script de seed executado."
else
    echo "Execução do script de seed ignorada."
fi
