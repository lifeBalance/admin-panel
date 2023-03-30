import { RequestHandler, Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { extname } from 'path'

// export const UploadImage: RequestHandler = async (req, res) => {
//   res.status(200).json({
//     url: `http://localhost:3000/api/uploads/${req.file?.filename}`
//   })
// }
export const UploadImage: RequestHandler = async (req, res) => {
  type FileNameCallback = (error: Error | null, filename: string) => void

  const storage = multer.diskStorage({
    destination: './uploads',
    filename: (_: Request, file: Express.Multer.File, callback: FileNameCallback) => {
      const randomName = Math.random().toString(20).substring(2, 12)

      callback(null, `${randomName}${extname(file.originalname)}`)
    },
  })

  const upload = multer({ storage }).single('image')
  upload(req, res, (err) => {
    if (err)
      return res.status(400).json({error: err})

    res.status(200).json({
      url: `http://localhost:3000/api/uploads/${req.file?.filename}`
    })
  })
}
