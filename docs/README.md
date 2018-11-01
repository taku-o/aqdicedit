# AqDicEdit - AquesTalk AqKanji2Koe Dictionary edit tool.

## application image
<img src="https://raw.githubusercontent.com/taku-o/aqdicedit/master/docs/app_img.png">

## functions
- add edit update delete
- drag drop
- import export opendir reload reset
- list filter selecthighlight
- input
    - source converted kind
- shortcutkey
- alwaysTop
- menu
- tutorial
- help
- scheme(receive)
    - open opendict
- scheme(send)
    - open reload

## data
- dict position
- working data (csv)
- kind master

## flow
1. select dict
2. convert to csv
3. save to db
4. edit
5. export to csv
6. convert csv to dict

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
    vendor/
        AqUsrDic.framework
        aq_dic_small
        aq_dic
        aq_dic_large
```

