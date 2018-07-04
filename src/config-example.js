import firebase from 'firebase';
const config = {
// 
};

var configProd = {
// 
};

var fire = firebase.initializeApp(process.env.REACT_APP_BUILD ? configProd : config);

export default fire;