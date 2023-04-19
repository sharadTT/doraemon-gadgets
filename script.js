const container = document.querySelector('.gadgetsContainer')
const previewContainer = document.querySelector('.previewContainer')
const imageURL = 'https://raw.githubusercontent.com/sharadTT/doraemon-gadgets/main/images/gadget-images/'
const gadgetNameURL = 'https://raw.githubusercontent.com/sharadTT/doraemon-gadgets/main/files/'
let gadgetNumber = 1
let maxGadgetNumber = 100

function loadGadgetInfo(index) {

    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    overlay.style.zIndex = 5;
    container.style.pointerEvents = 'none'
    previewContainer.style.display = 'flex'

    console.log(`Image ${index} clicked`)
    const preview = document.createElement('div')
    preview.classList.add('gadgetPreview')

    //Get Gadget Image
    const img = document.createElement('img')
    img.src = `${imageURL}${index}.png`

    //Get Gadget Name
    const fileName = `${gadgetNameURL}${index}.txt`
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            const textNode = document.createTextNode(data)
            const textElement = document.createElement('p') // create a new <p> element
            textElement.appendChild(textNode) // append the text node to the <p> element
            preview.appendChild(textElement) // append the <p> element to the container

            // apply CSS styles to the <p> elements
            textElement.style.fontSize = '1.2rem'
            textElement.style.color = 'black'
            textElement.style.display = "inherit"

        })
        .catch(error => console.error(error));


    //Get Gadget Info
    const fileInfo = `${gadgetNameURL}${index}-info.txt`
    fetch(fileInfo)
        .then(response => response.text())
        .then(data => {
            const textNode = document.createTextNode(data)
            const textElement = document.createElement('p') // create a new <p> element
            textElement.appendChild(textNode) // append the text node to the <p> element
            preview.appendChild(textElement) // append the <p> element to the container

            // apply CSS styles to the <p> elements
            textElement.style.fontSize = '1.2rem'
            textElement.style.color = 'black'
            textElement.style.display = "inherit"

        })
        .catch(error => console.error(error));

    preview.appendChild(img)
    img.style.height = "15em"
    img.style.width = "15em"
    img.style.margin = "0"
    img.style.marginTop = "2em"

    //Add button to close
    const close = document.createElement('button')    
    var closeImage = document.createElement('img');
    closeImage.src = 'images/close.png'
    closeImage.style.height = "2em"
    close.appendChild(closeImage);

    close.addEventListener('click', function () {
        overlay.style.display = 'none'
        preview.style.display = 'none'
        container.style.pointerEvents = 'auto'
    });

    preview.appendChild(close)
    previewContainer.appendChild(preview)
}

function loadGadgets(numImages = 20) {
    let i = 0;
    while (i < numImages) {
        const card = document.createElement('div')
        card.classList.add('gadgetCard')
        const img = document.createElement('img')
        img.src = `${imageURL}${gadgetNumber}.png`

        // Create a closure using an IIFE to capture the current value of i
        const onClickHandler = (function(gadgetNumber) {
            return function () {
                loadGadgetInfo(gadgetNumber+1)
            }
        })(i)

        // Add click event listener to the img element
        img.addEventListener('click', onClickHandler)

        const fileName = `${gadgetNameURL}${gadgetNumber}.txt`
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                const textNode = document.createTextNode(data)
                const textElement = document.createElement('p') // create a new <p> element
                textElement.appendChild(textNode) // append the text node to the <p> element
                card.appendChild(img)
                card.appendChild(textElement) // append the <p> element to the container

                img.style.height = "10em"
                img.style.width = "10em"
                img.style.margin = "0"
                img.style.marginTop = "2em"

                // apply CSS styles to the <p> elements
                textElement.style.fontSize = '1.2rem'
                textElement.style.color = 'black'
                textElement.style.display = "inline"

                container.appendChild(card)

            })
            .catch(error => console.error(error));

        i++
        gadgetNumber++
    }
}

loadGadgets()


window.addEventListener('scroll', () => {
    if (gadgetNumber < maxGadgetNumber) {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        loadGadgets()
    }
}
})

//Button to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', () => {
    // console.log(scrollY)
    scrollButton = document.querySelector(".topScrollButton");
    if (window.scrollY >= 200) {
        scrollButton.style.display = "flex";
    }
    else {
        scrollButton.style.display = "none";
    }
})
