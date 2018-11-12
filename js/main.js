/*-------Sections-------
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
