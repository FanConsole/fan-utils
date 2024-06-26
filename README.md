# Fan Utils

### Install

```
pnpm add git+https://gitee.com/thiszhong/fan-utils.git#v2.0.4 clipboard gcoord
```

### 使用

#### UniApp 项目配置

- jsconfig / tsconfig 中 `compilerOptions.paths` 增加 `"fan-utils": ["fan-utils/uniapp"]`
- vite.config 中 `resolve.alias` 增加 `'fan-utils': 'fan-utils/uniapp'`
