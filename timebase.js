var myApp = angular.module('myApp', []);

myApp.controller('myAppList', function myAppList($scope, $http) {


	var createBeer = function(dataPart, i) {
		var beer = {
			index: i,
			id: dataPart["id"],
			name: dataPart["name"],
			description: dataPart["description"],
			image_url: dataPart["image_url"],
			abv: dataPart["abv"],
			ibu: dataPart["ibu"],
			ebc: dataPart["ebc"],
			ph: dataPart["ph"],
			food: dataPart["food_pairing"]
		};

		$scope.beers.push(beer);
	}

	$scope.displayBeer = function(data) {

		angular.element(document.querySelector('#beerInfo')).addClass('show');

		$scope.selectedIndex = data["beer"]["index"];
		$scope.selectedId = data["beer"]["id"];
		$scope.selectedName = data["beer"]["name"];
		$scope.selectedImg = data["beer"]["image_url"];
		$scope.selectedDesc = data["beer"]["description"];
		$scope.selectedAbv = data["beer"]["abv"];
		$scope.selectedIbu = data["beer"]["ibu"];
		$scope.selectedEbc = data["beer"]["authority"];
		$scope.selectedPh = data["beer"]["ph"];
		$scope.selectedFood = data["beer"]["food"];

	}

	$scope.hideInfo = function() {
		angular.element(document.querySelector('#beerInfo')).removeClass('show');
	}


	$scope.getBeers = function() {

		var parameters = [];

		parameters.push($scope.selectedTime || "");
		parameters.push($scope.selectedDays || "");
		parameters.push($scope.selectedTax || "");

		$http.get("https://api.punkapi.com/v2/beers?"+parameters.join("&"))
	    .then(function(response) {
	        $scope.myBeers = response.data;

			// Define the Beer array!
			$scope.beers = [];

			// One-shot switch, upon load, the list is not visible the first time around until a query is made, then it stays on thereafter...
			($scope.myBeers.length) && angular.element(document.querySelector('#beerList')).addClass('show');

			// List the beers!
			for (i = 0; i < $scope.myBeers.length; i++) {
				createBeer($scope.myBeers[i], i);
			}
		});

	}

	$scope.selectTrue = function() {
		return true;
	}

});
