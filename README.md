# Time Registration PWA for dairy farmers

This application was developed using Vue with Vite as a bundler to take care for offline capabilities (caching ...)
This project uses the Atomic Design principles. This means that from almost every part a seperate component is made that is reusable throughout the whole project.

## INSTALL BUN FOR THIS PROJECT

[Install Bun Here](https://www.bun.sh)

## Install and start developing on this project

1. Create a copy of .env.example and fill the ip in of the Elysia Backend (For development: http://localhost:3000)
2. In the root (folder of package.json) use the command `bun install`, this will install all required dependencies
3. Use the command `bun dev` to start developing
4. Use `bun vite build` to build the project to a dist folder.
   - IMPORTANT: Create an .env.production and change your api-url variable to your deployed Elysia backend!
   - TIP: You can also use `bun vite preview` to preview your build on another port (usually :4173). Remember: don't forget to check if your .env variable was set properly!

## Libraries this project uses that are necessary to understand it

1. [Pinia Store](https://pinia.vuejs.org/) - This is the state management used in this project. You can see the stores folder with for each use it's own store. This can be abstracted even further and there could be seperate services for some parts of the stores.
2. [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) - This is how Atomic Design works
3. [Vue Router](https://router.vuejs.org/) - This handles all routing so that no page refreshes are required. You can see the router.ts file where all the routes are defined and their guards. This router also has built-in RouterLinks so instead of a normal HTML anchor tag you can use <RouterLink\>.
4. [ChartJS](https://www.chartjs.org/) - The library used for drawing charts and making statistics.
   - [ChartJS Vue Wrapper](https://vue-chartjs.org/) - This is the wrapper to make it more a Vue-styled application.
5. [VueCal](https://antoniandre.github.io/vue-cal/) - This library handles the calendar logics.
6. [Axios](https://axios-http.com/docs/intro) - Axios handles HTTP requests and gives better feedback than normal fetch-methods.
7. [I18n](https://vue-i18n.intlify.dev/) - This library handles all the logic for multiple languages. Currently only english is set up but the json files are available to fill in.

## Understanding Vite Config

To make this application downloadable and work offline some things are required. That is why vite.config.ts has some plugins such as mkCert() and VitePWA().

A PWA requires:
_ A secure HTTPS connection (hence why mkcert is installed)
_ A manifest.json with icons, a name, etc.

When developing and building the application you can download and test the application through chrome and test. Remember to regularly clear your cache because after the first load on the application it will save requests, images and more to make this registration tool work fully offline.

## Advice for further development

Offline POST requests don't work yet (saving the timer) but Tanstack Query is already installed and can be implemented later on (it's like a middleware on your request).
