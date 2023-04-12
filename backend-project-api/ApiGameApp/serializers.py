from rest_framework import serializers
from ApiGameApp.models import Category, Game

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=('CategoryId', 'CategoryName')

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model=Game
        fields=('IdGame', 'CategoryId', 'Name', 'PathCoverGame', 'ReleaseDate', 'CountNumberGame', 'UrlPlayerRecord', 'IsDisabled')