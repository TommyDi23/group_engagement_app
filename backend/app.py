# export FLASK_APP=ge_app.py

# import flask and mongodb tools
from flask import Flask, request
from bson.json_util import dumps
from bson.objectid import ObjectId
import json
from flask import jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import pymongo
import pprint as pp

# setup app as flask server
app = Flask(__name__)
CORS(app)

# config to look at hosted mongodb database
db_password = "dancingb"
db_name = "meetings"

app.config["MONGO_URI"] = "mongodb+srv://douglashellowell:" + \
    db_password + "@cluster0-wvchx.mongodb.net/" + db_name
mongo = PyMongo(app)


# On root request
@app.route('/api', methods=['POST'])
def add_new_user():

    new_user = json.loads(request.data)
    # does username already exist?
    names = mongo.db.collection_names()
    userAlreadyExists = names.count(new_user['user_name']) > 0
    # {username: 'humanoid_gregory'}
    # print(new_user)
    # print('attemting to add "sessions" list')
    if (userAlreadyExists):
        return jsonify({"status": 409, "msg": "Please provide unique username"})
    else:
        new_user['sessions'] = []
        pp.pprint(new_user)
        target_collection = mongo.db[new_user['user_name']]
        result = target_collection.insert_one(new_user)
        return jsonify({"status": 201, "insert_id": str(result.inserted_id)})


@app.route('/api/<user_name>', methods=['GET', 'POST'])
def add_session(user_name):
    if(request.method == 'GET'):
        target_collection = mongo.db[user_name]
        cursor_obj = target_collection.find({}, {'_id': 0})
        result = []
        for x in cursor_obj:
            result.append(x)
        return jsonify(result[0])
        # obj = next(cursor_obj, None)
        # if obj:
        #     print(obj)
    elif(request.method == 'POST'):
        new_session = json.loads(request.data)
        target_collection = mongo.db[user_name]
        result = target_collection.update_one(
            {"user_name": user_name},
            {"$push": {'sessions': new_session}}
        )
        if (result.modified_count == 1):
            return jsonify({"status": 200})
        else:
            return jsonify({"status": 400})

@app.route('/api/<user_name>', methods=['DELETE'])
def delete_account(user_name):
    names = mongo.db.collection_names()
    userAlreadyExists = names.count(user_name) > 0
    if (userAlreadyExists):
        del_collection = mongo.db[user_name].drop()
        return jsonify({"status": 204})
    else:
      return jsonify({"status": 404})


@app.route('/api/<user_name>/<session_name>', methods=['GET', 'PATCH'])
def get_session(user_name, session_name):
    if (request.method == 'GET'):
        target_collection = mongo.db[user_name]
        cursor_obj = target_collection.find(
            {'sessions.session_name': session_name},
            {'_id': 0, 'sessions.$': 1}
        )
        result = []
        for x in cursor_obj:
            result.append(x)
            return jsonify(result[0])
    elif (request.method == 'PATCH'):
        new_session = json.loads(request.data)
        target_collection = mongo.db[user_name]
        result = target_collection.update_one(
            {"user_name": user_name, "sessions.session_name": session_name},
            {"$set": {"sessions.$": new_session}}
        )
        return jsonify({"Did work? ": result.modified_count})

# @app.route('/api/<user_name>/<session_name>', methods=['DELETE'])
# def delete_session(user_name, session_name):


@app.route('/api/<user_name>/<session_name>/<question_id>', methods=['PATCH'])
def update_question(user_name, session_name, question_id):
        new_answers = json.loads(request.data)
        target_collection = mongo.db[user_name]
        result = target_collection.update_one(
            {
                "user_name": user_name, 
                "sessions.session_name": session_name,
                "sessions.questions": question_id
            },
            {"$set": {"sessions.$.questions": new_answers}}
        )
        return jsonify({"Did work? ": result.modified_count})



# @app.route('/api/<user_name>/<session_name>', methods=['PATCH'])
# def update_session(user_name, session_name):
#     # if (request.method == 'PATCH'):


if __name__ == '__main__':
    # threaded option to enable muptiple instances for multiple user access support (?!?!)
    app.run(threaded=True, port=5000)
# flask request methods

#     request.args: the key/value pairs in the URL query string

#     request.form: the key/value pairs in the body, from a HTML post form, or JavaScript request that isn't JSON encoded

#     request.files: the files in the body, which Flask keeps separate from form. HTML forms must use enctype=multipart/form-data or files will not be uploaded.

#     request.values: combined args and form, preferring args if keys overlap

#     request.json: parsed JSON data. The request must have the application/json content type, or use request.get_json(force=True) to ignore the content type.

# All of these are MultiDict instances (except for json). You can access values using:

#     request.form['name']: use indexing if you know the key exists

#     request.form.get('name'): use get if the key might not exist

#     request.form.getlist('name'): use getlist if the key is sent multiple times and you want a list of values. get only returns the first value.
