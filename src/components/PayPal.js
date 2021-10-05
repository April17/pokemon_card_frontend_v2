import React from "react";
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { editCart } from '../redux/adapters/cartAdapters'
import { checkoutAdapter } from "../redux/adapters/checkoutAdapters";



const PayPal = (props) => {

    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef()

    React.useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Your description",
                    amount: {
                      currency_code: "USD",
                      value: props.total,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              props.checkoutAdapter(props.cartItems, props.shoppingData, order)
              setPaid(true);
              // console.log(order);
            },
            onError: (err) => {
              setError(err);
              console.error(err);
            },
          })
          .render(paypalRef.current);
          return () => {
            let element = document.getElementById("paypal-button");
            if(element){
              if(element.firstChild){
                element.removeChild(element.firstChild);
              }
            }
          }
      }, [props.total]);
    
      if (paid) {
            return <Header as="h3" inverted>Payment successful!</Header>;
      }
    
      if (error) {
            return <Header as="h3" inverted color='red'>Error Occurred in processing payment! Please try again.</Header>;
      }
      
      console.log("PayPal: ", props)
      return (
          <div id="paypal-button" ref={paypalRef} />
      );
}

const mapStateToProps = state => {
    return {
      cartItems: state.cartReducers.cart,
      shoppingData: state.payPalReducers
    }
}

const mapDispatchToProps = {
    editCart,
    checkoutAdapter
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PayPal));