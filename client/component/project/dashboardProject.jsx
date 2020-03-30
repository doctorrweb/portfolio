import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import ProjectTable from './projectTable'
import ProjectForm from './projectForm'
import ProjectFormUpdate from './projectFormUpdate'
import { readAllProjects } from '../../action/project'
import { ModalProjectFormProvider } from '../../helper/modalFormProvider'

const { Title } = Typography


const DashboardProject = () => {

    const intl = useIntl()
    const dispatch = useDispatch()


    const responseStatus = useSelector(state => state.response.status)
    const projects = useSelector(state => state.projects.projects)

    const [modalVisibilityUpdate, setModalVisibilityUpdate] = useState(false)
    const [modalVisibilityCreate, setModalVisibilityCreate] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        dispatch(readAllProjects())
    }, [])
    useEffect(() => {
        if (itemToUpdate !== '') {
            let initialData = projects.filter(project => project._id === itemToUpdate)
            setInitialValues({ ...initialData[0] })
        }
    }, [itemToUpdate])

    useEffect(() => {
        renderModalUpdate()
    }, [modalVisibilityUpdate])

    useEffect(() => {
        if (responseStatus >= 200) {
            setModalVisibilityUpdate(false)
            setModalVisibilityCreate(false)
            dispatch(readAllProjects())
        }
    }, [responseStatus])

    const title = <Title level={4}>Project Form</Title>
    const componentUpdate = <ProjectFormUpdate itemToUpdate={itemToUpdate} initialValues={initialValues} />
    const componentCreate = <ProjectForm />

    const renderModalUpdate = () => {
        return useCustomModal(title, componentUpdate, modalVisibilityUpdate, setModalVisibilityUpdate)
    }

    const renderModalCreate = () => {
        return useCustomModal(title, componentCreate, modalVisibilityCreate, setModalVisibilityCreate)
    }

    const handleOnClick = () => {
        setModalVisibilityCreate(!modalVisibilityUpdate)
    }

    return (
        <ModalProjectFormProvider.Provider value={{
            setVisibility: setModalVisibilityUpdate,
            setItemToUpdate: setItemToUpdate
        }}>
            <Row>
                <Row >
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <Title level={2}><FormattedMessage id='project' /></Title>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24}>
                        <Button type="primary" onClick={() => handleOnClick()} icon={<PlusOutlined />} size='middle'>
                            {` ${intl.formatMessage({ id: 'createproject' })}`}
                        </Button>
                    </Col>
                    {renderModalCreate()}
                    {renderModalUpdate()}
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <ProjectTable />
                    </Col>
                </Row>
            </Row>
        </ModalProjectFormProvider.Provider>
    )
}

export default DashboardProject
