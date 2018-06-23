let MongoClient = require('mongodb').MongoClient;
let xlsx = require('xlsx');

function insertData(options, callback) {
    const workbook = xlsx.readFile(options.workbook);
    let sheet_name_list = workbook.SheetNames;
    MongoClient.connect(options.url, (err, db) => {
        if (err) callback(err)
        let dbo = db.db(options.db);
        for (let i = 0; i < sheet_name_list.length; i++) {
            let records = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]);
            if (records.length) {
                dbo.createCollection(sheet_name_list[i], (err, res) => {
                    if (err) callback(err);
                    dbo.collection(sheet_name_list[i]).insertMany(records, (err, res) => {
                        if (err) callback(err)
                        db.close();
                        callback(err, res);
                    });
                });
            }
        }
    });
}
module.exports = insertData;