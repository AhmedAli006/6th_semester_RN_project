var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var app  = express();

app.use(cors())


app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var db = mysql.createPool({
 
    host:'localhost',
    user:'ahmed',
    password:'', //empty for window
    database: 'account'

});



// Creating a GET route that returns data from the 'users' table.
app.get('/user', function (req, res) {
    // Connecting to the database.
    db.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    db.query('SELECT * FROM products', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});
// var db = mysql.createConnection({
 
//     host:'localhost',
//     user:'root',
//     password:'', //empty for window
//     database: 'account'

// });





// app.get('/user', (req, res)=>{
//   db.query('select * from products', function(error, rows, fields){
//         if(error) console.log(error);

//         else{
//             console.log(rows);
//             res.send(rows);

//         }

//   });
//   });

var port = process.env.port || 3000;
  app.listen(port,()=>{
    console.log("listening on port" , port)
  })


// var express = require('express');

// var mysql = require('mysql');
// var bodyParser = require('body-parser');

// var app  = express();
// app.use(bodyParser.json({type:'application/json'}));
// app.use(bodyParser.urlencoded({extended:true}));

// var con = mysql.createConnection({
 
//     host:'localhost',
//     user:'id20405498_root',
//     password:'Ahmed.123', //empty for window
//     database: 'id20405498_ahmed'

// });



// con.connect(function(error){
//   if(error) console.log(error);
//   else console.log("connected");
// });

// app.get('/user', function(req, res){
//   con.query('select * from products', function(error, rows, fields){
//         if(error) console.log(error);

//         else{
//             console.log(rows);
//             res.send(rows);

//         }

//   });
// });
// var port = process.env.port || 3000;
//   app.listen(port,()=>{
//     console.log("listening on port" , port)
//   })