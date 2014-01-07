var program = require('commander');
var pkg = require('./package.json');
var settings = require('./settings.js');

program
    .usage('[options] <domain*>')
    .version(pkg.version)
    .option('-p, --profile <profile>', 'Use a profile other than the default')
    .option('-r, --remove', 'Removes the domain')
    .option('-R, --remove-all', 'Wipes the blacklist')
    .option('-H, --set-hosts <hosts>', 'The hosts file to use')
    .option('-H, --set-trap <trap>', 'The trapping IP to use')
    .option('--off', 'Turns off the hose')
    .option('--list', 'Prints the blacklist')
    .parse(process.argv);

var profile = settings(program.profile);

if (program.hosts) {
    profile.set('hosts', program.hosts);
}

var etc = require('./etc.js')(profile, program.off);
var domains = program.args;
if (domains.length) {
    if (program.remove) {
        profile.remove(domains, etc);
    } else {
        profile.add(domains, etc);
    }
} else if (program.remove) {
    console.log('You must specify domain name(s) to remove.');
    process.exit(1);
} else if (program.removeAll) {
    profile.wipe(function (err) {
        if (!err) {
            console.log('Wiped out blacklist.')
        }
        etc(err);
    });
} else if (program.list) {
    Object.keys(profile.domains).forEach(function (domain) {
        console.log(domain);
    });
} else {
    etc();
}
