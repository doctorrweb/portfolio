import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Form,
    Input,
    InputNumber,
    Modal,
    Button,
    Avatar,
    Typography,
    Select
} from 'antd'
import { SmileOutlined, UserOutlined } from '@ant-design/icons'
import { readAllImages } from '../action/image'
import ArsArsenal from 'ars-arsenal'
import ImagePicker from 'react-image-picker'
// import 'react-image-picker/dist/index.css'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
}

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef()
    useEffect(() => {
        prevVisibleRef.current = visible
    }, [visible])
    const prevVisible = prevVisibleRef.current
    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields()
        }
    }, [visible])
}

const ModalForm = ({ visible, onCancel }) => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const dispatch = useDispatch()

    const images = useSelector(state => state.images.images)

    const [pickedImage, setPickedImage] = useState({})

    useResetFormOnCloseModal({
        form,
        visible,
    })

    // To disable submit button at the beginning.
    useEffect(() => {
        dispatch(readAllImages())
        forceUpdate({})
    }, [])

    const onOk = () => {
        form.submit()
    }

    const onPick = (pickedImage) => {
        setPickedImage(pickedImage)

        //images.path.slice(21, 38)
    }

    const renderImages = () => {
        images.map((image, i) => ({ src: image.path, value: i }))
    }

    let arsOptions = {
        autoComplete: true, // Show or hide autocomplete results

        resource: 'photo', // the noun used for selection, i.e. "Pick a photo"

        // Configure the root element's HTML attributes. default = {}
        rootAttributes: {
            className: 'my-custom-class another-custom-class',
            'data-test': 'my-integration-selector-helper',
        },

        // The base URL for API interaction
        url: 'http://localhost:3000',

        // How to display the items. Can be "table" or "gallery"
        mode: 'gallery',

        // What table columns to display, and in what order
        columns: ['id', 'name', 'caption', 'attribution', 'preview'],

        multiselect: true,

        listUrl: function (url) {
        // Used to build the URL that fetches lists of records.
            return url
        },

        listQuery: function ({ search, page, sort }) {
        // Use this function to rename query parameters before building
        // the listUrl URL
        //
        // Any data returned from this function will be stringified into
        // query parameters
            return { search, page, sort }
        },

        showUrl: function (url, id) {
        // Used to build the URL that fetches a single record
            return `${url}/${id}`
        },

        onError: function (response) {
        // format errors before they are sent as a "string" value
        // to the component
            return response.code + ': ' + response.message
        },

        onFetch: function (response) {
        // format the response, useful if you do not control the JSON
        // response from your endpoint
            return response.data
        },

        onChange: function (id) {
        // Whenever a new item is picked, this event is triggered
            console.log('The value was changed to %s', id)
        },

        request: function (url, callback) {
        // Behavior to configure networking. Return an XMLHTTPRequest
            return xhr(url, callback)
        },

        logger: function (level, message) {
        // Override this method to handle usage warnings and issues
        // ArsArsenal considers errors with API interaction. Useful
        // for monitoring.
            switch (level) {
            case 'warning':
                console.warn(message)
                break
            case 'error':
                console.error(message)
                break
            default:
                console.log(message)
                break
            }
        },
    }

    return (
        <Modal
            title="Basic Drawer"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical" name="userForm">
                <Form.Item>
                    <ImagePicker 
                        images={images.map((image, i) => ({ src: image.path, value: i }))}
                        onPick={onPick}
                    />
                    <ArsArsenal options={arsOptions} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="User Age"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const Demo = () => {
    const [visible, setVisible] = useState(false)

    const showUserModal = () => {
        setVisible(true)
    }

    const hideUserModal = () => {
        setVisible(false)
    }

    const onFinish = (values) => {
        console.log('Finish:', values)
    }

    return (
        <div>
            <Form.Provider
                onFormFinish={(name, { values, forms }) => {
                    if (name === 'userForm') {
                        const { basicForm } = forms
                        const users = basicForm.getFieldValue('users') || []
                        basicForm.setFieldsValue({
                            users: [...users, values],
                        })
                        setVisible(false)
                    }
                }}
            >
                <Form {...layout} name="basicForm" onFinish={onFinish}>
                    <Form.Item
                        label="User List"
                        shouldUpdate={(prevValues, curValues) =>
                            prevValues.users !== curValues.users
                        }
                    >
                        {({ getFieldValue }) => {
                            const users = getFieldValue('users') || []
                            return users.length ? (
                                <ul>
                                    {users.map((user, index) => (
                                        <li key={index} className="user">
                                            <Avatar icon={<UserOutlined />} />
                                            {user.name} - {user.age}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Typography.Text className="ant-form-text" type="secondary">
                  ( <SmileOutlined /> No user yet. )
                                </Typography.Text>
                            )
                        }}
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button htmlType="submit" type="primary">
              Submit
                        </Button>
                        <Button
                            htmlType="button"
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={showUserModal}
                        >
              Add User
                        </Button>
                    </Form.Item>
                </Form>

                <ModalForm visible={visible} onCancel={hideUserModal} />
            </Form.Provider>
        </div>
    )
}

export default Demo
