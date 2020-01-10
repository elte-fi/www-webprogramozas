function showVolumes() {
    Array.from(document.querySelectorAll('#tracks .track'))
        .forEach(tr => {
            const vol = tr.querySelector('[type=range]').value
            tr.querySelector('span').innerHTML = vol
            tr.querySelector('span').style.backgroundColor = `hsl(${100-vol},${vol}%,50%)`
        })
}

document.querySelector('#tracks').addEventListener('input', onRangeChange)
function onRangeChange(e) {
    if (e.target.matches('[type=range]')) {
        // const span = e.target.previousElementSibling
        // span.innerHTML = e.target.value
        showVolumes()
        updateActTrack()
    }
}

let actTrack
document.addEventListener('keydown', onKeyDown)
function onKeyDown(e) {
    if (e.key === 'ArrowRight') {
        if (actTrack && actTrack.nextElementSibling) {
            actTrack = actTrack.nextElementSibling
        } else {
            actTrack = document.querySelector('#tracks .track:first-child')
        }
    }
    else if (e.key === 'ArrowLeft') {
        if (actTrack && actTrack.previousElementSibling) {
            actTrack = actTrack.previousElementSibling
        } else {
            actTrack = document.querySelector('#tracks .track:last-child')
        }
    }
    else if (e.key === 'ArrowUp') {
        Array.from(document.querySelectorAll('#tracks .track [type=checkbox]:checked')).forEach(chk => chk.previousElementSibling.stepUp())
        showVolumes()    
    }
    else if (e.key === 'ArrowDown') {
        Array.from(document.querySelectorAll('#tracks .track [type=checkbox]:checked')).forEach(chk => chk.previousElementSibling.stepDown())
        showVolumes()    
    }
    else if (e.key === 's') {
        Array.from(document.querySelectorAll('#tracks .track [type=checkbox]')).forEach(chk => chk.checked = true)
    }
    else if (e.key === 'd') {
        Array.from(document.querySelectorAll('#tracks .track [type=checkbox]')).forEach(chk => chk.checked = false)
    }
    else if (e.key === ' ') {
        if (actTrack) {
            const chk = actTrack.querySelector('[type=checkbox]')
            chk.checked = !chk.checked
        }
    }
    updateActTrack()
}
function updateActTrack() {
    Array.from(document.querySelectorAll('#tracks .track')).forEach(tr => tr.classList.remove('active'))
    if (actTrack) {
        actTrack.classList.add('active')
    }

    Array.from(document.querySelectorAll('#tracks .track [type=checkbox]')).forEach(chk => chk.closest('.track').classList.toggle('selected', chk.checked))

    const ranges = Array.from(document.querySelectorAll('#tracks .track [type=range]'))
    const avgVol = ranges.map(r => r.valueAsNumber).reduce((s, act) => s + act, 0) / ranges.length
    const spans = Array.from(document.querySelectorAll('#status span'))
    const greenSpans = spans.length * avgVol / 100
    spans.forEach((s, i) => s.classList.toggle('active', i < greenSpans))
}

showVolumes()
updateActTrack()

document.querySelector('nav button').addEventListener('click', onSave)
async function onSave(e) {
    document.querySelector('nav button span').innerHTML = '⌛'

    const json = Array.from(document.querySelectorAll('#tracks .track')).map(tr => ({
        id: tr.dataset.id,
        vol: tr.querySelector('[type=range]').value
    }))
    const fd = new FormData()
    fd.append('json', JSON.stringify(json))
    const response = await fetch('ajax_save.php', {
        body: fd,
        method: 'POST',
    })
    document.querySelector('nav button span').innerHTML = '✔'
}