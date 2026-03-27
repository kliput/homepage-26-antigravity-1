#!/bin/bash

cd "$(dirname "$0")/.."

find src/content/api/ -mindepth 1 -maxdepth 1 ! -name '.gitkeep' -exec rm -rf {} \;
