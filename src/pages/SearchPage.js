import React from 'react'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'
import SearchSideBar from '../components/SearchSideBar'
import Items from '../components/Items'
import '../assets/style/SearchPage.css'



const SearchPage = (props) => {

    React.useEffect(() => {

    }, [])
    

    return(
        <div className='page'>
            <Grid textAlign='center' divided='vertically'>
                <Grid.Row id="result-bar" columns={1}>
                    <Grid.Column  width={16}>
                        <Segment className="frostglass" textAlign='left' >
                            <Header inverted>Result</Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="second-row" columns={2} stretched>
                    <Grid.Column  width={4}>
                        <Segment className="frostglass" textAlign='left'>
                            <SearchSideBar/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment className="transparent" >
                            <Items/>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);