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

// function getall(){
//     axios.get(`${url}/getall`, config).then(async messages=>{
//       const chatarea = document.getElementById('chat-area');
//       chatarea.innerHTML = "";
//       await messages.data.forEach( msg => {
//         chatarea.innerHTML = chatarea.innerHTML + `${msg.sender} : ${msg.message} <br>`
//        });

//        var objDiv = document.getElementById("chat-area");
//        objDiv.scrollTop = objDiv.scrollHeight;
//     }).catch(err=>{
//       console.log(err);
//       alert('Something Went Wrong');
//     });
// }

// getall();


// setTimeInterval(getall(), 1000);
setInterval(function() {getMsgsFromLS();}, 1000);

getMsgsFromLS();

async function getMsgsFromLS(){
    let success = await checkForNewMessages();
    let messages = await localStorage.getItem('messages');
     messages = JSON.parse(messages);
    showMessages(messages);
}

async function checkForNewMessages(){
  let currentMessages = await localStorage.getItem('messages');
  let lastMsgId ;

  if(!currentMessages){
   let messages = await axios.get(`${url}/getLatestTenMessages`, config);
   await localStorage.setItem('messages', JSON.stringify(messages.data));
   return true;
  }
  else {
    currentMessages = JSON.parse(currentMessages);
    lastMsgId = currentMessages[currentMessages.length -1].id;
  }
  
  let messages = await axios.get(`${url}/getLatestMessages?lastMsgId=${lastMsgId}`, config);
  currentMessages = currentMessages.concat(messages.data);
  currentMessages = currentMessages.slice(Math.max(currentMessages.length - 10, 0))
  // console.log(currentMessages);
  await localStorage.setItem('messages', JSON.stringify(currentMessages));
  return true;
}




async function showMessages(messages){
         const chatarea = document.getElementById('chat-area');
          chatarea.innerHTML = "";
          await messages.forEach( msg => {
            chatarea.innerHTML = chatarea.innerHTML + `${msg.sender} : ${msg.message} <br>`
           })
  
}



 



