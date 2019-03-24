var express = require('express');
var router = express.Router();

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

let parse = function(data) {
    return apply(
        {
            list: [],
            msg: '',
            title: 'Image Warehouse'
        },
        data
    );
};

router.get('/', function(req, res, next) {
    res.render('index', {
        list: []
    });
});

router.get('/index.html', function(req, res, next) {
    res.render('index', parse({}));
});

router.post('signup', function(req, res, next) {
    user.singup(req.firstName, req.lastName, req.email, req.password, function(
        err,
        data
    ) {
        if (err) {
            res.render('index', parse({ msg: 'Error al registrar usuario' }));
        } else {
            res.render('index', parse({ msg: 'Usuario registrado' }));
        }
    });
});

router.post('signin', function(req, res, next) {
    user.singin(req.email, req.password, function(err, data) {
        if (err) {
            res.render('index', parse({ msg: 'Error en la autenticacion' }));
        } else {
            if (data.lenght) {
                res.render('index', parse({ msg: 'Autenticacion exitosa' }));
            } else {
                res.render(
                    'index',
                    parse({ msg: 'Usuario o contraseña incorrecta.' })
                );
            }
        }
    });
});

router.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            res.render('index', parse({ msg: err }));
        } else {
            if (req.file == undefined) {
                res.render('index', parse({ msg: 'Error: No File Selected!' }));
            } else {
                // res.render('upload', {
                //     msg: 'File Uploaded!',
                //     file: `${config.storage}${req.file.filename}`
                // });
            }
        }
    });
});

module.exports = router;
