const carrouselNext = document.getElementById("slide-next");
const carrouselPrevious = document.getElementById("slide-previous");
const carrouselMainImage = document.getElementById("slide-main-image");
const carrouselLeftImage = document.getElementById("slide-left-image");
const carrouselRightImage = document.getElementById("slide-right-image");
const orderOutput = document.getElementById("order-output");
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
const counterLabel = document.getElementById("counter-label");
const type = document.querySelector(".type");
const logo = document.querySelector(".logo");
const productLabel = document.getElementById("product-label");
 
const products = [
  {
    name: "Brigadeiro",
    image: "https://avidadoce.com/wp-content/uploads/2020/05/brigadeiros-gourmet-e1590075452121.jpg",
    minCount: "01",
    maxCount: "30",
    value: "10",
    amount : "4"
  },
  {
    name: "Pudim",
    image: "https://tradicionalbolosetortas.com.br/wp-content/uploads/2018/12/linha-zero-acucar-mini-pudim-gourmet-diet.jpg",
    minCount: "01",
    maxCount: "20",
    value: "05",
    amount : "1"
  },
  {
    name: "Bem casado",
    image: "https://t1.uc.ltmcdn.com/pt/posts/2/4/0/como_fazer_bem_casado_20042_orig.jpg",
    minCount: "01",
    maxCount: "20",
    value: "10",
    amount : "4"
  },
  {
    name: "Bolo de pote",
    image: "https://static.itdg.com.br/images/1200-675/bfbc5532e36840b2a57e3849d82ad7a5/355179-original.jpg",
    minCount: "01",
    maxCount: "100",
    value: "05",
    amount : "1"
  }
];

let carrouselStep = 0;

function initializeCarousel() {
  carrouselMainImage.src = products[carrouselStep].image;
  carrouselLeftImage.src = products[carrouselStep].image;
  carrouselRightImage.src = products[carrouselStep].image;
  orderOutput.innerHTML = `Encomendar <b>${products[carrouselStep].name}</b> via <b>WhatsApp</b>`;
  orderCounter.textContent = products[carrouselStep].minCount;
  orderValue.textContent = `R$ ${products[carrouselStep].value},00`;
}

function updateCarousel(direction) {
  const animationClass = direction === "next" ? "slideRight" : "slideLeft";
  slideMainContainer.style.animation = `${animationClass} 0.1s linear`;
  setTimeout(() => {
      slideMainContainer.style.animation = "";
    }, 200);
    if (direction === "next") {
        carrouselStep = (carrouselStep + 1) % products.length;
    } else {
        carrouselStep = (carrouselStep - 1 + products.length) % products.length;
    }

    const productAmount = parseInt(products[carrouselStep].amount)
    let units = "Unidade";
    if ( productAmount > 1){
      units = "Unidades"
    }
  carrouselMainImage.src = products[carrouselStep].image;
  carrouselLeftImage.src = products[carrouselStep].image;
  carrouselRightImage.src = products[carrouselStep].image;
  orderOutput.innerHTML = `Encomendar <b>${products[carrouselStep].name}</b> via <b>WhatsApp</b>`;
  productLabel.textContent = `${products[carrouselStep].name} • ${products[carrouselStep].amount} ${units}`;
  orderCounter.textContent = products[carrouselStep].minCount;
  orderValue.textContent = `R$ ${products[carrouselStep].value},00`;
}

function productCounter(increase) {
  const minValue = parseInt(products[carrouselStep].minCount);
  const maxValue = parseInt(products[carrouselStep].maxCount);
  let currentValue = parseInt(orderCounter.textContent);
  let currentProductValue = parseInt(orderValue.textContent.match(/\d{2}/)[0]);

  if (increase) {
    currentValue++;
    currentProductValue += parseInt(products[carrouselStep].value);
    if (currentValue > maxValue) {
      currentValue = maxValue;
      currentProductValue = currentProductValue;
    }
  } else {
    currentValue--;
    currentProductValue -= parseInt(products[carrouselStep].value);;
    if (currentValue < minValue) { 
      currentValue = minValue;
      currentProductValue = currentProductValue;
    }
  }
  orderValue.textContent = `R$ ${currentProductValue},00`;
  orderCounter.textContent = currentValue.toString().padStart(2, "0");
}

function goToOrder() {
  const productName = products[carrouselStep].name;
  const productUnits = orderCounter.textContent;
  const orderValueText = orderValue.textContent;
  let single = "unidade";
  if (productUnits > 1){
    single = "unidades"
  }
  const text = `Gostaria de ${productUnits} ${single} de ${productName} - ${orderValueText}`;
  const cellNumber = "558182819265";
  const textToLink = encodeURIComponent(text);
  const whatsappLink = `https://api.whatsapp.com/send?phone=${cellNumber}&text=${textToLink}`;
  console.log(whatsappLink)
  window.location.href = whatsappLink;
}

function goToInstagram() {
  const instagramLink = "https://www.instagram.com/wini.docinhos/";
  window.location.href = instagramLink;
}

function goToWhatsApp() {
  const whatsappLink = "https://api.whatsapp.com/send?phone=558182819265";
  window.location.href = whatsappLink;
}

function hideLoadingContainer() {
  loadingContainer.style.display = "none";
  type.style.animation = "typeanim 0.3s linear both";
  logo.style.animation = "logoanim 0.3s linear both";
} 

carrouselNext.addEventListener("click", () => updateCarousel("next"));
carrouselPrevious.addEventListener("click", () => updateCarousel("previous")); 
orderValueNext.addEventListener("click", () => productCounter(true));
orderValuePrevious.addEventListener("click", () => productCounter(false));
goOrder.addEventListener("click", goToOrder);
goInstagram.addEventListener("click", goToInstagram);
goWhatsapp.addEventListener("click", goToWhatsApp);
setTimeout(hideLoadingContainer, 3000);

initializeCarousel();
