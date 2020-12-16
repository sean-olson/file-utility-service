const { env } = require('../../lib/env/environment');
const { helpers } = require('./helpers');


module.exports = (app) => {
    app.get(`/`, (req, res) => {
        data = {
            title: env.title,
            version: env.version,
            port: env.httpPort,
            routes: helpers.getRoutes(app)
        }
        res.status(200).render('service', data);
    });
}