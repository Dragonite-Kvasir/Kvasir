import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const loggedIn = createAction('loggedIn');

const initialState = {
  userInfo: [],
  loggedIn: false,
  feedCurrent: 'Friends',
};

const rootReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(updateFeed, (state, action) => {
        state.feedCurrent = action.payload;
      })
      .addCase(loggedIn, (state) => {
        loggedIn ? (state.loggedIn = true) : (state.loggedIn = false);
      })
  // .addCase(darkMode, (state, action) => {
  //   let dark;
  //   action.payload ? (dark = false) : (dark = true);
  //   state.dark = dark;
  // })
);

// //export reducer
export default rootReducer;

// export actions
export { updateFeed, loggedIn };
