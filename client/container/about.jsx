import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Col, Row, Typography, Breadcrumb } from 'antd'

const { Content } = Layout
const { Title } = Typography

const About = () => {
    return (
        <Layout
            style={{
                margin: '10em 15em 5em',
            }}
        >
            <Content>
                <Row
                    justify="space-between"
                    style={{ margin: '10px 16px 0' }}
                    align="middle"
                >
                    <Col lg={14} md={14} sm={24} xs={24}>
                        <Title style={{ color: '#707070' }}>ABOUT ME</Title>
                        <p style={{ textAlign: 'justify' }}>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur.
                        </p>
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to='/'>Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>About me</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row justify="space-between" style={{ marginTop: 50 }}>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <img src="https://www.webdesignertrends.com/wp-content/uploads/2020/04/00_preview.__large_preview.jpg" />
                    </Col>
                    <Col lg={12} md={14} sm={24} xs={24}>
                        <Title level={3} style={{ color: '#FF9900' }}>
                            I’m doctorrweb
                        </Title>
                        <p style={{ textAlign: 'justify' }}>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Neque porro quisquam est,
                            qui dolorem ipsum quia dolor sit amet, consectetur,
                            adipisci velit, sed quia non numquam eius modi
                            tempora incidunt ut labore et dolore magnam aliquam
                            quaerat voluptatem. Ut enim ad minima veniam, quis
                            nostrum exercitationem ullam corporis suscipit
                            laboriosam, nisi ut aliquid ex ea commodi
                            consequatur? Quis autem vel eum iure reprehenderit
                            qui in ea voluptate velit esse quam nihil molestiae
                            consequatur, vel illum qui dolorem eum fugiat quo
                            voluptas nulla pariatur?
                        </p>
                    </Col>
                </Row>
                <Row justify="center" style={{ marginTop: 50 }}>
                    <Col lg={18} md={18} sm={24} xs={24}>
                        <blockquote>
                            consequatur, vel illum qui dolorem eum fugiat quo
                            voluptas nulla pariatur? iste natus error sit
                            voluptatem accusantium doloremque laudantium, ed
                            quia consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Neque porro quisquam est,
                            qui dolorem ipsum quia dolor sit amet, consectetur,
                        </blockquote>
                    </Col>
                </Row>

                <Row justify="space-between" align="middle">
                    <Col lg={8} md={8} sm={8} xs={24} style={{ padding: 20 }}>
                        <Title level={3} style={{ color: '#FF9900' }}>
                            My philosophy
                        </Title>
                        <p style={{ textAlign: 'justify' }}>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt.
                        </p>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={24} style={{ padding: 20 }}>
                        <Title level={3} style={{ color: '#FF9900' }}>
                            My Vision
                        </Title>
                        <p style={{ textAlign: 'justify' }}>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt.
                        </p>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={24} style={{ padding: 20 }}>
                        <Title level={3} style={{ color: '#FF9900' }}>
                            My Stack
                        </Title>
                        <p style={{ textAlign: 'justify' }}>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt.
                        </p>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default About