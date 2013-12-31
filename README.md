# Hose

> Trap access to domains you use frequently, from 9 to 5

Improve your productivity by easily disabling access to domains you frequent. Set it up once, then just use `hose` and `hose --off`!

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

# License

MIT
