import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'



const ProfilePage = (props) => {

    React.useEffect(() => {
        if (!localStorage.token || localStorage.token === "undefined") {
            localStorage.clear()
            props.history.push('/')
        }
    }, [props.history])
    

    return(
        <div className='page'>
            <Grid textAlign='center' divided='vertically'>
                <Grid.Row id="result-bar" columns={1}>
                    <Grid.Column  width={16}>
                        <Segment className="frostglass" textAlign='left' >
                            <Header inverted>Welcome Back UserName</Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} stretched>
                    <Grid.Column  width={4}>
                        <Segment className="frostglass" textAlign='left'>
                            <Header inverted>Side Bar</Header>
                            <Header inverted>Account Info</Header>
                            <Header inverted>Account Setting</Header>
                            <Header inverted>Orders</Header>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment className="transparent" >
                            <Header inverted>Infos</Header>
                        </Segment>    
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )


}

const mapStateToProps = state => {
    return {
      
    }
}

const mapDispatchToProps = {
    
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage));