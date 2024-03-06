const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ytdlCore = require('ytdl-core')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Connected to Server...');
})

app.post('/download',async(req,res)=>{

    try{
        const url = req.body.url;
        console.log(url)
        const videoId = await ytdlCore.getURLVideoID(url)
        const metaInfo = await ytdlCore.getInfo(url)
        let data = {
            url: 'https://www.youtube.com/embed/'+videoId,
            info: metaInfo.formats
        }
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({error:err});
    }
    
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})