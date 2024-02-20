// We need a seperate provider component to avoid making out layout component as client component from server component

"use client"

import { useRef } from "react";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

export default function StoreProvider({children,}: {children: React.ReactNode}) {

    const storeRef = useRef(store)

    // Checking if the store is already created or not. If not created then create a new store.
    if (!storeRef.current){
        storeRef.current = store // Initialize the store if it's not already initialized
    }

    // Pass the newly initialized store to the children of the provider
    return <Provider store={storeRef.current}>{children}</Provider>
}