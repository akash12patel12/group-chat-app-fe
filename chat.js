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
var pane = document.getElementById('chat-table');
pane.scrollTop = pane.offsetHeight;
function sendm(e){
    e.preventDefault();
    // console.log("called");
    axios.post(`${url}/send`, { message : e.target.message.value}, config).then(data=>{
      location.reload();
    });
    
}

function getall(){
    axios.get(`${url}/getall`, config).then(messages=>{
      const chattable = document.getElementById('chat-table');
      chattable.innerHTML = "";
       messages.data.forEach( async msg => {
        chattable.innerHTML = chattable.innerHTML + `<tr><td>${msg.sender}</td><td>${msg.message}</td></tr>`
       });
    }).catch(err=>{
      console.log(err);
      alert('Something Went Wrong');
    });
}

getall();