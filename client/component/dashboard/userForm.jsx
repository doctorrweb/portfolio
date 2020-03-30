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
import { logonUser, resetError, resetResponse } from '../../action'

const { Option } = Select

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
}

const UserForm = () => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const intl = useIntl()
    const dispatch = useDispatch()

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus == 401) {
            notification['error']({
                message: `${intl.formatMessage({ id: 'login-fail' })}`
            })
            dispatch(resetError())
        }
        if (responseStatus == 200) {
            notification['success']({
                message: `${intl.formatMessage({ id: 'login-success' })}`
            })
            dispatch(resetResponse())
        }
    }

    const onFinish = values => {
        dispatch(logonUser(values))
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
            name="register"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                role: 'suscriber',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="surname"
                label={
                    <span><FormattedMessage id='surname' /></span>
                }
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="firstname"
                label={
                    <span><FormattedMessage id='firstname' /></span>
                }
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label={
                    <span><FormattedMessage id='password' /></span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!'
                    }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label={
                    <span><FormattedMessage id='confirmation-password' /></span>
                }
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!'
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                'The two passwords that you entered do not match!'
                            )
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="role"
                label={
                    <span><FormattedMessage id='role' /></span>
                }
            >
                <Select
                    //placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="suscriber"><FormattedMessage id='suscriber' /></Option>
                    <Option value="manager">Manager</Option>
                    <Option value="administrator"><FormattedMessage id='admin' /></Option>
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
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        <FormattedMessage id='register' />
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default UserForm


