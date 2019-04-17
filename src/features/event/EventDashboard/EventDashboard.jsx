import React, { Component } from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { createEvent, updateEvent, deleteEvent } from '../eventReducer';


const mapState = (state) => ({
  events: state.events
})

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

class EventDashboard extends Component {
  state = {
    isOpen: false, //用來決定 EventForm 開關與否
    selectedEvent: null
  };

  handleFormOpen = value => () => {
    //未bind前，這裡的this是按下的那顆Button(因為是Button呼叫他的)，bind後，this變成EventDashboard
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
    console.log(value);
  };

  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  // update的時候將events陣列與updateEvents陣列中每個物件用id去跟比對，看現在傳上來要update的是哪一個物件
  // 比對到要update的物件後，利用 Object.assign的方式去複製updateEvents中的updateEvent物件 (但並不是深拷貝)
  // JavaScript 的 Object.assign 陷阱 : https://jigsawye.com/2015/10/06/javascript-object-assign/
  handleUpdateEvent = updateEvent => {
    this.props.updateEvent(updateEvent)
    this.setState({
      isOpen: false,
      selectedEvent: null
    });
  };

  //因為eventToOpen會從EventListItem傳到EventList，再透過EventList傳上來，所以要用2個arrow，這樣就不用寫2次callback
  handleOpenEvent = eventToOpen => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid(); //自動產生id的plugin
    newEvent.hostPhotoURL = '/assets/user.png';
    this.props.createEvent(newEvent)
    this.setState({
      isOpen: false
    });
  };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }
  
  // handleDeleteEvent = (eventId) =>() => {
  //   //filter會傳回符合條件的物件變成新的array並吐回
  //   //將從子組件中被點擊的event 的 eventId跟原本events陣列中的id做比對，傳回所有物件，除了event.id !== eventId的那個物件
  //   const updatedEvents = this.state.events.filter(event => event.id !== eventId);
  //   this.setState({
  //     events: updatedEvents
  //   })
  // };

  render() {
    const { isOpen, selectedEvent } = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            onOpenEvent={this.handleOpenEvent}
            deleteEvent={this.handleDeleteEvent}
            events={events}
          />
          {/*  onOpenEvent 跟 events 都是props 傳下去給子組件，其中onOpenEvent傳的是EventDashboard父層組件中的一個function，傳到底下去給子組件使用，這樣子組件就可以直接set父層的state*/}
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content="Create Event"
            onClick={this.handleFormOpen('Button click')}
          />
          {isOpen && (
            <EventForm
              selectedEvent={selectedEvent}
              handleCancel={this.handleCancel}
              updateEvent={this.handleUpdateEvent}
              createEvent={this.handleCreateEvent}
            />
          )}
          {/* 透過handleOpenEvent()改了state後，馬上就使用selectedEvent 當作props傳下去給EventForm了，但EventForm拿到selectedEvent這個props後還需要透過componentDidMount中寫setState才能夠將畫面重新渲染一遍 */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);
