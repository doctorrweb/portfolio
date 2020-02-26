import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Modal, Button, Typography } from 'antd'
import { showModalLogin } from '../action/index'

const { Title } = Typography

const ModalLogin = () => {

    const modalLogin = useSelector(state => state.modalLogin.modalLogin)
    const dispatch = useDispatch()


    return (
        <div>
            <Modal
                visible={modalLogin}
                title={<Title level={4}><FormattedMessage id='login-form' /></Title>}
                style={{ top: 200 }}
                onCancel={() => dispatch(showModalLogin(false))}
                footer={[
                    <Button key='Back' onClick={() => dispatch(showModalLogin(false))}>
                        <FormattedMessage id='back' />
                    </Button>
                ]}
            >
          Here is the login form
            </Modal>
        </div>
    )
}

export default ModalLogin