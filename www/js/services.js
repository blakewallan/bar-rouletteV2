angular.module('barRoulette.services', [])

  .factory('UserCoords', function(){
    var userCoords = {}

    function setCoords(coords){
      userCoords = coords
    }

    function getCoords(){
      return userCoords
    }

    return {setCoords: setCoords, getCoords: getCoords}

  })

  .factory('Bar', function($http){
    var theBar = {};

    function setBar(lat, lng, distanceOption, callback){
      var mapsKey = 'AIzaSyD5A9_4eATEtC3a0L6QLIwU97SKp2T9jV8';

      $http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat +','+ lng +'&radius='+ distanceOption +'&types=bar&opennow&key='+ mapsKey)
        .success(function(data){
          var rand = Math.floor((Math.random() * data.results.length));
          theBar = data.results[rand];
          var barLat = theBar.geometry.location.lat;
          var barLng = theBar.geometry.location.lng;
          callback(theBar = {theBar: theBar, barLat: barLat, barLng: barLng});
        })
        .error(function(error){
          console.log('Error: ' + error)
        })
    }

    function getBar(){
      return theBar
    }

    return {setBar: setBar, getBar: getBar}
  })


  .factory('Uber', function($http){

    function getUberData(lat, lng, barLat, barLng, callback){
      var uberKey = 'rrbj2kEDJN7cbRojTjG7rjzyeXmio_u1V_on544L';

      $http.get('https://api.uber.com/v1/estimates/price?start_latitude='+ lat +'&start_longitude='+ lng +'&end_latitude='+ barLat +'&end_longitude='+ barLng +'&server_token=' + uberKey)

        .success(function(data){
          //callback(data)
          var price = data;
          $http.get('https://api.uber.com/v1/estimates/time?start_latitude='+ lat +'&start_longitude='+ lng +'&end_latitude='+ barLat +'&end_longitude='+ barLng +'&server_token=' + uberKey)

            .success(function(data){
              callback({time: data, price: price})
            })
            .error(function(error){
              console.log(error);
            })
        })
        .error(function(error){
          console.log(error);
        })
    }

    return { getUberData: getUberData}

  })


//$http.get('https://maps.googleapis.com/maps/api/directions/json?origin='+ lat + ','+ lng +'&destination='+ barLat +','+ barLng +'&mode=walking&key='+ mapsKey)
//  .success(function(data){
//    console.log(data)
//    callback({uberData: uberData})
//  })
//  .error(function(error){
//    console.log(error);
//  })
