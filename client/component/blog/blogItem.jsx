import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { LinkOutlined, ClockCircleOutlined } from '@ant-design/icons'
import {
    Breadcrumb,
    Layout,
    Row,
    Col,
    Divider,
    Typography,
} from 'antd'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const BlogItem = () => {
    const { id } = useParams()

    const posts = useSelector((state) => state.posts.posts)
    const [post, setPost] = useState({})

    useEffect(() => {
        setPost(posts.find((item) => item._id === id))
    }, [])

    return (
        <Content>
            <Row justify="space-between" style={{ margin: '10px 16px 0' }}>
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
                        src={post.image ? post.image.path : null}
                        width={800}
                        height={250}
                        style={{ objectFit: 'cover', marginTop: 10 }}
                    />
                    <Divider type="horizontal" />
                    <div>
                        <Text>Client</Text>:{' '}
                        <Text strong>
                            {post.client && post.client.name}
                        </Text>
                    </div>
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
                        {post ? <div dangerouslySetInnerHTML={{
                            __html: post.content
                        }} /> : null}
                    </Paragraph>
                </Col>
            </Row>
            <Row></Row>
        </Content>
    )
}

export default BlogItem
