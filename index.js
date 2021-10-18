const systemLanguage = window.navigator.language.split('-')[0];
// const systemLanguage = 'nl';

if (!window.location.search) {
    window.location.search = `?lang=${systemLanguage}`;
}

function refToggler(e) {
    const continueBtn = document.querySelector('.content__continue-btn');
    continueBtn.href = e.currentTarget.dataset.ref;

    const previousTarget = document.querySelector('[class*="target"]');
    if (previousTarget) previousTarget.classList.remove("target");
    e.currentTarget.classList.add("target");
}

function scaleText(languageParam) {
    if (languageParam === 'ru' || languageParam === 'es' || languageParam === 'fr' || languageParam === 'nl') {
        document.documentElement.className = 'decrease-scale';
        
        if ((languageParam === 'fr' || languageParam === 'ru') && window.innerHeight < 736) {
            const pricesList = document.querySelector('[class*="content__prices-list"]');
            pricesList.classList.add('content__prices-list--decrease-margin');
        }
    }
}

renderDOM();

async function getAppLanguage() {
    const refParams = new URLSearchParams(window.location.search);
    const languageParam = refParams.get('lang');
    const url = './assets/languages/' + languageParam + '.json';

    scaleText(languageParam);

    let response = await fetch(url);
    if (!response.ok) {
        response = await fetch('./assets/languages/en.json');
        window.location.search = '?lang=en';
    }

    return response.json();
}

async function renderDOM() {
    const offerElements = Array.from(document.querySelectorAll('[class*="content-prices-list__item"]'));
    offerElements.map((elem) => elem.onclick = refToggler);

    const currentLanguage = await getAppLanguage();
    const variableElements = document.querySelectorAll('[data-variable]');

    for (let elem of variableElements) {
        const attrValue = elem.dataset.variable;
        let innerValue;
        if (elem.dataset.price) {
            const innerText = currentLanguage[attrValue];
            if (elem.dataset.variable === "{{price}}/month") {
                innerValue = innerText.replace('{{price}}/', `${elem.dataset.price} `);
            } else innerValue = innerText.replace('{{price}}', elem.dataset.price);
        }
        if (elem.hasAttribute('data-price-calc')) {
            const elemCost = document.querySelector('[data-variable="<strong>{{price}}</strong><br>per year"]');
            const elemDonor = document.querySelector('[data-variable="{{price}}/month"]');
            const innerText = currentLanguage[elemDonor.dataset.variable];
            const cost = elemCost.dataset.price.substring(1);
            innerValue = innerText.replace('{{price}}/', `$${Math.round((cost / 12) * 100) / 100} `);
        }
        elem.innerHTML = innerValue || currentLanguage[attrValue];
    } 
}


