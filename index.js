const express = require('express')
const app = express()

const http = require('http');
const hostname = '127.0.0.1';
const port = 8000;

const fetch = require('node-fetch');
const handlebars = require('express-handlebars')
app.set('view engine', 'handlebars')

app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}))

// PAGE FILMS - API
app.get('/film', async function (req, res) {
  let film = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=2')
    .then(res => res.json())
    .then(data => {
      return data
    })
  console.log(film);
  res.render('film', {
    layout: 'index',
    results: {
      film: film
    }
  })
})

// PAGE ACCUEIL avec film et serie
app.get('/', async function (req, res) {
  let filmAccueil = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=1')
    .then(res => res.json())
    .then(data => {
      let array = []
      data.results.map((item, index) => {
        if (index < 12) {
          array.push(item)
        }
      })

      return array
    })
  let seriesAccueil = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=1')
    .then(res => res.json())
    .then(data => {
      let array = []
      data.results.map((item, index) => {
        if (index < 12) {
          array.push(item)
        }
      })

      return array
    })
  res.render('main', {
    layout: 'index',
    results: {
      filmAccueil: filmAccueil,
      seriesAccueil: seriesAccueil
    }
  })
})

// PAGE SERIES - API
app.get('/pageSeries', async function (req, res) {
  let series = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&page=2')
    .then(res => res.json())
    .then(data => {
      return data
    })
  console.log(series);
  res.render('pageSeries', {
    layout: 'index',
    results: {
      series: series
    }
  })
})
// 
// page pour un film et sa vidéo
app.get('/movieDetail/:id', async function (req, res) {
  let id = req.params.id;
  console.log(id);
  let movieDetail = await fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR')
    .then(res => res.json())
    .then(data => {
      return data
    })
  let video = await fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR')
    .then(res => res.json())
    .then(data => {
      let array = []
      data.results.map((item, index) => {
        if (index < 1) {
          array.push(item)
        }
      })
      return array
    })

  console.log(movieDetail);
  // console.log(movieDetail);
  res.render('movieDetail', {
    layout: 'index',
    movieDetail: movieDetail,
    video: video
  })
})


// page pour une serie 
app.get('/serieDetail/:id', async function (req, res) {
  let id = req.params.id;
  console.log(id);
  let serieDetail = await fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&append_to_response=videos')
    .then(res => res.json())
    .then(data => {
      return data
    })
  console.log(serieDetail);
  res.render('serieDetail', {
    layout: 'index',
    serieDetail: serieDetail
  })
})

// page de recherche accueil
app.get('/search', async function (req , res) {
  let search = req.query.search
  let searchResults = await fetch('https://api.themoviedb.org/3/search/multi?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&query='+ search)
  .then(res => res.json())
  .then(data => {
    return data
  })
  console.log(searchResults);
  res.render('search', {
    layout: 'index',
    searchResults:searchResults
  })
})

// page de recherche film
app.get('/searchMovie', async function (req , res) {
  let search = req.query.search
  let searchResultsMovie = await fetch('https://api.themoviedb.org/3/search/movie?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&query='+ search)
  .then(res => res.json())
  .then(data => {
    return data
  })
  console.log(searchResultsMovie);
  res.render('searchMovie', {
    layout: 'index',
    searchResultsMovie:searchResultsMovie
  })
})

// page de recherche serie
app.get('/searchTv', async function (req , res) {
  let search = req.query.search
  let searchResultsTV = await fetch('https://api.themoviedb.org/3/search/tv?api_key=cc84c0cda5d0bb9fdfcac00232f640f5&language=fr-FR&query='+ search)
  .then(res => res.json())
  .then(data => {
    return data
  })
  console.log(searchResultsTV);
  res.render('searchSearch', {
    layout: 'index',
    searchResultsTV:searchResultsTV
  })
})

// page de mention

app.get('/mention', function (req, res) {
  res.render('mention' , {layout : 'index'})
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