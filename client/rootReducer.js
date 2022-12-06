import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const logIn = createAction('loggedIn');
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

const rootReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(updateFeed, (state, action) => {
      state.feedCurrent = action.payload;
    })
    .addCase(logIn, (state) => {
      state.loggedIn ? (state.loggedIn = false) : (state.loggedIn = true);
    })
      .addCase(updateExplore, (state, action) => {
        state.exploreCurrent = action.payload;
      })
);

// //export reducer
export default rootReducer;

// export actions
export { updateFeed, loggedIn, updateExplore };
