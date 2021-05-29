firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("login_div").style.display = "none";
      document.getElementById("loggedin").style.display = "block";
      
    } else {
      // No user is signed in.
      document.getElementById("login_div").style.display = "block";
      document.getElementById("loggedin").style.display = "none";
    }
  });

function login(){
    var userEmail = document.getElementById("InputEmail").value;
    var userPassword = document.getElementById("InputPassword").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error){
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert(errorCode+errorMessage);

      });
}

function logout(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "index.html";
  }).catch(function(error) {
    // An error happened.
    window.alert("Error");
  });
}