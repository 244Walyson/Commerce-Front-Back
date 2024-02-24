import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.css'
import { uploadImage } from '../../services/productService'

type props = {
  onUploadImage: (imgUrl: string) => void;
}

function MyDropzone({onUploadImage}: props) {

  const [ImgUrl, setImgUrl] = useState()

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    setImgUrl(URL.createObjectURL(file))

    uploadImage(file)
    .then(response => {
      onUploadImage(response.data.uri)
      console.log(response.data.uri)
    }).catch(error => {
      console.log(error)
    })
  }, [ImgUrl])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className='form-drag-drop' {...getRootProps()}>
      <input {...getInputProps()} />
     <div>
     {
        isDragActive ?
          <div className="drop-files">Drop sua imagem aqui...</div> :
          <div className="drop-files">Arraste sua imagem ate aqui, ou click para selecionar</div>
      }
     </div>
      <div>{ImgUrl &&
        <img className='dsc-image-preview' src={ImgUrl}></img>
      }</div>
    </div>
  )
}

export default MyDropzone