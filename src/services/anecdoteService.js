import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching anecdotes:', error);
    throw error;
  }
};

const createNew = async (content) => {
  try {
    const object = { content: content, id: 0, votes: 0 };
    const response = await axios.post(baseUrl, object);
    return response.data;
  } catch (error) {
    console.error('Error creating new anecdote:', error);
    throw error;
  }
};

const updateVote = async (anecdote) => {
  try {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote);
    return response.data;
  } catch (error) {
    console.error('Error updating vote for anecdote:', error);
    throw error;
  }
};

const anecdoteService = {
  getAll,
  createNew,
  updateVote,
};

export default anecdoteService;