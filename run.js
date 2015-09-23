GLOBAL = {};
GLOBAL.endpoint_url = "http://sheetsu.com/apis/bfb2be27";
GLOBAL.template_url = "template.handlebars.md";
GLOBAL.readme_url = "README.md";

var http = require("http");
var handlebars = require('handlebars');
var fs = require('fs');

var request = http.get(GLOBAL.endpoint_url, function (response) {
    var buffer = "";
    var data;
    var result;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        data = JSON.parse(buffer);
        result = data.result;
        console.log("Chamada executada com sucesso.");
        imprimeVagasParaREADME(result);
        var texto_quantidade_de_vagas = result.length > 1 ? " vagas encontradas." : " vaga encontrada.";
        console.log(result.length + texto_quantidade_de_vagas);
        console.log("Arquivo "+GLOBAL.readme_url+" escrito com sucesso.");
    }); 
}); 

function imprimeVagasParaREADME(vagas){
	fs.readFile(GLOBAL.template_url, 'utf-8', function(error, source){
		var template = handlebars.compile(source);
		var markdown = template(vagas);
		fs.writeFile(GLOBAL.readme_url, markdown, function(err) {	
			if(err) {
		    	return console.log(err);
			}
		}); 
	});	
}