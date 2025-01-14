To start mysql, in the terminal, type in `mysql -u root`

# Create a new database user
In the MySQL CLI:
```
CREATE USER 'ahkow'@'localhost' IDENTIFIED BY 'rotiprata123';
```

```
GRANT ALL PRIVILEGES on sakila.* TO 'ahkow'@'localhost' WITH GRANT OPTION;
```
**Note:** Replace *sakila* with the name of the database you want the user to have access to
 
 ```
FLUSH PRIVILEGES;
```
npm init -y 
npm install express hbs handlebars-helpers wax-on mysql2 dotenv

DB_HOST=localhost
DB_USER=root
DB_NAME=crm
DB_PASSWORD=root123

run - node index.js