const {env} = require('../../lib/env/environment');
const { parseFiles } = require('../../lib/file/file-api');


module.exports = (app) => {

    app.get(`/ui/`, (req, res) => {
        const recs = parseFiles('name');
        const output = [];
        recs.forEach((rec) => {output.push(rec.toObject())});

        const data = {
            records: output,
            title: env.title,
            version: env.version,
            sortBy: 'name'
        }

        res.status(200).render('index', data);
    });

    app.get(`/ui/:sort`, (req, res) => {

        const sortOption = req.params.sort.toLowerCase();
        let recs;
        const output = [];

        switch (sortOption) {
            case 'name':
                recs = parseFiles('name');
                break;
            case 'gender':
                recs = parseFiles('gender');
                break;
            case 'birthdate':
                recs = parseFiles('birth');
                break;
            default:
                throw new Error(`${sortOption} is not a supported sort-by option.`);
                break;
        }

        recs.forEach((rec) => {output.push(rec.toObject())});

        const data = {
            records: output,
            title: env.title,
            version: env.version,
            sortBy: sortOption
        }

        res.status(200).render('index', data);
    });    
}