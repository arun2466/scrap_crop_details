let {
  DB_CONNECTION
} = require('./dbconnection');

let {
  insertMysql,
  selectMysql,
  updateTable
} = require('./mysql');

// let GENERIC = require('./generic');

let scraper = require('./website_scraper.js');

const url_tags = "http://www.y8.com/tags";

saveCrops = ( website, data, callback) => {
  if (data.length == 0) {
    callback('all are done')
  } else {
    row = data[0];
    data.splice(0, 1);
    let INSERTDATA = {
      basis: row.basis || '',
      basis_month: row.basis_month || '',
      cash_price: row.cash_price || '',
      crop_name: row.crop_name || '',
      delivery_end: row.delivery_end || '',
      delivery_start: row.delivery_start || '',
      future_change: row.future_change || '',
      future_price: row.future_price || '',
      website_id: website.id
    }
    insertMysql('crops', INSERTDATA, (insertStatus, res) => {
      saveCrops(website, data, callback)
    })
  }
}



scrapAllWebsites = ( websites, callback ) => {
  console.log('\b\b***************************************************');
  console.log('Pending websites to process  :: ' + websites.length);
  console.log('***************************************************');
  if( websites.length == 0 ){
    callback();
  } else {
    row = websites[0];
    websites.splice(0, 1);
    let website_id = row.id;
    let url = row.crops_url;
    console.log(website_id + ' ----- '+ row.website)
    row.url = row.crops_url;
    scraper( row, function(data) {
      console.log('****SUCCESS OCCURS******');
      console.log("Results : ", data.length);
      updateTable('websites', {scrap_status:1}, {id: row.id}, ( status, res) => {
        if( data.length > 0 ){
          saveCrops( row, data, () => {
            scrapAllWebsites( websites, callback )
          })
        }else{
          scrapAllWebsites( websites, callback )
        }
      })
    },function(e){
        console.log('****ERROR OCCURS******');
        console.log(e);
        updateTable('websites', {scrap_status:1}, {id: row.id}, ( status, res) => {
          scrapAllWebsites( websites, callback )
        })
    });
  }
}

start = () => {
  selectMysql('websites', {scrap_status: 0}, (status, res) => {
    if( status == false ){
      console.log('Some error occurs!!');
      process.exit(0);
    } else{
      console.log('Pending to scrap - ' +  res.length );
      if( res.length == 0 ){
        console.log('no crop website with scrap_status = 0 !!');
        process.exit(0);
      }else{
        scrapAllWebsites( res, () => {
          console.log('All websites are processed!!');
          process.exit(0);
        })
      }
    }
  })
}

start();