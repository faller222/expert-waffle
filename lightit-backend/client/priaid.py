"""
After creating this file I found
https://github.com/priaid-eHealth/symptomchecker/blob/master/Python/PriaidDiagnosisClient.py
so, this could be better, but I want to show the way I thought this solution
"""

import hmac
import base64
import os

from requests_cache import install_cache
from requests import get, post

install_cache(cache_name='medic_cache', backend='sqlite',
              expire_after=2 * 60 * 60, allowable_methods=('GET', 'POST'))


_encoding = 'utf-8'
_digest = 'MD5'

_api_auth_url = os.getenv('PRIAID_AUTH_URL') or 'https://sandbox-authservice.priaid.ch'
_api_health_url = os.getenv('PRIAID_HEALTH_URL') or 'https://sandbox-healthservice.priaid.ch'
_api_user = os.getenv('PRIAID_USER') or 'faller222@gmail.com'
_api_pass = os.getenv('PRIAID_PASS') or 'm9K4Xfr8S5Fqj6EWi'
_api_language = os.getenv('PRIAID_LANGUAGE') or "en-gb"
# en-gb, de-ch, fr-fr, it-it, es-es, ar-sa, ru-ru, tr-tr, sr-sp, sk-sk...


def _get_hash(url):
    url_byte = bytes(url, _encoding)
    pass_byte = bytes(_api_pass, _encoding)
    hashed = hmac.digest(pass_byte, url_byte, _digest)
    return base64.b64encode(hashed).decode()


def _get_token():
    login_url = f'{_api_auth_url}/login'
    hashed_credentials = _get_hash(login_url)
    response = post(login_url, headers={"Authorization": f'Bearer {_api_user}:{hashed_credentials}'})
    print('get_token: from cache', response.from_cache)
    return response.json().get('Token')


def auth():
    print(_api_auth_url)
    print(_api_health_url)
    print(_api_user)
    print(_api_language)
    return _get_token()


def get_symptoms():
    token = _get_token()
    response = get(f'{_api_health_url}/symptoms?token={token}&language={_api_language}')
    print('get_symptoms: from cache', response.from_cache)
    return response.json()


def get_diagnosis(symptoms, gender, year_of_birth):
    token = _get_token()
    joined_symptoms = '[' + ','.join(map(str, symptoms)) + ']'
    response = get(f'{_api_health_url}/diagnosis?'
                   f'symptoms={joined_symptoms}&gender={gender}&year_of_birth={year_of_birth}&'
                   f'token={token}&language={_api_language}')
    print('get_diagnosis: from cache', response.from_cache)
    return response.json()
