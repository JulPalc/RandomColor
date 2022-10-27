const cols = document.querySelectorAll('.col');
const modal = document.querySelector('.modal');

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code === 'Space') {
        setRandomColors()
    }
})
document.addEventListener('click', (e) => {
    e.preventDefault()
    modal.classList.add('close')
})

function copyNameColor(text) {
    modal.classList.remove('close')

    return navigator.clipboard.writeText(text)
}

document.addEventListener('click', e => {
    const type = e.target.dataset.type

    if (type === 'lock'){
       const node = e.target.tagName.toLowerCase() === 'i'
            ? e.target : e.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyNameColor(e.target.textContent)
    }
})

function generateRandomColor() {

    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for( let i = 0; i < 6; i++){
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsHash() : [];

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
    : chroma.random();

        if(!isInitial) {
            colors.push(color)
        }

        text.textContent = color;
        col.style.background = color;

        setTextColor(text, color)
        setTextColor(button, color)
    })
    updateColorsHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1)
    })
        .join('-')
}
function getColorsHash() {
    if (document.location.hash.length > 1){
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return []
}

setRandomColors(true)

