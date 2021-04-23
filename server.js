// 1. Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const note = require("./Develop/db/db.json");


// 2. I'm creating an 'express' server called app
const app = express();

// 3. Sets a port or run at 7000, Later listener will listen this
const PORT = process.env.PORT || 7000;

//4. Use a middleware to parse the JSON data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//what folder the browser can see
app.use(express.static("./Develop/public"));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Develop/public/index.html"));
});

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Develop/public/notes.html"));
});

app.get("/api/notes",(req,res)=>{
    res.json(note);
});

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Develop/public/index.html"));
});

app.post("/api/notes",(req,res)=>{
    let newNote = req.body; 
    let notePath = path.join(__dirname,"./Develop/db/db.json");
    let idNote = 0;
    for(let i = 0; i < note.length; i++) {
        let oneNote = note[i];  

        if(oneNote.id  > idNote) {
            idNote = oneNote.id 
        }
    } 

    newNote.id=idNote + 1; 
    note.push(newNote);
    fs.writeFile(notePath, JSON.stringify(note), err => {
        if(err){
            return console.log (err)     
        }
        console.log ("Saved")
    }) 
    res.json(newNote);
});

//6. Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
