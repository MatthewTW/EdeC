// node-soap functionality ***********************
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var fs = require('fs');
var NodeCache = require( "node-cache" );
var mysql     = require('mysql');
var bcrypt    = require('bcrypt-nodejs');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   database : 'edec',
//   user     : 'root'
// });

var connection = mysql.createConnection({
  host     : '85.122.23.145',
  database : 'EDeC',
  user     : 'EDeC',
  password : 'HYsMJeN3LH'
});

connection.connect();


// Variables declaration

var products = new NodeCache();
var commentLimit = []; commentLimit[0] = 0;

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp*1000);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var day = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate() < 10 ? day[a.getDate()] : a.getDate();
  var time = year + '-' + month + '-' + date;
  return time;
}

function dateParser(date) {
  var arr = date.split('-');
  var newDate = arr[2] + '-' + arr[0] + '-' + arr[1];
  return newDate;
}

function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd < 10) {
      dd='0'+dd
  } 

  if(mm < 10) {
      mm='0'+mm
  } 

  today = dd+'-'+mm+'-'+yyyy;
  return today;
}

//************************************************

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.get('/api/homepage', function(req, res) {
    var response = {
      randomProducts: '',
      username: 0
    }
    var getRandomProductsQuery = 'SELECT id_product, name, description, image FROM product ORDER BY RAND() LIMIT 4';
    connection.query(getRandomProductsQuery, function(err, rows, fields) {
      if (err) throw err;
      response.randomProducts = rows;

      if (req.session.username) {
        response.username = req.session.username;
      }

      res.json(response);

    });
  });

  app.get('/api/products/:pager', function(req, res) {
    var limitUpperProduct = req.params.pager;
    var limitLowerProduct = req.params.pager - 1;
    var queryStringProducts = 'SELECT id_product, name, description, rating, image FROM product WHERE id_product BETWEEN 12*?+1 AND 12*?';
    connection.query (queryStringUsername, [limitLowerProduct, limitUpperProduct], function(err, rows, fields) {
         if (err) throw err;
         res.json(rows);
    });        
  });

  app.get('/api/product/:idProduct/comments/:pager', function(req, res) {
    var response = {
      productData: '',
      productComments: ''
    };

    var queryStringProduct = 'SELECT * FROM product WHERE id_product=?';
    var queryStringComments = 'SELECT u.username, DATE_FORMAT(c.postDate,"%d/%m/%Y") AS postDate, c.comm, c.rating FROM comments c JOIN users u ON c.id_user=u.id_users WHERE c.id_product=' + req.params.idProduct + ' ORDER BY c.postDate DESC LIMIT 4 ';

    connection.query(queryStringProduct, [req.params.idProduct], function(err, rows, fields) {
        if (err) throw err;
        response.productData = rows;
        connection.query(queryStringComments, function(err, rows, fields) {
        if (err) throw err;
         response.productComments = rows;
         res.json(response);
        });   
    });        
  });

  app.get('/api/product/:idProduct', function(req, res) {
    var response = {
      productData: '',
      productComments: ''
    };
    var queryStringProduct = 'SELECT * FROM product WHERE id_product=?';
    var queryStringComments = 'SELECT u.username, DATE_FORMAT(c.postDate,"%d/%m/%Y") AS postDate, c.comm, c.rating FROM comments c JOIN users u ON c.id_user=u.id_users WHERE c.id_product=' + req.params.idProduct + ' ORDER BY c.postDate DESC LIMIT 4 ';

    connection.query (queryStringProduct, [req.params.idProduct], function(err, rows, fields) {
        if (err) throw err;
        response.productData = rows;
        connection.query (queryStringComments, function(err, rows, fields) {
        if (err) throw err;
         response.productComments = rows;
         res.json(response);
        });   
    });        
  });
 
  app.get('/api/profile', function(req, res) {
    var queryStringUser = 'SELECT id_users, username, mail, name, lastname, gender, DATE_FORMAT(birthday,"%d/%m/%Y") AS birthday, address FROM users WHERE username = ?';
    connection.query (queryStringUser, [req.session.username], function(err, rows, fields) {
         if (err) throw err;
         res.json(rows);
    }); 
  });

  app.post('/api/profile', function(req, res) {
    if (req.body.mail !== undefined) {
      var queryStringUpdateWithoutPassword = 'UPDATE users SET mail = ?, name = ?, lastname = ?, address = ? WHERE username = ?';
      var queryStringUpdateWithPassword = 'UPDATE users SET password = ?, MAIL = ?, NAME = ?, LASTNAME = ?, ADDRESS = ? WHERE username = ?';
      //var queryStringUsername = 'SELECT Count(username) AS userNumber FROM users WHERE username= ?  and id_users != ?';
      var hidden = {
        name    : req.body.hidden_first_name != '' ? req.body.hidden_first_name : null,
        lname   : req.body.hidden_last_name != '' ? req.body.hidden_last_name : null,
        address : req.body.hidden_address != '' ? req.body.hidden_address : null,
        mail    : req.body.hidden_mail
      };
      var temp = {
        name       :  req.body.first_name,
        lname      :  req.body.last_name,
        address    :  req.body.address,
        mail       :  req.body.mail
      };
      oracleConnection.execute('SELECT mail, name, lastname, address FROM users WHERE username = ?', [req.session.username], function(err, rows, fields) {
        if (err) throw err;
        else {
          if (rows[0].name != hidden.name || rows[0].lastname != hidden.lname || rows[0].address != hidden.address || rows[0].mail != hidden.mail) {
            res.redirect('/profile?error=1');
          } else {
            if (req.body.password) {
              temp.password = bcrypt.hashSync(req.body.password);
              oracleConnection.execute(queryStringUpdateWithPassword, [temp.password, temp.mail, temp.name, temp.lname, temp.address, req.session.username], function(err, rows, fields) {
                if (err) throw err;
                res.redirect('/profile?error=0');
              });
            } else {
              oracleConnection.execute(queryStringUpdateWithoutPassword, [temp.mail, temp.name, temp.lname, temp.address, req.session.username], function(err, rows, fields) {
                if (err) throw err;
                res.redirect('/profile?error=0');
              });
            }
          }
        }
      }); 
    }       
  });
  
  app.post('/api/register', function(req, res) {
    var ok=1;
    var queryStringUsername = 'SELECT Count(username) AS userNumber FROM users WHERE username = ? ';
    var queryStringMail = 'SELECT Count(mail) AS mailNumber FROM users WHERE mail = ? ';
    var queryStringInsert = 'INSERT INTO users SET ?';
    var temp = {
        username : req.body.username ,
        password : bcrypt.hashSync(req.body.password),
        question : req.body.security_question , 
        answer   : req.body.security_answer ,
        mail     : req.body.mail ,
        name     : req.body.first_name ,
        lastname : req.body.last_name ,
        gender   : req.body.gender ,
        birthday : req.body.birthday ,
        address  : req.body.address
    };

    var registerErrorCode = 0;

    if (temp.username) {
       connection.query (queryStringUsername, [temp.username], function(err, rows, fields) {
        if (err) throw err;
          if(rows[0].userNumber > 0) {
                registerErrorCode = 1;
                res.redirect('/register?error=' + registerErrorCode);
          } else {
            connection.query (queryStringMail, [temp.mail], function(err, rows, fields) {
              if (err) throw err;

              if(rows[0].mailNumber > 0) {
                  registerErrorCode = 2;
                  res.redirect('/register?error=' + registerErrorCode);
              } else {
                connection.query ('INSERT INTO users SET ?', temp, function(err, rows, fields) {
                  if (err) throw err;
                  res.redirect('/register?error=' + registerErrorCode);
                });
              }
            });
          }
          
      });
    }
  });

  app.post('/api/login', function(req, res) {
    var queryStringLogin = 'SELECT password FROM users WHERE username = ?';
    var loginErrorCode = 0;
    connection.query(queryStringLogin, [req.body.username], function(err, rows, fields) {
      if (err) throw err;
   
      if (rows[0] == null) {
        loginErrorCode = 1;
        res.redirect('/login?error=' + loginErrorCode);
      } else if (!bcrypt.compareSync(req.body.password, rows[0].password)) {
        loginErrorCode = 1;
        res.redirect('/login?error=' + loginErrorCode);
      } else {
        req.session.username = req.body.username;
        res.redirect('/homepage');
      }
    })
  });

  app.get('/api/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });
          
  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};