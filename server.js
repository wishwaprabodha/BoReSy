const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const apiRouter = require('./app/api.router');
const viewRouter = require('./view.router');
const adminRouter = require('./admin/admin.router');

const dbConfig = require('./app/config/db.config');

const app = express();

//database
dbConfig();

//middleware integration
app.use(session({
    name: 'server-session-cookie-id',
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//routes define
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/', viewRouter);

//start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`server started on port ${PORT}`);
})
