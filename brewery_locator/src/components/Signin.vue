<template>
    <div class="container" id='Sign-In'>
        <div class="row">
            <div class="col-md-12">
                <div class="pr-wrap">
                    <div class="pass-reset">
                        <label>Enter the email you signed up with</label>
                        <input type="email" placeholder="Email" />
                        <input type="submit" value="Submit" class="pass-reset-submit btn btn-success btn-sm" />
                    </div>
                </div>
                <div class="wrap">
                    <p class="form-title signin">
                        Sign In
                    </p>
                    <div v-if='credentials.fail' class='validation'>Sign In Failed</div>
                    <form class="signin">
                    <input type="text" placeholder="Username" @keyup='keypress' v-model='credentials.username' />
                    <input type="password" placeholder="Password" @keyup='keypress' v-model='credentials.password' />
                    <input type="submit" value="Sign In" class="btn btn-success" @click='submit' v-if='!loading'/>
                    <div class='loadText' v-else><i class='fa fa-spin loading'></i>Signing In...</div>
                    <div class="remember-forgot">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" />
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 forgot-pass-content">
                                <a href="javascription:void(0)" class="forgot-pass">Forgot Password</a>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../modules/AJAX.js'
export default {
  name: 'signin',
  data () {
    return {
        credentials:{
            username: null,
            password: null,
            fail: null        
        },
        loading: false
    }
  },
  methods:{
    submit(){
        this.loading = true;
        axios.comm.$emit('signin', this.credentials);
    },
    keypress(evt){
        if(evt.keyCode !== 13){
            this.credentials.fail = false;
        }
    }
  },
  mounted(){
    axios.comm.$on('signin_error', (evt)=>{
        this.credentials.fail = true;
        this.loading = false;
    });
    axios.comm.$on('auth', (evt)=>{
        this.loading= false;
    })
  }
}
</script>

<style lang="scss">
p.form-title.signin{
    margin: 10% 0 0 0;
}

form.signin input[type="text"], form.signin input[type="password"]
{
    width: 100%;
    margin: 8px 0 0 0;
    /*padding: 5px 10px;*/
    padding: 2px 0px 8px 5px;
    background: 0;
    border: 0;
    border-bottom: 1px solid #FFFFFF;
    outline: 0;
    font-family: 'Play', sans-serif;
    font-size: 20px;
    color: white;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 5px;
    /*color: #FFFFFF;*/
    color: #faffb1;
    outline: 0;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-size: 20px;
  /*color: #abfce0;*/
  /*color: #ffd39c;*/
  color: #efedee;
}

.checkbox input[type=checkbox]{
    margin: 7px 0px 0 -20px;
    cursor: pointer;
}


form.signin input[type="submit"]
{
    width: 100%;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 500;
    margin-top: 16px;
    margin: 10px 0 0 0;
    outline: 0;
    cursor: pointer;
    letter-spacing: 1px;
    background: #74e6e6;
    border: #74e6e6 1px solid;
    color: #40382d;
}

form.signin input[type="submit"]:hover
{
    transition: background-color 0.5s ease;
    background-color: #74e6b1;
    border-color: #74e6b1;
}

form.signin .remember-forgot
{
    float: left;
    width: 100%;
    margin: 10px 0 0 0;
}
form.signin .forgot-pass-content
{
    min-height: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
}
form.signin label, form.signin a
{
    font-size: 18px;
    font-weight: 400;
    /*color: #FFFFFF;*/
    /*color: #ffd39c;*/
    /*color: #c5b091;*/
    color:#efedee;
}

form.signin a
{
    transition: color 0.5s ease;
}

form.signin a:hover
{
    color: #2ecc71;
}
</style>
