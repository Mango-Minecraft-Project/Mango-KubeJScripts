# 小技巧

## 腳本預處理參數 [KubeJS 6+]

可在腳本開頭使用預處理參數，如下

|名稱|用途|參數類別|說明|預設值|
|:-:|---|---|---|:-:|
|`priority`|載入優先度|整數(Number)|數字越大越先載入|`0`|
|`ignored`|忽略載入|布林(Boolean)|如果是true則跳過載入|`false`|
|`packmode`|模組包模式|字串(String)|若模組包模式不等於輸入值內則跳過載入|`default`|
|`requires`|命名空間需求|字串(String)|若未載入該命名空間則跳過載入|` ` (無)|
||||||

### 範例

```javascript=
// priority: 100
// ignored: false
// packmode: dev
// requires: forge
// requires: create
```

## 自製 KubeJS 用 VSCode Code Snippet

```json
{
  "event": {
    "scope": "javascript,typescript",
    "prefix": "$event",
    "body": ["(event) => {", "  $0", "}"]
  },
  "priority": {
    "scope": "javascript,typescript",
    "prefix": "$priority",
    "body": ["// priority: $1", "$0"]
  },
  "ignored": {
    "scope": "javascript,typescript",
    "prefix": "$ignored",
    "body": ["// ignored: ${1|true,false|}", "$0"]
  },
  "packmode": {
    "scope": "javascript,typescript",
    "prefix": "$packmode",
    "body": ["// packmode: $1", "$0"]
  },
  "requires": {
    "scope": "javascript,typescript",
    "prefix": "$requires",
    "body": ["// requires: $1", "$0"]
  },
  "todo": {
    "scope": "javascript,typescript",
    "prefix": "$todo",
    "body": ["// TODO", "$0"]
  },
  "license": {
    "scope": "javascript,typescript",
    "prefix": "$license",
    "body": ["/**", " * @author MangoJellyPudding", " */", "", ""]
  },
  "disable ts-except-error": {
    "scope": "typescript",
    "prefix": "$disable-ts-except-error",
    "body": ["// @ts-expect-error", "$0"]
  }
}
```

## 將腳本自動同步到 Github

以下步驟皆以Prism Launcher為基礎

1. 備份 `.minecraft`；
2. 清空原有的 `.minecraft`；
3. 在 `.minecraft` 中輸入 `git clone "儲存庫網址" .`；
4. 將備份的 `.minecraft` 內的檔案放回 `.minecraft`，視情況選擇覆蓋舊有的或保留舊有的；
5. 新增以下檔案：
    - `.minecraft/.gitignore`
      ```
      *
      !.gitignore
      !kubejs/      
      ```
    - `.minecraft/kubejs/.gitignore`
      ```
      !*
      probe/
      ```

## 讀取任意模組的Json檔案

