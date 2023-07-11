// Задання вихідних параметрів (title, [x], content) конфігурації модалки 
const modal = $.modal({
    title: 'Bracalet options',
    closable: true,
    content: `
        <div class="modal-form">
            <label for="vendor">Bracalet vendor/model:</label><br>
            <input type="text" id="vendor" name="vendor" class="modal-form-field" placeholder="Input bracalet vendor..."/><br><br>
            <label for="type">Bracalet display size:</label><br>
            <input type="number" id="type" name="type" class="modal-form-field" placeholder="Input bracalet type"/><br><br>
            <label for="steps">Bracalet count steps:</label><br>
            <select id="steps" name="steps" class="modal-form-field">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select><br><br>
            <label for="pulsometr">Bracalet have pulsometr:</label><br>
            <select id="pulsometr" name="pulsometr" class="modal-form-field">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select><br><br>
            <label for="oxymetr">Bracalet have oxymetr:</label><br>
            <select id="oxymetr" name="oxymetr" class="modal-form-field">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select><br><br>
            <label for="color">Bracalet color:</label><br>
            <select id="color" name="color" class="modal-form-field">
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="pink">Red</option>
            <option value="blue">Yellow</option>
        </select><br><br>
            
          
    
            <div id= "img-prev-section">
                <img id="imgprev" src="" >
            </div>   
                <label for="file" id="label-select-img">Select image file:</label><br>
                <input type="file" id="imgfile" name="imgfile"><br><br>
            
            <button id="submitbtn" class="blue-button" onclick="myFunction()">Click me</button>
        </div> 
    `,
    width: '500px'
})

// Вибірка всіх "Volume" та обчислення "Total volume"
function countTotalVolume(){
    let braArr = document.getElementsByClassName("element-vendor")
    let totalBracalet = 0
    for (let i=0; i<braArr.length; i++) {
        totalBracalet+= 1;
    }
    document.getElementById("countresult").innerHTML = `Total bracalets:  <b>${totalBracalet}</b>`
}



countbtn.addEventListener('click', countTotalVolume)






