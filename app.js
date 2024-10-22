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
setupSlider("slider5", "foreground-img-5", "slider-button-5");
setupSlider("slider6", "foreground-img-6", "slider-button-6");

//VIDEOS SECTION
function openModal(videoId, title) {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("modalVideo");

  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  console.log(iframe);
  iframe.classList.remove("w-full");
  iframe.classList.add("w-screen");
  console.log(iframe);

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("modalVideo");

  iframe.src = ""; // Videoyu durdurmak için src'yi temizliyoruz
  modal.classList.add("hidden");
}

function closeModalOnOutsideClick(event) {
  const modal = document.getElementById("videoModal");
  if (event.target === modal) {
    closeModal();
  }
}

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
const itemsPerSlide = 1; // Geçişte gösterilecek yorum sayısı
let currentIndex = 0;

// Sağ ok tıklaması
next.addEventListener("click", () => {
  if (currentIndex < totalItems - itemsPerSlide) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  commentSlider.style.transform = `translateX(-${
    (currentIndex * 100) / itemsPerSlide
  }%)`;
});

// Sol ok tıklaması
prev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalItems - itemsPerSlide;
  }
  commentSlider.style.transform = `translateX(-${
    (currentIndex * 110) / itemsPerSlide
  }%)`;
});

(function () {
  emailjs.init("8iPf92I1ZRlPE43yY"); // EmailJS kullanıcı ID'nizi buraya ekleyin
})();

function sendEmail(form) {
  event.preventDefault(); // Varsayılan form gönderimini engelle

  // Formda boş alan olup olmadığını kontrol eden kısım
  let inputs = form.querySelectorAll("input, textarea, select"); // Formdaki tüm input, textarea ve select elementleri alınıyor
  for (let input of inputs) {
    if (input.value.trim() === "") {
      // Eğer alan boşsa
      alert("Lütfen tüm alanları doldurun.");
      return; // Fonksiyonu durdur ve formu gönderme
    }
  }

  // Eğer tüm alanlar doluysa email gönderme işlemi başlar
  emailjs.sendForm("service_6obtnl9", "template_h6mv3u5", form).then(
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
  const slide = slides[0]; // İlk slaytı al
  const slideWidth = slide.offsetWidth; // Genişlik (padding + border dahil)
  const marginRight = parseInt(window.getComputedStyle(slide).marginRight); // Sağ margin değerini al

  // Toplam genişlik: slayt genişliği + sağ margin
  const totalSlideWidth = slideWidth + marginRight;

  // Slider'ı kaydır
  sliderContainer.style.transform = `translateX(${
    -currentIndex2 * totalSlideWidth - 40
  }px)`;
}