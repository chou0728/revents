import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'

// 宣告一個emptyEvent，用以區別
// const emptyEvent = {
//   title: '',
//   date: '',
//   city: '',
//   venue: '',
//   hostedBy: ''
// };

const mapState = (state, ownProps) => {

  //URL帶的id
  const eventId = ownProps.match.params.id

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }
  
  //如果URL不帶id => 代表是要新增，故return 原始的空event
  if (!eventId) {
    return event
  }

  // 確認store裡面的events是否有資料
  if(state.events && state.events.length > 0) {
    //傳回URL id 與store中資料id相符的event
    event = state.events.filter(event => event.id === eventId)[0]

    return {
      event
    }
  }

}

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
    // event: emptyEvent //將event一開始的值設定為emptyEvent
  };

  // 1. hover可以看到說明 (在componentDidMount設定state的話會觸發rerender)
  // 2. 是很好的時機點來 render 從後端API取來的data
  // 3. 打開ReactDevTool 可以看到按下 EventList 中的 view button 會將EventDashboard的props值selectedEvent重新set，再按下 Create Event後，selectedEvent又變回null
  // componentDidMount() {
  //   if (this.props.selectedEvent !== null) {
  //     this.setState({
  //       event: this.props.selectedEvent
  //     });
  //   }
  // }

  // 1. 通常 componentWillReceiveProps 要寫在 componentDidMount 的後面
  // 2. 當第一次按下 view button 的時候並不會觸發 componentWillReceiveProps，而是只會觸發componentDidMount
  // 3. 當按下第二次 view button 的時候就會開始觸發 componentWillReceiveProps了，而這個時候可以自由運用原本的props或是新的nextProps
  // 4. 在 React 17 中 被視為unsafe，但仍然可以使用
  // componentWillReceiveProps(nextProps) {
  //   // console.log('current', this.props.selectedEvent);
  //   // console.log('next: ', nextProps.selectedEvent);

  //   //比對資料是否一樣，一樣的話不setState，不一樣才setState
  //   if(nextProps.selectedEvent !== this.props.selectedEvent) {
  //     this.setState({
  //       event: nextProps.selectedEvent || emptyEvent //如果按下 create button 時 nextProps會是null，所以要給他emptyEvent
  //     });
  //   }
  // }

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this.state.event);
    //id存在就是編輯，不存在則是新增
    if(this.state.event.id){
      this.props.updateEvent(this.state.event);
    } else {
      this.props.createEvent(this.state.event);
    }
  };

  onInputChange = e => {
    const newEvent = this.state.event;
    newEvent[e.target.name] = e.target.value; //Object key 寫法 e.g : newEvent[title] = newEvent.title
    this.setState({
      event: newEvent
    });
  };

  render() {
    const { handleCancel } = this.props;
    const { event } = this.state; // const { event } = { event :{ title:'',...} } ES6解構賦值，this.state本身是個物件，裡面的屬性名跟左邊的變數名稱一樣，就可以賦予值
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              onChange={this.onInputChange}
              name="title"
              value={event.title}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              onChange={this.onInputChange}
              name="date"
              value={event.date}
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              onChange={this.onInputChange}
              name="city"
              value={event.city}
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              onChange={this.onInputChange}
              name="venue"
              value={event.venue}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              onChange={this.onInputChange}
              name="hostedBy"
              value={event.hostedBy}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState)(EventForm);
