
const { cleanUp, generateFiles, parseFiles, appendRecord } = require('../../lib/file/file-api');
const { helpers } = require('./helpers');

module.exports = (app) => {

    /**
     * the post route to add new records 
     */

    app.post(`/records/`, (req, res) => {
        const record = helpers.parseRecord(req.body)
        const msg = appendRecord(record) ? 'SUCCESS' : 'FAILURE';
        res.status(200).json({msg});
    });

    /**
     * the default records get route
     */

    app.get(`/records/`, (req, res) => {
        const recs = parseFiles('name');
        const output = [];
        recs.forEach((rec) => {output.push(rec.toObject())});
        res.status(200).json({records: output});
    });


    /**
     * deletes the data files and directory
     */

    app.get(`/records/clean`, (req, res) => {
        const msg =  cleanUp() ? 'Data files deleted' : 'Data files not deleted';
        res.status(200).json({message: msg});
    }); 

    /**
     * generates data files
     */

    app.get(`/records/gen`, (req, res) => {
        const msg = generateFiles();
        res.status(200).json({message: msg});
    }); 

    /**
     * generates data files, the number of records per file determined by count with limits: 0 > n < 100 
     */

    app.get(`/records/gen/:count`, (req, res) => {
        const msg = generateFiles(req.params.count);
        res.status(200).json({message: msg});
    }); 

        /**
     * records route with sort-by parameter: name | gender | birth
     */

    app.get(`/records/:sort`, (req, res) => {

        const sortOption = req.params.sort;
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
        res.status(200).json({records: output});

    });   

}
