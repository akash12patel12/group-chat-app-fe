const url = "http://localhost:3000";

const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };


checkLogin();
function checkLogin(){
  if(!localStorage.getItem('token')){
    window.location.href = "index.html";
  }
}

function logOut(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
}
