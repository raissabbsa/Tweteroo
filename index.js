import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json());

const tweets = [
    {username: "bobesponja",tweet: "eu amo o hub"},
]
const user = [
    {username: 'bobesponja', avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"}
]
const tweetComplete = []


app.post("/tweets" , (req,res) => {
    const newObject={
        username: req.body.username,
        tweet: req.body.tweet
    }
    tweets.push(newObject)
    const newAvatar = user.find(u => u.username ===newObject.username)
    if(newAvatar){
        const newTweet = [{
            username: newObject.username,
            avatar: newAvatar.avatar,
            tweet: newObject.tweet
        }]  
        tweetComplete.push(newTweet)
    }

    res.send("OK")
})

app.get("/tweets", (req,res) => {

    if(tweetComplete.length<=10){
        res.send(tweetComplete)
        return
    }
    let tweetsList = []
    for(let i=tweetComplete.length-10; i<tweetComplete.length;i++){
        tweetsList.push(tweetComplete[i])
    }
    res.send(tweetsList)
})

app.post("/sign-up", (req,res)  => {
    const newUser = {
        username: req.body.username,
        avatar: req.body.avatar
    }
    user.push(newUser)
    res.send("OK")
})


app.listen(5000)