angular.module("myApp",['ngRoute'])
.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl: "views/client/home.html",
        controller : HomeController
    })
    .when("/productdetail/:id",{
        templateUrl : "views/client/sanphamchitiet.html",
        controller : ProductDetailProduct
    })
    .when("/cartdetail",{
      templateUrl : "views/client/cartDetail.html",
      controller : ListCartDetail
    })
    .when("/gioithieu",{
      templateUrl : "views/client/gioithieu.html",
    })
    .when("/lienhe",{
      templateUrl : "views/client/lienhe.html",
    })
    .when("/danhsachsanpham",{
      templateUrl : "views/client/danhsachsp.html",
      controller : ListProductUser
    })
    .when("/checkout",{
      templateUrl : "views/client/checkout.html",
    })
    .otherwise({
        redirectTo: '/'
    })
  
})
.controller("headerController",function($scope,$http,$location){
  $scope.status = true;
  $scope.user;
  $scope.carts =[];
  $scope.cartLength = 0;
    // http://localhost:3000/category
    // http://localhost:3000/products
    // http://localhost:3000/cart
    // http://localhost:3000/Colors
    $scope.dropdown = function(){
     
      if(!$scope.status){
        if(document.querySelector(".site_account-active.active")){
          document.querySelector(".site_account-active").classList.remove("active");
        }
        else {
          document.querySelector(".site_account-active").classList.add("active");
        }
      }
    
    }
  $scope.VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
  });
  $scope.getProduct = function(data = {}){
    $http.get("http://localhost:3000/products")
    .then(function(response){
        $scope.products = response.data;
      $scope.carts.forEach(function(cart,index){
             $scope.products.find(function(product){
                if(product.name == cart.product_name){
                      $scope.carts[index]["price"] = product.price;
                      $scope.carts[index]["total_price"] = product.price * cart.quanlity;
                      $scope.carts[index]["product_avatar"] = product.avatar;
                    
                }
             })
      })
      $scope.totalPrice = $scope.carts.reduce(function(sum,cart){
        return sum + Number(cart.total_price)
      },0)
    })

  }
  $scope.getUser = function(){
    if(window.sessionStorage.getItem("user")){
      const id = window.sessionStorage.getItem("user");
      $http.get("http://localhost:3000/users/" + id)
      .then(function(response){
        $scope.user = response.data;
      })
    }
  }
  $scope.signout = function(){
    window.sessionStorage.removeItem("user");
    window.location.reload();
  }
  $scope.renderCard = function(){
    const id = window.sessionStorage.getItem("user");
    $http.get("http://localhost:3000/cart?userId="+id)
  .then(function(response){
    $scope.carts = response.data;
    $scope.cartLength = Number($scope.carts.length);
    $scope.getProduct();
  })
  }
  $scope.handleRemoveCart = function(id){
    $http.delete("http://localhost:3000/cart/" + id)
    .then(function(response){
      $scope.renderCard()
    })
  }
 
  $scope.handleSignIn = function(){
    event.preventDefault(); 
    $scope.erorr=false;
    $scope.myForm.email.$touched = true;
    $scope.myForm.password.$touched = true;
    if($scope.myForm.email.$error.email == undefined && $scope.myForm.email.$error.required == undefined){
      $http.get(`http://localhost:3000/users?username=${$scope.email}&password=${$scope.password}`)
      .then(function(response){
        if(response.data.length != 0){
          $scope.status = false;
          alert("Đăn nhập thành công");
          $scope.user = response.data;
          $scope.id = $scope.user[0].id;
          window.sessionStorage.setItem("user",$scope.id);
          $scope.renderCard()
          
        }
        else {
          $scope.status = true;
          $scope.error=true;
        }
     
      }) 
    }
  }

  if(window.sessionStorage.getItem("user")){
    $scope.status = false;
    $scope.renderCard();
  }
  $scope.getUser();
})