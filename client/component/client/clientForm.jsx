import React, { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { UploadOutlined } from '@ant-design/icons'
import { resetResponse, resetError, resetRequestType } from '../../action'
import { useValuesToSend } from '../../helper/utils'
import { createClient } from '../../action/client'

const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 21,
            offset: 3
        }
    }
}

const ClientForm = () => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const intl = useIntl()
    const dispatch = useDispatch()

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const requestType = useSelector(state => state.requestType.status)

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'create-client') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t create this client'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'create-client') {
            notification['success']({
                message: 'Client created Successfully',
                description: 'Click on \'details\' to see the new client'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const onFinish = values => {
        const valuesToSend = useValuesToSend(values)
        dispatch(createClient({
            ...valuesToSend
        }))
        form.resetFields()
        
    }

    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
        form.resetFields()
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="client"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="name"
                label={
                    <span><FormattedMessage id='name' /></span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your surname!',
                        whitespace: true
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label={
                    <span><FormattedMessage id='description' /></span>
                }
            >
                <TextArea rows={3} />
            </Form.Item>

            <Form.Item
                name="category"
                label={
                    <span><FormattedMessage id='category' /></span>
                }
            >
                <Select
                    //placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="international">international</Option>
                    <Option value="company">company</Option>
                    <Option value="individual">individual</Option>
                    <Option value="organisation">organisation</Option>
                    <Option value="government">government</Option>
                    <Option value="ngo">ngo</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="image"
                label={
                    <span><FormattedMessage id='image' /></span>
                }
            >
                <Button>
                    <UploadOutlined /> <FormattedMessage id='click-upload' />
                </Button>

            </Form.Item>

            <Form.Item shouldUpdate={true} {...tailFormItemLayout}>
                {() => (
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldTouched('name') ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        <FormattedMessage id='create' />
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default ClientForm


