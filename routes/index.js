var express = require('express');
var router = express.Router();
var message = {
    type: 'alert',
    msg: ''
};

let user = require('../modules/user');
let upload = require('../modules/upload');
let enumerables = [
    //'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    'valueOf',
    'toLocaleString',
    'toString',
    'constructor'
];
let apply = function(object, config, defaults) {
    if (object) {
        if (defaults) {
            apply(object, defaults);
        }

        if (config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--; ) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }
    }

    return object;
};

let parse = function(data = {}, req) {
    return apply(
        {
            list: [],
            msg: message
        },
        data
    );
};

router.get('/', function(req, res, next) {
    message.msg = 'Welcome...';
    res.render('index', parse());
});

router.get('/index.html', function(req, res, next) {
    res.redirect('/');
});

router.post('/signup', function(req, res, next) {
    user.singup(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password,
        function(err, data) {
            if (err) {
                res.render('index', parse());
            } else {
                res.render('index', parse({ msg: 'Usuario registrado' }));
            }
        }
    );
});

router.post('/signin', function(req, res, next) {
    user.singin(req.body.email, req.body.password, function(err, data) {
        if (err) {
            res.render('index', parse({ msg: 'Error en la autenticacion' }));
        } else {
            if (data.length) {
                req.session.user = data[0].UUID;
                req.session.name = data[0].FIRSTNAME;
                message.msg = 'Autenticacion exitosa';
                message.type = 'success';
                res.redirect('/main');
            } else {
                message.msg = 'Usuario o contraseña incorrecta.';
                message.type = 'danger';
                res.redirect('/');
            }
        }
    });
});

router.post('/signout', function(req, res, next) {
    user.signout(req.email, function(err, data) {
        /**
         * @todo destruir cookie
         */
        res.redirect('/');
    });
});

router.post('/main', (req, res) => {
    upload(req, res, err => {
        if (err) {
            res.render('main', parse({ msg: err }));
        } else {
            if (req.file == undefined) {
                res.render('index', parse({ msg: 'Error: No File Selected!' }));
            } else {
               
            }
        }
    });
});

router.get('/version', function(req, res) {
    var pjson = require('../package.json');
    res.send('v.' + pjson.version);
});
module.exports = router;
