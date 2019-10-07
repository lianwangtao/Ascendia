#!/bin/bash

USAGE="$(basename "$0") [-h] [-t tag] [-v volume] -- launches image categorization web app in docker.
where:
    -h  show this help text
    -t  set the tag to use. Default: latest 
    -v  set the persistent docker volume containing the database"

TAG="latest"

while getopts ':ht:v:' option; do
  case "$option" in
    h) echo "$USAGE"
       exit
       ;;
    t) TAG=$OPTARG
       ;;
    v) VOLUME=$OPTARG
       ;;
    :) printf "missing argument for -%s\n" "$OPTARG" >&2
       echo "$USAGE" >&2
       exit 1
       ;;
   \?) printf "illegal option: -%s\n" "$OPTARG" >&2
       echo "$USAGE" >&2
       exit 1
       ;;
  esac
done
shift $((OPTIND - 1))


IMAGE_NAME="aviatr/imagecatweb:$TAG"
CONTAINER_NAME="ImageLabeler"
MOUNT_POINT="/usr/src/app/data"

if [ -z "$VOLUME" ]; then #No VOLUME specified, create database inside container
    docker run -p 49160:3000 -d --name "$CONTAINER_NAME" "$IMAGE_NAME"
elif docker volume inspect "$VOLUME" > /dev/null 2>&1; then #VOLUME is a pre-existing docker volume
    echo "Launching $CONTAINER_NAME with Docker volume $VOLUME."
    docker run -p 49160:3000 -d --name "$CONTAINER_NAME" -v "$VOLUME:$MOUNT_POINT" "$IMAGE_NAME"
elif [ -d "$VOLUME" ]; then #VOLUME is a folder, bind the mount point
    echo "Launching $CONTAINER_NAME bound to local directory $VOLUME."
    docker run -p 49160:3000 -d --name "$CONTAINER_NAME" -v "$VOLUME:$MOUNT_POINT" "$IMAGE_NAME"    
else
    echo "$VOLUME is not a valid Docker volume. To see the available volumes, run >docker volume list"
    exit 1
fi
echo "ImageCatWebApp is now running locally. Visit http://localhost:49160 to use the app."