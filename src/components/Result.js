import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header } from 'semantic-ui-react'



const Result = (props) => {

    React.useEffect(() => {

    }, [])

    const resultBulder = () => {
        const resultData = props.searchData.result
        let lowerRange = resultData.pageSize * resultData.page - resultData.pageSize + 1
        let upperRange = resultData.pageSize * resultData.page
        if(upperRange > resultData.totalCount){
            upperRange = resultData.totalCount
        }
        return `${[lowerRange, upperRange].join(" - ")} of ${resultData.totalCount} results`
    }

    const resultCondition = () => {
        if(props.searchData.result.data){
            if(props.searchData.result.data.length >= 1){
                return resultBulder()
            } else {
                return "No result"
            }
        }
    }
    
    // console.log(props.searchData.result)
    return(
        <Header as='h4' inverted>{resultCondition()}</Header>  
    )


}

const mapStateToProps = state => {
    return {
        searchData: state.searchReducers
    }
}

const mapDispatchToProps = {
    
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Result));