import React from 'react'
import { connect } from "react-redux"
import { Header, Grid, Segment, Form, Dropdown, Button, Icon, Label } from 'semantic-ui-react'
import { typesAdapter, subtypeAdapter, supertypeAdapter, rarityAdapter, search } from '../redux/adapters/searchAdapters'
import { queryMaker } from '../utility/utility'

const typeData = ["Colorless",
                "Darkness",
                "Dragon",
                "Fairy",
                "Fighting",
                "Fire",
                "Grass",
                "Lightning",
                "Metal",
                "Psychic",
                "Water"]
const subtypesData = [
    { key: 'Select', text: 'Select', value: 'Select' },
    { key: 'BREAK', text: 'BREAK', value: 'BREAK' },
    { key: 'Baby', text: 'Baby', value: 'Baby' },
    { key: 'Basic', text: 'Basic', value: 'Basic' },
    { key: 'EX', text: 'EX', value: 'EX' },
    { key: 'GX', text: 'GX', value: 'GX' },
    { key: 'Goldenrod Game Corner', text: 'Goldenrod Game Corner', value: 'Goldenrod Game Corner' },
    { key: 'Item', text: 'Item', value: 'Item' },
    { key: 'LEGEND', text: 'LEGEND', value: 'LEGEND' },
    { key: 'Level-Up', text: 'Level-Up', value: 'Level-Up' },
    { key: 'MEGA', text: 'MEGA', value: 'MEGA' },
    { key: 'Pokémon Tool', text: 'Pokémon Tool', value: 'Pokémon Tool' },
    { key: 'Pokémon Tool F', text: 'Pokémon Tool F', value: 'Pokémon Tool F' },
    { key: 'Rapid Strike', text: 'Rapid Strike', value: 'Rapid Strike' },
    { key: 'Restored', text: 'Restored', value: 'Restored' },
    { key: "Rocket's Secret Machine", text: "Rocket's Secret Machine", value: "Rocket's Secret Machine" },
    { key: '"Single Strike', text: '"Single Strike', value: '"Single Strike' },
    { key: 'Special', text: 'Special', value: 'Special' },
    { key: 'Stadium', text: 'Stadium', value: 'Stadium' },
    { key: 'Stage 1', text: 'Stage 1', value: 'Stage 1' },
    { key: 'Stage 2', text: 'Stage 2', value: 'Stage 2' },
    { key: 'Supporter', text: 'Supporter', value: 'Supporter' },
    { key: 'TAG TEAM', text: 'TAG TEAM', value: 'TAG TEAM' },
    { key: 'Technical Machine', text: 'Technical Machine', value: 'Technical Machine' },
    { key: 'V', text: 'V', value: 'V' },
    { key: 'VMAX', text: 'VMAX', value: 'VMAX' }
]
const supertypesData = ["Energy",
                    "Pokémon",
                    "Trainer"]
const raritiesData =[
    { key: 'Select', text: 'Select', value: 'Select' },
    { key: 'Amazing Rare', text: 'Amazing Rare', value: 'Amazing Rare' },
    { key: 'LEGEND', text: 'LEGEND', value: 'LEGEND' },
    { key: 'Promo', text: 'Promo', value: 'Promo' },
    { key: 'Rare', text: 'Rare', value: 'Rare' },
    { key: 'Rare ACE', text: 'Rare ACE', value: 'Rare ACE' },
    { key: 'Rare BREAK', text: 'Rare BREAK', value: 'Rare BREAK' },
    { key: 'Rare Holo', text: 'Rare Holo', value: 'Rare Holo' },
    { key: 'Rare Holo EX', text: 'Rare Holo EX', value: 'Rare Holo EX' },
    { key: 'Rare Holo GX', text: 'Rare Holo GX', value: 'Rare Holo GX' },
    { key: 'Rare Holo LV.X', text: 'Rare Holo LV.X', value: 'Rare Holo LV.X' },
    { key: 'Rare Holo Star', text: 'Rare Holo Star', value: 'Rare Holo Star' },
    { key: 'Rare Holo V', text: 'Rare Holo V', value: 'Rare Holo V' },
    { key: 'Rare Holo VMAX', text: 'Rare Holo VMAX', value: 'Rare Holo VMAX' },
    { key: 'Rare Prime', text: 'Rare Prime', value: 'Rare Prime' },
    { key: 'Rare Prism Star', text: 'Rare Prism Star', value: 'Rare Prism Star' },
    { key: 'Rare Rainbow', text: 'Rare Rainbow', value: 'Rare Rainbow' },
    { key: 'Rare Secret', text: 'Rare Secret', value: 'Rare Secret' },
    { key: 'Rare Shining', text: 'Rare Shining', value: 'Rare Shining' },
    { key: 'Rare Shiny', text: 'Rare Shiny', value: 'Rare Shiny' },
    { key: 'Rare Shiny GX', text: 'Rare Shiny GX', value: 'Rare Shiny GX' },
    { key: 'Rare Ultra', text: 'Rare Ultra', value: 'Rare Ultra' },
    { key: 'Uncommon', text: 'Uncommon', value: 'Uncommon' },
    { key: 'Common', text: 'Common', value: 'Common' }
]

