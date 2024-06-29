import {createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const foodStore = createSlice({
    name: 'foods',
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: []
    },
    reducers: {
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        setActiveIndex(state,action){
            state.activeIndex = action.payload
        },
        addItemToCart(state,action){
            const item = state.cartList.find(item => item.id=== action.payload.id)
            if(item){
                item.count = item.count+1;
            } else {
                state.cartList.push(action.payload);
            }
        },
        increaseCount(state, action){
            const item = state.cartList.find(item => item.id === action.payload);
            item.count++;
        },
        decreaseCount(state, action){
            const item = state.cartList.find(item => item.id === action.payload);
            if(item.count === 0){
                state.cartList = state.cartList.filter(item => item.id !== action.payload);
                return;
            }
            item.count--;
        },
        clearCart(state){
            state.cartList = [];
        }
    }
});
const {setFoodsList, setActiveIndex, addItemToCart, increaseCount, decreaseCount,clearCart} = foodStore.actions
const fetchFoods = () => {
    return async (dispatch) =>{
        const res = await axios.get('http://localhost:3004/takeaway')
        console.log(res)
        dispatch(setFoodsList(res.data))
    }
}

export {fetchFoods, setActiveIndex, addItemToCart,increaseCount, decreaseCount,clearCart}

export default foodStore.reducer