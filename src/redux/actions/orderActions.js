export const actions = {
    orderSuccess: (orderId) => ({type: "ORDER_SUCCESS", payload: orderId}),
    getOrder: (orderData) => ({type: "GET_ORDER", payload: orderData}),
    noOrderFound: () => ({type:"NO_ORDER_FOUND"})
  };