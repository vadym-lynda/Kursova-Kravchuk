
function prepare(){
    let startArray = [
        {vendor: "Xioaomi mi band 8", type: 1.62, steps: "Yes", pulsometr: "Yes",
         oxymetr: "Yes", color:"Black", pictname:"band8.webp"},
         {vendor: "Xiaomi smartband 2", type: 1.47, steps: "No", pulsometr: "Yes",
         oxymetr: "No", color:"White", pictname:"band8.webp"},
         {vendor: "OPPO band 2", type: 1.52, steps: "Yes", pulsometr: "Yes",
         oxymetr: "No", color:"black", pictname:"band8.webp"},
       
    ]
    
    localStorage.clear()
    
    //Додаємо нові елементи в LocalStorage
    for (let i=0; i<startArray.length; i++) {   
        let row = startArray[i]
        let rowSt = JSON.stringify(row)
        localStorage.setItem(`${i}`, rowSt)
    }

    location.reload();  
}