[pietro-lopes/read_json_from_mod.js](https://gist.github.com/pietro-lopes/1471e43c6acef411fd98f10908185fae)

## *Beans*

Kubejs 有一個名為 *beans* 的功能，可以讓腳本更易讀。
任何 `getXy()` 都可以用 `xy` 來獲取，任何 `setXy(value)` 都可以用 `xy = value` 來設置，任何 `isXy()` 都可以用 `xy` 來檢查。

這樣我們就可以縮短代碼！例如，要獲取所有在線玩家的列表，可以使用 `event.getServer().getPlayers()`。有了 *beans* ，這可以縮短為 `event.server.players`！

請注意，只有當方法沒有參數時，`get` 和 `is` 時 *beans* 才會起作用。這意味著像 `getHeldItem(InteractionHand hand)` 這樣的方法不能簡寫為 `heldItem`。
對於 `set` 方法，需要有一個參數。

## 實用模組（非KubeJS Addon為主）

### ProbeJS

|[![badge-curseforge]][probejs-curseforge]|[![badge-modrinth]][probejs-modrinth]|[![badge-mcmod]][probejs-mcmod]|[![badge-wiki]][probejs-wiki]|
|---|---|---|---|

> ProbeJS 的功能是收集你的模組包中的方塊/物品等資訊，供 VSCode 編輯器使用。

- tags: `vscode`, `code snippets`

### Lychee

|[![badge-curseforge]][lychee-curseforge]|[![badge-modrinth]][lychee-modrinth]|[![badge-mcmod]][lychee-mcmod]|[![badge-wiki]][lychee-wiki]|
|---|---|---|---|

> Lychee 是一個允許你使用 JSON 合成表和數據包定義自訂交互的模組。

- tags: `recipe`, `world intercation`

### Loquat🧩

<!-- |[![badge-curseforge]][loquat-curseforge]|[![badge-modrinth]][loquat-modrinth]|[![badge-mcmod]][loquat-mcmod]|[![badge-wiki]][loquat-wiki]|
|---|---|---|---| -->
|[![badge-curseforge]][loquat-curseforge]|[![badge-modrinth]][loquat-modrinth]|[![badge-wiki]][loquat-wiki]|
|---|---|---|

> Loquat🧩 為 Minecraft 地圖製作者提供的區域管理和結構生成模組。

- tags: `worldgen`, `structure`

### Custom Fluid Mixin

|[![badge-curseforge]][custom_fluid_mixin-curseforge]|[![badge-modrinth]][custom_fluid_mixin-modrinth]|[![badge-mcmod]][custom_fluid_mixin-mcmod]|[![badge-wiki]][custom_fluid_mixin-wiki]|
|---|---|---|---|

> 借助資料包，本模組允許你在流體（例如岩漿、水）流動時產生一個方塊（例如岩漿流動遇水時可以不再是產生黑曜石，能夠自訂任何方塊）、產生一陣爆炸或執行一個資料包函數。

- tags: `recipe`, `world intercation`

### Origins (Forge)

|[![badge-curseforge]][origins_forge-curseforge]|[![badge-modrinth]][origins_forge-modrinth]|[![badge-mcmod]][origins_forge-mcmod]|[![badge-wiki]][origins_forge-wiki]|
|---|---|---|---|

> 本模組可以讓你在遊戲開始之前選擇你的種族，它們特有的能力可以幫助你，也可能會妨礙你的正常生存！

可以透過禁用全部種族來讓此模組轉變成僅修改各種玩家屬性的模組

- tags: `player attributes`

### Custom Machinery

|[![badge-curseforge]][custom_machinery-curseforge]|[![badge-modrinth]][custom_machinery-modrinth]|[![badge-mcmod]][custom_machinery-mcmod]|[![badge-wiki]][custom_machinery-wiki]|
|---|---|---|---|

> 這個模組讓你使用資源包創建自己的機器並添加進遊戲中。

- tags: `multiblock`, `custom machine`

### Multiblocked

|[![badge-curseforge]][multiblocked-curseforge]|[![badge-mcmod]][multiblocked-mcmod]|[![badge-wiki]][multiblocked-wiki]|
|---|---|---|

<!-- |[![badge-curseforge]][multiblocked-curseforge]|[![badge-modrinth]][multiblocked-modrinth]|[![badge-mcmod]][multiblocked-mcmod]|[![badge-wiki]][multiblocked-wiki]|
|---|---|---|---| -->

> Multiblocked是一個極其靈活但具有原版風格的自訂多方塊模組。

- tags: `multiblock`, `custom machine`

### Lopy's More Materials

|[![badge-curseforge]][lopys_more_materials-curseforge]|[![badge-modrinth]][lopys_more_materials-modrinth]|[![badge-mcmod]][lopys_more_materials-mcmod]|
|---|---|---|

> 這是一個簡單的模組，它為模組/模組包作者添加了大量可供魔改配方的材料。
> 
> <img src="https://media.forgecdn.net/attachments/614/397/mmt_items.png" height="500">

---
[badge-curseforge]: https://img.shields.io/badge/CurseForge-313338?style=for-the-badge&logo=CurseForge
[badge-modrinth]: https://img.shields.io/badge/Modrinth-313338?style=for-the-badge&logo=Modrinth
[badge-mcmod]: https://img.shields.io/badge/MC%E7%99%BE%E7%A7%91-313338?style=for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD%2FAP8A%2F6C9p5MAAAUjSURBVFjDvZfbbxRVGMB%2F3zmzO6U3KAVKSwQBK8ViQsS7aI0YMIiCYjUmGkB88kkTH5RXk8Y%2FwRh9MNGkhoiEBzVqTBoVEEmEGC4WWmvvpS29bPcyt3N86O52tyzKA%2B2XTHZmznfm991nViiQto7WpcAh4BXgLkBx%2B%2BQf4GvgkyMtR4dyN6UA%2FgTwEbD5NkJLSZ9g3n6%2F5atj5Dxs62jdCpxYBDiK8I4I98u3vv9iF4C0dbRWAqeB5oWHB4RU0JN5jalwyzUh3OoALywevJzuzAES4Sa0JFcBbzjAvgWHS0Bgqvg7c5BEtBEt6dzSHgdoWli4T2Cq6c4cYibagJZM4fI6ByhfWM9r6MocJBndOR8O4DqAzV1ZbNGViFDQqRTr2eyaBRFknp7gkYlq6cocJm3WoElj7ayOzKlap3iTKlwkshFK5AY81qJEFxuUlSDyUBIRyRp6vAN4toGYeHlHYloIDRg7u8cBMNYQ12Xsb36Xitiy%2FMPODnzL2cFviOslc0aZkGc3vcWaqsY8tnfqIt9d%2BRhrDY2197OtYSdL4o2E1KDwi%2BCXrqf49MIIufg5c%2BFWrK5cT3lsaR62bc0uzg3%2FiMUiCKEJWFWxlq31O5CCKZ0MJvGiNNsadrFv8zvz0lGWP%2Fsn4XHs6jhBZHGUzEUgJ6EJioJdV3En9VUb6Z%2FuJKbiRMZn04qHi%2BC5fa522L52fx5%2BYTzFhBfmU5gMItr%2FGmPCC3D13P4iA3Iy7Y1TEV%2BKFod7Vj5G7%2BRFUDHieglNKx8CwItSYC2uUwHWx3EaqXTrATg9nODD3%2FuLC87OpqAQDjd52%2FVM%2FslQoguA5lXbqXRr8MM0DdWN1FWuB%2BDS6CmmvXEAUqaeAf91ROIA9M94GANLHEWZzh6OQsuNHVXSAC9M0jl2BoAqt5Z1S5vxojT31rUgCNYaLl77Jd8JGVOHZ5cDBgAtQglWSSlpgJYYl8ZOYWwEQNPKR6h0l3N37QMADM%2F0MJS4TEzHZsOMQYhujXhLBiiHkZkeBhNXAFi3rJn76ndS5dYCcHX8Z677dYS2uuRDreWWpaQBgiKMfM4P%2FQRAtbuCpza8DoAxCU4OTdLrHyay8ZJQVyvSkSEdlj5MgXLJLgBwdJyu63%2FghSlcp5y4nu3ni9cz%2FDbeQmW8Mht2hRIhEUQkA0OZVjzWUMVQcgWTXogqUQuXJ9JMZVt03iiW%2FK8WzURmhO6Jc2xe%2BWhe5%2BdBg2%2FKUIT5caMFpv2IXweneX7Dcpa5Dm9uqbtp2D84089YOoGr5f8%2FOs8P%2FwSEAMwEEedGE7jK5izOS1wJ7Z2j%2FNA7STL474IsTIG0dbR2g10vollVsRYtDqlgmon0MCJCTHx02auMBY%2FjRwF9CQ8ElAhrq%2BI4IqRCw2DSx1pLYCyry%2BPUlDncrBMHkj7pwCDCuJNzxVrDwHQnFotCo5WDlgzXggfpnroXwwxKLLFsUq21XJnIzOqLEFOCiOBqYTQdMJIKit6ShRJTKl8bTmEgHZWraosWj9FgO33efhxtswVX7FNcl%2F5ecPKV97%2FTSBxgpvienfXcf5I%2B%2F0WEEMlOuAWQtAIuFMM9Rvwd9Pn7FhoO8LcCjuXgSjyG%2Fafp9%2Fdmx%2BuCwgGOK%2BAE2N%2BVBAz7Oxnwn1sMzwF6gc%2FUkZajGUX02pD%2FzPCgt2ex4Eng1fbdTWMK4L2Wrzsnwy27EXtmEeCXgL3tu5tOwrw%2BefmbLlcRvAK8xOwf1arbBE0BV4HjwOftu5umcwv%2FAs4dLGlGxRDmAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTEyLTI5VDEwOjM2OjU1KzAwOjAwPlu%2B7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0xMi0yOVQxMDozNjo1NSswMDowME8GBlMAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMTItMjlUMTA6MzY6NTUrMDA6MDAYEyeMAAAAAElFTkSuQmCC
[badge-wiki]: https://img.shields.io/badge/Wiki-313338?style=for-the-badge&logo=wikipedia

<!-- 實用模組 -->
[probejs-curseforge]: https://curseforge.com/minecraft/mc-mods/probejs
[probejs-modrinth]: https://modrinth.com/mod/probejs
[probejs-mcmod]: https://mcmod.cn/class/6486
[probejs-wiki]: https://github.com/Prunoideae/ProbeJS/wiki/

[lychee-curseforge]: https://curseforge.com/minecraft/mc-mods/lychee
[lychee-modrinth]: https://modrinth.com/mod/lychee
[lychee-mcmod]: https://mcmod.cn/class/5559
[lychee-wiki]: https://lycheetweaker.readthedocs.io/en/latest/

[loquat-curseforge]: https://curseforge.com/minecraft/mc-mods/loquat
[loquat-modrinth]: https://modrinth.com/mod/loquat
<!-- [loquat-mcmod]: https://mcmod.cn/class/5559 -->
[loquat-wiki]: https://loquat.readthedocs.io/en/latest/

[custom_fluid_mixin-curseforge]: https://curseforge.com/minecraft/mc-mods/custom-fluid-mixin
[custom_fluid_mixin-modrinth]: https://modrinth.com/mod/custom-fluid-mixin
[custom_fluid_mixin-mcmod]: https://mcmod.cn/class/5942
[custom_fluid_mixin-wiki]: https://github.com/Insane96/CustomFluidMixin/wiki

[origins_forge-curseforge]: https://curseforge.com/minecraft/mc-mods/origins-forge
[origins_forge-modrinth]: https://modrinth.com/mod/origins-forge
[origins_forge-mcmod]: https://mcmod.cn/class/4032
[origins_forge-wiki]: https://origins.readthedocs.io/en/latest/

[custom_machinery-curseforge]: https://curseforge.com/minecraft/mc-mods/custom-machinery
[custom_machinery-modrinth]: https://modrinth.com/mod/custom-machinery
[custom_machinery-mcmod]: https://mcmod.cn/class/3903
[custom_machinery-wiki]: https://frinn.gitbook.io/custom-machinery-1.19/

[multiblocked-curseforge]: https://curseforge.com/minecraft/mc-mods/multiblocked
<!-- [multiblocked-modrinth]: https://modrinth.com/mod/multiblocked -->
[multiblocked-mcmod]: https://mcmod.cn/class/6191
[multiblocked-wiki]: https://github.com/Low-Drag-MC/Multiblocked/wiki

[lopys_more_materials-curseforge]: https://curseforge.com/minecraft/mc-mods/morematerials
[lopys_more_materials-modrinth]: https://modrinth.com/mod/morematerials
[lopys_more_materials-mcmod]: https://mcmod.cn/class/11835
<!-- [lopys_more_materials-wiki]: https://frinn.gitbook.io/custom-machinery-1.19/ -->