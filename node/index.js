const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'mysqlnode'
}
const mysql = require('mysql')
let connection = mysql.createConnection(config)

let sql = `INSERT INTO people(name) values('FullCycle')`
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
    connection = mysql.createConnection(config)
    sql = "SELECT name FROM people"
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        let html = '<h1>Full Cycle Rocks!</h1>'
        html += '<ul>'
        Object.keys(result).forEach(function(key) {
            html += '<li>' + result[key].name + '</li>'
        }) 
        html += '</ul>'
        res.send(html)
    })
    connection.end()
})

app.listen(port, () => {
    console.log('Porta: ' + port)
})