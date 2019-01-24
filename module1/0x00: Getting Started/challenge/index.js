'use-strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const keys = [
    { 'key': 'Htlypjhuvz', 'word': 'Americanos' },
    { 'key': 'Gmhehi', 'word': 'Cidade' },
    { 'key': 'Xmdmzvm', 'word': 'Laranja' },
    { 'key': 'Euynaxa', 'word': 'Simbolo' },
    { 'key': 'Xsbkqroxp', 'word': 'Aventuras' },
    { 'key': 'Yhuphokr', 'word': 'Vermelho' },
    { 'key': 'Otlfitw', 'word': 'Jogador' },
    { 'key': 'Hqzgj if qzyf', 'word': 'Clube' },
    { 'key': 'Tlahtvymvzl', 'word': 'Metamorfose' }
]

/* body parser configuration */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/v1/key', (req, res) => {

    /* validation */
    if (!req.query.email || req.query.email.indexOf('@') < 0 && req.query.email.indexOf('.'))
        return res.status(401).json({'error': true, 'message': 'you must provide an valid mail.'})
    if (req.headers.host !== 'pombo.ctf')
        return res.status(401).json({'error': true, 'message': 'wrong host.'})

    return res.status(200).json({'api_key': keys[Math.floor(Math.random() * keys.length)].key})
})

app.post('/v1/login', (req, res) => {

    /* validation */
    if (req.headers.host !== 'pombo.ctf')
        return res.status(401).json({'error': true, 'message': 'wrong host.'})       
    if (!req.body.word || !req.body.api_key)
        return res.status(401).json({'error': true, 'message': 'missing parameters information.'})


    /* search for the content */
    for (i = 0; i < keys.length - 1; i++)
        if (keys[i].key === req.body.api_key && keys[i].word === req.body.word)
            return res.status(200).json({ 'flag': 'POMBO{I_know_sOm3_W3B_stUFF}' })

    return res.status(401).json({ 'error': 'true', 'message': 'wrong solution.' })
})



/* start server */
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
	console.log('to exit: ctrl + c')
})