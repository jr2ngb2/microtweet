Minimal twitter implementation with features including login  , signup , follow users , create tweets and timeline with timeline displaying tweets of followed users.
Created using react js , node js , graphql , sequelize , mysql.

The data for the MySQL will persist between launches.

To bring the project up first [install Docker](https://www.docker.com/), then run:

```
docker-compose up
```
Now , you need to run the mysql script provided in data.sql file to populate the database.
The docker-compose.yml file routes port 80 on your host to the React app running on 3000 on the Docker environment, so once the system is up just go to http://localhost.

To bring it down:

```
docker-compose down
```

If you change your Dockerfile and must rebuild the Node.js or React images, run:

```
docker-compose up --build
```

