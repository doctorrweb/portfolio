import React, {useState, useEffect} from 'react'
import { Table, Row, Col, Button, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import UserForm from './userForm'

const { Title } = Typography

const columns = [
    {
        title: <FormattedMessage id='surname' />,
        width: 100,
        dataIndex: 'surname',
        key: 'surname',
        fixed: 'left'
    },
    {
        title: <FormattedMessage id='firstname' />,
        width: 100,
        dataIndex: 'firstname',
        key: 'firstname'
    },
    {
        title: 'E-mail',
        width: 100,
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: <FormattedMessage id='role' />,
        width: 100,
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: <FormattedMessage id='action' />,
        key: 'operation',
        fixed: 'right',
        width: 100,
        //render: () => <a>action</a>,
    },
]

const DashboardUser = () => {

    const intl = useIntl()

    const responseStatus = useSelector(state => state.response.status)
    const [modalVisibility, setModalVisibility] = useState(false)

    useEffect(() => {
        renderModal()
    }, [modalVisibility])

    useEffect(() => {
        if (responseStatus == 201) {
            setModalVisibility(false)
        }
    }, [responseStatus])

    const title = (
        <Title level={4}>
            User Form
        </Title>
    )
    const component = <UserForm />

    const renderModal = () => {
        return useCustomModal(title, component, modalVisibility, setModalVisibility)
    }

    return (
        <Row>
            <Row >
                <Col lg={18} md={18} sm={18} xs={24}>
                    <Title level={2}><FormattedMessage id='user' /></Title>
                </Col>
                <Col lg={6} md={6} sm={6} xs={24}>
                    <Button type="primary" onClick={() => setModalVisibility(!modalVisibility)} icon={<PlusOutlined />} size='middle'>
                        {` ${intl.formatMessage({ id: 'createuser' })}`}
                    </Button>
                </Col>
                { renderModal() }
            </Row>
            <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Table columns={columns} dataSource={null} scroll={{ x: 1300 }} />
                </Col>
            </Row>
        </Row>
    )
}

export default DashboardUser
