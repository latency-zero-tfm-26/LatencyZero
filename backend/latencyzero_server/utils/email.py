from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import base64
from email.mime.text import MIMEText

TOKEN_PATH = "latencyzero_server/token.json"


def send_email_gmail(to_email: str, subject: str, body: str):
  creds = Credentials.from_authorized_user_file(TOKEN_PATH, ['https://www.googleapis.com/auth/gmail.send'])
  service = build('gmail', 'v1', credentials=creds)

  message = MIMEText(body, 'html')
  message['to'] = to_email
  message['from'] = 'latencyzero.tfm@gmail.com'
  message['subject'] = subject

  raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
  service.users().messages().send(userId='me', body={'raw': raw}).execute()
