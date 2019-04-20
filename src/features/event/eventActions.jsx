import { CREATE_EVENT,UPDATE_EVENT,DELETE_EVENT } from './eventConstants'

//Action Creater

//通常會將payload包成物件return出去，這樣就可以直接在該物件上加上許多屬性或方法並傳給reducer
export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: { 
            event
        }
    }
}

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: { 
            event
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