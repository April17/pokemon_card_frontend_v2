import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Menu, Header, Dropdown, Image } from 'semantic-ui-react'
import { logInFromState } from '../redux/adapters/utilityAdapters' 
import  '../assets/style/NavBar.css'
import logo from '../assets/Logo/PokeBallicon.svg'
import Cart from './Cart'
import Search from './Search'



const NavBar = (props) => {
    

    const handleClick = (event) => {
        if (event.target.attributes.name.nodeValue === "login"){
            props.logInFromState("logIn")
        }
        props.history.push(`/${event.target.attributes.name.nodeValue}`)
    }

    const handleLogout = () => {        
        if(localStorage.token){
            const rememberMe = localStorage.rememberMe
            const userId = localStorage.userId
            const cart = localStorage.cart
            localStorage.clear()
            localStorage.rememberMe = rememberMe
            localStorage.userId = userId
            localStorage.cart = cart
            props.history.push('/')
        }
    }

    return (
        <Menu inverted className="navbar" size='small' borderless>
            <Menu.Menu position='left'>
                <Menu.Item >
                    <Image src={logo} onClick={handleClick} name="" size='mini' />
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h1' onClick={handleClick} name="">Pokéball</Header>
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h1' ></Header>
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h3'> Shop </Header>
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h1' ></Header>
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h1' ></Header>
                </Menu.Item>
            </Menu.Menu>
                <Search/>
            <Menu.Menu position='right'>
                {
                    localStorage.token? 
                    (
                        <Dropdown text='Account' pointing className='link item'>
                            <Dropdown.Menu className="frostglass">
                                <Dropdown.Item name="profile" onClick={handleClick}><Header inverted name="profile" as='h5'>Profile</Header></Dropdown.Item>
                                <Dropdown.Item><Header inverted as='h5'>Account Setting</Header></Dropdown.Item>
                                <Dropdown.Item><Header inverted as='h5'>Deck List</Header></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}><Header inverted as='h5'>Logout</Header></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) :
                    (
                        <Menu.Item active={false}>
                            <Button onClick={handleClick} name="login" inverted >Login</Button>
                        </Menu.Item>
                    )
                }
                <Cart/>
            </Menu.Menu>
            <Menu.Item active={false}></Menu.Item>
        </Menu>
    )
}

const mapStateToProps = state => {
    return {
      props: state
    }
  }
  
  const mapDispatchToProps = {
    logInFromState
  }


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))