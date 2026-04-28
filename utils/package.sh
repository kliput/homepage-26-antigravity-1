#!/bin/bash
set -e

cd "$(dirname "$0")/.."

export TAG="ID-`git rev-parse HEAD | cut -b -10`-T`date +%s`"
echo $TAG
docker build -t docker.onedata.org/homepage-26:${TAG} .