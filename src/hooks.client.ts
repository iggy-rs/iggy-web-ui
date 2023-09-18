import type { Handle, HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event }) => {
  console.log('client error handler', error);
  return {
    message: 'Whoops!',
    errorId: 1
  };
};
