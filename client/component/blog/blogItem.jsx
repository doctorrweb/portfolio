import React, { useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { LinkOutlined, ClockCircleOutlined } from '@ant-design/icons'
import {
    Breadcrumb,
    Layout,
    Row,
    Col,
    Divider,
    Typography,
} from 'antd'
import { readPost } from '../../action/post'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const BlogItem = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const post = useSelector((state) => state.posts.posts[0])

    useEffect(() => {
        dispatch(readPost(id))
    }, [])

    const renderContent = () => {
        return (
            <Fragment>
                <Row justify="space-between" style={{ margin: '2% 1.5em 0' }}>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <Title style={{ color: '#707070' }}>BLOG</Title>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/blog">Blog</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Title>{post.title}</Title>
                        <img
                            src={post.image.path}
                            width="90%"
                            height={250}
                            style={{ objectFit: 'cover', marginTop: 10 }}
                        />
                        <Divider type="horizontal" />
                       
                        <div>
                            <Text>Category</Text>:{' '}
                            <Text strong>{post.category}</Text>
                        </div>
                        <Paragraph
                            style={{
                                paddingTop: 10,
                                paddingRight: 10,
                                textAlign: 'justify',
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />
                        </Paragraph>
                    </Col>
                </Row>
            </Fragment>
        )
    }

    return (
        <Content>
            { post && renderContent() }
        </Content>
    )
}

export default BlogItem
