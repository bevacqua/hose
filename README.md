![hose.png][1]

> Redirect any domain to localhost for convenience or productivity!

#### You can use `hose` to redirect domains to localhost, for development purposes. See [advanced usage](#advanced-usage)

Also, improve your productivity by easily disabling access to domains you frequent. Set it up once, then just use `hose` and `hose --off`!

# Install

Use `npm`.

```shell
npm i -g hose
```

# Setup

`chown` your hosts file.

```shell
sudo chown user:user /etc/hosts
```

# Usage

Here's the list of domains which are blocked off by default.

```
facebook.com
twitter.com
tweetdeck.twitter.com
www.newsblur.com
getpocket.com
clicky.com
blog.ponyfoo.com
bevacqua.io
www.echojs.com
news.ycombinator.com
lobste.rs
```

### `hose <domain> <domain> <domain>`

Adds domains to the blacklist

### `hose -r <domain> <domain> <domain>`

Removes domains from the blacklist

### `hose --remove-all`

Wipes the blacklist

### `hose --list`

Prints the blacklist

### `hose -H <hosts>`

Change the file for hosts, which defaults to `/etc/hosts`

### `hose`

Turns on the hose. Note that the hose is always turned on, unless we provide the `--off` parameter

### `hose --off`

Turns off the hose

### `hose open`

Opens the hosts file in `$EDITOR`, or `vi` if `$EDITOR` isn't set.

# Advanced Usage

You can also use this program to redirect domains to a particular url. This is useful when testing web applications locally.

First off, I recommend creating a new profile.

### `hose -p site`

Start off by creating an empty profile

### `hose -p site --set-trap 127.0.0.1`

Trap on `127.0.0.1`, rather than `0.0.0.0`, so that you can visit those domains in your browser.

### `hose -p site <domain> <domain> <domain>`

Provide a list of domains you want to be trapped.

Of course, you can also do all of the above in one fell swoop.

```shell
hose -p site --set-trap 127.0.0.1 <domain> <domain> <domain>
```

You need to specify the profile when turning it on or off, e.g:

```shell
hose -p site
hose -p site --off
```

That's it!

# License

MIT

  [1]: http://i.imgur.com/dMPODoQ.png
