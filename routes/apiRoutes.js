const noteData = require("../db/db.json");
const fs = require("fs");
let notes = noteData;
const path = require("path");

module.exports = function (app) {
    // API GET Requests
    app.get("/api/notes", function (req, res) {
        // Re-assign id values of each note to match their array index + 1 to avoid counting from 0
        for (i = 0; i < notes.length; i++) {
            notes[i].id = i + 1;
        }
        res.json(notes);
    });

    app.post("/api/notes", function (req, res) {
        // Add the new note to the notes array
        notes.push(req.body);
        // Re-assign id values of each note to match their array index + 1 to avoid counting from 0
        for (i = 0; i < notes.length; i++) {
            notes[i].id = i + 1;
        }
        // To convert to string for writing to file
        let stringNotes = JSON.stringify(notes);
        // Save all notes to the file
        fs.writeFile(path.join(__dirname, "../db/db.json"), stringNotes, 'utf8', function (err) {
            if (err) return console.log(err);
        });
        // Return the added note
        res.json(req.body);
    });

    app.delete("/api/notes/:id", function (req, res) {
        // The query parameter id of the note to delete. Each note has been saved with a unique id which matches their array index number + 1. 

        // Read the file containing saved notes
        fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
            // Convert from string to object
            let parsedData = JSON.parse(data);
            // Remove the note by filtering out the note with the id parameter
            notes = parsedData.filter(item => {
                return item.id != req.params.id;
            })
        });

        // Convert to string
        let stringNotes = JSON.stringify(notes);
        // Re write the notes to the file
        fs.writeFile(path.join(__dirname, "../db/db.json"), stringNotes, 'utf8', function (err) {
            if (err) return console.log(err);
        });
        // Return the notes object
        res.json(notes);
    });

};
