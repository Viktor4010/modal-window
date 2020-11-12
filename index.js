let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://klike.net/uploads/posts/2019-06/1561279250_2.jpg'},
    {id: 2, title: 'Яблоки2', price: 30, img: 'https://klike.net/uploads/posts/2019-06/1561279250_2.jpg'},
    {id: 3, title: 'Яблоки3', price: 40, img: 'https://klike.net/uploads/posts/2019-06/1561279250_2.jpg'},

]

const toHTMl = fruit => `
        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}" >
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">посмотреть цену</a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">удалить</a>
                </div>
            </div>
        </div>
`
    /*
     *  1. Динамически на основе массива вывести список карточек +
     *  2.  Показать цену в модалке (одна модалка) +
     *  3. Модалка для удаления с 2 мя кнопками
     *      --------------
     *  4.  На основе $.modal нужно сделать плагин $.confirm (Promise)
     * */

function render() {
    const html = fruits.map(toHTMl).join('')
    document.querySelector('#fruits').innerHTML = html
}
render()


const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }},
    ]
})



document.addEventListener('click', event => {
    event.preventDefault()
     const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {

        priceModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content:`<p>Вы удаляете фрукт : <strong>${fruit.title}</strong></p>`,
        }) .then(() => {
           fruits = fruits.filter(f => f.id !== id)
            render()
        }) .catch(() => {
            console.log('Cancel')
        })


        // confirmModal.setContent(`
        // <p>Вы удаляете фрукт : <strong>${fruit.title}</strong></p>
        // `)
        // confirmModal.open()
    }
})
