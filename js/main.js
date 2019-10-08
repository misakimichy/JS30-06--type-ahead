const fetchData = () => {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const locations = [];
    fetch(endpoint)
        .then(res => res.json())
        .then(data => locations.push(...data));
    return locations;
};

const findMatches = (wordToMatch, locations) => {
    return locations.filter(place => {
        // Create regex searches globally and case insensitive
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
};

const addCommas = num => {
    // regex taken from Stack OverFlow member Alan Moore here https://stackoverflow.com/questions/721304/insert-commas-into-number-string
    return num.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
  }
  
function displayMatches() {
    const locations = fetchData();
    const matchArray = findMatches(this.value, locations);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="h1">${this.value}</span>`)
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${addCommas(place.population)}</span>
            </li>
        `;
    }).join('');
    const suggestions = document.querySelector('.suggestions');
    suggestions.innerHTML = html;
};

(function(){
    const searchInput = document.querySelector('.search');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);
}());
