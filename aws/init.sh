#!/bin/bash
apt update && apt upgrade -y
apt install python3-pip python3-venv git nginx libgl1 -y

# Instalar Python 3.12
add-apt-repository ppa:deadsnakes/ppa -y
apt update
apt install python3.12 python3.12-venv -y

# Swap de 2GB (RAM extra)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab