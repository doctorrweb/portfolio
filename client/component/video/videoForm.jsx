import React, { useState, useEffect } from 'react'
import {
    Form,
    Button,
    Upload,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons'
import { resetResponse, resetError } from '../../action'
import { addVideo } from '../../action/video'


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

const VideoForm = () => {
    const [form] = Form.useForm()
    const [CustomFileList, setCustomFileList] = useState([])
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
        console.log('values: ', values.videos.fileList)
        let videoFormData = new FormData()
        const videos = values.videos.fileList
        videos.map(video => {
            videoFormData.append('videos', video.originFileObj)
        })
        dispatch(addVideo(videoFormData))
        console.log('Received values of form: ', videoFormData)
        form.resetFields()
    }

    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
        form.resetFields()
    }

    const beforeUpload = (file, fileList) => {
        console.log('file', file)
        console.log('fileList', fileList)
        setCustomFileList([...CustomFileList, ...fileList])
        return false
    }

    const onRemove = file => {
        const newCustomFileList = CustomFileList.filter(item => item !== file)
        //console.log('CustomFileList', CustomFileList)
        //console.log('newCustomFileList', newCustomFileList)
        setCustomFileList(newCustomFileList)
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
            name="videos"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="videos"
                label='Video'
            >
                <Dragger
                    fileList={CustomFileList}
                    multiple
                    onRemove={file => onRemove(file)}
                    accept='.mp4'
                    onChange={e => onChange(e)}
                    beforeUpload={(file, fileList) => beforeUpload(file, fileList)}
                    showUploadList
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
                    disabled={CustomFileList.length === 0}
                    onClick={() => setUploading(true)}
                >
                    <FormattedMessage id='add' />
                </Button>
            </Form.Item>
        </Form>
    )
}

export default VideoForm


