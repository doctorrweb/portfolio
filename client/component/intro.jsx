import React from 'react'
import { Row, Col } from 'antd'
import IntroMessage from './introMessage'

const bgCodeEditor = 'img/code-editor-bg.png'

const Intro = () => {
    return (
        <Row justify="center">
            <Col
                style={{
                    minWidth: '550px',
                    minHeight: '400px',
                    marginTop: 200,
                    paddingTop: 18,
                    borderRadius: 25,
                    backgroundSize: 'contain',
                    backgroundImage: `url(${bgCodeEditor})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundClip: 'border-box'
                }}
                lg={{ span: 12, push: 2}} 
                md={{ span: 12, push: 1}} 
                sm={{ span: 24}}
                xs={24}
            >
                <IntroMessage />
            </Col>
        </Row>
    )
}

export default Intro