import './styles.css'
import cartIcon from '../../assets/cart.svg'
import { useContext } from 'react'
import { ContextCartCount } from '../../utils/context-cart'

const CartIcon = () => {

    const {contextCartCount} = useContext(ContextCartCount)

    return (
    <div className="cart-icon">
        <img src={cartIcon} alt="Carrinho de compras" />
        {contextCartCount > 0 ? <div className="cart-count">{contextCartCount}</div> : <></>}
    </div>
  )
}

export default CartIcon