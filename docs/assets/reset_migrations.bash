rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -U postgres bd_corporativa || true &&
createdb -h localhost -U postgres bd_corporativa || true &&
psql -h localhost bd_corporativa -U postgres -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade
