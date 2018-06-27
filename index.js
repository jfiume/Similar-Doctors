var express = require('express');
var app = express();

// sets up Pug Views
app.set('view engine', 'pug');
app.set('views','./views');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// You can assume the entire directory of doctors fits into memory.
// Doctors have an id, name, location and specialty
const doctors = [
  { id: 101, name: "James Gardner", location: "Marin", specialty: "Dermatology" },
  { id: 102, name: "Deirdre Hyde", location: "Sonoma", specialty: "Family" },
  { id: 103, name: "Casey Fritsch", location: "San Francisco", specialty: "Family" },
  { id: 104, name: "Faraz Ghoddusi", location: "Sacramento", specialty: "Family" },
  { id: 105, name: "Aaron Mondshine", location: "San Francisco", specialty: "Family" },
  { id: 106, name: "Adam Jacobson", location: "Sacramento", specialty: "Neurology" },
  { id: 107, name: "Ade Farquhar", location: "Marin", specialty: "Dermatology" },
  { id: 108, name: "Alex Milbert", location: "San Francisco", specialty: "Family" },
  { id: 109, name: "Alex Park", location: "Sonoma", specialty: "Dermatology" },
  { id: 110, name: "Ali Haq", location: "San Francisco", specialty: "Family" },
  { id: 111, name: "Anastassia Bobokalonova", location: "San Francisco", specialty: "Family" },
  { id: 112, name: "Andrew Booth", location: "San Francisco", specialty: "Pediatrics" },
  { id: 113, name: "George Vuong", location: "San Francisco", specialty: "Neurology" },
  { id: 114, name: "Arvind Ravi", location: "Sacramento", specialty: "Family" },
  { id: 115, name: "Atom Crimi", location: "Oakland", specialty: "Pediatrics" },
  { id: 116, name: "Cherry Wing-Yu Lam", location: "Oakland", specialty: "Family" },
  { id: 117, name: "Chris Brickey", location: "San Francisco", specialty: "Pediatrics" },
  { id: 118, name: "Clare Hsu", location: "San Francisco", specialty: "Neurology" },
  { id: 119, name: "Daniel Pages", location: "Oakland", specialty: "Neurology" },
  { id: 120, name: "David Corson-Knowles", location: "San Francisco", specialty: "Pediatrics" },
];

// route to Doctors Index
// displays all Doctors
app.get('/', function(req, res){
   res.render('doctors', {doctors: doctors});
});


// route to Doctors Show
// displays a single Doctor
app.get('/:id', function(req, res){
  // extract the id from the url
  let currDr = doctors.filter(function(dr){
    if(dr.id == req.params.id){
       return true;
     };
   });
   // creates the array of Similar Doctors
   // Similar is defined as having the same location and specialty as the current Doctor
   let similarDrs = doctors.filter(function(dr){
     if(dr.location === currDr[0].location && dr.specialty === currDr[0].specialty && dr !== currDr[0]){
       return true;
     };
   }).sort(function(a,b) {
     // The Similar Doctors are sorted alphabetically by name
     if(a.name < b.name){
       return -1
     } else if (a.name > b.name){
       return 1
     };
     return 0;
   });
   if(currDr.length === 1){
      res.render('doctor', {doctor: currDr[0], doctors: similarDrs })
   } else {
      res.status(404);//Set status to 404 as Dr was not found
      res.json({message: "Not Found"});
   }
})

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
