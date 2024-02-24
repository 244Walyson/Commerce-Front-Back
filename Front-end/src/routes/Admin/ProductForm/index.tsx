import { useNavigate, useParams } from 'react-router-dom'
import './styles.css'
import ButtonInverse from '../../../components/ButtonInverse'
import FormImput from '../../../components/FormInput'
import { dirtyAndValidate, dirtyAndValidateAll, hasAnyInvalid, toDirtyAll, toValues, update, updateAll, updateAndValidate, validate, validateAll } from '../../../utils/forms'
import { useState, useEffect } from 'react'
import { createProduct, findById, getCategories, updateProduct } from '../../../services/productService'
import FormTextArea from '../../../components/FormTextArea'
import { Category } from '../../../models/CategoryModel'
import FormSelect from '../../../components/FormSelect'
import { selectStyles } from '../../../utils/select'
import MyDropzone from '../../../components/MyDropzone'

const ProductsForm = () => {

  const navigate = useNavigate()
  const params = useParams()
  const [options, setOptions] = useState<Category[]>([])
  const [imgUrl, setImgUrl] = useState('')
  const[dataLoaded, setDataLoaded] = useState(false)


  const isEditing = params.productId !== 'create';


  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "nome do produto",
      validation: function (value: string) {
        return /^.{3,80}$/.test(value)
      },
      message: "o nome deve conter entre 3 e 80 caracteres"
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "preço",
      validation: function (value: number) {
        return value > 0;
      },
      message: "Favor informar um valor positivo",
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "imagem",
    },
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function (value: string) {
        return /^.{10,}$/.test(value)
      },
      message: "A descrição deve conter pelo menos 10 caracters",
    },
    categories: {
      value: [],
      id: "categories",
      name: "categories",
      placeholder: "Categorias",
      validation: function (value: Category[]){
        return value.length > 0;
      },
      message: "selecione ao menos uma categoria"
    }
})

  const hanldeCancelCreateClick = () => {
    navigate('/admin/products')

  }

  const handleInputChange = (e) => {
    setFormData(updateAndValidate(formData, e.target.name, e.target.value))
  }

  useEffect(() => {
    if (isEditing) {
      findById(Number(params.productId))
        .then(response => {
          setFormData(updateAll(formData, response.data))
          setDataLoaded(true)
        })
    }
    else{
      setDataLoaded(true)
    }
  }, [])

  useEffect(() => {
    getCategories()
    .then(response => {
      setOptions(response.data)
    })
  }, [])

  useEffect(()=> {
    if(dataLoaded){
      setFormData(update(formData, "imgUrl", imgUrl))
    }
  }, [dataLoaded, imgUrl])

  const handleInputTurnDirty = (name: string) => {
    setFormData(dirtyAndValidate(formData, name))
  }

  const handleSelectForm = (obj: []) => {
    setFormData(updateAndValidate(formData, "categories", obj));
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formValidated = dirtyAndValidateAll(formData)
    if(hasAnyInvalid(formValidated)){
      setFormData(formValidated)
    }
    else{

      const request = isEditing 
      ? updateProduct(Number(params.productId), toValues(formData))
      : createProduct(toValues(formData));

      request.then(() => navigate("/admin/products"))
    }
    
  }

  const handleUploadImage = (imgUrl: string) => {
    if(imgUrl){
      setImgUrl(imgUrl)
    }
    else{
      console.log("errinho basico")
      dirtyAndValidate(formData, "imgUrl")
    }
  }

  return (
    <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form onSubmit={handleSubmit} className="dsc-card dsc-form">
            <h2>Dados do produto</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormImput onTurnDirty={handleInputTurnDirty} onChange={handleInputChange} {...formData.name} className="dsc-form-control" />
                <div className='dsc-form-error'>{formData.name.message}</div>
              </div>
              <div>
                <FormImput onTurnDirty={handleInputTurnDirty} onChange={handleInputChange} {...formData.price} className="dsc-form-control" />
                <div className='dsc-form-error'>{formData.price.message}</div>
              </div>
              <div>
                <FormSelect styles={selectStyles} className='dsc-form-control dsc-form-select-container' {...formData.categories} onChange={(obj) => handleSelectForm(obj)} isMulti options={options} getOptionLabel={(obj) => obj.name} getOptionValue={(obj) => String(obj.id)} onTurnDirty={handleInputTurnDirty}></FormSelect>
                <div className='dsc-form-error'>{formData.categories.message}</div>
              </div>
              <div>
                <div className="image-upload-form"><MyDropzone onUploadImage={handleUploadImage}></MyDropzone></div>
                {/* <FormImput onTurnDirty={handleInputTurnDirty} onChange={handleInputChange} {...formData.imgUrl} className="dsc-form-control" /> */}
              </div>
              <div>
                <FormTextArea onChange={handleInputChange} className="dsc-form-control dsc-textarea" onTurnDirty={handleInputTurnDirty} {...formData.description}></FormTextArea>
                <div className='dsc-form-error'>{formData.description.message}</div>
              </div>
            </div>

            <div className="dsc-product-form-buttons">
              <div onClick={hanldeCancelCreateClick}><ButtonInverse text='Cancelar'></ButtonInverse></div>
              <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default ProductsForm