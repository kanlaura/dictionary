const word = document.getElementById('word');
const button = document.getElementById('button');
const results = document.getElementById('results');

button.addEventListener('click', getWord);

function getWord(e) {
    results.innerHTML = '';
    e.preventDefault();
    fetch(`http://localhost:3000/api/words/${word.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            createBox(data);
        })
        .catch(err => {
            console.log(err)
        });
}

function createBox(alldata) {
    for (let i = 0; i < alldata.length; i++) {
        const header = alldata[i].word;
        const phonetic = alldata[i].phonetic;
        const meanings = Object.keys(alldata[i].meaning);
        let noun = meanings[0]
        let nouns;

        let verb = meanings[1]

        for (let j = 0; j < noun.length; j++) {
            nouns += ` ${noun[j]}`;
            console.log(nouns)
            
        }

        let newBox = document.createElement('div');
        newBox.classList.add('box');

        let headBox = document.createElement('div');
        headBox.classList.add('head');

        let leftBox = document.createElement('div');
        leftBox.classList.add('left');

        let rightBox = document.createElement('div');
        rightBox.classList.add('right');
        
        headBox.innerHTML = `<h2>${header}</h2><p>${phonetic}</p>`;
        leftBox.innerHTML = `<p>${noun}</p>`;
        rightBox.innerHTML = `<p>${verb}</p>`;
        

        results.appendChild(newBox);
        newBox.appendChild(headBox);
        newBox.appendChild(leftBox);
        newBox.appendChild(rightBox);
    }
}