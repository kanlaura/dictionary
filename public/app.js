const word = document.getElementById('word');
const button = document.getElementById('button');
const results = document.getElementById('results');

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
        if (nouns) {
            for (let item of nouns) {
                if (item["definition"]) {
                    noun += `<li>${item["definition"]}</li>`;
                }

            }
        }

        const verbs = alldata[i].meaning["transitive verb"];
        let verb = '';
        if (verbs) {
            for (let item of verbs) {
                if (item["definition"]) {
                    verb += `<li>${item["definition"]}</li>`;
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

        let abreBox = document.createElement('div');
        abreBox.classList.add('abre');

        headBox.innerHTML = `<h2>${header}</h2>`;
        headBox.innerHTML += `<p id"phonetic">${phonetic}</p>`;

        if (nouns) {
            leftBox.innerHTML = `<h4>Nouns</h4><ul>${noun}</ul>`;
        }

        if (verb) {
            rightBox.innerHTML = `<h4>Verbs</h4><ul>${verb}</ul>`;
        }

        if (abrv) {
            abreBox.innerHTML = `<h4>Abrevs</h4><ul>${abrv}</ul>`;
        }


        results.appendChild(newBox);
        newBox.appendChild(headBox);
        newBox.appendChild(leftBox);
        newBox.appendChild(rightBox);
        newBox.appendChild(abreBox);
    }
}
