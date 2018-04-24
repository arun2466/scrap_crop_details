let {
  DATABASE_NAME
} = require('./constants');
let {
  CONNECTION
} = require('./dbconnection');

let {
  insertMysql,
  selectMysql,
  updateTable
} = require('./mysql');

let websitesList = require('./websites.json');

var checkDB = `SHOW DATABASES LIKE '${DATABASE_NAME}'`;
var q = `
  CREATE DATABASE ${DATABASE_NAME};
  use ${DATABASE_NAME};
  CREATE TABLE websites (
    id int NOT NULL AUTO_INCREMENT,
    website varchar(255),
    website_url varchar(255),
    crops_url varchar(255),
    scrap_status int,
    updated_on DATETIME,
    PRIMARY KEY (id) );
`;

insertWebsites = ( websites, callback ) => {
  if( websites.length == 0 ){
    callback();
  } else {
    let row = websites[0];
    console.log(row)
    websites.splice(0, 1);
    selectMysql('websites', {website: row.website}, (status, res) => {
      if( status == false || res.length == 0 ){
        let INSERTDATA = {
          website: row.website,
          website_url: row.website_url,
          crops_url: row.crops_url
        }
        console.log(INSERTDATA)
        insertMysql('websites', INSERTDATA, (insertStatus, res) => {
          insertWebsites( websitesList, callback);
        })
      } else{
        console.log('wesbite is already exits!!.. skipping insertion');
        insertWebsites( websitesList, callback);
      }
    })
  }
}

CONNECTION.query(checkDB, function(err, results) {
  if (err) {
    console.log('Error occurs')
    console.log(err)
  } else {
    if (results.length > 0) {
      console.log('db already exists')
      insertWebsites( websitesList, () => {
        console.log('all websites inserted!!')
        process.exit();
      })
    } else {
      CONNECTION.query(q, function(err, results) {
        if (err) {
          console.log(err)
          process.exit();
        } else {
          insertWebsites( websitesList, () => {
            console.log('db created!!!')
            console.log('all websites inserted!!')
            process.exit();
          })
        }
      });
    }
  }
});