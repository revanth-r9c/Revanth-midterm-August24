import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// export const login = (username, password) => async dispatch => {
//   dispatch({ type: LOGIN_REQUEST });
//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/auth/login', { username, password });
//     dispatch({ type: LOGIN_SUCCESS, payload: response.data });
//   } 
// catch (error) {
//     let errorMessage = "User Doesn't exists (or) Wrong username/password";
//     if (error.response) {
//       errorMessage = error.response.data.message || errorMessage;
//     } else if (error.request) {
//       errorMessage = 'No response from the server. Please try again later.';
//     } else {
//       errorMessage = error.message || errorMessage;
//     }

//     dispatch({ type: LOGIN_FAILURE, error: errorMessage });
//   }
// };

export const login = (username, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "User Doesn't exist (or) Wrong username/password");
    }

    const data = await response.json();
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    let errorMessage = "User Doesn't exist (or) Wrong username/password";

    if (error.message.includes('Failed to fetch')) {
      errorMessage = 'No response from the server. Please try again later.';
    } else {
      errorMessage = error.message || errorMessage;
    }

    dispatch({ type: LOGIN_FAILURE, error: errorMessage });
  }
};

