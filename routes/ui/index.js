
module.exports = (app) => {

    app.get(`/ui/`, (req, res) => {
        res.status(200).render('index', {});
    });
}