import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'
import Script from 'react-load-script'
import PleaceAutoComplete from 'react-places-autocomplete'

const styles = {
  autocompleteContainer: {
    zIndex: 99
  }
}
class PlaceInput extends Component {

  state = {
    scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true})

  render() {
    const { input, width, onSelect, placeholder, options, meta: {touched, error}} = this.props
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCAn4_Es5taHzNfOxTkmalcCeKC0pbP1r4&libraries=places"
          onLoad={this.handleScriptLoaded} //使用Script提供的onLoad方法，去掌握script是否已經load完成
        />
        {this.state.scriptLoaded && 
        <PleaceAutoComplete
          inputProps={{...input, placeholder}}
          options={options}
          onSelect={onSelect}
          styles={styles}
        />}
        {touched && error && <Label basic color="red">{error}</Label>} 
      </Form.Field>
        
    )
  }
}

export default  PlaceInput