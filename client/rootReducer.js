import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const loginAction = createAction('loginAction');
const updateExplore = createAction('updateExplore');
const updateChats = createAction('updateChats');

const initialState = {
  userInfo: {
    displayName: 'hi',
    canTeach: ['English', 'Cantonese'],
    canLearn: ['Spanish', 'Russian'],
    imgUrl: '',
    friends: [],
  },
  currentChats: [],
  loggedIn: false,
  feedCurrent: 'Friends',
  exploreCurrent: {
    willTeach: '',
    willLearn: '',
  },
};

const rootReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(updateFeed, (state, action) => {
      state.feedCurrent = action.payload;
    })
    .addCase(loginAction, (state) => {
      state.loggedIn ? (state.loggedIn = false) : (state.loggedIn = true);
    })
    .addCase(updateExplore, (state, action) => {
      state.exploreCurrent = action.payload;
    })
    .addCase(updateChats, (state, action) => {
      console.log('chatupdate');
    })
);

// //export reducer
export default rootReducer;

// export actions
export { updateFeed, loginAction, updateExplore };
