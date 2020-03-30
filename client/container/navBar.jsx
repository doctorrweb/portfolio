import React from 'react'
import { Row, Col } from 'antd'
import MenuIcon from '../component/menuIcon'
import Logo from '../component/logo'

const NavBar = () => {

    
    
    return (
        <Row type="flex" justify="space-between">
            <Col
                md={3}
                sm={3}
                xs={9}
                style={{ textAlign: 'left' }}
                className="logo"
            >
                <Logo />
            </Col>
            <Col md={3} sm={3} xs={9} style={{ textAlign: 'right' }}>
                <MenuIcon  />
            </Col>
        </Row>
    )
}

export default NavBar