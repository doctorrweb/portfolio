import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Typography } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import ImageForm from '../imageForm'

const { Title } = Typography

const columns = [
    {
        title: <FormattedMessage id='name' />,
        width: 100,
        dataIndex: 'surname',
        key: 'surname',
        fixed: 'left'
    },
    {
        title: <FormattedMessage id='path' />,
        width: 100,
        dataIndex: 'path',
        key: 'path'
    },
    {
        title: <FormattedMessage id='creationdate' />,
        width: 100,
        dataIndex: 'creationDate',
        key: 'creationDate'
    },
    {
        title: <FormattedMessage id='status' />,
        width: 100,
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: <FormattedMessage id='action' />,
        key: 'operation',
        fixed: 'right',
        width: 100,
        //render: () => <a>action</a>,
    },
]

const DashboardImage = () => {

    const intl = useIntl()

    const responseStatus = useSelector(state => state.response.status)
    const [modalVisibility, setModalVisibility] = useState(false)

    useEffect(() => {
        renderModal()
    }, [modalVisibility])

    useEffect(() => {
        if (responseStatus >= 200) {
            setModalVisibility(false)
        }
    }, [responseStatus])

    const title = <Title level={4}>Image Form</Title>
    const component = <ImageForm />

    const renderModal = () => {
        return useCustomModal(title, component, modalVisibility, setModalVisibility)
    }


    return (
        <Row>
            <Row >
                <Col lg={18} md={18} sm={18} xs={24}>
                    <Title level={2}><FormattedMessage id='image' /></Title>
                </Col>
                <Col lg={6} md={6} sm={6} xs={24}>
                    <Button type="primary" onClick={() => setModalVisibility(!modalVisibility)} icon={<PlusOutlined />} size='middle'>
                        {` ${intl.formatMessage({ id: 'addimage' })}`}
                    </Button>
                </Col>
                {renderModal()}
            </Row>
            <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Table columns={columns} dataSource={null} scroll={{ x: 1300 }} />
                </Col>
            </Row>
        </Row>
    )
}

export default DashboardImage