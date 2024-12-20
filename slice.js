// Import fungsi-fungsi yang diperlukan dari Redux Toolkit
import * as toolkit from "@reduxjs/toolkit";

// Destructuring fungsi configureStore dan createSlice dari toolkit
const {configureStore, createSlice} = toolkit;

// Membuat slice untuk cart menggunakan createSlice
// Slice adalah bagian dari state yang memiliki reducer dan action creators
const cartSlice = createSlice({
    name: "cart", // Nama slice
    initialState: [], // State awal berupa array kosong
    reducers: {
        // Reducer untuk menambah item ke cart
        addToCart(state, action) {
            state.push(action.payload); // Menambah item baru ke array cart
        },
    },
});

// Membuat store menggunakan configureStore
// Store menyimpan state global aplikasi
const store = configureStore({
    reducer: {
        cart: cartSlice.reducer, // Mendaftarkan reducer cart
    }
})

// Menampilkan state awal store
console.log("oncreate store : ", store.getState());

// Subscribe untuk memantau perubahan state
store.subscribe(() => {
    console.log("STORE CHANGE : ", store.getState()); // Log setiap perubahan state
})

// Dispatch action untuk menambah item ke cart
store.dispatch(cartSlice.actions.addToCart({id: 1, qty: 20})); // Menambah item pertama
store.dispatch(cartSlice.actions.addToCart({id: 2, qty: 10})); // Menambah item kedua