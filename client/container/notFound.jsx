import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Result, Button, Layout, Typography } from 'antd'
import Typewriter from 'typewriter-effect'

const bgImgUri = 'img/background-code.png'

const { Content } = Layout
const { Title } = Typography

const NotFound = () => {

    const intl = useIntl()


    return (
        <Layout
            style={{
                margin: '10%',
                height: '100%',
                overflow: 'hidden',
                backgroundImage: `url(${bgImgUri})`,
                backgroundSize: 'cover'
            }}
        >
            <Content
                style={{
                    marginRight: '2%',
                }}
            >
                <Result
                    status="error"
                    title={
                        <Title>
                            404:
                            <Typewriter
                                options={{
                                    strings: [`${intl.formatMessage({ id: 'page-not-found' })}`],
                                    autoStart: true,
                                    loop: true,
                                    delay: 150,
                                    deleteSpeed: 1500
                                }}
                            />
                        </Title>
                    }
                    subTitle={<Title level={4}>{intl.formatMessage({ id: '404' })}</Title>}
                    extra={<Button type="danger"><FormattedMessage id="back-home" /></Button>}
                />
            </Content>
        </Layout>
    )
}

export default NotFound