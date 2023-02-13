const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// put your mongoURL here
const url = '';

// Login route
app.post('/login', (req, res) => {
  // Retrieve email and password data from the request body
  const email = req.body.email;
  const password = req.body.password;

  // Connect to the MongoDB database
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log('Error connecting to MongoDB', err);
      res.send('Error connecting to the database');
    } else {
      console.log('Connected to MongoDB');

      // Query the users collection for a matching email and password
      // Make sure to change these, you need to use your own collection and modify based on the structure. (yaane try not to make it too complicated)
      const db = client.db('mydb');
      const users = db.collection('users');
      users.findOne({ email: email, password: password }, (err, user) => {
        if (err) {
          console.log('Error querying users collection', err);
          res.send('Error querying database');
        } else if (user) {
          console.log('User authenticated:', user);

          // Set a session token or cookie to authenticate the user
          // redirect
          res.redirect('/login.html');
        } else {
          console.log('Invalid email or password');
          res.send('Invalid email or password');
        }

        client.close();
      });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});