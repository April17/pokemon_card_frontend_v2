import React from 'react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Header, Dropdown, Button, Segment, Card, Grid, Image } from 'semantic-ui-react'
import { editCart, getCart } from '../redux/adapters/cartAdapters'
import { auth } from '../redux/adapters/currentUserAdapters'
import { priceChecker } from '../utility/utility'
import CartCard from './CartCard'
import CardBack from '../assets/Image/pokemon_card_backside.png'
import '../assets/style/Cart.css'




const Cart = (props) => {

    let cartItems = props.cartItems

    React.useEffect(() => {
      if(localStorage.token){
        props.getCart()
      } else if (localStorage.cart){
        props.editCart(JSON.parse(localStorage.cart))
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
        subTotal = subTotal + priceChecker(cartItem) * cartItem.qty
      });
      return Math.round(subTotal * 100) / 100
    }

    const toCheckout = () => {
      props.history.push('/checkout')
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
                    <Button inverted color='green' onClick={toCheckout} > Proceed to Checkout </Button>
                  </Segment>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Card className='frostglass'>
                    <Card.Content>
                        <Grid columns={2}>
                            <Grid.Column width={7}>
                                <Image className='cart-card-padding' fluid src={CardBack} />
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
                    <Button inverted color='green' onClick={toCheckout}> Proceed to Checkout </Button>
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart));