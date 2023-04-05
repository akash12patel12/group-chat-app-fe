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