import { Link, useNavigate } from 'react-router-dom'
import { OrderDTO } from '../../../models/Order'
import * as cartService from '../../../services/cartService'
import './styles.css'
import { useState, useContext } from 'react'
import { ContextCartCount } from '../../../utils/context-cart'
import { placeOrderRequest } from '../../../services/order-service'


const Cart = () => {
    const [cart, setCart] = useState<OrderDTO>(cartService.getCart())
    const { setContextCartCount } = useContext(ContextCartCount)
    const navigate = useNavigate()

    const handleIncreaseItem = (productId: number) => {
        cartService.increaseItem(productId)
        setCart(cartService.getCart())
    }

    const handleDecreaseItem = (productId: number) => {
        cartService.decreaseItem(productId)
        const cart = cartService.getCart()
        setCart(cart)
        setContextCartCount(cart.items.length)
    }

    const handlePlaceOrderClick = () => {
        placeOrderRequest(cart)
        .then(response => {
            cartService.clearCart()
            setContextCartCount(0)
            navigate(`/confirmation/${response.data.id}`)
        })
    }
    return (
        <main>
            <section id="cart-container-section" className="dsc-container">
                {
                    cart?.items.length == 0 ?
                        <div>
                            <h2 className='dsc-section-title dsc-mb20'>Seu carrinho está vazio</h2>
                        </div>
                        :
                        <>
                            <div className="dsc-card dsc-mb20">
                                {cart.items.map(item => (
                                    <div className="dsc-cart-item-container dsc-line-bottom" key={item.productId}>
                                        <div className="dsc-cart-item-left">
                                            <img src={item.imgUrl} alt={item.name} />
                                            <div className="dsc-cart-item-description">
                                                <h3>{item.name}</h3>
                                                <div className="dsc-cart-item-quantity-container">
                                                    <div onClick={() => handleDecreaseItem(item.productId)} className="dsc-cart-item-quantity-btn">-</div>
                                                    <p>{item.quantity}</p>
                                                    <div onClick={() => handleIncreaseItem(item.productId)} className="dsc-cart-item-quantity-btn">+</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dsc-cart-item-right">
                                            R$ {item.subTotal.toFixed(2)}                            </div>
                                    </div>
                                ))}
                                <div className="dsc-cart-total-container">
                                    <h3>R$ {cart.total.toFixed(2)}</h3>
                                </div>
                            </div>
                        </>
                }
                <div className="dsc-btn-page-container">
                    <div onClick={handlePlaceOrderClick} className="dsc-btn dsc-btn-blue">
                        Finalizar pedido
                    </div>
                    <Link to={"/"}>
                    <div className="dsc-btn dsc-btn-white">
                        Continuar comprando
                    </div>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Cart