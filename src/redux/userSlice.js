import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  reactions: [], // Will store array of { userId, type, _id }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
    },
    setReduxReactions(state, action) {
      // Replace entire reactions array with fresh data
      state.reactions = action.payload;
    },
    addReaction(state, action) {
      // Add or update user's reaction
      const { userId, type, _id } = action.payload;

      // Remove old reaction by this user (if any)
      state.reactions = state.reactions.filter((r) => r.userId !== userId);

      // Add new one
      state.reactions.push({ userId, type, _id });
    },
    removeReaction(state, action) {
      // Remove reaction by id or user
      const { userId, reactionId } = action.payload;
      if (reactionId) {
        state.reactions = state.reactions.filter((r) => r._id !== reactionId);
      } else {
        state.reactions = state.reactions.filter((r) => r.userId !== userId);
      }
    },
  },
});

export const { login, logout, setReduxReactions, addReaction, removeReaction } =
  userSlice.actions;

export default userSlice.reducer;
