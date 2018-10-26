$(document).ready(function() {
//press enter to send the message
    document.getElementById("text")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("post").click();
    }
  });


    //database details and push message
    var myFirebase = new Firebase('https://project-guy.firebaseio.com/');
    var usernameInput = document.querySelector('#username');
    var textInput = document.querySelector('#text');
    var postButton = document.querySelector('#post');

    //global
    var username = null;
    var uid = null;
    var loginButton = document.querySelector('#login');
    var logoutButton = document.querySelector('#logout');
    var resultsBox = document.querySelector('#results');
    // dont show these when user is not logged in
    logoutButton.style.display = "none";
    postButton.style.display = "none";
    textInput.style.display = "none";

    function scrollToBottom() {
    resultsBox.scrollTop = resultsBox.scrollHeight;
    }

    //send message
    postButton.addEventListener("click", function() {
      var msgUser = username;
      var msgText = textInput.value;
      var msgUid = uid;
      var msgTime = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});
      //only send if there is a message
      if(msgText != ""){
          //myFirebase.set(msgUser + " says: " + msgText);
        myFirebase.push({username:msgUser, text:msgText, uid:msgUid, time:msgTime});
        textInput.value = "";
        scrollToBottom();
      }
      
    });


    //get data from DB
    var startListening = function() {
      myFirebase.on('child_added', function(snapshot) {
        var msg = snapshot.val();
      
        var msgUsernameElement = document.createElement("b");

        //if this is the current user message - dont show user name
        if(msg.uid == uid)msg.username = " ";
        msgUsernameElement.textContent = msg.username;
        
        var msgTextElement = document.createElement("p");
        msgTextElement.textContent = msg.text;

        var msgTimeElement = document.createElement("p");
        msgTimeElement.textContent = msg.time;
        msgTimeElement.id = "time"
  
        var msgElement = document.createElement("div");
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgTextElement);
        msgElement.appendChild(msgTimeElement);

        //if this is the current user then change background colour
        if(msg.uid == uid){
          msgElement.style.backgroundColor = "black";
          msgElement.style.marginLeft ="100px";
        }else{
          msgElement.style.marginLeft ="5px";
          msgElement.style.marginRight ="100px";
        }


    msgElement.className = "msg";
        document.getElementById("results").appendChild(msgElement);
        scrollToBottom();
      });
    }


    //login
    loginButton.addEventListener("click", function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      //change to popup for pop up - doesn't work well on mobile devices
      firebase.auth().signInWithRedirect(provider).then(function(authData) {
      var token = authData.credential.accessToken;
      var user = authData.user;
      console.log(user);
      authData = authData;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorMessage);
    });
    });

    //logout
    logoutButton.addEventListener("click", function() {

      FirebaseAuth.getInstance().signOut().then(function() {
      //firebase.auth().signOut().then(function() {

      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
    });


    //when user has login or logout
    firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            username = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;


          loginButton.textContent = "Logged in as " + username;
          loginButton.disabled = true;
          logoutButton.style.display = "inline";
          postButton.style.display = "block";
          textInput.style.display = "block";
          resultsBox.style.display = "block";

          scrollToBottom();

          // Start listening for data
          startListening();
            
          } else {
            // User is signed out.
            logoutButton.style.display = "none";
        postButton.style.display = "none";
        textInput.style.display = "none";
        resultsBox.style.display = "none";
        loginButton.textContent = "Login with Google";
          loginButton.disabled = false;
            
          }
        }, function(error) {
          console.log(error);
    });
});