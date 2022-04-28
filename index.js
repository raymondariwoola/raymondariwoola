const fetch = require('cross-fetch');
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';

// https://source.unsplash.com/random/200x200/?tech

//Getting an image and returning the url
async function imageFetch() {
    let image1 = await fetch("https://source.unsplash.com/random/200x200/?coding")
    let image2 = await fetch("https://source.unsplash.com/random/200x200/?programming")
    let image3 = await fetch("https://source.unsplash.com/random/200x200/?tech")
    let image = {
        p1: image1.url,
        p2: image2.url,
        p3: image3.url
    }
    return image
}

/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 * Data is now returned in a function with the image added to the  object
 */
async function buildData() {
    let image = await imageFetch();
    return DATA = {
        name: 'Raymond',
        date: new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            timeZone: 'Asia/Dubai',
        }),
         picture1: image.p1,
         picture2: image.p2,
         picture3: image.p3
    };
}

/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */
async function generateReadMe() {
    const DATA = await buildData()
    console.log(DATA);
   fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}

generateReadMe();