Sampa Challenge

## installation:
this project supposed to be dockerized but time was late and all this code written in one day, so installation is manual :<br/>
prerequisite:  `docker and docker compose`<br/>
`docker compose up -d`<br/>
`cp .env.example .env`<br/>
`docker compose exec nest bash`<br/>
`yarn`<br/>
`npx prisma db push`
`npx prisma db seed`


if your internet provider has a restriction on docker domains, you may need change in dns or
Virtual private network access to download respecting volumes.<br/>
volumes:<br/>
* application access http://localhost:3001<br/>
* phpmyadmin access http://localhost:8080<br/>
* elasticsearch access http://localhost:9200<br/>

container down with `docker compose down` <br/>

first login and then set bearer token in postman<br/>

## description
this project apis are exported with postman collection.<br/>

this project provides jwt auth and nearby api by elasticsearch
## Note
the procedure of assigning task was unexpected and i was on trip, this task is accomplished just in one day, so some requested features are missing.  