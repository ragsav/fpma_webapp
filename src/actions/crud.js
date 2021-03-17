// import { db } from "../firebase/firebase";

// export const ADD_TRANSACTION_REQUEST = "ADD_TRANSACTION_REQUEST";
// export const ADD_TRANSACTION_SUCCESS = "ADD_TRANSACTION_SUCCESS";
// export const ADD_TRANSACTION_FAILURE = "ADD_TRANSACTION_FAILURE";

// export const GET_TRANSACTION_REQUEST = "GET_TRANSACTION_REQUEST";
// export const GET_TRANSACTION_SUCCESS = "GET_TRANSACTION_SUCCESS";
// export const GET_TRANSACTION_FAILURE = "GET_TRANSACTION_FAILURE";

// const requestAddTransaction = () => {
//   return {
//     type: ADD_TRANSACTION_REQUEST,
//   };
// };
// const successAddTransaction = () => {
//   return {
//     type: ADD_TRANSACTION_SUCCESS,
//   };
// };
// const failureAddTransaction = () => {
//   return {
//     type: ADD_TRANSACTION_FAILURE,
//   };
// };

// const requestGetTransaction = () => {
//   return {
//     type: GET_TRANSACTION_REQUEST,
//   };
// };
// const successGetTransaction = (transaction) => {
//   return {
//     transaction,
//     type: GET_TRANSACTION_SUCCESS,
//   };
// };
// const failureGetTransaction = () => {
//   return {
//     type: GET_TRANSACTION_FAILURE,
//   };
// };

// export const addTransaction = (userId,sym,time,shares,amount) => (dispatch) => {
//   dispatch(requestAddTransaction());
//   db.collection("users").doc(userId)
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((user) => {
//       dispatch(successAddTransaction());
//     })
//     .catch((error) => {
//       //Do something with the error if you want!
//       dispatch(failureAddTransaction());
//     });
// };

// export const getTransactions = () => (dispatch) => {
//   dispatch(requestGetTransaction());
//   myFirebase
//     .auth()
//     .signOut()
//     .then(() => {
//       dispatch(successGetTransaction(transaction));
//     })
//     .catch((error) => {
//       //Do something with the error if you want!
//       dispatch(failureGetTransaction());
//     });
// };
