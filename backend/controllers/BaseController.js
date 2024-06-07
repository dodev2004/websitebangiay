angular.module("myApp",["ngRoute"])
.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl : "views/dasboard.html"
    })
    .when("/category/list",{
        templateUrl : "views/Category/categoryList.html",
        controller : CategoryController
    })  
    .when("/category/add",{
        templateUrl : "views/Category/categoryAdd.html",
        controller : CategoryController
    })
    .when("/category/edit/:id",{
        templateUrl : "views/category/categoryEdit.html",
        controller : editCategory
    })
    .when("/product/list/:curentPage",{
        templateUrl : "views/Product/productList.html",
         controller: ListProductController
    })
    .when('/product/add',{
            templateUrl : "views/Product/productAdd.html",
            controller : AddProductController
    })
    .when('/product/edit/:id',{ 
            templateUrl : "views/Product/productEdit.html",
            controller : EditProductController
    })
    .when("/color/list",{
            templateUrl : "views/color/colorList.html",
            controller : ListColorController
    })
    .when("/color/add",{   
            templateUrl : "views/Color/colorAdd.html",
            controller : AddColorController
     })
    .when("/color/edit/:id",{
            templateUrl : "views/color/colorEdit.html",
            controller : EditColorController
    })
    .otherwise({
        redirectTo: '/'
    })
})
