const container = document.querySelector('.gadgetsContainer')
const imageURL = 'https://raw.githubusercontent.com/sharadTT/doraemon-gadgets/main/images/gadget-images/'
const gadgetNameURL = 'https://raw.githubusercontent.com/sharadTT/doraemon-gadgets/main/files/'
let gadgetNumber = 1

function loadGadgets(numImages = 10) {
    let i = 0;
    while (i < numImages) {
        const card = document.createElement('div')
        card.classList.add('gadgetCard')
        const img = document.createElement('img')
        img.src = `${imageURL}${gadgetNumber}.png`

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

                // apply CSS styles to the <p> elements
                textElement.style.fontSize = '1.2rem'
                textElement.style.color = 'white'
                textElement.style.display = "inline"

                container.appendChild(card)

            })
            .catch(error => console.error(error));

        i++
        // gadgetNumber++
    }
}

loadGadgets()


window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        loadGadgets()
    }
})



//Button to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}