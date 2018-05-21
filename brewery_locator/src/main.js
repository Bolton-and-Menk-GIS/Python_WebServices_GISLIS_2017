import './css/style.css';
import axios from './modules/AJAX.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import Maps from './components/Map.vue';
import SlideMenu from './components/Menu.vue';

Vue.use(VueRouter);

let routes = [{
    path: '/signup',
    component: Signup
  },
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/map',
    component: Maps,
    beforeEnter: (to, from, next) => {
      // next();
      authenticate(V.credentials.getCreds(), (auth)=>{
        if(auth){
          next()
        }
      })
    }
  }
]

const router = new VueRouter({
  routes
});

function authenticate(creds, auth) {
  if(creds){
  let xhr = axios.ajax('/genToken?username='+creds.username+'&password='+creds.password+'&named_user='+true).then((rsp)=>{
      axios.ajax('/users/authtest?token='+rsp.data.token).then((rsp)=>{
        console.log("AUTHTEST: ", rsp)
        if(rsp.status === 200){
          axios.comm.$emit('auth', rsp);
          auth(true);
          }else{
            auth(false);
          }
      }).catch((err)=>{
        console.log("INVALID TOKEN ", err);
      })
  }).catch((err)=>{
        console.log("INVALID CREDENTIALS ", err);
        axios.comm.$emit('signin_error', err);
      })
   }
}

const V = new Vue({
  el: '#app',
  data() {
    return {
      menu: {
        header: 'Response'
      },
      credentials:{
        creds: null,
        setCreds:(creds)=>{
          this.creds = creds;
        },
        getCreds:()=>{
          return this.creds;
        }
      }
    }
  },
  router,
  template: `<div id="app">
    <router-link to="/signup">
  <!--<a href='#' class='btn btn-default'>Sign In</a>-->
  </router-link>
    <router-link to="/signin">
  <!--<a href='#' class='btn btn-default'>Sign Up</a>-->
  </router-link>
  <router-link to="/map">
  <!--<a href='#' class='btn btn-default'>Map</a>-->
  </router-link>  
  <router-view></router-view>
  <SlideMenu :content="menu"/>
<!--  <Signup/>
  <Signin/> -->
  </div>`,
  components: {
    SlideMenu
  },
  mounted(){
    axios.comm.$on('signin', (evt) =>{
      this.credentials.setCreds(evt);
      this.$router.push('map');
    });
  }
})

hook.Vue = V;
hook.ajax = axios.ajax;

// :: ROUTER NAVIGATION :: \\
// PROGRAMATIC NAVIGATION \\
// https://router.vuejs.org/en/essentials/navigation.html

// hook.Vue.$router.push('signup')