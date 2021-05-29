var firebaseConfig = {
    apiKey: "AIzaSyDZXvodnsGnTalRdVGbGmOZWbKRTwwzneo",
    authDomain: "tryprint-cf727.firebaseapp.com",
    databaseURL: "https://tryprint-cf727.firebaseio.com",
    projectId: "tryprint-cf727",
    storageBucket: "tryprint-cf727.appspot.com",
    messagingSenderId: "101216290312",
    appId: "1:101216290312:web:e5c97fc08062f089e533bd",
    measurementId: "G-8LFGGFGS05"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

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

firebase.auth.Auth.Persistence.LOCAL;

$("#login-btn").click(function(){
    var uemail = $("#InputEmail").val();
    var upass = $("#InputPassword").val();

    if(uemail!="" && upass!=""){
        var result = firebase.auth().signInWithEmailAndPassword(uemail, upass);
        result.catch(function(error){
            var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorCode+" "+errorMessage);
        })
    }
    else{
        window.alert("Error");
    }
});

function login(){
    var userEmail = "printonline@gmail.com";
    var userPassword = "jokosobo";

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function(){
        console.log(userPassword);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode+" : "+errorMessage);
      });
}

function logout(){
firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}