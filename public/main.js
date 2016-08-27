// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBC4aLFUtPygp2pB25ouTYaE9VmUzKgoM",
  authDomain: "email-verified-bug.firebaseapp.com",
  databaseURL: "https://email-verified-bug.firebaseio.com"
};
firebase.initializeApp(config);
var auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  userFeedback('Auth state changed:', JSON.stringify(user, undefined, 2));
}, function(error) {
  userFeedback('Auth state error:', error);
});

function verifyEmail() {
  auth.currentUser.sendEmailVerification()
    .then(function() {
      userFeedback('Email sent', '');
    });
}

function updateDatabase() {
  firebase.database().ref('/test').set(true, function(error) {
    if (error)
      userFeedback('Database write error', error);
    else
      userFeedback('Database write succeeded', '');
  });
}

function logOut() {
  auth.signOut();
}

function userFeedback(title, message) {
  var el = document.createElement('h3');
  el.textContent = title;
  document.body.appendChild(el);
  el = document.createElement('pre');
  el.textContent = message + '\n\n';
  document.body.appendChild(el);  
}
