import { MODAL_CLOSE, MODAL_OPEN } from './modalConstants'
import { createReducer } from '../../app/common/util/reducerUtil'

const initialState = null

const openModal = (state, payload) => {
    const { modalType, modalProps } = payload
    return { modalType, modalProps  }
}

const closeModal = (state, payload) => {
    return null
}

export default createReducer(initialState, {
    [MODAL_CLOSE]: closeModal,
    [MODAL_OPEN]: openModal
})
    