var express = require('express');
var router = express.Router();

let user = require('../modules/user');
let upload = require('../modules/upload');

function getResult(config = {}) {
    return {
        redirect: config.redirect || null,
        view: config.view || 'index',
        message: {
            msg: config.msg || '',
            type: config.type || 'success'
        },
        list: config.data || [],
        session: false
    };
}

function handler(req, res) {
    var result = req.dataProcessed || getResult();
    if (req.session.uuid) {
        result.session = true;
    } else {
        if (req.path != '/') {
            result.redirect = '/';
        }
    }

    if (result.redirect) {
        res.redirect(result.redirect);
    } else {
        res.render(result.view || 'index', result);
    }
}

router.get('/', handler);

router.get('/index', handler);

router.post(
    '/signup',
    function(req, res, next) {
        user.singup(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            function(err, data) {
                req.dataProcessed = err
                    ? getResult({
                        msg: 'Error al registrar un usuario.',
                        type: 'error'
                    })
                    : getResult({ msg: 'Usuario registrado' });

                return next();
            }
        );
    },
    handler
);

router.post(
    '/signin',
    function(req, res, next) {
        user.singin(req.body.email, req.body.password, function(
            err,
            data = []
        ) {
            req.dataProcessed =
                err || !data.length
                    ? getResult({
                        msg: 'Usuario o contraseña incorrecta.',
                        type: 'danger'
                    })
                    : getResult({
                        redirect: '/main'
                    });
            if (data.length) {
                req.session.uuid = data[0].UUID;
                req.session.user = data[0].EMAIL;
            }
            return next();
        });
    },
    handler
);

router.post(
    '/signout',
    function(req, res, next) {
        user.signout(req.email, function(err, data) {
            if (req.session.uuid) {
                req.session.destroy(function(err) {
                    res.redirect('/');
                });
            } else {
                res.redirect('/');
            }
        });
    },
    handler
);

router.get(
    '/main',
    function(req, res, next) {
        res.dataProcessed = getResult({
            view: 'main'
        });
        return next();
    },
    handler
);

router.post('/main', (req, res) => {
    upload(req, res, err => {
        if (err) {
            res.render('main', getResult({ msg: err }));
        } else {
            /**
             * @todo consultar el listado de imagenes del usuario
             */

            res.render('main', getResult({ data: [] }));
        }
    });
});

router.get('/version', function(req, res) {
    var pjson = require('../package.json');
    res.send('v.' + pjson.version);
});
module.exports = router;
