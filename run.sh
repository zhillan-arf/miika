#!/bin/bash
gnome-terminal -- python3 inference.py &
gnome-terminal -- bash -c "npm install; npm start; exec bash"