import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, onOpenEvent, deleteEvent } = this.props; //在jsx裡將父層傳來的props宣告
    return (
      <div>
        <h1>Event List</h1>
        {events.map( event =>   //jsx 的好處是可以在裡面直接使用原生js
          <EventListItem 
            key={event.id} 
            event={event} 
            onOpenEvent={onOpenEvent}
            deleteEvent={deleteEvent}
          />
          // events 跟 onOpenEvent 都是父傳下來的props，在這邊再次傳下去給子組件
        )}
      </div>
    );
  }
}

export default EventList;
