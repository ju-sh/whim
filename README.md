# whim

An experimental add-on to incorporate vim-style keybindings to Firefox.

Made as a webextension, so will probably work with Chromium-based browsers as well.

## Key bindings available
A subset of the main keybindings of vim are available.

All key bindings are hardcoded and there is currently no option to configure it
other than editing the source code.

Scrolling:
 - Move down: `j`
 - Move up: `k`
 - Move left: `h`
 - Move right: `l`

 - Scroll down one page: `C-f`
 - Scroll up one page: `C-b`
 - Scroll down half page: `C-d`
 - Scroll up half page: `C-u`

 - Move to beginning of page: `gg`
 - Move to end of page: `G`
 - Move to left-most margin: `0` or `^`
 - Move to right-most margin: `$`

Marking:
 - Set mark: `m [character]`
 - Go to mark: `\ [character]`

Change tabs (won't work for special pages of Firefox like `about:newtab`):
 - Next tab: `J`
 - Previous tab: `K`

History:
 - Go back: `H`
 - Go forward: `L`

General:
 - Reload (fresh): `R`
 - Reload (use cache): `r`
 - Close tab: `d`
 - Undo close tab: `U`

---

A numeric modifier can be used with most of these bindings. 
For example, `10j` has the effect of pressing `j` (ie, move down) 10 times.

## Installation (Temporary)
This add-on is made merely as an experiment and is not meant for general use.
So, not published to any add-on or extension store.

However, it's quite usable in its present state and can be manually loaded into
the browser in the debugging mode.

### Firefox

 1. Go to this url: `about:debugging`
 2. On the sidebar, click `This Firefox`
 3. Under `Temporary Extensions`, click the `Load Temporary Add-on` button
 4. Choose the `manifest.json` file in this repo

Now this addon should show up as `Whim` in the list of `Temporary Extensions`

### Chromium / Chrome

 1. Go to this url: `chrome://extensions/`
 2. Enable the switch on the top right that says `Developer mode`
 3. Click on the `Load unpacked` button that will now appear on top left.
 4. Select the directory of this repo.

## About

I wrote this addon around 2019, but am writing the README in 2025. So I might
have forgotten a few other bindings that are available...

I wanted to add more features, but never got around to it.

Figured I might as well put it up online, in case someone else finds it
helpful.

Cheers!
