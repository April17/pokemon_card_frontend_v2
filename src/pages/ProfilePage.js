import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'
import { getProfileAdapter } from '../redux/adapters/currentUserAdapters'
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


    
    // console.log("userData: ", props.userData)
    return(
        <div className='page'>
            <Grid textAlign='center' divided='vertically'>
                <Grid.Row id="result-bar" columns={1}>
                    <Grid.Column  width={16}>
                        <Segment className="frostglass" textAlign='left' >
                            <Header inverted>Welcome Back {userData.nickName}</Header>
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
                        {userData.userId? tabSwitch() : null } 
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
    getProfileAdapter
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage));