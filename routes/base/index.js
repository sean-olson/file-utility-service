module.exports = (app) => {

    app.get(`/`, (req, res) => {
        res.status(200).render('service', {message: 'Hello'});
    });
}