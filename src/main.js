
var seperators = [".", "-", "/", ":", ";", "[", ")", "[", "]", "{", "}"];
var wsSeperators = [".", "-", "/"];
var numberSeperators = {
	"[" : "]",
	"(" : ")"
};

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

	var currentNumberDecorator = null;
	var previousCharWasDigit = false;

	var outputText = "";

	for(var i = 0; i < text.length; i++){
		var currentChar = text[i];

		if (isWhitespace(currentChar)){
			var replacingCharIndex = (Math.random() * wsSeperators.length | 0);
			var replacingChar = wsSeperators[replacingCharIndex];
			outputText += replacingChar;
		}
		else{
			outputText += currentChar;
		}
	}
	console.log(outputText);
}

function isWhitespace(c){
	return /\s/.test(c);
}

function usage(){

}

main();
