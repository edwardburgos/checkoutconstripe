import React from 'react';
import s from './App.module.css';
import CartItems from './components/cartitems/CartItems';
import Countries from './components/countries/Countries';
import Checkout from './components/checkout/Checkout';
import { Link } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const clasesPorComprar = [
  {
    id: 8,
    imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    nombre: 'Clase de matemáticas',
    precioDescuento: 14.30,
    precioOriginal: 16.99,
    moneda: 'USD'
  },
  {
    id: 56,
    imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    nombre: 'Clase de comunicación',
    precioDescuento: 14.30,
    precioOriginal: 16.99,
    moneda: 'USD'
  },
  {
    id: 63,
    imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    nombre: 'Clase de inglés',
    precioDescuento: 14.30,
    precioOriginal: 16.99,
    moneda: 'USD'
  }
]
const moneda = 'USD';


function App() {

  const stripePromise = loadStripe('pk_test_51JCRNLFDCbU0H1ns7CpYSMEAYlRm45RB3KWkN7oPBGdfwqfcPoAnRNQxtxyyY3WBeHO0NwWB5aCVcU9uSuXFeKqs00alf7pq0J')

  function roundTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }
  const precioOriginal = roundTwo(clasesPorComprar.map(e => e.precioOriginal).reduce((acum, e) => acum + e));
  const total = roundTwo(clasesPorComprar.map(e => e.precioDescuento).reduce((acum, e) => acum + e));
  const descuento = roundTwo(precioOriginal - total);


  return (
    <>
      <div className={s.container}>
        <div className={s.left}>
          <p className={`${s.title} ${s.marginBottom}`}>Pagar</p>
          <p className={s.marginBottom}>Dirección de facturación</p>
          <div className={s.marginBottom}><Countries width={'100%'} /></div>
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
          <p className={`${s.title} ${s.marginBottom}`}>Detalles del pedido</p>
          <CartItems clasesPorComprar={clasesPorComprar} />
        </div>
        <div className={s.right}>
          <p className={`${s.title} ${s.marginBottom}`}>Resumen</p>
          <div>
            <span className={s.label}>Precio original: </span>
            <span className={s.moneda}>{moneda}</span>
            <span className={s.precio}>{precioOriginal.toFixed(2)}</span>
          </div>
          <div>
            <span className={s.label}>Cupón de descuento: </span>
            <span className={s.moneda}>{moneda}</span>
            <span className={s.precio}>-{descuento.toFixed(2)}</span>
          </div>
          <hr />
          <div>
            <span className={s.labelTotal}>Total: </span>
            <span className={s.moneda}>{moneda}</span>
            <span className={s.precio}>{total.toFixed(2)}</span>
          </div>
          <p>
            Tus Clases Virtuales está obligado por ley a recaudar los impuestos sobre las transacciones
            de las compras realizadas en determinadas jurisdicciones fiscales.
          </p>
          <p>
            Al completar la compra, aceptas estas <Link to={`condicionesdeuso`} style={{ textDecoration: 'none', fontWeight: 600 }}>Condiciones de uso</Link>
          </p>
          <button className={s.payButton}>Pagar</button>
        </div>
      </div>
    </>

  );
}

export default App;
