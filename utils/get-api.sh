#!/bin/bash
set -e

cd "$(dirname "$0")/.."

curl http://get.onedata.org/api/all.zip -o /tmp/all.zip
unzip /tmp/all.zip -d ./src/content/api
rm /tmp/all.zip
