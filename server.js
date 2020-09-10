const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

//body parser configuration
app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(bodyparser.json());

//first route
app.get('/', (req, res) => res.send('Hello Developer!'));

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 7007;

app.listen(port, () => console.log (`Server Running on Port ${port}`));

//access mongodb
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
.connect(db)
.then(() => console.log('MongodB Connected'))
.catch(err => console.log(err));

