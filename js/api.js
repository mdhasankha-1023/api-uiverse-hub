//---------------
// API data load
//---------------
const loadData = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools, dataLimit))
}

//---------------
// Display Data
//---------------
const displayData = (tools, dataLimit) => {
    // console.log(tools)
    
    const showAll = document.getElementById('show-all');
    if(dataLimit && tools.length > 6){ 
        tools =  tools.slice(0, 6) //show only 6 card
        showAll.classList.remove('d-none')
    }
    else{
        tools = tools.slice(6)
        showAll.classList.add('d-none')
    }


    tools.forEach(tool => {
        console.log(tool)
        // const arrayLength = tool.features;
        // const number = (tool) => {
        //     for(let i = 1; i < tool.length; i++){
                
            
        //     }
        // }
    
        const cardsContainer = document.getElementById ('cards-container'); //card
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card h-100 rounded p-2">
            <img src=${tool.image} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <div>
                    ${tool.features}
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title mt-3">${tool.name}</h5>
                    <p class="mt-2"><i class="fa-regular fa-calendar-days me-2"></i>${tool.published_in}</p>
                </div>
                <button onclick="loadDataById('${tool.id}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Details</button>
            </div>
        </div>
        `
        cardsContainer.appendChild(newDiv)
    })
}

//----------------
// API Id load
//----------------
const loadDataById = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDataById(data.data))
}

const displayDataById = infos => {
    console.log(infos)
    document.getElementById('details').innerHTML = `
            <div style="width: 50%" class="p-3 rounded border border-danger">
                <h5>${infos.description}</h5>
                <div class="d-flex justify-content-between align-items-center my-5 text-center">

                    <div class="text-success">
                        ${infos.pricing[0].price ? infos.pricing[0].price : 'Free of cost/'}<br>
                        ${infos.pricing[0].plan}
                    </div>    
                    <div class="text-warning">
                        ${infos.pricing[1].price}<br>
                        ${infos.pricing[1].plan}
                    </div>    
                    <div class="text-danger">
                        ${infos.pricing[2].price}<br>
                        ${infos.pricing[2].plan}
                    </div>    
                
                </div>
                <div class="container d-flex gap-4 justify-content-between">
                    <div>
                        <h5>Feature</h5>
                        ${infos.features}
                    </div>
                    <div>
                        <h5>integration</h5>
                        ${infos.integrations}
                    </div>
                    
                </div>
            </div>
            <div style="width: 50%" class="container p-3 rounded text-center"> 
                <div class="position-relative mb-3">
                    <img class="img-fluid rounded" src=${infos.image_link[0]}>
                    <p class="position-absolute top-0 end-0 bg-danger px-2 py-1 rounded text-light">${infos.accuracy.score}% accuracy</p>
                </div>
                <h5>${infos.input_output_examples[0].input}</h5>
                <p>${infos.input_output_examples[0].output}</p>
            </div>
    `
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    loadData()
})




loadData(6); //Call API-data-load function
