const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

// import routes
const routes = require('./routes/routes');

// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// routes middleware
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
