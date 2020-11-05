import type { NextApiRequest, NextApiResponse } from 'next'

export default function hello (_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ text: 'Hello' })
}