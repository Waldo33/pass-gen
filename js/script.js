window.addEventListener('load', async () => {
    if('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('/sw.js')
    }
})

function setLoading(status) {
    if(status) {
        document.querySelector('.output').innerHTML = "Loading..."
    } else {
        document.querySelector('.output').innerHTML = ""
    }
}

const getData = async () => {
    setLoading(true)
    const response = await fetch('https://62935a557aa3e6af1a0a08e2.mockapi.io/table',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const data = await response.json();
    let order = 0;
    navigator.clipboard.writeText(data[1][order]);
    const map = document.querySelector('.map');

    setLoading(false)
    data[1].forEach((item, index) => {
        const map_item = document.createElement('div')
        map_item.classList.add('map-item')
        map_item.title = item;
        map.insertAdjacentElement('beforeend', map_item)
        map_item.dataset.order = index;
        if(index === order) {
            render(item, index)
        }
    })
    map.addEventListener('click', (e) => {
        console.log(e.target)
        if(!e.target.dataset.order) {
            return false
        }
        map.children[order].classList.remove('map-item-active')
        order = e.target.dataset.order;
        navigator.clipboard.writeText(data[1][order])
        document.querySelectorAll('.map-item')[e.target.dataset.order].classList.add('map-item-active')
        render(data[1][order])
    })
    map.children[order].classList.add('map-item-active')
    document.querySelector('#next').addEventListener('click', () => {
        document.querySelector('.output').innerHTML = '';
        map.children[order].classList.remove('map-item-active')
        order++
        navigator.clipboard.writeText(data[1][order])
        if(order === data[0].length) {
            order = 0;
        }
        render(data[1][order])
        map.children[order].classList.add('map-item-active')
    })
    document.querySelector('#prev').addEventListener('click', () => {
        document.querySelector('.output').innerHTML = '';
        map.children[order].classList.remove('map-item-active')
        order--
        navigator.clipboard.writeText(data[1][order])
        if(!(order in data[1])) {
            order = data[1].length - 1;
        }
        render(data[1][order])
        map.children[order].classList.add('map-item-active')
    })
    document.querySelector('#copy').addEventListener('click', (e) => {
        navigator.clipboard.writeText(data[1][order]).then(() => {
            console.log(`Скопировано: ${data[1][order]}`)
        })
    })
}

const render = (item, index) => {
    const list = document.querySelector('.output');
    list.innerHTML = '';
    const el = document.createElement('span')
    el.innerHTML = `${item}`
    list.insertAdjacentElement('beforeend', el)
}

getData()