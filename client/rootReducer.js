import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const darkMode = createAction('darkMode');
const updateFeed = createAction('updateFeed');

const initialState = {
  userInfo: [],
  loggedIn: true,
  feedCurrent: 'Friends',
};

const rootReducer = createReducer(
  initialState,
  (builder) =>
    builder.addCase(updateFeed, (state, action) => {
      state.feedCurrent = action.payload;
    })
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
export default rootReducer;

// export actions
export { updateFeed, darkMode };
