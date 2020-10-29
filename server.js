const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
const upload = multer({dest:'./upload'})

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

// Read Customer
app.get('/api/customers',(req, res) => {
  connection.query(
      'SELECT * FROM CUSTOMER WHERE isDeleted = 0',
      (err, rows, fields) => {
          res.send(rows);
      }
  )
});

// Read Customer Specific
app.get('/api/customers/:id',(req, res) => {
    console.log(req.body.id)
    connection.query(
        'SELECT * FROM CUSTOMER WHERE id = ?', req.params.id,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.use('/image', express.static('./upload'));

// Add Customer
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
    let name = req.body.name;
    let date = req.body.date;
    let machine = req.body.machine;
    let tvid = req.body.tvid;
    let image = '';
    let params = [,];
    if (req.file) {
        image = '/image/' + req.file.filename;
        params = [name, date, machine, image, tvid];
        connection.query(sql, params,
            (err, rows, fields) => {
                res.send(rows);
            }  
        )
    } else {
        image = '/image/noimage.png'
        params = [name, date, machine, image, tvid];
        connection.query(sql, params,
            (err, rows, fields) => {
                res.send(rows);
            }  
        )
    }
});

// Delete Customer
app.delete('/api/customers/delete/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

// Customer AS
app.get('/customers/:id', (req, res) => {
        connection.query(
            'SELECT * FROM CUSTOMER_AS WHERE isDeleted = 0',
            (err, rows, fields) => {
                res.send(rows);
            }
        )
    }
)

app.listen(port, () => console.log(`Listening On port ${port}`))