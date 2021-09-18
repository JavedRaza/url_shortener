const express  = require('express')
const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrl')
const app = express()


mongoose.connect('mongodb://localhost/shorturl',{
    useNewUrlParser:true ,useUnifiedTopology:true
})



app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/' , async(req,res)=>{
    const  shortUrls = await shortUrl.find()
    // console.log(shortUrls)
     res.render('index' , {shortUrls : shortUrls})
})
app.post('/shorturl' ,async (req,res)=>{
     await shortUrl.create({full:req.body.url})
     res.redirect('/')

})

app.get('/:ShortUrl' ,async(req,res)=>{
    const ShortUrl = await shortUrl.findOne({short: req.params.ShortUrl})
    if(ShortUrl == null) return res.sendStatus(404)
    ShortUrl.clicks++
    ShortUrl.save()
    res.redirect(ShortUrl.full)
})

app.listen(process.env.PORT||5000);
 