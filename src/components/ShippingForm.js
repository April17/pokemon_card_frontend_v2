import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Grid, Segment, Form, Button } from 'semantic-ui-react'
import { shippingAdapter } from '../redux/adapters/payPalAdapters'

const stateOptions = [
    { key: 'AL', text: 'AL', value: 'AL' },
    { key: 'AK', text: 'AK', value: 'AK' },
    { key: 'AZ', text: 'AZ', value: 'AZ' },
    { key: 'AR', text: 'AR', value: 'AR' },
    { key: 'CA', text: 'CA', value: 'CA' },
    { key: 'CO', text: 'CO', value: 'CO' },
    { key: 'CT', text: 'CT', value: 'CT' },
    { key: 'DE', text: 'DE', value: 'DE' },
    { key: 'FL', text: 'FL', value: 'FL' },
    { key: 'GA', text: 'GA', value: 'GA' },
    { key: 'HI', text: 'HI', value: 'HI' },
    { key: 'ID', text: 'ID', value: 'ID' },
    { key: 'IL', text: 'IL', value: 'IL' },
    { key: 'IN', text: 'IN', value: 'IN' },
    { key: 'IA', text: 'IA', value: 'IA' },
    { key: 'KS', text: 'KS', value: 'KS' },
    { key: 'KY', text: 'KY', value: 'KY' },
    { key: 'LA', text: 'LA', value: 'LA' },
    { key: 'ME', text: 'ME', value: 'ME' },
    { key: 'MD', text: 'MD', value: 'MD' },
    { key: 'MA', text: 'MA', value: 'MA' },
    { key: 'MI', text: 'MI', value: 'MI' },
    { key: 'MN', text: 'MN', value: 'MN' },
    { key: 'MS', text: 'MS', value: 'MS' },
    { key: 'MO', text: 'MO', value: 'MO' },
    { key: 'MT', text: 'MT', value: 'MT' },
    { key: 'NE', text: 'NE', value: 'NE' },
    { key: 'NV', text: 'NV', value: 'NV' },
    { key: 'NH', text: 'NH', value: 'NH' },
    { key: 'NJ', text: 'NJ', value: 'NJ' },
    { key: 'NM', text: 'NM', value: 'NM' },
    { key: 'NY', text: 'NY', value: 'NY' },
    { key: 'NC', text: 'NC', value: 'NC' },
    { key: 'ND', text: 'ND', value: 'ND' },
    { key: 'OH', text: 'OH', value: 'OH' },
    { key: 'OK', text: 'OK', value: 'OK' },
    { key: 'OR', text: 'OR', value: 'OR' },
    { key: 'PA', text: 'PA', value: 'PA' },
    { key: 'RI', text: 'RI', value: 'RI' },
    { key: 'SC', text: 'SC', value: 'SC' },
    { key: 'SD', text: 'SD', value: 'SD' },
    { key: 'TN', text: 'TN', value: 'TN' },
    { key: 'TX', text: 'TX', value: 'TX' },
    { key: 'UT', text: 'UT', value: 'UT' },
    { key: 'VT', text: 'VT', value: 'VT' },
    { key: 'VA', text: 'VA', value: 'VA' },
    { key: 'WA', text: 'WA', value: 'WA' },
    { key: 'WV', text: 'WV', value: 'WV' },
    { key: 'WI', text: 'WI', value: 'WI' },
    { key: 'WY', text: 'WY', value: 'WY' },
]


const ShippingForm = (props) => {

    let [firstName, setFirstName] = React.useState("")
    let [lastName, setLastName] = React.useState("")
    let [streetAddress, setStreetAddress] = React.useState("")
    let [apt, setApt] = React.useState("")
    let [city, setCity] = React.useState("")
    let [state, setState] = React.useState("")
    let [zipCode, setZipCode] = React.useState("")

    React.useEffect(() => {

    }, [])

    const handleSubmit = () => {
        let shippingData = {
            payee: {
                firstName: firstName,
                lastName: lastName
              },
              shippingData: {
                streetAddress: streetAddress,
                apt: apt,
                city: city,
                state: state,
                zipCode: zipCode
              }
        }
        props.shippingAdapter(shippingData)
        props.changeIndex()
    }

    return(
        <Grid textAlign='left' verticalAlign='middle'>
            <Grid.Column>
                <Segment className="transparent" >
                    <Form inverted onSubmit={handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='First name' placeholder='First name' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                            <Form.Input fluid label='Last name' placeholder='Last name' value={lastName} onChange={(event) => setLastName(event.target.value)} />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Street Address' placeholder='Street Address' value={streetAddress} onChange={(event) => setStreetAddress(event.target.value)}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Apt/Suit/Unite' placeholder='Apt/Suit/Unite' value={apt} onChange={(event) => setApt(event.target.value)}/>
                            <Form.Input fluid label='Town/City' placeholder='Town/City' value={city} onChange={(event) => setCity(event.target.value)}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Select fluid label='State' placeholder='State' options={stateOptions} value={state} onChange={(event) => setState(event.target.outerText)}/>
                            <Form.Input fluid label='Zip Code' placeholder='Zip Code' type='number' value={zipCode} onChange={(event) => setZipCode(event.target.value)}/>
                        </Form.Group>
                        <Button type='submit' inverted >Submit</Button>
                    </Form>
                </Segment>    
            </Grid.Column>
        </Grid>
    )


}

const mapStateToProps = state => {
    return {
      
    }
}

const mapDispatchToProps = {
    shippingAdapter
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingForm));