
var settingsJson = './settings.json';
var settings = require(settingsJson);
var fs = require('fs');

module.exports = settings;

settings.set = function (key, value, done) {
    settings[key] = value;
    settings.save(done);
};

settings.add = function (domains, done) {
    domains.forEach(function (domain) {
        settings.domains[domain] = {};
    });
    settings.save(done);
};

settings.remove = function (domains, done) {
    domains.forEach(function (domain) {
        delete settings.domains[domain];
    });
    settings.save(done);
};

settings.wipe = function (done) {
    settings.domains = {};
    settings.save(done);
}

settings.save = function (done) {
    fs.writeFile(settingsJson, JSON.stringify(settings, null, 2), done);
};
