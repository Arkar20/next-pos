

export const cartreducer=(state,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
           return addtocart(state,action)
        case "REMOVE_ITEM":
            return state.filter(item=>item.id!==action.payload.id)
        default:
            return state
    }

}

function addtocart(state,action){
        const itemexists=state.find(item=>item.id===action.payload.id)
           if(itemexists){
             return  state.map(item=>item.id==action.payload.id?{...itemexists,qty:Number(itemexists.qty)+Number(action.payload.qty)}:item)
           }
           return [...state,action.payload]
}