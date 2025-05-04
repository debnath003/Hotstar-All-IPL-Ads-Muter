# Hotstar All IPL Ads Muter

A simple browser extension that automatically **mutes all known ads** on JioHotstar, especially during IPL broadcasts, by detecting ad patterns.

## What It Does

- Detects incoming ad requests (via `adName` in tracking URLs).
- Mutes the tab for the duration of the ad.
- Unmutes after the ad ends.
- Works silently in the background on both **Firefox** and **Chrome**.

## Features

- Mutes **all known ads**, including those from brands like Parle, My11Circle, Vimal, Kamla Pasand, etc.
- Regex-based detection of ad durations.
- Lightweight and non-intrusive.
- Works across browsers (Chrome and Firefox).

## Credits

This project is **heavily inspired by** [pea1bee](https://github.com/pea1bee)'s [extension](https://github.com/pea1bee/hotstar-ipl-ad-mute) that mutes specific ads on Hotstar. All core logic regarding interception and tab muting was adapted from their work, with modifications and expansion to support more ad categories and a cleaner structure.

## Installation

Firstly,  **Clone** this repository to your computer 

   ```bash
   git clone https://github.com/debnath003/Hotstar-All-IPL-Ads-Muter
   ```
**Alternatively**, you can click the green **Code** button on the repository page, select **"Download ZIP"**, 
and extract the downloaded folder.

### Firefox

1. Open `about:debugging` in Firefox.
2. Click **"Load Temporary Add-on"**.
3. Select the `manifest.json` file from this folder.

### Chrome

1. Open `chrome://extensions/` in Chrome.
2. Enable **Developer mode** (top right).
3. Click **"Load unpacked"**.
4. Select the `hotstar-al-ipl-ads-muter` folder.

## Caveats

- The extension depends on tracking URLs sent by Hotstar. If the broadcaster alters or omits `adName` or related tracking info, muting may not trigger.
- Sometimes, the broadcaster may **squeeze in short ads** that begin and end before detection completes:
  - These ads might not be muted.
  - Or muting may last slightly longer than the ad.
- This extension mutes ads only; it does not block or skip them.
