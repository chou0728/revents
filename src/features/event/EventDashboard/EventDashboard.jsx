import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventReducer';


const mapState = (state) => ({
  events: state.events
})

const actions = {
  deleteEvent
}

class EventDashboard extends Component {
  state = {
    isOpen: false, //用來決定 EventForm 開關與否
    selectedEvent: null
  };

  // handleFormOpen = value => () => {
  //   //未bind前，這裡的this是按下的那顆Button(因為是Button呼叫他的)，bind後，this變成EventDashboard
  //   this.setState({
  //     selectedEvent: null,
  //     isOpen: true
  //   });
  //   console.log(value);
  // };


  // update的時候將events陣列與updateEvents陣列中每個物件用id去跟比對，看現在傳上來要update的是哪一個物件
  // 比對到要update的物件後，利用 Object.assign的方式去複製updateEvents中的updateEvent物件 (但並不是深拷貝)
  // JavaScript 的 Object.assign 陷阱 : https://jigsawye.com/2015/10/06/javascript-object-assign/
  // handleUpdateEvent = updateEvent => {
  //   this.props.updateEvent(updateEvent)
  //   this.setState({
  //     isOpen: false,
  //     selectedEvent: null
  //   });
  // };

  //因為eventToOpen會從EventListItem傳到EventList，再透過EventList傳上來，所以要用2個arrow，這樣就不用寫2次callback
  // handleOpenEvent = eventToOpen => () => {
  //   this.setState({
  //     selectedEvent: eventToOpen,
  //     isOpen: true
  //   });
  // };


  // handleDeleteEvent = (eventId) =>() => {
  //   //filter會傳回符合條件的物件變成新的array並吐回
  //   //將從子組件中被點擊的event 的 eventId跟原本events陣列中的id做比對，傳回所有物件，除了event.id !== eventId的那個物件
  //   const updatedEvents = this.state.events.filter(event => event.id !== eventId);
  //   this.setState({
  //     events: updatedEvents
  //   })
  // };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);
