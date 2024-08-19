#!/bin/bash

# Check out to the main branch
git checkout main

# Merge changes from the develop branch into main
git merge develop

# Push the merged changes to the origin main branch
git push origin main

# Check out back to the develop branch
git checkout develop

git branch