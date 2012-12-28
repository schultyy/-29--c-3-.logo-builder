var pdfDocument = require("pdfkit");

var seperators = [".", "-", "/", ":", ";", "[", ")", "[", "]", "{", "}"];
var wsSeperators = [".", "-", "/"];
var numberDecorators = [
	["[", "]"],
	["(", ")"]
];

var colors = {
	"blue" : [86, 197, 208], 
	"red" : [237, 26, 59], 
	"green" : [0, 178, 107], 
	"orange" : [247, 148, 51], 
	"purple" : [109, 104, 175],
	"white" : [255, 255,255]
};

var background = [0, 5, 50];

function main(){

	if(process.argv.length < 3){
		usage();
		return;
	}

	var text = process.argv[2];	
	var outputFilename = "output.pdf";

	if(process.argv.length == 4){
		outputFilename = process.argv[3];
	}

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
	var doc = new pdfDocument();

	doc.font("../fonts/SourceCodePro-Regular.ttf", 100, 100)
		.fontSize(25)
		.text(text);

	doc.write(filename);
}

function isWhitespace(c){
	return /\s/.test(c);
}

function usage(){

}

main();
