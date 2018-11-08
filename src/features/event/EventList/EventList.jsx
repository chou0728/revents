import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const {events} = this.props //在jsx裡將父層傳來的props宣告
    return (
      <div>
        <h1>Event List</h1>
        {events.map( event =>   //jsx 的好處是可以在裡面直接使用原生js
          <EventListItem  key={event.id} event={event}/>
        )}
      </div>
    );
  }
}

export default EventList;
