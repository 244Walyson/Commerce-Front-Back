import { useState, useEffect } from 'react'
import { OrderDTO } from '../../../models/Order'
import { useParams } from 'react-router-dom';
import { findByIdRequest } from '../../../services/order-service';
import { Link } from 'react-router-dom';
import "./styles.css"

const Confirmation = () => {

    const params = useParams();

    const [order, setOrder] = useState<OrderDTO>();

    useEffect(()=>{
        findByIdRequest(Number(params.orderId))
        .then(response => {
            setOrder(response.data)
        })
    }, [])

    return (
        <main>
            <section id="confirmation-section" className="dsc-container">
                <div className="dsc-card dsc-mb20">
                    {
                        order?.items.length == 0 ?
                            <div>
                                <h2 className='dsc-section-title dsc-mb20'>Seu carrinho está vazio</h2>
                            </div>
                            :
                            <>
                                <div className="dsc-card dsc-mb20">
                                    {order?.items.map(item => (
                                        <div className="dsc-cart-item-container dsc-line-bottom" key={item.productId}>
                                            <div className="dsc-cart-item-left">
                                                <img src={item.imgUrl} alt={item.name} />
                                                <div className="dsc-cart-item-description">
                                                    <h3>{item.name}</h3>
                                                    <div className="dsc-cart-item-quantity-container">
                                                        <p>{item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dsc-cart-item-right">
                                                R$ {item.subtotal.toFixed(2)}                            
                                            </div>
                                        </div>
                                    ))}
                                    <div className="dsc-cart-total-container">
                                        <h3>R$ {order?.total.toFixed(2)}</h3>
                                    </div>
                                </div>
                            </>
                    }
                </div>
                <div className="dsc-confirmation-message dsc-mb20">
                    Pedido realizado! Número {order?.id}
                </div>
                <div className="dsc-btn-page-container">
                    <Link to={"/"}>
                    <div className="dsc-btn dsc-btn-white">
                        Início
                    </div>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Confirmation