const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
let ical = require('ical-generator')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')))
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')))

app.get('/calendar', (req, res) => res.sendFile(path.join(__dirname, 'views/calendar.html')))

app.get('/cal.ics', (req, res) => {
    res.set('Content-Type', 'text/calendar')
    fs.readFile('./dist/data/calendar.json', (err, data) => {
        if (err) throw err;
        let cal = ical(JSON.parse(data)).toString();  
        res.send(cal)
    })
})

app.get('/calendar/text', (req, res) => {
    res.set('Content-Type', 'text/plain')
    fs.readFile('./dist/data/calendar.json', (err, data) => {
        if (err) throw err;
        let cal = ical(JSON.parse(data)).toString();  
        res.send(cal)
    })
})

app.post('/calendar/add', urlencodedParser, (req, res) => {
    fs.readFile('./dist/data/calendar.json', (err, data) => {
        if (err) throw err;
        try {
            if (!data) return res.send('Data is null');
            data = JSON.parse(data);
            
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

            fs.writeFile('dist/data/calendar.json', JSON.stringify(myCal.toJSON(), null, 4), (err) => err ? console.error(err): false)
            res.redirect('/calendar');
        }
        catch(err) {
            res.send(`Uh oh! Please contact Binyamin, and tell him "${err}"`)
        }
    })
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