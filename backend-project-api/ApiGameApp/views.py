import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from ApiGameApp.models import Category, Game
from ApiGameApp.serializers import CategorySerializer, GameSerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def categoryApi(request, id=0):
    if request.method=='GET':
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many=True)
        data = []
        for cate in categories_serializer.data:
            data.append(cate)
        # data.append({'name': 'data'})
        return JsonResponse(data, safe=False)
    elif request.method=='POST':
        category_data=JSONParser().parse(request)
        categories_serializer=CategorySerializer(data=category_data)
        if categories_serializer.is_valid():
            categories_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed add", safe=False)


@csrf_exempt
def gameApi(request, id=0):
    if request.method=='GET':
        games = Game.objects.all()
        # category = Category.objects.get(CategoryId=1)
        games_serializer = GameSerializer(games, many=True)
        data = []
        for cate in games_serializer.data:
            categoria = Category.objects.filter(CategoryId=cate['CategoryId'])
            categoria_serializer = CategorySerializer(categoria, many=True)
            cate['CategoryName']=categoria_serializer.data[0]['CategoryName']
            data.append(cate)
        return JsonResponse(data, safe=False)
    elif request.method=='POST':
        image = request.FILES['PathCoverGame']
        image_name=default_storage.save(image.name, image)
        path_new = f"images/{image_name}"
        data = {
            "CategoryId": request.POST['CategoryId'],
            "Name": request.POST['Name'],
            "PathCoverGame": path_new,
            "ReleaseDate": request.POST['ReleaseDate'],
            "CountNumberGame": request.POST['CountNumberGame'],
            "UrlPlayerRecord": request.POST['UrlPlayerRecord'],
            "IsDisabled": request.POST['IsDisabled']
        }
        game_serializer=GameSerializer(data=data)
        if game_serializer.is_valid():
            game_serializer.save()
            return JsonResponse(game_serializer.data, safe=False)
        return JsonResponse("Failed add", safe=False)

@csrf_exempt
def filterpro(request, id=0):
    if request.method == 'POST':
        IsDisabled = int(request.POST['IsDisabled'])
        CategoryId = int(request.POST['CategoryId'])
        print(f"Category id: {CategoryId}")
        print(f"IsDisabled id: {IsDisabled}")
        # print()
        if IsDisabled == -1 and CategoryId == -1:
            games = Game.objects.all()
        elif IsDisabled > -1 and CategoryId == -1:
            games = Game.objects.filter(IsDisabled=IsDisabled)
        elif IsDisabled == -1 and CategoryId > 0:
            games = Game.objects.filter(CategoryId=CategoryId)
        elif IsDisabled > -1 and CategoryId > 0:
            games = Game.objects.filter(IsDisabled=IsDisabled, CategoryId=CategoryId)

        games_serializer = GameSerializer(games, many=True)
        data = []
        for cate in games_serializer.data:
            categoria = Category.objects.filter(CategoryId=cate['CategoryId'])
            categoria_serializer = CategorySerializer(categoria, many=True)
            cate['CategoryName']=categoria_serializer.data[0]['CategoryName']
            data.append(cate)
        return JsonResponse(data, safe=False)

@csrf_exempt
def detailGameApi(request, id=0):
    if request.method == 'POST':
        games = Game.objects.filter(IdGame=request.POST['IdGame'])
        # category = Category.objects.get(CategoryId=1)
        games_serializer = GameSerializer(games, many=True)
        data = []
        for cate in games_serializer.data:
            categoria = Category.objects.filter(CategoryId=cate['CategoryId'])
            categoria_serializer = CategorySerializer(categoria, many=True)
            cate['CategoryName']=categoria_serializer.data[0]['CategoryName']
            data.append(cate)
        return JsonResponse(data, safe=False)

@csrf_exempt
def disabled(request, id=0):
    if request.method == 'POST':
        game_data = {
            "IdGame": request.POST['IdGame'],
            "IsDisabled": request.POST['IsDisabled']
        }
        game_id = game_data['IdGame']
        game = Game.objects.get(IdGame=game_id)
        games_serializer = GameSerializer(game)
        data_serializer = games_serializer.data
        data_serializer['IsDisabled'] = request.POST['IsDisabled']
        updated_serializer = GameSerializer(game, data=data_serializer)
        if updated_serializer.is_valid():
            updated_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("failed updated", safe=False)