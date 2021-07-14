
import React from 'react';
import { CardElement, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'; //useStripe
import s from './Checkout.module.css'
import { useEffect, useState } from 'react';
import loadingGif from '../../images/loadingGif.gif';
import { Elements } from '@stripe/react-stripe-js';
import { lockClosedOutline } from 'ionicons/icons';
import { IonIcon, IonLabel, IonText } from '@ionic/react';

const ErrorMessage = ({ children }) => (
    <><small className={s.error}>{children}</small><br /></>
);

export default function Checkout() {
    // const stripe = useStripe();
    const elements = useElements();
    // const [selected, setSelected] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(false);
    const [selectedExpire, setSelectedExpire] = useState(false);
    const [selectedCvc, setSelectedCvc] = useState(false);
    // const [error, setError] = useState()
    const [errorNumber, setErrorNumber] = useState()
    const [errorExpire, setErrorExpire] = useState()
    const [errorCvc, setErrorCvc] = useState()


    const [cargadoCompleto, setCargadoCompleto] = useState(false);

    const [recordarTarjeta, setRecordarTarjeta] = useState(true);
    function recordar(e) {
        if (e.target.checked) return setRecordarTarjeta(true)
        setRecordarTarjeta(false);
    }

    const [metodoPago, setMetodoPago] = useState('tarjeta');




    function selectPayment(e) {
        if (e.target.id === 'tarjeta') return setMetodoPago('tarjeta');
        setMetodoPago('paypal')
    }

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: elements.getElement(CardElement)
    //     })
    // }
    //

    // function actualizarCargado() {
    //     setCargadoCompleto(true)
    // }

    // let card = elements.getElement('card');

    // useEffect(() => {
    //     if (elements && elements.getElement('card')) {
    //         actualizarCargado()
    //         let card = elements.getElement(CardElement);
    //         card.on('focus', function () {
    //             setSelected(true)
    //         });
    //         card.on('blur', function () {
    //             setSelected(false)
    //         })
    //     }
    // }, [elements])




    return (
        // <>
        //  {cargadoCompleto ?
        <>
            <div style={cargadoCompleto ? { display: 'block' } : { display: 'none' }}>
                <div className={s.marginBottom}>
                    <input type="radio" id="tarjeta" name="metodoPago" className={s.marginRight} onChange={e => selectPayment(e)} checked={metodoPago === 'tarjeta'} /> Tarjeta de crédito
                    <input type="radio" id="paypal" name="metodoPago" className={s.marginLeftRight} onChange={e => selectPayment(e)} checked={metodoPago === 'paypal'} /> PayPal
                </div>
                <div className={s.paymentSection}>

                    {metodoPago === 'tarjeta' ?
                        <>
                            {/* <div className={`${s.marginBottom} ${selected ? `${s.cardInput} ${s.cardInputSelected}` : `${s.cardInput}`}`}><CardElement onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} onReady={() => setCargadoCompleto('true')} onChange={e => setError(e.error)}/></div> */}
                            <label for="cardNumber" className={s.labelPaymentInput}>Número de tarjeta</label>
                            <div className={`${s.marginBottom} ${selectedNumber ? `${s.cardInput} ${s.cardInputSelected}` : `${s.cardInput}`}`} id="cardNumber"><CardNumberElement onFocus={() => setSelectedNumber(true)} onBlur={() => setSelectedNumber(false)} onReady={() => setCargadoCompleto('true')} onChange={e => setErrorNumber(e.error)} /></div>
                            {errorNumber && <ErrorMessage>{errorNumber.message}</ErrorMessage>}
                            <div className={s.row}>
                                <div className={s.mitadUno}>
                                    <label for="cardExpire" className={s.labelPaymentInput}>MM / AA</label>
                                    <div className={`${s.marginBottom} ${selectedExpire ? `${s.cardInput} ${s.cardInputSelected}` : `${s.cardInput}`}`} id="cardExpire"><CardExpiryElement options={{ placeholder: '12 / 25' }} onFocus={() => setSelectedExpire(true)} onBlur={() => setSelectedExpire(false)} onReady={() => setCargadoCompleto('true')} onChange={e => setErrorExpire(e.error)} /></div>
                                    {errorExpire && <ErrorMessage>{errorExpire.message}</ErrorMessage>}
                                </div>
                                <div className={s.mitadDos}>
                                    <label for="cardCvc" className={s.labelPaymentInput}>CVC</label>
                                    <div className={`${s.marginBottom} ${selectedCvc ? `${s.cardInput} ${s.cardInputSelected}` : `${s.cardInput}`}`} id="cardCvc"><CardCvcElement options={{ placeholder: '123' }} onFocus={() => setSelectedCvc(true)} onBlur={() => setSelectedCvc(false)} onReady={() => setCargadoCompleto('true')} onChange={e => setErrorCvc(e.error)} /></div>
                                    {errorCvc && <ErrorMessage>{errorCvc.message}</ErrorMessage>}
                                </div>
                            </div>
                            <div className={`${s.displayBlock} ${s.marginBottom}`}>
                                <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" checked={recordarTarjeta} onChange={e => recordar(e)} /> Recordar esta tarjeta
                            </div>
                        </>
                        :
                        <p className={s.marginBottom}>Para completar la transacción, te enviaremos a los servidores seguros de PayPal.</p>
                    }
                    <div className={s.secureDescription}>

                        <IonIcon icon={lockClosedOutline} className={s.iconDumb}></IonIcon>
                        <span className={s.textDumb}>Conexión segura</span>
                    </div>
                </div>
            </div>
            <div style={!cargadoCompleto ? { display: 'block' } : { display: 'none' }} className={s.loadingGifContainer}>
                <img src={loadingGif} alt="Loading Gif" className={s.loadingGif} />
            </div>
        </>
        //         :
        //         <div>
        //             <h1>CARGANDO</h1>
        //             {/* <img src="../../images/loadingGif.gif"></img> */}
        //         </div>
        //     }
        // </>
    )
}