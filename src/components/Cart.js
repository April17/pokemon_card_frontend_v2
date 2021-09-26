import React from 'react'
import { connect } from "react-redux"
import { Header, Dropdown, Grid, Button, Segment } from 'semantic-ui-react'
import CartCard from './CartCard'
import '../assets/style/Cart.css'




const Cart = (props) => {

    const cartItems = props.cartItems

    const genCartItems = () => {
      return cartItems.map(cartItem =>
        <Dropdown.Item key={cartItem.id}>              
          <CartCard data={cartItem} />
        </Dropdown.Item>
    )


    }
  
    return(
      <Dropdown text='Cart' className='link item' simple>
        <Dropdown.Menu id='cart' className='frostglass'>
            {
              (cartItems.length === 0)? 
              <Dropdown.Header ><Header inverted>Cart is empyt </Header></Dropdown.Header> :
              <div>
                <Dropdown.Header ><Header inverted>Subtotal: </Header></Dropdown.Header>
                <Dropdown.Item >
                  <Segment className='transparent' textAlign='right'>
                    <Button inverted color='green'> Proceed to Checkout </Button>
                  </Segment>
                </Dropdown.Item>
                <Dropdown.Divider />
                {genCartItems(cartItems)}
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
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);