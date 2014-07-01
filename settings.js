'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var windows = process.platform === 'win32';

function transform (settings) {
    if (windows) {
        if (settings.hosts === '/etc/hosts') {
            settings.hosts = 'c:/windows/system32/drivers/etc/hosts';
        }
    }
    return settings;
}

module.exports = function (profile) {
    var settingsJson = util.format('./profiles/%s.json', profile || 'default');
    var settings;

    try {
        settings = transform(require(settingsJson));
    } catch (e) {
        console.log('Creating "%s" profile.', profile);
        settings = transform({
            name: profile,
            trap: '0.0.0.0',
            hosts: '/etc/hosts',
            domains: {}
        });
        var absolute = path.resolve(__dirname, settingsJson);
        var json = JSON.stringify(settings, null, 2);
        fs.writeFileSync(absolute, json);
    }

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
    };

    settings.save = function (done) {
        var absolute = path.resolve(__dirname, settingsJson);
        var json = JSON.stringify(settings, null, 2);
        fs.writeFile(absolute, json, done);
    };

    return settings;
};

