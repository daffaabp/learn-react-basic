// Import semua fungsi dari Redux Toolkit dengan nama toolkit
import * as toolkit from "@reduxjs/toolkit";

// Destructuring fungsi yang dibutuhkan dari toolkit
const {configureStore, createAction, createReducer} = toolkit;

// Membuat action creator untuk menambah item ke cart
const addToCart = createAction("ADD_TO_CART");

// Membuat reducer untuk cart dengan state awal array kosong
const cartReducer = createReducer([], (builder) => {
    // Menambahkan case untuk action ADD_TO_CART
    builder.addCase(addToCart, (state, action) => {
        state.push(action.payload); // Menambah item baru ke cart
    })
});

// Membuat action creator untuk login
const login = createAction("CREATE_SESSION");

// Membuat reducer untuk login dengan state awal {status: false}
const loginReducer = createReducer({status: false}, (builder) => {
    // Menambahkan case untuk action CREATE_SESSION
    builder.addCase(login, (state, action) => {
        state.status = true; // Mengubah status login menjadi true
    })
})

// Membuat store dengan multiple reducer
const store = configureStore({
    reducer: {
        cart: cartReducer, // Reducer untuk cart
        login: loginReducer, // Reducer untuk login
    }
})
console.log("oncreate store : ", store.getState());

// Subscribe untuk memantau perubahan state
store.subscribe(() => {
    console.log("STORE CHANGE : ", store.getState()); // Log setiap perubahan state
})

// Dispatch beberapa action
store.dispatch(addToCart({id: 1, qty: 20})); // Menambah item pertama ke cart
store.dispatch(addToCart({id: 2, qty: 10})); // Menambah item kedua ke cart
store.dispatch(login()) // Melakukan login