import React, { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Switch,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { UploadOutlined } from '@ant-design/icons'
import { resetResponse, resetError, resetRequestType } from '../../action'
import { createProject } from '../../action/project'
import { readAllClients } from '../../action/client'


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

const ProjectForm = () => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const intl = useIntl()
    const dispatch = useDispatch()

    const [checkStatus, setChekStatus] = useState(false)
    const [startDate, setStartDate] = useState(moment())
    const [endDate, setEndDate] = useState(moment())

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const clients = useSelector(state => state.clients.clients)
    const requestType = useSelector(state => state.requestType.status)

    // To disable submit button at the beginning.
    useEffect(() => {
        dispatch(readAllClients())
        forceUpdate({})
    }, [])

    useEffect(() => {
        if (checkStatus === true) {
            form.resetFields(['enddate'])
        }
    },[checkStatus])
    /*
   
    */
    
    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'create-project') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t create this project'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'create-project') {
            notification['success']({
                message: 'Project created Successfully',
                description: 'Click on \'details\' to see the new project'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const startDateHandler = (value) => {
        setStartDate(value)
    }

    const endDateHandler = (value, dateString) => {
        console.log('Selected Time end Date: ', value)
        console.log('Formatted Selected Time: ', dateString)
        setEndDate(value)
    }

    const checkStatusHandler = () => {
        // setEndDate(null)
        setChekStatus(!checkStatus)
        
    } 

    const onFinish = ({ title, client, category, Link }) => {

        dispatch(
            createProject({
                title,
                client,
                category,
                Link,
                startDate: startDate.toDate(),
                endDate: endDate.toDate() 
            })
        )
        form.resetFields()
    }


    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
        // setRangePickerPeriod([])
        form.resetFields()
    }
    

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="project"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                        message: 'Please input your surname!',
                        whitespace: true
                    }
                ]}
            >
                <Input />
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
                    <Option value="graphic">
                        graphic
                    </Option>
                    <Option value="edition">
                        edition
                    </Option>
                    <Option value="web">
                        web
                    </Option>
                    <Option value="mobile">
                        mobile
                    </Option>
                    <Option value="desktop">
                        desktop
                    </Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="client"
                label={
                    <span>
                        <FormattedMessage id="client" />
                    </span>
                }
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Select
                    allowClear
                    showSearch
                >
                    {
                        clients.map(
                            client => <Option key={client._id} value={client._id}>
                                {client.name}
                            </Option>
                        )
                    }
                </Select>
            </Form.Item>

            <Form.Item
                name="link"
                label='Project Link'
            >
                <Input allowClear />
            </Form.Item>

            <Form.Item label="Period" style={{ marginBottom: 0 }}>
                <Form.Item
                    // label="Start Date"
                    name="startdate"
                    width={200}
                    style={{ display: 'inline-block', width: 'calc(30% - 12px)' }}
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <DatePicker
                        format='DD-MM-YYYY'
                        placeholder={`${intl.formatMessage({ id: 'startdate' })}`}
                        onChange={(date, dateString) => startDateHandler(date, dateString)}
                    />
                </Form.Item>
                <span
                    style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                >
                    -
                </span>
                <Form.Item
                    // label="End Date"
                    name="enddate"
                    style={{ display: 'inline-block', width: 'calc(30% - 12px)' }}
                >
                    <DatePicker 
                        format='DD-MM-YYYY' 
                        disabled={checkStatus}
                        placeholder={`${intl.formatMessage({ id: 'enddate' })}`}
                        onChange={(date, dateString) => endDateHandler(date, dateString)}
                    />
                </Form.Item>
                <span
                    style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                >
                    -
                </span>
                <Form.Item 
                    style={{ display: 'inline-block', width: 'calc(30% - 12px)' }}
                >
                    <Form.Item
                        label={` ${intl.formatMessage({ id: 'still-in-progress' })}`}
                        name="pendingCheck"
                    >
                        <Switch
                            style={{ marginLeft: '1em' }}
                            checked={checkStatus}
                            onChange={() => checkStatusHandler(!checkStatus)}
                        />
                    </Form.Item>
                </Form.Item>
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
                            !form.isFieldsTouched([
                                'title',
                                'client',
                                'startDate'
                            ]) ||
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

export default ProjectForm


