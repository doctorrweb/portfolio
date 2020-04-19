import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal, Tag } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteProject } from '../../action/project'
import { ModalProjectFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal

const renderAction = (text, record) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalProjectFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteProject(record.key))
            }
        })
    }

    const setFormCb = () => {
        modalForm.setVisibility(true)
        modalForm.setItemToUpdate(record.key)
    }

    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item key="1">
                    <a href="#">
                        Details
                    </a>
                </Menu.Item>
                <Menu.Item
                    onClick={() => setFormCb()}
                    key="2"
                >
                    <FormattedMessage id='update' />
                </Menu.Item>
                <Menu.Item
                    key="3"
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
    case 'waiting':
        return (
            <Tag color="blue">{text}</Tag>
        )
    case 'inprogress':
        return (
            <Tag color="cyan">{text}</Tag>
        )
    case 'completed':
        return (
            <Tag color="green">{text}</Tag>
        )
    case 'rejected':
        return (
            <Tag color="red">{text}</Tag>
        )            
    default:
        return (
            <Tag color="orange">{text}</Tag>
        )
    }
}

const renderDate = (value) => {
    if (value !== null) {
        return moment(value).format('LL')
    }

    if (value === null) {
        return <Tag color="magenta">To determine</Tag>
    }
}

const columns = {
    projectTable: [
        {
            title: <FormattedMessage id='title' />,
            width: 150,
            dataIndex: 'title',
            key: 'title',
            fixed: 'left'
        },
        {
            title: <FormattedMessage id='category' />,
            width: 75,
            dataIndex: 'category',
            key: 'category',
            filters: [
                { text: 'graphic', value: 'graphic' },
                { text: 'edition', value: 'edition' },
                { text: 'web', value: 'web' },
                { text: 'mobile', value: 'mobile' },
                { text: 'desktop', value: 'desktop' },
                { text: 'undefined', value: 'undefined' }
            ],
            onFilter: (value, record) => record.category.includes(value)
        },
        {
            title: <FormattedMessage id='client' />,
            width: 125,
            dataIndex: 'client',
            key: 'client'
        },
        {
            title: <FormattedMessage id='status' />,
            width: 75,
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'waiting', value: 'waiting' },
                { text: 'in progress', value: 'inprogress' },
                { text: 'completed', value: 'completed' },
                { text: 'rejected', value: 'rejected' }
            ],
            onFilter: (value, record) => record.status.includes(value),
            render: (text) => renderStatus(text)
        },
        {
            title: <FormattedMessage id='startdate' />,
            width: 75,
            dataIndex: 'startDate',
            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
            key: 'startDate',
            render: (text, record) => renderDate(record.startDate)
        },
        {
            title: <FormattedMessage id='enddate' />,
            width: 75,
            dataIndex: 'endDate',
            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
            key: 'endDate',
            render: (text, record) => renderDate(record.endDate)
        },
        {
            title: <FormattedMessage id='creationdate' />,
            width: 75,
            dataIndex: 'creationDate',
            key: 'creationDate',
            sorter: (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'descend',
            render: (text, record) => moment(record.creationDate).format('LLL')
        },
        {
            title: <FormattedMessage id='action' />,
            key: 'operation',
            fixed: 'right',
            width: 75,
            render: (text, record) => renderAction(text, record)
        },
    ]
}

export default columns


