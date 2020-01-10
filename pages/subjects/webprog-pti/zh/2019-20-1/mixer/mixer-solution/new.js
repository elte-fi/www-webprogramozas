const all = document.querySelector('#all')
const selected = document.querySelector('#selected')

document.querySelector('#select').addEventListener('click', onSelect)
document.querySelector('#deselect').addEventListener('click', onDeselect)
document.querySelector('#moveup').addEventListener('click', onMoveUp)
document.querySelector('#movedown').addEventListener('click', onMoveDown)

function onSelect(e) {
    if (all.selectedIndex > -1) {
        const option = all.selectedOptions[0]
        selected.add(option)
    }
    generateFiltersText()
}
function onDeselect(e) {
    if (selected.selectedIndex > -1) {
        const option = selected.selectedOptions[0]
        all.add(option)
    }
    generateFiltersText()
}
function onMoveUp(e) {
    if (selected.selectedIndex > 0) {
        const option = selected.selectedOptions[0]
        selected.add(option, selected.selectedIndex - 1)
    }
    generateFiltersText()
}
function onMoveDown(e) {
    if (selected.selectedIndex < selected.options.length - 1) {
        const option = selected.selectedOptions[0]
        selected.add(option, selected.selectedIndex + 2)
    }
    generateFiltersText()
}
function generateFiltersText() {
    document.querySelector('textarea').value = 
        Array.from(selected.options).map(o => o.text).join('\n')
}

// document.querySelector('textarea').hidden = true