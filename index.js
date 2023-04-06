const apiurl  = "http://localhost:3000"
async function register(e){
    e.preventDefault();
  axios.post(`${apiurl}/register`, {
    "name" : e.target.name.value,
    "email" : e.target.email.value,
    "phone" :e.target.phone.value,
    "password" : e.target.password.value
   }).then(res=>{
     alert("User Created");
   }).catch(err=>{
    alert(err.response.data.errorMsg);
   })
}

function enablelogin(e){
  e.preventDefault();
 document.getElementById('login-form').style.display = 'block';
 document.getElementById('register-form').style.display = 'none';

}

function enableregister(e){
  e.preventDefault();
  document.getElementById('register-form').style.display = 'block'
  document.getElementById('login-form').style.display = 'none'

}

function login(e){
  e.preventDefault();
  axios.post(`${apiurl}/login`, {"email" :e.target.email.value, "password" : e.target.password.value});
}

