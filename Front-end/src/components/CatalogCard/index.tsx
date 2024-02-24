import './styles.css'

type prop = {
  product: ProductDTO;
}
const CatalogCard = ({ product }: prop) => {
  return (
    <div className="dsc-card" key={product.id}>
              <div className="dsc-catalog-card-top dsc-line-bottom">
              <img src={product.imgUrl} alt="Computer" />
            </div>
            <div className="dsc-catalog-card-bottom">
              <h3>R$ {product.price}</h3>
              <h4>
               {product.name}
              </h4>
            </div>
          </div>
  )
}

export default CatalogCard