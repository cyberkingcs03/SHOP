const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Database connection
const db = new sqlite3.Database('./db.sqlite');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'vulnerable-secret', resave: false, saveUninitialized: true }));

// Serve static files from the views folder
app.use(express.static('views'));

// Vulnerable login route (SQL Injection)
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // SQL Injection vulnerability: directly including user input in SQL query
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
  db.get(query, (err, row) => {
    if (err) {
      res.send('Database error.');
    } else if (row) {
      req.session.username = username;
      res.redirect('/products');
    } else {
      res.send('Invalid login.');
    }
  });
});

// Vulnerable registration (Insecure password storage)
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password; // Store password in plain text

  const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  
  db.run(query, function(err) {
    if (err) {
      res.send('Error registering.');
    } else {
      res.redirect('/login.html');
    }
  });
});

// Product page (XSS vulnerability)
app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.send('Error fetching products.');
    } else {
      let productHTML = '<h1>Product Catalog</h1>';
      rows.forEach(row => {
        // XSS vulnerability: no escaping of product details
        productHTML += `<div><h3>${row.name}</h3><p>${row.description}</p><p>$${row.price}</p></div>`;
      });
      res.send(productHTML);
    }
  });
});

// Route to render the "Add Product" form
app.get('/add-product.html', (req, res) => {
  res.sendFile(__dirname + '/views/add-product.html');
});

// Vulnerable route to insert products into the database (No input validation)
app.post('/add-product', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  // SQL query with no input validation - vulnerable to SQL Injection or XSS
  const query = `INSERT INTO products (name, description, price) VALUES ('${name}', '${description}', ${price})`;

  db.run(query, function(err) {
    if (err) {
      res.send('Error adding product.');
    } else {
      res.send('Product added successfully! <a href="/products">View Products</a>');
    }
  });
});


// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
