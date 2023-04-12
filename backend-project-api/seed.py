import pymongo
import bson

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["gamedb"]
Collection = mydb["ApiGameApp_category"]

# Loading or Opening the json file
with open('seed\ApiGameApp_category.json') as file:
    file_data = file.read(file)

# print(file_data)
# Inserting the loaded data in the Collection
# if JSON contains data more than one entry
# insert_many is used else insert_one is used

for doc in bson.decode_all(file_data):
    Collection.insert_one(doc)

# Collection.insert(file_data)

# if isinstance(file_data, list):
#     Collection.insert(file_data) 
# else:
#     Collection.insert_one(file_data)


    