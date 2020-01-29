const word = document.getElementById('word');
const button = document.getElementById('button');
const results = document.getElementById('results');
const error = document.getElementById('error');

button.addEventListener('click', getWord);


function getWord(e) {
    let trimmed = (word.value).trim();
    let input = trimmed.replace(/[\s]+/g, "-");
    results.innerHTML = '';
    e.preventDefault();
    fetch(`http://localhost:3000/api/words/${input}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            createBox(data);
        })
        .catch(err => {
            error.innerHTML = `<p>ERRORRRR</p>`
            console.log(err)
        });
}

function createBox(alldata) {
    for (let i = 0; i < alldata.length; i++) {
        const header = alldata[i].word;

        let phonetic;
        if (alldata[i].phonetic) {
            phonetic = alldata[i].phonetic;
        } else {
            phonetic = `<p><i>someone forgot to tell, how pronounce it</i></p>`
        }

        
        const nouns = alldata[i].meaning["noun"];
        let noun = '';
        let example = '';
        if (nouns) {
            for (let item of nouns) {
                if (item["definition"]) {
                    noun += `<li>${item["definition"]}</li>`;
                }
                if (item["example"]) {
                    example += `<li>${item["example"]}</li>`;
                }

            }
        }

        const verbs = alldata[i].meaning["transitive verb"];
        let verb = '';
        let verbExample = '';
        if (verbs) {
            for (let item of verbs) {
                if (item["definition"]) {
                    verb += `<li>${item["definition"]}</li>`;
                }
                if (item["example"]) {
                    verbExample += `<li>${item["definition"]}</li>`;
                }

            }
        }

        const adjectives = alldata[i].meaning["adjective"];
        let adjective = '';
        if (adjectives) {
            for (let item of adjectives) {
                if (item["definition"]) {
                    adjective += `<li>${item["definition"]}</li>`;
                }

            }
        }

        const abrvs = alldata[i].meaning["abbreviation"];
        let abrv = '';
        if (abrvs) {
            for (let item of abrvs) {
                if (item["definition"]) {
                    abrv += `<li>${item["definition"]}</li>`;
                }

            }
        }

        let newBox = document.createElement('div');
        newBox.classList.add('box');

        let headBox = document.createElement('div');
        headBox.classList.add('head');

        let leftBox = document.createElement('div');
        leftBox.classList.add('left');

        let rightBox = document.createElement('div');
        rightBox.classList.add('right');
        
        let abjeBox = document.createElement('div');
        abjeBox.classList.add('adjev');
        

        let abreBox = document.createElement('div');
        abreBox.classList.add('abre');

        headBox.innerHTML = `<h2>${header}</h2>`;
        headBox.innerHTML += `<hr>`;
        headBox.innerHTML += `<p id"phonetic">${phonetic}</p>`;


        if (nouns) {
            leftBox.innerHTML = `<h3>Nouns</h3>`
        }
        if (noun) {
            leftBox.innerHTML += `<h4>Definitions</h4><ul>${noun}</ul>`
        }
        if (example) { 
            leftBox.innerHTML += `<h4>Examples</h4><ul>${example}</ul>`; }

        if (verb) {
            rightBox.innerHTML = `<h3>Verbs</h3>`;
        }
        if (verb) {
            rightBox.innerHTML += `<h4>Definitions</h4><ul>${verb}</ul>`;
        }
        if (verbExample) { 
            rightBox.innerHTML += `<h4>Examples</h4><ul>${verbExample}</ul>`; }
        
        
        if (adjectives) {
            abreBox.innerHTML = `<h4>Adjectives</h4><ul>${adjective}</ul>`;
        }

        if (abrv) {
            abreBox.innerHTML = `<h4>Abbreviation</h4><ul>${abrv}</ul>`;
        }

        results.appendChild(newBox);
        newBox.appendChild(headBox);
        newBox.appendChild(leftBox);
        newBox.appendChild(rightBox);
        newBox.appendChild(abreBox);
        newBox.appendChild(abjeBox);
    }
}
