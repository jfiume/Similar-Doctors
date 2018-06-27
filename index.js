var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

const doctors = [
  { id: 101, name: "Dr. James Gardner", location: "Marin", specialty: "Dermatology" },
  { id: 102, name: "Dr. Faraz Ghoddusi", location: "Sacramento", specialty: "Family" },
  { id: 103, name: "Dr. Aaron Mondshine", location: "San Francisco", specialty: "Family" },
  { id: 104, name: "Dr. Adam Jacobson", location: "Sacramento", specialty: "Neurology" },
  { id: 105, name: "Dr. Ade Farquhar", location: "San Francisco", specialty: "Dermatology" },
  { id: 106, name: "Dr. Alex Milbert", location: "San Francisco", specialty: "Family" },
  { id: 107, name: "Dr. Alex Park", location: "Sonoma", specialty: "Dermatology" },
  { id: 108, name: "Dr. Ali Haq", location: "San Francisco", specialty: "Family" },
  { id: 109, name: "Dr. Anastassia Bobokalonova", location: "San Francisco", specialty: "Family" },
  { id: 110, name: "Dr. Andrew Booth", location: "San Francisco", specialty: "Pediatrics" },
  { id: 111, name: "Dr. George Vuong", location: "San Francisco", specialty: "Neurology" },
  { id: 112, name: "Dr. Arvind Ravi", location: "San Francisco", specialty: "Family" },
  { id: 113, name: "Dr. Atom Crimi", location: "Oakland", specialty: "Pediatrics" },
  { id: 114, name: "Dr. Casey Fritsch", location: "San Francisco", specialty: "Family" },
  { id: 115, name: "Dr. Cherry Wing-Yu Lam", location: "Oakland", specialty: "Family" },
  { id: 116, name: "Dr. Chris Brickey", location: "San Francisco", specialty: "Pediatrics" },
  { id: 117, name: "Dr. Clare Hsu", location: "San Francisco", specialty: "Neurology" },
  { id: 118, name: "Dr. Daniel Pages", location: "Oakland", specialty: "Neurology" },
  { id: 119, name: "Dr. David Corson-Knowles", location: "San Francisco", specialty: "Pediatrics" },
  { id: 120, name: "Dr. Deirdre Hyde", location: "Sonoma", specialty: "Family" }
];

app.get('/', function(req, res){
   res.render('doctors', {doctors: doctors});
});

app.get('/:id', function(req, res){
  var currDr = doctors.filter(function(dr){
      if(dr.id == req.params.id){
         return true;
      }
   });
   if(currDr.length === 1){
      res.render('doctor', {doctor: currDr[0]})
   } else {
      res.status(404);//Set status to 404 as Dr was not found
      res.json({message: "Not Found"});
   }
})

app.listen(3000);
