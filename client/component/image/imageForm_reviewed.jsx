import React, { useState, useEffect } from 'react'
import {
    Form,
    notification,
    Button,
    Upload
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons'
import { resetResponse, resetError } from '../../action'
import { addImage } from '../../action/image'

const { Dragger } = Upload

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

const ImageForm = () => {
    const [form] = Form.useForm()
    const [uploading, setUploading] = useState(false)
    const intl = useIntl()
    const dispatch = useDispatch()

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        requestNotification()
        if (responseStatus || errorStatus) {
            setUploading(false)
        }
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

    const onFinish = values => {
        console.log('values: ', values)
        let imageFormData = new FormData()
        const images = values.images.fileList
        images.map(image => {
            imageFormData.append('images', image.originFileObj)
        })
        dispatch(addImage(imageFormData))
        console.log('Received values of form: ', imageFormData)
        form.resetFields()
    }

    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
        form.resetFields()
    }

    const onChange = (info) => {
        console.log('info', info)
        //setCustomFileList([...CustomFileList, ...info.fileList])
        const { status } = info.file
        if (status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (status === 'done') {
            console.log(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
            console.log(`${info.file.name} file upload failed.`)
        }
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="image"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            <Form.Item
                name="images"
                label={<FormattedMessage id='image' />}
            >
                <Dragger
                    multiple
                    accept='.jpg, .jpeg, .png, .gif'
                    showUploadList
                    onChange={e => onChange(e)}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button
                    block
                    type="primary"
                    loading={uploading}
                    htmlType="submit"
                    onClick={() => setUploading(true)}
                >
                    <FormattedMessage id='add' />
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ImageForm


