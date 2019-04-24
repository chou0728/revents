import React from 'react'
import { connect } from 'react-redux'
import TestModal from './TestModal'

//用來查詢與列舉現有的modal
const modalLookup = {
  TestModal
} 

const mapStates = (state) => ({
  currentModal:state.modals
})

//直接從props中解構賦值 => 等同於 { currentModal } = this.props
const ModalManager = ({currentModal}) => {

  let renderModal

  //如果store中的currentModal存在
  if(currentModal) {
    const { modalType, modalProps } = currentModal
    const ModalComponent = modalLookup[modalType]
    renderModal = <ModalComponent {...modalProps}/>
  }

  return <span>{renderModal}</span>
}

export default connect(mapStates)(ModalManager)
