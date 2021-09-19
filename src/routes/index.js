const home = require('./home');
const me = require('./me');
const type = require('./type');


function route(app){
    app.use('/type', type);
    app.use('/me', me);
    app.use('/', home);
}

module.exports = route;