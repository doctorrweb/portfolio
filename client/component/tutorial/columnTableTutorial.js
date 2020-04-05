import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal, Tag } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteTutorial } from '../../action/tutorial'
import { ModalTutorialFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal

const renderAction = (text, record) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalTutorialFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteTutorial(record.key))
            }
        })
    }

    const setFormCb = () => {
        modalForm.setVisibility(true)
        modalForm.setItemToUpdate(record.key)
    }

    /*
   
    */

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
    default:
        return (
            <Tag color="orange">{text}</Tag>
        )
    }
}

const columns = {
    tutorialTable: [
        {
            title: <FormattedMessage id='title' />,
            width: 150,
            dataIndex: 'title',
            key: 'title',
            fixed: 'left'
        },
        {
            title: <FormattedMessage id='category' />,
            width: 50,
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
            title: <FormattedMessage id='status' />,
            width: 50,
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'pending', value: 'pending' },
                { text: 'active', value: 'active' },
                { text: 'trash', value: 'trash' }
            ],
            onFilter: (value, record) => record.status.includes(value),
            render: (text) => renderStatus(text)
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
            width: 50,
            render: (text, record) => renderAction(text, record),
        },
    ]
}

export default columns


