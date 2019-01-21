let toggled = false;

let allValues = ["Soleil", "Mercure", "Venus", "Terre", "Lune", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

window.onload = () => {
    var searchField = document.getElementById("searchField");
    var searchResult = document.getElementById("searchResult");
    var closeButton = document.getElementById("closeButton");

    if (searchField == null) {
        console.log("Not Found");
        return;
    }

    searchField.oninput = () => {
        showResults(searchResult);
    }

    searchField.onclick = () => {
        if (!toggled) {
            showResults(searchResult);
        } else {
            hideResults();
        }
    }

    closeButton.onclick = () => {
        searchField.value = "";        
        hideResults();
    }
}

searchFieldAction = (searchResult) => {
    if (searchField.value.trim() === "") {
        searchResult.innerHTML = parseHtmlValues(allValues);
    } else {
        let remainedValues = getRemainedValues(allValues, searchField.value.trim());
        if (remainedValues.length <= 0) {
            searchResult.innerHTML = parseNoResult();
        } else {
            searchResult.innerHTML = parseHtmlValues(remainedValues);
        }
    }
}

parseNoResult = () => {
    return "<p id='noResult'>Aucun résultat trouvé</p>"
}

parseHtmlValues = (values) => {
    let innerhtml = "";
    values.forEach((value) => {
        innerhtml += "<p id='result' onclick='onclickResult(this)'>"+value+"</p>"
    });
    return innerhtml
}

getRemainedValues = (values, searchFieldValue) => {
    let remainedValues = [];
    values.forEach((value) => {
        if (value.toLowerCase().includes(searchFieldValue.toLowerCase())) {
            remainedValues.push(value);
        }
    });
    return remainedValues;
}

onclickResult = (elm) => {
    searchField.value = elm.textContent;
    searchResult.style.visibility = "hidden";
    toggled = false;
}

hideResults = () => {
    if (toggled) {
        searchResult.style.visibility = "hidden";
        toggled = false;
    }
}

showResults = (searchResult) => {
    searchFieldAction(searchResult);
    if (!toggled) {
        searchResult.style.visibility = "visible";
        toggled = true;
    }
}