let types = ['All']

const SearchSideBar = (props) => {
    

    const handleTypes = (event) => {
        if(event.target.checked){
            types.push(event.target.value)
        } else {
            types.splice(types.findIndex(type => type === event.target.value),1)
        }
        console.log(types)
        if(types.length === 0){
            types.push('All')
        } else if(types.includes('All')) {
            types.splice(types.findIndex(type => type === 'All'),1)
        }
        console.log(types)
        props.typesAdapter(types)
    }

    const handleSubtypes = (event) => {
        props.subtypeAdapter(event.currentTarget.childNodes[0].innerText)
    }

    const handleSupertypes = (event) => {
        props.supertypeAdapter(event.target.value)
    }

    const handleRarities = (event) => {
        props.rarityAdapter(event.currentTarget.childNodes[0].innerText)
    }

    const handleSearch = () => {
        // queryMaker(props.searchData)
        props.search(queryMaker(props.searchData),1)
        
    }

    const genTypes = () => {
        return typeData.map(type => 
            <Form.Field key={type} name={type} value={type} label={type} control='input' type='checkbox' />
            ) 
    }

    const genSupertypes = () => {
        return supertypesData.map(supertype => 
            <Form.Field key={supertype} name="supertype" value={supertype} label={supertype} control='input' type='radio' />
            ) 
    }
    

    return(
        <Grid textAlign='left' style={{ height: '90vh' }}>
            <Grid.Column >
                {/* <Segment className="transparent" >
                    <Button inverted color='green' onClick={handleSearch}>
                        Update Search
                    </Button>
                </Segment> */}
                <Segment className="transparent" >
                    <Grid>
                        <Header inverted>Types</Header>
                        <Icon inverted name='refresh'onClick={handleSearch} link/>
                    </Grid>
                    <Form className="secondary-items" inverted onChange={handleTypes}>
                        <Form.Group grouped >
                            {genTypes()}
                        </Form.Group>
                        
                    </Form>
                </Segment>
                <Segment className="transparent" >
                    <Grid>
                        <Header inverted>Subtype</Header>
                        <Icon inverted name='refresh' onClick={handleSearch} link/>
                    </Grid>
                    <Dropdown className="secondary-items search-dropdown" defaultValue='Select' options={subtypesData} onChange={handleSubtypes} scrolling button/>
                </Segment> 
                <Segment className="transparent" >
                    <Grid>
                        <Header inverted>Supertype</Header>
                        <Icon inverted name='refresh' onClick={handleSearch} link/>
                    </Grid>
                    <Form className="secondary-items" inverted onChange={handleSupertypes}>
                        <Form.Group grouped>
                            {genSupertypes()}
                        </Form.Group>
                    </Form>
                </Segment> 
                <Segment className="transparent" >
                    <Grid>
                        <Header inverted>Rarity</Header>
                        <Icon inverted name='refresh' onClick={handleSearch} link/>
                    </Grid>
                    <Dropdown className="secondary-items search-dropdown" defaultValue='Select' options={raritiesData} onChange={handleRarities} scrolling button/>
                </Segment>     
            </Grid.Column>
        </Grid>
    )


}

const mapStateToProps = state => {
    return {
        searchData: state.searchReducers
    }
}

const mapDispatchToProps = {
    typesAdapter,
    subtypeAdapter, 
    supertypeAdapter, 
    rarityAdapter,
    search
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchSideBar);