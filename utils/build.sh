#!/bin/bash
set -e

cd "$(dirname "$0")/.."

make submodules
./utils/clear-api.sh
./utils/get-api.sh
npm install
npm run clean-build