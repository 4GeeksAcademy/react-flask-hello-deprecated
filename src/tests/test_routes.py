# src/tests/test_routes.py

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'api')))

import pytest
from api.routes import app  # Ahora debe poder encontrar 'api.routes'

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_register(client):
    response = client.post('/api/register', json={
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "Usuario se registro exitosamente" in response.get_data(as_text=True)

def test_login(client):
    response = client.post('/api/login', json={
        "email": "testuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "token" in response.get_json()
