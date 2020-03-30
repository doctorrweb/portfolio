import React from 'react'
import { Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showMainMenu, toggleBtn } from '../action'
import Logo from './logo'
import MenuContent from './menuContent'
import CustomFooter from '../container/customFooter'

const bgImgUri = 'img/menubg.gif'

const MainMenu = () => {

    const dispatch = useDispatch()
    const menuVisibility = useSelector(state => state.mainMenu.menuVisibility)

    const handleClose = () => {
        dispatch(showMainMenu(false))
        dispatch(toggleBtn(false))
    }

    return (
        <Drawer
            title={<Logo />}
            placement="bottom"
            headerStyle={{
                padding: 15,
                backgroundColor: 'rgba(0, 0, 0, .9)',
            }}
            style={{
                
            }}
            drawerStyle={{
                backgroundImage: `url(${bgImgUri})`
            }}
            bodyStyle={{
                backgroundColor: 'rgba(0, 0, 0, .9)'
            }}
            closable={true}
            onClose={() => handleClose()}
            visible={menuVisibility}
            height="100%"
            footer={<CustomFooter />}
            footerStyle={{
                backgroundColor: 'rgba(0, 0, 0, .9)',
            }}
        >
            <MenuContent />
        </Drawer>
    )
}

export default MainMenu
