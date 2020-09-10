const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

//first route
app.get('/', (req, res) => res.send('Hello Developer!'));

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 7007;

app.listen(port, () => console.log (`Server Running on Port ${port}`));

//db config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
.connect(db)
.then(() => console.log('MongodB Connected'))
.catch(err => console.log(err));

