// const express = require('express');
// const cookieParser = require("cookie-parser");
// const path = require('path');
// const mongoose = require('mongoose');
// const env = require("dotenv").config()
// let flash = require("connect-flash");
// const formidableMiddleware = require("express-formidable-v2");


// const checkAuthentication = require('./services/authentication.js');
// const homeRoutes = require("./routes/homeRoutes.js");
// const scheduleRoutes = require("./routes/scheduleRoutes.js");
// const dashboardRoutes = require("./routes/dashboardRoutes.js");

// const mongoURL = process.env.DATABASE_URL
// const port = process.env.WEBSITE_PORT || 4000;

// const app = express();

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(mongoURL);
// }


// app.set('view engine', "ejs");
// app.set('views', path.resolve('./views'));
// app.use(express.urlencoded({extended : true}));
// app.use(express.static(path.join(__dirname , "public")));
// app.use(cookieParser());
// app.use(flash());
// app.use(express.json({ limit: "25mb" }));
// app.use(formidableMiddleware())

// // Home Routes
// app.use("/dashboard",checkAuthentication("token"), dashboardRoutes)
// app.use("/", homeRoutes);
// app.use("/schedule", scheduleRoutes)



// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const formidableMiddleware = require('express-formidable-v2');

const checkAuthentication = require('./services/authentication.js');
const homeRoutes = require('./routes/homeRoutes.js');
const scheduleRoutes = require('./routes/scheduleRoutes.js');
const dashboardRoutes = require('./routes/dashboardRoutes.js');

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error('Error loading environment variables:', result.error);
  process.exit(1);
}

const mongoURL = process.env.DATABASE_URL;
const port = process.env.WEBSITE_PORT || 4000;

const app = express();

// Connect to MongoDB
main().catch((err) => console.error('MongoDB connection error:', err));

async function main() {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());
app.use(express.json());
app.use(formidableMiddleware());

// Security headers
app.use(helmet());

// Express session for flash messages
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);

// Body parser for JSON
app.use(express.json({ limit: '25mb' }));

// Logging HTTP requests
app.use(morgan('dev'));

// Home Routes
app.use('/dashboard', checkAuthentication('token'), dashboardRoutes);
app.use('/', homeRoutes);
app.use('/schedule', scheduleRoutes);

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
