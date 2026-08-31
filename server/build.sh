#!/bin/bash

# Install dependencies
npm install

# Install all type definitions
npm install --save-dev \
  @types/node \
  @types/express \
  @types/cors \
  @types/morgan \
  @types/compression \
  @types/jsonwebtoken \
  @types/bcrypt \
  @types/multer \
  @types/uuid

# Build the project
npm run build