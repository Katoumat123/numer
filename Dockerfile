FROM node:14.16

RUN mkdir /usr/src/app
WORKDIR /usr/src/app/client

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
# docker run -it --rm -d -p 192.168.4.4:3000:3000  (ชื่อเราที่ตั้ง):latest