export function isWebp() {
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {
      let className = support === true ? 'webp' : 'no-webp';
      document.documentElement.classList.add(className);
   });
};

export function smoothScroll() {
   document.querySelectorAll('a[href^="#"').forEach(link => {

      link.addEventListener('click', function (e) {
         e.preventDefault();

         let href = this.getAttribute('href').substring(1);

         const scrollTarget = document.getElementById(href);

         const topOffset = 0 //document.querySelector('.scrollto').offsetHeight;
         const elementPosition = scrollTarget.getBoundingClientRect().top;
         const offsetPosition = elementPosition - topOffset;

         window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
         });
      });
   });
};

export function modal() {

   const noDefault = function (e) {
      e.preventDefault()
   };

   const noKeyPress = function (e) {
      let keyArray = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', ' ', 'Tab', 'Enter']
      for (let keyOff of keyArray) {
         if (e.key === keyOff) {
            e.preventDefault()
         }
      }
   };

   const disableScroll = function (e) {
      window.addEventListener("mousewheel", noDefault, {
         passive: !1
      });
      document.addEventListener("keydown", noKeyPress);
   };

   const enableScroll = function (e) {
      window.removeEventListener("mousewheel", noDefault, {
         passive: !1
      })
      document.removeEventListener("keydown", noKeyPress)
   };

   document.querySelectorAll('[data-target=modal]').forEach(openButton => {

      let modal = document.querySelector('.modal');
      let closeButton = modal.querySelector('.modal__close');
      let textArea = modal.querySelector('.form__text');
      let formInputs = modal.querySelectorAll('.form__input, .form__text')

      openButton.addEventListener('click', function () {
         if (modal) {
            modal.classList.add('active');
            disableScroll();
         };
      });
      textArea.addEventListener('focus', function () {
         document.removeEventListener("keydown", noKeyPress)
      });

      closeButton.addEventListener('click', function (e) {

         if (modal) {
            modal.classList.remove('active');
            enableScroll();
         };
      });
   });
};

