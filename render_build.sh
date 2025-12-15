#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build
pip install pipenv
pip install tomli
pipenv install

pipenv run upgrade
