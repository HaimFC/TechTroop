const express = require("express")
const router = express.Router()

wordCounter = {"hello": 3};

router.get('/sanity', function(req, res){
    console.log("Server is up and running")
    res.end
})

router.get('/words/:word', function(req, res){
    if(wordCounter[req.params.word])
        res.send({count:wordCounter[req.params.word]})
    else
        res.send({count:0})
    res.end
})

router.post('/words/:word', function(req, res){
    wordCounter = {...wordCounter, [req.params.word]:1}
    console.log("New word is added")
    res.send({text: `Added ${req.params.word}`, currentCount: wordCounter[req.params.word]})
    res.end
})

router.post('/sentance/:sentance', function(req, res){
    const words = req.params.sentance.split(" ");

    let numNewWords = 0
    let numOldWords = 0

    words.forEach(w => {
        if(wordCounter[w]){    
            numOldWords += 1
        }
        else{
            wordCounter = {...wordCounter, [w]:1}
            numNewWords += 1
        }    
    })
    console.log()
    console.log("New sentance is added")
    res.send({text: `Added ${numNewWords} words, ${numOldWords} already existed`, currentCount: -1})
    console.log(wordCounter)
    res.end
})

router.delete('/words/:word', function (req, res) {
    const word = req.params.word;

    if (wordCounter[word]) {
        delete wordCounter[word];
        return res.status(200).send({
            text: `Deleted word: '${word}'`,
            currentCount: wordCounter
        });
    } else {
        return res.status(404).send({
            error: `Word '${word}' not found in dictionary`
        });
    }
});

module.exports = router