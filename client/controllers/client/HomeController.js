window.HomeController = function($scope,$http,$location){
    const api = "http://localhost:3000/products";
    $scope.render = function(){
        $http.get("http://localhost:3000/products")
        .then(function(response){
            $scope.products = response.data;
            
        })
      }
   $scope.render();
}