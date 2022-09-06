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
    setLoading(false)
    data[0].numbers.forEach((item, index) => {
        if(index === order) {
            render(item, index)
        }
    })
    document.querySelector('#next').addEventListener('click', () => {
        document.querySelector('.output').innerHTML = '';
        order++
        if(order === data[0].numbers.length) {
            order = 0;
        }
        render(data[0].numbers[order])
    })
    document.querySelector('#copy').addEventListener('click', (e) => {
        navigator.clipboard.writeText(data[0].numbers[order]).then(() => {
            console.log(`Скопировано: ${data[0].numbers[order]}`)
        })
    })
}

const render = (item, index) => {
    const list = document.querySelector('.output');
    const el = document.createElement('span')
    el.innerHTML = `${item}`
    list.insertAdjacentElement('beforeend', el)
}

getData()