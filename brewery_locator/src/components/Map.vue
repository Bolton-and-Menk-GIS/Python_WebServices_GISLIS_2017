<template>
  <div class="container">
    <div class='col-md-12' style='margin: 0 0'>
      <div class='pr-wrap'></div>
      <div class='wrap' >
        <div id='content' style='display: flex;'>
          <div id='info-container' style='display: flex'>
            <div id='title-tab' ><span id='title'>MN Breweries</span></div>             
            <Filedrop v-on:file_drop='evt_drop'/>
          </div>
          <div id='map-frame'>
           <div id='map'></div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
  import Filedrop from './Filedrop.vue';
  import mapboxgl from 'mapbox-gl';
  import breweryData from '../assets/breweries.json';

  let mapInit = (()=>{
      let map;
    return {
       map: map,
       buildMap: function(){
          mapboxgl.accessToken = 'pk.eyJ1IjoibmF0MTU5NyIsImEiOiJqcmpvZGFnIn0.SSOtYVON6_S0c1Ulyn2EnA';
          let map = new mapboxgl.Map({
            container: 'map',
            // style: 'mapbox://styles/mapbox/streets-v9',
            // style: 'mapbox://styles/mapbox/dark-v9',
            // style: 'mapbox://styles/mapbox/light-v9',
            // :: IE BUG WORKAROUND :: \\ - https://github.com/mapbox/mapbox-gl-js/issues/3040
            style: {
              version: 8,
              sources: {},
              layers: []
            },
            center: [-93.20, 44.95],
            zoom: 10
          });

          this.map = map;
          return map;
      },
      addData: function(data){
        let map = this.map;
        if (map.getLayer('Breweries')) {
          map.removeLayer('Breweries');
          map.removeSource('Breweries');
        }

        let brewData = {
          "type": 'geojson',
          "data": data
        }

        map.addSource('Breweries', brewData)

        map.loadImage('./assets/beericon.png', (error, image) => {
          // if(map.getImage('Beer')){
            // CHECK FOR THIS IMAGE \\
            // map.removeImage('Beer');
          // }
          // map.addImage('Beer', image, {pixelRatio: 1.2});
          map.addImage('Beer', image);
          map.addLayer({
            "id": "Breweries",
            "type": "symbol",
            "interactive": true,
            "source": "Breweries",
            "layout": {
              "icon-image": 'Beer',
              "icon-ignore-placement": true
            }
          });
        });
        this.events();
      },
      buildPopup: function(evt){
        let map = this.map;
      var content = '<div class="BG"><table><tr><td >' + evt.features[0].properties.Name + '</td></tr><tr><td><a class="icon" style="text-decoration: none;" href='+ evt.features[0].properties.Website+' target="_blank">Website</a></td></tr></table></div>';

      let pu = new mapboxgl.Popup()
        .setLngLat(evt.features[0].geometry.coordinates)
        .setHTML(content)
        .addTo(map);
      },
      events: function(){
        let map = this.map;
          map.on('mouseenter', 'Breweries', function() {
          map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Breweries', function() {
          map.getCanvas().style.cursor = '';
        });

        map.on('click', 'Breweries', function(e) {
          mapInit.buildPopup(e);
        });
      }
    }
  })();

  export default {
    map: null,
    name: 'Map',
    data() {
      return {}
    },
    methods: {
      evt_drop(evt) {
        mapInit.addData(evt.data)
      }
    },
    components: {
      Filedrop
    },
    mounted() {
     let map = mapInit.buildMap();
      map.on('load', function() {
        // :: IE BUG WORKAROUND :: \\
        map.setStyle('mapbox://styles/mapbox/dark-v9');
        // map.setStyle('mapbox://styles/mapbox/light-v9');
        hook.map = map;
        map.resize();
        setMap(map);

        // :: MAP CONTROLS :: \\
        map.addControl(new mapboxgl.NavigationControl, 'top-left');
        map.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }), 'top-right');
         // :: MAP CONTROLS :: \\
      });
    }
  }
let mod = this;
function setMap(m){
  mod.default.map = m;
}

</script>

<style lang="scss">
  .h2 {
    text-align: center;
  }

  #content {
    margin-top: 2%;
    flex-direction: column;
    min-height: 100%;
  }
  @media screen and (max-width: 1400px) {
    #content {
      margin: 0px 50px;
    }
    #drop {
      width: 100%;
    }
  }

@media screen and (max-width: 1300px){
  #content{
    margin: 0 100px;
  }
}

  #title-tab {
    width: 145px;
    background-color: rgb(230, 223, 207);
    color: #3f372c;
    padding: 2px 0px 0px 9px;
    border-radius: 3px 3px 0 0;
    font-size: 20px;
    margin-top: 20px;
  }

  #map-frame {
    background-color: rgb(230, 223, 207);
    color: #3f372c;
    width: 100%;
    height: 700px;
    padding: 10px 10px 10px 10px;
  }

  @media screen and (max-height: 1000px) {
    #map-frame {
      height: 650px;
    }
  }

  @media screen and (max-height: 750px) {
    #map-frame {
      height: 550px;
    }
  }

  @media screen and (max-height: 650px) {
    #map-frame {
      height: 450px;
    }
  }

  @media screen and (max-height: 400px) {
    #map-frame {
      height: 225px;
    }
  }

  #map {
    width: 100%;
    height: 100%;
  } 

  .icon{
        color: white;
  &:hover{
    color: #f9926c;
 &:after {
  color: #f9926c;
 }
  }

  &:after {
     font-family: FontAwesome;
    content: "\f14c";
    font-size: 17px;
    padding: 5px;
    color: white;
  }        
  & a {
    color: white;
  }
  }

  .mapboxgl-popup-content {
    font-family: 'Play', sans-serif; 
    background-color: #74e6e6; 
    color: #3f372c;
    font-size: 18px;
  }
  .mapboxgl-popup {
    top: -10px;
  }

  .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    border-top-color: #74e6e6;
  }

  .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
    border-bottom-color: #74e6e6;
  }

  .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: #74e6e6;
  }

  .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: #74e6e6;
  }

  .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
    border-bottom-color: #74e6e6;
  }

  .mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
    border-bottom-color: #74e6e6;
  }

  .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
    border-top-color: #74e6e6;
  }

  .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
    border-top-color: #74e6e6;
  }

  .mapboxgl-popup-close-button {
    color: #3f372c;
    padding: 0 2px;
    &:hover {
      border-radius: 15px;
    }
  }

.mapboxgl-ctrl-group{
  background-color: #e5dfcf;
}

  .BG {
    padding: 3px;
    margin: -4px -3px -9px -5px;
    border-radius: 2px;
  }
</style>