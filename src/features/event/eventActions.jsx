import { toastr } from 'react-redux-toastr'
import { CREATE_EVENT,UPDATE_EVENT,DELETE_EVENT, FETCH_EVENTS } from './eventConstants'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions'
import { fetchSampleDate } from '../../app/data/mockApi'

//Action Creater
//通常會將payload包成物件return出去，這樣就可以直接在該物件上加上許多屬性或方法並傳給reducer
export const fetchEvents = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events
  }
}

export const createEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      })
      toastr.success('Success!','Event has been created')
    } catch (error) {
      toastr.error('Oops','Something went wrong')
    }
  }
}


export const updateEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      })
      toastr.success('Success!','Event has been updated')
    } catch (error) {
      toastr.error('Oops','Something went wrong')
    }
  }
}


export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: { 
      eventId
    }
  }
}

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart())
      let events = await fetchSampleDate()
      dispatch(fetchEvents(events))
      dispatch(asyncActionFinish())
    }catch(error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}