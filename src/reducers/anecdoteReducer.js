import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdoteSlice = createSlice({
  name: 'anecdoteSlice',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      action.payload.sort((a, b) => b.votes - a.votes);
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    try {
      const anecdotes = await anecdoteService.getAll();
      dispatch(setAnecdotes(anecdotes));
    } catch (error) {
      console.error('Error initializing anecdotes:', error);
    }
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const newAnecdote = await anecdoteService.createNew(content);
      dispatch(appendAnecdote(newAnecdote));
    } catch (error) {
      console.error('Error creating anecdote:', error);
    }
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    try {
      await anecdoteService.updateVote(anecdote);
      const anecdotes = await anecdoteService.getAll();
      dispatch(setAnecdotes(anecdotes));
    } catch (error) {
      console.error('Error updating vote for anecdote:', error);
    }
  };
};

export default anecdoteSlice.reducer;
