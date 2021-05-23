FROM node:14.16

RUN mkdir /usr/src/app
WORKDIR /usr/src/app/max

COPY . /usr/src/app
RUN npm install
# RUN npm install react-scripts -g

EXPOSE 3000

CMD ["npm" , "start"]


# FROM node:14

# WORKDIR /usr/src/app/client

# COPY . .
# RUN npm install

# EXPOSE 3000

# CMD ["npm" , "start"]