const slider = document.getElementById("js-cta-slider");
const sliderWrapper = document.querySelector(".swiper-wrapper")
const sliderContent = document.querySelector(".slider-content-wrapper")
let sliderContentChilds = ''

const slides = [
  {
    title: 'Light Interior',
    category: 'Branding',
    img: '../img/home-6-1.jpg'
  },
  {
    title: 'Modern Workspace',
    category: 'Photography',
    img: '../img/home-6-2.jpg'
  },
  {
    title: 'Minimalist Building',
    category: 'Design',
    img: '../img/home-6-3.jpg'
  },
  {
    title: 'Light Breakfast',
    category: 'Photography',
    img: '../img/home-6-4.jpg'
  }
]

const interleaveOffset = 0.75;

function addImg(arr) {
  for (let i in arr) {
    sliderWrapper.innerHTML += `
    <div class="slider__item swiper-slide">
      <div class="media-wrapper slide-inner">
        <img src="${arr[i].img}" alt="home">
      </div>
    </div>`
  }
}

function addContent(arr) {
  for (let i in arr) {
    sliderContent.innerHTML += `
    <div class="slider-content">
      <div class="slider-content__category">
        <p><a href="#${arr[i].category}">${arr[i].category.toUpperCase()}</a></p>
      </div>
      <div class="slider-content__title">
        <h1><a href="#${arr[i].title}">${arr[i].title.toUpperCase()}</a></h1>
      </div>
    </div> 
    `
  }
  sliderContentChilds = sliderContent.children

}

addImg(slides)
addContent(slides)


const swiper = new Swiper(slider, {
  direction: "vertical",
  speed: 800,
  watchSlidesProgress: true,
  mousewheelControl: true,
  mousewheel: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + ('0' + (index + 1)) + '</span>';
    },
  },
  on: {
    init: function() {
      sliderContentChilds[this.activeIndex].classList.add('active')
    },
    slideChange: function () {
      let arrOfSlides = [].slice.call(sliderContentChilds);
      console.log(this.activeIndex)
      for (let i in arrOfSlides) {
        if (sliderContentChilds[i].classList.contains('active')) {
          sliderContentChilds[i].classList.remove('active')
        }
      }
      sliderContentChilds[this.activeIndex].classList.add('active')
    },
    progress: function() {
      let swiper = this;

      for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress;
        let innerOffset = swiper.height * interleaveOffset;
        let innerTranslate = slideProgress * innerOffset;

        TweenMax.set(swiper.slides[i].querySelector(".slide-inner"), {
          y: innerTranslate,
        });
      }
    },
    touchStart: function() {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function(slider, speed) {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-inner").style.transition =
          speed + "ms";
      }
    }
  }
});
