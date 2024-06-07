window.ProductDetailProduct = function($scope,$http,$routeParams){
   
    const api = "http://localhost:3000/products";
    $scope.quanlity = 1
    const form  = document.querySelector(".form-details");
    $scope.handleClickColor = function(){
        if(document.querySelector(".select_swap-color>label.active")){
            document.querySelector(".select_swap-color>label.active").classList.remove("active");
        }
       
        event.target.parentElement.classList.add("active");
        $scope.color = event.target.dataset.value;
        $scope.colorTitle = event.target.dataset.value;
       
    }
   $scope.handleClickSlider = function(){
    if(document.querySelector(".image-small_item.active")){
        document.querySelector(".image-small_item.active").classList.remove("active");
    }
        event.stopPropagation();
        const imageData = event.target.dataset.image;
        const imageRender = document.querySelector(".product-image_big > img");
        imageRender.src = imageData
       event.target.parentElement.classList.add("active");
   }
   $scope.handleIncrease=  function ()
    {
                const input = form.querySelector(".quanlity-input");
               
                if(input.value >= 1){
                    $scope.quanlity = Number(input.value) + 1;
                }
    }
    $scope.handleDecrease=  function (){
                const input = form.querySelector(".quanlity-input");
                if(input.value > 1){
                    $scope.quanlity = Number(input.value) - 1;
                }
    } 
    $scope.handleClickSize = function (){
        event.stopPropagation();
        if(form.querySelector(".btn-size>label.active")){
            form.querySelector(".btn-size>label.active").classList.remove("active");
        }
        $scope.sizes =  event.target.dataset.value;
     
        event.target.classList.add("active");
    }
    $scope.VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
      $scope.renderColorElemet = function(color){
        return {
            "background-color" : color,
        }
    }
    $scope.render = function(){
        const id = $routeParams.id;
        $http.get(api + "/" +id)
        .then(function(response){
            $scope.product = response.data;
            $scope.getAllProductByCate($scope.product.category.category_id)
        })
    }
    $scope.getAllProductByCate = function(id){
        $http.get(api)
        .then(function(response){
            $scope.productByCates = response.data.filter(function(product){
                return id = product.category.category_id &&  product.id != $scope.product.id
            })

        })
    }
    $scope.render()
    $scope.handleAddCart = function(){
        event.preventDefault();
       
        if(!window.sessionStorage.getItem("user")){
                alert("Vui lòng đăng nhập để được mua hàng")
        }
        else {
            const total_price =  Number($scope.product.price) * Number($scope.quanlity);
            const id = window.sessionStorage.getItem("user");
            if($scope.color == undefined){
              alert("Vui lòng chọn màu sắc")
            }  
            else if($scope.sizes == undefined){
              alert("vui lòng chọn kích cỡ")
            }
            else {
              const data = {
                  color : $scope.color,
                  size : $scope.sizes,
                  quanlity : $scope.quanlity,
                  product_name : $scope.product.name,
                  total_price,
                  price : $scope.product.price,
                  product_id : $scope.product.id,
                  userId : id
              }
             
              $http({
                  method : "POST",
                  url : "http://localhost:3000/cart",
                  data : data
              })
              .then(() =>{
                  alert("Thêm thành công");
                  $scope.renderCard();
              })
            }
       
        }
       
        
       
        
      }
}
