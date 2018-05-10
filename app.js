const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/index');


const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/formtest')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Express JSON Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', indexRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));