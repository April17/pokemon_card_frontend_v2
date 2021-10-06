import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Popup } from 'semantic-ui-react'
import { getProfileAdapter, resetProfileAdapter } from '../redux/adapters/currentUserAdapters'
import AccountInfo from '../components/AccountInfo'
import ProfileOrders from '../components/ProfileOrders'
import AccountSetting from '../components/AccountSetting'
import DeckList from '../components/DeckList'



const ProfilePage = (props) => {

    let userData = props.userData

    let [accountInfoToggle, setAccountInfoToggle] = React.useState(true)
    let [accountSettingToggle, setAccountSettingToggle] = React.useState(false)
    let [ordersToggle, setOrdersToggle] = React.useState(false)
    let [deckListToggle, setDeckListToggle] = React.useState(false)

    React.useEffect(() => {
        if (!localStorage.token || localStorage.token === "undefined") {
            localStorage.clear()
            props.history.push('/')
        } else {
            props.getProfileAdapter()
        }
        return() => {
            props.resetProfileAdapter()
        }
    }, [props.history])

    const tabSwitch = () => {
        if(accountInfoToggle){
            return <AccountInfo/>
        } else if (accountSettingToggle) {
            return <AccountSetting/>
        } else if (ordersToggle) {
            return <ProfileOrders/>
        } else if (deckListToggle) {
            return <DeckList/>
        }
    }

    const tabToggle = (event) => {
        if(event.target.name === "accountInfo"){
            setAccountInfoToggle(true)
            setAccountSettingToggle(false)
            setOrdersToggle(false)
            setDeckListToggle(false)
        } else if (event.target.name === "accountSetting"){
            setAccountInfoToggle(false)
            setAccountSettingToggle(true)
            setOrdersToggle(false)
            setDeckListToggle(false)
        } else if (event.target.name === "orders"){
            setAccountInfoToggle(false)
            setAccountSettingToggle(false)
            setOrdersToggle(true)
            setDeckListToggle(false)
        } else if (event.target.name === "deckList"){
            setAccountInfoToggle(false)
            setAccountSettingToggle(false)
            setOrdersToggle(false)
            setDeckListToggle(true)
        }
    }

    const loadingRecentOrder = () => {
        return(
            <Segment className="frostglass-dark" textAlign='left'>
                <Grid textAlign='center' divided='vertically'>
                    <Grid.Row columns={6} stretched>
                        <Grid.Column className='no-right-padding'>
                            <Segment className="transparent" textAlign='left'>
                                <Header className="compact-headers" as="h5" inverted>OrderId:</Header>
                                <Header className="compact-headers" as="h5" inverted>Loading...</Header>
                            </Segment> 
                        </Grid.Column>
                        <Grid.Column className='no-right-padding'>
                            <Segment className="transparent" textAlign='left'>
                                <Popup
                                    position='bottom center'
                                    hoverable
                                    className="frostglass-dark" 
                                    trigger={
                                        <div>
                                            <Header as="h5" className="compact-headers" inverted>Shipping Address:</Header>
                                            <Header as="h5" className="compact-headers" inverted>Loading...</Header>
                                        </div>
                                    } 
                                    >
                                        <Popup.Content>
                                            <Header className="compact-headers" as="h5" inverted>Email</Header>
                                            <Header className="compact-headers" as="h5" inverted>Loading...</Header>
                                            <Header className="compact-headers" as="h5" inverted>Address</Header>
                                            <Header className="compact-headers" as="h5" inverted>Loading...</Header>
                                        </Popup.Content>
                                </Popup>
                            </Segment> 
                        </Grid.Column>
                        <Grid.Column className='no-right-padding'>
                            <Segment className="transparent" textAlign='left'>
                                <Header className="compact-headers" as="h5" inverted>Order Date:</Header>
                                <Header className="compact-headers" as="h5" inverted>Loading...</Header>
                            </Segment> 
                        </Grid.Column>
                        <Grid.Column className='no-right-padding'>
                            <Segment className="transparent" textAlign='left'>
                                <Header className="compact-headers" as="h5" inverted>Status</Header>
                                <Header className="compact-headers" as="h5" inverted>Loading...</Header>
                            </Segment> 
                        </Grid.Column>
                        <Grid.Column className='no-right-padding'>
                            <Segment className="transparent" textAlign='left'>
                                <Header className="compact-headers" as="h5" inverted>Total:</Header>
                                <Header className="compact-headers" as="h5" inverted>Loading...</Header>
                            </Segment> 
                        </Grid.Column>
                        <Grid.Column className='no-right-padding' width={1}>
                            <Segment className="transparent" textAlign='left'>
                                <Header className="compact-headers" as="h5" inverted>More Detail</Header>
                            </Segment> 
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }

    const loadingPage = () => {
        return (
            <Segment className='frostglass'>
            <Grid textAlign='left' divided='vertically'>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> Basic Info</Header>
                            <Grid textAlign='left' divided='vertically'>
                                <Grid.Row columns={3}  stretched>
                                    <Grid.Column>
                                        <Segment className='transparent'>
                                            <Header inverted>UserId: Loading...</Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment className='transparent'>
                                            <Header inverted>Nickname: Loading...</Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment className='transparent'>
                                            <Header inverted>Account Type: Loading...</Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> Recent Orders </Header>
                                {loadingRecentOrder()}
                                {loadingRecentOrder()}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> Deck List</Header>
                            <Header inverted>Under Development</Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        )
    }


    
    // console.log("userData: ", props.userData)
    return(
        <div className='page'>
            <Grid textAlign='center' divided='vertically'>
                <Grid.Row id="result-bar" columns={1}>
                    <Grid.Column  width={16}>
                        <Segment className="frostglass" textAlign='left' >
                            <Header inverted>Welcome Back {userData.userId? userData.nickName : "Loading..."}</Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} stretched>
                    <Grid.Column  width={4}>
                        <Segment className="frostglass" textAlign='left'>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment className="transparent">
                                            <Header name="accountInfo" onClick={tabToggle} inverted><Link name="accountInfo" to={props.history.location.pathname} className="link-color">Account Info</Link></Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment className="transparent">
                                            <Header name="accountSetting" onClick={tabToggle} inverted><Link name="accountSetting" to={props.history.location.pathname} className="link-color">Account Setting</Link></Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment className="transparent">
                                            <Header name="orders" onClick={tabToggle} inverted><Link  name="orders" to={props.history.location.pathname} className="link-color">Orders</Link></Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment className="transparent">
                                            <Header name="deckList" onClick={tabToggle} inverted><Link name="deckList" to={props.history.location.pathname} className="link-color">Deck List</Link></Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>                           
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {userData.userId? tabSwitch() : loadingPage() } 
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )


}

const mapStateToProps = state => {
    return {
      userData: state.currentUserReducers.userData
    }
}

const mapDispatchToProps = {
    getProfileAdapter,
    resetProfileAdapter
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage));