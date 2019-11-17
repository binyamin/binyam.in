document.querySelector('.hamburger').addEventListener('click', function(){
    this.classList.toggle('responsive');
    document.querySelector('.nav').classList.toggle('activeMenu');
 })
