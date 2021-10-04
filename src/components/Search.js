import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Menu, Input, Dropdown, Icon } from 'semantic-ui-react'
import { search, nameAdapter, typesAdapter } from '../redux/adapters/searchAdapters'
import { queryMaker } from '../utility/utility'


const options = [
    { key: 'All', text: 'All', value: 'All' },
    { key: 'Colorless', text: 'Colorless', value: 'Colorless' },
    { key: 'Darkness', text: 'Darkness', value: 'Darkness' },
    { key: 'Dragon', text: 'Dragon', value: 'Dragon' },
    { key: 'Fairy', text: 'Fairy', value: 'Fairy' },
    { key: 'Fighting', text: 'Fighting', value: 'Fighting' },
    { key: 'Fire', text: 'Fire', value: 'Fire' },
    { key: 'Grass', text: 'Grass', value: 'Grass' },
    { key: 'Lightning', text: 'Lightning', value: 'Lightning' },
    { key: 'Metal', text: 'Metal', value: 'Metal' },
    { key: 'Psychic', text: 'Psychic', value: 'Psychic' },
    { key: 'Water', text: 'Water', value: 'Water' }
  ]


const Search = (props) => {


    const handleDropdown = (event) => {
        props.typesAdapter([event.currentTarget.childNodes[0].innerText])
    }

    const handleInput = (event) => {
        props.nameAdapter(event.currentTarget.value)
    }

    const handleSearch = () => {
        // queryMaker(props.searchData)
        props.search(queryMaker(props.searchData),1)
        props.history.push('/search')
        
    }
    
    console.log("Search Props: ", props.searchData)

    return(
        <Menu.Item className="search">
            <Input 
                label={<Dropdown defaultValue={props.searchData.types[0]} options={options} onChange={handleDropdown} scrolling/>}
                labelPosition='left'
                icon={<Icon name='search' onClick={handleSearch} inverted circular link/>}
                value={props.searchData.name}
                onChange={handleInput} 
                placeholder='Search...'  
                size='big'/>
        </Menu.Item>
    )


}

const mapStateToProps = state => {
    return {
      searchData: state.searchReducers
    }
}

const mapDispatchToProps = {
    search,
    nameAdapter,
    typesAdapter
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Search));