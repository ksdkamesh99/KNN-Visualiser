
let class_val;
let status='stop';
let input=[];
let output=[];
let class_lab;
let knnClassifier;
let classes;
function setup(){
	createCanvas(500,500);
	background(255,255,255);
	strokeWeight(2);
	classes=createSelect();
	classes.position(600,300);
	classes.option('A');
	classes.option('B');
	classes.option('C');
	knnClassifier = ml5.KNNClassifier();
	training_start=createButton('Start Training');
	training_start.position(600,350);
	training_start.mousePressed(training);
	training_stop=createButton('Stop Training');
	training_stop.position(600,400);
	training_stop.mousePressed(training_stops);
	predict=createButton('Predict');
	predict.position(600,450);
	predict.mousePressed(predicts);
	reset=createButton('Reset');
	reset.position(600,500);
	reset.mousePressed(reloads);



}

function reloads(){
	location.reload();
}

function training_stops(){
	status='stop';
}

function predicts(){
	status='predict';
}

function training(){
	status='train';
}

function gotresults(err,result){
	if(err){
		console.error(err);
	}
	else{
		class_lab=result.label;
		console.log(result.label);
		if(class_lab=='A'){
			fill(255,0,0);
		}
		else if(class_lab=='B'){
			fill(0,255,0);
		}
		else if(class_lab=='C'){
			fill(0,0,255);
		}		
		ellipse(mouseX,mouseY,30,30);

		text(class_lab,mouseX,mouseY);

	}
}
function mousePressed(){
	stroke(0);
	console.log(status);
	if(status=='train'){
		class_val=classes.value();
		if(class_val=='A'){
			fill(255,0,0);
		}
		else if(class_val=='B'){
			fill(0,255,0);
		}
		else if(class_val=='C'){
			fill(0,0,255);
		}
		ellipse(mouseX,mouseY,30,30);

		text(class_val,mouseX,mouseY);

		knnClassifier.addExample([mouseX,mouseY],class_val);


	}
	if(status=='predict'){
		if(knnClassifier.getNumLabels()>0){
		knnClassifier.classify([mouseX,mouseY],gotresults);
	
		}
		
		
	}
	


}

function draw(){
}