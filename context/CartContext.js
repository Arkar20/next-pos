import {createContext,useReducer} from "react"
import {cartreducer} from "./reducer/cartreducer.js"

const initialState=[
    {title:'Dress',price:20,qty:19}
]

export const Cart=createContext()

const CartContext=({children})=>{

    const [state,dispatch]=useReducer(cartreducer,initialState)

    return(
        <Cart.Provider value={{state,dispatch}}>
            {children}
        </Cart.Provider>
    )
}

export default CartContext