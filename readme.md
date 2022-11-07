# README FIRST

## How to Install 

First Download repository from git/github

After download, use this command to install depedencies.

```
npm install
```

## Setup Database Connection
In file config fill the "```username```" and "```password```" to connect to database, you can find the file in this directory below.
```
## src/config/config.json
{
  "development": {
    "username": "postgress",
    "password": "123456",
    "database": "ch6challange",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```


## Make Sequelize Configuration
To create database use this command.

```
npx sequelize-cli db:create
```

to check database ```"ch6challange"``` is created, open apps ```"dbeaver tools"``` and login with authentication on your environment database ```username``` and ```password```.

After create database, then run this command to create and migrate tables into database ```"ch6challange"```.

```
npx sequelize-cli db:migrate
```


## Add Data Dummy for Usergame
Use this command to add dummy data in table Usergame.

```
npx sequelize-cli db:seed:all
```

to delete data dummy in table Usergame you can use command.

```
npx sequelize-cli db:seed:undo
```



## Run Apps
run app with command in terminal.

```
node index.js
```
or 
```
nodemon index.js
```
if you run the app in development mode.

And then open this link to browser  http://localhost:8000 

```
username: admin
password: admin
```
