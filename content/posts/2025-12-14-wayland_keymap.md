---
title: "fcitx 한글키가 alt_r로 인식되는 문제"
category: "ricing"
date: "2025-12-14"
slug: "remmap-key"
tags: 
- hyprland
- fcitx
- wayland
---

arch+hyprland에서 fcitx를 통해 한영 전환키를 사용할 경우 한영키가 right alt로 인식되어 파이어폭스같은 앱에서 두번 눌러야 한영 전환이 되는 문제가 발생한다.
keyd를 설치한 후 /etc/keyd/default.conf에 다음과 같이 작성하면 된다

```
[ids]
*

[main]
rightalt = hangeul
```

## 참고자료
[Github Issue](https://github.com/rvaiya/keyd/issues/1117)
