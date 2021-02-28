"use strict";

/**
 * 검색창 제어
 */
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");
// 검색창 요소를 클릭하면 실행.
searchEl.addEventListener("click", function () {
  searchInputEl.focus();
});
// 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
searchInputEl.addEventListener("focus", function () {
  searchEl.classList.add("focused");
  searchInputEl.setAttribute("placeholder", "통합검색");
});
// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행.
searchInputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
});

/**
 * 페이지 스크롤에 따른 요소 제어
 */
const badgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector("#to-top");
// 페이지에 스크롤 이벤트를 추가!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
// _.throttle(함수, 시간) 시간은 함수를 사용할 시간 (lodash.js)
// gsap.to(요소, 지속시간(초단위), 옵션); 숫자는 그대로 작성해도 되지만 문자 데이터는 따옴표로 묶어준다
window.addEventListener(
  "scroll",
  _.throttle(function () {
    // 페이지 스크롤 위치가 500px이 넘으면.
    if (window.scrollY > 500) {
      // 배지 숨기기
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: "none",
      });
      // to-top 버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      // 배지 보이기
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      // to-top 버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        x: 100,
      });
    }
  }, 300)
);
// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener("click", function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

/**
 * 순서대로 나타나는 기능
 */
// VISUAL
const fadeEls = document.querySelectorAll(".fade-in");
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    // 각 요소들을 순서대로(delay) 보여지게 함!
    delay: (index + 1) * 0.7,
    opacity: 1,
  });
});

/**
 * 슬라이드 요소 관리
 */
// Swiper
// new Swiper(선택자, 옵션)
new Swiper(".notice-line .swiper-container", {
  direction: "vertical", // 슬라이드 방향
  autoplay: true, // 자동 시작
  loop: true, // 1번과 끝 슬라이드 다음에 반복할지 결정
});

new Swiper(".promotion .swiper-container", {
  // direction : 'horizontal', 기본값이 horizontal 이다
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데에서 시작
  loop: true,
  // autoplay: {
  //   delay: 5000,
  // },
  pagination: {
    el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번ㅂ호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
});
// AWARDS
new Swiper(".awards .swiper-container", {
  direction: "horizontal",
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});

/**
 * Promotion 슬라이드 토글 기능
 */
// toggle-promotion
const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false;
promotionToggleBtn.addEventListener("click", function () {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add("hide");
  } else {
    // 보임 처리
    promotionEl.classList.remove("hide");
  }
});

/**
 * 부유하는 요소 관리
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
// youtube에 떠다니는 애니메이션
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      // 옵션
      y: size, // 바운딩되는 범위
      repeat: -1, // gsap가 제공하는 무한이라는 뜻
      yoyo: true, // 반복 될 때 좀 더 자연스럽게 효과를 줌
      // gsap easing : https://greensock.com/docs/v2/Easing
      ease: Power1.easeInOuteaseInOut,
      delay: random(0, delay),
    }
  );
}
floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// Scroll Magic
const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, // 트리거가 반응하는 위치
  })
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller());
});

/**
 * 올해가 몇 년도인지 계산
 */
// Footer this-year
const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); //2021
