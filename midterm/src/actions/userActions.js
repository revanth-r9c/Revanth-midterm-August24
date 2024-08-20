import axios from 'axios';

export const register_request = 'register_request';
export const register_success = 'register_pass';
export const register_failure = 'register_fail';

// export const register = (displayName, email, username, password, role) => async dispatch => {
//   dispatch({ type: register_request });
//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/users', { displayName, email, username, password, role });
//     dispatch({ type: register_success, payload: response.data });
//   } catch (error) {
//     dispatch({ type: register_failure, error: error.response.data });
//   }
// };

export const register = (displayName, email, username, password, role) => async dispatch => {
  dispatch({ type: register_request });

  try {
    const response = await fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ displayName, email, username, password, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    dispatch({ type: register_success, payload: data });
  } catch (error) {
    dispatch({ type: register_failure, error: error.message });
  }
};

