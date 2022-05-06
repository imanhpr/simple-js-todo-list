from flask import Flask , request , jsonify , abort
from typing import TypedDict

app = Flask(__name__)

class TodoItem(TypedDict):
    _id : int
    description : str

TODO_ITEMS : list[None | TodoItem] = []
counter = 0

@app.route('/add-item' , methods=['POST'])
def add_item():
    global counter
    data = TodoItem(request.get_json())
    if data not in TODO_ITEMS:
        counter += 1
        data["_id"]= counter
        TODO_ITEMS.append(data)
        http_response = jsonify(
            data | {
                'message':'New item has just added.' ,
                'success' : True,
            }
        )
        response = http_response , 200
    else:
        http_response = jsonify(
            data | {
                'message':'This item has been already existed' ,
                'success' : False,
            },
        )
        response = http_response , 406
    http_response.headers.add('Access-Control-Allow-Origin' , '*')
    return response

@app.route('/items')
def all_items():
    return jsonify(TODO_ITEMS)