import { Role } from "../../entity/role"

export {}

declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

// declare global {
//   namespace Express {
//     interface Request {
//       user: {
//         id: number,
//         first_name: string,
//         last_name: string,
//         email: string,
//         role_id: number,
//         password: string
//       }
//     }
//   }
// }
