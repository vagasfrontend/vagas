var handlebars = require('handlebars');
var fs = require('fs');

var vagas = {
	titulo: "Exemplo de vaga para Front End",
	cargo: "Desenvolvedor Front End",
	empresa: "Viva Decora",	
	status: "aberta",
	cidade: "São Paulo - SP",
	contrato: "CLT",
	data_abertura: "22/09/2015",
	conhecimentos: ['javascript','angular','css', 'sass'],
	descricao: 'Vaga de trabalho',
	como_aplicar: 'Me envie um email',
}

fs.readFile('README.handlebars.md', 'utf-8', function(error, source){
	var template = handlebars.compile(source);
	var markdown = template(vagas);
	console.log(markdown);
	fs.writeFile("README.md", markdown, function(err) {	
		if(err) {
	    	return console.log(err);
		}
	}); 
});
