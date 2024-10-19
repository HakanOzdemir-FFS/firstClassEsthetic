function setupSlider(sliderId, foregroundClass, buttonClass) {
  const slider = document.getElementById(sliderId);

  slider.addEventListener("input", function (e) {
    const sliderPos = e.target.value;

    document.querySelector(`.${foregroundClass}`).style.width = `${sliderPos}%`;

    const sliderButton = document.querySelector(`.${buttonClass}`);
    sliderButton.style.left = `calc(${sliderPos}% - ${
      sliderButton.offsetWidth / 2
    }px)`;
  });
}

setupSlider("slider", "foreground-img", "slider-button");
setupSlider("slider1", "foreground-img-2", "slider-button-2");
setupSlider("slider2", "foreground-img-3", "slider-button-3");

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

//KAYAN SLİDER YAPIMI İÇİN
const slider = document.getElementById("floatingSlider");
const slides = slider.children;
const dots = document.querySelectorAll(".dot");
let index = 0;
let slideInterval;

// Slider'ı belirli aralıklarla otomatik kaydır
function startAutoSlide() {
  slideInterval = setInterval(() => {
    goToNextSlide();
  }, 5000); // Her 3 saniyede bir geçiş
}

function goToNextSlide() {
  index = (index + 1) % slides.length;
  updateSliderPosition();
}

function goToPrevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateSliderPosition();
}

function goToSlide(slideIndex) {
  index = slideIndex;
  updateSliderPosition();
}

function updateSliderPosition() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot, dotIndex) => {
    if (dotIndex === index) {
      dot.classList.add("bg-gray-800");
      dot.classList.remove("bg-gray-400");
    } else {
      dot.classList.add("bg-gray-400");
      dot.classList.remove("bg-gray-800");
    }
  });
}

// Butonlara tıklama işlemleri
document.getElementById("next").addEventListener("click", () => {
  clearInterval(slideInterval); // Tıklanırsa otomatik kaydırmayı durdur
  goToNextSlide();
  startAutoSlide(); // Sonra tekrar başlat
});

document.getElementById("prev").addEventListener("click", () => {
  clearInterval(slideInterval); // Tıklanırsa otomatik kaydırmayı durdur
  goToPrevSlide();
  startAutoSlide(); // Sonra tekrar başlat
});

// Gösterge noktalarına tıklama işlemleri
dots.forEach((dot, dotIndex) => {
  dot.addEventListener("click", () => {
    clearInterval(slideInterval); // Tıklanırsa otomatik kaydırmayı durdur
    goToSlide(dotIndex);
    // Bu kısımda "startAutoSlide()" fonksiyonu çağrılmayacak
  });
});

// Otomatik kaydırmayı başlat
startAutoSlide();

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
