
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

const products = [
    {
        name: "Brigadeiro",
        image: "https://ik.imagekit.io/artim/image_1.png?updatedAt=1685961484507",
        minCount: "04",
        maxCount: "100",
        value: "10"
    },
    {
        name: "Pudim",
        image: "https://ik.imagekit.io/artim/pudim-img-wini.png?updatedAt=1685965485229",
        minCount: "01",
        maxCount: "100",
        value: "00"
    },
    {
        name: "Bem casado",
        image: "https://ik.imagekit.io/artim/Bem-Casado-05.png?updatedAt=1685966512244",
        minCount: "04",
        maxCount: "100",
        value: "02"
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
}
 


corrousel();