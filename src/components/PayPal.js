import React from "react";
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { editCart } from '../redux/adapters/cartAdapters'
import { orderAdapters, orderSuccess } from "../redux/adapters/orderAdapters";



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
              setPaid(true);
              console.log("shoppingData in PayPal: ", props.shoppingData)
              props.orderAdapters(props.cartItems, props.shoppingData, order)
                .then(data => {
                  console.log(data.response)
                  if(data.response.body === 'Order Success'){
                    props.history.push(`/order/${data.response.orderId}`, data.response.orderId)
                    props.editCart([])
                  }
              })
                .catch(error => {
                    console.log("Error: ", error)
                })
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
      }, [props.total, props.shoppingData]);
    
      if (paid) {
            return <Header as="h3" inverted>Payment successful!</Header>;
      }
    
      if (error) {
            return <Header as="h3" inverted color='red'>Error Occurred in processing payment! Please try again.</Header>;
      }
      
      console.log("PayPal: ", props.shoppingData)
      return (
          <div id="paypal-button" ref={paypalRef} />
      );
}

const mapStateToProps = state => {
    return {
      cartItems: state.cartReducers.cart,
      shoppingData: state.payPalReducers,
      orderId: state.orderReducers.orderId
    }
}

const mapDispatchToProps = {
    editCart,
    orderAdapters,
    orderSuccess
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PayPal));