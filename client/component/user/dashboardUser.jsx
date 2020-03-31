import React, {useState, useEffect} from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import UserTable from './userTable'
import UserForm from './userForm'
import UserFormUpdate from './userFormUpdate'
import { readAllUsers } from '../../action/user'
import { ModalUserFormProvider } from '../../helper/modalFormProvider'

const { Title } = Typography


const DashboardUser = () => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const responseStatus = useSelector(state => state.response.status)

    const [modalVisibilityUpdate, setModalVisibilityUpdate] = useState(false)
    const [modalVisibilityCreate, setModalVisibilityCreate] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')

    useEffect(() => {
        dispatch(readAllUsers())
    }, [])

    useEffect(() => {
        renderModalUpdate()
    }, [modalVisibilityUpdate])

    useEffect(() => {
        if (responseStatus >= 200) {
            setModalVisibilityUpdate(false)
            setModalVisibilityCreate(false)
            dispatch(readAllUsers())
        }
    }, [responseStatus])

    const title = <Title level={4}>User Form</Title>
    const componentUpdate = <UserFormUpdate itemToUpdate={itemToUpdate} />
    const componentCreate = <UserForm />

    const renderModalUpdate = () => {
        return useCustomModal(title, componentUpdate, modalVisibilityUpdate, setModalVisibilityUpdate)
    }

    const renderModalCreate = () => {
        return useCustomModal(title, componentCreate, modalVisibilityCreate, setModalVisibilityCreate)
    }

    const handleOnClick = () => {
        setModalVisibilityCreate(!modalVisibilityUpdate)
    }

    return (
        <ModalUserFormProvider.Provider value={{
            setVisibility: setModalVisibilityUpdate,
            setItemToUpdate: setItemToUpdate
        }}>
            <Row>
                <Row >
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <Title level={2}><FormattedMessage id='user' /></Title>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24}>
                        <Button type="primary" onClick={() => handleOnClick()} icon={<PlusOutlined />} size='middle'>
                            {` ${intl.formatMessage({ id: 'createuser' })}`}
                        </Button>
                    </Col>
                    {renderModalCreate()}
                    {renderModalUpdate()}
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <UserTable />
                    </Col>
                </Row>
            </Row>
        </ModalUserFormProvider.Provider>
    )
}

export default DashboardUser
