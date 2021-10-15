if (!window.location.search) {
    const systemLanguage = window.navigator.language.split('-')[0];
    // const systemLanguage = 'blr';
    window.location.search = `?lang=${systemLanguage}`;
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
    const currentLanguage = await getAppLanguage();
    const variableElements = document.querySelectorAll('[data-variable]');

    for (let elem of variableElements) {
        const attrValue = elem.dataset.variable;
        elem.innerHTML = currentLanguage[attrValue];
        // debugger;   
    }
    
}