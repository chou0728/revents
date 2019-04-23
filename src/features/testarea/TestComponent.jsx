import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Icon} from 'semantic-ui-react';
import Script from 'react-load-script';
import GoogleMapReact from 'google-map-react';
import PlacesAutocomplete, { geocodeByAddress,getLatLng } from 'react-places-autocomplete';
import {incrementCounter, decrementCounter} from './testActions';

// note: 需要去設定google consolge 配額並綁定信用卡才可以使用maps api服務
// https://www.udemy.com/build-an-app-with-react-redux-and-firestore-from-scratch/learn/v4/questions/5137638

// 將store中的state整合在一起
const mapState = state => ({
  data: state.test.data,
});

// 將需要用到的action整合在一起
const actions = {
  incrementCounter,
  decrementCounter,
};

const Marker = () => <Icon name='maker' size='big' color='red'/>

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: '',
    scriptLoaded: false,
  };
  

  handleScriptLoad = () => {
    this.setState ({scriptLoaded: true});
  };

  handleFormSubmit = event => {
    event.preventDefault ();

    geocodeByAddress (this.state.address)
      .then (results => getLatLng (results[0]))
      .then (latLng => console.log ('Success', latLng))
      .catch (error => console.error ('Error', error));
  };

  onChange = address => this.setState ({address});

  render () {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };

    const {incrementCounter, decrementCounter, data} = this.props;
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCAn4_Es5taHzNfOxTkmalcCeKC0pbP1r4&libraries=places"
          onLoad={this.handleScriptLoad} //使用Script提供的onLoad方法，去掌握script是否已經load完成
        />
        <h1>TestComponent</h1>
        <h3>this is : {data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {/* script load 完成才能render PlacesAutocomplete */}
          {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />} 
          <button type="submit">Submit</button>
        </form>
        <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCAn4_Es5taHzNfOxTkmalcCeKC0pbP1r4' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

//透過connect過完水後回傳一個新的component後，TestComponent中的props就有store裡的action與state值了
//透過React devTool 可以看到TestComponent component被 connect包起來
//透過connect 將redux中的state，使用MapStateToProps來傳給目前這個container component
//透過connect 將redux中的action，使用MapDispatchToProps來傳給目前這個container component
export default connect (
  mapState, //MapStateToProps
  actions //MapDispatchToProps
) (TestComponent);
