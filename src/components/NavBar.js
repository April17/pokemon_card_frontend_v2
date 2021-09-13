import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Menu, Header, Dropdown, Image, Segment } from 'semantic-ui-react'
import { logInFromState } from '../redux/adapters/utilityAdapters' 
import  '../assets/style/NavBar.css'
import logo from '../assets/Logo/PokeBallicon.svg'



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
            localStorage.clear()
            localStorage.rememberMe = rememberMe
            localStorage.userId = userId
            props.history.push('/')
        }
    }

    return (
        <Menu inverted className="navbar transparent" size='small'>
            <Menu.Item active={false}><Image src={logo} onClick={handleClick} name="" size='mini' /></Menu.Item>
            <Menu.Item active={false}>
                <Header inverted as='h1' onClick={handleClick} name="">Pokéball</Header>
            </Menu.Item> 
            <Menu.Menu position='right'>
                {
                    localStorage.token? 
                    (
                        <Dropdown text='Account' pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Item name="profile" onClick={handleClick}>Profile</Dropdown.Item>
                                <Dropdown.Item>Account Setting</Dropdown.Item>
                                <Dropdown.Item>Deck List</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) :
                    (
                        <Menu.Item active={false}>
                            <Button onClick={handleClick} name="login" inverted >Login</Button>
                        </Menu.Item>
                    )
                }


            </Menu.Menu>
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