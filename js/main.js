(function(){
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
    
    const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];
    fetch(url)
        .then(res => res.json())
        .then(data => cities.push(...data));
    
    const findMatches = (wordToMatch, cities) => {
        return cities.filter(place => {
            // Return city and state names that match what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) || place.state.match(regex)
        });
    };
    
    const addCommas = num => {
        // regex taken from Stack OverFlow member Alan Moore here https://stackoverflow.com/questions/721304/insert-commas-into-number-string
        return num.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
    };
      
    const displayMatches = (e) => {
        const matchArray = findMatches(e.currentTarget.value, cities);
        const html = matchArray.map(place => {
            const regex = new RegExp(e.currentTarget.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="h1">${e.currentTarget.value}</span>`);
            const stateName = place.state.replace(regex, `<span class="h1">${e.currentTarget.value}</span>`)
            return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${addCommas(place.population)}</span>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    };

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);
}());