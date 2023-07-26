# 方塊朝向

## 四面朝向（原版熔爐、模組機器）

如果想讓方塊像原版熔爐一樣根據玩家方向放置  
可以使用以下的方塊狀態(`block states`)
- 方塊狀態
  ```json
  {
    "variants": {
      "facing=east": {
        "model": "kubejs:block/{block_id}",
        "y": 90
      },
      "facing=north": {
        "model": "kubejs:block/{block_id}"
      },
      "facing=south": {
        "model": "kubejs:block/{block_id}",
        "y": 180
      },
      "facing=west": {
        "model": "kubejs:block/{block_id}",
        "y": 270
      }
    }
  }
  ```

---

## 六面朝向（原版原木）

如果想讓方塊像原版的原木一樣根據玩家方向放置  
可以使用以下的方塊狀態(`block states`)
方塊狀態
```json
{
  "variants": {
    "axis=x": {
      "model": "kubejs:block/{block_id}",
      "x": 90,
      "y": 90
    },
    "axis=y": {
      "model": "kubejs:block/{block_id}"
    },
    "axis=z": {
      "model": "kubejs:block/{block_id}",
      "x": 90
    }
  }
}
```

---

## 變數解釋

- 方塊狀態
  - `variants > facing=* > model > "kubejs:block/{block_id}"`  
    方塊在此狀態下所使用的模型（`model`），這個案例中都只需填入一樣的值即可