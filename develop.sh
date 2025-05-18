#!/bin/bash

# Check out to the main branch
git add .

# Merge changes from the develop branch into main
git commit -m "edit login"

# Push the merged changes to the origin main branch
git push origin develop


git branch