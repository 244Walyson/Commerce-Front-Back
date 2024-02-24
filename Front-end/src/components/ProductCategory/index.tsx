import './styles.css'

type props = {
  name: string;
}
const ProductCategory = ({ name }: props) => {
  return (
    <div className="dsc-category-container">
    <div className="dsc-category">
        {name}
    </div>
</div>
  )
}

export default ProductCategory