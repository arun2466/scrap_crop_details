var Spooky = require('spooky');
var path = require('path');
var jquery = path.resolve('./jquery.min.js');

module.exports= function( DATA, callback_success, callback_error ) {
  let url = DATA.url;

  url ="https://www.google.com/";

  console.log('url----' + url )
  website = DATA.website;

  if( typeof url == 'undefined' || url == '' ){
    callback_success(false);
  } else{
    var product_details = {};
    var spooky = new Spooky({
      child: {
        // "proxy": '10.132.86.78:60099',
        // "port": r.integer(60000, 65000),
        // "transport": 'http',
        // "ssl-protocol": "tlsv1",
        // "ignore-ssl-errors": true
      },
      casper: {
        logLevel      : "debug",
        verbose       : true,
        clientScripts : jquery,
        pageSettings: {
          userAgent : "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0"
        }
      }, function (err) {
        if (err) {
          e = new Error('Failed to initialize SpookyJS');
          e.details = err;
          throw e;
        }
        spooky.start( url, function(){});
        // spooky.wait(5000,function(){});
        // spooky.capture('aun.png');
        // spooky.then([{DATA : DATA},function(){
        //   if( DATA.website == 'fceisabel' ){
        //     inventory_details = this.evaluate(function( CONFIG_SKU ){
        //       if( jQuery('a[style="font-size:140%"]').length > 0 ){
        //         product_title = jQuery('a[style="font-size:140%"]').text();
        //       }
        //       var ret = [];
        //       row = {
        //         product_title : 'arun kumar',
        //       }
        //       ret.push( row );
        //       return ret;
        //     },{
        //       CONFIG_SKU : 'aaa',
        //     });
        //   }
        //   this.emit( 'output_data', inventory_details );
        // }]);
        spooky.run();
      }});
    //**********************************************
    //**********************************************
    spooky.on('output_data', function ( data ) {
      product_details = data;
      callback_success(data);
    });
    spooky.on('error', function (e, stack) {
      console.log(e);
      callback_error(e);
    });
    spooky.on('run.complete', function (e, stack) {
      if(e){
        callback_error(e);
      }
      callback_success(product_details);
    });
    spooky.on('console', function (line) {
      console.log(line);
    });
    spooky.on('logg', function (line) {
      console.log(line);
    });
  }
};