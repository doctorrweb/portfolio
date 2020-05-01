import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    LinkOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Row, Col, Divider, Timeline, Typography, Tag } from 'antd'
import moment from 'moment'


const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const WorkItem = () => {

    const { id } = useParams()

    const projects = useSelector(state => state.projects.projects)
    const [project, setProject] = useState({})
    
    useEffect(() => {
        setProject(projects.find(proj => proj._id === id))
    }, [])

    const renderDate = (value) => {
        if (value !== null) {
            return <Tag color='orange'>{moment(value).format('LL')}</Tag>
        }

        if (value === null) {
            return <Tag color="magenta">To determine</Tag>
        }
    }


    return (
        <Content>
            <Row justify="space-between" style={{ margin: '10px 16px 0' }}>
                <Col lg={14} md={14} sm={24} xs={24}>
                    <Title style={{ color: '#707070' }}>WORK</Title>
                </Col>
                <Col lg={6} md={6} sm={24} xs={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='/work'>Work</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {project.title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col lg={16} md={16} sm={24} xs={24}>
                    <Title>{project.title}</Title>
                    <img
                        src={project.image ? project.image.path : null}
                        width={800}
                        height={250}
                        style={{ objectFit: 'cover', marginTop: 10 }}
                    />
                    <Divider type="horizontal" />
                    <div>
                        <Text>Client</Text>:{' '}
                        <Text strong>
                            {project.client && project.client.name}
                        </Text>
                    </div>
                    <div>
                        <Text>
                            <ClockCircleOutlined /> Start Date
                        </Text>
                        : {renderDate(project.startDate)}
                        <Text>End Date</Text>: {renderDate(project.endDate)}
                    </div>
                    <div>
                        <Text>Category</Text>:{' '}
                        <Text strong>{project.category}</Text>
                    </div>
                    {project.link ? (
                        <div>
                            <Text>
                                <LinkOutlined /> Link
                            </Text>
                            :
                            <Text code>
                                {' '}
                                <a target="blank" href={project.link}>
                                    {project.link}
                                </a>
                            </Text>
                        </div>
                    ) : null}
                    <Paragraph
                        style={{
                            paddingTop: 10,
                            paddingRight: 10,
                            textAlign: 'justify',
                        }}
                    >
                        {project ? project.description : null}
                    </Paragraph>
                </Col>
                <Col lg={8} md={8} sm={24} xs={24}>
                    <Title level={4} style={{ textAlign: 'center' }}>
                        Project Timeline
                    </Title>
                    <Divider type="horizontal" />
                    <Timeline mode="left">
                        {project.posts &&
                            project.posts.map((post) => (
                                <Timeline.Item
                                    key={post._id}
                                    label={
                                        <Tag
                                            icon={<ClockCircleOutlined />}
                                            color="orange"
                                        >
                                            {moment(post.creationDate).format(
                                                'LL'
                                            )}
                                        </Tag>
                                    }
                                >
                                    {post.title}
                                    <Link 
                                        to={`/work/${id}/${post._id}`}
                                    >
                                        {' ...'}
                                    </Link>
                                </Timeline.Item>
                            ))}
                    </Timeline>
                </Col>
            </Row>
            <Row></Row>
        </Content>
    )
}


export default WorkItem
