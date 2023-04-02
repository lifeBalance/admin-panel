import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'

function CreateProducts() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const response = await axios.post('/products', {
      title,
      description,
      image,
      price,
    })
    // console.log(response)

    if (response.statusText === 'Created') {
      navigate('/products')
    }
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form-create-role'>
        <h1 className='h3 mb-3 fw-normal'>Add New Product</h1>

        <div className='mb-3'>
          <label htmlFor='roleName'>Title</label>
          <input
            type='text'
            value={title}
            className='form-control'
            id='roleName'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='roleName'>Description</label>
          <input
            type='text'
            value={description}
            className='form-control'
            id='roleName'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='roleName'>Image</label>
          <input
            type='text'
            value={image}
            className='form-control'
            id='roleName'
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='roleName'>Price</label>
          <input
            type='number'
            value={price}
            className='form-control'
            id='roleName'
            onChange={(e) => setPrice(e.target.valueAsNumber)}
          />
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

export default CreateProducts
