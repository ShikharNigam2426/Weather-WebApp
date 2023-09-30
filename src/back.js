import { jsonData } from "./Component/Temperature";

const area = document.body;

let background = null;

if (jsonData.list[0].weather[0].main === 'Clouds') {
    background = 'url(./Images/SunnyBack.png)';
    console.log(background);
}

if (background) {
    area.style.backgroundImage = background;
}
