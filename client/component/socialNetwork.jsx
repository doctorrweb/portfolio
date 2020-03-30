import React from 'react'
import { Button } from 'antd'
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'


const SocialNetwork = () => {
    return (
        <div style={{
            marginTop: '2em'
        }}>
            <a href='https://github.com/doctorrweb' target='_blank' rel="noopener noreferrer">
                <Button type='link' ghost icon={<GithubOutlined />} size='small'>
                    doctorrweb
                </Button>
            </a>

            <a href='https://www.linkedin.com/in/herbain-bognon/' target='_blank' rel="noopener noreferrer">
                <Button type='link' ghost icon={<LinkedinOutlined />} size='small'>
                    doctorrWeb
                </Button>
            </a>

            <a href='https://twitter.com/herbain_bognon'>
                <Button type='link' ghost icon={<TwitterOutlined />} size='small' target='_blank' rel="noopener noreferrer">
                    @herbain_bognon
                </Button>
            </a>

        </div>
    )
}


export default SocialNetwork