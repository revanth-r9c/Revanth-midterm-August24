import { register_request, register_success, register_failure } from '../actions/userActions';

const initialState = {
  loading: false,
  user: null,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case register_request:
      return { ...state, loading: true };
    case register_success:
      return { ...state, loading: false, user: action.payload };
    case register_failure:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default userReducer;
