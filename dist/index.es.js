import w from "clipboard";
import f from "gcoord";
const h = (e, ...t) => {
  console.warn("FanUtils:", e, ...t);
}, u = typeof window < "u";
function P(e) {
  return e instanceof Promise || typeof (e == null ? void 0 : e.then) == "function";
}
const N = (e) => /^1[3-9]{1}\d{9}$/.test(e);
function v(e) {
  const t = [];
  let r = !1;
  return (...o) => new Promise(async (n, i) => {
    if (t.push({ resolve: n, reject: i }), !r) {
      r = !0;
      try {
        const s = await e(...o);
        t.forEach((a) => a.resolve(s));
      } catch (s) {
        t.forEach((a) => a.reject(s));
      }
      t.length = 0, r = !1;
    }
  });
}
function y(e) {
  return "" + ((e == null ? void 0 : e.prefix) || "") + Math.floor(Math.random() * 1e6).toString(36);
}
const T = (e, t = !1) => {
  const r = e.replace(/-(\w)/g, (o, n) => n.toUpperCase());
  return t ? `${r[0].toUpperCase()}${r.substring(1)}` : r;
}, E = (e) => e.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
function $(e, t = 150) {
  let r = 0;
  return function(...o) {
    const n = Date.now();
    n - r > t && (e.apply(this, o), r = n);
  };
}
function D(e, t = 200, r = !1) {
  let o;
  return function(...n) {
    if (o && clearTimeout(o), r)
      return o = null, e.apply(this, n);
    o = setTimeout(() => e.apply(this, n), t);
  };
}
function p(e, t = 1) {
  if (t < 0)
    return e;
  const r = decodeURIComponent(e);
  if (t === 0 && r.includes("%"))
    return p(r, 0);
  const o = t - 1;
  return o <= 0 ? r : p(r, o);
}
const H = (e = 0) => new Promise((t) => {
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
}, W = (e) => (u && (window.location.href = "tel:" + e), new Promise((t) => t(e))), I = (e) => {
  !e || !u || (document.title = e);
}, Y = (e) => {
}, A = async (e) => {
  if (u) {
    var t = document.createElement("a");
    t.href = e, t.target = "_blank", t.download = `${y()}`, document.body.appendChild(t), t.click(), document.body.removeChild(t);
  }
}, L = () => u ? location.href : "", k = () => new Promise((e) => {
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
}), R = (e) => new Promise((t, r) => {
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
}), g = (e, t = 2, r) => {
  const o = Number(e);
  if (isNaN(o))
    return 0;
  const { floor: n } = r || {}, i = Math.pow(10, t + 1), s = Math.pow(10, t);
  return (n ? Math.floor(o * i / 10) : Math.round(o * i / 10)) / s;
}, d = (e, t = 2, r) => {
  const { right: o, sign: n = "0" } = r || {}, i = String(e);
  let s = "";
  const a = t - i.length;
  if (a > 0)
    for (let c = 0; c < a; c++)
      s += n;
  return o ? `${i}${s}` : `${s}${i}`;
}, U = (e, t) => {
  const { lang: r = "zh", plusSign: o = !1, decimal: n, floor: i = !0 } = t || {}, s = r === "zh" ? 1e4 : 1e3, a = typeof n == "number" ? n : r === "zh" ? 2 : 1;
  if (e < s) {
    if (o) {
      if (e > 1e3)
        return `${Math.floor(e / 1e3) * 1e3}+`;
      if (e > 100)
        return `${Math.floor(e / 100) * 100}+`;
    }
    return g(e, a, { floor: i }) + "";
  }
  let c;
  if (r === "zh") {
    const l = ["", "万", "亿", "万亿"], m = Math.floor(Math.log(e) / Math.log(s));
    c = g(e / Math.pow(s, m), a, { floor: i }) + l[m];
  } else
    e >= 1e6 ? c = g(e / 1e6, a, { floor: i }) + "m" : e >= 1e4 ? c = g(e / 1e4, a, { floor: i }) + "w" : c = g(e / 1e3, a, { floor: i }) + "k";
  return `${c}${o ? "+" : ""}`;
}, z = (e) => Number(e).toLocaleString(), G = (e, t, r) => {
  if (!e || !u)
    return;
  const { expired: o = 0, runTime: n } = r || {}, i = JSON.stringify({ t: Date.now(), expired: o, data: t });
  n ? sessionStorage.setItem(e, i) : localStorage.setItem(e, i);
}, J = (e, t) => {
  if (!e || !u)
    return null;
  const { runTime: r, expired: o } = t || {};
  let n = r ? sessionStorage.getItem(e) : localStorage.getItem(e);
  if (!n)
    return n;
  try {
    n = JSON.parse(n);
  } catch (s) {
    return h("Error getStorage parse..", s), n;
  }
  const i = o || n.expired;
  return i && n.t && Date.now() - n.t > i ? null : n.data;
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
  const { format: r = "YYYY-MM-DD HH:mm:ss" } = t || {}, o = e.getFullYear(), n = d(e.getMonth() + 1, 2), i = d(e.getDate(), 2), s = d(e.getHours(), 2), a = d(e.getMinutes(), 2), c = d(e.getSeconds(), 2);
  return r.replace("YYYY", `${o}`).replace("MM", n).replace("DD", i).replace("HH", s).replace("mm", a).replace("ss", c);
}, S = (e) => {
  const { type: t = "gcj02", timeout: r } = e || {};
  return new Promise((o, n) => {
    if (!navigator.geolocation) {
      n(new Error("该浏览器不支持获取地理位置"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (i) => {
        const { accuracy: s, latitude: a, longitude: c } = i.coords;
        if (t === "gcj02") {
          const [l, m] = f.transform([c, a], f.WGS84, f.GCJ02);
          o({ accuracy: s, latitude: Number(m), longitude: Number(l) });
          return;
        }
        o({ accuracy: s, latitude: Number(a), longitude: Number(c) });
      },
      (i) => n(i),
      { enableHighAccuracy: !0, timeout: r, maximumAge: 1e3 * 60 }
    );
  });
}, x = (e) => {
  const { type: t = "gcj02", timeout: r, weixinReady: o } = e || {};
  return new Promise((n, i) => {
    var c;
    let s;
    (o || ((c = window.fanWeixinSdk) == null ? void 0 : c.onConfigReady) || window.wx.ready)(() => {
      r && (s = setTimeout(() => i(new Error("微信位置获取超时")), r)), window.wx.getLocation({
        type: t,
        success: (l) => {
          s && clearTimeout(s), n({ latitude: Number(l.latitude), longitude: Number(l.longitude), accuracy: l.accuracy });
        },
        fail: (l) => {
          s && clearTimeout(s), i(new Error(l.errMsg));
        },
        cancel: () => {
          s && clearTimeout(s), i(new Error("用户取消了微信位置授权"));
        }
      });
    });
  });
}, q = async (e) => {
  if (!u)
    return { accuracy: 0, latitude: 0, longitude: 0, from: "browser" };
  const { type: t = "gcj02", useWeixin: r = !0, timeout: o, weixinTimeout: n, weixinReady: i } = e || {}, { isWeixin: s } = b();
  let a = "";
  if (s && r && !!window.wx)
    try {
      return { ...await x({ type: t, timeout: n || o, weixinReady: i }), from: "weixin" };
    } catch (m) {
      a += `[wx]${m.message}`;
    }
  return { ...await S({ type: t, timeout: o }), from: "browser", errMsg: a };
};
export {
  T as camelize,
  O as clearStorage,
  y as createUniqueId,
  j as dateFromString,
  D as debounce,
  p as decodeString,
  _ as formatDate,
  L as getCurrentUrl,
  q as getGeolocation,
  J as getStorage,
  b as getSystemInfo,
  u as inBrowser,
  k as isMpWebAlipay,
  P as isPromiseLike,
  E as kebabCase,
  h as libLogWarn,
  B as loadJs,
  W as makingCall,
  v as mergeConcurrent,
  d as padNumber,
  z as partNumber,
  F as removeStorage,
  g as roundNumber,
  A as saveImage,
  R as setClipboard,
  Y as setNavigationBarColor,
  I as setPageTitle,
  G as setStorage,
  H as sleep,
  $ as throttle,
  U as unitNumber,
  N as validatePhoneNumber
};
