# 0.2.0

- Add support for multiple hose profiles
- Added `--set-trap`, introducing ability to trap domains to something else than `0.0.0.0`

**BREAKING**

- Changed `--hosts` to `--set-hosts`

# 0.1.5

- Fix issue in `hose --remove-all`

# 0.1.4

- Fix path to settings when writing

# 0.1.3

- Updated default blacklist
- List hosed domains using `hose --list`

# 0.1.2

- Supports adding or removing multiple domains

# 0.1.1

- Added option `--remove-all` to wipe the blacklist
- Changed hosts option to `-H`, so it doesn't interfere with `--help`
