function setTickers(){

	var currency = $("#currencyList").val();
	var currencySign = getCurrencySign(currency);
	setTickerVal("BTC",currencySign);
	setTickerVal("LTC",currencySign);
	setTickerVal("ETH",currencySign);
	setTickerVal("XRP",currencySign);
	setTickerVal("XVG",currencySign);

}

function setTickerVal(currencyVal, currencySign){

	var currency = $("#currencyList").val();

	var element = document.getElementById(currencyVal+ "Value");
	var fromTo = currencyVal + "-" + currency;

	$.ajax({
    url: "https://api.cryptonator.com/api/ticker/" + fromTo,
    type: "get",
    dataType: 'json',
    jsonp: "ticker"
	})
    .done(function(data) {
        element.innerText = currencySign + numeral(data.ticker.price).format("0,0.00");

	       if(data.ticker.change >= 0){
	       		element.style.color = '#32CD32';
	       }else{
	       		element.style.color = '#FF0000';
	       	}
	})
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("error " + textStatus);
        console.log("incoming Text " + jqXHR.responseText);
        console.log(errorThrown);
	});
}


//use one above becasue was getting error to do with calling json from a server on a diff domain
// function setTickerVal(currencyVal){
// 	var currency = $("#currencyList").val();

// 	var element = document.getElementById(currencyVal+ "Value");
// 	var fromTo = currencyVal + "-" + currency;

// 	$.getJSON("https://api.cryptonator.com/api/ticker/" + fromTo,
//     function(data){
// 	    try {

// 	       element.innerText = numeral(data.ticker.price).format("0,0.00");

// 	       if(data.ticker.change >= 0){
// 	       		element.style.color = '#32CD32';
// 	       }else{
// 	       		element.style.color = '#FF0000';
// 	       }

// 	    } catch (e) {
// 	      alert("something went wrong: " + e);
// 	    }

//   	});
// }

function calculatePercentage(){

	var value = parseFloat($("#NumberValue").val());
	var percent = $("#NumberPercentage").val();
	var numberResult = $("#NumberResult");

	var t = $("withPercentage");
	t.innerText = "test";

	var percentage = ((value/100) * percent) + value;
	numberResult.val(percentage);
}

function getCurrencyConversion(CFV,CF,CT,CV) {
 
	var currentValueBox = $("#"+CV);
	currentValueBox.val("");
	var currentFromChoice = $("#"+CF).val();
	var currentToChoice = $("#"+CT).val();
	
  	var fromTo = currentFromChoice + "_" + currentToChoice;
  	var protocol = window.location.protocol.replace(/:/g,'');
  	
  	currentValueBox.attr("placeholder", "Converting...");

  	$.getJSON(protocol + "://free.currencyconverterapi.com/api/v5/convert?q=" + fromTo + "&compact=y&callback=?",
    function(data){
	    try {
	       var currentFromValue = parseFloat(document.getElementById(CFV).value);
	       currentValueBox.val(numeral(currentFromValue * data[fromTo].val).format("0,0.00[0]"));

	    } catch (e) {
	      alert("Please enter a number in the Amount field." + e);
	    }

	    currentValueBox.attr("placeholder", "Press Convert button");

  	});
}

function initCurrencyDropdownList(id) {
   
	var currencies = getCurrenciesList();

    select = document.getElementById( id );
    
    for (var i = 0; i < currencies.length ; i++) {
    	
    	option = document.createElement( 'option' );
        option.value = option.text = currencies[i];
        select.add( option );
    };   
}

function initWhatCurrencyDropDownList(id){
	var currencies = getWhatCurrencyList();

    select = document.getElementById( id );
    
    for (var i = 0; i < currencies.length ; i++) {
    	
    	option = document.createElement( 'option' );
        option.value = option.text = currencies[i];
        select.add( option );
    }; 
}


window.onload = function() {

	
	initCurrencyDropdownList('CURRENT_FROM');
	initCurrencyDropdownList('CURRENT_TO');
	initWhatCurrencyDropDownList('currencyList');
	setTickers();//set on open

	//prices are updated every thirty seconds
	setInterval(function(){ setTickers() }, 30000);

};


















