import React from 'react';
import {connect} from 'react-redux'
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {login} from '../authActions'

const actions = {
  login
}

//login從authActions來的，hanldeSubmit 是從reduxForm來的
const LoginForm = ({ login, hanldeSubmit}) => {
  return (
    // onSubmit時執行hanldeSubmit function，參數為login function
    <Form error size="large" onSubmit={hanldeSubmit(login)}> 
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(null, actions)(reduxForm({form:'loginForm'})(LoginForm));