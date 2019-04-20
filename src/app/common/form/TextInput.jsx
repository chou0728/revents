import React from 'react'
import { Form, Label} from 'semantic-ui-react'

const TextInput = ({input, width, type, placeholder, meta:{touched,error}}) => {
  return (
    //將input屬性展開並傳給input(屬性包含了name, value, onChange...等事件處理函式)
    <Form.Field error={touched && !!error} widht={width}>
      <input {...input} placeholder={placeholder} type={type}/>
      {touched && error && <Label basic color="red">{error}</Label>}
    </Form.Field>
  )
}

export default TextInput
