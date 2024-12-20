import { useEffect, useState } from 'react'
import { getUsername } from '../../services/auth.services';

export const useLogin = () => {
    // Membuat state username dengan nilai awal string kosong
    const [username, setUsername] = useState("");

    // useEffect yang dijalankan sekali saat komponen dimount
    useEffect(() => {
        // Mengambil token dari localStorage
        const token = localStorage.getItem("token");
        // Jika token ada
        if (token) {
            // Set username dengan hasil decode token menggunakan fungsi getUsername
            setUsername(getUsername(token));
        } else {
            // Jika tidak ada token, redirect ke halaman login
            window.location.href = "/login";
        }
    }, [])
    // Mengembalikan nilai username
    return username;
}
