FROM python:3.8.0-slim

COPY /requirements.txt /requirements.txt

ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip && pip install -r /requirements.txt

WORKDIR /app/backend

# ENTRYPOINT [ "python", "manage.py", "runserver", "port:" ]