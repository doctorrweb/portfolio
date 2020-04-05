import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Switch,
    notification,
    Radio
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { UploadOutlined } from '@ant-design/icons'
import { resetResponse, resetError, resetRequestType } from '../../action'
import { updateProject } from '../../action/project'
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

const ProjectFormUpdate = ({ itemToUpdate }) => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const intl = useIntl()
    const dispatch = useDispatch()

    const [checkStatus, setChekStatus] = useState(false)
    const [startDate, setStartDate] = useState(moment())
    const [endDate, setEndDate] = useState(moment())

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const requestType = useSelector(state => state.requestType.status)
    const projects = useSelector(state => state.projects.projects)
    const clients = useSelector(state => state.clients.clients)



    useEffect(() => {
        if (itemToUpdate === '') {
            form.resetFields()
        }
        if (itemToUpdate !== '') {
            let initialData = projects.filter(project => project._id === itemToUpdate)

            form.setFieldsValue({ 
                ...initialData[0],
                client: initialData[0].client,
                startdate: moment(initialData[0].startDate),
                enddate: initialData[0].endDate === null ? null : moment(initialData[0].endDate),
            })
            setChekStatus(initialData[0].endDate === null)
        }
    }, [itemToUpdate])

    // To disable submit button at the beginning.
    useEffect(() => {
        dispatch(readAllClients())
        forceUpdate({})
    }, [])

    useEffect(() => {
        if (checkStatus === true) {
            form.resetFields(['enddate'])
        }
    }, [checkStatus])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'update-project') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t update this project'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'update-project') {
            notification['success']({
                message: 'Project updated Successfully',
                description: 'Click on \'details\' to see the updated project'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const startDateHandler = (value) => {
        setStartDate(value)
    }

    const endDateHandler = (value) => {
        setEndDate(value)
    }

    const checkStatusHandler = () => {
        setChekStatus(!checkStatus)

    } 

    const onFinish = (values) => {
        dispatch(
            updateProject(itemToUpdate, {
                ...values,
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
                        Graphic
                    </Option>
                    <Option value="edition">
                        Edition
                    </Option>
                    <Option value="web">
                        Web
                    </Option>
                    <Option value="mobile">
                        Mobile
                    </Option>
                    <Option value="desktop">
                        Desktop
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
                label="Status"
                name="status"
            >
                <Radio.Group
                    buttonStyle="solid"
                    //onChange={e => setRelation(e.target.value)}
                >
                    <Radio.Button value="pending">Pending</Radio.Button>
                    <Radio.Button value="rejected">
                        Rejected
                    </Radio.Button>
                    <Radio.Button value="waiting">
                        Waiting
                    </Radio.Button>
                    <Radio.Button value="inprogress">
                        In Progress
                    </Radio.Button>
                    <Radio.Button value="completed">
                        Completed
                    </Radio.Button>
                </Radio.Group>
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
                                'subtitle',
                                'category',
                                'client'
                            ]) ||
                            form.getFieldsError().filter(({ errors }) => errors.length)
                                .length
                        }
                    >
                        <FormattedMessage id="update" />
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

ProjectFormUpdate.propTypes = {
    itemToUpdate: PropTypes.string,
}

export default ProjectFormUpdate


