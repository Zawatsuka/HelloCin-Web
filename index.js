const express = require('express')
const app = express()

const http = require('http');
const hostname = '127.0.0.1';
const port = 8000;

const fetch = require('node-fetch');
const handlebars = require('express-handlebars')
app.set('view engine','handlebars')

app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}))

// PAGE FILMS - API
app.get('/film', async function (req, res) {
  let film = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=2')
  .then(res=> res.json())
  .then(data => {return data})
  console.log(film);
res.render('film' , {
    layout : 'index' , 
    results:{
        film:film
      }
  })
})

// PAGE ACCUEIL
app.get('/', async function (req, res) {
    let filmAccueil = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=1')
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
    let seriesAccueil = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=1')
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
  res.render('main' , {
      layout : 'index' , 
      results:{
          filmAccueil:filmAccueil, 
          seriesAccueil:seriesAccueil
        }
    })
  })

// PAGE SERIES - API
app.get('/pageSeries', async function (req, res) {
  let series = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=2')
  .then(res=> res.json())
  .then(data => {return data})
  console.log(series);
res.render('pageSeries' , {
    layout : 'index' , 
    results:{
        series:series
      }
  })
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});

// MENU SIDEBAR
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}