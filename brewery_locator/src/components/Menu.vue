<template>
  <div id='menu'>
   <div id='site-wrapper' :class='{"show-nav":cssBindings.active}'>
     <nav id='menu-wrapper'>
      <nav id='nav-tab' :class="{active: cssBindings.active}">
       <a @click='showNav' :class="{active: cssBindings.active}" class="toggle-nav btn btn-lg btn-success" id="togBtn"><i class="fa fa-bars" style="padding-right: 7px;"></i>{{content.header}}</a>
     </nav>
     <nav id="site-menu" :style="{'height': windowHeight - 85 +'px'}">
       <a href="#" class="toggle-nav" style="color: pink; font-size: 20px;"><i @click='showNav' class="fa fa-times"></i></a>
       <div class='details'>
         <span class='btn btn-info' :class='{"active": response.fullDsply}' @click='resphndl("Full")'>Full</span><span class='btn btn-info' :class='{"active": !response.fullDsply}' @click='resphndl()'>Data</span>
       </div>
       <div id='response-area' :style="{'height': windowHeight - 195 +'px'}">
        <textarea v-if='response.fullDsply' class='response'>{{response.full}}</textarea>
        <textarea v-else class='response'>{{response.data}}</textarea>
      </div>
    </nav>
  </nav> 
  <div id="site-canvas">
  </div>
</div>
</div>
</template>

<script>
import axios from '../modules/AJAX.js';
  import Maps from './Map.vue';
  import resize from '../modules/Resize.js';
  export default {
   name: 'menu',
   props: ['content'],
   data:()=>{
    return{
      cssBindings:{
       active: false
     },
     windowHeight: window.innerHeight,
     windowWidth: null,
     response:{
      fullDsply: true,
      full: null,
      data: null
    } 
  }
},
methods:{
  showNav(){
   this.cssBindings.active =! this.cssBindings.active;
   if(this.cssBindings.active){
     document.body.style.margin = '0 0 0 -700px';
     document.body.style.backgroundPositionX = '-350px';

     if(this.windowWidth<1401){
      if(document.getElementById('content')){
      document.getElementById('content').style.marginRight = '100px';
      document.getElementById('content').style.marginLeft = '275px';
        Maps.map.resize();
      }
    }
  }else{
    document.body.style.margin = '0 0 0 0';
    document.body.style.backgroundPositionX = '2px';
    if(document.getElementById('content')){
      document.getElementById('content').style.marginRight = '100px';
      document.getElementById('content').style.marginLeft = '0px';
      Maps.map.resize();
    }
  }
},
resphndl(evt){
  if(evt){
    this.response.fullDsply = true;
  }else{
    this.response.fullDsply = false;
  }
}
},

mounted(){
  axios.comm.$on('file_drop', (evt)=>{
    this.response.data = JSON.stringify(evt.data, null, 2);
    this.response.full = JSON.stringify(evt, null, 2);
  });

  axios.comm.$on('signup',(evt)=>{
    this.response.data = JSON.stringify(evt.data, null, 2);
    this.response.full = JSON.stringify(evt, null, 2);
  });

  axios.comm.$on('auth', (evt)=>{
    this.response.data = JSON.stringify(evt.data, null, 2);
    this.response.full = JSON.stringify(evt, null, 2);
  })

  resize.setListener();
  axios.comm.$on('event_resize', (evt)=>{
    this.windowHeight = evt.height;
    document.getElementById('site-menu').style.height = this.windowHeight - 30+'px';
    document.getElementById('response-area').style.height = this.windowHeight - 135+'px';
  });
}
}
</script>

<style lang="scss">
#site-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 1000px;
}

@media screen and (max-width: 700px){
  #site-wrapper {
    display: none;
  }
}

#menu-wrapper {
  position: absolute; 
  width: 100%;
  height: 100%;
  display:flex; 
  
  padding: 1% 0;

  -webkit-transform: translateX(0);
  transform: translateX(0);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);

  -webkit-transition: 300ms ease-in all; transition: 300ms ease-in all;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.show-nav #menu-wrapper {
  -webkit-transform: translateX(-700px);
  transform: translateX(-700px);
  
  -webkit-transform: translate3d(-700px, 0, 0);
  transform: translate3d(-700px, 0, 0);
}

#nav-tab {
  z-index: 1;
  margin-right: 0;
  margin-left: auto;
  transition-delay: 0.3s;
  height: 0;
  &.active {
    margin-right: -125px;
    margin-top: -10px;
    border-radius: 0;
    transition-delay: 0s;    
  }
}

#site-menu {
  font-family: 'Ubuntu', sans-serif;
  width: 700px;
  height: 100%;
  position: absolute;
  top: 0;
  right: -700px;
  background: rgb(230, 223, 207);
  color: rgb(63, 55, 44);
  padding: 15px;
  border-radius: 5px;
  & .details{
    margin: 30px 10px 10px 2px;
    & span {
      margin: 0 5px 0 0;
      padding: 3px 25px 3px 25px;
      background-color: #acb1af;
      color: white;
      border: none;
      &:hover {
        background-color: #74e6e6;
        color: white;
      }
      &.active{
        background-color: #40382d;
        color: white;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  #site-menu{
    width: 500px; 
  }

  #nav-tab{

    &.active{
      margin-right: -325px;
    }
  }
}
/* -- CUSTOM CSS -- */
#togBtn {
  margin-top:2%;
  background: rgb(230, 223, 207);
  color: #3f372c;
  margin-right: 5px;
  border: none;
  border-radius: 3px;
  transition: margin 0.5s ease;
  box-shadow: 0 3px 5px rgba(0,0,0,.125);
  &:hover {
    background: #74e6e6;
    color: #3f372c;  
  }
  &.active{
   color: #ffffff;
   background: #40382d;
   border: none;
   margin-right: -25px;
   margin-top: -2%;
   &:hover{
    background: #74e6e6;
    color: white;    
  } 
}

}

.response{
  background-color: white;
  font-size: 16px;
  width: 98%;
  height: 98%;
  padding: 10px;
  // margin-top: 25px;
  border-radius: 5px;
  overflow: auto;
}
</style>