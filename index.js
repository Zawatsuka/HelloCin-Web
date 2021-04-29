const express = require('express')
const app = express()

const fetch = require('node-fetch');
const handlebars = require('express-handlebars')

app.set('view engine','handlebars')

app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  // layoutsDir: __dirname + '/views/partials',
}))

app.get('/', async function (req, res) {
    let film = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=1')
    .then(res=> res.json())
    .then(data => {
      let array= []
      data.results.map((item,index)=>{
        if(index<12){
          array.push(item)
        }
      })
        
      return array
    })
    let series = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=1')
    .then(res=> res.json())
    .then(data => {
      let array= []
      data.results.map((item,index)=>{
        if(index<12){
          array.push(item)
        }
      })
        
      return array
    })
    console.log(film);
  res.render('main' , {
      layout : 'index' , 
      results:{
          film:film, 
          series:series
        }
    })
 })

 app.get('/movieDetail/:id', async function (req, res){
  let id = req.params.id;
  console.log(id);
  let movieDetail = await fetch('https://api.themoviedb.org/3/movie/'+ id +'?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR')
    .then(res=> res.json())
    .then(data => {
      return data
    })
    console.log(movieDetail);
  res.render('movieDetail' , {
      layout : 'index' ,
       movieDetail:movieDetail
    })
 })

 app.use(express.static('public'))


app.listen(8080 , function(){
  console.log('c\'est ok !')
})
