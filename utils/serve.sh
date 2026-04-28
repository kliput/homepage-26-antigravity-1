#!/bin/bash
set -e

cd "$(dirname "$0")/.."

npx http-server dist -p 8001 