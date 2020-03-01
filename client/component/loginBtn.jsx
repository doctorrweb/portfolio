import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { PoweroffOutlined } from '@ant-design/icons';
import { Col, Button, Modal, notification } from 'antd'
import { showModalLogin } from '../action'

const { confirm } = Modal

const loginBtn = () => {

    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
    //const modlaLogin = useSelector(state => state.modlaLogin.modlaLogin)

    const dispatch = useDispatch()
    const intl = useIntl()

    const showConfirm = () => {
        confirm({
            title: <FormattedMessage id='auth-disc' />,
            okText: <FormattedMessage id='yes' />,
            cancelText: <FormattedMessage id='no' />,
            onOk() {
                return (
                    notification['success']({
                        message: <FormattedMessage id='auth-closed' />
                    })
                )
            }
            
        })
    }

    const btnAction = () => {
        isLoggedIn ? showConfirm() : dispatch(showModalLogin(true))
    }

    return (
        <Col md={3} sm={1} xs={1}>
            <Button icon={<PoweroffOutlined />} type="primary" size="small" onClick={() => btnAction()}>
                {isLoggedIn ? ` ${intl.formatMessage({id: 'logout'})}`: ` ${intl.formatMessage({id: 'login'})}`}
            </Button>
        </Col>
    );
}

export default loginBtn