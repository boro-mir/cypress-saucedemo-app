const {defineConfig} = require("cypress");

module.exports = defineConfig({
    projectId: 'p3a6eq',
    "chromeWebSecurity": false,
    env: {
        "baseUrl": "",
        "username": "",
        "glitchUsername": "",
        "password": ""
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
