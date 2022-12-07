import { createAction, createReducer } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const loginAction = createAction('loginAction');
const updateExplore = createAction('updateExplore');
const updateInterests = createAction('updateInterests');
const updateCanTeach = createAction('updateCanTeach');
const updateCanLearn = createAction('updateCanLearn');
const updateChats = createAction('updateChats');
const addFriends = createAction('addCards');
const updateFriend = createAction('updateFriend');

const initialState = {
  userInfo: {
    id: 0,
    displayName: 'hi',
    canTeach: ['Spanish', 'Russian'],
    canLearn: ['Cantonese', 'English'],
    imgUrl: '',
    interests: ['Saving Ethans Marriage', 'Running'],
  },
  currFriends: {},
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
    .addCase(addFriends, (state, action) => {
      state.currFriends = action.payload;
    })
    .addCase(updateFriend, (state, action) => {
      const index = action.payload.status;
      state.currFriends[index].push(action.payload);
    })
    .addCase(updateFeed, (state, action) => {
      state.feedCurrent = action.payload;
    })
    .addCase(loginAction, (state, action) => {
      state.userInfo = Object.assign({}, state.userInfo, action.payload);
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
    .addCase(updateChats, (state, action) => {
      console.log('chatupdate');
    })
);

// //export reducer
export default rootReducer;

// export actions
export {
  addFriends,
  updateFriend,
  updateFeed,
  loginAction,
  updateExplore,
  updateInterests,
  updateCanTeach,
  updateCanLearn,
};
