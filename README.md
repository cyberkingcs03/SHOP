# Vulnerable Shopping Website
This project is a deliberately vulnerable Node.js web application built as a learning tool for application security, DevSecOps practices, and testing. The project showcases common web vulnerabilities and integrates continuous integration (CI) with security scanning tools like ESLint (SAST), Snyk (dependency scanning), and OWASP ZAP (DAST).

###  Features
Simple shopping website with:
- User registration and login functionality.
- Product catalog page.
- Basic session management.

  
Vulnerabilities for demonstration purposes, including:
- SQL Injection
- Cross-Site Scripting (XSS)
- Insecure password storage
- Weak session handling

  
Continuous Integration (CI) with security testing tools:
- ESLint for static code analysis.
- Snyk for dependency vulnerability scanning.
- OWASP ZAP for dynamic application security testing.



## Table of Contents 
* Project Setup
* Vulnerabilities in the Application
* CI/CD Pipeline Setup
* Security Tools Integrated
* How to Run Locally
* License



## Project Setup

### 1. Intialize the project:

The project is built using Node.js with Express as the backend framework and SQLite as the database.

1. Initialize the project:

   ~~~
   mkdir vulnerable-shopping-site
   cd vulnerable-shopping-site
   npm init -y

   ~~~
2. Install dependencies:

   ~~~
   npm install express sqlite3 body-parser express-session
   ~~~

### 2. Create a Basic Node.js Application

Create the core files for the project:

* index.js: Contains the main logic for routes (login, registration, product listing).
* views/: HTML files for the frontend (e.g., login.html, register.html, products.html).



### 3. Create a Basic Node.js Application
* Create the SQLite Database file db.sqlite
* Create users and products tables: Run the following SQL commands in the SQLite CLI:

~~~
CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL);
~~~

### 4. Add Vulnerable Routes
Routes include basic functionality like login, registration, and product display with deliberately vulnerable code for security testing (e.g., SQL Injection in login and XSS in product display)

### 5. Push Code to GitHub
1. Initialize Git:

   ~~~
   git init
   git add .
   git commit -m "Initial commit of vulnerable shopping website"
   ~~~

2. Create a GitHub repository and link the local repository:

   ~~~
   git remote add origin https://github.com/YOUR_USERNAME/vulnerable-shopping-site.git
   git branch -M main
   git push -u origin main

   ~~~
   
## Vulnerabilities in the application

The application deliberately introduces the following vulnerabilities for demonstration purposes:

### 1 . SQL Injection
* The login route is vulnerable to SQL Injection because user input is directly injected into SQL queries without sanitization.

  Example:

  ~~~
  SELECT * FROM users WHERE username = '' OR '1'='1' -- ' AND password = 'password';
  ~~~

### 2. Cross-Site Scripting (XSS):

* Product descriptions are not properly escaped, allowing an attacker to inject malicious scripts into the product catalog page.

  Example: Add a product with  `<script>alert('XSS');</script>` in the name.


### 3. Insecure Password Storage:

* Passwords are stored as plain text in the database without hashing.
  
### 4. Weak Session Management:

* Session secret is hardcoded, and there are no advanced security flags for session cookies.
