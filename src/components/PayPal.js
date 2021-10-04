import React from "react";
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { editCart } from '../redux/adapters/cartAdapters'



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
              console.log(order);
            },
            onError: (err) => {
              setError(err);
              console.error(err);
            },
          })
          .render(paypalRef.current);
      }, [props.total]);
    
      if (paid) {
            props.editCart([])
            return <Header as="h3" inverted>Payment successful!</Header>;
      }
    
      if (error) {
            return <Header as="h3" inverted color='red'>Error Occurred in processing payment! Please try again.</Header>;
      }
      
      console.log("PayPal: ", props)
      window.paypalRef = paypalRef
      return (
          <div ref={paypalRef} />
      );
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = {
    editCart
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PayPal));