/* 
    Image Preview
*/

const imageListElements = document.querySelectorAll('.image-list')
const imagePreviewElement = document.querySelector('.image-preview')

let imgElement = null

let selectedImage = {
    imageList: null, 
    img: null,
    index: -1
}

if (imagePreviewElement) {
    imgElement = imagePreviewElement.querySelector('.image img')

    // Close Preview
    document.addEventListener('keyup', e => {
        if (e.keyCode === 27) {
            closeImagePreview()
        }
    })
    
    imagePreviewElement.querySelector('.overlay').addEventListener('click', closeImagePreview)
    imagePreviewElement.querySelector('.close').addEventListener('click', closeImagePreview)

    // Prev And Next
    imagePreviewElement.querySelector('.image-prev').addEventListener('click', showPrevImage)
    imagePreviewElement.querySelector('.image-next').addEventListener('click', showNextImage)
}

imageListElements.forEach((imageListElement) => {
    [...imageListElement.children].forEach((imageContainer, index) => {
        addEventOnClickImage(imageListElement, imageContainer, index)
    })
})

function addEventOnClickImage(imageListElement, imageContainer, index) {
    const imgElement = imageContainer.querySelector('img')

    imgElement.addEventListener('click', e => {
        selectedImage.imageList = imageListElement
        selectedImage.img = e.target
        selectedImage.index = index

        showImagePreview(e)
    })
}

function showImagePreview(e) {
    if (!imagePreviewElement) {
        return
    }
    
    const src = e.target.src
    const alt = e.target.alt

    imgElement.src = src
    imgElement.alt = alt

    imagePreviewElement.classList.add('show')
}

function closeImagePreview() {
    imagePreviewElement.classList.remove('show')
}

function showPrevImage() {
    const imageElements = [...selectedImage.imageList.children]
    const totalData = imageElements.length

    let index = selectedImage.index - 1

    if (index < 0) {
        index = totalData - 1
    }

    const newImage = imageElements[index].querySelector('img')

    selectedImage.img = newImage
    selectedImage.index = index    

    imgElement.src = newImage.src
    imgElement.alt = newImage.alt
}

function showNextImage() {
    const imageElements = [...selectedImage.imageList.children]
    const totalData = imageElements.length
    const lastIndex = totalData - 1

    let index = selectedImage.index + 1

    if (index > lastIndex) {
        index = 0
    }

    const newImage = imageElements[index].querySelector('img')

    selectedImage.img = newImage
    selectedImage.index = index    

    imgElement.src = newImage.src
    imgElement.alt = newImage.alt
}
