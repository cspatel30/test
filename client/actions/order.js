
export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const GET_USER_ORDERS = 'GET_USER_ORDERS';
export const GET_USER_ORDERS_SUCCESS = 'GET_USER_ORDERS_SUCCESS';
export const GET_USER_ORDERS_FAILURE = 'GET_USER_ORDERS_FAILURE';

export const GET_ADMIN_ORDERS = 'GET_ADMIN_ORDERS';
export const GET_ADMIN_ORDERS_SUCCESS = 'GET_ADMIN_ORDERS_SUCCESS';
export const GET_ADMIN_ORDERS_FAILURE = 'GET_ADMIN_ORDERS_FAILURE';

export function createOrder(enquiryId, inspectorId) {
  return {
    type: CREATE_ORDER,
    payload: {enquiryId: enquiryId, inspectorId: inspectorId}
  };
}

export function createOrderSuccess(order) {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: order
  };
}

export function createOrderFailure(error) {
  return {
    type: CREATE_ORDER_FAILURE,
    payload: error
  };
}

export function getUserOrders() {
  return {
    type: GET_USER_ORDERS
  }
}

export function getUserOrdersSuccess(orders) {
  return {
    type: GET_USER_ORDERS_SUCCESS,
    payload: orders
  }
}

export function getUserOrdersFailure(error) {
  return {
    type: GET_USER_ORDERS_FAILURE,
    payload: error
  };
}

export function getAdminOrders() {
  return {
    type: GET_ADMIN_ORDERS
  }
}

export function getAdminOrdersSuccess(orders) {
  return {
    type: GET_ADMIN_ORDERS_SUCCESS,
    payload: orders
  }
}

export function getAdminOrdersFailure(error) {
  return {
    type: GET_ADMIN_ORDERS_FAILURE,
    payload: error
  };
}