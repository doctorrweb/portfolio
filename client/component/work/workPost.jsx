import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LinkOutlined, ClockCircleOutlined, StepBackwardOutlined } from '@ant-design/icons'
import {
    Breadcrumb,
    Layout,
    Row,
    Col,
    Divider,
    Timeline,
    Typography,
    Tag,
    Button,
} from 'antd'
import moment from 'moment'
import { readPost } from '../../action/post'


const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const WorkPost = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id, postId } = useParams()

    const projects = useSelector((state) => state.projects.projects)

    const posts = useSelector(state => state.posts.posts)
    const [project, setProject] = useState({})
    const [newPostId, setNewPostId] = useState(postId)

    useEffect(() => {
        dispatch(readPost(postId))
        setProject(projects.find((proj) => proj._id === id))

        console.log('project', project)
        console.log('postId', postId)
        console.log('posts', posts)
    }, [])
    
    useEffect(() => {
        dispatch(readPost(newPostId))
        // setPost(project.posts.find(item => item._id === postId))
    }, [newPostId])

    const renderDate = (value) => {
        if (value !== null) {
            return <Tag color="orange">{moment(value).format('LL')}</Tag>
        }

        if (value === null) {
            return <Tag color="magenta">To determine</Tag>
        }
    }

    return (
        <Content>
            {/* <Row justify="space-between" style={{ margin: '10px 16px 0' }}> */}
            <Row justify="space-between" style={{ margin: '1em 1.5em 0' }}>
                <Col lg={6} md={6} sm={24} xs={24}>
                    <Title style={{ color: '#707070' }}>WORK</Title>
                </Col>
                <Col lg={18} md={18} sm={24} xs={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/work">Work</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={`/work/${id}`}>{project.title}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {posts[0] && posts[0].title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col lg={16} md={16} sm={24} xs={24}>
                    <Title level={2} style={{ color: '#707070' }}> Project: {project.title}</Title>
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
                    <Divider orientation='right'>
                        <Button
                            size="small"
                            type='primary'
                            icon={<StepBackwardOutlined />}
                            onClick={() => history.goBack()}
                        >
                                Back to project
                        </Button>
                    </Divider>
                    <Divider>Action</Divider>
                    <Title level={1}>
                        {posts[0] && posts[0].title}{' '}
                    </Title>
                    <Tag color="orange">
                        {posts[0] &&
                                moment(posts[0].creationDate).format('LL')}
                    </Tag>
                    <img
                        src={
                            posts[0] && posts[0].image
                                ? posts[0].image.path
                                : null
                        }
                        width={800}
                        height={250}
                        style={{ objectFit: 'cover', marginTop: 30 }}
                    />
                    <Paragraph
                        style={{
                            paddingTop: 10,
                            paddingRight: 10,
                            textAlign: 'justify',
                        }}
                    >
                        {posts[0] ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: posts[0].content,
                                }}
                            />
                        ) : null}
                    </Paragraph>
                </Col>
                <Col lg={8} md={8} sm={24} xs={24}>
                    <Title level={3} style={{ textAlign: 'center' }}>
                        Project Timeline
                    </Title>
                    <Divider type="horizontal" />
                    <Timeline mode="left">
                        {project.posts &&
                            project.posts.map((post) => (
                                <Timeline.Item
                                    key={post._id}
                                    color={
                                        post._id === newPostId ? 'gray' : 'orange'
                                    }
                                    label={
                                        <Tag
                                            icon={<ClockCircleOutlined />}
                                            color={
                                                post._id === newPostId ? 'default'
                                                    : 'orange'
                                            }
                                        >
                                            {moment(post.creationDate).format(
                                                'LL'
                                            )}
                                        </Tag>
                                    }
                                >
                                    <span 
                                        style={
                                            post._id === newPostId ? { color: '#707070' }
                                                : null
                                        }
                                    >
                                        {post.title}
                                    </span>
                                    {
                                        post._id !== newPostId &&
                                        <Button
                                            type="link"
                                            onClick={() => setNewPostId(post._id)}
                                        >
                                            {' ...'}
                                        </Button>
                                    }
                                </Timeline.Item>
                            ))}
                    </Timeline>
                </Col>
            </Row>
            <Row></Row>
        </Content>
    )
}

export default WorkPost
