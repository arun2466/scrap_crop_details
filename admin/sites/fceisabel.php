<?php
    class fceisabel{

      public function getWebsiteUrl(){
          return 'http://www.fceisabel.com';
      }

      public static function getCropDetails( $html ){
        $data = array();
        phpQuery::newDocumentHTML($html);

        echo sizeof(pq('table.homepage_quoteboard')->find('tr'));
          // die;

        if(sizeof(pq('table.homepage_quoteboard')->find('tr')) > 0){
            foreach(pq('table.homepage_quoteboard')->find('tr') as $div){
              $check = pq($div)-> attr('class');

              echo $check;


                // $image = pq($div)->find('a')->children('img')->attr('src');
                // $name = pq($div)->find('a')->children('img')->attr('alt');
                // $url = pq($div)->find('a')->attr('href');
                // $disc_price = pq($div)->find('span.mtb-price')->children('label.mtb-ofr')->text();
                // $data[] = array(
                //     'name'=>$name,
                //     'image'=>$image,
                //     'price'=>$disc_price,
                //     'url'=>$url,
                // );
            }
        }

        $data2 = array();
        foreach($data as $row){
            $price = COMMONFUNCTIONS::getNumberFromString( $row['price'] );
            $price_new = $price[0];
            $row['price'] = $price_new;
            $data2[] = $row;
        }
        return $data2;
      }
    }
?>