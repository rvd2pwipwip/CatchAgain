import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // apiKey: "AIzaSyCv64oaoyh1-nRbGSnQpW28kdV-9IWTb6g",
  // authDomain: "catch-of-the-day-rvd3.firebaseapp.com",
  // databaseURL: "https://catch-of-the-day-rvd3.firebaseio.com"
  apiKey: "AIzaSyBQH7qlib2GOZar046IrLZDRo9nFUZZqsg",
  authDomain: "catch-of-the-rvd4.firebaseapp.com",
  databaseURL: "https://catch-of-the-rvd4.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database()); //rebase binding

export { firebaseApp }; //named export
export default base; //default export
