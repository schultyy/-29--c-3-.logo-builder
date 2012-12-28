var pdfDocument = require("pdfkit");

var argv = require('optimist')
 			.usage("$0 -t [your text] -c [color] -f [output filename]")
 			.demand(["t"])
 			.describe("t", "Your input text")
 			.describe("c", "Outputtext color")
 			.describe("f", "Outputfile name")
 			.default("f", "output.pdf")
 			.default("c", "white")
 			.argv;
var seperators = [".", "-", "/", ":", ";", "[", ")", "[", "]", "{", "}"];
var wsSeperators = [".", "-", "/"];
var numberDecorators = [
	["[", "]"],
	["(", ")"]
];

var colors = {
	"blue" : "#56C5D0", 
	"red" : "#ED1A3B", 
	"green" : "#00B26B", 
	"orange" : "#F79433",
	"purple" : "#6D68AF",
	"white" : "#FFFFFF"
};

//var background = [0, 5, 50];
var background = "#000532";

function main(){

	var text = argv.t;	
	var outputFilename = argv.f;
	var textColor = argv.c;

	var currentNumberDecoratorIndex = -1;
	var previousCharWasDigit = false;

	var outputText = "";

	for(var i = 0; i < text.length; i++){
		var currentChar = text[i];

		if (isWhitespace(currentChar)){
			var replacingCharIndex = (Math.random() * wsSeperators.length | 0);
			var replacingChar = wsSeperators[replacingCharIndex];
			outputText += replacingChar;
		}
		else if(!previousCharWasDigit && !isNaN(currentChar)){
			currentNumberDecoratorIndex = (Math.random() * numberDecorators.length | 0);
			var decoratorChar = numberDecorators[currentNumberDecoratorIndex][0];
			outputText += decoratorChar;
			outputText += currentChar;
			previousCharWasDigit = true;
		}
		else if(previousCharWasDigit && isNaN(currentChar)){
			outputText += currentChar;
			outputText += numberDecorators[currentNumberDecoratorIndex][1];
			previousCharWasDigit = false;
			currentNumberDecoratorIndex = -1;
		}
		else{
			outputText += currentChar;
		}
	}

	if(previousCharWasDigit){
		outputText += numberDecorators[currentNumberDecoratorIndex][1];
	}
	createDocument(outputFilename, outputText);
}

function createDocument(filename, text){
	var doc = new pdfDocument({"size" : "a4", "layout" : "landscape"});

	doc.rect(0,0, 1500, 1500)
		.fillAndStroke(background);
	doc.font("../fonts/SourceCodePro-Regular.ttf")
		.fontSize(32)
		.fillAndStroke(colors.purple)
		.text(text);

	doc.write(filename);
}

function isWhitespace(c){
	return /\s/.test(c);
}

main();
