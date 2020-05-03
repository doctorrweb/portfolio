import React, { Fragment, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FileTextOutlined, YoutubeFilled, YoutubeOutlined } from '@ant-design/icons'
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
} from 'antd'
import moment from 'moment'
import ReactPlayer from 'react-player'
import { readOneTutorial } from '../../action/tutorial'

const { Content } = Layout
const { TabPane } = Tabs
const { Title, Paragraph, Text } = Typography

const TutoItem = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const tutorial = useSelector((state) => state.tutorials.tutorials[0])


    useEffect(() => {
        dispatch(readOneTutorial(id))
    }, [])


    const renderContent = () => {
        return (
            <Fragment>
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
                        <Tabs defaultActiveKey="1" tabPosition="left">
                            <TabPane
                                tab={
                                    <span>
                                        <YoutubeOutlined />
                                        Videos
                                    </span>
                                }
                                key="1"
                            >
                                <List
                                    grid={{
                                        gutter: 16,
                                        column: 1,
                                    }}
                                    dataSource={tutorial.videos}
                                    size="small"
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page)
                                        },
                                        pageSize: 3,
                                        size: 'small',
                                    }}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <ReactPlayer
                                                // style={{ marginRight: 400 }}
                                                url={item.path}
                                                width={260}
                                                height={180}
                                                playing={false}
                                                playIcon={<YoutubeFilled />}
                                                controls
                                            />
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <FileTextOutlined />
                                        Posts
                                    </span>
                                }
                                key="2"
                            >
                                <List
                                    grid={{
                                        gutter: 16,
                                        column: 1,
                                    }}
                                    dataSource={tutorial.posts}
                                    size="small"
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page)
                                        },
                                        pageSize: 4,
                                        size: 'small',
                                    }}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Card
                                                hoverable
                                                bordered={true}
                                                size="small"
                                                onClick={() =>
                                                    history.push(
                                                        `/tutorial/${item._id}`
                                                    )
                                                }
                                            >
                                                <h3
                                                    style={{ color: '#FF9900' }}
                                                >
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
                        </Tabs>
                    </Col>
                </Row>
                <Row></Row>
            </Fragment>
        )
    }

    return (
        <Content>
            { tutorial && renderContent() }
        </Content>
    )
}

export default TutoItem
