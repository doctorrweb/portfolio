import React from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
//import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import Language from '../component/language'
import Login from '../component/loginBtn'
import ModalLogin from '../component/modalLogin'

//import { useSelector } from 'react-redux'


const NavBar = () => {

    //const lang = useSelector(state => state.locale.lang)

    

    return (
        <Row type="flex" justify="space-between" >
            <Col md={6} sm={20} xs={20} style={{ textAlign: 'left' }}>
                <MenuOutlined style={{ fontSize: '30px', fontWeight: 'bold' }} />
            </Col>
            <Col
                md={9}
                sm={0}
                xs={0}
                style={{ textAlign: 'center' }}
                className="logo"
            >
                <Link to="/">
                    <img src="/img/logo_drweb_color.png" />
                </Link>
            </Col>
            <Language />
            <Login />
            <ModalLogin />
        </Row>
    )
}

export default NavBar