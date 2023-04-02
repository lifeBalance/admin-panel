import axios from "axios"
import { ChangeEvent, Dispatch, SetStateAction } from "react"

function ImageUploader({setImage}: {setImage: Dispatch<SetStateAction<string>>}) {
  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    // console.log(e) // testing
    const files = e.target.files

    if (!files || files.length === 0) return

    const formData = new FormData()
    formData.append('image', files[0])
    const response = await axios.post('/upload', formData)
    console.log(response)

    setImage(response.data.url)
  }

  return (
    <label className='btn btn-primary'>
      Upload <input type='file' hidden onChange={e => handleUpload(e)}/>
    </label>
  )
}

export default ImageUploader
