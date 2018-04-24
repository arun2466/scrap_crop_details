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


createCropsTable = ( callback ) => {
  console.log('-start----createCropsTable')
  var q1 = `SHOW TABLES FROM ${DATABASE_NAME} LIKE 'crops'`;

  CONNECTION.query(q1, function(err, results) {
    if (err) {
      console.log('Error occurs')
      console.log(err)
    } else {
      console.log(err)
      console.log(results)
      if( results.length == 0 ){

        var q2 = `
          use ${DATABASE_NAME};
          CREATE TABLE crops (
            id int NOT NULL AUTO_INCREMENT,
            website_id int,
            crop_name varchar(255),
            cash_price varchar(255),
            updated_on DATETIME,
            PRIMARY KEY (id),
            FOREIGN KEY (website_id) REFERENCES websites(id)
            );
        `;

        CONNECTION.query(q2, function(err, results) {
          if (err) {
            console.log(err)
            process.exit();
          } else {
            console.log('crops table created!!!')
            callback();
          }
        });
      } else{
        callback();
      }
    }
  })

}

insertWebsites = ( websites, callback ) => {
  if( websites.length == 0 ){
    console.log('all websites inserted!!')
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
        createCropsTable( () => {
          process.exit();
        });
      })
    } else {
      CONNECTION.query(q, function(err, results) {
        if (err) {
          console.log(err)
          process.exit();
        } else {
          console.log('db created!!!')
          insertWebsites( websitesList, () => {
            createCropsTable( () => {
              process.exit();
            });
          })
        }
      });
    }
  }
});