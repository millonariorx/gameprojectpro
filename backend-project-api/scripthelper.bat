rm -rf ApiGameApp\migrations
python dropdb.py
python manage.py makemigrations ApiGameApp
python manage.py migrate
