import express from 'express'
import path from 'path'

const PORT = process.env.PORT || 5000

express()
  // .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .get('/g/', (req, res) => res.json({method: "こんにちは、getさん"}))
  .post('/p/', (req, res) => res.json({method: "こんにちは、postさん"}))
  .post("/hook/", (req, res) => res.json({ test: "hook" }))// 追加
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
