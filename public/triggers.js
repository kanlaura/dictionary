const press = document.getElementById('button');

press.addEventListener('click', getTriggers);

const triggers = document.getElementById('triggers');

function getTriggers(e) {
    let trimmed = (word.value).trim();
    let input = trimmed.replace(/[\s]+/g, "-");
    triggers.innerHTML = '';
    e.preventDefault();
    fetch(`http://localhost:3000/api/words/${input}/triggers`)
        .then(res => res.json())
        .then(data => {
            createTriggerBox(data);
        })
        .catch(err => {
            error.innerHTML = `<p>ERRORRRR</p>`
            console.log(err)
        });
}

function createTriggerBox(data) {
    let triggerbox = document.createElement('div');
    triggerbox.classList.add('trigger');

    triggers.appendChild(triggerbox);
    triggerbox.innerHTML = `<h2>Did you mean?</h2>`

    let words = '';
    for (let i = 0; i < data.length; i++) {
        const word = data[i].word;
        words += `<span id="oneTrigger">${word}</span>`
    }
    triggerbox.innerHTML += `<p>${words}</p><h3 id="h3trigger">I had no time to create a link here, so please copy and paste the word of your choise to the search field above</h3>`
};