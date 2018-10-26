function getCurrenciesList(){//for conversion

	return [
	"GBP",
	"BTC",
	"USD"];
}


function getWhatCurrencyList(){//for tickers
	return [
	"GBP",
	"EUR",
	"USD"];
}

function getCurrencySign(currency){

	var currencySign = "";

	switch(currency.toString()){
		case "USD":
			currencySign = "$";
			break;
		case "EUR":
			currencySign =  "€";
			break;
		case "GBP":
			currencySign =  "£";
			break;
	}

	return currencySign;
}