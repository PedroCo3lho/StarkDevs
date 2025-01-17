#!/bin/bash

# Set the current directory
currentDir=$(pwd)

# Set the name, image, and version for the Docker container
containerName=starknetDevContainer
imageName=starknetfoundation/starknet-dev

# Display the command being executed
echo "Command: $1"

# Check if there is a previous Docker container with the same name
echo "Searching for a previous Docker container"
containerID=$(docker ps --filter="name=${containerName}" --all --quiet)
if [[ ${containerID} ]]; then
    echo "Start removing container."
    # Remove the previous Docker container
    docker rm --force ${containerName}
    echo "Finished removing container."
else
    echo "No previous container was found"
fi

# Run a new Docker container
docker run --volume ${currentDir}:/contracts \
           --name ${containerName} \
           --interactive \
           --publish 3000:3000 \
           --workdir="/contracts" \
           --tty \
           --detach \
           --memory=12g \
           ${imageName}

# Set the git config (optional for the project, uncomment if needed)
# docker exec $containerName git config --global --add safe.directory /contracts

# Connect to bash on the Docker container
docker exec --tty --interactive $containerName bash
