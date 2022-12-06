import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const loggedIn = createAction('loggedIn');
const updateExplore = createAction('updateExplore');

const initialState = {
  userInfo: {
    displayName: 'hi',
    canTeach: ['English', 'Cantonese'],
    canLearn: ['Spanish', 'Russian'],
    imgUrl: '',
  },
  loggedIn: false,
  feedCurrent: 'Friends',
  exploreCurrent: {
    willTeach: '',
    willLearn: '',
  }
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
      .addCase(updateExplore, (state, action) => {
        state.exploreCurrent = action.payload;
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
export { updateFeed, loggedIn, updateExplore };
