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
  'FETCH_USER' |
  'FETCH_JSON' |
  'SET_USER' |
  'POST_EVENT_ERROR' |
  'POST_EVENT' |
  'EDIT_EVENT' |
  'CLEAR_EVENT' |
  'DELET_EVENT' |
  'FETCH_EVENT' |
  'FETCH_EVENTS' |
  'SET_FAV_EVENT' |
  'FETCH_STRAVA_ROUTES' |
  'SET_PAGE_NAME' |
  'SET_PAGE_DRAWER' |
  'SET_TSS_GOAL'
  )
