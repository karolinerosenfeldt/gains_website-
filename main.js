const link = "https://spreadsheets.google.com/feeds/list/1lSLr0TScZbQtobbrCt3jJiaKRwKJMfmT7e4UaktrN3A/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

function getData(data) {
    fetch("https://spreadsheets.google.com/feeds/list/1lSLr0TScZbQtobbrCt3jJiaKRwKJMfmT7e4UaktrN3A/od6/public/values?alt=json")
        .then(function (response) {
            return response.json()
        })
        .then(createCategories)

    function createCategories(data) {
        const cleaned = [];
        data.feed.entry.forEach(item=>{
            console.log(item)
            if(cleaned.includes(item.gsx$category.$t) === false){


                cleaned.push(item.gsx$category.$t)
            }
        })
        console.log(cleaned)
        cleaned.forEach(function (category) {
           // console.log(category.gsx$category.$t)
            const link = document.createElement("a");
            link.setAttribute("href", `#${category}`);
            link.textContent = category;

            document.querySelector("nav div ul li").appendChild(link);
/*
            const section = document.createElement("section.exercise");
            section.id = category;
            const h4 = document.createElement("h4");
            h4.textContent = category;
            document.querySelector("main").appendChild(section);*/
        })
        handleData(data);
    }
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
        if (!singleData.gsx$workouttitle.$t) {
            clone.querySelector("section.workouts").remove();
        }
        if (!singleData.gsx$exercisename.$t) {
            clone.querySelector("section.exercise").remove();
        }


        document.querySelector('main').appendChild(clone);
    }
