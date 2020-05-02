import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FileTextOutlined, YoutubeOutlined } from '@ant-design/icons'
import {
    Breadcrumb,
    Layout,
    Row,
    Col,
    Divider,
    List,
    Card,
    Tabs,
    Typography,
    Tag,
} from 'antd'
import moment from 'moment'

const { Content } = Layout
const { TabPane } = Tabs
const { Title, Paragraph, Text } = Typography

const TutoItem = () => {
    const { id } = useParams()

    const tutorials = useSelector((state) => state.tutorials.tutorials)
    const [tutorial, setTutorial] = useState({})

    useEffect(() => {
        setTutorial(tutorials.find((tuto) => tuto._id === id))
        console.log('tutorials', tutorials)
    }, [])

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
            <Row justify="space-between" style={{ margin: '2% 1.5em 0' }}>
                <Col lg={14} md={14} sm={24} xs={24}>
                    <Title style={{ color: '#707070' }}>TUTORIAL</Title>
                </Col>
                <Col lg={6} md={6} sm={24} xs={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/tutorial">Tutorial</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{tutorial.title}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col lg={16} md={24} sm={24} xs={24}>
                    <Title>{tutorial.title}</Title>
                    {/* <img
                        src={tutorial.image ? tutorial.image.path : null}
                        width="90%"
                        height={250}
                        style={{ objectFit: 'cover', marginTop: 10 }}
                    /> */}
                    <Divider type="horizontal" />
                    <div>
                        <Text>Category</Text>:{' '}
                        <Text strong>{tutorial.category}</Text>
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
                                __html: tutorial ? tutorial.content : null,
                            }}
                        />
                    </Paragraph>
                </Col>
                <Col lg={8} md={24} sm={24} xs={24}>
                    <Title level={4} style={{ textAlign: 'center' }}>
                        Tutorial List
                    </Title>
                    <Divider type="horizontal" />
                    <Tabs defaultActiveKey="1" tabPosition="right">
                        <TabPane
                            tab={
                                <span>
                                    <FileTextOutlined />
                                    Posts
                                </span>
                            }
                            key="1"
                        >
                            <List
                                grid={{
                                    gutter: 16,
                                    column: 1
                                }}
                                dataSource={
                                    tutorial && tutorial.posts
                                }
                                size="small"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page)
                                    },
                                    pageSize: 20,
                                    size: 'small'
                                }}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card
                                            hoverable
                                            bordered={false}
                                            onClick={() =>
                                                history.push(
                                                    `/tutorial/${item._id}`
                                                )
                                            }
                                        >
                                            <h3 style={{ color: '#FF9900' }}>
                                                {item.title}
                                            </h3>
                                            <div>
                                                {`Published ${moment(
                                                    item.creationDate
                                                ).fromNow()}`}
                                            </div>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <YoutubeOutlined />
                                    Videos
                                </span>
                            }
                            key="2"
                        >
                            Tab 2
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <Row></Row>
        </Content>
    )
}

export default TutoItem
