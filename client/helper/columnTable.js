import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { deletePost } from '../action/post'
import ModalPostFormProvider from '../helper/modalPostFormProvider'

const { confirm } = Modal

const renderAction = (text, record) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalPostFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deletePost(record.key))
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
                    onClick={() => showConfirm(record.key)}>
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

const columns = {
    postTable:  [
        {
            title: <FormattedMessage id='title' />,
            width: 200,
            dataIndex: 'title',
            key: 'title',
            fixed: 'left'
        },
        {
            title: <FormattedMessage id='subtitle' />,
            width: 100,
            dataIndex: 'subTitle',
            key: 'subTitle'
        },
        {
            title: <FormattedMessage id='category' />,
            width: 100,
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: <FormattedMessage id='status' />,
            width: 100,
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: <FormattedMessage id='creationdate' />,
            width: 150,
            dataIndex: 'creationDate',
            key: 'creationDate'
        },
        {
            title: <FormattedMessage id='action' />,
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) => renderAction(text, record),
        },
    ]
}

export default columns


