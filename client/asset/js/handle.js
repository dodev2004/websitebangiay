// Header
window.onload = function(){
    {
        let icon_seachs = document.querySelectorAll(".box-action-icon")
        icon_seachs.forEach(icon_seach => {
            icon_seach.onclick = function(){
                event.stopPropagation();
                console.log("check");   
                const showup = this.parentElement.querySelector("div")
                var className = showup.className.split(" ");
                if(!(className.includes("active"))){
                    icon_seachs = document.querySelectorAll(".box-action-icon")
                    icon_seachs.forEach(content => {
                         const showup = content.parentElement.querySelector("div");
                          showup.classList.remove("active");
                     })
                    showup.classList.add("active")
                    className = showup.className.split(" ");
                } 
                else {
                    showup.classList.remove("active")
                }
            }
        })
        }
        // INPUT ACOUNT LABLE
        {
            const form = document.querySelector(".form-acount")
            const inputs = form.querySelectorAll("input");
            inputs.forEach(function (input) {
                input.onfocus = function(){
                    const lable = this.parentElement.querySelector("label")
                    lable.style.transform = "translateY(-12px) translateX(-5px)";
                }
                input.onblur = function(){
                    const lable = this.parentElement.querySelector("label")
                    lable.style.transform = "";
                }
            })
        }
        // Product_details
        {
            const sliders = document.querySelectorAll(".image-small_item");
            const slider_big = document.querySelector(".product-image_big > img");
            sliders.forEach(slider =>{
               
                 slider.onclick = function(){
                     sliders.forEach(classRV => classRV.classList.remove("active"));
                     slider.classList.add("active");
                    const index = slider.dataset["image"];
                 slider_big.src = `./img/slider/${index}.webp`
                 }
            })
        }
        
}
