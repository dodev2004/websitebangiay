window.ListProductUser = function($scope,$http,$location){
    $scope.ischecked = {
        
    }
    $scope.filterCategory = [
        
    ]
    $scope.filterPrice = [

    ]
    $scope.filterColor  = [

    ]
    $scope.handleFilter = function(index= 0){
        const filterChoice = event.target.dataset.category;
        switch (filterChoice) {
            case "category":
                  if($scope.ischecked[index]){
                       $scope.filterCategory.push(event.target.dataset.filter)
                       $scope.products = $scope.products.filter(product =>{
                        return $scope.filterCategory.includes(product.category.category_name);
                       })
                       
                  }
                  else {
                        $scope.filterCategory.find(function(item,index){
                            if(item == event.target.dataset.filter){
                                $scope.filterCategory.splice(index,1);
                                return true;
                            }
                        })
                        if($scope.filterCategory.length  > 0){
                            $scope.products = $scope.products.filter(product =>{
                                return $scope.filterCategory.includes(product.category.category_name);
                               })
                        }
                        else {
                            $scope.render()
                        }
                  }
                break;
            case "color" :
                if(event.target.checked){
                    $scope.filterColor.push(event.target.dataset.color)
                    $scope.products = $scope.products.filter(product =>{
                       return product.colors.some(color =>{
                        return $scope.filterColor.includes(color.color_name)
                      });
                    })
               }
               else {
                     $scope.filterColor.find(function(item,index){
                         if(item == event.target.dataset.color){
                             $scope.filterColor.splice(index,1);
                             return true;
                         }
                     })
                     if($scope.filterPrice.length  > 0){
                        $scope.products = $scope.products.filter(product =>{
                            return product.colors.some(color =>{
                             return $scope.filterColor.includes(color.color_name)
                           });
                         })
                     }
                     else {
                         $scope.render()
                     }
               }
            break;
            case "price":
                if(event.target.checked){
                   switch(event.target.dataset.price){
                    case "<=500000" :
                    $scope.filterPrice.push({
                        min : event.target.dataset.min,
                        max : event.target.dataset.max
                    })  
                    break;
                    default :
                    $scope.filterPrice.push({
                        min : event.target.dataset.min,
                        max : event.target.dataset.max
                    })  

                   }
                   $scope.products = $scope.products.filter(product =>{  
                    return $scope.filterPrice.some(function(price){
                        return   product.price >= Number(price.min) && product.price <= Number(price.max)                 
                 }) })
               
                
                }
              else {
                $scope.filterPrice.find(function(item,index){
                    if(item.min == event.target.dataset.min && item.max == event.target.dataset.max){
                        $scope.filterPrice.splice(index,1);
                        return true;
                    }
                })
                if($scope.filterPrice.length  > 0){
                    $scope.products = $scope.products.filter(product =>{  
                        return $scope.filterPrice.some(function(price){
                            return   product.price > Number(price.min) && product.price < Number(price.max)                 
                     }) })
                }
                else {
                    $scope.render()
                }
              }
                break;
            default:
                break;
        }
        $scope.filterProduct();
    }
    $scope.filterProduct = function(){
       
    }
    $scope.render = function(){
        $scope.CategoryList();
        $http.get("http://localhost:3000/products")
        .then(function(response){
            $scope.products = response.data
        })
    }
    $scope.CategoryList = function(){
        $http.get("http://localhost:3000/category")
        .then(function(response){
            $scope.categorys = response.data;
        })
    }
    $scope.render();
}