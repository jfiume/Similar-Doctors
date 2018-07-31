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
  { id: 101, name: "James Gardner", location: "Marin", specialty: "Dermatology", pic: "http://s518761299.onlinehome.us/wp-content/uploads/2014/03/drgardner-1.jpg", alt: "James Garnder" },
  { id: 102, name: "Deirdre Hyde", location: "Sonoma", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/128/medium/Dierdre_Hyde.jpg?1496695735", alt: "Dierdre hyde" },
  { id: 103, name: "Casey Fritsch", location: "San Francisco", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/001/999/medium/Casey_Fritsch.jpg?1496695418", alt: "Casey fritsch" },
  { id: 104, name: "Howard Feger", location: "Sacramento", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/150/medium/Howard_Feger.jpg?1496702553", alt: "Howard feger" },
  { id: 105, name: "Aaron Mondshine", location: "San Francisco", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/164/medium/Aaron_Mondshine.jpg?1496695174", alt: "Aaron mondshine" },
  { id: 106, name: "Adam Jacobson", location: "Sacramento", specialty: "Neurology", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/151/medium/Adam_Jacobson_2.jpg?1496695191", alt: "Adam jacobson 2" },
  { id: 107, name: "Ade Farquhar", location: "Marin", specialty: "Dermatology", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/165/medium/Ade_Farquhar.jpg?1496695210", alt: "Ade farquhar" },
  { id: 108, name: "Alex Milbert", location: "San Francisco", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/161/medium/Alex_Milbert.jpg?1496695269", alt: "Alex milbert" },
  { id: 109, name: "Alex Park", location: "Sonoma", specialty: "Dermatology", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/131/medium/Alex_Park_2.jpg?1496695282", alt: "Alex park 2" },
  { id: 110, name: "Ali Haq", location: "San Francisco", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/103/medium/Ali_Haq.jpg?1496695304", alt: "Ali haq" },
  { id: 111, name: "Anastassia Bobokalonova", location: "San Francisco", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/121/medium/Anastassia_Bobokalonova.jpg?1496695327", alt: "Anastassia bobokalonova" },
  { id: 112, name: "Andrew Booth", location: "San Francisco", specialty: "Pediatrics", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/153/medium/Andrew_Booth_2.jpg?1496695371", alt: "Andrew booth 2" },
  { id: 113, name: "George Vuong", location: "San Francisco", specialty: "Neurology", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/124/medium/George_Vuong.jpg?1496695823", alt: "George vuong" },
  { id: 114, name: "Arvind Ravi", location: "Sacramento", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/145/medium/Arvind_Ravi_2.jpg?1496695381", alt: "Arvind ravi 2" },
  { id: 115, name: "Atom Crimi", location: "Oakland", specialty: "Pediatrics", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/130/medium/Atom_Crimi.jpg?1496695406", alt: "Atom crimi" },
  { id: 116, name: "Cherry Wing-Yu Lam", location: "Oakland", specialty: "Family", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/135/medium/Cherry_Wing_Yu_Lam_2.jpg?1496695432", alt: "Cherry wing yu lam 2" },
  { id: 117, name: "Chris Brickey", location: "San Francisco", specialty: "Pediatrics", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/113/medium/Chris_Brickey.jpg?1496695455", alt: "Chris brickey" },
  { id: 118, name: "Clare Hsu", location: "San Francisco", specialty: "Neurology", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/142/medium/Clare_Hsu.jpg?1496695569", alt: "Clare hsu" },
  { id: 119, name: "Daniel Pages", location: "Oakland", specialty: "Neurology", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/132/medium/Daniel_Pages.jpg?1496702567", alt: "Daniel pages" },
  { id: 120, name: "David Corson-Knowles", location: "San Francisco", specialty: "Pediatrics", pic: "//s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/002/110/medium/David_Corson.jpg?1496695715", alt: "David corson" },
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
