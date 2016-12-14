// @flow
//

export type ReduxActionIF = {
  type: string,
  payload: any,
}

// these are Action Creator Strings, see actions.js file
export type ActionStrings = (
  'ADD_TODO' |
  'TOGGLE_TODO' |
  'SET_VISIBILITY_FILTER' |
  'AUTH_USER' |
  'UNAUTH_USER' |
  'AUTH_ERROR' |
  'FETCH_DATA' |
  'FETCH_JSON' |
  'SET_USER' |
  'SET_TSS_GOAL'
  )
