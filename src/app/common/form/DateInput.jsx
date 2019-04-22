import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'


//傳下去給DatePicker的props不能使用整個input.value的方式，故要再解構一層 input:{ value, onChange, ...rest}
const DateInput = ({input:{ value, onChange, ...restInput}, width, placeholder, meta:{touched, error}, ...rest}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        placeholderText={placeholder} 
        selected={value ? moment(value) : null} //因為在moment中是使用物件的形式將日期設轉成字串，故要先轉成moment的格式傳下去
        onChange={onChange}
        {...restInput} //要加上input property 這樣redxu form才能追蹤值的變化做出error
      />
      {touched && error && <Label basic color="red">{error}</Label>}
    </Form.Field>
  )
}

export default DateInput
