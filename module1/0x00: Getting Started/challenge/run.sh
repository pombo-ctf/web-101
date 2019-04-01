#!/bin/bash

echo 'Gerando build'
sudo docker build -t aula0 .
echo 'Rodando'
sudo docker run -p 80:3000 aula0
