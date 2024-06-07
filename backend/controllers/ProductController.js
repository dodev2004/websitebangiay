window.ListProductController = function($scope,$http,$routeParams){
    const api = "http://localhost:3000/products";
    $scope.render = function(){
        $http({
            method : "GET",
            url :  api
        }).then(function(response){
            $scope.data = response.data;
            $scope.curentPage = Number($routeParams.curentPage);  
            $scope.pagin = Math.ceil( $scope.data.length/7);
            $scope.paginViews = [];
            for(var i = 1;i<=$scope.pagin;i++){
                $scope.paginViews.push({
                    page: i
                })
            }
            $scope.start = $scope.pagin*($scope.curentPage -1);
            $scope.ProductListPagin($scope.start);
        })
    }
 
    $scope.ProductListPagin  = function(start = 0,limit=7){
        $http({
            method : "GET",
            url :  `${api}?_start=${start}&_limit=${limit}`
        }).then(function(response){
            $scope.data = response.data;
            console.log($scope.data);
        })
    }
    $scope.render();
    $scope.deleteHanlde = function(id){
        $http({
            method : "DELETE",
            url : api + "/" + id,
        })
        .then(function(response){
            $scope.render();
        })
    }
    $scope.renderColorElemet = function(color){
        return {
            "background-color" : color,
        }
       }
}
window.AddProductController = function($scope,$http,$location,$routeParams){
    $scope.slider = [
        {value : "",}
    ];
    $scope.start = function(){
        $scope.colorList();
        $scope.CategoryList();
    }
    $scope.handleAddSliderItem= function(){
        $scope.slider.push({value : "",});
    }
    $scope.CategoryList = function(){
        $http.get("http://localhost:3000/category")
        .then(function(response){
            $scope.categorys = response.data;
        })
    }
    $scope.deleteHanlderSlider = function(index){
        $scope.slider.splice(index,1);
    }
    $scope.colorList = function(){
        $http.get("http://localhost:3000/Colors")
        .then(function(response) {
          $scope.colorItem = response.data.map(function(color){
                return {
                    color : color,
                    lable : color.code_color,
                    checkbox : false,
                }
            })

        })
    }
    $scope.renderColorElemet = function(color){
        return {
            "background-color" : color,
        }
    }
    $scope.handleAddProduct = function(){
        event.preventDefault();
        $scope.form.name.$touched = true;
        $scope.form.price.$touched= true;
        $scope.form.description.$touched = true;
        $scope.form.avatar.$touched=  true;
        $scope.form.slider.$touched = true;
        $scope.form.color.$touched= true;
        $scope.form.size.$touched = true;
        $scope.form.view.$touched= true;
        $scope.form.total_buy.$touched = true;
        let checked = true;
        const inputs = event.target.querySelectorAll("input:not([type='checkbox'])");
        const checkedNumber = event.target.querySelectorAll("input[type='number']");
       
        inputs.forEach(function(input){
            if(input.value.trim() == ""){
                checked = false;
            }
        })
        if(checked){
            checkedNumber.forEach(function(input){
                if(isNaN(input.value)){
                    checked = false;
                    return false;
                }
             })
             if(checked){
                $scope.categoryData = $scope.categorys.find(function(category){
                    return $scope.category == category.id;
                })
                $scope.categoryData = {
                    category_name :$scope.categoryData.category_name,
                    category_id : $scope.categoryData.id
                }
                $scope.colorData  = [];
                $scope.colorItem.forEach(function(color){
                    if(color.checkbox){
                        $scope.colorData.push({
                            color_name : color.color.name,
                            code_color : color.color.code_color
                        })
                    }
                })
                $scope.sliderData =  $scope.slider.filter(function(slider){
                    return slider.value != "";
                }).map(function(slider){
                    return slider.value;
                })
              
                $scope.timer = new Date().getTime();
                $scope.sizesData = $scope.size.split(",");
                var data = {
                    name : $scope.name,
                    price: $scope.price,
                   product_description: $scope.product_description,
                   category : $scope.categoryData,
                   colors : $scope.colorData,
                   slider:$scope.sliderData,
                   avatar : $scope.avatar,
                   total_buy : $scope.total_buy,
                   sizes : $scope.sizesData,
                   created_at : $scope.timer,
                   views : $scope.views
        
                };
                console.log($scope.colorData);
                $http({
                    method : "POST",
                    url : "http://localhost:3000/products",
                    data : data
                }).then(function (response) {
                    alert("Thêm thành công");
                    $location.path("/product/list/1");
                })
             }
         
        }
     
       
    }
    $scope.start();
}
window.EditProductController = function($scope,$http,$location,$routeParams){
    const id = $routeParams.id;
    $scope.slider = [
       
    ];
    $scope.start = function(){
        $scope.CategoryList();
        $scope.getDataId();
    }
    $scope.getDataId = function(){
 
        $http.get("http://localhost:3000/products" + "/" + id)
        .then(function(response){
                $scope.inputProductValue = response.data;
                $scope.inputProductValue.slider.forEach(function(slider){
                    $scope.slider.push({
                        value:slider
                    });
                })
                $scope.sizes = $scope.inputProductValue.sizes.join(",");
                $scope.colorList($scope.inputProductValue.colors);
        })
    }
   
    $scope.handleAddSliderItem= function(){
        $scope.slider.push({value : "",});
    }
    $scope.CategoryList = function(){
        $http.get("http://localhost:3000/category")
        .then(function(response){
            $scope.categorys = response.data;
        })
    }
    $scope.deleteHanlderSlider = function(index){
        $scope.slider.splice(index,1);
    }
    $scope.colorList = function(colorList){
        console.log(colorList);
        $http.get("http://localhost:3000/Colors")
        .then(function(response) {
        
          $scope.colorItem = response.data.map(function(color){
                return {
                    color : color,
                    lable : color.code_color,
                    checkbox : false,
                }
            })
            colorList.forEach(function(color){
                $scope.colorItem.forEach(function(colorCheck,index){
                    if(color.code_color ==  colorCheck.lable){
                        $scope.colorItem[index].checkbox = true;
                    }
                })
            })
            
        })
    }
    $scope.renderColorElemet = function(color){
        return {
            "background-color" : color,
        }
    }
    $scope.handleeditProduct = function(){
        event.preventDefault();
        $scope.form.name.$touched = true;
        $scope.form.price.$touched= true;
        $scope.form.description.$touched = true;
        $scope.form.avatar.$touched=  true;
        $scope.form.slider.$touched = true;
        $scope.form.size.$touched = true;
        $scope.form.view.$touched= true;
        $scope.form.total_buy.$touched = true;
        let checked = true;
        const inputs = event.target.querySelectorAll("input:not([type='checkbox'])");
        const checkedNumber = event.target.querySelectorAll("input[type='number']");
       
        inputs.forEach(function(input){
            if(input.value.trim() == ""){
                checked = false;
            }
        })
        if(checked){
            checkedNumber.forEach(function(input){
                if(isNaN(input.value)){
                    checked = false;
                    return false;
                }
             })
             if(checked){
                $scope.categoryData = $scope.categorys.find(function(category){
                    return $scope.inputProductValue.category.category_id == category.id;
                })
                $scope.categoryData = {
                    category_name :$scope.categoryData.category_name,
                    category_id : $scope.categoryData.id
                }
                $scope.colorData  = [];
                $scope.colorItem.forEach(function(color){
                    if(color.checkbox){
                        $scope.colorData.push({
                            color_name : color.color.name,
                            code_color : color.color.code_color
                        })
                    }
                })
                $scope.sliderData =  $scope.slider.filter(function(slider){
                    return slider.value != "";
                }).map(function(slider){
                    return slider.value;
                })
                $scope.sizesData = $scope.sizes.split(",");
                var data = {
                    name : $scope.inputProductValue.name,
                    price: $scope.inputProductValue.price,
                   product_description: $scope.inputProductValue.product_description,
                   category : $scope.categoryData,
                   colors : $scope.colorData,
                   slider:$scope.sliderData,
                   avatar : $scope.inputProductValue.avatar,
                   sizes : $scope.sizesData,
                   total_buy : $scope.inputProductValue.total_buy,
                   views : $scope.inputProductValue.views
                };
                $http({
                    method : "PATCH",
                    url : "http://localhost:3000/products" + "/" + id,
                    data : data
                }).then(function (response) {
                    alert("Sửa thành công");
                    $location.path("/product/list/1");
                })
             }
        }
       
       
    }
    $scope.start();
}
