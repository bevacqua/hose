
var settingsJson = './settings.json';
var settings = require(settingsJson);
var fs = require('fs');
var path = require('path');

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
    var absolute = path.resolve(__dirname, settingsJson);
    var json = JSON.stringify(settings, null, 2);
    fs.writeFile(absolute, json, done);
};
