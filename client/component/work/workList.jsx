import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    Layout,
    Col,
    Row,
    Typography,
    Breadcrumb,
    Button,
    Divider,
} from 'antd'
import {
    HighlightOutlined,
    ReadOutlined,
    GlobalOutlined,
    MobileOutlined,
    LaptopOutlined,
    TableOutlined,
} from '@ant-design/icons'
import { readAllProjects } from '../../action/project'
import WorkTable from './workTable'

const { Content } = Layout
const { Title } = Typography

const menuLinkStyle = {
    fontSize: '1.2em',
    lineHeight: '1em',
    fontWeight: 'bold',
    margin: '.5em',
    textTransform: 'uppercase',
}

const activeMenuLinkStyle = {
    fontSize: '1.2em',
    lineHeight: '1em',
    fontWeight: 'bold',
    margin: '.5em',
    textTransform: 'uppercase',
    color: '#FF9900',
}

const WorkList = () => {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.projects.projects)

    const [activeTab, setActiveTab] = useState('all')
    const [projectlist, setProjectList] = useState([])

    useEffect(() => {
        dispatch(readAllProjects())
    }, [])

    useEffect(() => {
        const newArray = projects.filter(
            (project) => project.category === activeTab
        )
        setProjectList(newArray)
    }, [activeTab])

    return (
        <Content >
            {/* <Row justify="space-between" style={{ margin: '10px 16px 0' }}> */}
            <Row 
                justify="space-between" 
            >
                <Col lg={14} md={14} sm={24} xs={24}>
                    <Title style={{ color: '#707070' }}>WORK</Title>
                </Col>
                <Col lg={6} md={6} sm={24} xs={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Work</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row justify="space-around">
                <Col
                >
                    <Button
                        type="link"
                        style={
                            activeTab === 'all'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<TableOutlined />}
                        onClick={() => setActiveTab('all')}
                    >
                        All
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'graphic'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<HighlightOutlined />}
                        onClick={() => setActiveTab('graphic')}
                    >
                        Graphic
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'edition'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<ReadOutlined />}
                        onClick={() => setActiveTab('edition')}
                    >
                        Edition
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'web'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<GlobalOutlined />}
                        onClick={() => setActiveTab('web')}
                    >
                        Web
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'mobile'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<MobileOutlined />}
                        onClick={() => setActiveTab('mobile')}
                    >
                        Mobile
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'desktop'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<LaptopOutlined />}
                        onClick={() => setActiveTab('desktop')}
                    >
                        Desktop
                    </Button>
                </Col>
            </Row>
            <Divider type="horizontal" />
            <Row>
                <WorkTable
                    data={activeTab === 'all' ? projects : projectlist}
                />
            </Row>
        </Content>
    )
}

export default WorkList
