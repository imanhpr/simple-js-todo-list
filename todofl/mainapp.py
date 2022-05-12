from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from typing import TypedDict

app = Flask(__name__)
CORS(app)


class TodoItem(TypedDict):
    _id: int
    description: str
    date_time: datetime
    state : bool
    ok : bool


TODO_ITEMS: list[None | TodoItem] = []
counter = 0


@app.route("/add-item", methods=["POST"])
def add_item():
    global counter
    data = TodoItem(request.get_json())
    if data not in TODO_ITEMS:
        counter += 1
        data["_id"] = counter
        TODO_ITEMS.append(data)
        http_response = jsonify(
            data
            | {
                "message": "New item has just added.",
                "success": True,
            }
        )
        response = http_response, 200
    else:
        http_response = jsonify(
            data
            | {
                "message": "This item has been already existed",
                "success": False,
            },
        )
        response = http_response, 406
    return response


@app.route("/items")
def all_items():
    return jsonify(TODO_ITEMS)


@app.route("/items/<int:_id>", methods=["GET", "PATCH"])
def item_by_id(_id):
    # I know it's better to implement
    # this with an efficient search algorithm like binary-search
    # but I'm lazy and this is for just testing purpose
    found_item = None
    for item in TODO_ITEMS:
        print(item)
        if item["_id"] == _id:
            found_item = item
    if not found_item:
        return (
            jsonify(
                {
                    "message": "Item Not Found",
                    "success": False,
                },
            ),
            404,
        )

    match request.method:
        case "GET":
            return jsonify(found_item)
        case "PATCH":
            print(request.json)
            try :
                state = request.json['state']
            except KeyError:
                return jsonify({'message':"bad request" , 'success' : False}), 400
            found_item['state'] = state
            return found_item
        case _:
            return jsonify({'message':"bad request" , 'success' : False}), 400
