
const carrouselNext = document.getElementById("slide-next");
const carrouselPrevious = document.getElementById("slide-previous");

const carrouselMainImage = document.getElementById("slide-main-image");
const carrouselLeftImage = document.getElementById("slide-left-image");
const carrouselRightImage = document.getElementById("slide-right-image");

const orderOuput = document.getElementById("order-output");

const orderCounter = document.getElementById("order-counter");
const orderValue = document.getElementById("order-value");

const orderValueNext = document.getElementById("order-value-next");
const orderValuePrevious = document.getElementById("order-value-previous");

const valueLabel = document.querySelector(".value-label");

const goOrder = document.getElementById("go-order");

const slideMainContainer = document.getElementById("slide-main-image-container");

const goWhatsapp = document.getElementById("go-whatsapp");
const goInstagram = document.getElementById("go-instagram");

const loadingContainer = document.getElementById("loading-container");

const products = [
    {
        name: "Brigadeiro",
        image: "https://avidadoce.com/wp-content/uploads/2020/05/brigadeiros-gourmet-e1590075452121.jpg",
        minCount: "04",
        maxCount: "30",
        value: "10"
    },
    {
        name: "Pudim",
        image: "https://tradicionalbolosetortas.com.br/wp-content/uploads/2018/12/linha-zero-acucar-mini-pudim-gourmet-diet.jpg",
        minCount: "01",
        maxCount: "20",
        value: "02"
    },
    {
        name: "Bem casado",
        image: "https://t1.uc.ltmcdn.com/pt/posts/2/4/0/como_fazer_bem_casado_20042_orig.jpg",
        minCount: "04",
        maxCount: "20",
        value: "10"
    }
]

const orderValuerProperties = orderValue.getBoundingClientRect();
valueLabel.style.width = orderValuerProperties.width + 10 + "px";

let carrouselStep = 0;

function corrousel(){ 

    carrouselMainImage.src = products[0].image;
    carrouselLeftImage.src = products[1].image;
    carrouselRightImage.src = products[2].image;
    orderOuput.innerHTML = `Encomendar <b>${products[0].name}</b> via <b>WhatsApp</b>`;

    carrouselNext.addEventListener("click",function(){ 
        slideMainContainer.style.animation = "slideRight 0.1s linear";
        setTimeout(() => {
            slideMainContainer.style.animation = "";
        }, 200);
        carrouselStep++;
        if ( carrouselStep > products.length -1 ){
            carrouselStep = 0;
        }
        carrouselMainImage.src = products[carrouselStep].image;
        carrouselLeftImage.src = products[carrouselStep].image;
        carrouselRightImage.src = products[carrouselStep].image;
        orderOuput.innerHTML = `Encomendar <b>${products[carrouselStep].name}</b> via <b>WhatsApp</b>`;
        orderCounter.textContent = products[carrouselStep].minCount;
        orderValue.textContent = `R$ ${products[carrouselStep].value},00`; 

    });

    carrouselPrevious.addEventListener("click",function(){
        slideMainContainer.style.animation = "slideLeft 0.1s linear";
        setTimeout(() => {
            slideMainContainer.style.animation = "";
        }, 200);
    });

    let currentValue = parseInt(products[carrouselStep].minCount);
    let minValue = parseInt(products[carrouselStep].minCount);
    let maxValue = parseInt(products[carrouselStep].maxCount);


    function productCounter() {
        let doubledValue = 2 * currentValue;
        if (doubledValue <= maxValue) {
            currentValue = doubledValue;
        }
        orderCounter.textContent = currentValue.toString().padStart(2, "0");
    }
    
    function halveValue() {
        let halvedValue = currentValue / 2;
        if (halvedValue >= minValue) {
            currentValue = halvedValue;
        }
        orderCounter.textContent = currentValue.toString().padStart(2, "0");
    } 

    orderValueNext.addEventListener("click", productCounter);
    orderValuePrevious.addEventListener("click", halveValue);



    goOrder.addEventListener("click",function(){ 

        let getProductName = products[carrouselStep].name;
        let getProductUnits = orderCounter.textContent;
        let getOrderValue = orderValue.textContent;

        const text = `Olá, Gostaria de ${getProductUnits} unidades de ${getProductName} - ${getOrderValue}`; 
    
        let textToLink = text.replace(/\s/g, "%20");
    
        console.log(text)
    
        window.location.href = `https://api.whatsapp.com/send?phone=558182819265&text=Ol%C3%A1%2C%20${textToLink}%0A%0A`;
    })
}

goInstagram.addEventListener("click",function(){
    window.location.href = `https://www.instagram.com/wini.docinhos/`;
})

goWhatsapp.addEventListener("click",function(){
    window.location.href = `https://api.whatsapp.com/send?phone=558182819265`;
})

corrousel();

setTimeout(() => {
    loadingContainer.style.display = "none";
}, 3000);  