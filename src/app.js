const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const PublicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(PublicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Finder'
    })
})

// app.get('/help', (req, res) => {
//     res.render('help', {
//         title: 'Help'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About'
//     })
// })

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({
            error : 'Please enter an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error)
        {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location
            })
        })
    })
})

app.get('*', (req, res) => {
    res.send('404 : Page Not Found!')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})