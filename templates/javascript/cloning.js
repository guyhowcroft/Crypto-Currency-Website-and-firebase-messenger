var idCounter = 0;

function clone() {

	//to limit clones add if checking counter
	var div = document.getElementById("conversionContainer");
	var clone = div.cloneNode(true);
	var name = div.getAttribute("id") + idCounter++;
	clone.id = name;
	modIDs(clone, idCounter);
	
	clone.setAttribute("name", name);
	document.getElementById("conversionsContainer").appendChild(clone);
}

function modIDs(clone,name) {
	var child, nodes = clone.childNodes;

	var currentFromValue;
	var currentFrom;
	var currentTo;
	var currentValue;

	//for all children in clone
	for (var i=0, len=nodes.length; i<len; i++){
		child = nodes[i];

		//change the id of the child
		if ('string' == typeof child.id){
			child.id = child.id + name;
		}

		//*** get the specific ids to use for button params***//
		//check if child is a select
		if(child.tagName == 'SELECT'){
			var select = child.id;
			if(select.includes("CURRENT_FROM")){
				currentFrom = select;
			}
			if(select.includes("CURRENT_TO")){
				currentTo = select;
			}
		}
		//check if child is a input box
		if(child.tagName == 'INPUT'){
			var input = child.id;
			if(input.includes("CURRENT_FROM_VALUE")){
				currentFromValue = child.id;
			}
			if(input.includes("CURRENT_VALUE")){
				currentValue = child.id;
			}
		}
	}
	setButtonFunctionCall(nodes, currentFromValue, currentFrom, 
							currentTo, currentValue);
}

//for each clone the variables will change so need to change params on call
function setButtonFunctionCall(nodes, currentFromValue, currentFrom, 
							currentTo, currentValue){

	//set the parameters for the button - need another loop as we need to 
	//set all values first
	for (var i=0, len=nodes.length; i<len; i++){
		child = nodes[i];

		var onClickVal = "getCurrencyConversion("
				+"'"+currentFromValue+"',"
				+"'"+currentFrom+"',"
				+"'"+currentTo+"',"
				+"'"+currentValue+"')";

		if(child.tagName == 'BUTTON'){
			child.setAttribute("onclick",onClickVal);
		}
	}
}