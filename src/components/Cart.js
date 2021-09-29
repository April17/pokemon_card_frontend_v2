import React from 'react'
import { connect } from "react-redux"
import { Header, Dropdown, Button, Segment, Card, Grid, Image } from 'semantic-ui-react'
import { editCart, getCart } from '../redux/adapters/cartAdapters'
import { auth } from '../redux/adapters/currentUserAdapters'
import CartCard from './CartCard'
import CardBack from '../assets/Image/pokemon_card_backside.png'
import '../assets/style/Cart.css'




const Cart = (props) => {

    let cartItems = props.cartItems

    React.useEffect(() => {
      if(localStorage.token){
        props.getCart()
      }
    }, [])


    const genCartItems = () => {
      return cartItems.map(cartItem =>
        <Dropdown.Item key={cartItem.id}>              
          <CartCard data={{...cartItem}} />
        </Dropdown.Item>
      )
    }

    const calculateSubtotal = () => {
      let subTotal = 0
      cartItems.forEach(cartItem => {
        subTotal = subTotal + cartItem.cardmarket.prices.trendPrice * cartItem.qty
      });
      return Math.round(subTotal * 100) / 100
    }
    
    return(
      <Dropdown text='Cart' className='link item' simple>
        <Dropdown.Menu id='cart'>
            {
              (cartItems.length === 0)? 
              <div>
                <Dropdown.Header >
                  <Segment className='transparent' textAlign='left'>
                    <Header inverted>Subtotal: ${calculateSubtotal()}</Header>
                  </Segment>
                </Dropdown.Header>
                <Dropdown.Item >
                  <Segment className='transparent' textAlign='right'>
                    <Button inverted color='green'> Proceed to Checkout </Button>
                  </Segment>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Card className='frostglass'>
                    <Card.Content>
                        <Grid columns={2}>
                            <Grid.Column width={7}>
                                <Image floated='left' fluid src={CardBack}/>
                            </Grid.Column>
                            <Grid.Column width={9} >
                                <Grid.Row>
                                    <Header as='h4' inverted> No card in cart </Header>
                                </Grid.Row>
                            </Grid.Column>    
                        </Grid>
                    </Card.Content>
                  </Card>
                </Dropdown.Item>
              </div> :
              <div>
                <Dropdown.Header >
                  <Segment className='transparent' textAlign='left'>
                    <Header inverted>Subtotal: ${calculateSubtotal()}</Header>
                  </Segment>
                </Dropdown.Header>
                <Dropdown.Item >
                  <Segment className='transparent' textAlign='right'>
                    <Button inverted color='green'> Proceed to Checkout </Button>
                  </Segment>
                </Dropdown.Item>
                <Dropdown.Divider />
                <div className='scrooll-box'>
                  {genCartItems(cartItems)}
                </div>
              </div>
            }
        </Dropdown.Menu>
      </Dropdown>
    )


}

const mapStateToProps = state => {
    return {
      cartItems: state.cartReducers.cart,
      authResponse: state.currentUserReducers.auth
    }
}

const mapDispatchToProps = {
  editCart,
  getCart,
  auth
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);