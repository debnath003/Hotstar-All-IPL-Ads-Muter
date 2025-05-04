const durationRegexes = [
    /(\d{1,3})s(?:Eng(?:lish)?|Hin(?:di)?)/i,       // matches: "20sEng", "15sHindi"
    /(?:HIN|ENG|HINDI|ENGLISH)[^\d]*(\d{1,3})/i     // matches: "HIN_10", "ENG_15"
  ];
  
  const muteTimers = new Map(); // tabId -> timeoutId
  
  console.log("🔥 Hotstar IPL Ad Muter Extension Loaded");
  
  browser.webRequest.onBeforeRequest.addListener(
    async (details) => {
      const url = new URL(details.url);
      const adName = url.searchParams.get("adName");
  
      if (adName) {
        console.log(`🎯 Detected Ad: ${adName}`);
  
        let durationSec = 10; // default fallback duration
        for (const regex of durationRegexes) {
          const match = adName.match(regex);
          if (match) {
            durationSec = parseInt(match[1], 10);
            break;
          }
        }
  
        console.log(`🔇 Muting tab(s) for ${durationSec} seconds`);
  
        const tabs = await browser.tabs.query({ url: "*://*.hotstar.com/*" });
  
        for (const tab of tabs) {
          // Always mute tab
          browser.tabs.update(tab.id, { muted: true });
  
          // Clear existing timer if any
          if (muteTimers.has(tab.id)) {
            clearTimeout(muteTimers.get(tab.id));
          }
  
          // Set new timer to unmute after ad duration
          const timeoutId = setTimeout(() => {
            browser.tabs.get(tab.id).then((updatedTab) => {
              if (updatedTab && updatedTab.mutedInfo?.muted) {
                browser.tabs.update(tab.id, { muted: false });
                console.log(`🔊 Unmuted tab ${tab.id}`);
              }
            }).catch((e) => console.warn("Tab no longer available:", e));
  
            muteTimers.delete(tab.id);
          }, (durationSec * 1000) - 100); // small buffer
  
          muteTimers.set(tab.id, timeoutId);
        }
      }
    },
    {
      urls: ["*://bifrost-api.hotstar.com/v1/events/track/ct_impression*"]
    }
  );
  