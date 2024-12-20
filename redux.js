// Import fungsi legacy_createStore dari Redux untuk membuat store
import { legacy_createStore } from "redux";

// Reducer - Fungsi untuk mengubah state berdasarkan action
// State awal berisi array cart dengan 1 item {id:1, qty:20}
const cartReducer = (
    state = {
        cart: [{id: 1, qty: 20}],
    },
    action 
) => {
    // Switch case untuk menangani berbagai jenis action
    switch(action.type) {
        case "ADD_TO_CART": // Jika action type adalah ADD_TO_CART
            return {
                ...state, // Spread operator untuk mempertahankan state lama
                cart: [...state.cart, action.payload], // Tambahkan item baru ke cart
            };
            default:
            return state; // Return state tanpa perubahan jika action tidak dikenali
    }
};


// Store - Tempat menyimpan state global
// Dibuat menggunakan fungsi legacy_createStore dengan cartReducer
const store = legacy_createStore(cartReducer);
console.log("oncreate store: ", store.getState()); // Log state awal


// Subscribe - Fungsi yang dijalankan setiap kali ada perubahan state
store.subscribe(() => {
    console.log("STORE CHANGE: ", store.getState()); // Log setiap perubahan state
})


// Dispatch - Mengirim action untuk mengubah state
// Membuat 2 action untuk menambah item ke cart
const action1 = {type: "ADD_TO_CART", payload: {id:2, qty: 20}}; // Action pertama
const action2 = {type: "ADD_TO_CART", payload: {id:10, qty: 5}}; // Action kedua
store.dispatch(action1); // Dispatch action pertama
store.dispatch(action2); // Dispatch action kedua