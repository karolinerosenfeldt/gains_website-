const link = "https://spreadsheets.google.com/feeds/list/1lSLr0TScZbQtobbrCt3jJiaKRwKJMfmT7e4UaktrN3A/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

function getData(data) {
    fetch(link)
        .then(res => res.json())
        .then(handleData);
}


function categories(data) {
    data.forEach(function (cat) {
        const link = document.createElement("a");
        link.setAttribute("href", `gsx$category.$t`);
        link.textContent = cat;
        document.querySelector("nav").appendChild(link)

        const section = document.createElement("section.exercise");
        section.gsx$category.$t = cat;
        const h4 = document.createElement("h4");
        h4.textContent = cat;
        document.querySelector("main").appendChild(h4);

        document.querySelector("main").appendChild(section);
    })
    handleData();
}


function handleData(data) {
    const myData = data.feed.entry;
    console.log("myData - console");
    console.log(myData);
    myData.forEach(showData);
}

function showData(singleData) {
    const template = document.querySelector('template').content;
    const clone = template.cloneNode(true);
    clone.querySelector("h1.exercise-name").textContent = singleData.gsx$exercisename.$t;
    clone.querySelector("h2.exercise-muscle-group span").textContent = singleData.gsx$exercisemusclesgroup.$t;
    clone.querySelector("p.exercise-short-description").textContent = singleData.gsx$exerciseshortdescription.$t;
    clone.querySelector("h1.workout-name").textContent = singleData.gsx$workouttitle.$t;
    clone.querySelector("h2.workout-duration span").textContent = singleData.gsx$workoutduration.$t;
    clone.querySelector("p.workout-type").textContent = singleData.gsx$workouttype.$t;
    clone.querySelector("img.exercise-img").src = singleData.gsx$img.$t;
    clone.querySelector("img.workout-img").src = singleData.gsx$img.$t;
    if (!singleData.gsx$workouttitle.$t) {
        clone.querySelector("article.one-workout").remove();
    }
    if (!singleData.gsx$exercisename.$t) {
        clone.querySelector("article.one-exercise").remove();
    }


    document.querySelector('main').appendChild(clone);
}
