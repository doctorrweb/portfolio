import React, { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    Transfer,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { UploadOutlined } from '@ant-design/icons'
import { resetResponse, resetError } from '../../action'
import CKEditor from 'ckeditor4-react'
import { useValuesToSend } from '../../helper/utils'
import { createTutorial } from '../../action/tutorial'

const { Option } = Select

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 }
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

const FormationForm = () => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const intl = useIntl()
    const dispatch = useDispatch()

    const [content, setContent] = useState('')

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const lang = useSelector(state => state.locale.lang)

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus >= 400) {
            notification['error']({
                message: `${intl.formatMessage({ id: 'login-fail' })}`
            })
            dispatch(resetError())
        }
        if (responseStatus >= 201) {
            notification['success']({
                message: `${intl.formatMessage({ id: 'login-success' })}`
            })
            dispatch(resetResponse())
        }
    }

    const ckeditor4Handler = value => {
        setContent(value)
    }

    const onFinish = values => {
        const valuesToSend = useValuesToSend(values)
        dispatch(createTutorial({
            title: { [lang]: valuesToSend.title },
            subTitle: { [lang]: valuesToSend.subtitle },
            content: { [lang]: content },
            category: valuesToSend.category
        }))
        
        console.log('values to send of form: ', valuesToSend)
        console.log('Received values of form: ', values)
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
            name="formation"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
        >
            <Form.Item
                name="title"
                label={
                    <span><FormattedMessage id='title' /></span>
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
                name="subtitle"
                label={
                    <span><FormattedMessage id='subtitle' /></span>
                }
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="content"
                label={
                    <span><FormattedMessage id='content' /></span>
                }
            >
                <CKEditor
                    onChange={e => ckeditor4Handler(e.editor.getData())}
                    data={content}
                />
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
                    <Option value="professional"><FormattedMessage id='professional' /></Option>
                    <Option value="personal"><FormattedMessage id='personal' /></Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="posts"
                label={
                    <span><FormattedMessage id='post' /></span>
                }
            >
                <Transfer />
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

            <Form.Item
                name="videos"
                label={
                    <span><FormattedMessage id='video' /></span>
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
                            !form.isFieldTouched('title') ||
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

export default FormationForm


