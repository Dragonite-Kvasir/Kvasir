import { createAction, createReducer } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const loginAction = createAction('loginAction');
const updateUserInfo = createAction('updateUserInfo');
const updateExplore = createAction('updateExplore');
const updateChats = createAction('updateChats');
const addFriends = createAction('addCards');
const updateFriend = createAction('updateFriend');

const initialState = {
  userInfo: {
    id: 0,
    displayName: '',
    email: '',
    canTeach: [],
    canLearn: [],
    imgUrl: '',
    interests: [],
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
      state.loggedIn ? (state.loggedIn = false) : (state.loggedIn = true);
    })
    .addCase(updateExplore, (state, action) => {
      state.exploreCurrent = action.payload;
    })
    .addCase(updateUserInfo, (state, action) => {
      console.log(action.payload);
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
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
  updateUserInfo,
};
