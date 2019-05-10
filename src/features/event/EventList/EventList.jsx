import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props; //在jsx裡將父層傳來的props宣告
    return (
      <div>
        {/* 先確保events有抓取到後才render結構(使用 &&) */}
        {events && events.map( event =>   //jsx 的好處是可以在裡面直接使用原生js
          <EventListItem 
            key={event.id} 
            event={event} 
            deleteEvent={deleteEvent}
          />
          // events 跟 onOpenEvent 都是父傳下來的props，在這邊再次傳下去給子組件
        )}
      </div>
    );
  }
}

export default EventList;
