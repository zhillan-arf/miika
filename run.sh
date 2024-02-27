#!/bin/bash
gnome-terminal -- python3 ./microservice/inference.py &
gnome-terminal -- bash -c "npm install; npm start; exec bash" &