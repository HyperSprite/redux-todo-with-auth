import serialize from 'serialize-javascript';
import { fetchData } from './../actions';

// export const loadState = () => {
//   fetchData('auth/user');
// };

export const loadState = () => {
  fetchData('auth/user');
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = serialize(state, { isJSON: true });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // do nothing
  }
};
