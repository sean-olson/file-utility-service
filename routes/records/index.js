
module.exports = (app) => {

    /**
     * the default records route
     */

    app.get(`/records/`, (req, res) => {
        res.status(200).json({route: '/records/'});
    });

    /**
     * 
     */

    app.get(`/records/:sort`, (req, res) => {
        const sortOption = req.params.sort;
        res.status(200).json({route: `/records/${sortOption}`});
    });


}
