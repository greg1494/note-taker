const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET request for notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
    // Send a message to the client
    res.json(`${req.method} request received to get note`);
  
    // Log our request to the terminal
    console.info(`${req.method} request received to get note`);
});

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title, text) {
      // Variable for the object we will save
      const activeNote = {
        title,
        text,
        review_id: uuid(),
      };
  
      // Obtain existing notes
      fs.readFile('./data/notes.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new Note
          parsedNotes.push(activeNote);
  
          // Write updated reviews back to the file
          fs.writeFile(
            './data/notes.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: activeNote,
      };
  
      console.log(response);
      res.json(response);
    } else {
      res.json('Error in posting review');
    }
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
