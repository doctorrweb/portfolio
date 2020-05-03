import React, { useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    LinkOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Row, Col, Divider, Timeline, Typography, Tag } from 'antd'
import moment from 'moment'
import { readOneProject } from '../../action/project'


const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const WorkItem = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const project = useSelector(state => state.projects.projects[0])
    
    useEffect(() => {
        dispatch(readOneProject(id))
        console.log('project', project)
    }, [])
    

    const renderDate = (value) => {
        if (value !== null) {
            return <Tag color='orange'>{moment(value).format('LL')}</Tag>
        }

        if (value === null) {
            return <Tag color="magenta">To determine</Tag>
        }
    }

    const renderContent = () => {
        return (
            <Fragment>
                <Row justify="space-between" style={{ margin: '2% 1.5em 0' }}>
                    <Col lg={14} md={14} sm={24} xs={24}>
                        <Title style={{ color: '#707070' }}>WORK</Title>
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/work">Work</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{project.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={16} md={24} sm={24} xs={24}>
                        <Title>{project.title}</Title>
                        <img
                            src={project.image.path}
                            width="90%"
                            height={250}
                            style={{ objectFit: 'cover', marginTop: 10 }}
                        />
                        <Divider type="horizontal" />
                        <div>
                            <Text>Client</Text>:{' '}
                            <Text strong>{project.client.name}</Text>
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
                        <Paragraph
                            style={{
                                paddingTop: 10,
                                paddingRight: 10,
                                textAlign: 'justify',
                            }}
                        >
                            {project.description}
                        </Paragraph>
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24}>
                        <Title level={4} style={{ textAlign: 'center' }}>
                            Project Timeline
                        </Title>
                        <Divider type="horizontal" />
                        <Timeline mode="left">
                            {project.posts.map((post) => (
                                <Timeline.Item
                                    key={post._id}
                                    label={
                                        <Tag
                                            icon={<ClockCircleOutlined />}
                                            color="orange"
                                        >
                                            {moment(
                                                post.creationDate
                                            ).format('LL')}
                                        </Tag>
                                    }
                                >
                                    {post.title}
                                    <Link to={`/work/${id}/${post._id}`}>
                                        {' ...'}
                                    </Link>
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </Col>
                </Row>
            </Fragment>
        )
    }


    return (
        <Content>
            { project && renderContent()}
        </Content>
    )
}


export default WorkItem
