import { ProductDTO } from '../../models/ProductModel'
import ProductCategory from '../ProductCategory'
import './styles.css'

type props = {
  product: ProductDTO | undefined;
}

const ProductDetailsCard = ({product}: props) => {

  const item = product;

  return (
          <div className="dsc-card dsc-mb20">
          <div className="dsc-product-details-top dsc-line-bottom">
            <img src={item?.imgUrl} alt="Computador" />
          </div>
          <div className="dsc-product-details-bottom">
            <h3>R$ {item && item.price}</h3>
            <h4>{item && item.name}</h4>
            <p>{item && item.description}</p>
            <div className="categories">
              {item &&
                item.categories.map(item =>(
                  <ProductCategory key={item.id} name={item.name}></ProductCategory>
                ))
              }
            </div>
          </div>
        </div>
        
  )
}

export default ProductDetailsCard