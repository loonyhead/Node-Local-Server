var express = require('express');
var path = require('path');
var fs = require('fs');

var root = './index.html';
var projects = './www';
var files = fs.readdirSync(projects);
var replacement = '';
for (var i=0;i<files.length; i++){ 
	replacement += '<a href="/'+files[i]+'">'+files[i]+'</a>';
};
var result = fs.readFileSync(root).toString().replace(/projects>(.*)</g, 'projects>'+replacement+'<');		
fs.writeFileSync(root, result);	


var app = express();

app.use(express.static(path.resolve('./')));
app.use(express.static(path.join(__dirname, 'www')));

app.get('/', function(req,res){		  	
		res.sendFile('index.html');
});
app.get('/:project', function(req, res) {
    res.sendFile(req.params.project+'/index.html');
});

var port = process.env.PORT || 8000;
var server = app.listen(port, function() {
  console.log('Listening on port:', port);
});