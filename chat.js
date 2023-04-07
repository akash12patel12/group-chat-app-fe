const url = "http://localhost:3000";

const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };


// checkLogin();
// function checkLogin(){
//   if(!localStorage.getItem('token')){
//     window.location.href = "index.html";
//   }
// }

// function logOut(e) {
//     e.preventDefault();
//     localStorage.clear();
//     window.location.href = "login.html";
// }

function sendm(e){
    e.preventDefault();
    // console.log("called");
    axios.post(`${url}/send`, { message : e.target.message.value}, config).then(data=>{
      location.reload();
    });
    
}

function getall(){
    axios.get(`${url}/getall`, config).then(async messages=>{
      const chatarea = document.getElementById('chat-area');
      chatarea.innerHTML = "";
      await messages.data.forEach( msg => {
        chatarea.innerHTML = chatarea.innerHTML + `${msg.sender} : ${msg.message} <br>`
       });

       var objDiv = document.getElementById("chat-area");
       objDiv.scrollTop = objDiv.scrollHeight;
    }).catch(err=>{
      console.log(err);
      alert('Something Went Wrong');
    });
}

// getall();


// setTimeInterval(getall(), 1000);
setInterval(function() {getall();}, 1000);



 



