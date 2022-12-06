// import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
// const darkMode = createAction('darkMode');

// const initialState = {
//   userInfo: [],
// };

const rootReducer = createReducer(
  initialState,
  (builder) => builder
  // .addCase(saveNamespace, (state, action) => {
  //   state.currentNamespace = action.payload;
  // })
  // .addCase(darkMode, (state, action) => {
  //   let dark;
  //   action.payload ? (dark = false) : (dark = true);
  //   state.dark = dark;
  // })
);

// //export reducer
// export default rootReducer;

//export actions
export { darkMode };
