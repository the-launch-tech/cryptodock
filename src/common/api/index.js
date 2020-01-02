import express from 'express'

export default function() {
  const Api = express()
  const PORT = 1337

  Api.get('/products/:id?/:fields?', (req, res) => {
    res.json({ msg: 'Success Testing' })
  })

  Api.get('/exchanges/:id?/:fields?', (req, res) => {
    res.json({ msg: 'Success Testing' })
  })

  Api.listen(PORT, () => {
    console.log('Server Running For CryptoDockApi At: ' + PORT)
  })
}
