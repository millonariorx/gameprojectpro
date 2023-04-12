from django.db import models

# Create your models here.

class Category(models.Model):
    CategoryId = models.AutoField(primary_key=True)
    CategoryName = models.CharField(max_length=500)

class Game(models.Model):
    IdGame = models.AutoField(primary_key=True)
    CategoryId = models.IntegerField()
    Name = models.CharField(max_length=500)
    PathCoverGame = models.CharField(max_length=20000)
    ReleaseDate = models.DateField()
    CountNumberGame = models.IntegerField()
    UrlPlayerRecord = models.CharField(max_length=20000)
    IsDisabled = models.IntegerField()
    
    