<template>
<div class="container" id='Sign-Up'>
    <div class="row">
        <div class="col-md-12">
            <div class="pr-wrap">
                <div class="pass-reset">
                    <label>Enter the email you signed up with</label>
                    <input type="email" placeholder="Email" />
                    <input type="submit" value="Submit" class="pass-reset-submit btn btn-success btn-sm" />
                </div>
            </div>
            <div v-if='!route' class="wrap">
                <p class="form-title">
                    Create Account
                </p>
                 <div v-if='validation.submit' class='validation'>
                      <div v-if='!account.username'>Please provide a Username</div>
                      <div v-if='!account.email'>Please provide a valid Email address</div>    
                      <div v-if='!account.password'>Please provide Password</div>
                      <div v-if='!account.confirm'>Please confirm Password</div>         
                      <div v-if='validation.username'>Username not available</div>
                      <div v-if='validation.password'>Passwords do not match</div>
                </div>
                <form class="create">
                <input type="text" @keyup='keypress' placeholder="Username" v-model='account.username'/>
                <input type="text" @keyup='keypress' placeholder="Email" v-model='account.email'/>
                <input type="password" @keyup='keypress' placeholder="Password" v-model='account.password'/>
                <input type="password" @keyup='keypress' placeholder="Confirm Password" v-model='account.confirm'/>
                <input type="submit" value="Create Account" class="btn btn-success" :class='{disabled: validation.disabled}' @click='submit' v-if='!validation.loading'/>
                <div class='loadText' v-else><i class='fa fa-spin loading'></i>Creating Account...</div>
                <div class="remember-forgot">
                    <div class="row">
                        <div class="col-md-6">
                        </div>
                    </div>
                </div>
                </form>
            </div>
            <div v-else class="wrap">
            <div style='margin-top: 15%; display: flex;'>
                <p class="form-title account-created">
                    Account Created, Email sent!</br>
                    Please check Email to login
                </p>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import axios from '../modules/AJAX.js';
export default {
  name: 'signup',
  data () {
    return {
        account:{
            username: null,
            email: null,
            password: null,
            confirm: null
        },
        validation:{
            disabled: false,
            loading: false,
            submit: null,
            email: null,            
            username: null,
            password: null
        },
        // route: null,
        // url: 'http://127.0.0.1:8081/gislis/2017/bmiwebservices/app/index.html?#/signin'
        url: 'http://localhost:8080/?#/signin'
    }
  },
  watch:{
    validation:{
        handler: function(val, prev){
        },
        deep: true
    }
  },
  methods:{
    submit(){
        if(!this.validation.disabled){
           this.validation.submit = true;
           this.validation.loading = true;
            if(this.account.password && this.account.confirm){
                 if(this.account.password === this.account.confirm){
                    this.validation.submit = false;
                    this.validation.disabled = true;
                     this.validation.password = null;
                    let data = {
                        username: this.account.username,
                        email: this.account.email,
                        password: btoa(this.account.password),
                        app_url: this.url
                    }
                        axios.ajax('/new/user/signup', {method: 'POST', data: data}).then((rsp)=>{
                            this.route = 'SUCCESS';
                            axios.comm.$emit('signup', rsp);
                            this.validation.loading = false;
                            this.validation.disabled = false;
                        }).catch((rsp=>{
                            console.log("ACCOUNT CREATE FAILED");
                            this.validation.loading = false;
                            this.validation.disabled = false;
                        }))
                }else{
                    this.validation.loading = false;
                    this.validation.password = 'invalid';
                }        
            }else{
                this.validation.loading = false;
            }        
        }else{
            this.validation.loading = false;
            console.log("SUBMIT DISABLED!")
        }
    },
    keypress(evt){
        if(evt.keyCode !== 13){
            this.validation.submit = false;
        }
    }
  }
}
</script>

<style lang="scss">
form.create ::-webkit-input-placeholder{
    color:#efedee;
}

form.create{
    font-size: 20px;
}

input {
        -webkit-appearance: none;
        border: 0;
}

form.create input[type="text"]{
    width:100%;
    color: #faffb1;
    margin:10px 0 10px;
    padding: 2px 0px 3px 5px;
    background: 0;
    border: 0;
    border-bottom: 1px solid #FFFFFF;
    outline: none;
}

form.create input[type="password"]{
    width:100%;
    color: #faffb1;;
    margin:10px 0 10px;
    padding: 2px 0px 3px 5px;
    background: 0;
    border: 0;
    border-bottom: 1px solid #FFFFFF;
    outline: none;
}

form.create input[type="submit"]{
    width:100%;
    padding: 8px;
    margin: 10px 0 0 0;
    font-size: 18px;
    background: #74e6e6;
    border:#74e6e6 1px solid ;
    color: #40382d;
}

form.create input[type="submit"]:hover{
    transition: background-color 0.5s ease;
    background-color: #74e6b1;
    border-color: #74e6b1;
}

.form-title.account-created{
    background-color: #e6dfcf; 
    color: #3f372c;
    padding: 10px;
    border-radius: 5px;  
    margin-left: auto;
    margin-right: auto;
    text-transform: none;
}

input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: none;
    background-image: none;
    color: rgb(0, 0, 0);
    border: 0;
}

.btn.btn-success.disabled{
    border-color: lightgrey;
    background-color: lightgrey;
    &:hover{
      border-color: lightgrey;
      background-color: lightgrey;
      outline: none;
    }
}
</style>
