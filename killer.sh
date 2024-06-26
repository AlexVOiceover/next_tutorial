#!/bin/bash
# chmod +x killer.sh

# Default to port 3000 if no argument is given, otherwise use the provided argument
PORT=${1:-3000}

# Find the process using port 3000
PID=$(lsof -t -i:$PORT)

# Check if the PID variable is set to a non-empty string
if [ -n "$PID" ]; then
  echo "Killing process on port $PORT with PID: $PID"
  kill -9 $PID
else
  echo "No process found on port $PORT."
fi
