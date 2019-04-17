import { createReducer } from '../../app/common/util/reducerUtil'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants'

//將eventsDashboard中的資料移動至此當作initialState

const initialState = [
    {
      id: '1',
      title: 'Trip to Tower of London',
      date: '2018-03-27',
      category: 'culture',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      city: 'London, UK',
      venue: "Tower of London, St Katharine's & Wapping, London",
      hostedBy: 'Bob',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        }
      ]
    },
    {
      id: '2',
      title: 'Trip to Punch and Judy Pub',
      date: '2018-03-28',
      category: 'drinks',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      city: 'London, UK',
      venue: 'Punch & Judy, Henrietta Street, London, UK',
      hostedBy: 'Tom',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      attendees: [
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        }
      ]
    }
  ];


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

  export default createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent
  })

  //最後記得去rootReducer import 目前的 eventReducer