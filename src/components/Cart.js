import React from 'react'
import { connect } from "react-redux"
import { Header, Dropdown, Button, Segment } from 'semantic-ui-react'
import { addToCart } from '../redux/adapters/cartAdapters'
import CartCard from './CartCard'
import '../assets/style/Cart.css'




const Cart = (props) => {

    let cartItems = props.cartItems

    React.useEffect(() => {
      if(localStorage.cart){
        props.addToCart(JSON.parse(localStorage.cart)) 
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
              <Dropdown.Header ><Header inverted>Cart is empyt </Header></Dropdown.Header> :
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


            <Dropdown.Item ></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )


}

const mapStateToProps = state => {
    return {
      cartItems: state.cartReducers.cart
    }
}

const mapDispatchToProps = {
  addToCart
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);