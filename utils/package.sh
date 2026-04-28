#!/bin/bash
set -e

cd "$(dirname "$0")/.."

export TAG="ID-`git rev-parse HEAD | cut -b -10`-T`date +%s`"
./docker_build.py --name homepage \
                  --tag $TAG \
                  --repository docker.onedata.org \
                  .
                  # TODO: add user, password, publish, remove?
