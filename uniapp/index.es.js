const S = (e, ...t) => {
  console.warn("FanUtils:", e, ...t);
}, N = typeof window < "u";
function D(e) {
  return e instanceof Promise || typeof (e == null ? void 0 : e.then) == "function";
}
const v = (e) => /^1[3-9]{1}\d{9}$/.test(e);
function x(e) {
  const t = [];
  let r = !1;
  return (...n) => new Promise(async (o, s) => {
    if (t.push({ resolve: o, reject: s }), !r) {
      r = !0;
      try {
        const i = await e(...n);
        t.forEach((a) => a.resolve(i));
      } catch (i) {
        t.forEach((a) => a.reject(i));
      }
      t.length = 0, r = !1;
    }
  });
}
function L(e) {
  return "" + ((e == null ? void 0 : e.prefix) || "") + Math.floor(Math.random() * 1e6).toString(36);
}
const $ = (e, t = !1) => {
  const r = e.replace(/-(\w)/g, (n, o) => o.toUpperCase());
  return t ? `${r[0].toUpperCase()}${r.substring(1)}` : r;
}, I = (e) => e.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
function W(e, t = 150) {
  let r = 0;
  return function(...n) {
    const o = Date.now();
    o - r > t && (e.apply(this, n), r = o);
  };
}
function Y(e, t = 200, r = !1) {
  let n;
  return function(...o) {
    if (n && clearTimeout(n), r)
      return n = null, e.apply(this, o);
    n = setTimeout(() => e.apply(this, o), t);
  };
}
function C(e, t = 1) {
  if (t < 0)
    return e;
  const r = decodeURIComponent(e);
  if (t === 0 && r.includes("%"))
    return C(r, 0);
  const n = t - 1;
  return n <= 0 ? r : C(r, n);
}
const A = (e = 0) => new Promise((t) => {
  setTimeout(() => t(!0), e);
});
let y;
const E = () => {
  if (y)
    return y;
  let e = !0;
  const t = uni.getSystemInfoSync();
  let r = t.platform.toLowerCase().includes("mac");
  const n = t.system ? t.system.toLowerCase().includes("ios") : r;
  let o = !0, s = !1, i = !1, a = !1, c = !1, g = !1, l = !1;
  //! // #ifdef MP-ALIPAY
  o = !1, s = !0, g = !0;
  //! // #endif
  //! // #ifdef MP-WEIXIN
  c = !0;
  //! // #endif
  //! // #ifdef MP
  a = !0;
  //! // #endif
  //! // #ifdef APP-PLUS
  i = !0;
  //! // #endif
  //! // #ifdef H5
  const m = navigator.userAgent;
  r = /macintosh|mac os x/i.test(m), o = /micromessenger/.test(m.toLowerCase()), s = /alipay/.test(m.toLowerCase()), l = o && m.includes("miniProgram");
  //! // #endif
  let u = uni.getMenuButtonBoundingClientRect && uni.getMenuButtonBoundingClientRect();
  if (!u || !u.left || !u.top || !u.width || !u.height) {
    e = !1;
    let p = 0, M = 96;
    t.platform === "devtools" ? p = n ? 5.5 : 7.5 : (p = n ? 4 : 8, M = n ? 88 : 96), t.statusBarHeight || (t.statusBarHeight = t.screenHeight - t.windowHeight - 20), u = {
      width: M,
      height: 32,
      bottom: t.statusBarHeight + p + 32,
      left: t.windowWidth - M - 10,
      right: t.windowWidth - 10,
      top: t.statusBarHeight + p
    };
  }
  let d = 44;
  t.statusBarHeight ? d = t.statusBarHeight + (u.top - t.statusBarHeight) * 2 + u.height : (e = !1, d = (u.top - (t.screenHeight - t.windowHeight - 20)) * 2 + u.height, t.statusBarHeight = 0);
  const b = {
    devicePixelRatio: t.pixelRatio,
    language: t.language || "",
    windowWidth: t.windowWidth,
    windowHeight: t.windowHeight,
    statusBarHeight: t.statusBarHeight,
    navBarHeight: d,
    mpMenuButtonRect: u,
    isIos: n,
    isMac: r,
    isWeixin: o,
    isAlipay: s,
    isApp: i,
    isMp: a,
    isMpWeixin: c,
    isMpAlipay: g,
    isMpWebWeixin: l
  };
  return e && (y = b), b;
}, R = (e) => uni.makePhoneCall({ phoneNumber: e }), U = (e) => {
  e && uni.setNavigationBarTitle({ title: e });
}, z = (e) => {
  const { frontColor: t = "", backgroundColor: r = "" } = e;
  uni.setNavigationBarColor({
    frontColor: t.toLowerCase(),
    backgroundColor: r.toLowerCase()
  });
}, H = (e) => new Promise((t, r) => {
  uni.getImageInfo({
    src: e,
    success: (n) => t(n.path),
    fail: (n) => r(new Error(n.errMsg || n.errorMessage))
  });
}), P = (e) => new Promise((t, r) => {
  uni.saveImageToPhotosAlbum({
    filePath: e,
    success: (n) => t(n),
    fail: (n) => {
      const o = n.errMsg || n.errorMessage || "";
      (o.includes("deny") || o.includes("denied")) && uni.showModal({
        title: "温馨提示",
        content: "请开启相册权限后再操作",
        confirmText: "去开启",
        success: (s) => {
          s.confirm && uni.openSetting();
        }
      }), r(new Error(o));
    }
  });
}), F = async (e) => {
  e.startsWith("http://tmp/") || (e = await H(e)), await P(e);
};
function J() {
  const e = getCurrentPages();
  return e[e.length - 1].$page.fullPath;
}
function j() {
  return new Promise((e) => e(!1));
}
const k = () => new Promise((e, t) => t("不支持")), G = (e) => new Promise((t, r) => {
  uni.setClipboardData({
    data: e || "",
    success: () => t({ text: e }),
    fail: (n) => {
      r(new Error(n.errMsg || n.errorMessage || "复制失败，请手动复制"));
    }
  });
}), f = (e, t = 2, r) => {
  const n = Number(e);
  if (isNaN(n))
    return 0;
  const { floor: o } = r || {}, s = Math.pow(10, t + 1), i = Math.pow(10, t);
  return (o ? Math.floor(n * s / 10) : Math.round(n * s / 10)) / i;
}, h = (e, t = 2, r) => {
  const { right: n, sign: o = "0" } = r || {}, s = String(e);
  let i = "";
  const a = t - s.length;
  if (a > 0)
    for (let c = 0; c < a; c++)
      i += o;
  return n ? `${s}${i}` : `${i}${s}`;
}, O = (e, t) => {
  const { lang: r = "zh", plusSign: n = !1, decimal: o, floor: s = !0 } = t || {}, i = r === "zh" ? 1e4 : 1e3, a = typeof o == "number" ? o : r === "zh" ? 2 : 1;
  if (e < i) {
    if (n) {
      if (e > 1e3)
        return `${Math.floor(e / 1e3) * 1e3}+`;
      if (e > 100)
        return `${Math.floor(e / 100) * 100}+`;
    }
    return f(e, a, { floor: s }) + "";
  }
  let c;
  if (r === "zh") {
    const g = ["", "万", "亿", "万亿"], l = Math.floor(Math.log(e) / Math.log(i));
    c = f(e / Math.pow(i, l), a, { floor: s }) + g[l];
  } else
    e >= 1e6 ? c = f(e / 1e6, a, { floor: s }) + "m" : e >= 1e4 ? c = f(e / 1e4, a, { floor: s }) + "w" : c = f(e / 1e3, a, { floor: s }) + "k";
  return `${c}${n ? "+" : ""}`;
}, _ = (e) => Number(e).toLocaleString(), w = /* @__PURE__ */ new Map(), B = (e, t, r) => {
  if (!e)
    return;
  const { expired: n = 0, runTime: o } = r || {}, s = { t: Date.now(), expired: n, data: t };
  o ? w.set(e, s) : uni.setStorageSync(e, JSON.stringify(s));
}, T = (e, t) => {
  if (!e)
    return null;
  const { runTime: r, expired: n } = t || {};
  let o = r ? w.get(e) : uni.getStorageSync(e);
  if (!o)
    return o;
  if (!r)
    try {
      o = JSON.parse(o);
    } catch (i) {
      return S("Error getStorage parse..", i), o;
    }
  const s = n || o.expired;
  return s && o.t && Date.now() - o.t > s ? null : o.data;
}, q = (e, t) => {
  const { runTime: r } = t || {};
  r ? w.delete(e) : uni.removeStorageSync(e);
}, K = (e) => {
  const { runTime: t } = e || {};
  t ? w.clear() : uni.clearStorageSync();
}, Z = (e) => (e.length > 19 && (e = e.substring(0, 19).replace("T", " ")), new Date(e.replace(/-/g, "/"))), Q = (e, t) => {
  const { format: r = "YYYY-MM-DD HH:mm:ss" } = t || {}, n = e.getFullYear(), o = h(e.getMonth() + 1, 2), s = h(e.getDate(), 2), i = h(e.getHours(), 2), a = h(e.getMinutes(), 2), c = h(e.getSeconds(), 2);
  return r.replace("YYYY", `${n}`).replace("MM", o).replace("DD", s).replace("HH", i).replace("mm", a).replace("ss", c);
}, V = (e) => {
  const { type: t = "gcj02", timeout: r } = e || {};
  return new Promise((n, o) => {
    const s = "fanLastGeolocation", i = T(s, { runTime: !0 });
    if (i) {
      n(i);
      return;
    }
    uni.getLocation({
      type: t,
      highAccuracyExpireTime: r,
      success: ({ latitude: a, longitude: c, accuracy: g }) => {
        const l = { accuracy: g, latitude: Number(a), longitude: Number(c) };
        B(s, l, { runTime: !0, expired: 3e4 }), n(l);
      },
      fail: (a) => o(new Error(a.errMsg || a.errorMessage))
    });
  });
};
export {
  $ as camelize,
  K as clearStorage,
  L as createUniqueId,
  Z as dateFromString,
  Y as debounce,
  C as decodeString,
  Q as formatDate,
  J as getCurrentUrl,
  V as getGeolocation,
  T as getStorage,
  E as getSystemInfo,
  N as inBrowser,
  j as isMpWebAlipay,
  D as isPromiseLike,
  I as kebabCase,
  S as libLogWarn,
  k as loadJs,
  R as makingCall,
  x as mergeConcurrent,
  h as padNumber,
  _ as partNumber,
  q as removeStorage,
  f as roundNumber,
  F as saveImage,
  G as setClipboard,
  z as setNavigationBarColor,
  U as setPageTitle,
  B as setStorage,
  A as sleep,
  W as throttle,
  O as unitNumber,
  v as validatePhoneNumber
};
