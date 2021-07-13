import React from 'react';
import s from './App.module.css';
import Checkout from './components/checkout/Checkout';
import CartItems from './components/cartitems/CartItems';
import Countries from './components/countries/Countries';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51JCRNLFDCbU0H1ns7CpYSMEAYlRm45RB3KWkN7oPBGdfwqfcPoAnRNQxtxyyY3WBeHO0NwWB5aCVcU9uSuXFeKqs00alf7pq0J')

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
    nombre: 'Clase de comunicación',
    precioDescuento: 14.30,
    precioOriginal: 16.99,
    moneda: 'USD'
  }
]

const moneda = 'USD';
const cuponDescuento = -7.30;

function App() {
  return (
    <>
      <div className={s.container}>
        <div className={s.left}>
          <p className={`${s.title} ${s.marginBottom}`}>Pagar</p>
          <p className={s.marginBottom}>Dirección de facturación</p>
          <div className={s.marginBottom}><Countries width={'100%'} /></div>
          <div className={s.marginBottom}>
            <input type="radio" id="html" name="fav_language" value="HTML" className={s.marginRight} checked /> Tarjeta de crédito
            {/* <input type="radio" id="own" name="propertyFilter" checked={property === 'own'} onChange={e => filter(e)} /> Show own dogs */}
          </div>
          <div className={s.marginBottom}>
            <input type="radio" id="css" name="fav_language" value="CSS" className={s.marginRight} /> PayPal
          </div>

          <Elements stripe={stripePromise}>
            <div><Checkout /></div>
          </Elements>
          <div className={`${s.displayBlock} ${s.marginBottom30}`}>
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" checked /> Recordar esta tarjeta
          </div>

          <p className={`${s.title} ${s.marginBottom}`}>Detalles del pedido</p>
          <CartItems clasesPorComprar={clasesPorComprar} />
        </div>
        <div className={s.right}>
          <p className={`${s.title} ${s.marginBottom}`}>Resumen</p>
          <div>
            <span className={s.label}>Precio original: </span>
            <span className={s.moneda}>{moneda}</span>
            <span className={s.precio}>{clasesPorComprar.map(e => e.precioDescuento).reduce((acum, e) => acum + e).toFixed(2)}</span>
          </div>
          <div>
            <span className={s.label}>Cupón de descuento: </span>
            <span className={s.moneda}>{moneda}</span>
            <span className={s.precio}>{cuponDescuento.toFixed(2)}</span>
          </div>
          <hr/>
          <div>
            <span className={s.labelTotal}>Total: </span>
            <span className={s.moneda}>{moneda}</span>
            <span className={s.precio}>{cuponDescuento.toFixed(2)}</span>
          </div>
          <p>
            Tus Clases Virtuales está obligado por ley a recaudar los impuestos sobre las transacciones
            de las compras realizadas en determinadas jurisdicciones fiscales.
          </p>
          <span >
            Al completar la compra, aceptas estas <Link to={`condicionesdeuso`}><span className={s.enlace}>Condiciones de uso</span></Link>
          </span>
        </div>
      </div>
    </>

  );
}

export default App;
