
export const initialState = {
    cart: [],
    user: null
}

export const getCartTotal = (cart) => cart?.reduce((amount, item) => item.price + amount, 0)

// const setItemsInLocalStorage = () => {
//     localStorage.setItem("asrafuls-ama-cart-items", JSON.parse(initialState.cart))
// }

export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let addCartValue = {}
            let addCartValueArray = null
            if (state?.cart.length < 1) {
                addCartValue = action.item
                addCartValueArray = null
            } else if (state?.cart.length >= 1) {
                const dataInCart = state.cart?.find(dt => dt.id === action.item.id)
                if (dataInCart) {
                    dataInCart.qty = dataInCart.qty + action.item.qty
                    dataInCart.price = dataInCart.price + action.item.price
                    dataInCart.variant = action.item.variant
                    const cartData = state.cart.filter(item => item.id !== action.item.id)
                    cartData.push(dataInCart)
                    addCartValueArray = cartData
                } else {
                    addCartValue = action.item
                }
            }
            return {
                ...state,
                cart: addCartValueArray ? [...addCartValueArray] : [...state.cart, addCartValue]
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.id)
            }
        case "MINUS_CART_ITEM_QTY":
            let minusCartItemData = null
            if (state.cart) {
                const findData = state.cart.find(item => item.id === action.id)
                const cartData = state.cart.filter(item => item.id !== action.id)
                findData.qty = action.qty
                findData.price = action.price * action.qty
                cartData.push(findData)
                minusCartItemData = cartData
            };
            return {
                ...state,
                cart: minusCartItemData
            }
        case "PLUS_CART_ITEM_QTY":
            let plusCartItemData = []
            if (state.cart) {
                const findData = state.cart.find(item => item.id === action.id)
                const cartData = state.cart.filter(item => item.id !== action.id)
                findData.qty = action.qty
                findData.price = action.price * action.qty
                cartData.push(findData)
                plusCartItemData = cartData
            };
            return {
                ...state,
                cart: plusCartItemData
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        default:
            return state
    }
}

if (localStorage.getItem("asrafuls-ama-cart-items") === null) {
    initialState.cart = []
} else if (localStorage.getItem("asrafuls-ama-cart-items").length > 0) {
    initialState.cart = JSON.parse(localStorage.getItem("asrafuls-ama-cart-items"))
}
