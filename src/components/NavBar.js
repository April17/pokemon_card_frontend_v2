import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Menu, Header, Dropdown, Image, Popup, Input, Icon } from 'semantic-ui-react'
import { logInFromState } from '../redux/adapters/utilityAdapters' 
import  '../assets/style/NavBar.css'
import logo from '../assets/Logo/PokeBallicon.svg'
import Cart from './Cart'
import Search from './Search'



const NavBar = (props) => {
    
    let [orderId, setOrderId] = React.useState("")

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
            if(props.history.location.pathname === '/profile'){
                props.history.push('/')
            } else {
                props.history.push(props.history.location.pathname)
            }
        }
    }

    const handleSearch = () => {
        props.history.push(`/order/${orderId}`, orderId)
    } 
    // console.log(props.history)
    return (
        <Menu inverted className="navbar" size='small' borderless>
            <Menu.Menu position='left'>
                <Menu.Item >
                    <Link to="/" className="link-color"><Image src={logo} name="" size='mini' /></Link>
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h1' name=""><Link to="/" className="link-color">Pokéball</Link></Header>
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h1' ></Header>
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h3'><Link to="/search" className="link-color"> Shop </Link></Header>
                </Menu.Item>
                <Menu.Item active={false}>
                    <Header inverted as='h1' ></Header>
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
                <Menu.Item active={false}>
                    <Popup
                        on='click'
                        pinned
                        className="frostglass-dark"
                        position='bottom center'
                        trigger={<Header inverted as='h4' > Check Order </Header>}
                    >
                        <Popup.Content>
                            <Input
                                icon={<Icon name='search' onClick={handleSearch} inverted circular link />}
                                onChange={(event) => setOrderId(event.currentTarget.value)}
                                placeholder='Search...'
                            />
                        </Popup.Content>
                    </Popup>
                </Menu.Item>
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