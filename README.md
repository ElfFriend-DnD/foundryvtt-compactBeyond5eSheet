# Compact DnDBeyond-like 5e Character Sheet

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2Feastcw%2Ffoundryvtt-compactBeyond5eSheet%2Freleases%2Flatest&query=assets.1.download_count&label=Downloads%40latest)
[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fcompact-beyond-5e-sheet&colorB=4aa94a)](https://forge-vtt.com/bazaar#package=compact-beyond-5e-sheet)
[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fcompact-beyond-5e-sheet%2Fshield%2Fendorsements)](https://www.foundryvtt-hub.com/package/compact-beyond-5e-sheet/)
[![Foundry Hub Comments](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fcompact-beyond-5e-sheet%2Fshield%2Fcomments)](https://www.foundryvtt-hub.com/package/compact-beyond-5e-sheet/)

![Foundry Minimum Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Feastcw%2Ffoundryvtt-compactBeyond5eSheet%2Fmaster%2Fsrc%2Fmodule.json&query=%24.compatibility.minimum&label=Minimum%20Foundry%20Version&color=orange)
![Foundry Recommended Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Feastcw%2Ffoundryvtt-compactBeyond5eSheet%2Fmaster%2Fsrc%2Fmodule.json&query=%24.compatibility.verified&label=Recommended%20Foundry%20Version&color=green)
![Manifest+ Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Feastcw%2Ffoundryvtt-compactBeyond5eSheet%2Fmaster%2Fsrc%2Fmodule.json&query=%24.manifestPlusVersion&label=Manifest%2B%20Version&color=blue)

Shamlessly taking ideas (and some code) from both the [DnDBeyond character sheet](https://github.com/jopeek/fvtt-dndbeyond-character-sheet) and the [Tidy 5e character sheet](https://github.com/sdenec/tidy5e-sheet). This is an information-dense character sheet for Foundry users who like the feel of D&DBeyond's character sheet, but want it to fit better within the Foundry UI.

## Installation

Module JSON:

```
https://github.com/ElfFriend-DnD/foundryvtt-compactBeyond5eSheet/releases/latest/download/module.json
```

### Dependencies

This module depends on `Character Actions List dnd5e`, which you can obtain on the listing or [here](https://github.com/ElfFriend-DnD/foundryvtt-dnd5eCharacterActions).

## Gallery

[<img src="readme-img/main-view.png" width="30%"></img>](readme-img/main-view.png)
[<img src="readme-img/spellbook.png" width="30%"></img>](readme-img/spellbook.png)
[<img src="readme-img/inventory.png" width="30%"></img>](readme-img/inventory.png)
[<img src="readme-img/features.png" width="30%"></img>](readme-img/features.png)
[<img src="readme-img/biography.png" width="30%"></img>](readme-img/biography.png)

Click to view bigger.

## Key Features & Changes

### Actions Tab

Intending to place all of the "combat-important" (damage-dealing) spells and features up front, this tab lists every equipped item and prepared spell that can deal damage. Option in settings to limit spells to only Cantrips.

### Skills and Resources always present

No more digging around through multiple tabs to control your class resources or find the skill list. These two things sit on the screen always.

### Spellbook

Got rid of the spell school to make room for the more compressed table area. I can't think of anyone but a wizard who would need to know this information, and the info is still easily accessible from the expanded row. Make an issue if you disagree and we'll hash things out.

## Options

| **Name**                          | Description                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| **Use Expanded Sheet as Limited** | Uses the expanded sheet for the limited view.                                               |
| **Show Passive {Skill}**          | Displays a dedicated fancy box below the skills list with the skill's passive score within. |

This sheet respects the 5e System setting: "Disable Experience Tracking"

### Compatibility

I'm honestly not sure how well this will play with modules that affect character sheets, I'll try to test as many as possible but if something is obviously breaking please create and issue here and I'll see what I can do.

| **Name**                                                                                         |       Works        | Notes                                                                                                                               |
| ------------------------------------------------------------------------------------------------ | :----------------: | ----------------------------------------------------------------------------------------------------------------------------------- |
| [Ready Set Roll 5e](https://github.com/MangoFVTT/fvtt-ready-set-roll-5e)                         | :heavy_check_mark: | Direct replacement for Better Rolls 5e, seems to work well                                                                          |
| [Better Rolls 5e](https://github.com/RedReign/FoundryVTT-BetterRolls5e)                          |        :x:         | Deprecated in favour of Ready Set Roll 5e                                                                                           |
| [Midi-QOL](https://gitlab.com/tposney/midi-qol)                                                  | :heavy_check_mark: | Integrated with 0.7.x, Everything seems normal.                                                                                     |
| [Minor QOL](https://gitlab.com/tposney/minor-qol)                                                |        :x:         | Deprecated in favor of Midi-QOL. Won't Support.                                                                                     |
| [5e-Sheet Resources Plus](https://github.com/ardittristan/5eSheet-resourcesPlus)                 | :heavy_check_mark: | Resources area scrolls independently. Uses CSS Grid                                                                                 |
| [Variant Encumbrance](https://github.com/VanirDev/VariantEncumbrance)                            |        :x:         | Default encumberance bar removed, Speed css overrides will break things.                                                            |
| [FoundryVTT Magic Items](https://gitlab.com/riccisi/foundryvtt-magic-items)                      | :heavy_check_mark: | List of Spells is Appended to more or less correctly, but new abilities are not added to the Actions Tab.                           |
| [D&D5e Dark Mode](https://github.com/Stryxin/dnd5edark-foundryvtt)                               | :heavy_check_mark: | Made tweaks to make foundry-wide dark mode "usable."                                                                                |
| [Favourite Item Tab](https://github.com/syl3r86/favtab)                                          | :heavy_check_mark: | Works as expected, a few things on the UI are cramped but definitely usable.                                                        |
| [Inventory+](https://github.com/syl3r86/inventory-plus)                                          |      :shrug:       | Inventory Tab Features interfere with how we generate the Actions Tab. If Inventory+ is on, the actions tab will not display items. |
| [Illandril's Character Sheet Lockdown](https://github.com/illandril/FoundryVTT-sheet5e-lockdown) | :heavy_check_mark: | As of 0.7.x this sheet is appropriately affected.                                                                                   |
| [Crash's 5e Downtime Tracking](https://github.com/crash1115/5e-training)                         | :heavy_check_mark: | Works well in limited space.                                                                                                        |
| [Ethck's 5e Downtime Tracking](https://github.com/Ethck/Ethck-s-Downtime-Tracking)               | :heavy_check_mark: | Works well in limited space.                                                                                                        |
| [Skill Customization for D&D5E](https://github.com/schultzcole/FVTT-Skill-Customization-5e)      | :heavy_check_mark: | user might want to expand their sheet horizontally a little to accommodate the needed extra space.                                  |

## Known Issues

- The To Hit/Save DC column is probably going to respond poorly to unconventional weapon builds. Stuff like the Hexblade or Bladesinger. See [Issue #4](https://github.com/ElfFriend-DnD/foundryvtt-compactBeyond5eSheet/issues/4).

## Acknowledgements

Mostly a thousand thanks to [Andrew Krigline](https://github.com/akrigline) for creating this module and making it so good to use and indispensable that I felt compelled to take it over when he couldn't maintain it any more.

Obviously all of the layout decisions here are pretty directly ripped from D&DBeyond's desktop-sized character sheet. I'm assuming they have done a lot of UX research and am piggy-backing off of that work.

Yoinked the expanded Biography tab directly from [tidy5e-sheet](https://github.com/sdenec/tidy5e-sheet). Also took their localization of the headers in said tab.

Bootstrapped with Nick East's [create-foundry-project](https://gitlab.com/foundry-projects/foundry-pc/create-foundry-project).

Mad props to the [League of Extraordinary FoundryVTT Developers](https://forums.forge-vtt.com/c/package-development/11) community which helped me figure out a lot.
