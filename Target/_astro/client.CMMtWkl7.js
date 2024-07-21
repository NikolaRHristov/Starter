const c = { context: void 0, registry: void 0 };
function E(e) {
	c.context = e;
}
function le() {
	return {
		...c.context,
		id: `${c.context.id}${c.context.count++}-`,
		count: 0,
	};
}
const oe = (e, n) => e === n,
	m = { equals: oe };
let re = z;
const A = 1,
	$ = 2,
	K = { owned: null, cleanups: null, context: null, owner: null };
var a = null;
let B = null,
	fe = null,
	p = null,
	g = null,
	b = null,
	O = 0;
function V(e, n) {
	const t = p,
		s = a,
		i = e.length === 0,
		l = n === void 0 ? s : n,
		f = i
			? K
			: {
					owned: null,
					cleanups: null,
					context: l ? l.context : null,
					owner: l,
				},
		o = i ? e : () => e(() => N(() => _(f)));
	(a = f), (p = null);
	try {
		return F(o, !0);
	} finally {
		(p = t), (a = s);
	}
}
function M(e, n) {
	n = n ? Object.assign({}, m, n) : m;
	const t = {
			value: e,
			observers: null,
			observerSlots: null,
			comparator: n.equals || void 0,
		},
		s = (i) => (typeof i == "function" && (i = i(t.value)), Q(t, i));
	return [J.bind(t), s];
}
function I(e, n, t) {
	const s = X(e, n, !1, A);
	R(s);
}
function v(e, n, t) {
	t = t ? Object.assign({}, m, t) : m;
	const s = X(e, n, !0, 0);
	return (
		(s.observers = null),
		(s.observerSlots = null),
		(s.comparator = t.equals || void 0),
		R(s),
		J.bind(s)
	);
}
function N(e) {
	if (p === null) return e();
	const n = p;
	p = null;
	try {
		return e();
	} finally {
		p = n;
	}
}
function ue(e) {
	return (
		a === null ||
			(a.cleanups === null ? (a.cleanups = [e]) : a.cleanups.push(e)),
		e
	);
}
function ce() {
	return a;
}
function ae(e) {
	b.push.apply(b, e), (e.length = 0);
}
function G(e, n) {
	const t = Symbol("context");
	return { id: t, Provider: be(t), defaultValue: e };
}
function de(e) {
	return a && a.context && a.context[e.id] !== void 0
		? a.context[e.id]
		: e.defaultValue;
}
function he(e) {
	const n = v(e),
		t = v(() => j(n()));
	return (
		(t.toArray = () => {
			const s = t();
			return Array.isArray(s) ? s : s != null ? [s] : [];
		}),
		t
	);
}
let D;
function pe() {
	return D || (D = G());
}
function J() {
	if (this.sources && this.state)
		if (this.state === A) R(this);
		else {
			const e = g;
			(g = null), F(() => L(this), !1), (g = e);
		}
	if (p) {
		const e = this.observers ? this.observers.length : 0;
		p.sources
			? (p.sources.push(this), p.sourceSlots.push(e))
			: ((p.sources = [this]), (p.sourceSlots = [e])),
			this.observers
				? (this.observers.push(p),
					this.observerSlots.push(p.sources.length - 1))
				: ((this.observers = [p]),
					(this.observerSlots = [p.sources.length - 1]));
	}
	return this.value;
}
function Q(e, n, t) {
	let s = e.value;
	return (
		(!e.comparator || !e.comparator(s, n)) &&
			((e.value = n),
			e.observers &&
				e.observers.length &&
				F(() => {
					for (let i = 0; i < e.observers.length; i += 1) {
						const l = e.observers[i],
							f = B && B.running;
						f && B.disposed.has(l),
							(f ? !l.tState : !l.state) &&
								(l.pure ? g.push(l) : b.push(l),
								l.observers && ee(l)),
							f || (l.state = A);
					}
					if (g.length > 1e6) throw ((g = []), new Error());
				}, !1)),
		n
	);
}
function R(e) {
	if (!e.fn) return;
	_(e);
	const n = O;
	ge(e, e.value, n);
}
function ge(e, n, t) {
	let s;
	const i = a,
		l = p;
	p = a = e;
	try {
		s = e.fn(n);
	} catch (f) {
		return (
			e.pure &&
				((e.state = A),
				e.owned && e.owned.forEach(_),
				(e.owned = null)),
			(e.updatedAt = t + 1),
			te(f)
		);
	} finally {
		(p = l), (a = i);
	}
	(!e.updatedAt || e.updatedAt <= t) &&
		(e.updatedAt != null && "observers" in e ? Q(e, s) : (e.value = s),
		(e.updatedAt = t));
}
function X(e, n, t, s = A, i) {
	const l = {
		fn: e,
		state: s,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: n,
		owner: a,
		context: a ? a.context : null,
		pure: t,
	};
	return (
		a === null ||
			(a !== K && (a.owned ? a.owned.push(l) : (a.owned = [l]))),
		l
	);
}
function Z(e) {
	if (e.state === 0) return;
	if (e.state === $) return L(e);
	if (e.suspense && N(e.suspense.inFallback))
		return e.suspense.effects.push(e);
	const n = [e];
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < O); )
		e.state && n.push(e);
	for (let t = n.length - 1; t >= 0; t--)
		if (((e = n[t]), e.state === A)) R(e);
		else if (e.state === $) {
			const s = g;
			(g = null), F(() => L(e, n[0]), !1), (g = s);
		}
}
function F(e, n) {
	if (g) return e();
	let t = !1;
	n || (g = []), b ? (t = !0) : (b = []), O++;
	try {
		const s = e();
		return ye(t), s;
	} catch (s) {
		t || (b = null), (g = null), te(s);
	}
}
function ye(e) {
	if ((g && (z(g), (g = null)), e)) return;
	const n = b;
	(b = null), n.length && F(() => re(n), !1);
}
function z(e) {
	for (let n = 0; n < e.length; n++) Z(e[n]);
}
function L(e, n) {
	e.state = 0;
	for (let t = 0; t < e.sources.length; t += 1) {
		const s = e.sources[t];
		if (s.sources) {
			const i = s.state;
			i === A
				? s !== n && (!s.updatedAt || s.updatedAt < O) && Z(s)
				: i === $ && L(s, n);
		}
	}
}
function ee(e) {
	for (let n = 0; n < e.observers.length; n += 1) {
		const t = e.observers[n];
		t.state ||
			((t.state = $),
			t.pure ? g.push(t) : b.push(t),
			t.observers && ee(t));
	}
}
function _(e) {
	let n;
	if (e.sources)
		for (; e.sources.length; ) {
			const t = e.sources.pop(),
				s = e.sourceSlots.pop(),
				i = t.observers;
			if (i && i.length) {
				const l = i.pop(),
					f = t.observerSlots.pop();
				s < i.length &&
					((l.sourceSlots[f] = s),
					(i[s] = l),
					(t.observerSlots[s] = f));
			}
		}
	if (e.owned) {
		for (n = e.owned.length - 1; n >= 0; n--) _(e.owned[n]);
		e.owned = null;
	}
	if (e.cleanups) {
		for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
		e.cleanups = null;
	}
	e.state = 0;
}
function xe(e) {
	return e instanceof Error
		? e
		: new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function te(e, n = a) {
	throw xe(e);
}
function j(e) {
	if (typeof e == "function" && !e.length) return j(e());
	if (Array.isArray(e)) {
		const n = [];
		for (let t = 0; t < e.length; t++) {
			const s = j(e[t]);
			Array.isArray(s) ? n.push.apply(n, s) : n.push(s);
		}
		return n;
	}
	return e;
}
function be(e, n) {
	return function (s) {
		let i;
		return (
			I(
				() =>
					(i = N(
						() => (
							(a.context = { ...a.context, [e]: s.value }),
							he(() => s.children)
						),
					)),
				void 0,
			),
			i
		);
	};
}
let ne = !1;
function we() {
	ne = !0;
}
function q(e, n) {
	if (ne && c.context) {
		const t = c.context;
		E(le());
		const s = N(() => e(n || {}));
		return E(t), s;
	}
	return N(() => e(n || {}));
}
const Ae = G();
function Se(e) {
	let n = 0,
		t,
		s,
		i,
		l,
		f;
	const [o, r] = M(!1),
		h = pe(),
		u = {
			increment: () => {
				++n === 1 && r(!0);
			},
			decrement: () => {
				--n === 0 && r(!1);
			},
			inFallback: o,
			effects: [],
			resolved: !1,
		},
		y = ce();
	if (c.context && c.load) {
		const x = c.context.id + c.context.count;
		let S = c.load(x);
		if (
			(S &&
				(typeof S != "object" || S.status !== "success"
					? (i = S)
					: c.gather(x)),
			i && i !== "$$f")
		) {
			const [k, T] = M(void 0, { equals: !1 });
			(l = k),
				i.then(
					() => {
						if (c.done) return T();
						c.gather(x), E(s), T(), E();
					},
					(P) => {
						(f = P), T();
					},
				);
		}
	}
	const w = de(Ae);
	w && (t = w.register(u.inFallback));
	let d;
	return (
		ue(() => d && d()),
		q(h.Provider, {
			value: u,
			get children() {
				return v(() => {
					if (f) throw f;
					if (((s = c.context), l)) return l(), (l = void 0);
					s && i === "$$f" && E();
					const x = v(() => e.children);
					return v((S) => {
						const k = u.inFallback(),
							{ showContent: T = !0, showFallback: P = !0 } = t
								? t()
								: {};
						if ((!k || (i && i !== "$$f")) && T)
							return (
								(u.resolved = !0),
								d && d(),
								(d = s = i = void 0),
								ae(u.effects),
								x()
							);
						if (P)
							return d
								? S
								: V(
										(ie) => (
											(d = ie),
											s &&
												(E({
													id: s.id + "f",
													count: 0,
												}),
												(s = void 0)),
											e.fallback
										),
										y,
									);
					});
				});
			},
		})
	);
}
function Ce(e, n, t) {
	let s = t.length,
		i = n.length,
		l = s,
		f = 0,
		o = 0,
		r = n[i - 1].nextSibling,
		h = null;
	for (; f < i || o < l; ) {
		if (n[f] === t[o]) {
			f++, o++;
			continue;
		}
		for (; n[i - 1] === t[l - 1]; ) i--, l--;
		if (i === f) {
			const u = l < s ? (o ? t[o - 1].nextSibling : t[l - o]) : r;
			for (; o < l; ) e.insertBefore(t[o++], u);
		} else if (l === o)
			for (; f < i; ) (!h || !h.has(n[f])) && n[f].remove(), f++;
		else if (n[f] === t[l - 1] && t[o] === n[i - 1]) {
			const u = n[--i].nextSibling;
			e.insertBefore(t[o++], n[f++].nextSibling),
				e.insertBefore(t[--l], u),
				(n[i] = t[l]);
		} else {
			if (!h) {
				h = new Map();
				let y = o;
				for (; y < l; ) h.set(t[y], y++);
			}
			const u = h.get(n[f]);
			if (u != null)
				if (o < u && u < l) {
					let y = f,
						w = 1,
						d;
					for (
						;
						++y < i &&
						y < l &&
						!((d = h.get(n[y])) == null || d !== u + w);
					)
						w++;
					if (w > u - o) {
						const x = n[f];
						for (; o < u; ) e.insertBefore(t[o++], x);
					} else e.replaceChild(t[o++], n[f++]);
				} else f++;
			else n[f++].remove();
		}
	}
}
function se(e, n, t, s = {}) {
	let i;
	return (
		V((l) => {
			(i = l),
				n === document
					? e()
					: Ee(n, e(), n.firstChild ? null : void 0, t);
		}, s.owner),
		() => {
			i(), (n.textContent = "");
		}
	);
}
function Ee(e, n, t, s) {
	if ((t !== void 0 && !s && (s = []), typeof n != "function"))
		return H(e, n, s, t);
	I((i) => H(e, n(), i, t), s);
}
function Te(e, n, t = {}) {
	(c.completed = globalThis._$HY.completed),
		(c.events = globalThis._$HY.events),
		(c.load = (i) => globalThis._$HY.r[i]),
		(c.has = (i) => i in globalThis._$HY.r),
		(c.gather = (i) => Y(n, i)),
		(c.registry = new Map()),
		(c.context = { id: t.renderId || "", count: 0 }),
		Y(n, t.renderId);
	const s = se(e, n, [...n.childNodes], t);
	return (c.context = null), s;
}
function H(e, n, t, s, i) {
	const l = !!c.context && e.isConnected;
	if (l) {
		!t && (t = [...e.childNodes]);
		let r = [];
		for (let h = 0; h < t.length; h++) {
			const u = t[h];
			u.nodeType === 8 && u.data.slice(0, 2) === "!$"
				? u.remove()
				: r.push(u);
		}
		t = r;
	}
	for (; typeof t == "function"; ) t = t();
	if (n === t) return t;
	const f = typeof n,
		o = s !== void 0;
	if (
		((e = (o && t[0] && t[0].parentNode) || e),
		f === "string" || f === "number")
	) {
		if (l || (f === "number" && ((n = n.toString()), n === t))) return t;
		if (o) {
			let r = t[0];
			r && r.nodeType === 3
				? r.data !== n && (r.data = n)
				: (r = document.createTextNode(n)),
				(t = C(e, t, s, r));
		} else
			t !== "" && typeof t == "string"
				? (t = e.firstChild.data = n)
				: (t = e.textContent = n);
	} else if (n == null || f === "boolean") {
		if (l) return t;
		t = C(e, t, s);
	} else {
		if (f === "function")
			return (
				I(() => {
					let r = n();
					for (; typeof r == "function"; ) r = r();
					t = H(e, r, t, s);
				}),
				() => t
			);
		if (Array.isArray(n)) {
			const r = [],
				h = t && Array.isArray(t);
			if (U(r, n, t, i)) return I(() => (t = H(e, r, t, s, !0))), () => t;
			if (l) {
				if (!r.length) return t;
				if (s === void 0) return [...e.childNodes];
				let u = r[0],
					y = [u];
				for (; (u = u.nextSibling) !== s; ) y.push(u);
				return (t = y);
			}
			if (r.length === 0) {
				if (((t = C(e, t, s)), o)) return t;
			} else
				h
					? t.length === 0
						? W(e, r, s)
						: Ce(e, t, r)
					: (t && C(e), W(e, r));
			t = r;
		} else if (n.nodeType) {
			if (l && n.parentNode) return (t = o ? [n] : n);
			if (Array.isArray(t)) {
				if (o) return (t = C(e, t, s, n));
				C(e, t, null, n);
			} else
				t == null || t === "" || !e.firstChild
					? e.appendChild(n)
					: e.replaceChild(n, e.firstChild);
			t = n;
		}
	}
	return t;
}
function U(e, n, t, s) {
	let i = !1;
	for (let l = 0, f = n.length; l < f; l++) {
		let o = n[l],
			r = t && t[e.length],
			h;
		if (!(o == null || o === !0 || o === !1))
			if ((h = typeof o) == "object" && o.nodeType) e.push(o);
			else if (Array.isArray(o)) i = U(e, o, r) || i;
			else if (h === "function")
				if (s) {
					for (; typeof o == "function"; ) o = o();
					i =
						U(
							e,
							Array.isArray(o) ? o : [o],
							Array.isArray(r) ? r : [r],
						) || i;
				} else e.push(o), (i = !0);
			else {
				const u = String(o);
				r && r.nodeType === 3 && r.data === u
					? e.push(r)
					: e.push(document.createTextNode(u));
			}
	}
	return i;
}
function W(e, n, t = null) {
	for (let s = 0, i = n.length; s < i; s++) e.insertBefore(n[s], t);
}
function C(e, n, t, s) {
	if (t === void 0) return (e.textContent = "");
	const i = s || document.createTextNode("");
	if (n.length) {
		let l = !1;
		for (let f = n.length - 1; f >= 0; f--) {
			const o = n[f];
			if (i !== o) {
				const r = o.parentNode === e;
				!l && !f
					? r
						? e.replaceChild(i, o)
						: e.insertBefore(i, t)
					: r && o.remove();
			} else l = !0;
		}
	} else e.insertBefore(i, t);
	return [i];
}
function Y(e, n) {
	const t = e.querySelectorAll("*[data-hk]");
	for (let s = 0; s < t.length; s++) {
		const i = t[s],
			l = i.getAttribute("data-hk");
		(!n || l.startsWith(n)) && !c.registry.has(l) && c.registry.set(l, i);
	}
}
const ve = (...e) => (we(), Te(...e));
var Ne =
	(e) =>
	(n, t, s, { client: i }) => {
		if (!e.hasAttribute("ssr")) return;
		const l = i !== "only",
			f = l ? ve : se;
		let o,
			r = {};
		if (Object.keys(s).length > 0) {
			if (i !== "only") {
				const d = document.createTreeWalker(
					e,
					NodeFilter.SHOW_ELEMENT,
					(x) =>
						x === e
							? NodeFilter.FILTER_SKIP
							: x.nodeName === "ASTRO-SLOT"
								? NodeFilter.FILTER_ACCEPT
								: x.nodeName === "ASTRO-ISLAND"
									? NodeFilter.FILTER_REJECT
									: NodeFilter.FILTER_SKIP,
				);
				for (; (o = d.nextNode()); )
					r[o.getAttribute("name") || "default"] = o;
			}
			for (const [d, x] of Object.entries(s))
				r[d] ||
					((r[d] = document.createElement("astro-slot")),
					d !== "default" && r[d].setAttribute("name", d),
					(r[d].innerHTML = x));
		}
		const { default: h, ...u } = r,
			y = e.dataset.solidRenderId,
			w = f(
				() => {
					const d = () => q(n, { ...t, ...u, children: h });
					return l
						? q(Se, {
								get children() {
									return d();
								},
							})
						: d();
				},
				e,
				{ renderId: y },
			);
		e.addEventListener("astro:unmount", () => w(), { once: !0 });
	};
export { Ne as default };
//# sourceMappingURL=client.CMMtWkl7.js.map
