import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal, Typography, Tag } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteVideo } from '../../action/video'
import { ModalVideoFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal
const { Paragraph } = Typography


const renderAction = (text, record) => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalVideoFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteVideo(record.key))
            }
        })
    }

    const handlePreview = (video) => {
        modalForm.setVideoToDisplay(video)
        modalForm.setModalDisplayVisibility(true)
    }

    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item
                    key="1"
                    onClick={() => handlePreview(record.path)}
                >
                    Preview
                </Menu.Item>
                <Menu.Item
                    key="2"
                    onClick={() => showConfirm(record.key)}
                >
                    <FormattedMessage id='delete' />
                </Menu.Item>
            </Menu>
        } trigger={['click']}>
            <Button type="primary" ghost >
                Actions <DownOutlined />
            </Button>

        </Dropdown>
    )
}

const renderStatus = (text) => {
    switch (text) {
    case 'trash':
        return (
            <Tag color="red">{text}</Tag>
        )
    case 'active':
        return (
            <Tag color="green">{text}</Tag>
        )
    default:
        return (
            <Tag color="orange">{text}</Tag>
        )
    }
}

const columns = [
    {
        title: <FormattedMessage id='name' />,
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left'
    },
    {
        title: <FormattedMessage id='path' />,
        width: 200,
        dataIndex: 'path',
        key: 'path',
        render(text, record) {
            return (
                <Paragraph copyable>{record.path}</Paragraph>
            )
        }
    },
    {
        title: <FormattedMessage id='creationdate' />,
        width: 100,
        dataIndex: 'creationDate',
        key: 'creationDate',
        sorter: (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
        sortDirections: ['ascend', 'descend'],
        defaultSortOrder: 'descend',
        render: (text, record) => moment(record.creationDate).format('LLL')
    },
    {
        title: <FormattedMessage id='status' />,
        width: 50,
        dataIndex: 'status',
        key: 'status',
        filters: [
            { text: 'inactive', value: 'inactive' },
            { text: 'active', value: 'active' },
            { text: 'trash', value: 'trash' }
        ],
        onFilter: (value, record) => record.status.includes(value),
        render: (text) => renderStatus(text)
    },
    {
        title: <FormattedMessage id='action' />,
        key: 'operation',
        fixed: 'right',
        width: 60,
        render: (text, record) => renderAction(text, record)
    },
]



export default columns