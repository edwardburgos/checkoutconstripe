
import React from 'react'; 
import { CardElement, useElements } from '@stripe/react-stripe-js'; //useStripe
import s from './Checkout.module.css'
import { useEffect, useState } from 'react';

export default function Checkout() {
    // const stripe = useStripe();
    const elements = useElements();
    const [selected, setSelected] = useState();

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: elements.getElement(CardElement)
    //     })
    // }

   useEffect(()=> {
    if (elements && elements.getElement(CardElement)) {
        let card = elements.getElement(CardElement);
        card.on('focus', function() {
            setSelected(true)
        });
        card.on('blur', function() {
            setSelected(false)
        })
    }
   })
   

    return (
            <div className={`${s.marginBottom} ${selected ? `${s.cardInput} ${s.cardInputSelected}` : `${s.cardInput}`}`}><CardElement/></div>
    )
}