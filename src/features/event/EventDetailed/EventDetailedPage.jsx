import React from 'react';
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import {Grid} from 'semantic-ui-react';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSideBar from './EventDetailedSideBar';

//因為router已經附加在這個component上了，所以除了redux的props(也就是state)外
// 可以透過設置第二個參數來拿到屬於該component的其他種類的props
const mapState = (state, ownProps) => {
  
  const eventId = ownProps.match.params.id

  let event = {}
  console.log(state.firestore.ordered.events)
  //如果URL中有帶id參數且store中的event陣列有資料 => 使用filter來return新的值
  if(eventId && state.firestore.ordered.events.length >0) {

    event = state.firestore.ordered.events.filter(event => event.id === eventId)[0]
  }
  

  return {
    event
  }
}

//由於上面有使用mapState來return一個包著event的物件
//所以component現在可以拿到該props了
const EventDetailedPage = ({event}) => {
  console.log(this.props)
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event}/>
        <EventDetailedInfo event={event}/>
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSideBar attendees={event.attendees}/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(firestoreConnect([{collection: 'events'}])(EventDetailedPage));
