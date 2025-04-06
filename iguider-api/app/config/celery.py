from celery import Celery
import os

broker_url = os.getenv('CELERY_BROKER_URL')

app = Celery('celery',
             broker=broker_url,
             include=['app.crud.report'])
