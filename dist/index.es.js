import w from "clipboard";
import f from "gcoord";
const p = (e, ...t) => {
  console.warn("FanUtils:", e, ...t);
}, u = typeof window < "u";
function P(e) {
  return e instanceof Promise || typeof (e == null ? void 0 : e.then) == "function";
}
const N = (e) => /^1[3-9]{1}\d{9}$/.test(e);
function T(e) {
  const t = [];
  let r = !1;
  return (...n) => new Promise(async (o, i) => {
    if (t.push({ resolve: o, reject: i }), !r) {
      r = !0;
      try {
        const a = await e(...n);
        t.forEach((c) => c.resolve(a));
      } catch (a) {
        t.forEach((c) => c.reject(a));
      }
      t.length = 0, r = !1;
    }
  });
}
function y(e) {
  return "" + ((e == null ? void 0 : e.prefix) || "") + Math.floor(Math.random() * 1e6).toString(36);
}
const v = (e, t = !1) => {
  const r = e.replace(/-(\w)/g, (n, o) => o.toUpperCase());
  return t ? `${r[0].toUpperCase()}${r.substring(1)}` : r;
}, I = (e) => e.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
function D(e, t = 150) {
  let r = 0;
  return function(...n) {
    const o = Date.now();
    o - r > t && (e.apply(this, n), r = o);
  };
}
function E(e, t = 200, r = !1) {
  let n;
  return function(...o) {
    if (n && clearTimeout(n), r)
      return n = null, e.apply(this, o);
    n = setTimeout(() => e.apply(this, o), t);
  };
}
function h(e, t = 1) {
  if (t < 0)
    return e;
  const r = decodeURIComponent(e);
  if (t === 0 && r.includes("%"))
    return h(r, 0);
  const n = t - 1;
  return n <= 0 ? r : h(r, n);
}
const $ = (e = 0) => new Promise((t) => {
  setTimeout(() => t(!0), e);
}), b = () => {
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
}, H = (e) => (u && (window.location.href = "tel:" + e), new Promise((t) => t(e))), W = (e) => {
  !e || !u || (document.title = e);
}, Y = (e) => {
}, A = async (e) => {
  if (u) {
    var t = document.createElement("a");
    t.href = e, t.target = "_blank", t.download = `${y()}`, document.body.appendChild(t), t.click(), document.body.removeChild(t);
  }
}, L = () => u ? location.href : "", B = () => new Promise((e) => {
  if (!window.my || !window.my.getEnv)
    return e(!1);
  const t = setTimeout(() => {
    e(!1);
  }, 2e3);
  window.my.getEnv((r) => {
    clearTimeout(t), e(r.miniprogram);
  });
}), k = (e, t) => new Promise((r, n) => {
  const o = document.createElement("script");
  if (t)
    for (let i in t)
      o.setAttribute(i, t[i]);
  o.src = e, o.onload = r, o.onerror = (i) => {
    document.head.removeChild(o), n(i);
  }, document.head.appendChild(o);
}), R = (e) => new Promise((t, r) => {
  if (!u) {
    t({ text: e });
    return;
  }
  const n = document.createElement("button"), o = new w(n, {
    text: () => e || "",
    action: () => "copy",
    container: document.body
  });
  o.on("success", (i) => {
    o.destroy(), t(i);
  }), o.on("error", () => {
    o.destroy(), r(new Error(w.isSupported() ? "复制失败，请手动复制" : "浏览器不支持一键复制，请手动复制"));
  }), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}), d = (e, t = 2, r) => {
  const n = Number(e);
  if (isNaN(n))
    return 0;
  const { floor: o } = r || {}, i = Math.pow(10, t + 1), a = Math.pow(10, t);
  return (o ? Math.floor(n * i / 10) : Math.round(n * i / 10)) / a;
}, g = (e, t = 2, r) => {
  const { right: n, sign: o = "0" } = r || {}, i = String(e);
  let a = "";
  const c = t - i.length;
  if (c > 0)
    for (let s = 0; s < c; s++)
      a += o;
  return n ? `${i}${a}` : `${a}${i}`;
}, U = (e, t) => {
  const { lang: r = "zh", plusSign: n = !1, decimal: o, floor: i = !0 } = t || {}, a = r === "zh" ? 1e4 : 1e3, c = typeof o == "number" ? o : r === "zh" ? 2 : 1;
  if (e < a) {
    if (n) {
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
  return `${s}${n ? "+" : ""}`;
}, z = (e) => Number(e).toLocaleString(), G = (e, t, r) => {
  if (!e || !u)
    return;
  const { expired: n = 0, runTime: o } = r || {}, i = JSON.stringify({ t: Date.now(), expired: n, data: t });
  o ? sessionStorage.setItem(e, i) : localStorage.setItem(e, i);
}, J = (e, t) => {
  if (!e || !u)
    return null;
  const { runTime: r, expired: n } = t || {};
  let o = r ? sessionStorage.getItem(e) : localStorage.getItem(e);
  if (!o)
    return o;
  try {
    o = JSON.parse(o);
  } catch (a) {
    return p("Error getStorage parse..", a), o;
  }
  const i = n || o.expired;
  return i && o.t && Date.now() - o.t > i ? null : o.data;
}, F = (e, t) => {
  if (!u)
    return;
  const { runTime: r } = t || {};
  r ? sessionStorage.removeItem(e) : localStorage.removeItem(e);
}, O = (e) => {
  if (!u)
    return;
  const { runTime: t } = { ...e };
  t ? sessionStorage.clear() : localStorage.clear();
}, j = (e) => (e.length > 19 && (e = e.substring(0, 19).replace("T", " ")), new Date(e.replace(/-/g, "/"))), _ = (e, t) => {
  const { format: r = "YYYY-MM-DD HH:mm:ss" } = t || {}, n = e.getFullYear(), o = g(e.getMonth() + 1, 2), i = g(e.getDate(), 2), a = g(e.getHours(), 2), c = g(e.getMinutes(), 2), s = g(e.getSeconds(), 2);
  return r.replace("YYYY", `${n}`).replace("MM", o).replace("DD", i).replace("HH", a).replace("mm", c).replace("ss", s);
}, q = (e, t, r, n) => {
  if (e = Number(e), t = Number(t), r = Number(r), n = Number(n), e === r && t === n)
    return 0;
  {
    const o = Math.PI * e / 180, i = Math.PI * r / 180, a = t - n, c = Math.PI * a / 180;
    let s = Math.sin(o) * Math.sin(i) + Math.cos(o) * Math.cos(i) * Math.cos(c);
    return s > 1 && (s = 1), s = Math.acos(s), s = s * 180 / Math.PI, s = s * 60 * 1.1515 * 1609.34, Math.round(s);
  }
}, M = (e) => {
  const { type: t = "gcj02", timeout: r } = e || {};
  return new Promise((n, o) => {
    if (!u)
      return n({ accuracy: 0, latitude: 0, longitude: 0 });
    if (!navigator.geolocation) {
      o(new Error("该浏览器不支持获取地理位置"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (i) => {
        const { accuracy: a, latitude: c, longitude: s } = i.coords;
        if (t === "gcj02") {
          const [l, m] = f.transform([s, c], f.WGS84, f.GCJ02);
          n({ accuracy: a, latitude: Number(m), longitude: Number(l) });
          return;
        }
        n({ accuracy: a, latitude: Number(c), longitude: Number(s) });
      },
      (i) => o(i),
      { enableHighAccuracy: !0, timeout: r, maximumAge: 1e3 * 60 }
    );
  });
}, S = (e) => {
  const { type: t = "gcj02", timeout: r, weixinReady: n } = e || {};
  return new Promise((o, i) => {
    var s;
    if (!u)
      return o({ accuracy: 0, latitude: 0, longitude: 0 });
    let a;
    const c = n || ((s = window.fanWeixinSdk) == null ? void 0 : s.onConfigReady) || window.wx.ready;
    r && (a = setTimeout(() => i(new Error("微信位置获取超时")), r)), c(() => {
      window.wx.getLocation({
        type: t,
        success: (l) => {
          a && clearTimeout(a), o({ latitude: Number(l.latitude), longitude: Number(l.longitude), accuracy: l.accuracy });
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
}, Z = async (e) => {
  if (!u)
    return { accuracy: 0, latitude: 0, longitude: 0, from: "browser" };
  const { type: t = "gcj02", useWeixin: r = !0, timeout: n, weixinTimeout: o, weixinReady: i } = e || {}, { isWeixin: a } = b();
  let c = "";
  if (a && r && !!window.wx)
    try {
      return { ...await S({ type: t, timeout: o || n, weixinReady: i }), from: "weixin" };
    } catch (m) {
      c += `[wx]${m.message}`;
    }
  return { ...await M({ type: t, timeout: n }), from: "browser", errMsg: c };
};
export {
  v as camelize,
  O as clearStorage,
  y as createUniqueId,
  j as dateFromString,
  E as debounce,
  h as decodeString,
  _ as formatDate,
  q as getCoordinatesDistance,
  L as getCurrentUrl,
  Z as getGeolocation,
  J as getStorage,
  b as getSystemInfo,
  u as inBrowser,
  B as isMpWebAlipay,
  P as isPromiseLike,
  I as kebabCase,
  p as libLogWarn,
  k as loadJs,
  H as makingCall,
  T as mergeConcurrent,
  g as padNumber,
  z as partNumber,
  F as removeStorage,
  d as roundNumber,
  A as saveImage,
  R as setClipboard,
  Y as setNavigationBarColor,
  W as setPageTitle,
  G as setStorage,
  $ as sleep,
  D as throttle,
  U as unitNumber,
  N as validatePhoneNumber
};
