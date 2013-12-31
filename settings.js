
var settingsJson = './settings.json';
var settings = require(settingsJson);
var fs = require('fs');

module.exports = settings;

settings.set = function (key, value, done) {
    settings[key] = value;
    settings.save(done);
};

settings.add = function (domain, done) {
    settings.domains[domain] = {};
    settings.save(done);
};

settings.remove = function (domain, done) {
    delete settings.domains[domain];
    settings.save(done);
};

settings.save = function (done) {
    fs.writeFile(settingsJson, JSON.stringify(settings, null, 2), done);
};
