// var Spooky = require('spooky');

try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

var path = require('path');
var jquery = path.resolve('./jquery-3.3.1.min.js');

module.exports= function( DATA, callback_success, callback_error ) {
  let url = DATA.url;

  // url ="https://www.google.com/";

  // console.log('url----' + url )
  website = DATA.website;

  if( typeof url == 'undefined' || url == '' ){
    callback_success(false);
  } else{
    var product_details = {};
    var spooky = new Spooky({
      child: {
        // "proxy": '10.132.86.78:60099',
        // "port": r.integer(60000, 65000),
        "transport": 'http',
        // "ssl-protocol": "tlsv1",
        "ignore-ssl-errors": true
      },
      casper: {
        logLevel      : "debug",
        verbose       : true,
        clientScripts : jquery,
        pageSettings: {
          userAgent : "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0"
        }
      }}, function (err) {
        if (err) {
          e = new Error('Failed to initialize SpookyJS');
          e.details = err;
          throw e;
        }
        spooky.start( url, function(){

          this.page.injectJs('./jquery-3.3.1.min.js');

        });
        // spooky.wait(5000,function(){});


        // spooky.thenEvaluate( function(){
        //   // var aa = jQuery('body').length();
        //   this.emit( 'output_data', "aaaa" );
        // })

        spooky.then( function(){
          crop_details = this.evaluate( function(){
            var crops = [];
            $('.homepage_quoteboard tr').each(function(){
              var check = $(this).attr('class');
              if( check == 'odd' || check == 'even' ){
                var crop_name = delivery_start = delivery_end = basis_month = future_price  = basis = cash_price  = future_change = '';
                if( $(this).find('td:nth-child(1)').length > 0 ){
                  crop_name = $(this).find('td:nth-child(1)').text();
                }
                if( $(this).find('td:nth-child(3)').length > 0 ){
                  delivery_start = $(this).find('td:nth-child(3)').text();
                }
                if( $(this).find('td:nth-child(4)').length > 0 ){
                  delivery_end = $(this).find('td:nth-child(4)').text();
                }
                if( $(this).find('td:nth-child(5)').length > 0 ){
                  basis_month = $(this).find('td:nth-child(5)').text();
                }
                if( $(this).find('td:nth-child(6)').length > 0 ){
                  future_price = $(this).find('td:nth-child(6)').text();
                }
                if( $(this).find('td:nth-child(7)').length > 0 ){
                  basis = $(this).find('td:nth-child(7)').text();
                }
                if( $(this).find('td:nth-child(8)').length > 0 ){
                  cash_price = $(this).find('td:nth-child(8)').text();
                }
                if( $(this).find('td:nth-child(9)').length > 0 ){
                  future_change = $(this).find('td:nth-child(9)').text();
                }
                var row = {
                  crop_name : crop_name.trim(),
                  delivery_start : delivery_start.trim(),
                  delivery_end : delivery_end.trim(),
                  basis_month : basis_month.trim(),
                  future_price : future_price.trim(),
                  basis : basis.trim(),
                  cash_price : cash_price.trim(),
                  future_change : future_change.trim()
                }
                crops.push( row );
              }
            })
            return crops;
          })
          this.emit( 'output_data',crop_details );
        })
        spooky.run();
      });

        //**********************************************
        // **********************************************
        spooky.on('output_data', function ( data ) {
          // console.log('-----output_data--------')
          // console.log( data )
          // product_details = data;
          callback_success(data);
        });


        spooky.on('error', function (e, stack) {
          console.log(e);
          callback_error(e);
        });
        // spooky.on('run.complete', function (e, stack) {
        //   if(e){
        //     callback_error(e);
        //   }
        //   callback_success(product_details);
        // });
        spooky.on('console', function (line) {
          // console.log(line);
        });
        // spooky.on('log', function (line) {
        //   console.log(line);
        // });

        spooky.on('exit', function () {
            // console.log('###############EXIT');
            // console.log(Spooky._instances);
        });



  }
};