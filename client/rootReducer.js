import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const logIn = createAction('loggedIn');
const updateExplore = createAction('updateExplore');
const updateInterests = createAction('updateInterests');
const updateCanTeach = createAction('updateCanTeach');
const updateCanLearn = createAction('updateCanLearn');

const initialState = {
  userInfo: {
    displayName: 'hi',
    canTeach: ['Spanish', 'Russian'],
    canLearn: ['Cantonese', 'English'],
    imgUrl: '',
    interests: ['Saving Ethans Marriage', 'Running']
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
    .addCase(updateInterests, (state, action) => {
      state.userInfo.interests = action.payload;
    })
    .addCase(updateCanTeach, (state, action) => {
      state.userInfo.canTeach = action.payload;
    })
    .addCase(updateCanLearn, (state, action) => {
      state.userInfo.canLearn = action.payload;
    })
);

// //export reducer
export default rootReducer;

// export actions
export { updateFeed, logIn, updateExplore, updateInterests, updateCanTeach, updateCanLearn };
