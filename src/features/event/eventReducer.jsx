import { createReducer } from '../../app/common/util/reducerUtil'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants'

 const initialState = []

  //使用spread operator將state這個陣列中的物件都展開來後再用Object.assign多塞一個物件進去
  //這樣就不用去更動到原本的陣列 (因為對redux來說是嚴禁直接在裡面更動state的，所以才需要複製後return)
  export const createEvent = (state, payload) => {
    return [...state, Object.assign({}, payload.event)]
  }

  export const updateEvent = (state, payload) => {
    console.log(...state)
    return [
      ...state.filter(event => event.id !== payload.event.id), //先將原陣列過濾掉要update的event
      Object.assign({}, payload.event) //再重新assing最新的evenT進去
    ]
  }

  export const deleteEvent = (state, payload) => {
    return [...state.filter(event => event.id !== payload.eventId)]
  }

export const fetchEvents = (state, payload) => {
    return payload.events
  }

  export default createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent,
    [FETCH_EVENTS]: fetchEvents
  })

  //最後記得去rootReducer import 目前的 eventReducer