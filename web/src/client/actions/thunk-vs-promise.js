// This is just a sample of the difference between
// Redux-thuunk and Redux-promise

// thunk version
export function fetchMessageThunk() {
  return (dispatch) => {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_DATA,
          payload: response.data.message,
        });
      });
  }
}

// promise version
export function fetchMessagePromise() {
  const request = axios.get(ROOT_URL, {
    headers: { authorization: localStorage.getItem('token') },
  });

  return {
    type: FETCH_DATA,
    payload: request,
  };
}
