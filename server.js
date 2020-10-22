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

app.get('/api/customers',(req, res) => {
  connection.query(
      'SELECT * FROM CUSTOMER',
      (err, rows, fields) => {
          res.send(rows);
      }
  )
});

app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)";
    let name = req.body.name;
    let date = req.body.date;
    let machine = req.body.machine;
    let image = '/image/' + req.file.filename;
    let tvid = req.body.tvid;
    let params = [name, date, machine, image, tvid];
    connection.query(sql, params,
        (err, rows, fileds) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening On port ${port}`))