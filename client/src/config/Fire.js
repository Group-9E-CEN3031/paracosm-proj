import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAioVr56fsadB2MhwFyT4iFad5v_O6261k",
    authDomain: "paracosm-proj.firebaseapp.com",
    databaseURL: "https://paracosm-proj.firebaseio.com",
    projectId: "paracosm-proj",
    storageBucket: "paracosm-proj.appspot.com",
    messagingSenderId: "645277775238",
    appId: "1:645277775238:web:0dd66c14dbb3e538e12807",
    measurementId: "G-EE7Q3PV3GD"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;