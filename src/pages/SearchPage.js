import React from 'react'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'



const SearchPage = (props) => {

    React.useEffect(() => {

    }, [])
    

    return(
        <div className='page'>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment className="transparent" >
                        <Header inverted>Search Page</Header>
                    </Segment>    
                </Grid.Column>
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