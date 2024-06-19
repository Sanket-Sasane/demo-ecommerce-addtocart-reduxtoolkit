import { createSlice } from "@reduxjs/toolkit";

const initialState={
    carts:[],
}

// card slice

const cartSlice=createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        // add to cart

        addToCart:(state,action)=>{
            const indexItem=state.carts.findIndex((item)=>item.id===action.payload.id);
            console.log("index : ",indexItem)

            if(indexItem >=0){
                state.carts[indexItem].qnty+=1;
            }
            else{
                const temp={...action.payload, qnty:1};
                state.carts=[...state.carts,temp]
            }            
            // state.carts=[...state.carts,action.payload];
        },

        // remove from cart
        removeToCart:(state,action)=>{
            state.carts=state.carts.filter((item)=>item.id!==action.payload.id);
        },

        // remove single item
        removeSingleItem:(state,action)=>{
            const indexItemDecrement=state.carts.findIndex((item)=>item.id===action.payload.id);

            if(state.carts[indexItemDecrement].qnty >=1){
                state.carts[indexItemDecrement].qnty -=1;
            }
        },

        // remove all items
        removeAllItem:(state,action)=>{
            state.carts=[];
        }

    }
})

export default cartSlice.reducer;
export const {addToCart, removeToCart, removeSingleItem, removeAllItem}=cartSlice.actions;