$(function() {
    $('#nav').load('nav.html');
});

//UI Functions
function ShowCreateAccountForm(){
    document.getElementById("createAccountForm").style.display = "block";
    document.getElementById("landing").style.display = "none";
}

function ShowLogInForm(){
    document.getElementById("landing").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("rememberMe").style.display = "block";
}

// function sendEmailVerification() {
//     firebase.auth().currentUser.sendEmailVerification().then(function() {
//         alert('Email Verification Sent!');
//         return true;
//     }).catch(function(error) {
//         //TODO: Add someway to handle this error
//         return false;
//     });
// }

function HandleSignin() {
    let email = document.getElementById("signinEmail").value;
    let password = document.getElementById("signinPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/invalid-email') {
            alert('Invalid Email');
        } else if (errorCode === 'auth/user-not-found') {
            alert('No account found. Please create an account');                
        } else if (errorCode === 'auth/wrong-password') {
            alert('Incorrect Password');
        } else {
            alert('errorMessage');
        }        
        console.log(error);
    });
}

function HandleCreateAccount() {
    let email = document.getElementById("createEmail").value;
    let password = document.getElementById("createPassword").value;
    let verifyPassword = document.getElementById("verifyCreatePassword").value;

    if (password.length < 8) {
        alert('Your password must have a minimum of 8 characters');
        return;
    }

    if (password != verifyPassword) {
        alert('Your passwords do not match.');
        return;
    }

    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        //Handle errors
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });    
}

function initApp() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let emailVerified = user.emailVerified;

            // Check that the user's email has been verified before continuing
            if (!emailVerified) {
                firebase.auth().currentUser.sendEmailVerification().then(function() {
                    window.location.replace("verification.html");
                });              
            } else {
                window.location.replace("home.html");
            }            
        }
    })


    // Listening for auth state changes
    // firebase.auth().onAuthStateChanged(function(user) {
    //     // document.getElementById('quickstart-verify-email').disabled = true;

    //     if (user) {
    //         // User is signed in
    //         var displayName = user.displayName;
    //         var email = user.email;
    //         var emailVerified = user.emailVerified;
    //         var photoURL = user.photoURL;
    //         var isAnonymous = user.isAnonymous;
    //         var uid = user.uid;
    //         var providerData = user.providerData;

    //         document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
    //         // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
    //         document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, ' ');

    //         // if (!emailVerified) {
    //         //     document.getElementById('quickstart-verify-email').disabled = false;
    //         // }
    //     } else {
    //         // User is signed out
    //         document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
    //         // document.getElementById('quickstart-sign-in').textContent = 'Sign in';
    //         document.getElementById('quickstart-account-details').textContent = 'null';
    //     }
    // });

    

    
}

window.onload = function() {
    initApp();
};

var user = window.user; // user is undefined if no user signed in

function PageRedirect(id) {
    let buttonID = id;

    if (buttonID == "signin-button") {
        // Attempt to sign in user
        let email = document.getElementById("signinEmail").value;
        let password = document.getElementById("signinPassword").value;

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/invalid-email') {
                alert('Invalid Email');
            } else if (errorCode === 'auth/user-not-found') {
                alert('No account found. Please create an account');                
            } else if (errorCode === 'auth/wrong-password') {
                alert('Incorrect Password');
            } else {
                alert('errorMessage');
            }        
        });
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //window.location.replace("home.html");
                window.location = "home.html";
            }
        });
    }
}


