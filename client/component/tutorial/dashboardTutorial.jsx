import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import TutorialTable from './tutorialTable'
import FormationForm from './formationForm'
import FormationFormUpdate from './formationFormUpdate'
import { readAllTutorials } from '../../action/tutorial'
import { ModalTutorialFormProvider } from '../../helper/modalFormProvider'

const { Title } = Typography

const DashboardTutorial = () => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const responseStatus = useSelector(state => state.response.status)
    const tutorials = useSelector(state => state.tutorials.tutorials)

    const [modalVisibilityUpdate, setModalVisibilityUpdate] = useState(false)
    const [modalVisibilityCreate, setModalVisibilityCreate] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        dispatch(readAllTutorials())
    }, [])

    useEffect(() => {
        if (itemToUpdate !== '') {
            let initialData = tutorials.filter(tutorial => tutorial._id === itemToUpdate)
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
            dispatch(readAllTutorials())
        }
    }, [responseStatus])

    const title = <Title level={4}>{` ${intl.formatMessage({ id: 'tutorial' })} Form`}</Title>
    const componentCreate = <FormationForm />
    const componentUpdate = <FormationFormUpdate itemToUpdate={itemToUpdate} initialValues={initialValues} />

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
        <ModalTutorialFormProvider.Provider value={{
            setVisibility: setModalVisibilityUpdate,
            setItemToUpdate: setItemToUpdate
        }}>
            <Row>
                <Row >
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <Title level={2}><FormattedMessage id='tutorial' /></Title>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24}>
                        <Button type="primary" onClick={() => handleOnClick()} icon={<PlusOutlined />} size='middle'>
                            {` ${intl.formatMessage({ id: 'createtutorial' })}`}
                        </Button>
                    </Col>
                    {renderModalCreate()}
                    {renderModalUpdate()}
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <TutorialTable />
                    </Col>
                </Row>
            </Row>
        </ModalTutorialFormProvider.Provider>
    )
}

export default DashboardTutorial
