function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export function getDarkColor() {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

export const generateRandomBackground = () => `https://material-foundation.github.io/material-theme-builder/assets/${randomIntFromInterval(0, 4)}_wallpaper.png`