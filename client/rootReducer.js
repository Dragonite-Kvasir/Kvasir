import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const loginAction = createAction('loginAction');
const updateExplore = createAction('updateExplore');
const updateInterests = createAction('updateInterests');
const updateCanTeach = createAction('updateCanTeach');
const updateCanLearn = createAction('updateCanLearn');
const updateChats = createAction('updateChats');

const initialState = {
  userInfo: {
    displayName: 'hi',
    canTeach: ['Spanish', 'Russian'],
    canLearn: ['Cantonese', 'English'],
    imgUrl: '',
    friends: [],
    interests: ['Saving Ethans Marriage', 'Running']
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
    .addCase(updateInterests, (state, action) => {
      state.userInfo.interests = action.payload;
    })
    .addCase(updateCanTeach, (state, action) => {
      state.userInfo.canTeach = action.payload;
    })
    .addCase(updateCanLearn, (state, action) => {
      state.userInfo.canLearn = action.payload;
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
export { updateFeed, loginAction, updateExplore, updateInterests, updateCanTeach, updateCanLearn };

