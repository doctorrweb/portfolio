import React, { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    Radio,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import CKEditor from 'ckeditor4-react'
import { UploadOutlined } from '@ant-design/icons'
import { resetResponse, resetError } from '../../action'
import { createPost } from '../../action/post'

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

const PostForm = () => {

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const intl = useIntl()
    const dispatch = useDispatch()

    const [content, setContent] = useState('')   
    //const [postInitialValues, setPostInitialValues] = useState({}) 
    const [relation, setRelation] = useState('blog')

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const lang = useSelector(state => state.locale.lang)

    /*

    */

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate()
    }, [])

    

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus === 400) {
            notification['error']({
                message: `${intl.formatMessage({ id: 'login-fail' })}`
            })
            dispatch(resetError())
        }
        if (responseStatus === 201) {
            notification['success']({
                message: `${intl.formatMessage({ id: 'login-success' })}`
            })
            dispatch(resetResponse())
        }
    }

    const ckeditor4Handler = value => {
        setContent(value)
    }

    const onFinish = (values) => {
        dispatch(createPost({ ...values, lang: lang, content: content }))
        setContent('')
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
            name="post"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                relation: 'blog'
            }}
        >
            <Form.Item
                name="title"
                label={
                    <span>
                        <FormattedMessage id="title" />
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input the title!',
                        whitespace: true
                    }
                ]}
                //shouldUpdate
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={
                    <span>
                        <FormattedMessage id="content" />
                    </span>
                }
                name="content"
            >
                <CKEditor
                    onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true )}
                    onChange={e => ckeditor4Handler(e.editor.getData())}
                    data={content}
                />
            </Form.Item>

            <Form.Item 
                label="Related to" 
                name="relation"
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Radio.Group
                    defaultValue='blog'
                    buttonStyle="solid"
                    onChange={e => setRelation(e.target.value)}

                >
                    <Radio.Button value="blog">Blog</Radio.Button>
                    <Radio.Button value="tutorial">
                        <FormattedMessage id="tutorial" />
                    </Radio.Button>
                    <Radio.Button value="project">
                        <FormattedMessage id="project" />
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Related item" name="relationItem">
                <Select
                    allowClear
                    showSearch
                    disabled={relation === 'blog'}
                >
                    <Option value="option1">Option 1</Option>
                    <Option value="option2">Option 2</Option>
                    <Option value="option3">Option 3</Option>
                    <Option value="option4">Option 4</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="category"
                label={
                    <span>
                        <FormattedMessage id="category" />
                    </span>
                }
            >
                <Select
                    //placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="professional">
                        <FormattedMessage id="professional" />
                    </Option>
                    <Option value="personal">
                        <FormattedMessage id="personal" />
                    </Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="image"
                label={
                    <span>
                        <FormattedMessage id="image" />
                    </span>
                }
            >
                <Button>
                    <UploadOutlined /> <FormattedMessage id="click-upload" />
                </Button>
            </Form.Item>

            <Form.Item shouldUpdate={true} {...tailFormItemLayout}>
                {() => (
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(['title', 'subtitle', 'category']) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                        }
                    >
                        <FormattedMessage id="create" />
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}


export default PostForm


