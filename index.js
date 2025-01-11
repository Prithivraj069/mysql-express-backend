const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();
const {createConnection} = require('mysql2/promise');

let app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

const helpers = require('handlebars-helpers');
// const { createConnection } = require('mysql2');
helpers({
    'handlebars':hbs.handlebars
})



async function main() {
   const connection = await createConnection({
        'host': process.env.DB_HOST,
        'user': process.env.DB_USER,
        'database': process.env.DB_NAME,
        'password': process.env.DB_PASSWORD
    });

    app.get('/',async function (req, res) {
        res.render('index')
    })

    app.get('/customers', async function (req, res) {

        let query = `SELECT * FROM customers JOIN
        companies ON companies.company_id = customers.company_id WHERE 1`

        const bind = [];
        const {first_name, last_name} = req.query;

        if(first_name) {
            query += `AND first_name LIKE ?`;
            bind.push('%' + first_name + '%');
        }

        if(last_name) {
            query += `AND last_name LIKE ?`;
            bind.push('%' + last_name + '%');
        }
        console.log(query);

        const [customers] = await connection.execute({
            'sql': query,
            'nestTables': true
        }, bind);

        res.render('customers.hbs', {
            "allCustomers": customers,
            "searchTerms":req.query
        })
    })
}

main();

app.listen(3000, ()=>{
    console.log("server start");
})

