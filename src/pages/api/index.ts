import type { NextApiRequest, NextApiResponse } from 'next/types'
import { userDBDexie } from 'src/models/db/UserDB'

type ResponseData = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  //   res.status(200).json({ message: 'Hello from Next.js!' })
  await userDBDexie.saveToken('123122321').then(response => {
    console.log(response)
    res.redirect('/user')
  })
}
