let imgs = Array.from(document.querySelectorAll('.img'))
let item = document.querySelectorAll('.item')
let slider = document.getElementById('slider')
let prevBtn = document.getElementById('prevBtn')
let nextBtn = document.getElementById('nextBtn')
let closeBtn = document.getElementById('closeBtn')
let imgSrc = document.getElementById('imgSrc')
let imgStopProp = document.getElementById('imgStopProp')
let touchStartX = 0
let touchEndX = 0
    // uncomment to enable swiping for close
    // let touchStartY = 0
    // let touchEndY = 0
let currentIndex

//adds animation classes
function showImage() {
    imgStopProp.classList.add('active')
    item[currentIndex].classList.add('opacityActive')
    document.body.classList.add('scroll-lock')
}
//removes animation classes
function removeImage() {
    imgStopProp.classList.remove('active')
    item[currentIndex].classList.remove('opacityActive')
    document.body.classList.remove('scroll-lock')
}

function animationAdd() {
    removeImage()
        //adds the .active class with a delay of 0.1s
    setTimeout(() => {
        showImage()
        imgSrc.setAttribute('src', imgs[currentIndex].getAttribute('src'))
    }, 300)
}

// gets current slide and increments/decrements it by 1 and checks if its in the range of the array
function slide(i) {
    item[currentIndex].classList.remove('opacityActive')
    currentIndex = currentIndex + i
    if (currentIndex > imgs.length - 1) {
        currentIndex = 0
    } else if (currentIndex < 0) {
        currentIndex = imgs.length - 1
    }
}

//Adds an event listener to every image in the array
function setImage(e, i) {
    slider.classList.replace('d-none', 'd-flex')
    setTimeout(() => {
            showImage()
        }, 10)
        //checks if the current target is an image tag else goes to the closest image tag
    imgSrc.src = e.target.tagName == 'img' ?
        e.target.src : e.target.closest('.item').querySelector('img').src
    currentIndex = i
}
item.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        setImage(e, index)
    })
})

//Changes the source to the next slide
function nextSlide() {
    slide(1)
    animationAdd()
}

//Closes the slide
function closeSlide() {

    removeImage()
    setTimeout(() => {
        slider.classList.replace('d-flex', 'd-none')
    }, 300)


}

//Changes the source to the previous slide
function prevSlide() {
    slide(-1)
        //removes the .active class
    animationAdd()
}

//Event listeners for the above functions
prevBtn.addEventListener("click", prevSlide)
nextBtn.addEventListener("click", nextSlide)
closeBtn.addEventListener("click", closeSlide)
    //Event listener for keyboard keys
document.addEventListener("keyup", function(e) {
        if (imgStopProp.classList.contains('active')) {
            if (e.key == "Escape") {
                closeSlide()
                removeImage()
                    //adds the .active class with a delay of 0.1s
                setTimeout(() => {
                    removeImage()
                }, 300)
            } else if (e.key == "ArrowRight") {
                slide(1)
                animationAdd()

            } else if (e.key == "ArrowLeft") {
                slide(-1)
                animationAdd()
            } else if (e.key == "ArrowUp" || e.key == 'ArrowDown') {
                closeSlide()
            }
        } else return
    })
    //Event listener for keybind ctrl & a
document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.key == 'a') {
        e.preventDefault()
        if (slider.classList.contains('d-none')) {
            slider.classList.replace('d-none', 'd-flex')
            removeImage()
                //adds the .active class with a delay of 0.1s
            setTimeout(() => {
                showImage()
                imgSrc.setAttribute('src', imgs[0].getAttribute('src'))
            }, 300)
        } else {
            closeSlide()
        }
        currentIndex = 0
    }
})

// closes the slider popup when clicked outside of the image
slider.addEventListener("click", closeSlide);
//prevents close when image is clicked
imgStopProp.addEventListener("click", function(e) {
    e.stopPropagation();
});


// gets the initial touch points and the ending touch points and subtracts them to do the desired action
function handleGesture() {
    touchResX = touchEndX - touchStartX
    if (touchResX < -40) nextSlide()
    if (touchResX > 40) prevSlide()
        //uncomment to allow closing slider with swiping up and down
        // touchResY = touchEndY - touchStartY
        // if (touchResY < -50) closeSlide()
        // if (touchResY > 50) closeSlide()
}

//Event Listener to get the starting touch points
slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX
        //uncomment to allow closing slider with swiping up and down
        // touchStartY = e.changedTouches[0].screenY
})

//Event Listener to get the end touch points
slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX
        //uncomment to allow closing slider with swiping up and down
        // touchEndY = e.changedTouches[0].screenY
    handleGesture()
})