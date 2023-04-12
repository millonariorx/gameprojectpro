import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

print("List of databases before deletion\n--------------------------")
for x in myclient.list_database_names():
  print(x)
  
#delete database named 'organisation'
myclient.drop_database('gamedb')

print("\nList of databases after deletion\n--------------------------")
for x in myclient.list_database_names():
  print(x)