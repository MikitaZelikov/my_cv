if (!window.location.search) {
    // const systemLanguage = window.navigator.language.split('-')[0];
    const systemLanguage = 'blr';
    window.location.search = `?lang=${systemLanguage}`;
}

function toggleRef(e) {
    const continueBtn = document.querySelector('.content__continue-btn');
    continueBtn.href = e.currentTarget.dataset.ref;

    const previousTarget = document.querySelector('[class*="target"]');
    if (previousTarget) previousTarget.classList.remove("target");
    e.currentTarget.classList.add("target");
}

renderDOM();

async function getAppLanguage() {
    const refParams = new URLSearchParams(window.location.search);
    const languageParam = refParams.get('lang');
    const url = './assets/languages/' + languageParam + '.json';

    let response = await fetch(url);
    if (!response.ok) {
        response = await fetch('./assets/languages/en.json');
        window.location.search = '?lang=en';
    }

    return response.json();
}

async function renderDOM() {
    const offerElements = Array.from(document.querySelectorAll('[class*="content-prices-list__item"]'));
    offerElements.map((elem) => elem.onclick = toggleRef);

    const currentLanguage = await getAppLanguage();
    const variableElements = document.querySelectorAll('[data-variable]');

    for (let elem of variableElements) {
        const attrValue = elem.dataset.variable;
        let innerValue;
        if (elem.dataset.price) {
            if (elem.dataset.variable === "{{price}}/month") {
                innerValue = attrValue.replace('{{price}}/', `${elem.dataset.price} `);
            } else innerValue = attrValue.replace('{{price}}', elem.dataset.price);
        }
        if (elem.hasAttribute('data-price-calc')) {
            const elemCost = document.querySelector('[data-variable="<strong>{{price}}</strong><br>per year"]');
            const cost = elemCost.dataset.price.substring(1);
            innerValue = `$${Math.round((cost / 12) * 100) / 100} month`;
        }
        elem.innerHTML = innerValue || currentLanguage[attrValue];
    } 
}


