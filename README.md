##Convert from Excel to Mongo

 Create collections with sheet name and insert records in the respective collection. 

Set the options for the DB along with the name/location of the workbook to extract data from.

# Usage Sample:

>let e2m = require('exceltomongo');

>options = {
url: 'mongodb://localhost:27017', 
db: 'mydb', workbook: 'sample.xlsx'}

>e2m(options, (err, result) => {
  if (err) throw err;
  console.log(result);
});
