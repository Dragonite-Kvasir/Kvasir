import { createAction, createReducer } from '@reduxjs/toolkit';

// //ACTIONS - i've included an example, feel free to change
const updateFeed = createAction('updateFeed');
const logIn = createAction('loggedIn');

const initialState = {
  userInfo: [],
  loggedIn: false,
  feedCurrent: 'Friends',
};

const rootReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(updateFeed, (state, action) => {
      state.feedCurrent = action.payload;
    })
    .addCase(logIn, (state) => {
      state.loggedIn ? (state.loggedIn = false) : (state.loggedIn = true);
    })
);

// //export reducer
export default rootReducer;

// export actions
export { updateFeed, logIn };
