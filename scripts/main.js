let index = 0; 

function showSlide() { 
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length; 

    console.log(totalSlides)
    if (index >= totalSlides) { 
        index = 0; 
    } else if (index < 0) { 
        index = totalSlides - 1; 
    } 
    
    slides.style.transform = `translateX(-${index * 100}%)`; 
} 

document.getElementById('next').addEventListener('click', () => { 
    index++;
    showSlide(); 
});

document.getElementById('prev').addEventListener('click', () => {
    index--;
    showSlide(); 
}); 

setInterval(() => { 
    index++; 
    showSlide(); 
}, 3000);






  