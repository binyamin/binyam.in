/*-------Modules-------
  - Navbar underline effect
  - Smooth scroll effect
  - Responsive Navbar & hamburger animation
  - Update copyright year
*/

// Navbar underline effect
const navlink = document.querySelectorAll('.nav-link');

navlink.forEach(function(e) {
    e.addEventListener('click', function(){
        navlink.forEach( a => a.classList.remove('current'));
        this.classList.toggle('current');
   	})
})

 //Smooth scroll effect
  var scrollLink = $('.scroll');
    scrollLink.click(function(e){
       e.preventDefault(); 
      $('body,html').animate({
        scrollTop: $(this.hash).offset().top
      }, 1000);
   });

//Responsive Navbar

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav');

hamburger.addEventListener('click', function(){
    this.classList.toggle('responsive');
    navMenu.classList.toggle('activeMenu');
 })

//Copyright Year
const copyYear = document.querySelector('.copy');

const now = new Date();
copyYear.innerHTML = now.getFullYear();
