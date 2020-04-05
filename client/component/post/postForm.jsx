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
import { resetResponse, resetError, resetRequestType } from '../../action'
import { createPost } from '../../action/post'
import { readAllTutorials } from '../../action/tutorial'
import { readAllProjects } from '../../action/project'

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
    const [relation, setRelation] = useState('blog')
    const [relationItems, setRelationItems] = useState([])
    const [relationItem, setRelationItem] = useState('')

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const requestType = useSelector(state => state.requestType.status)
    const lang = useSelector(state => state.locale.lang)
    const tutorials = useSelector(state => state.tutorials.tutorials)
    const projects = useSelector(state => state.projects.projects)

    // To disable submit button at the beginning.
    useEffect(() => {
        dispatch(readAllTutorials())
        dispatch(readAllProjects())
        forceUpdate()
    }, [])

    useEffect(() => {
        handleRelationItemsChange()
    }, [relation])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus, requestType])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'create-post') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t create this post'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'create-post') {
            notification['success']({
                message: 'Post created Successfully',
                description: 'Click on \'details\' to see the new post'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const ckeditor4Handler = value => {
        setContent(value)
    }

    const onFinish = (values) => {
        dispatch(resetResponse())
        dispatch(createPost({ 
            ...values, 
            lang: lang, 
            content: content,
            relation: relation,
            project: relation === 'project' ? relationItem : null,
            formation: relation === 'tutorial' ? relationItem : null
        }))
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

    const handleRelationChange = (e) => {
        setRelation(e.target.value)
        form.resetFields(['relationItem'])
    }

    const onChangeRelationItem = (value, option) => {
        setRelationItem(option.key)
    }

    const handleRelationItemsChange = () => {
        let items = []
        if (relation === 'tutorial') {
            tutorials.map(
                tuto => items.push(
                    <Option key={tuto._id} value={tuto.title} >{tuto.title}</Option>
                )
            )
        }
        if (relation === 'project') {
            projects.map(
                project => items.push(
                    <Option key={project._id} value={project.title} >{project.title}</Option>
                )
            )
        }
        setRelationItems([items])
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
                    onChange={e => handleRelationChange(e)}

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
                    onChange={(value, option) => onChangeRelationItem(value, option)}
                >
                    {[...relationItems]}
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


