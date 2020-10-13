require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const session = require('cookie-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const app = express();
app.set('trust proxy', 1)
// 'mongodb://arsms:12345676@162.0.239.17/admin?authSource=admin'

mongoose.connect(
    'mongodb+srv://Amirshahinx:Amirshahinx1@cluster0.bawms.gcp.mongodb.net/ps_fast_vpn?retryWrites=true&w=majority'
    ,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
app.use(session({
    secret: process.env.SESSION_SECRET
}
));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true
}));
app.use(express.static(path.join(__dirname, './public')))
app.use('/users', usersRouter);

app.post('/upload-avatar', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./public/pig.jpg');

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
app.use(function (req, res, next) {
    if (req.originalUrl.startsWith('/admin')) {
        if (req.session.isUser != true) {
            if (req.originalUrl.startsWith('/admin/login') ||
                req.originalUrl.startsWith('/admin/register') ||
                req.originalUrl.startsWith('/admin/assets') ||
                req.originalUrl.startsWith('/admin/vendors')
            ) {
                next()
            } else {
                res.redirect('/admin/login')
            }
        } else {
            next()
        }
    } else {
        next()
    }
})

app.use('/admin', adminRouter);
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
