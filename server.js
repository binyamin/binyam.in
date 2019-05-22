const express = require('express')
const path = require('path')
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
let ical = require('ical-generator')

const app = express()

const devMode = false

devMode ? require('dotenv').config() : ''

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')))
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')))

app.get('/calendar', (req, res) => res.sendFile(path.join(__dirname, 'views/calendar.html')))

app.get('/cal.ics', (req, res) => {
    res.set('Content-Type', 'text/calendar')

    fetch('https://api.github.com/gists/1f645dcb9824446393d71dc7a513fb2e')
        .then(res => res.json())
        .then(json => {
            json = JSON.parse(json.files['calendar.json'].content)
            let cal = ical(json).toString();
            res.send(cal)
        })
        .catch(err => {throw err});
})

app.get('/cal.txt', (req, res) => {
    res.set('Content-Type', 'text/plain')
    
    fetch('https://api.github.com/gists/1f645dcb9824446393d71dc7a513fb2e')
        .then(res => res.json())
        .then(json => {
            json = JSON.parse(json.files['calendar.json'].content)
            let cal = ical(json).toString();
            res.send(cal)
        })
        .catch(err => {throw err});
})

app.post('/calendar/add', urlencodedParser, (req, res) => {
        fetch('https://api.github.com/gists/1f645dcb9824446393d71dc7a513fb2e')
            .then(res => res.json())
            .then(data => {
                // Parse data
                let bodyDesc = data.files['calendar.json'].description
                data = JSON.parse(data.files['calendar.json'].content)

                // Pass form data to calendar object
                let myCal = ical(data)
                let formData = req.body;
    
                let start = formData.evStartDate.split('-').concat(formData.evStartTime.split(':'));
                let end = formData.evEndDate.split('-').concat(formData.evEndTime.split(':'));
                let title = (formData.evType === 'bday') ? '🎂 '+ formData.evTitle : formData.evTitle
    
                myCal.createEvent({
                    timezone: 'America/New_York',
                    start: new Date(start[0], start[1]-1, start[2], start[3] || '0', start[4] || '0'),
                    end: new Date(end[0], end[1]-1, end[2], end[3] || '0', end[4] || '0'),
                    allDay: formData.evAllday,
                    repeating: formData.evYearly ? {freq: "YEARLY"} : null,
                    summary: title,
                    description: formData.evDesc,
                    location: formData.evLoc
                })
    
                // Parse data for storage
                data = JSON.stringify(myCal.toJSON(), null, 2)
  
                let body = {
                    description: bodyDesc,
                    files: {
                        "calendar.json": {
                            filename: "calendar.json",
                            content: data
                        }
                    }
                }

                body = JSON.stringify(body)

                // Patch data to https://gist.github.com 
                fetch('https://api.github.com/gists/1f645dcb9824446393d71dc7a513fb2e', {
                    method: 'PATCH',
                    body: body,
                    headers: {
                      Authorization: 'token ' + process.env.gist_access_token
                    }
                })
                .then(resp => {
                    // Redirect user
                    if(resp.ok) {
                        res.redirect('/calendar');
                    } else {
                        console.log(resp)
                        res.send('Uh oh! Please contact Binyamin and tell him that an error has occurred')
                    }
                })
            })
            .catch(err => {throw err});
})


// Redirects
app.get('/index', (req, res) => res.redirect('/'))

// 404 handling
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

// Error handling
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))