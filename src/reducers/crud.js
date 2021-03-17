// import {
//   ADD_TRANSACTION_REQUEST,
//   ADD_TRANSACTION_SUCCESS,
//   ADD_TRANSACTION_FAILURE,
//   GET_TRANSACTION_REQUEST,
//   GET_TRANSACTION_SUCCESS,
//   GET_TRANSACTION_FAILURE,
// } from "../actions";

// export default (
//   state = {
//     isGettingTransactions: false,
//     isAddingTransaction: false,

//     getTransactionsError: false,
//     addTransactionError: false,

//     transactions: {},
//   },
//   action
// ) => {
//   switch (action.type) {
//     case ADD_TRANSACTION_REQUEST:
//       return {
//         ...state,
//         isAddingTransaction: true,
//         addTransactionError: false,
//       };
//     case ADD_TRANSACTION_SUCCESS:
//       return {
//         ...state,
//         isAddingTransaction: false,
//       };
//     case ADD_TRANSACTION_FAILURE:
//       return {
//         ...state,
//         isAddingTransaction: false,
//         addTransactionError: true,
//       };
//     case GET_TRANSACTION_REQUEST:
//       return {
//         ...state,
//         isGettingTransactions: true,
//         getTransactionsError: false,
//       };
//     case GET_TRANSACTION_SUCCESS:
//       return {
//         ...state,
//         isGettingTransactions: false,
//         transactions: action.transactions,
//       };
//     case GET_TRANSACTION_FAILURE:
//       return {
//         ...state,
//         isGettingTransactions: false,
//         getTransactionsError: true,
//       };
//     default:
//       return state;
//   }
// };
