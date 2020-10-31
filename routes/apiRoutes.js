const noteData = require("../db/db.json");
const fs = require("fs");
let notes = noteData;
const path = require("path");

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data)
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {
        // fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
        //     if (err) {
        //         throw err;
        //     }
        //     res.send(JSON.parse(data));
        // });


        // console.log(noteData);
        for (i = 0; i < notes.length; i++) {
            notes[i].id = i + 1;
        }
        console.log(notes);
        res.json(notes);

    });



    app.post("/api/notes", function (req, res) {

        notes.push(req.body);

        for (i = 0; i < notes.length; i++) {
            notes[i].id = i + 1;
        }

        console.log(typeof (notes));
        let stringNotes = JSON.stringify(notes);
        console.log(typeof (stringNotes));
        // fs.writeFile(path.join(__dirname, "../db/db.json"), parsedNotes, function (err) {
        //     if (err) return console.log(err);
        // });
        fs.writeFile(path.join(__dirname, "../db/db.json"), stringNotes, 'utf8', function (err) {
            if (err) return console.log(err);
        });

        res.json(notes);
    });

    app.delete("/api/notes/:id", function (req, res) {

        // Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file. id should be the index of the array.


    });


};
