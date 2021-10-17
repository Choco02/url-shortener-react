// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const simpleSanitize = (str: string) => str.replace(/[^\w:\/\/\.@#\-=?%]/gi, '')

const generateUrl = () => {
  return `${Math.floor(Math.random() * 200).toString(36)}${Date.now().toString(36)}`;
}

const status = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
}

type Data = {
  url?: string
  message?: string
}

type urlModel = {
  url: string
  short: string
}

const data: urlModel[] = [
    {
      url: 'https://www.youtube.com/watch?v=LLK4oaXUuLg',
      short: 'cookie'
    },
    {
      url: 'https://open.spotify.com/playlist/6hCnguf17Sm20PtOVJ2ltq',
      short: 'playlist'
    }
  ]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {

    const url: string = req.body.url
    const re = /(?:https?):\/\/[a-z0-9_-]+\.\w+.*/gi
    const customUrl = req.body.short ? simpleSanitize(req.body.short) : null as unknown as string

    // console.log(req.method)
    // console.log(req.url)
    // console.log(req.body)
    // console.log(data)

    if (!url) return res.status(status.NOT_FOUND).json({ message: 'Not Found' })
    if (!re.test(url)) {
      return res.status(status.BAD_REQUEST).json({ message: 'Bad Request' })
    }

    const createdUrls = data.map(a => a.short)

    if (url) {
      let short: string;
      if (!req.body.short) {
        short = generateUrl()
      }

      else if (createdUrls.includes(customUrl)) {
        let rand: number
        let currentCustom = customUrl
        while (createdUrls.includes(currentCustom)) {
          //@ts-ignore
          rand = parseInt(Math.random() * 1000)

          currentCustom = `${currentCustom}${rand}`
        }
        short = currentCustom
      }
      else short = customUrl

      const newUrl: urlModel = {
        url,
        short
      }
      
      data.push(newUrl)

      res.status(status.CREATED).json({ url: `http://${req.headers.host}/${newUrl.short}` })
    }
  }

  else if (req.method === 'GET') {
    const url = req.query.url as string

    const createdUrls = data.map(a => a.short)

    // console.log(req.method)
    // console.log('url: ', url)
    // console.log(createdUrls)

    if (!createdUrls.includes(url)) {
      return res.status(status.NOT_FOUND).json({ message: 'Not Found' })
    }

    res.status(status.OK).json({ url: (data.find(item => item.short === url) as urlModel).url })
  }
}
