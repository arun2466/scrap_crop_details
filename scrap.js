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

saveGame = (tag_game_id, data, callback) => {
  selectMysql('games', {name: data.name, url: data.url }, (status, res) => {
    if( status == false ){
      console.log('Game is already scraped!!.. skipping insertion');
      callback();
    } else{
      let INSERTDATA = {
        tag_game_id: tag_game_id,
        name: data.name,
        description: data.description,
        url: data.url,
        image: data.image,
        swf: data.swf,
        gameControl: data.gameControl,
        gif: data.gif
      }
      console.log(INSERTDATA)
      insertMysql('games', INSERTDATA, (insertStatus, res) => {
        callback();
      })
    }
  })
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
        console.log("Results:", data);
        console.log('----');
    },function(e){
        console.log('****ERROR OCCURS******');
        console.log(e);
    });

    // GENERIC.getHtml(game_url, (status, data) => {
    //   if (status == 'error') {
    //     scrapAllGames( games, callback);
    //   } else {
    //     let gameDetails = GENERIC.extractGameDetailsFromDom(data);
    //     if( gameDetails.name == ''){
    //       callback()
    //     }else{
    //       gameDetails.link = game_url;
    //       saveGame( tag_game_id, gameDetails, () => {
    //         updateTable('tag_games', {status_scrap:1}, {id: tag_game_id}, ( status, res) => {
    //           scrapAllGames( games, callback)
    //         })
    //       })
    //     }
    //   }
    // })
  }
}

start = () => {
  selectMysql('websites', {scrap_status: 0}, (status, res) => {
    if( status == false ){
      console.log('Some error occurs!!');
    } else{
      console.log('Pending to scrap - ' +  res.length );
      if( res.length == 0 ){
        console.log('0 games to process for games!!');
      }else{
        scrapAllWebsites( res, () => {
          console.log('All websites are processed!!');
        })
      }
    }
  })
}

start();