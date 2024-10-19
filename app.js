function setupSlider(sliderId, foregroundClass, buttonClass) {
  const slider = document.getElementById(sliderId);

  slider.addEventListener("input", function (e) {
    const sliderPos = e.target.value;

    // Foreground div genişliğini ayarla
    document.querySelector(`.${foregroundClass}`).style.width = `${sliderPos}%`;

    // Slider butonunu konumlandır
    const sliderButton = document.querySelector(`.${buttonClass}`);
    sliderButton.style.left = `calc(${sliderPos}% - ${
      sliderButton.offsetWidth / 2
    }px)`;
  });

  // İlk yükleme sırasında butonun başlangıç konumunu ayarla
  const initialPos = slider.value; // Başlangıç değeri
  const sliderButton = document.querySelector(`.${buttonClass}`);
  sliderButton.style.left = `calc(${initialPos}% - ${
    sliderButton.offsetWidth / 2
  }px)`;
}

setupSlider("slider1", "foreground-img-1", "slider-button-1");
setupSlider("slider2", "foreground-img-2", "slider-button-2");
setupSlider("slider3", "foreground-img-3", "slider-button-3");
setupSlider("slider4", "foreground-img-4", "slider-button-4");


//VIDEOS SECTION
function playVideo(overlay) {
  overlay.style.display = "none";

  const iframe = overlay.previousElementSibling;
  const video = iframe.contentWindow;
  video.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
}

//PACKAGE SECTION
const hoverDivs = document.querySelectorAll(".hoverDiv");

hoverDivs.forEach((hoverDiv) => {
  const tikImages = hoverDiv.querySelectorAll(".tikHoverGold");

  hoverDiv.addEventListener("mouseover", function () {
    tikImages.forEach((img) => {
      img.src = "img/tikGold.svg";
    });
  });

  hoverDiv.addEventListener("mouseout", function () {
    tikImages.forEach((img) => {
      img.src = "img/tikGray.svg";
    });
  });
});

//SSS İÇİN
function toggleAnswer(id) {
  const answer = document.getElementById(`answer-${id}`);
  const icon = document.getElementById(`icon-${id}`);

  if (answer.classList.contains("max-h-0")) {
    answer.classList.remove("max-h-0");
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-chevron-down");
  } else {
    answer.classList.remove("max-h-40");
    answer.classList.add("max-h-0");
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-plus");
  }
}

const commentSlider = document.querySelector(".comment-slider");
const prev = document.getElementById("prevComment");
const next = document.getElementById("nextComment");
const totalItems = commentSlider.children.length;
const itemsPerSlide = 3; // Bir slaytta gösterilecek yorum sayısı
let currentIndex = 0;

// Sağ ok tıklaması
next.addEventListener("click", () => {
  if (currentIndex < totalItems - itemsPerSlide) {
    currentIndex++; // Sadece 1 yorum kayacak
  } else {
    currentIndex = 0; // Sonraki kaydırmada başa döner
  }
  commentSlider.style.transform = `translateX(-${
    (currentIndex * 100) / itemsPerSlide
  }%)`;
});

// Sol ok tıklaması
prev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--; // Sadece 1 yorum kayacak
  } else {
    currentIndex = totalItems - itemsPerSlide; // Başa geldiğinde son gruba döner
  }
  commentSlider.style.transform = `translateX(-${
    (currentIndex * 100) / itemsPerSlide
  }%)`;
});

(function () {
  emailjs.init("8vULoMrf8RU4Dag1K"); // EmailJS kullanıcı ID'nizi buraya ekleyin
})();

function sendEmail(form) {
  event.preventDefault(); // Varsayılan form gönderimini engelle

  emailjs.sendForm("service_t211o8k", "template_p66bctd", form).then(
    function () {
      alert("Mesajınız gönderildi!");
    },
    function (error) {
      alert("Mesaj gönderilemedi: " + JSON.stringify(error));
    }
  );
}

// Tüm formları dinle
document.querySelectorAll(".contactForm").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    sendEmail(this); // Formun kendisini gönder
  });
});

const sliderContainer = document.getElementById("slider-container");
const slides = sliderContainer.children;
let currentIndex2 = 0;

document.getElementById("nextChange").addEventListener("click", () => {
  currentIndex2 = (currentIndex2 + 1) % slides.length;
  updateSlider();
});

document.getElementById("prevChange").addEventListener("click", () => {
  currentIndex2 = (currentIndex2 - 1 + slides.length) % slides.length;
  updateSlider();
});

function updateSlider() {
  const slideWidth = slides[0].clientWidth;
  sliderContainer.style.transform = `translateX(${
    -currentIndex2 * slideWidth
  }px)`;
}
