import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./ordersApi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderDetails from "./components/OrderDetails";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

function App() {
    return (
        <Router>
            <div>
                <Provider store={store}>
                        {/* a router that passes the orderId value from the url to the props*/}
                    <Routes>
                        <Route path="/:orderId" element={<OrderDetails />} />
                    </Routes>
                </Provider>
            </div>
        </Router>
    );
}

export default App;
