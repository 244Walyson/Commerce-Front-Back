import './styles.css'
import SearchBar from '../../../components/SearchBar'
import CatalogCard from '../../../components/CatalogCard'
import ButtonNextPage from '../../../components/ButtonNextPage'
import { ProductDTO } from '../../../models/ProductModel'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { findPageRequest } from '../../../services/productService'

type QueryParams = {
  page: number;
  name: string;
}

const Catalog = () => {

  const [product, setProducts] = useState<ProductDTO[]>()
  const [QueryParams, setQueryParams] = useState<QueryParams>({page: 0, name: ""})
  const [isLastPage, setIsLastPage] = useState(false)

  useEffect(() => {
   findPageRequest(QueryParams.page, QueryParams.name)
    .then(response => {
      const nextPage = response.data.content
      if(product){
      setProducts(product.concat(nextPage))
      }
      else{
      setProducts(response.data.content)
      }
      setIsLastPage(response.data.last)
    })
  }, [QueryParams])

  const handleClickNextPage = () => {
      setQueryParams({...QueryParams, page: (QueryParams.page + 1)})
  }

  const handleSearch = (value: string) => {
    setProducts([])
    setQueryParams({...QueryParams, name: value, page: 0})
  }

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar onsearchValue={handleSearch}></SearchBar>

        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
          {product && product.map((item) => (
            <Link to={`/product-details/${item.id}`} key={item.id}><CatalogCard product={item}></CatalogCard></Link>
          ))}
        </div>
        {!isLastPage && <div onClick={handleClickNextPage}><ButtonNextPage></ButtonNextPage></div>}
      </section>
    </main>
  )
}

export default Catalog