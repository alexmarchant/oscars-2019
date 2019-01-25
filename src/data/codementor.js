interface Nominee {
  id: number | string
  name: string
  image: string
  review: string
  film: string
  winner: boolean
}

interface Category {
  id: number | string
  title: string
  nominees: Nominee[]
}


const Category = require('../models/category')

app.get('/categories', async (req, res) => {
  const categories = await Category.fetchAll()

  res.json(categories)
})

app.post('/chosen/', async (req, res) => {
    const data = req.payload
    const user = User.findByJWT(req.headers.authentication)
    const chosen = new Chosen(data)

    try {
      await chosen.save()
      res.status(200).json(chosen.seralize())
    } catch (error) {
      res.status(403) // bad data
    }

})
