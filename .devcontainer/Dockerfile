FROM node:current-alpine

# Install necessary packages
RUN apk add --no-cache \
    python3 \
    py3-pip \
    make \
    g++ \
    sqlite \
    git \
    bash \
    lsof \
    libc6-compat 

# Install yarn globally
# RUN npm install -g yarn

# Install node-gyp globally
RUN npm install -g node-gyp

# Install node-pty globally
RUN npm install -g node-pty

# Install nodemon globally
RUN npm install -g nodemon

# Install vite globally
RUN npm install -g vite 

# Set up workspace directory
WORKDIR /workspace
