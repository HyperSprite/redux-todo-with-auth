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
  'FETCH_USER_ACTIVITIES' |
  'CLEAR_ACTIVITY_SEARCH' |
  'SET_ACTIVITY_SEARCH_CUSTOM' |
  'FETCH_WEEKLYTOTALS_ACTIVITIES' |
  'FETCH_ACTIVITIES_SEARCH' |
  'ACTIVITY_REMOVED' |
  'SET_WEEKLY_STATS' |
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
  'FETCH_EVENT_STRAVA_ROUTE' |
  'SET_PAGE_NAME' |
  'SET_PAGE_DRAWER' |
  'SET_IS_FETCHING' |
  'SET_IS_FETCHING_OFF' |
  'SET_CLUB_NOTICE' |
  'MESSAGE_FOR_USER' |
  'SET_TSS_GOAL'
  )
