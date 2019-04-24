import React from 'react'
import { Modal } from 'semantic-ui-react'

const TestModal = () => {
  return (
    <Modal closeIcon="close" open={true}>
      <Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Test modal...</p>
          </Modal.Description>
        </Modal.Content>
      </Modal.Header>
    </Modal>
  )
}

export default TestModal
