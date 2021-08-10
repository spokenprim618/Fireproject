const UsernameInput = document.getElementById('username');
const MessageInput= document.getElementById('message');
const button = document.getElementById('submitButton')
const pfpInput=document.getElementById("pfp");
button.addEventListener("click",updateDB);
//Set database object here
 let database = firebase.database().ref()
 
/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username = UsernameInput.value;
    const message = MessageInput.value;
     const pfp=pfpInput.value;
 
    UsernameInput.value = "";
    MessageInput.value  = "";
    pfpInput.value="";
    console.log(pfp+":"+username+":"+message);
 
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    let user_post = {
        NAME:username,
        MESSAGE:message,
        TIMESTAMP:dateTime,
        PFP:pfp,
    }
 
    //Update database here
    database.push(user_post);
    console.log(username);
}
 
// Set database "child_added" event listener here
database.on("child_added", addMessagToBoard);
 
function addMessagToBoard(rData) {
    let row = rData.val();
    console.log(row)
    const blogMessage = document.createElement(`p`);
    const blogIMG=document.createElement('img');
    blogIMG.src=database.pfp;
    blogMessage.innerText= `${row.TIMESTAMP}: ${row.NAME}: ${row.MESSAGE}:${row.PFP}`;
    let userMain = document.querySelector('.allMessages');
    userMain.appendChild(blogMessage);
}
