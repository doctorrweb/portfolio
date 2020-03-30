import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import PostTable from './postTable'
import PostForm from './postForm'
import { readAllPosts } from '../../action/post'
import ModalPostFormProvider from '../../helper/modalPostFormProvider'

const { Title } = Typography

const DashboardPost = () => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const responseStatus = useSelector(state => state.response.status)
    const posts = useSelector(state => state.posts.posts)

    const [modalVisibility, setModalVisibility] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        if (itemToUpdate !== '') {
            let initialData = posts.filter(post => post._id === itemToUpdate)
            setInitialValues({...initialData[0]})
        }
    }, [itemToUpdate])
    
    useEffect(() => {
        dispatch(readAllPosts())
    }, [])

    useEffect(() => {
        renderModal()
    }, [modalVisibility])    
    
    useEffect(() => {
        if (responseStatus >= 200) {
            setModalVisibility(false)
            dispatch(readAllPosts())
        }
    }, [responseStatus])

    const title = <Title level={4}>Post Form</Title>
    const component = <PostForm itemToUpdate={itemToUpdate} initialValues={initialValues} />

    const renderModal = () => {
        return useCustomModal(title, component, modalVisibility, setModalVisibility)
    }

    const handleOnClick = () => {
        setModalVisibility(!modalVisibility)
        setItemToUpdate('')
    }

    return (
        <ModalPostFormProvider.Provider value={{
            setVisibility: setModalVisibility,
            setItemToUpdate: setItemToUpdate
        }}>
            <Row>
                <Row >
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <Title level={2}><FormattedMessage id='post' /></Title>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24}>
                        <Button type="primary" onClick={() => handleOnClick()} icon={<PlusOutlined />} size='middle'>
                            {` ${intl.formatMessage({ id: 'createpost' })}`}
                        </Button>
                    </Col>
                    {renderModal()}
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <PostTable />
                    </Col>
                </Row>
            </Row>
        </ModalPostFormProvider.Provider>
    )
}

export default DashboardPost