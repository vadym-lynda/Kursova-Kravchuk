// Функція для побудови елемента та розміщення його в DOM
function buildElementToPage(id, elem) {                               
    const element = document.createElement('div')
    element.classList.add('element')
    element.insertAdjacentHTML('afterbegin', `
    <div class="element-data">
        <img src="img/${elem.pictname}" class="element-img">
      
        <p class="element-text">Vendor/model: <span class="element-vendor">${elem.vendor}</span></p> 
        <p class="element-text">Display size: <span class="element-type">${elem.type}</span></p> 
        <p class="element-text">Count steps: <span class="element-steps">${elem.steps}</span></p>
        <p class="element-text">Pulsometr: <span class="element-pulsometr">${elem.pulsometr}</span></p>
        <p class="element-text">Pulse oxymetr: <span class="element-buttons">${elem.oxymetr}</span></p> 
        <p class="element-text">Color: <span class="element-color">${elem.color}</span></p>  
    </div>
    <div class="element-footer">
        <button class="blue-button" onclick="modifyModalToEdit(${id})">Edit</button><span> </span>
        <button class="red-button" onclick="removeElementFromStorage(${id})">Delete</button>
    </div>
    <p></p>
    `)
    document.getElementsByClassName("displayzone")[0].appendChild(element)
}

// Зміна параметрів модалки для СТВОРЕННЯ нового елементу
function modifyModalToCreate() {
    document.getElementsByClassName("modal-title")[0].innerText = "Create new bracalet"
    document.getElementById("submitbtn").setAttribute("onclick", `addElementToLocalStorage()`)
    document.getElementById("submitbtn").innerText = "Create"
    document.getElementById("img-prev-section").setAttribute("style", "display: none")
    document.getElementById("label-select-img").innerText = "Select image file:"
    //  Вікриваємо модалку
    modal.open()
}

// Зміна параметрів модалки для РЕДАГУВАННЯ поточного елементу
function modifyModalToEdit(id) {
    document.getElementsByClassName("modal-title")[0].innerText = "Edit bracalet"
    document.getElementById("submitbtn").innerText = "Update"
    document.getElementById("submitbtn").setAttribute("onclick", `editElementInLocalStorage(${id})`)
    //  Вибираємо елемент по ID з LS і парсимо в об'єкт
    let edElem = JSON.parse(localStorage.getItem(id))
    //  Встановлюємо значення полів форми
    document.getElementById("vendor").value = edElem.vendor;   
    document.getElementById("type").value = edElem.type;   
    document.getElementById("steps").value = edElem.steps;  
    document.getElementById("pulsometr").value = edElem.pulsometr;
    document.getElementById("oxymetr").value = edElem.oxymetr;
    document.getElementById("color").value = edElem.color; 
    document.getElementById("imgprev").setAttribute("src", `img/${edElem.pictname}`)
    document.getElementById("label-select-img").innerText = "You can choose another image file:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
    // document.getElementById("imgfile").value = edElem.pictname; 
    //  Вікриваємо модалку
    modal.open()
}

//  Відображення в модалці зменшеної картинки
function showPrewImg(){
    let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
    document.getElementById("imgprev").setAttribute("src", `img/${filename}`)
    document.getElementById("label-select-img").innerText = "You can choose another image file:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
}

//Слухаємо, чи змінилося значення поля input type="file" (чи вибралася інша картинка)
document.getElementById("imgfile").addEventListener("change", showPrewImg)


//Валідація введеного 
function valid(){
    let valid = true;
    let showMsg = '';
    let formVendor = document.getElementById("vendor").value.trim();
    let formtype = document.getElementById("type").value.trim();
    let formsteps = document.getElementById("steps").value.trim();
    let formpulsometr = document.getElementById("pulsometr").value.trim();
    let formoxymetr = document.getElementById("oxymetr").value.trim();
    let formColor = document.getElementById("color").value.trim();
    
    if (!formVendor) {
        showMsg = 'Bracalet vendor field is empty. INPUT BRACALET VENDOR . '
        valid = false;
    }  
    
    if (!formtype) {
        showMsg = showMsg + 'Bracalet type field is empty. INPUT the BRACALET type. '
        valid = false;
    }
    if (!formsteps) {
        showMsg = showMsg + 'Bracalet steps field is empty. INPUT the BRACALET steps. '
        valid = false;
    } 
    if (!formpulsometr) {
        showMsg = showMsg + 'Bracalet pulsometr field is empty. INPUT the BRACALET pulsometr. '
        valid = false;
    }
    if (!formoxymetr) {
        showMsg = showMsg + 'Bracalet oxymetr rate field is empty. INPUT the BRACALET oxymetr. '
        valid = false;
    }
    if (!formColor) {
        showMsg = showMsg + 'Bracalet Color field is empty. INPUT the BRACALET COLOR. '
        valid = false;
    }   
   
    
    if (valid) {return valid} else {alert (showMsg)}
   
}
function validImg() {
    if (document.getElementById("imgfile").value) {return true} 
    else {
        alert ("The image for the bracalet was not selected. SELECT an IMAGE for the CAMERA. ")
        return false} ;
}

// Створення параметрів нового елемента та розміщення його в LS
function addElementToLocalStorage(){
            
    if (valid() && validImg()) {
        //Шукаємо максимальне значення ID,  в LS не зайняте
        let keyArr = [];
        for(let i=0; i<localStorage.length; i++) {
            let key = Number(localStorage.key(i)) ;
            keyArr[i] = key
        }
        const freeKey = Math.max(...keyArr) + 1; 
        //Забираємо значення з форми
        let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
        // Будуємо новий елемент
        const newElement = {};
        newElement.vendor =  document.getElementById("vendor").value;   
        newElement.type = document.getElementById("type").value;   
        newElement.steps = document.getElementById("steps").value; 
        newElement.pulsometr = document.getElementById("pulsometr").value; 
        newElement.oxymetr = document.getElementById("oxymetr").value;  
        newElement.color = document.getElementById("color").value;  
        newElement.pictname = filename;   
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(newElement)
        // Пакуємо елемент в LS
        localStorage.setItem(`${freeKey}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000)
    }
}
   
// Редагування параметрів елемента та розміщення його в LS
function editElementInLocalStorage(id) {
    if (valid()) {
        let edElem = JSON.parse(localStorage.getItem(id))
        edElem.vendor =  document.getElementById("vendor").value;   
        edElem.type = document.getElementById("type").value;   
        edElem.steps = document.getElementById("steps").value;  
        edElem.pulsometr = document.getElementById("pulsometr").value;  
        edElem.oxymetr = document.getElementById("oxymetr").value;  
        edElem.color = document.getElementById("color").value;   
        if (document.getElementById("imgfile").value) {
            let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
            edElem.pictname = filename; 
        }
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(edElem)
        // Пакуємо елемент в LS
        localStorage.setItem(`${id}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000) //Перезавантажуємо вікно
    }
   
}


function removeElementFromStorage(id){
    if (confirm("Are you sure you want to delete?")) {
        localStorage.removeItem(id)
        location.reload();          
    }

} 

let keyNumbers = Object.keys(localStorage).length 

for (let k=0; k<keyNumbers; k++) {
    let keyName = localStorage.key(k)
    let row = JSON.parse(localStorage.getItem(keyName))
    buildElementToPage(keyName, row)
}

