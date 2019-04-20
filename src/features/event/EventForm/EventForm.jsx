import React, {Component} from 'react';
import {Segment, Form, Button, Grid, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {createEvent, updateEvent} from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';

const mapState = (state, ownProps) => {
  //URL帶的id
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: '',
  };

  //如果URL不帶id => 代表是要新增，故return 原始的空event
  if (!eventId) {
    return event;
  }

  // 確認store裡面的events是否有資料
  if (state.events && state.events.length > 0) {
    //傳回URL id 與store中資料id相符的event
    event = state.events.filter (event => event.id === eventId)[0];

    return {
      event,
    };
  }
};

const actions = {
  createEvent,
  updateEvent,
};

class EventForm extends Component {
  onFormSubmit = e => {
    e.preventDefault ();
    //id存在就是編輯，不存在則是新增
    if (this.state.event.id) {
      this.props.updateEvent (this.state.event);
      this.props.history.goBack ();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid (),
        hostPhotoURL: 'assets/user.png',
      };
      this.props.createEvent (newEvent);
      this.props.history.push ('/events');
    }
  };

  render () {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Form onSubmit={this.onFormSubmit}>
              <Header sub color="teal" content="Event Details" />
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={TextInput}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={TextInput}
                placeholder="Event City"
              />
              <Field
                name="venue"
                type="text"
                component={TextInput}
                placeholder="Event Venue"
              />
              <Field
                name="date"
                type="text"
                component={TextInput}
                placeholder="Event Date"
              />
              <Button positive type="submit">
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

//一但用reduxForm HOC包起來後從devtool可以看到 EventForm多了很多props可使用
export default connect (mapState, actions) (
  reduxForm ({form: 'eventForm'}) (EventForm)
);
