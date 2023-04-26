from flask import Flask, render_template, url_for, request, session
from flask_session import Session
from datetime import datetime
import os

app = Flask(__name__, static_url_path="/static")
app.config["DEBUG"] = True
app.secret_key = os.urandom(12).hex()
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/start")
def start():
    return render_template("start.html")


wishes_global = ""


@app.route("/wishes", methods=["POST"])
def wishes():
    print(session, session.keys())
    global wishes_global
    wishes_request = request.get_json()["wishes"]
    if len(wishes_request) > 2:
        wishes_global = ", ".join(wishes_request[0:-1]) + " und " + wishes_request[-1]
    elif len(wishes_request) == 2:
        wishes_global = " und ".join(wishes_request)
    elif len(wishes_request) == 1:
        wishes_global = wishes_request[0]
    wishes_global = wishes_global.replace("guter Kuchen", "guten Kuchen")
    return wishes_global


@app.route("/happybirthday")
def hb():
    return render_template("hb.html", wishes=wishes_global)
