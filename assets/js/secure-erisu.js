export class Indexs { constructor() { var e = document.getElementById("change"); if (e) { var t = e.getAttribute("href"); ("\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u006f\u006d\u0065\u0061\u006e\u0073\u0074\u0065\u0061\u006d\u002e\u0067\u0069\u0074\u0068\u0075\u0062\u002e\u0069\u006f\u002f" !== t || "" == t) && (window.location.href = "\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u006f\u006d\u0065\u0061\u006e\u0073\u0074\u0065\u0061\u006d\u002e\u0067\u0069\u0074\u0068\u0075\u0062\u002e\u0069\u006f\u002f") } else window.location.href = "\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u006f\u006d\u0065\u0061\u006e\u0073\u0074\u0065\u0061\u006d\u002e\u0067\u0069\u0074\u0068\u0075\u0062\u002e\u0069\u006f\u002f" } } const appleSequenceImages = []; for (let e = 0; e <= 81; e++)if (e > 80) for (let e = 0; e <= 80; e++)appleSequenceImages.push("ProtohomesAssembling81.jpg"); else e < 10 ? appleSequenceImages.push(`\u0050\u0072\u006f\u0074\u006f\u0068\u006f\u006d\u0065\u0073\u0041\u0073\u0073\u0065\u006d\u0062\u006c\u0069\u006e\u0067${`0${e}`.slice(-4)}.jpg`) : appleSequenceImages.push(`\u0050\u0072\u006f\u0074\u006f\u0068\u006f\u006d\u0065\u0073\u0041\u0073\u0073\u0065\u006d\u0062\u006c\u0069\u006e\u0067${`${e}`.slice(-4)}.jpg`); const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame; class EventEmitter { listeners = {}; addListener(e, t) { return this.listeners[e] = this.listeners[e] || [], this.listeners[e].push(t), this } on(e, t) { return this.addListener(e, t) } once(e, t) { this.listeners[e] = this.listeners[e] || []; const s = () => { t(), this.off(e, s) }; return this.listeners[e].push(s), this } off(e, t) { return this.removeListener(e, t) } removeListener(e, t) { let s = this.listeners[e]; if (!s) return this; for (let e = s.length; e > 0; e--)if (s[e] === t) { s.splice(e, 1); break } return this } emit(e, ...t) { let s = this.listeners[e]; return !!s && (s.forEach((e => { e(...t) })), !0) } listenerCount(e) { return (this.listeners[e] || []).length } rawListeners(e) { return this.listeners[e] } } class Canvas { constructor(e) { this.images = e.images, this.container = e.container, this.cover = e.cover, this.displayIndex = 0 } setup() { this.canvas = document.createElement("canvas"), this.container.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), window.addEventListener("resize", (() => this.resize())), this.resize() } renderIndex(e) { if (this.images[e]) return this.drawImage(e); for (var t = Number.MAX_SAFE_INTEGER, s = e; s >= 0; s--)if (this.images[s]) { t = s; break } for (var i = Number.MAX_SAFE_INTEGER, a = e, n = this.images.length; a < n; a++)if (this.images[a]) { i = a; break } this.images[t] ? this.drawImage(t) : this.images[i] && this.drawImage(i) } drawImage(e) { this.displayIndex = e, this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); const t = Math.floor((this.canvas.width - this.images[this.displayIndex].naturalWidth) / 2), s = Math.floor((this.canvas.height - this.images[this.displayIndex].naturalHeight) / 2); this.cover ? this.drawImageCover(this.ctx, this.images[this.displayIndex]) : this.ctx.drawImage(this.images[this.displayIndex], t, s) } resize() { const e = this.container.clientWidth, t = this.container.clientHeight; this.canvas.style.height = `${t}px`, this.canvas.style.width = `${e}px`, this.canvas.height = t, this.canvas.width = e, this.renderIndex(this.displayIndex) } drawImageCover(e, t, s, i, a, n, r, o) { 2 === arguments.length && (s = i = 0, a = e.canvas.width, n = e.canvas.height), (r = "number" == typeof r ? r : .5) < 0 && (r = 0), (o = "number" == typeof o ? o : .5) < 0 && (o = 0), r > 1 && (r = 1), o > 1 && (o = 1); var h, c, l, m, g = t.width, d = t.height, u = Math.min(a / g, n / d), p = g * u, I = d * u, v = 1; p < a && (v = a / p), Math.abs(v - 1) < 1e-14 && I < n && (v = n / I), (h = (g - (l = g / ((p *= v) / a))) * r) < 0 && (h = 0), (c = (d - (m = d / ((I *= v) / n))) * o) < 0 && (c = 0), l > g && (l = g), m > d && (m = d), e.drawImage(t, h, c, l, m, s, i, a, n) } } class ImgLoader extends EventEmitter { constructor(e) { super(), this.images = e.imgsRef, this.imageNames = e.images, this.imagesRoot = e.imagesRoot, this.sequenceLength = e.images.length, this.priorityFranes = e.priorityFrames, this.complete = !1, this.loadIndex = 0, this.priorityQueue = this.createPriorityQueue(), this.loadingQueue = this.createLoadingQueue(), this.loadNextImage() } loadImage(e) { if (this.images[e]) return this.loadNextImage(); const t = () => { s.removeEventListener("load", t), this.images[e] = s, 0 === e && this.emit("FIRST_IMAGE_LOADED"), this.loadNextImage() }, s = new Image; s.addEventListener("load", t), s.src = (this.imagesRoot ? this.imagesRoot : "") + this.imageNames[e] } loadNextImage() { this.priorityQueue.length ? (this.loadImage(this.priorityQueue.shift()), this.priorityQueue.length || this.emit("PRIORITY_IMAGES_LOADED")) : this.loadingQueue.length ? this.loadImage(this.loadingQueue.shift()) : (this.complete = !0, this.emit("IMAGES_LOADED")) } createPriorityQueue() { const e = this.priorityFrames || []; return e.length || (e.push(0), e.push(Math.round(this.sequenceLength / 2)), e.push(this.sequenceLength - 1)), e } createLoadingQueue() { return this.imageNames.map(((e, t) => t)).sort(((e, t) => Math.abs(e - this.sequenceLength / 2) - Math.abs(t - this.sequenceLength / 2))) } } class ScrollSequence { constructor(e) { this.opts = { container: "body", starts: "out", ends: "out", imagesRoot: "", cover: !1, ...e }, this.container = "object" == typeof e.container ? e.container : document.querySelector(e.container), this.scrollWith = e.scrollWith ? "object" == typeof e.scrollWith ? e.scrollWith : document.querySelector(e.scrollWith) : this.container, this.images = Array(e.images.length), this.imagesToLoad = e.images, this.priorityFrames = e.priorityFrames, this.loader = new ImgLoader({ imgsRef: this.images, images: this.imagesToLoad, imagesRoot: this.opts.imagesRoot, priorityFrames: this.priorityFrames }), this.canvas = new Canvas({ container: this.container, images: this.images, cover: this.opts.cover }), this.init() } init() { this.canvas.setup(), this.loader.once("FIRST_IMAGE_LOADED", (() => { this.canvas.renderIndex(0) })), this.loader.once("PRIORITY_IMAGES_LOADED", (() => { window.addEventListener("scroll", (() => this.changeOnWindowScroll())) })), this.loader.once("IMAGES_LOADED", (() => {  console.log("Sequence Loaded") })) } changeOnWindowScroll() { const e = 100 / (this.images.length - 1), t = Math.floor(this.percentScrolled / e); requestAnimationFrame((() => this.canvas.renderIndex(t))) } get percentScrolled() { const { starts: e, ends: t } = this.opts, s = this.scrollWith, i = document.documentElement, a = i.scrollTop || window.pageYOffset, n = s.clientHeight || s.offsetHeight, r = i.clientHeight; let o = s, h = 0; do { h += o.offsetTop, o = o.offsetParent } while (o && o !== window); let c = a - h, l = n + r; "out" === e && (c += r), "in" === t && (l -= r), "in" == e && (l -= r); const m = c / l * 100; return m > 100 ? 100 : m < 0 ? 0 : m } } const appleSequence = new ScrollSequence({ container: ".apple-sequence", scrollWith: ".apple-container", images: appleSequenceImages, imagesRoot: "image/img/", priorityFrames: [0, 20, 40, 60, 90], cover: !0, playUntil: "scroll-out", starts: "in" });
// function SequenceLoaded() {
//     requestAnimationFrame(startRender);
// }
// function rendered() {
//     //Render complete
//     // alert("image rendered");
//     document.querySelector('.main-loading').style.display = 'none';
//     document.querySelector('.bg-brackeys').removeAttribute("style");
//     document.querySelector('.show-prefab').removeAttribute("style");
// }

// function startRender() {
//     //Rendering start
//     requestAnimationFrame(rendered);
// }
