jQuery(function ($) {

    'use strict';

    // --------------------------------------------------------------------
    // PreLoader
    // --------------------------------------------------------------------

    (function () {
        $('#preloader').delay(200).fadeOut('slow');
    }());


}); // JQuery end

 // Adding some styles with transitions
 const style = document.createElement('style');
 const initialScale = 0.4;
 style.innerHTML = `
 portal {
    border-radius: 50px;
    position: fixed;
	width: 70%;
	height: 70%;
	opacity: 0;
	box-shadow: 0 0 20px 10px #999;
	transform: scale(0.4);
	transform-origin: bottom right;
	bottom: 20px;
	right: 20px;
	animation-name: fade-in;
	animation-duration: 1s;
	animation-delay: 2s;
	animation-fill-mode: forwards;
 }
 .portal-transition {
   transition:
     transform 0.4s,
     bottom 0.7s,
     left 0.7s,
     opacity 1.0s;
 }
 @media (prefers-reduced-motion: reduce) {
   .portal-transition {
     transition: all 0.001s;
   }
 }
 .portal-reveal {
   transform: scale(1.0);
   bottom: 0px;
   left: 0px;
 }
 .fade-in {
   opacity: 1.0;
 }
`;
 if ('HTMLPortalElement' in window) {
   const portal = document.createElement('portal');

   portal.src = 'https://mquanit.netlify.com/';

   portal.classList.add('portal-transition');

   portal.addEventListener('click', evt => {
     // Animate the portal once user interacts
     portal.classList.add('portal-reveal');
   });
   portal.addEventListener('transitionend', evt => {
     console.log(evt)
     if (evt.propertyName == 'bottom') {
       // Activate the portal once the transition has completed
       portal.activate({ data: { 'somekey': 'somevalue' } });
     }
   });


   document.body.append(style, portal);


   setTimeout(() => portal.classList.add('fade-in'), 2000);

   window.addEventListener('portalactivate', evt => {
     // Data available as evt.data
     const data = evt.data;
   });
 }

 // if (window.portalHost) {
 //   portal.postMessage({ someKey: 'width: 50%' });
 //   window.portalHost.addEventListener('message', evt => {
 //     console.log(evt);
 //     const data = evt.data.someKey
 //   })
 // }