/*!
 * @author myax <mig_dj@hotmail.com>
 * date 04/04/2019
 * metodos para guardar mensajes a un archivo 
 */
const fs = require('fs');
const writeLog = function(value) {
    var d = new Date(),
        date = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-'),
        dformat =
            date +
            ' ' +
            [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

    fs.appendFileSync(
        'log\\' + date + '.log',
        '[' + dformat + ']\t' + value + '\n',
        function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('Task Log: ', value);
        }
    );
};
module.exports = writeLog;
