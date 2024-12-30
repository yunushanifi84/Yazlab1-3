"use client"
import React, { useLayoutEffect } from 'react'
import axios from 'axios'

export default function AdminLayout({ children }) {
    useLayoutEffect(() => {
        const token = localStorage.getItem('token')
        axios.post('/api/validation/check-token', { token: token }).then((res) => {
            if (res.status !== 200) redirect("/");
            return;
        }).catch((error) => {
            redirect("/")
        });
    }, [])

    return (
        children
    )
}
