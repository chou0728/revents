import React, {Component} from 'react';
import {Segment, Form, Button, Grid, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import {createEvent, updateEvent} from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';


const mapState = (state, ownProps) => {
  //URL帶的id
  const eventId = ownProps.match.params.id;

  //因為react-form會處理form的欄位，所以不需要手動自定義object key
  let event = {}

  // let event = {
  //   title: '',
  //   date: '',
  //   city: '',
  //   venue: '',
  //   hostedBy: '',
  // };


  // 確認store裡面的events是否有資料
  if (state.events && state.events.length > 0) {
    //傳回URL id 與store中資料id相符的event
    event = state.events.filter (event => event.id === eventId)[0];
  }    
  //一但給了initialValues後，redux-form就會自動去將值帶入
  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent,
};

const validate = combineValidators({
  title: isRequired({message:'The event title is required'}),
  category: isRequired({message:'Please provide a category'}),
  description: composeValidators(
    isRequired({message:'Please enter a description'}),
    hasLengthGreaterThan(4)({message:'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')

})

const categoryList = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {

  onFormSubmit = values => {
    // e.preventDefault (); 不需要了，因為redux form 已經處理掉
    //id存在就是編輯，不存在則是新增

    if (!this.props.match.params.id) {
      const newEvent = {
        ...values,
        id: cuid (),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    } else {
      this.props.updateEvent(values);
      this.props.history.goBack();
    }

  };

  render () {
    //將這三個布林值從redux form的props中解開並傳下去給submit button (pristine是指是否為原始的狀態)
    const { invalid, submitting, pristine } = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            {/* 將submit交由redux form去處理，但還是可以傳入我們定義的function進去 */}
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit) }> 
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
                options={categoryList}
                component={SelectInput}
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
                component={DateInput}
                dateFormat="YYYY/MM/DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Date and Time of event"
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
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
//使用 enableReinitialize 來讓redux form 可以在切換頁面時重新賦予initialValues
export default connect(mapState, actions) (
  reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm)
);
