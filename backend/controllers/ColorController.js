

window.ListColorController = function($scope,$http){
    const api =  "http://localhost:3000/Colors"
   $scope.render = function(){
    $http({
        method : "GET",
        url: api
    })
    .then(function(response){
        $scope.data = response.data
       
    })
   }
   $scope.render();
   $scope.handleDelete = function(id){
    $http({
        method : "DELETE",
        url: api + "/" + id
    })
    .then(function(response){
        console.log("Xóa thànhh công");
        $scope.render();
    })
   }
   $scope.renderColorElemet = function(color){
    return {
        "background-color" : color,
    }
   }
   $scope.handlemousOver = function(id){
   document.querySelector(`div[data-id='${id}']`).classList.add("active");
 }
$scope.handlemouseLeave =   function(id){
   document.querySelector(`div[data-id='${id}']`).classList.remove("active");
}
}
window.AddColorController = function($scope,$http,$location){
    const api =  "http://localhost:3000/Colors"
    $scope.hanldeAddColors = function(){
        event.preventDefault();
        $scope.form.color.$touched = true;
        $scope.form.name.$touched = true;
        if($scope.form.name.$error.required == undefined &&
            $scope.form.color.$error.required == undefined
        ){
            $http({
                method : "POST",
                data : {
                  name : $scope.name,
                  code_color: $scope.code_color
                },
                url : api
        
              }).then(function(response){
                alert("Thêm thành công")
                $location.path("/color/list")
              })
        }
    
    
    }
}
window.EditColorController = function($scope,$http,$routeParams){
    const api =  "http://localhost:3000/Colors"
    const id = $routeParams.id;
    $scope.render = function(){
        $http({
            method : "GET",
            url: api + "/" + id
        })
        .then(function(response){
            $scope.data = response.data
        })
       }
    $scope.render();
    $scope.updateColor = function(){
        event.preventDefault();
        $http({
            method : "PUT",
            url : api + "/" + id,
            data : {
                name : $scope.data.name,
                code_color : $scope.data.code_color 
            }
        }).then(function(response){
            alert("Sửa thành công");
            window.location.href = "#!/color/list";
        })
    }
}