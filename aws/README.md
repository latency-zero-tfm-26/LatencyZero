# Despliegue

https://latencyzero.duckdns.org/docs

## RDS (PostgreSQL)

### Crear la base de datos
- Engine: `PostgreSQL 17`
- Template: `Free tier` (db.t3.micro)
- DB instance identifier: `latencyzero-db`
- Master username: `postgres`
- Master password: la que definas
- **Connectivity:** Conectar a la instancia EC2 directamente (AWS configura el Security Group automáticamente)
- Initial database name: `latencyzero`

### Endpoint
Una vez creada, el endpoint estará disponible en:
```
RDS → Bases de datos → latencyzero-db → Conectividad y seguridad → Endpoint
```

Úsalo en el `.env` del backend:
```env
DATABASE_URL=postgresql://postgres:<PASSWORD>@<ENDPOINT>:5432/latencyzero
```

## AWS EC2 (t3.small)

### 1. Crear instancia EC2
- AMI: `Ubuntu Server 22.04 LTS`
- Instance type: `t3.small`
- Puertos en Security Group: `22` (SSH), `80` (HTTP), `443` (HTTPS), `8000` (FastAPI)

### 2. User Data (script inicial)
Pegar en el campo *User Data* al crear la instancia:
```bash
#!/bin/bash
apt update && apt upgrade -y
apt install python3-pip python3-venv git nginx libgl1 certbot python3-certbot-nginx -y

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
```

### 3. Conectarse por SSH
Añade esto a `C:\Users\Usuario\.ssh\config`:
```bash
Host latencyzero_back
    HostName latencyzero.duckdns.org
    User ubuntu
    IdentityFile "C:\Users\Usuario\Documents\labsuser.pem"
```
```bash
ssh latencyzero_back
```

### 4. Clonar el repositorio
```bash
git clone https://github.com/Latency-Zero-tfm/LatencyZero.git
cd LatencyZero
rm -rf frontend data img notebooks models LICENSE README.md
cd backend
```

### 5. Crear entorno virtual e instalar dependencias
```bash
python3.12 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 6. Crear el archivo `.env`
```bash
nano .env
```
```env
ENV=production
DATABASE_URL=postgresql://postgres:tupassword@<RDS_ENDPOINT>:5432/latencyzero
SECRET_KEY=
CORS_ORIGINS=
GROQ_API_KEY=
HF_TOKEN=
ZILLIZ_URI=
ZILLIZ_TOKEN=
```

### 7. Configurar servicio systemd
```bash
sudo nano /etc/systemd/system/fastapi.service
```
```ini
[Unit]
Description=FastAPI LatencyZero
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/LatencyZero/backend
ExecStart=/home/ubuntu/LatencyZero/backend/venv/bin/uvicorn latencyzero_server.main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5
EnvironmentFile=/home/ubuntu/LatencyZero/backend/.env

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl daemon-reload
sudo systemctl enable fastapi
sudo systemctl start fastapi
sudo systemctl status fastapi
```

### 8. Configurar Nginx
```bash
sudo nano /etc/nginx/sites-available/fastapi
```
```nginx
server {
    listen 80;
    server_name latencyzero.duckdns.org;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
```bash
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/fastapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 9. Configurar HTTPS con Let's Encrypt
```bash
sudo certbot --nginx -d latencyzero.duckdns.org
```

> Certbot configurará Nginx automáticamente y renovará el certificado cada 90 días sin intervención manual.

### 10. Verificar
```bash
# Ver logs en tiempo real
sudo journalctl -u fastapi -f

# Acceder a la API
https://latencyzero.duckdns.org/docs
```

![backend-aws](/img/aws.png)