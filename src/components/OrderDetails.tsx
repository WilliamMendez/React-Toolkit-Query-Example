import React, { useState } from "react";
import { useGetOrderByIdQuery, useCancelOrderByIdMutation } from "../ordersApi";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId || "");
    const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderByIdMutation();

    const [cancelled, setCancelled] = useState(false);

    const handleCancelOrder = async () => {
        try {
            await cancelOrder(orderId || "").then(() => {
                console.log("Order Cancelled successfully");
                setCancelled(true);
            });

        } catch (error) {
            console.error("Failed to cancel order:", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h1>Order Details</h1>
            {order && (
                <div style={{ alignItems: "center" }}>
                    <p>ID: {order.id}</p>
                    <p>Status: {order.status}</p>
                    <p>Amount: {order.amount}</p>
                    <p>Currency: {order.currency}</p>
                </div>
            )}
            {!cancelled && (
                <button onClick={handleCancelOrder} disabled={isCancelling}>
                    {isCancelling ? "Cancelling..." : "Cancel Order"}
                </button>
            )}
            {cancelled && <p>Order Cancelled successfully</p>}

        </div>
    );
};

export default OrderDetails;
