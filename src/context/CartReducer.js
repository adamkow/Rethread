const CartReducer = (state, action) => {

    console.log(action.payload.id)

    switch(action.type){
        case "ADD":
            return {
                ...state,
                 cart: [...state.cart, action.payload]
            };
        case "REMOVE":
            return {
                ...state,
                cart: state.cart.filter((c) => c.name !== action.payload.name)
            };
        case "EMPTY":
            return {
                cart: null
            };
        default:
            return state;
    }
};

export default CartReducer