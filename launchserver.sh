#!/bin/bash

gnome-terminal -e "node -e \"var node_dl = require('./jsonmanager.js'); node_dl.sendJsonToLocalServer('http://uutisvahti.yle.fi/v3/uutisvahti', 'data.json');\""
