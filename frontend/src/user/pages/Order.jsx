import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import useRazorpay from "react-razorpay";
import axios from "axios";
function Order() {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    //const Razorpay = useRazorpay();
    const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get("http://www.localhost:5000/api/payment/getkey")

        const { data: { order } } = await axios.post("http://localhost:5000/api/payment/checkout", {
            amount
        })

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "6 Pack Programmer",
            description: "Tutorial of RazorPay",
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: order.id,
            callback_url: "http://localhost:5000/api/payment/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

  return (
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary"  onClick={() => checkoutHandler(1)}>order</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}

export default Order;