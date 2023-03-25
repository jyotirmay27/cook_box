import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import useRazorpay from "react-razorpay";

function Order() {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const Razorpay = useRazorpay();
    const checkoutHandler = async (amount) => {

        console.log(amount);
        const key = await sendRequest(
            'http://www.localhost:5000/api/getkey'
          );
        //const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")
            console.log(key);
        const order =await sendRequest(
            'http://www.localhost:5000/api/checkout',
            'Post',
            JSON.stringify({
            amount
            }),
            {
                'Content-Type': 'application/json'
              }
          );
            console.log(order.order);
        const options = {
            key : key.key,
            amount: order.order.amount,
            currency: "INR",
            name: "Ok",
            description: "Tutorial of RazorPay",
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: order.id,
            callback_url: "http://localhost:5000/api/paymentverification",
            prefill: {
                name: "Jyotirmay Jain",
                email: "jj@example.com",
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
        <Button variant="primary"  onClick={() => checkoutHandler(3000)}>order</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}

export default Order;