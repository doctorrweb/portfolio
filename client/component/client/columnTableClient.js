import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { deleteClient } from '../../action/client'
import { ModalClientFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal

const renderAction = (text, record) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalClientFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteClient(record.key))
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

const columns = {
    clientTable: [
        {
            title: <FormattedMessage id='name' />,
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left'
        },
        {
            title: <FormattedMessage id='description' />,
            width: 350,
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: <FormattedMessage id='category' />,
            width: 50,
            dataIndex: 'category',
            key: 'category'
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


