import w from "clipboard";
import f from "gcoord";
const y = (e, ...t) => {
  console.warn("FanUtils:", e, ...t);
}, u = typeof window < "u";
function C(e) {
  return e instanceof Promise || typeof (e == null ? void 0 : e.then) == "function";
}
const N = (e) => /^1[3-9]{1}\d{9}$/.test(e);
function T(e) {
  const t = [];
  let r = !1;
  return (...o) => new Promise(async (n, i) => {
    if (t.push({ resolve: n, reject: i }), !r) {
      r = !0;
      try {
        const a = await e(...o);
        t.forEach((c) => c.resolve(a));
      } catch (a) {
        t.forEach((c) => c.reject(a));
      }
      t.length = 0, r = !1;
    }
  });
}
function b(e) {
  return "" + ((e == null ? void 0 : e.prefix) || "") + Math.floor(Math.random() * 1e6).toString(36);
}
const v = (e, t = !1) => {
  const r = e.replace(/-(\w)/g, (o, n) => n.toUpperCase());
  return t ? `${r[0].toUpperCase()}${r.substring(1)}` : r;
}, I = (e) => e.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
function D(e, t = 150) {
  let r = 0;
  return function(...o) {
    const n = Date.now();
    n - r > t && (e.apply(this, o), r = n);
  };
}
function E(e, t = 200, r = !1) {
  let o;
  return function(...n) {
    if (o && clearTimeout(o), r)
      return o = null, e.apply(this, n);
    o = setTimeout(() => e.apply(this, n), t);
  };
}
function h(e, t = 1) {
  if (t < 0)
    return e;
  const r = decodeURIComponent(e);
  if (t === 0 && r.includes("%"))
    return h(r, 0);
  const o = t - 1;
  return o <= 0 ? r : h(r, o);
}
const $ = (e = 0) => new Promise((t) => {
  setTimeout(() => t(!0), e);
}), p = () => {
  if (!u)
    return {};
  const e = navigator.userAgent, t = /macintosh|mac os x/i.test(e), r = /micromessenger/.test(e.toLowerCase());
  return {
    devicePixelRatio: window.devicePixelRatio,
    language: navigator.language,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    statusBarHeight: 0,
    navBarHeight: 0,
    isMac: t,
    isIos: /(iPhone|iPad|iPod|iOS)/i.test(e) || t,
    isWeixin: r,
    isAlipay: /alipay/.test(e.toLowerCase()),
    isMpWebWeixin: r && e.includes("miniProgram")
  };
}, W = (e) => (u && (window.location.href = "tel:" + e), new Promise((t) => t(e))), H = (e) => {
  !e || !u || (document.title = e);
}, Y = (e) => {
}, A = async (e) => {
  if (u) {
    var t = document.createElement("a");
    t.href = e, t.target = "_blank", t.download = `${b()}`, document.body.appendChild(t), t.click(), document.body.removeChild(t);
  }
}, L = () => u ? location.href : "", z = () => new Promise((e) => {
  if (!window.my || !window.my.getEnv)
    return e(!1);
  const t = setTimeout(() => {
    e(!1);
  }, 2e3);
  window.my.getEnv((r) => {
    clearTimeout(t), e(r.miniprogram);
  });
}), B = (e, t) => new Promise((r, o) => {
  const n = document.createElement("script");
  if (t)
    for (let i in t)
      n.setAttribute(i, t[i]);
  n.src = e, n.onload = r, n.onerror = (i) => {
    document.head.removeChild(n), o(i);
  }, document.head.appendChild(n);
}), k = (e) => new Promise((t, r) => {
  if (!u) {
    t({ text: e });
    return;
  }
  const o = document.createElement("button"), n = new w(o, {
    text: () => e || "",
    action: () => "copy",
    container: document.body
  });
  n.on("success", (i) => {
    n.destroy(), t(i);
  }), n.on("error", () => {
    n.destroy(), r(new Error(w.isSupported() ? "复制失败，请手动复制" : "浏览器不支持一键复制，请手动复制"));
  }), document.body.appendChild(o), o.click(), document.body.removeChild(o);
}), d = (e, t = 2, r) => {
  const o = Number(e);
  if (isNaN(o))
    return 0;
  const { floor: n } = r || {}, i = Math.pow(10, t + 1), a = Math.pow(10, t);
  return (n ? Math.floor(o * i / 10) : Math.round(o * i / 10)) / a;
}, g = (e, t = 2, r) => {
  const { right: o, sign: n = "0" } = r || {}, i = String(e);
  let a = "";
  const c = t - i.length;
  if (c > 0)
    for (let s = 0; s < c; s++)
      a += n;
  return o ? `${i}${a}` : `${a}${i}`;
}, R = (e, t) => {
  const { lang: r = "zh", plusSign: o = !1, decimal: n, floor: i = !0 } = t || {}, a = r === "zh" ? 1e4 : 1e3, c = typeof n == "number" ? n : r === "zh" ? 2 : 1;
  if (e < a) {
    if (o) {
      if (e > 1e3)
        return `${Math.floor(e / 1e3) * 1e3}+`;
      if (e > 100)
        return `${Math.floor(e / 100) * 100}+`;
    }
    return d(e, c, { floor: i }) + "";
  }
  let s;
  if (r === "zh") {
    const l = ["", "万", "亿", "万亿"], m = Math.floor(Math.log(e) / Math.log(a));
    s = d(e / Math.pow(a, m), c, { floor: i }) + l[m];
  } else
    e >= 1e6 ? s = d(e / 1e6, c, { floor: i }) + "m" : e >= 1e4 ? s = d(e / 1e4, c, { floor: i }) + "w" : s = d(e / 1e3, c, { floor: i }) + "k";
  return `${s}${o ? "+" : ""}`;
}, U = (e) => Number(e).toLocaleString(), G = (e, t) => {
  const { designSize: r = 375, deviceSize: o = p().windowWidth, decimal: n = 0 } = t || {};
  return d(e * o / r, n);
}, J = (e, t, r) => {
  if (!e || !u)
    return;
  const { expired: o = 0, runTime: n } = r || {}, i = JSON.stringify({ t: Date.now(), expired: o, data: t });
  n ? sessionStorage.setItem(e, i) : localStorage.setItem(e, i);
}, F = (e, t) => {
  if (!e || !u)
    return null;
  const { runTime: r, expired: o } = t || {};
  let n = r ? sessionStorage.getItem(e) : localStorage.getItem(e);
  if (!n)
    return n;
  try {
    n = JSON.parse(n);
  } catch (a) {
    return y("Error getStorage parse..", a), n;
  }
  const i = o || n.expired;
  return i && n.t && Date.now() - n.t > i ? null : n.data;
}, O = (e, t) => {
  if (!u)
    return;
  const { runTime: r } = t || {};
  r ? sessionStorage.removeItem(e) : localStorage.removeItem(e);
}, j = (e) => {
  if (!u)
    return;
  const { runTime: t } = { ...e };
  t ? sessionStorage.clear() : localStorage.clear();
}, _ = (e) => (e.length > 19 && (e = e.substring(0, 19).replace("T", " ")), new Date(e.replace(/-/g, "/"))), q = (e, t) => {
  const { format: r = "YYYY-MM-DD HH:mm:ss" } = t || {}, o = e.getFullYear(), n = g(e.getMonth() + 1, 2), i = g(e.getDate(), 2), a = g(e.getHours(), 2), c = g(e.getMinutes(), 2), s = g(e.getSeconds(), 2);
  return r.replace("YYYY", `${o}`).replace("MM", n).replace("DD", i).replace("HH", a).replace("mm", c).replace("ss", s);
}, Z = (e, t, r, o) => {
  if (e = Number(e), t = Number(t), r = Number(r), o = Number(o), e === r && t === o)
    return 0;
  {
    const n = Math.PI * e / 180, i = Math.PI * r / 180, a = t - o, c = Math.PI * a / 180;
    let s = Math.sin(n) * Math.sin(i) + Math.cos(n) * Math.cos(i) * Math.cos(c);
    return s > 1 && (s = 1), s = Math.acos(s), s = s * 180 / Math.PI, s = s * 60 * 1.1515 * 1609.34, Math.round(s);
  }
}, M = (e) => {
  const { type: t = "gcj02", timeout: r } = e || {};
  return new Promise((o, n) => {
    if (!u)
      return o({ accuracy: 0, latitude: 0, longitude: 0 });
    if (!navigator.geolocation) {
      n(new Error("该浏览器不支持获取地理位置"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (i) => {
        const { accuracy: a, latitude: c, longitude: s } = i.coords;
        if (t === "gcj02") {
          const [l, m] = f.transform([s, c], f.WGS84, f.GCJ02);
          o({ accuracy: a, latitude: Number(m), longitude: Number(l) });
          return;
        }
        o({ accuracy: a, latitude: Number(c), longitude: Number(s) });
      },
      (i) => n(i),
      { enableHighAccuracy: !0, timeout: r, maximumAge: 1e3 * 60 }
    );
  });
}, S = (e) => {
  const { type: t = "gcj02", timeout: r, weixinReady: o } = e || {};
  return new Promise((n, i) => {
    var s;
    if (!u)
      return n({ accuracy: 0, latitude: 0, longitude: 0 });
    let a;
    const c = o || ((s = window.fanWeixinSdk) == null ? void 0 : s.onConfigReady) || window.wx.ready;
    r && (a = setTimeout(() => i(new Error("微信位置获取超时")), r)), c(() => {
      window.wx.getLocation({
        type: t,
        success: (l) => {
          a && clearTimeout(a), n({ latitude: Number(l.latitude), longitude: Number(l.longitude), accuracy: l.accuracy });
        },
        fail: (l) => {
          a && clearTimeout(a), i(new Error(l.errMsg));
        },
        cancel: () => {
          a && clearTimeout(a), i(new Error("用户取消了微信位置授权"));
        }
      });
    });
  });
}, K = async (e) => {
  if (!u)
    return { accuracy: 0, latitude: 0, longitude: 0, from: "browser" };
  const { type: t = "gcj02", useWeixin: r = !0, timeout: o, weixinTimeout: n, weixinReady: i } = e || {}, { isWeixin: a } = p();
  let c = "";
  if (a && r && !!window.wx)
    try {
      return { ...await S({ type: t, timeout: n || o, weixinReady: i }), from: "weixin" };
    } catch (m) {
      c += `[wx]${m.message}`;
    }
  return { ...await M({ type: t, timeout: o }), from: "browser", errMsg: c };
};
export {
  v as camelize,
  j as clearStorage,
  b as createUniqueId,
  _ as dateFromString,
  E as debounce,
  h as decodeString,
  q as formatDate,
  Z as getCoordinatesDistance,
  L as getCurrentUrl,
  K as getGeolocation,
  F as getStorage,
  p as getSystemInfo,
  u as inBrowser,
  z as isMpWebAlipay,
  C as isPromiseLike,
  I as kebabCase,
  y as libLogWarn,
  B as loadJs,
  W as makingCall,
  T as mergeConcurrent,
  g as padNumber,
  U as partNumber,
  O as removeStorage,
  d as roundNumber,
  A as saveImage,
  k as setClipboard,
  Y as setNavigationBarColor,
  H as setPageTitle,
  J as setStorage,
  $ as sleep,
  D as throttle,
  G as transformPx,
  R as unitNumber,
  N as validatePhoneNumber
};
