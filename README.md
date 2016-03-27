PalettesApp uses the colourlovers api and creats a stand alone page which displays the top and new palettes.
The app displays 20 palettes from the new category and 20 palettes from the top category including their relevant information. Users can also filter the displayed palletes according to the selected hues.

The app uses the response from the API to create objects of palette using the Palette construcor with only the relevant information which will be displayed.

Each palette displays its various colors in the proportion according to the color width and the order as discribed in the API results.

Available CSS transmitions: 1.hovar over a color in a palette 2.hovar over the heart and the eye icons.

Custom directives: I created 2 directives which generate the data for each palette and a scroll down directive.

Technologies: Angular.js, Node.js, Express, JavaScript, body-parser, handelbars, bootstrap, request.

Installation: clone the repository and make sure the package.json contains the following dependencies:
* "body-parser": "^1.15.0"
* "express": "^4.13.4"
* "hbs": "^4.0.0",
*  "node": "0.0.0"
*  "request": "^2.69.0"
*  "url": "^0.11.0"

When you run the server the app should be accesibale in http://localhost:3000/ and you should be able to see console log of "server started" in your server console.


Link to heroku: 

