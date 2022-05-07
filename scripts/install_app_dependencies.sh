#!/bin/bash
cd /home/ec2-user
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install node
nvm install 16
curl -o- -L https://yarnpkg.com/install.sh | bash
cd /etube-backend
yarn install
yarn global add pm2