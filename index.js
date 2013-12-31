var program = require('commander');
var pkg = require('./package.json');
var settings = require('./settings.js');

program
    .usage('[options] <domain>')
    .version(pkg.version)
    .option('-r, --remove', 'Removes the domain')
    .option('-R, --remove-all', 'Wipes the blacklist')
    .option('-H, --hosts <hosts>', 'The hosts file to use')
    .option('--off')
    .parse(process.argv);

if (program.hosts) {
    settings.set('hosts', program.hosts);
}

var etc = require('./etc.js').bind(null, program.off);
var domain = program.args[0];
if (domain) {
    if (program.remove) {
        settings.remove(domain, etc);
    } else {
        settings.add(domain, etc);
    }
} else if (program.remove) {
    console.log('You must specify a domain name.');
    process.exit(1);
} else if (program.removeAll) {
    settings.wipe(function (etc) {
        if (!err) {
            console.log('Wiped out blacklist.')
        }
        etc(err);
    });
} else {
    etc();
}
