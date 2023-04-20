const container = document.querySelector('.gadgetsContainer')
const previewContainer = document.querySelector('.previewContainer')
const imageURL = 'https://raw.githubusercontent.com/sharadTT/doraemon-gadgets/main/images/gadget-images/'
const gadgetNameURL = 'https://raw.githubusercontent.com/sharadTT/doraemon-gadgets/main/files/'
let gadgetNumber = 1
let maxGadgetNumber = 226
let myArray = []
let scrollFlag = false

//Search functionality
function getGadgetNames() {
    for (let i = 0; i < maxGadgetNumber; i++) {
        const fileName = `${gadgetNameURL}${i + 1}.txt`
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                myArray[i] = data // Assign data to second column
                // console.log(myArray[i]) // Print index and data
            })
            .catch(error => console.error(error));
    }
}

getGadgetNames()


const suggestions = myArray;
const inputField = document.getElementById("search-input");
const suggestionList = document.getElementById("suggestion-list");

inputField.addEventListener("input", function () {
    const inputValue = inputField.value.toLowerCase();
    const matchingSuggestions = suggestions.filter(function (suggestion) {
        const lowerCaseSuggestion = suggestion.toLowerCase();
        return lowerCaseSuggestion.includes(inputValue);
    });

    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

    if (inputValue.length > 0) {
        const matchingSuggestions = suggestions
          .map(function(suggestion, index) {
            const lowerCaseSuggestion = suggestion.toLowerCase();
            return lowerCaseSuggestion.includes(inputValue) ? index : null;
          })
          .filter(function(index) {
            return index !== null;
          });
    
        //console.log("Matching indices:", matchingSuggestions);

        matchingSuggestions.forEach(function (suggestion) {
            loadSingleGadget(suggestion+1)
            scrollFlag = false
        })
    }
    else {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        loadGadgets(20, 1)
    }
});

function loadGadgetInfo(index) {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    overlay.style.zIndex = 5;
    container.style.pointerEvents = 'none'
    previewContainer.style.display = 'flex'

    //console.log(`Image ${index} clicked`)
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
            textElement.style.fontSize = '1rem'
            textElement.style.color = 'black'
            textElement.style.display = "inherit"

        })
        .catch(error => console.error(error));

    preview.appendChild(img)
    // img.style.height = "15em"
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

function loadSingleGadget(index) {
    // console.log('Loading gadget: ', index)
        const card = document.createElement('div')
        card.classList.add('gadgetCard')
        const img = document.createElement('img')
        img.src = `${imageURL}${index}.png`

        // Create a closure using an IIFE to capture the current value of i
        const onClickHandler = (function (index) {
            return function () {
                loadGadgetInfo(index)
            }
        })(index)

        // Add click event listener to the img element
        img.addEventListener('click', onClickHandler)

        const fileName = `${gadgetNameURL}${index}.txt`
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                const textNode = document.createTextNode(data)
                const textElement = document.createElement('p') // create a new <p> element
                textElement.appendChild(textNode) // append the text node to the <p> element
                card.appendChild(img)
                card.appendChild(textElement) // append the <p> element to the container

                // img.style.height = "10em"
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
    }

function loadGadgets(numImages = 8, startIndex) {
    scrollFlag = true
    let i = 0;
    gadgetNumber = startIndex
    while (i < numImages) {

        loadSingleGadget(gadgetNumber)

        i++
        gadgetNumber++
    }
}

loadGadgets(20,1)

magicScroll()

function magicScroll() {
    console.log(scrollFlag)

    window.addEventListener('scroll', () => {
        if (scrollFlag) {
            if (gadgetNumber <= maxGadgetNumber) {
                if (window.scrollY + window.innerHeight + 500 >= document.documentElement.scrollHeight) {
                    loadGadgets(2, gadgetNumber)
                }
            }
        }
    })
}

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

function myFunction() {
    var loader = document.querySelector(".preloader")
    loader.classList.add("preloader--hidden")
}

window.addEventListener("load", function () {
    setTimeout(myFunction, 500);
})