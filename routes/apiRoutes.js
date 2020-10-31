const noteData = require("../db/db.json");
var fs = require("fs");


module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data)
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {

        console.log(noteData);
        res.json(noteData);
    });



    app.post("/api/notes", function (req, res) {
        tableData.push(req.body);
        res.json(noteData);
    });

    app.delete("/api/notes/:id", function (req, res) {

        // Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file. id should be the index of the array.


    });


};
