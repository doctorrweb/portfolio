import React from 'react'
import { Layout, Row } from 'antd'

const { Content } = Layout

const bgImgUri = 'img/background-code.png'


const Home = () => {
    return (
        <Content
            className='content'
            style={{
                minHeight: '100%',
                backgroundImage: `url(${bgImgUri})`,
                overflow: 'hidden'
            }}
        >
            <Row gutter={[8, 8]}>

            </Row>

        </Content>
    )
}

export default Home