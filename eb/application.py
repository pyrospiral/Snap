from flask import Flask
from flask_cors import CORS
import logging
import json
import uuid

stored_snap = None

def say_hello(username="World"):
    return '<p>Hello %s!</p>\n' % username

header_text = '''
    <html>\n<head> <title>EB Flask Test</title> </head>\n<body>'''
footer_text = '</body>\n</html>'

json.dumps({'name': 'testname', 'link': 'testlink'})


def send_snap():
    global stored_snap
    if stored_snap:
        temp = stored_snap
        stored_snap = None
        return json.dumps(temp)
    else:
        return json.dumps({'name': 'none', 'link': 'none'})


def keep_snap(snapinfo):
    global stored_snap
    name,link = snapinfo.split("+snap+")
    snapid = uuid.uuid4().int
    stored_snap = {}
    stored_snap["name"] = name
    stored_snap["id"] = snapid
    stored_snap["link"] = link
    return "Snapped! "+link


application = Flask(__name__)
CORS(application)

# add a rule for the index page.
application.add_url_rule('/', 'index', (lambda: header_text +
                                        say_hello() + footer_text))

# snap search request : look if there's been a snap.
# keep only one snap in memory, once its sent, remove it.
application.add_url_rule('/getsnap/<var>', 'snap', (lambda var: send_snap()))

application.add_url_rule('/sendsnap/<path:snapinfo>', 'sendsnap', (lambda snapinfo: keep_snap(snapinfo)))

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
