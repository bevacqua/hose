var program = require('commander');
var pkg = require('./package.json');
var settings = require('./settings.js');

program
    .usage('[options] <domain>')
    .version(pkg.version)
    .option('-r, --remove', 'Removes the domain')
    .option('-R, --remove-all', 'Wipes the blacklist')
    .option('-H, --hosts <hosts>', 'The hosts file to use')
    .option('--off', 'Turns off the hose')
    .option('--list', 'Prints the blacklist')
    .parse(process.argv);

if (program.hosts) {
    settings.set('hosts', program.hosts);
}

var etc = require('./etc.js').bind(null, program.off);
var domains = program.args;
if (domains.length) {
    if (program.remove) {
        settings.remove(domains, etc);
    } else {
        settings.add(domains, etc);
    }
} else if (program.remove) {
    console.log('You must specify domain name(s) to remove.');
    process.exit(1);
} else if (program.removeAll) {
    settings.wipe(function (etc) {
        if (!err) {
            console.log('Wiped out blacklist.')
        }
        etc(err);
    });
} else if (program.list) {
    Object.keys(settings.domains).forEach(function (domain) {
        console.log(domain);
    });
} else {
    etc();
}
