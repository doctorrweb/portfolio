import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Transfer,
    Switch,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { UploadOutlined } from '@ant-design/icons'
import { resetResponse, resetError } from '../../action'
import { createProject } from '../../action/project'

const { Option } = Select
const { RangePicker } = DatePicker

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

const ProjectFormUpdate = ({ itemToUpdate, initialValues }) => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const intl = useIntl()
    const dispatch = useDispatch()

    const [checkStatus, setChekStatus] = useState(false)
    const [rangePickerPeriod, setRangePickerPeriod] = useState(moment())

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const lang = useSelector(state => state.locale.lang)
    const projects = useSelector(state => state.projects.projects)

    useEffect(() => {
        if (itemToUpdate === '') {
            form.resetFields()
        }
        if (itemToUpdate !== '') {
            let initialData = projects.filter(project => project._id === itemToUpdate)
            form.setFieldsValue({ ...initialData[0] })
        }
    })

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
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

    const rangeHandler = (value, dateString) => {
        console.log('Selected Time: ', value)
        console.log('Formatted Selected Time: ', dateString)
        setRangePickerPeriod(value)
    }

    /*
    const onFinish = ({ title, subtitle, cateory, period }) => {
        //console.log('Received values of form: ', values)
        dispatch(createProject({
            title,
            subtitle,
            cateory,
            startDate: period[0],
            endDate: period[1]
        }))
    }
    */

    const onFinish = ({ title, subtitle, category }) => {

        console.log('rangePickerPeriod[0]', rangePickerPeriod[0].toDate())
        console.log('rangePickerPeriod[1]', rangePickerPeriod[1].toDate())

        dispatch(
            createProject({
                title: { [lang]: title },
                subTitle: { [lang]: subtitle },
                category,
                client: '5e434649e18b8e45ed171cf4',
                startDate: rangePickerPeriod[0].toDate(),
                endDate: rangePickerPeriod[1].toDate()
            })
        )
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
                    <Option value="professional">
                        <FormattedMessage id="professional" />
                    </Option>
                    <Option value="personal">
                        <FormattedMessage id="personal" />
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
                    //placeholder="Select a option and change input text above"
                    allowClear
                    showSearch
                >
                    <Option value="professional">Client 1</Option>
                    <Option value="personal">Client 2</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Period"
                rules={[
                    {
                        required: true,
                        message: 'Please input the content !',
                        whitespace: true
                    }
                ]}
            >
                <RangePicker
                    name="period"
                    placeholder={[
                        `${intl.formatMessage({ id: 'startdate' })}`,
                        `${intl.formatMessage({ id: 'enddate' })}`
                    ]}
                    //format={}
                    disabled={checkStatus ? [false, true] : [false, false]}
                    allowEmpty={checkStatus ? [false, true] : [false, false]}
                    onChange={(date, dateString) => rangeHandler(date, dateString)}
                />
                <span style={{ marginLeft: '1em' }}>
                    <Switch
                        name="pendingCheck"
                        checked={checkStatus}
                        onChange={() => setChekStatus(!checkStatus)}
                    />
                    {` ${intl.formatMessage({ id: 'still-in-progress' })}`}
                </span>
            </Form.Item>

            <Form.Item
                name="posts"
                label={
                    <span>
                        <FormattedMessage id="post" />
                    </span>
                }
            >
                <Transfer />
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
    initialValues: PropTypes.object
}

export default ProjectFormUpdate


