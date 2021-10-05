import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Accordion, Icon, Segment, Item, Header } from 'semantic-ui-react'
import ShippingForm from './ShippingForm'
import CheckoutItem from './CheckoutItem'

class CheckoutConfirmation extends Component {
  
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  genCheckoutItems = () => {
    return this.props.cartItems.map(cartItem =>             
        <CheckoutItem key={cartItem.name} data={{...cartItem}} />
    )
  }

  changeIndex = () => {
    this.setState({ activeIndex: 1 })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Segment inverted>
        <Accordion inverted>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
            as='h1'
          >
            <Icon name='dropdown' />
            Shapping Address
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <ShippingForm changeIndex={this.changeIndex} />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
            as="h1"
          >
            <Icon name='dropdown' />
            Review items and shipping
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Header as='span' className="price-to-right" inverted>Price</Header>
            <Item.Group>
              {this.genCheckoutItems()}
            </Item.Group>
          </Accordion.Content>
        </Accordion>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartReducers.cart
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutConfirmation))