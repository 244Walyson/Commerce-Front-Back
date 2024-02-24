import { useNavigate, useParams } from 'react-router-dom'
import ButtonInverse from '../../../components/ButtonInverse'
import ButtonPrimary from '../../../components/ButtonPrimary'
import './styles.css'
import { ProductDTO } from '../../../models/ProductModel'
import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { findById } from '../../../services/productService'
import ProductDetailsCard from '../../../components/ProductDetailsCard'
import * as cartService from '../../../services//cartService'
import { ContextCartCount } from '../../../utils/context-cart'

const ProductDetails = () => {

  const navigate = useNavigate()
  const params = useParams()
  const [product, seProduct] = useState<ProductDTO>();
  const { setContextCartCount } = useContext(ContextCartCount)

  useEffect(() => {
    findById(Number(params.productId))
      .then(response => {
        seProduct(response.data)
      })
      .catch(() => {
        navigate("/")
      })
  }, [])

  const handleBuyClick = () => {
    if(product){
      cartService.addProduct(product)
      setContextCartCount(cartService.getCart().items.length)
      navigate("/cart")
    }
  }

  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {product && <ProductDetailsCard product={product}></ProductDetailsCard>}
        <div className="dsc-btn-page-container">
          <div onClick={handleBuyClick}><ButtonPrimary text="Compar"></ButtonPrimary></div>
          <Link to={"/"}><ButtonInverse text="Início"></ButtonInverse></Link>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails