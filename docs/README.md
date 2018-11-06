# AqDicEdit - AquesTalk AqKanji2Koe Dictionary edit tool.

## application image
<img src="https://raw.githubusercontent.com/taku-o/aqdicedit/master/docs/app_img.png">

## functions
- add edit update delete
- export reset save cancel
- opendir reload
- list filter selecthighlight
- input
    - source converted kind
- shortcutkey
- alwaysTop
- menu
- tutorial
- help

## data
- master data (csv)
- working data (csv)

## flow
1. create working data if exists.
2. display working data
3. edit working data
4. save to db
5. export custom dictionary.

## structure

```
    package.json
    electron.ts
    electron-window.ts
    electron-menu.ts
    electron-launch.ts
    dict.html
    js/
        dict.ts (action)
        services.ts
        services.record.ts (data handling)
        services.aques.ts (AqUsrDic)
        models.ts (master, record)
    css/
        dict.less
        about.less
    vendor/
        AqUsrDic.framework
        aq_dic_small
        aq_dic
        aq_dic_large
```

