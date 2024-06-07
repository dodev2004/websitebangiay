const api = "http://localhost:3000/category";
window.CategoryController = function($scope,$http,$routeParams){
  $scope.render = function (){
   $http({
    method : "GET",
    url : api
   }).then(function(response){
    $scope.data = response.data;
   },function(){
    console.log("Có lỗi khi nhận dữ liệu");
   })
  }
  $scope.render()
  $scope.deleteCategory = function(id){
    console.log(id);
      $http({
        method : "DELETE",
        url :  api + "/" + id
      }).then(function(response){
        $scope.render();
      },function (){
        alert("Khong thanh cong");
      })
  }
  $scope.addCategory = function(){
    event.preventDefault();
   
  
    if($scope.form.category_name.$error.required && $scope.form.category_description.$error.required){
       $scope.form.category_name.$touched = true;
       $scope.form.category_description.$touched = true;
    }
    else {
      const data = {
        category_name : $scope.category_name,
        category_description : $scope.category_description
      }
      $http({
        method : "POST",
        data : data,
        url : api
      }).then(function(response){
        alert("Thêm thành công");
        window.location.href = "#!/category/list";
      },function(){
        alert("Khong thanh cong");
      })
    }
  
  }
}
window.editCategory  = function($scope,$http,$routeParams,$location) {
  const api = "http://localhost:3000/category";
  const id = $routeParams.id;
  $scope.render = function(){
    $http({
      method : "GET",
      url : api + "/" +id
     }).then(function(response){
      $scope.data = response.data;
     },function(){
      console.log("Có lỗi khi nhận dữ liệu");
     })
  }
  $scope.render();
  $scope.updateCategory = function(){
    event.preventDefault();
    if($scope.form.category_name.$error.required && $scope.form.category_description.$error.required){
      $scope.form.category_name.$touched = true;
      $scope.form.category_description.$touched = true;
   }else {
    $http({
      method : "PUT",
      url : api + "/" + id,
      data : {
        category_name : $scope.data.category_name,
        category_description : $scope.data.category_description
      }
    }).then(function(response){
      alert("Sửa thành công")
      window.location.href = "#!/category/list";
    })
   }
   
  }
}
