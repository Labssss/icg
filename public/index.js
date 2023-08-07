initDate();
const check = {
    card: "",
    price: 0,
    date: "",
    saldo: 0,
    date_waluty: "",
    number_ref: 0,
    price_2: 0,
    pln_step: 0
}
function generateImg() {
    check.price = `-${form.querySelector('.price').value}`
    check.date = form.querySelector('.date').value;
    check.card = `${getNumber(4)} ${getNumber(4)}`
    check.saldo = `${getRandomInt(1,1000)},${getRandomInt(0,10)}${getRandomInt(1,10)} PLN`
    check.date_waluty = form.querySelector('.date').value;
    check.number_ref = `05272423213283${getNumber(9)}`
    check.price_2 = `${form.querySelector('.price').value} PLN`
    check.pln_step = form.querySelector('.price').value.toString().length - 1

    const obj = {
        "files": [ 
            "https://raw.githubusercontent.com/Labssss/icg/main/pko%20check%20release.psd"
        ],
        "resources": [
            "https://raw.githubusercontent.com/Labssss/icg/main/Dax-Pro-Regular.ttf",
        ],
        "environment": {
    
        },
        "script" : `var a = app.activeDocument.layers.getByName('card'); a.textItem.contents = '${check.card}';
        a = app.activeDocument.layers.getByName('summa_1'); a.textItem.contents = '${check.price}';
        a = app.activeDocument.layers.getByName('data_operacji'); a.textItem.contents = '${check.date}';
        a = app.activeDocument.layers.getByName('saldo'); a.textItem.contents = '${check.saldo}';
        a = app.activeDocument.layers.getByName('data_waluty'); a.textItem.contents = '${check.date_waluty}';
        a = app.activeDocument.layers.getByName('numer_ref'); a.textItem.contents = '${check.number_ref}';
        a = app.activeDocument.layers.getByName('summa_2'); a.textItem.contents = '${check.price_2}';
        a = app.activeDocument.layers.getByName('PLN'); a.translate(${11 * check.pln_step},0);
        app.activeDocument.saveToOE("png");`
    }
    const url = encodeURI(`https://www.photopea.com#${JSON.stringify(obj)}`)
    console.log(url)
    let iframe = document.querySelector('.iframe');
    iframe.src = url
}

window.addEventListener("message", function(e) { 
    if (e.data != 'done') {
        var arrayBufferView = new Uint8Array(e.data);
        var blob = new Blob([arrayBufferView], {type: "image/jpeg"});
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img = document.querySelector("#photo");
        img.src = imageUrl;
        btn.style.display = "inline-block"
        link.download = `${check.price}`
        link.href = imageUrl;
        console.log(imageUrl)
    }
    console.log(e) 
});

let btn = document.querySelector("#download-btn");
let link = document.querySelector("#link");

btn.addEventListener("click", function (e) {
    link.click();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.querySelector('.iframe')) {
        document.querySelector('.iframe').remove()
    }
    const iframe = document.createElement('iframe')
    iframe.className = "iframe"
    iframe.style.display = "none"
    const place = document.querySelector(".iframe-place")
    place.append(iframe)
    generateImg()
});

function initDate() {
    const input = document.querySelector(".date")
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    input.value = [day, month, year].join('.');
    // input.value = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}
function getNumber(n) {
    let number = '';
    for(let i = 0; i < n; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}