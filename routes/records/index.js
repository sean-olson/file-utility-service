
const { cleanUp, generateFiles, parseFiles } = require('../../lib/file/file-api');

// exports.fileDefinitions = fileDefinitions;
// exports.cleanUp = cleanUp;
// exports.generateFiles = generateFiles;
// exports.haveDataFiles = haveDataFiles;
// exports.fetchDataFiles = fetchDataFiles;
// exports.parseFiles = parseFiles;

module.exports = (app) => {

    /**
     * the default records route
     */

    app.get(`/records/`, (req, res) => {
        const recs = parseFiles('name');
        const output = [];
        recs.forEach((rec) => {output.push(rec.toObject())});
        res.status(200).json({records: output});
    });

    /**
     * records route with sort-by parameter
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
