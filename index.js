import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json());

const tweets = []
const user = []
const tweetComplete = []


app.post("/tweets" , (req,res) => {
    const {username, tweet} = req.body
    const newObject={
        username: username,
        tweet: tweet
    }
    tweets.push(newObject)
    const newAvatar = user.find(u => u.username ===newObject.username)
    if(newAvatar){
        const newTweet = {
            username: username,
            avatar: newAvatar.avatar,
            tweet: tweet
        } 
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
    const {username, avatar} = req.body
    const newUser = {
        username: username,
        avatar: avatar
    }
    user.push(newUser)
    res.send("OK")
})


app.listen(5000)