window.ListCartDetail = function($scope,$http,$location){
    $scope.renderCard();  
    $scope.carts = $scope.$parent.carts
  
        $scope.handleIncrease= function (id)
        {         
                    let data = $scope.carts.find(function(cart){
                        return cart.id == id
                    })
                    const input = event.target.parentElement.querySelector("input");
               
                    if(input.value >= 1){
                        data.quanlity = Number(input.value) + 1;
                        data.total_price = data.price * data.quanlity
                    }
                    $scope.totalPrice = $scope.carts.reduce(function(sum,cart){
                        return sum + Number(cart.total_price)
                      },0)
                $http({
                    method : "PUT",
                    data : data,
                    url : "http://localhost:3000/cart/" + id 

                })
                .then(function(response){
                    $scope.renderCard();   
                })
        }
        $scope.handleDecrease=  function (id){
            let data = $scope.carts.find(function(cart){
                return cart.id == id
            })
            const input = event.target.parentElement.querySelector("input");
       
            if(input.value >= 1){
                data.quanlity = Number(input.value) - 1;
                data.total_price = data.price * data.quanlity
            }
            $scope.totalPrice = $scope.carts.reduce(function(sum,cart){
                return sum + Number(cart.total_price)
              },0)
        $http({
            method : "PUT",
            data : data,
            url : "http://localhost:3000/cart/" + id 

        })
        .then(function(response){
            $scope.renderCard();   
        })
        }  
   
}