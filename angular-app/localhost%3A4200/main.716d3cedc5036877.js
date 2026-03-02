"use strict";
(self.webpackChunkangular_app = self.webpackChunkangular_app || []).push([[792], {
    732: () => {
        function J(e) {
            return "function" == typeof e
        }
        function bo(e) {
            const n = e(r => {
                Error.call(r),
                r.stack = (new Error).stack
            }
            );
            return n.prototype = Object.create(Error.prototype),
            n.prototype.constructor = n,
            n
        }
        const ts = bo(e => function(n) {
            e(this),
            this.message = n ? `${n.length} errors occurred during unsubscription:\n${n.map( (r, o) => `${o + 1}) ${r.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = n
        }
        );
        function Io(e, t) {
            if (e) {
                const n = e.indexOf(t);
                0 <= n && e.splice(n, 1)
            }
        }
        class Je {
            constructor(t) {
                this.initialTeardown = t,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
            }
            unsubscribe() {
                let t;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: n} = this;
                    if (n)
                        if (this._parentage = null,
                        Array.isArray(n))
                            for (const i of n)
                                i.remove(this);
                        else
                            n.remove(this);
                    const {initialTeardown: r} = this;
                    if (J(r))
                        try {
                            r()
                        } catch (i) {
                            t = i instanceof ts ? i.errors : [i]
                        }
                    const {_finalizers: o} = this;
                    if (o) {
                        this._finalizers = null;
                        for (const i of o)
                            try {
                                fh(i)
                            } catch (s) {
                                t = t ?? [],
                                s instanceof ts ? t = [...t, ...s.errors] : t.push(s)
                            }
                    }
                    if (t)
                        throw new ts(t)
                }
            }
            add(t) {
                var n;
                if (t && t !== this)
                    if (this.closed)
                        fh(t);
                    else {
                        if (t instanceof Je) {
                            if (t.closed || t._hasParent(this))
                                return;
                            t._addParent(this)
                        }
                        (this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
                    }
            }
            _hasParent(t) {
                const {_parentage: n} = this;
                return n === t || Array.isArray(n) && n.includes(t)
            }
            _addParent(t) {
                const {_parentage: n} = this;
                this._parentage = Array.isArray(n) ? (n.push(t),
                n) : n ? [n, t] : t
            }
            _removeParent(t) {
                const {_parentage: n} = this;
                n === t ? this._parentage = null : Array.isArray(n) && Io(n, t)
            }
            remove(t) {
                const {_finalizers: n} = this;
                n && Io(n, t),
                t instanceof Je && t._removeParent(this)
            }
        }
        Je.EMPTY = ( () => {
            const e = new Je;
            return e.closed = !0,
            e
        }
        )();
        const lh = Je.EMPTY;
        function dh(e) {
            return e instanceof Je || e && "closed"in e && J(e.remove) && J(e.add) && J(e.unsubscribe)
        }
        function fh(e) {
            J(e) ? e() : e.unsubscribe()
        }
        const Bn = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }
          , ns = {
            setTimeout(e, t, ...n) {
                const {delegate: r} = ns;
                return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
            },
            clearTimeout(e) {
                const {delegate: t} = ns;
                return (t?.clearTimeout || clearTimeout)(e)
            },
            delegate: void 0
        };
        function hh(e) {
            ns.setTimeout( () => {
                const {onUnhandledError: t} = Bn;
                if (!t)
                    throw e;
                t(e)
            }
            )
        }
        function Au() {}
        const JE = Tu("C", void 0, void 0);
        function Tu(e, t, n) {
            return {
                kind: e,
                value: t,
                error: n
            }
        }
        let Hn = null;
        function rs(e) {
            if (Bn.useDeprecatedSynchronousErrorHandling) {
                const t = !Hn;
                if (t && (Hn = {
                    errorThrown: !1,
                    error: null
                }),
                e(),
                t) {
                    const {errorThrown: n, error: r} = Hn;
                    if (Hn = null,
                    n)
                        throw r
                }
            } else
                e()
        }
        class Nu extends Je {
            constructor(t) {
                super(),
                this.isStopped = !1,
                t ? (this.destination = t,
                dh(t) && t.add(this)) : this.destination = ib
            }
            static create(t, n, r) {
                return new Mo(t,n,r)
            }
            next(t) {
                this.isStopped ? xu(function eb(e) {
                    return Tu("N", e, void 0)
                }(t), this) : this._next(t)
            }
            error(t) {
                this.isStopped ? xu(function KE(e) {
                    return Tu("E", void 0, e)
                }(t), this) : (this.isStopped = !0,
                this._error(t))
            }
            complete() {
                this.isStopped ? xu(JE, this) : (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe(),
                this.destination = null)
            }
            _next(t) {
                this.destination.next(t)
            }
            _error(t) {
                try {
                    this.destination.error(t)
                } finally {
                    this.unsubscribe()
                }
            }
            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }
        const nb = Function.prototype.bind;
        function Ru(e, t) {
            return nb.call(e, t)
        }
        class rb {
            constructor(t) {
                this.partialObserver = t
            }
            next(t) {
                const {partialObserver: n} = this;
                if (n.next)
                    try {
                        n.next(t)
                    } catch (r) {
                        os(r)
                    }
            }
            error(t) {
                const {partialObserver: n} = this;
                if (n.error)
                    try {
                        n.error(t)
                    } catch (r) {
                        os(r)
                    }
                else
                    os(t)
            }
            complete() {
                const {partialObserver: t} = this;
                if (t.complete)
                    try {
                        t.complete()
                    } catch (n) {
                        os(n)
                    }
            }
        }
        class Mo extends Nu {
            constructor(t, n, r) {
                let o;
                if (super(),
                J(t) || !t)
                    o = {
                        next: t ?? void 0,
                        error: n ?? void 0,
                        complete: r ?? void 0
                    };
                else {
                    let i;
                    this && Bn.useDeprecatedNextContext ? (i = Object.create(t),
                    i.unsubscribe = () => this.unsubscribe(),
                    o = {
                        next: t.next && Ru(t.next, i),
                        error: t.error && Ru(t.error, i),
                        complete: t.complete && Ru(t.complete, i)
                    }) : o = t
                }
                this.destination = new rb(o)
            }
        }
        function os(e) {
            Bn.useDeprecatedSynchronousErrorHandling ? function tb(e) {
                Bn.useDeprecatedSynchronousErrorHandling && Hn && (Hn.errorThrown = !0,
                Hn.error = e)
            }(e) : hh(e)
        }
        function xu(e, t) {
            const {onStoppedNotification: n} = Bn;
            n && ns.setTimeout( () => n(e, t))
        }
        const ib = {
            closed: !0,
            next: Au,
            error: function ob(e) {
                throw e
            },
            complete: Au
        }
          , Ou = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function Dn(e) {
            return e
        }
        function ph(e) {
            return 0 === e.length ? Dn : 1 === e.length ? e[0] : function(n) {
                return e.reduce( (r, o) => o(r), n)
            }
        }
        let fe = ( () => {
            class e {
                constructor(n) {
                    n && (this._subscribe = n)
                }
                lift(n) {
                    const r = new e;
                    return r.source = this,
                    r.operator = n,
                    r
                }
                subscribe(n, r, o) {
                    const i = function ub(e) {
                        return e && e instanceof Nu || function ab(e) {
                            return e && J(e.next) && J(e.error) && J(e.complete)
                        }(e) && dh(e)
                    }(n) ? n : new Mo(n,r,o);
                    return rs( () => {
                        const {operator: s, source: a} = this;
                        i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                    }
                    ),
                    i
                }
                _trySubscribe(n) {
                    try {
                        return this._subscribe(n)
                    } catch (r) {
                        n.error(r)
                    }
                }
                forEach(n, r) {
                    return new (r = gh(r))( (o, i) => {
                        const s = new Mo({
                            next: a => {
                                try {
                                    n(a)
                                } catch (u) {
                                    i(u),
                                    s.unsubscribe()
                                }
                            }
                            ,
                            error: i,
                            complete: o
                        });
                        this.subscribe(s)
                    }
                    )
                }
                _subscribe(n) {
                    var r;
                    return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n)
                }
                [Ou]() {
                    return this
                }
                pipe(...n) {
                    return ph(n)(this)
                }
                toPromise(n) {
                    return new (n = gh(n))( (r, o) => {
                        let i;
                        this.subscribe(s => i = s, s => o(s), () => r(i))
                    }
                    )
                }
            }
            return e.create = t => new e(t),
            e
        }
        )();
        function gh(e) {
            var t;
            return null !== (t = e ?? Bn.Promise) && void 0 !== t ? t : Promise
        }
        const cb = bo(e => function() {
            e(this),
            this.name = "ObjectUnsubscribedError",
            this.message = "object unsubscribed"
        }
        );
        let Et = ( () => {
            class e extends fe {
                constructor() {
                    super(),
                    this.closed = !1,
                    this.currentObservers = null,
                    this.observers = [],
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                lift(n) {
                    const r = new mh(this,this);
                    return r.operator = n,
                    r
                }
                _throwIfClosed() {
                    if (this.closed)
                        throw new cb
                }
                next(n) {
                    rs( () => {
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const r of this.currentObservers)
                                r.next(n)
                        }
                    }
                    )
                }
                error(n) {
                    rs( () => {
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.hasError = this.isStopped = !0,
                            this.thrownError = n;
                            const {observers: r} = this;
                            for (; r.length; )
                                r.shift().error(n)
                        }
                    }
                    )
                }
                complete() {
                    rs( () => {
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: n} = this;
                            for (; n.length; )
                                n.shift().complete()
                        }
                    }
                    )
                }
                unsubscribe() {
                    this.isStopped = this.closed = !0,
                    this.observers = this.currentObservers = null
                }
                get observed() {
                    var n;
                    return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
                }
                _trySubscribe(n) {
                    return this._throwIfClosed(),
                    super._trySubscribe(n)
                }
                _subscribe(n) {
                    return this._throwIfClosed(),
                    this._checkFinalizedStatuses(n),
                    this._innerSubscribe(n)
                }
                _innerSubscribe(n) {
                    const {hasError: r, isStopped: o, observers: i} = this;
                    return r || o ? lh : (this.currentObservers = null,
                    i.push(n),
                    new Je( () => {
                        this.currentObservers = null,
                        Io(i, n)
                    }
                    ))
                }
                _checkFinalizedStatuses(n) {
                    const {hasError: r, thrownError: o, isStopped: i} = this;
                    r ? n.error(o) : i && n.complete()
                }
                asObservable() {
                    const n = new fe;
                    return n.source = this,
                    n
                }
            }
            return e.create = (t, n) => new mh(t,n),
            e
        }
        )();
        class mh extends Et {
            constructor(t, n) {
                super(),
                this.destination = t,
                this.source = n
            }
            next(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, t)
            }
            error(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, t)
            }
            complete() {
                var t, n;
                null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === n || n.call(t)
            }
            _subscribe(t) {
                var n, r;
                return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) && void 0 !== r ? r : lh
            }
        }
        function yh(e) {
            return J(e?.lift)
        }
        function ve(e) {
            return t => {
                if (yh(t))
                    return t.lift(function(n) {
                        try {
                            return e(n, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }
        function me(e, t, n, r, o) {
            return new lb(e,t,n,r,o)
        }
        class lb extends Nu {
            constructor(t, n, r, o, i, s) {
                super(t),
                this.onFinalize = i,
                this.shouldUnsubscribe = s,
                this._next = n ? function(a) {
                    try {
                        n(a)
                    } catch (u) {
                        t.error(u)
                    }
                }
                : super._next,
                this._error = o ? function(a) {
                    try {
                        o(a)
                    } catch (u) {
                        t.error(u)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._error,
                this._complete = r ? function() {
                    try {
                        r()
                    } catch (a) {
                        t.error(a)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._complete
            }
            unsubscribe() {
                var t;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: n} = this;
                    super.unsubscribe(),
                    !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
                }
            }
        }
        function G(e, t) {
            return ve( (n, r) => {
                let o = 0;
                n.subscribe(me(r, i => {
                    r.next(e.call(t, i, o++))
                }
                ))
            }
            )
        }
        function Cn(e) {
            return this instanceof Cn ? (this.v = e,
            this) : new Cn(e)
        }
        function wh(e) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var n, t = e[Symbol.asyncIterator];
            return t ? t.call(e) : (e = function Lu(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(e),
            n = {},
            r("next"),
            r("throw"),
            r("return"),
            n[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            n);
            function r(i) {
                n[i] = e[i] && function(s) {
                    return new Promise(function(a, u) {
                        !function o(i, s, a, u) {
                            Promise.resolve(u).then(function(c) {
                                i({
                                    value: c,
                                    done: a
                                })
                            }, s)
                        }(a, u, (s = e[i](s)).done, s.value)
                    }
                    )
                }
            }
        }
        "function" == typeof SuppressedError && SuppressedError;
        const _h = e => e && "number" == typeof e.length && "function" != typeof e;
        function Eh(e) {
            return J(e?.then)
        }
        function bh(e) {
            return J(e[Ou])
        }
        function Ih(e) {
            return Symbol.asyncIterator && J(e?.[Symbol.asyncIterator])
        }
        function Mh(e) {
            return new TypeError(`You provided ${null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }
        const Sh = function Lb() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }();
        function Ah(e) {
            return J(e?.[Sh])
        }
        function Th(e) {
            return function Ch(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var o, r = n.apply(e, t || []), i = [];
                return o = Object.create(("function" == typeof AsyncIterator ? AsyncIterator : Object).prototype),
                a("next"),
                a("throw"),
                a("return", function s(h) {
                    return function(p) {
                        return Promise.resolve(p).then(h, d)
                    }
                }),
                o[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                o;
                function a(h, p) {
                    r[h] && (o[h] = function(g) {
                        return new Promise(function(y, D) {
                            i.push([h, g, y, D]) > 1 || u(h, g)
                        }
                        )
                    }
                    ,
                    p && (o[h] = p(o[h])))
                }
                function u(h, p) {
                    try {
                        !function c(h) {
                            h.value instanceof Cn ? Promise.resolve(h.value.v).then(l, d) : f(i[0][2], h)
                        }(r[h](p))
                    } catch (g) {
                        f(i[0][3], g)
                    }
                }
                function l(h) {
                    u("next", h)
                }
                function d(h) {
                    u("throw", h)
                }
                function f(h, p) {
                    h(p),
                    i.shift(),
                    i.length && u(i[0][0], i[0][1])
                }
            }(this, arguments, function*() {
                const n = e.getReader();
                try {
                    for (; ; ) {
                        const {value: r, done: o} = yield Cn(n.read());
                        if (o)
                            return yield Cn(void 0);
                        yield yield Cn(r)
                    }
                } finally {
                    n.releaseLock()
                }
            })
        }
        function Nh(e) {
            return J(e?.getReader)
        }
        function Ke(e) {
            if (e instanceof fe)
                return e;
            if (null != e) {
                if (bh(e))
                    return function Vb(e) {
                        return new fe(t => {
                            const n = e[Ou]();
                            if (J(n.subscribe))
                                return n.subscribe(t);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        }
                        )
                    }(e);
                if (_h(e))
                    return function jb(e) {
                        return new fe(t => {
                            for (let n = 0; n < e.length && !t.closed; n++)
                                t.next(e[n]);
                            t.complete()
                        }
                        )
                    }(e);
                if (Eh(e))
                    return function Bb(e) {
                        return new fe(t => {
                            e.then(n => {
                                t.closed || (t.next(n),
                                t.complete())
                            }
                            , n => t.error(n)).then(null, hh)
                        }
                        )
                    }(e);
                if (Ih(e))
                    return Rh(e);
                if (Ah(e))
                    return function Hb(e) {
                        return new fe(t => {
                            for (const n of e)
                                if (t.next(n),
                                t.closed)
                                    return;
                            t.complete()
                        }
                        )
                    }(e);
                if (Nh(e))
                    return function $b(e) {
                        return Rh(Th(e))
                    }(e)
            }
            throw Mh(e)
        }
        function Rh(e) {
            return new fe(t => {
                (function Ub(e, t) {
                    var n, r, o, i;
                    return function vh(e, t, n, r) {
                        return new (n || (n = Promise))(function(i, s) {
                            function a(l) {
                                try {
                                    c(r.next(l))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function u(l) {
                                try {
                                    c(r.throw(l))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function c(l) {
                                l.done ? i(l.value) : function o(i) {
                                    return i instanceof n ? i : new n(function(s) {
                                        s(i)
                                    }
                                    )
                                }(l.value).then(a, u)
                            }
                            c((r = r.apply(e, t || [])).next())
                        }
                        )
                    }(this, void 0, void 0, function*() {
                        try {
                            for (n = wh(e); !(r = yield n.next()).done; )
                                if (t.next(r.value),
                                t.closed)
                                    return
                        } catch (s) {
                            o = {
                                error: s
                            }
                        } finally {
                            try {
                                r && !r.done && (i = n.return) && (yield i.call(n))
                            } finally {
                                if (o)
                                    throw o.error
                            }
                        }
                        t.complete()
                    })
                }
                )(e, t).catch(n => t.error(n))
            }
            )
        }
        function Jt(e, t, n, r=0, o=!1) {
            const i = t.schedule(function() {
                n(),
                o ? e.add(this.schedule(null, r)) : this.unsubscribe()
            }, r);
            if (e.add(i),
            !o)
                return i
        }
        function be(e, t, n=1 / 0) {
            return J(t) ? be( (r, o) => G( (i, s) => t(r, i, o, s))(Ke(e(r, o))), n) : ("number" == typeof t && (n = t),
            ve( (r, o) => function zb(e, t, n, r, o, i, s, a) {
                const u = [];
                let c = 0
                  , l = 0
                  , d = !1;
                const f = () => {
                    d && !u.length && !c && t.complete()
                }
                  , h = g => c < r ? p(g) : u.push(g)
                  , p = g => {
                    i && t.next(g),
                    c++;
                    let y = !1;
                    Ke(n(g, l++)).subscribe(me(t, D => {
                        o?.(D),
                        i ? h(D) : t.next(D)
                    }
                    , () => {
                        y = !0
                    }
                    , void 0, () => {
                        if (y)
                            try {
                                for (c--; u.length && c < r; ) {
                                    const D = u.shift();
                                    s ? Jt(t, s, () => p(D)) : p(D)
                                }
                                f()
                            } catch (D) {
                                t.error(D)
                            }
                    }
                    ))
                }
                ;
                return e.subscribe(me(t, h, () => {
                    d = !0,
                    f()
                }
                )),
                () => {
                    a?.()
                }
            }(r, o, e, n)))
        }
        function lr(e=1 / 0) {
            return be(Dn, e)
        }
        const kt = new fe(e => e.complete());
        function ju(e) {
            return e[e.length - 1]
        }
        function So(e) {
            return function qb(e) {
                return e && J(e.schedule)
            }(ju(e)) ? e.pop() : void 0
        }
        function Oh(e, t=0) {
            return ve( (n, r) => {
                n.subscribe(me(r, o => Jt(r, e, () => r.next(o), t), () => Jt(r, e, () => r.complete(), t), o => Jt(r, e, () => r.error(o), t)))
            }
            )
        }
        function Ph(e, t=0) {
            return ve( (n, r) => {
                r.add(e.schedule( () => n.subscribe(r), t))
            }
            )
        }
        function Fh(e, t) {
            if (!e)
                throw new Error("Iterable cannot be null");
            return new fe(n => {
                Jt(n, t, () => {
                    const r = e[Symbol.asyncIterator]();
                    Jt(n, t, () => {
                        r.next().then(o => {
                            o.done ? n.complete() : n.next(o.value)
                        }
                        )
                    }
                    , 0, !0)
                }
                )
            }
            )
        }
        function De(e, t) {
            return t ? function Kb(e, t) {
                if (null != e) {
                    if (bh(e))
                        return function Zb(e, t) {
                            return Ke(e).pipe(Ph(t), Oh(t))
                        }(e, t);
                    if (_h(e))
                        return function Qb(e, t) {
                            return new fe(n => {
                                let r = 0;
                                return t.schedule(function() {
                                    r === e.length ? n.complete() : (n.next(e[r++]),
                                    n.closed || this.schedule())
                                })
                            }
                            )
                        }(e, t);
                    if (Eh(e))
                        return function Yb(e, t) {
                            return Ke(e).pipe(Ph(t), Oh(t))
                        }(e, t);
                    if (Ih(e))
                        return Fh(e, t);
                    if (Ah(e))
                        return function Xb(e, t) {
                            return new fe(n => {
                                let r;
                                return Jt(n, t, () => {
                                    r = e[Sh](),
                                    Jt(n, t, () => {
                                        let o, i;
                                        try {
                                            ({value: o, done: i} = r.next())
                                        } catch (s) {
                                            return void n.error(s)
                                        }
                                        i ? n.complete() : n.next(o)
                                    }
                                    , 0, !0)
                                }
                                ),
                                () => J(r?.return) && r.return()
                            }
                            )
                        }(e, t);
                    if (Nh(e))
                        return function Jb(e, t) {
                            return Fh(Th(e), t)
                        }(e, t)
                }
                throw Mh(e)
            }(e, t) : Ke(e)
        }
        class ht extends Et {
            constructor(t) {
                super(),
                this._value = t
            }
            get value() {
                return this.getValue()
            }
            _subscribe(t) {
                const n = super._subscribe(t);
                return !n.closed && t.next(this._value),
                n
            }
            getValue() {
                const {hasError: t, thrownError: n, _value: r} = this;
                if (t)
                    throw n;
                return this._throwIfClosed(),
                r
            }
            next(t) {
                super.next(this._value = t)
            }
        }
        function T(...e) {
            return De(e, So(e))
        }
        function kh(e={}) {
            const {connector: t=( () => new Et), resetOnError: n=!0, resetOnComplete: r=!0, resetOnRefCountZero: o=!0} = e;
            return i => {
                let s, a, u, c = 0, l = !1, d = !1;
                const f = () => {
                    a?.unsubscribe(),
                    a = void 0
                }
                  , h = () => {
                    f(),
                    s = u = void 0,
                    l = d = !1
                }
                  , p = () => {
                    const g = s;
                    h(),
                    g?.unsubscribe()
                }
                ;
                return ve( (g, y) => {
                    c++,
                    !d && !l && f();
                    const D = u = u ?? t();
                    y.add( () => {
                        c--,
                        0 === c && !d && !l && (a = Bu(p, o))
                    }
                    ),
                    D.subscribe(y),
                    !s && c > 0 && (s = new Mo({
                        next: m => D.next(m),
                        error: m => {
                            d = !0,
                            f(),
                            a = Bu(h, n, m),
                            D.error(m)
                        }
                        ,
                        complete: () => {
                            l = !0,
                            f(),
                            a = Bu(h, r),
                            D.complete()
                        }
                    }),
                    Ke(g).subscribe(s))
                }
                )(i)
            }
        }
        function Bu(e, t, ...n) {
            if (!0 === t)
                return void e();
            if (!1 === t)
                return;
            const r = new Mo({
                next: () => {
                    r.unsubscribe(),
                    e()
                }
            });
            return Ke(t(...n)).subscribe(r)
        }
        function bt(e, t) {
            return ve( (n, r) => {
                let o = null
                  , i = 0
                  , s = !1;
                const a = () => s && !o && r.complete();
                n.subscribe(me(r, u => {
                    o?.unsubscribe();
                    let c = 0;
                    const l = i++;
                    Ke(e(u, l)).subscribe(o = me(r, d => r.next(t ? t(u, d, l, c++) : d), () => {
                        o = null,
                        a()
                    }
                    ))
                }
                , () => {
                    s = !0,
                    a()
                }
                ))
            }
            )
        }
        function nI(e, t) {
            return e === t
        }
        function Y(e) {
            for (let t in e)
                if (e[t] === Y)
                    return t;
            throw Error("Could not find renamed property on target object.")
        }
        function Ce(e) {
            if ("string" == typeof e)
                return e;
            if (Array.isArray(e))
                return "[" + e.map(Ce).join(", ") + "]";
            if (null == e)
                return "" + e;
            if (e.overriddenName)
                return `${e.overriddenName}`;
            if (e.name)
                return `${e.name}`;
            const t = e.toString();
            if (null == t)
                return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }
        function Hu(e, t) {
            return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
        }
        const rI = Y({
            __forward_ref__: Y
        });
        function ee(e) {
            return e.__forward_ref__ = ee,
            e.toString = function() {
                return Ce(this())
            }
            ,
            e
        }
        function x(e) {
            return $u(e) ? e() : e
        }
        function $u(e) {
            return "function" == typeof e && e.hasOwnProperty(rI) && e.__forward_ref__ === ee
        }
        function Uu(e) {
            return e && !!e.\u0275providers
        }
        class C extends Error {
            constructor(t, n) {
                super(function ss(e, t) {
                    return `NG0${Math.abs(e)}${t ? ": " + t : ""}`
                }(t, n)),
                this.code = t
            }
        }
        function P(e) {
            return "string" == typeof e ? e : null == e ? "" : String(e)
        }
        function zu(e, t) {
            throw new C(-201,!1)
        }
        function pt(e, t) {
            null == e && function N(e, t, n, r) {
                throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
            }(t, e, null, "!=")
        }
        function S(e) {
            return {
                token: e.token,
                providedIn: e.providedIn || null,
                factory: e.factory,
                value: void 0
            }
        }
        function gt(e) {
            return {
                providers: e.providers || [],
                imports: e.imports || []
            }
        }
        function as(e) {
            return Vh(e, cs) || Vh(e, jh)
        }
        function Vh(e, t) {
            return e.hasOwnProperty(t) ? e[t] : null
        }
        function us(e) {
            return e && (e.hasOwnProperty(Gu) || e.hasOwnProperty(dI)) ? e[Gu] : null
        }
        const cs = Y({
            \u0275prov: Y
        })
          , Gu = Y({
            \u0275inj: Y
        })
          , jh = Y({
            ngInjectableDef: Y
        })
          , dI = Y({
            ngInjectorDef: Y
        });
        var B = function(e) {
            return e[e.Default = 0] = "Default",
            e[e.Host = 1] = "Host",
            e[e.Self = 2] = "Self",
            e[e.SkipSelf = 4] = "SkipSelf",
            e[e.Optional = 8] = "Optional",
            e
        }(B || {});
        let qu;
        function ze(e) {
            const t = qu;
            return qu = e,
            t
        }
        function Hh(e, t, n) {
            const r = as(e);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & B.Optional ? null : void 0 !== t ? t : void zu(Ce(e))
        }
        const te = globalThis;
        class I {
            constructor(t, n) {
                this._desc = t,
                this.ngMetadataName = "InjectionToken",
                this.\u0275prov = void 0,
                "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = S({
                    token: this,
                    providedIn: n.providedIn || "root",
                    factory: n.factory
                }))
            }
            get multi() {
                return this
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        const Ao = {}
          , Xu = "__NG_DI_FLAG__"
          , ls = "ngTempTokenPath"
          , pI = /\n/gm
          , Uh = "__source";
        let dr;
        function wn(e) {
            const t = dr;
            return dr = e,
            t
        }
        function yI(e, t=B.Default) {
            if (void 0 === dr)
                throw new C(-203,!1);
            return null === dr ? Hh(e, void 0, t) : dr.get(e, t & B.Optional ? null : void 0, t)
        }
        function M(e, t=B.Default) {
            return (function Bh() {
                return qu
            }() || yI)(x(e), t)
        }
        function E(e, t=B.Default) {
            return M(e, ds(t))
        }
        function ds(e) {
            return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
        }
        function Ju(e) {
            const t = [];
            for (let n = 0; n < e.length; n++) {
                const r = x(e[n]);
                if (Array.isArray(r)) {
                    if (0 === r.length)
                        throw new C(900,!1);
                    let o, i = B.Default;
                    for (let s = 0; s < r.length; s++) {
                        const a = r[s]
                          , u = vI(a);
                        "number" == typeof u ? -1 === u ? o = a.token : i |= u : o = a
                    }
                    t.push(M(o, i))
                } else
                    t.push(M(r))
            }
            return t
        }
        function To(e, t) {
            return e[Xu] = t,
            e.prototype[Xu] = t,
            e
        }
        function vI(e) {
            return e[Xu]
        }
        function Kt(e) {
            return {
                toString: e
            }.toString()
        }
        var fs = function(e) {
            return e[e.OnPush = 0] = "OnPush",
            e[e.Default = 1] = "Default",
            e
        }(fs || {})
          , It = function(e) {
            return e[e.Emulated = 0] = "Emulated",
            e[e.None = 2] = "None",
            e[e.ShadowDom = 3] = "ShadowDom",
            e
        }(It || {});
        const Lt = {}
          , z = []
          , hs = Y({
            \u0275cmp: Y
        })
          , Ku = Y({
            \u0275dir: Y
        })
          , ec = Y({
            \u0275pipe: Y
        })
          , Gh = Y({
            \u0275mod: Y
        })
          , en = Y({
            \u0275fac: Y
        })
          , No = Y({
            __NG_ELEMENT_ID__: Y
        })
          , qh = Y({
            __NG_ENV_ID__: Y
        });
        function Wh(e, t, n) {
            let r = e.length;
            for (; ; ) {
                const o = e.indexOf(t, n);
                if (-1 === o)
                    return o;
                if (0 === o || e.charCodeAt(o - 1) <= 32) {
                    const i = t.length;
                    if (o + i === r || e.charCodeAt(o + i) <= 32)
                        return o
                }
                n = o + 1
            }
        }
        function tc(e, t, n) {
            let r = 0;
            for (; r < n.length; ) {
                const o = n[r];
                if ("number" == typeof o) {
                    if (0 !== o)
                        break;
                    r++;
                    const i = n[r++]
                      , s = n[r++]
                      , a = n[r++];
                    e.setAttribute(t, s, a, i)
                } else {
                    const i = o
                      , s = n[++r];
                    Yh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s),
                    r++
                }
            }
            return r
        }
        function Zh(e) {
            return 3 === e || 4 === e || 6 === e
        }
        function Yh(e) {
            return 64 === e.charCodeAt(0)
        }
        function Ro(e, t) {
            if (null !== t && 0 !== t.length)
                if (null === e || 0 === e.length)
                    e = t.slice();
                else {
                    let n = -1;
                    for (let r = 0; r < t.length; r++) {
                        const o = t[r];
                        "number" == typeof o ? n = o : 0 === n || Qh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
                    }
                }
            return e
        }
        function Qh(e, t, n, r, o) {
            let i = 0
              , s = e.length;
            if (-1 === t)
                s = -1;
            else
                for (; i < e.length; ) {
                    const a = e[i++];
                    if ("number" == typeof a) {
                        if (a === t) {
                            s = -1;
                            break
                        }
                        if (a > t) {
                            s = i - 1;
                            break
                        }
                    }
                }
            for (; i < e.length; ) {
                const a = e[i];
                if ("number" == typeof a)
                    break;
                if (a === n) {
                    if (null === r)
                        return void (null !== o && (e[i + 1] = o));
                    if (r === e[i + 1])
                        return void (e[i + 2] = o)
                }
                i++,
                null !== r && i++,
                null !== o && i++
            }
            -1 !== s && (e.splice(s, 0, t),
            i = s + 1),
            e.splice(i++, 0, n),
            null !== r && e.splice(i++, 0, r),
            null !== o && e.splice(i++, 0, o)
        }
        const Xh = "ng-template";
        function wI(e, t, n) {
            let r = 0
              , o = !0;
            for (; r < e.length; ) {
                let i = e[r++];
                if ("string" == typeof i && o) {
                    const s = e[r++];
                    if (n && "class" === i && -1 !== Wh(s.toLowerCase(), t, 0))
                        return !0
                } else {
                    if (1 === i) {
                        for (; r < e.length && "string" == typeof (i = e[r++]); )
                            if (i.toLowerCase() === t)
                                return !0;
                        return !1
                    }
                    "number" == typeof i && (o = !1)
                }
            }
            return !1
        }
        function Jh(e) {
            return 4 === e.type && e.value !== Xh
        }
        function _I(e, t, n) {
            return t === (4 !== e.type || n ? e.value : Xh)
        }
        function EI(e, t, n) {
            let r = 4;
            const o = e.attrs || []
              , i = function MI(e) {
                for (let t = 0; t < e.length; t++)
                    if (Zh(e[t]))
                        return t;
                return e.length
            }(o);
            let s = !1;
            for (let a = 0; a < t.length; a++) {
                const u = t[a];
                if ("number" != typeof u) {
                    if (!s)
                        if (4 & r) {
                            if (r = 2 | 1 & r,
                            "" !== u && !_I(e, u, n) || "" === u && 1 === t.length) {
                                if (Mt(r))
                                    return !1;
                                s = !0
                            }
                        } else {
                            const c = 8 & r ? u : t[++a];
                            if (8 & r && null !== e.attrs) {
                                if (!wI(e.attrs, c, n)) {
                                    if (Mt(r))
                                        return !1;
                                    s = !0
                                }
                                continue
                            }
                            const d = bI(8 & r ? "class" : u, o, Jh(e), n);
                            if (-1 === d) {
                                if (Mt(r))
                                    return !1;
                                s = !0;
                                continue
                            }
                            if ("" !== c) {
                                let f;
                                f = d > i ? "" : o[d + 1].toLowerCase();
                                const h = 8 & r ? f : null;
                                if (h && -1 !== Wh(h, c, 0) || 2 & r && c !== f) {
                                    if (Mt(r))
                                        return !1;
                                    s = !0
                                }
                            }
                        }
                } else {
                    if (!s && !Mt(r) && !Mt(u))
                        return !1;
                    if (s && Mt(u))
                        continue;
                    s = !1,
                    r = u | 1 & r
                }
            }
            return Mt(r) || s
        }
        function Mt(e) {
            return 0 == (1 & e)
        }
        function bI(e, t, n, r) {
            if (null === t)
                return -1;
            let o = 0;
            if (r || !n) {
                let i = !1;
                for (; o < t.length; ) {
                    const s = t[o];
                    if (s === e)
                        return o;
                    if (3 === s || 6 === s)
                        i = !0;
                    else {
                        if (1 === s || 2 === s) {
                            let a = t[++o];
                            for (; "string" == typeof a; )
                                a = t[++o];
                            continue
                        }
                        if (4 === s)
                            break;
                        if (0 === s) {
                            o += 4;
                            continue
                        }
                    }
                    o += i ? 1 : 2
                }
                return -1
            }
            return function SI(e, t) {
                let n = e.indexOf(4);
                if (n > -1)
                    for (n++; n < e.length; ) {
                        const r = e[n];
                        if ("number" == typeof r)
                            return -1;
                        if (r === t)
                            return n;
                        n++
                    }
                return -1
            }(t, e)
        }
        function Kh(e, t, n=!1) {
            for (let r = 0; r < t.length; r++)
                if (EI(e, t[r], n))
                    return !0;
            return !1
        }
        function ep(e, t) {
            return e ? ":not(" + t.trim() + ")" : t
        }
        function TI(e) {
            let t = e[0]
              , n = 1
              , r = 2
              , o = ""
              , i = !1;
            for (; n < e.length; ) {
                let s = e[n];
                if ("string" == typeof s)
                    if (2 & r) {
                        const a = e[++n];
                        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                    } else
                        8 & r ? o += "." + s : 4 & r && (o += " " + s);
                else
                    "" !== o && !Mt(s) && (t += ep(i, o),
                    o = ""),
                    r = s,
                    i = i || !Mt(r);
                n++
            }
            return "" !== o && (t += ep(i, o)),
            t
        }
        function ps(e) {
            return Kt( () => {
                const t = np(e)
                  , n = {
                    ...t,
                    decls: e.decls,
                    vars: e.vars,
                    template: e.template,
                    consts: e.consts || null,
                    ngContentSelectors: e.ngContentSelectors,
                    onPush: e.changeDetection === fs.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    dependencies: t.standalone && e.dependencies || null,
                    getStandaloneInjector: null,
                    signals: e.signals ?? !1,
                    data: e.data || {},
                    encapsulation: e.encapsulation || It.Emulated,
                    styles: e.styles || z,
                    _: null,
                    schemas: e.schemas || null,
                    tView: null,
                    id: ""
                };
                rp(n);
                const r = e.dependencies;
                return n.directiveDefs = gs(r, !1),
                n.pipeDefs = gs(r, !0),
                n.id = function LI(e) {
                    let t = 0;
                    const n = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|");
                    for (const o of n)
                        t = Math.imul(31, t) + o.charCodeAt(0) << 0;
                    return t += 2147483648,
                    "c" + t
                }(n),
                n
            }
            )
        }
        function OI(e) {
            return $(e) || Ie(e)
        }
        function PI(e) {
            return null !== e
        }
        function St(e) {
            return Kt( () => ({
                type: e.type,
                bootstrap: e.bootstrap || z,
                declarations: e.declarations || z,
                imports: e.imports || z,
                exports: e.exports || z,
                transitiveCompileScopes: null,
                schemas: e.schemas || null,
                id: e.id || null
            }))
        }
        function tp(e, t) {
            if (null == e)
                return Lt;
            const n = {};
            for (const r in e)
                if (e.hasOwnProperty(r)) {
                    let o = e[r]
                      , i = o;
                    Array.isArray(o) && (i = o[1],
                    o = o[0]),
                    n[o] = r,
                    t && (t[o] = i)
                }
            return n
        }
        function O(e) {
            return Kt( () => {
                const t = np(e);
                return rp(t),
                t
            }
            )
        }
        function $(e) {
            return e[hs] || null
        }
        function Ie(e) {
            return e[Ku] || null
        }
        function Fe(e) {
            return e[ec] || null
        }
        function tt(e, t) {
            const n = e[Gh] || null;
            if (!n && !0 === t)
                throw new Error(`Type ${Ce(e)} does not have '\u0275mod' property.`);
            return n
        }
        function np(e) {
            const t = {};
            return {
                type: e.type,
                providersResolver: null,
                factory: null,
                hostBindings: e.hostBindings || null,
                hostVars: e.hostVars || 0,
                hostAttrs: e.hostAttrs || null,
                contentQueries: e.contentQueries || null,
                declaredInputs: t,
                inputTransforms: null,
                inputConfig: e.inputs || Lt,
                exportAs: e.exportAs || null,
                standalone: !0 === e.standalone,
                signals: !0 === e.signals,
                selectors: e.selectors || z,
                viewQuery: e.viewQuery || null,
                features: e.features || null,
                setInput: null,
                findHostDirectiveDefs: null,
                hostDirectives: null,
                inputs: tp(e.inputs, t),
                outputs: tp(e.outputs)
            }
        }
        function rp(e) {
            e.features?.forEach(t => t(e))
        }
        function gs(e, t) {
            if (!e)
                return null;
            const n = t ? Fe : OI;
            return () => ("function" == typeof e ? e() : e).map(r => n(r)).filter(PI)
        }
        const ce = 0
          , _ = 1
          , L = 2
          , se = 3
          , At = 4
          , xo = 5
          , Ne = 6
          , hr = 7
          , he = 8
          , _n = 9
          , pr = 10
          , F = 11
          , Oo = 12
          , op = 13
          , gr = 14
          , pe = 15
          , Po = 16
          , mr = 17
          , Vt = 18
          , Fo = 19
          , ip = 20
          , En = 21
          , tn = 22
          , ko = 23
          , Lo = 24
          , H = 25
          , nc = 1
          , sp = 2
          , jt = 7
          , yr = 9
          , Me = 11;
        function qe(e) {
            return Array.isArray(e) && "object" == typeof e[nc]
        }
        function ke(e) {
            return Array.isArray(e) && !0 === e[nc]
        }
        function rc(e) {
            return 0 != (4 & e.flags)
        }
        function Un(e) {
            return e.componentOffset > -1
        }
        function ys(e) {
            return 1 == (1 & e.flags)
        }
        function Tt(e) {
            return !!e.template
        }
        function oc(e) {
            return 0 != (512 & e[L])
        }
        function zn(e, t) {
            return e.hasOwnProperty(en) ? e[en] : null
        }
        let Se = null
          , vs = !1;
        function mt(e) {
            const t = Se;
            return Se = e,
            t
        }
        const cp = {
            version: 0,
            dirty: !1,
            producerNode: void 0,
            producerLastReadVersion: void 0,
            producerIndexOfThis: void 0,
            nextProducerIndex: 0,
            liveConsumerNode: void 0,
            liveConsumerIndexOfThis: void 0,
            consumerAllowSignalWrites: !1,
            consumerIsAlwaysLive: !1,
            producerMustRecompute: () => !1,
            producerRecomputeValue: () => {}
            ,
            consumerMarkedDirty: () => {}
        };
        function dp(e) {
            if (!jo(e) || e.dirty) {
                if (!e.producerMustRecompute(e) && !pp(e))
                    return void (e.dirty = !1);
                e.producerRecomputeValue(e),
                e.dirty = !1
            }
        }
        function hp(e) {
            e.dirty = !0,
            function fp(e) {
                if (void 0 === e.liveConsumerNode)
                    return;
                const t = vs;
                vs = !0;
                try {
                    for (const n of e.liveConsumerNode)
                        n.dirty || hp(n)
                } finally {
                    vs = t
                }
            }(e),
            e.consumerMarkedDirty?.(e)
        }
        function sc(e) {
            return e && (e.nextProducerIndex = 0),
            mt(e)
        }
        function ac(e, t) {
            if (mt(t),
            e && void 0 !== e.producerNode && void 0 !== e.producerIndexOfThis && void 0 !== e.producerLastReadVersion) {
                if (jo(e))
                    for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
                        Ds(e.producerNode[n], e.producerIndexOfThis[n]);
                for (; e.producerNode.length > e.nextProducerIndex; )
                    e.producerNode.pop(),
                    e.producerLastReadVersion.pop(),
                    e.producerIndexOfThis.pop()
            }
        }
        function pp(e) {
            vr(e);
            for (let t = 0; t < e.producerNode.length; t++) {
                const n = e.producerNode[t]
                  , r = e.producerLastReadVersion[t];
                if (r !== n.version || (dp(n),
                r !== n.version))
                    return !0
            }
            return !1
        }
        function gp(e) {
            if (vr(e),
            jo(e))
                for (let t = 0; t < e.producerNode.length; t++)
                    Ds(e.producerNode[t], e.producerIndexOfThis[t]);
            e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0,
            e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
        }
        function Ds(e, t) {
            if (function yp(e) {
                e.liveConsumerNode ??= [],
                e.liveConsumerIndexOfThis ??= []
            }(e),
            vr(e),
            1 === e.liveConsumerNode.length)
                for (let r = 0; r < e.producerNode.length; r++)
                    Ds(e.producerNode[r], e.producerIndexOfThis[r]);
            const n = e.liveConsumerNode.length - 1;
            if (e.liveConsumerNode[t] = e.liveConsumerNode[n],
            e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n],
            e.liveConsumerNode.length--,
            e.liveConsumerIndexOfThis.length--,
            t < e.liveConsumerNode.length) {
                const r = e.liveConsumerIndexOfThis[t]
                  , o = e.liveConsumerNode[t];
                vr(o),
                o.producerIndexOfThis[r] = t
            }
        }
        function jo(e) {
            return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0
        }
        function vr(e) {
            e.producerNode ??= [],
            e.producerIndexOfThis ??= [],
            e.producerLastReadVersion ??= []
        }
        let vp = null;
        const _p = () => {}
          , QI = ( () => ({
            ...cp,
            consumerIsAlwaysLive: !0,
            consumerAllowSignalWrites: !1,
            consumerMarkedDirty: e => {
                e.schedule(e.ref)
            }
            ,
            hasRun: !1,
            cleanupFn: _p
        }))();
        class XI {
            constructor(t, n, r) {
                this.previousValue = t,
                this.currentValue = n,
                this.firstChange = r
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        function yt() {
            return Ep
        }
        function Ep(e) {
            return e.type.prototype.ngOnChanges && (e.setInput = KI),
            JI
        }
        function JI() {
            const e = Ip(this)
              , t = e?.current;
            if (t) {
                const n = e.previous;
                if (n === Lt)
                    e.previous = t;
                else
                    for (let r in t)
                        n[r] = t[r];
                e.current = null,
                this.ngOnChanges(t)
            }
        }
        function KI(e, t, n, r) {
            const o = this.declaredInputs[n]
              , i = Ip(e) || function eM(e, t) {
                return e[bp] = t
            }(e, {
                previous: Lt,
                current: null
            })
              , s = i.current || (i.current = {})
              , a = i.previous
              , u = a[o];
            s[o] = new XI(u && u.currentValue,t,a === Lt),
            e[r] = t
        }
        yt.ngInherit = !0;
        const bp = "__ngSimpleChanges__";
        function Ip(e) {
            return e[bp] || null
        }
        const Bt = function(e, t, n) {};
        function ne(e) {
            for (; Array.isArray(e); )
                e = e[ce];
            return e
        }
        function We(e, t) {
            return ne(t[e.index])
        }
        function Ap(e, t) {
            return e.data[t]
        }
        function nt(e, t) {
            const n = t[e];
            return qe(n) ? n : n[ce]
        }
        function In(e, t) {
            return null == t ? null : e[t]
        }
        function Tp(e) {
            e[mr] = 0
        }
        function sM(e) {
            1024 & e[L] || (e[L] |= 1024,
            Rp(e, 1))
        }
        function Np(e) {
            1024 & e[L] && (e[L] &= -1025,
            Rp(e, -1))
        }
        function Rp(e, t) {
            let n = e[se];
            if (null === n)
                return;
            n[xo] += t;
            let r = n;
            for (n = n[se]; null !== n && (1 === t && 1 === r[xo] || -1 === t && 0 === r[xo]); )
                n[xo] += t,
                r = n,
                n = n[se]
        }
        const R = {
            lFrame: $p(null),
            bindingsEnabled: !0,
            skipHydrationRootTNode: null
        };
        function Pp() {
            return R.bindingsEnabled
        }
        function v() {
            return R.lFrame.lView
        }
        function U() {
            return R.lFrame.tView
        }
        function fc(e) {
            return R.lFrame.contextLView = e,
            e[he]
        }
        function hc(e) {
            return R.lFrame.contextLView = null,
            e
        }
        function Ae() {
            let e = Fp();
            for (; null !== e && 64 === e.type; )
                e = e.parent;
            return e
        }
        function Fp() {
            return R.lFrame.currentTNode
        }
        function Ht(e, t) {
            const n = R.lFrame;
            n.currentTNode = e,
            n.isParent = t
        }
        function pc() {
            return R.lFrame.isParent
        }
        function wr() {
            return R.lFrame.bindingIndex++
        }
        function vM(e, t) {
            const n = R.lFrame;
            n.bindingIndex = n.bindingRootIndex = e,
            mc(t)
        }
        function mc(e) {
            R.lFrame.currentDirectiveIndex = e
        }
        function vc(e) {
            R.lFrame.currentQueryIndex = e
        }
        function CM(e) {
            const t = e[_];
            return 2 === t.type ? t.declTNode : 1 === t.type ? e[Ne] : null
        }
        function Bp(e, t, n) {
            if (n & B.SkipSelf) {
                let o = t
                  , i = e;
                for (; !(o = o.parent,
                null !== o || n & B.Host || (o = CM(i),
                null === o || (i = i[gr],
                10 & o.type))); )
                    ;
                if (null === o)
                    return !1;
                t = o,
                e = i
            }
            const r = R.lFrame = Hp();
            return r.currentTNode = t,
            r.lView = e,
            !0
        }
        function Dc(e) {
            const t = Hp()
              , n = e[_];
            R.lFrame = t,
            t.currentTNode = n.firstChild,
            t.lView = e,
            t.tView = n,
            t.contextLView = e,
            t.bindingIndex = n.bindingStartIndex,
            t.inI18n = !1
        }
        function Hp() {
            const e = R.lFrame
              , t = null === e ? null : e.child;
            return null === t ? $p(e) : t
        }
        function $p(e) {
            const t = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: e,
                child: null,
                inI18n: !1
            };
            return null !== e && (e.child = t),
            t
        }
        function Up() {
            const e = R.lFrame;
            return R.lFrame = e.parent,
            e.currentTNode = null,
            e.lView = null,
            e
        }
        const zp = Up;
        function Cc() {
            const e = Up();
            e.isParent = !0,
            e.tView = null,
            e.selectedIndex = -1,
            e.contextLView = null,
            e.elementDepthCount = 0,
            e.currentDirectiveIndex = -1,
            e.currentNamespace = null,
            e.bindingRootIndex = -1,
            e.bindingIndex = -1,
            e.currentQueryIndex = 0
        }
        function Ve() {
            return R.lFrame.selectedIndex
        }
        function Gn(e) {
            R.lFrame.selectedIndex = e
        }
        let qp = !0;
        function ws() {
            return qp
        }
        function Mn(e) {
            qp = e
        }
        function _s(e, t) {
            for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
                const i = e.data[n].type.prototype
                  , {ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: u, ngAfterViewChecked: c, ngOnDestroy: l} = i;
                s && (e.contentHooks ??= []).push(-n, s),
                a && ((e.contentHooks ??= []).push(n, a),
                (e.contentCheckHooks ??= []).push(n, a)),
                u && (e.viewHooks ??= []).push(-n, u),
                c && ((e.viewHooks ??= []).push(n, c),
                (e.viewCheckHooks ??= []).push(n, c)),
                null != l && (e.destroyHooks ??= []).push(n, l)
            }
        }
        function Es(e, t, n) {
            Wp(e, t, 3, n)
        }
        function bs(e, t, n, r) {
            (3 & e[L]) === n && Wp(e, t, n, r)
        }
        function wc(e, t) {
            let n = e[L];
            (3 & n) === t && (n &= 8191,
            n += 1,
            e[L] = n)
        }
        function Wp(e, t, n, r) {
            const i = r ?? -1
              , s = t.length - 1;
            let a = 0;
            for (let u = void 0 !== r ? 65535 & e[mr] : 0; u < s; u++)
                if ("number" == typeof t[u + 1]) {
                    if (a = t[u],
                    null != r && a >= r)
                        break
                } else
                    t[u] < 0 && (e[mr] += 65536),
                    (a < i || -1 == i) && (AM(e, n, t, u),
                    e[mr] = (4294901760 & e[mr]) + u + 2),
                    u++
        }
        function Zp(e, t) {
            Bt(4, e, t);
            const n = mt(null);
            try {
                t.call(e)
            } finally {
                mt(n),
                Bt(5, e, t)
            }
        }
        function AM(e, t, n, r) {
            const o = n[r] < 0
              , i = n[r + 1]
              , a = e[o ? -n[r] : n[r]];
            o ? e[L] >> 13 < e[mr] >> 16 && (3 & e[L]) === t && (e[L] += 8192,
            Zp(a, i)) : Zp(a, i)
        }
        const _r = -1;
        class Ho {
            constructor(t, n, r) {
                this.factory = t,
                this.resolving = !1,
                this.canSeeViewProviders = n,
                this.injectImpl = r
            }
        }
        function Ec(e) {
            return e !== _r
        }
        function $o(e) {
            return 32767 & e
        }
        function Uo(e, t) {
            let n = function xM(e) {
                return e >> 16
            }(e)
              , r = t;
            for (; n > 0; )
                r = r[gr],
                n--;
            return r
        }
        let bc = !0;
        function Is(e) {
            const t = bc;
            return bc = e,
            t
        }
        const Yp = 255
          , Qp = 5;
        let OM = 0;
        const $t = {};
        function Ms(e, t) {
            const n = Xp(e, t);
            if (-1 !== n)
                return n;
            const r = t[_];
            r.firstCreatePass && (e.injectorIndex = t.length,
            Ic(r.data, e),
            Ic(t, null),
            Ic(r.blueprint, null));
            const o = Ss(e, t)
              , i = e.injectorIndex;
            if (Ec(o)) {
                const s = $o(o)
                  , a = Uo(o, t)
                  , u = a[_].data;
                for (let c = 0; c < 8; c++)
                    t[i + c] = a[s + c] | u[s + c]
            }
            return t[i + 8] = o,
            i
        }
        function Ic(e, t) {
            e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
        }
        function Xp(e, t) {
            return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex
        }
        function Ss(e, t) {
            if (e.parent && -1 !== e.parent.injectorIndex)
                return e.parent.injectorIndex;
            let n = 0
              , r = null
              , o = t;
            for (; null !== o; ) {
                if (r = og(o),
                null === r)
                    return _r;
                if (n++,
                o = o[gr],
                -1 !== r.injectorIndex)
                    return r.injectorIndex | n << 16
            }
            return _r
        }
        function Mc(e, t, n) {
            !function PM(e, t, n) {
                let r;
                "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(No) && (r = n[No]),
                null == r && (r = n[No] = OM++);
                const o = r & Yp;
                t.data[e + (o >> Qp)] |= 1 << o
            }(e, t, n)
        }
        function Jp(e, t, n) {
            if (n & B.Optional || void 0 !== e)
                return e;
            zu()
        }
        function Kp(e, t, n, r) {
            if (n & B.Optional && void 0 === r && (r = null),
            !(n & (B.Self | B.Host))) {
                const o = e[_n]
                  , i = ze(void 0);
                try {
                    return o ? o.get(t, r, n & B.Optional) : Hh(t, r, n & B.Optional)
                } finally {
                    ze(i)
                }
            }
            return Jp(r, 0, n)
        }
        function eg(e, t, n, r=B.Default, o) {
            if (null !== e) {
                if (2048 & t[L] && !(r & B.Self)) {
                    const s = function BM(e, t, n, r, o) {
                        let i = e
                          , s = t;
                        for (; null !== i && null !== s && 2048 & s[L] && !(512 & s[L]); ) {
                            const a = tg(i, s, n, r | B.Self, $t);
                            if (a !== $t)
                                return a;
                            let u = i.parent;
                            if (!u) {
                                const c = s[ip];
                                if (c) {
                                    const l = c.get(n, $t, r);
                                    if (l !== $t)
                                        return l
                                }
                                u = og(s),
                                s = s[gr]
                            }
                            i = u
                        }
                        return o
                    }(e, t, n, r, $t);
                    if (s !== $t)
                        return s
                }
                const i = tg(e, t, n, r, $t);
                if (i !== $t)
                    return i
            }
            return Kp(t, n, r, o)
        }
        function tg(e, t, n, r, o) {
            const i = function LM(e) {
                if ("string" == typeof e)
                    return e.charCodeAt(0) || 0;
                const t = e.hasOwnProperty(No) ? e[No] : void 0;
                return "number" == typeof t ? t >= 0 ? t & Yp : jM : t
            }(n);
            if ("function" == typeof i) {
                if (!Bp(t, e, r))
                    return r & B.Host ? Jp(o, 0, r) : Kp(t, n, r, o);
                try {
                    let s;
                    if (s = i(r),
                    null != s || r & B.Optional)
                        return s;
                    zu()
                } finally {
                    zp()
                }
            } else if ("number" == typeof i) {
                let s = null
                  , a = Xp(e, t)
                  , u = _r
                  , c = r & B.Host ? t[pe][Ne] : null;
                for ((-1 === a || r & B.SkipSelf) && (u = -1 === a ? Ss(e, t) : t[a + 8],
                u !== _r && rg(r, !1) ? (s = t[_],
                a = $o(u),
                t = Uo(u, t)) : a = -1); -1 !== a; ) {
                    const l = t[_];
                    if (ng(i, a, l.data)) {
                        const d = kM(a, t, n, s, r, c);
                        if (d !== $t)
                            return d
                    }
                    u = t[a + 8],
                    u !== _r && rg(r, t[_].data[a + 8] === c) && ng(i, a, t) ? (s = l,
                    a = $o(u),
                    t = Uo(u, t)) : a = -1
                }
            }
            return o
        }
        function kM(e, t, n, r, o, i) {
            const s = t[_]
              , a = s.data[e + 8]
              , l = function As(e, t, n, r, o) {
                const i = e.providerIndexes
                  , s = t.data
                  , a = 1048575 & i
                  , u = e.directiveStart
                  , l = i >> 20
                  , f = o ? a + l : e.directiveEnd;
                for (let h = r ? a : a + l; h < f; h++) {
                    const p = s[h];
                    if (h < u && n === p || h >= u && p.type === n)
                        return h
                }
                if (o) {
                    const h = s[u];
                    if (h && Tt(h) && h.type === n)
                        return u
                }
                return null
            }(a, s, n, null == r ? Un(a) && bc : r != s && 0 != (3 & a.type), o & B.Host && i === a);
            return null !== l ? qn(t, s, l, a) : $t
        }
        function qn(e, t, n, r) {
            let o = e[n];
            const i = t.data;
            if (function TM(e) {
                return e instanceof Ho
            }(o)) {
                const s = o;
                s.resolving && function oI(e, t) {
                    const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
                    throw new C(-200,`Circular dependency in DI detected for ${e}${n}`)
                }(function Z(e) {
                    return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : P(e)
                }(i[n]));
                const a = Is(s.canSeeViewProviders);
                s.resolving = !0;
                const c = s.injectImpl ? ze(s.injectImpl) : null;
                Bp(e, r, B.Default);
                try {
                    o = e[n] = s.factory(void 0, i, e, r),
                    t.firstCreatePass && n >= r.directiveStart && function SM(e, t, n) {
                        const {ngOnChanges: r, ngOnInit: o, ngDoCheck: i} = t.type.prototype;
                        if (r) {
                            const s = Ep(t);
                            (n.preOrderHooks ??= []).push(e, s),
                            (n.preOrderCheckHooks ??= []).push(e, s)
                        }
                        o && (n.preOrderHooks ??= []).push(0 - e, o),
                        i && ((n.preOrderHooks ??= []).push(e, i),
                        (n.preOrderCheckHooks ??= []).push(e, i))
                    }(n, i[n], t)
                } finally {
                    null !== c && ze(c),
                    Is(a),
                    s.resolving = !1,
                    zp()
                }
            }
            return o
        }
        function ng(e, t, n) {
            return !!(n[t + (e >> Qp)] & 1 << e)
        }
        function rg(e, t) {
            return !(e & B.Self || e & B.Host && t)
        }
        class je {
            constructor(t, n) {
                this._tNode = t,
                this._lView = n
            }
            get(t, n, r) {
                return eg(this._tNode, this._lView, t, ds(r), n)
            }
        }
        function jM() {
            return new je(Ae(),v())
        }
        function Sc(e) {
            return $u(e) ? () => {
                const t = Sc(x(e));
                return t && t()
            }
            : zn(e)
        }
        function og(e) {
            const t = e[_]
              , n = t.type;
            return 2 === n ? t.declTNode : 1 === n ? e[Ne] : null
        }
        const br = "__parameters__";
        function Mr(e, t, n) {
            return Kt( () => {
                const r = function Ac(e) {
                    return function(...n) {
                        if (e) {
                            const r = e(...n);
                            for (const o in r)
                                this[o] = r[o]
                        }
                    }
                }(t);
                function o(...i) {
                    if (this instanceof o)
                        return r.apply(this, i),
                        this;
                    const s = new o(...i);
                    return a.annotation = s,
                    a;
                    function a(u, c, l) {
                        const d = u.hasOwnProperty(br) ? u[br] : Object.defineProperty(u, br, {
                            value: []
                        })[br];
                        for (; d.length <= l; )
                            d.push(null);
                        return (d[l] = d[l] || []).push(s),
                        u
                    }
                }
                return n && (o.prototype = Object.create(n.prototype)),
                o.prototype.ngMetadataName = e,
                o.annotationCls = o,
                o
            }
            )
        }
        function Ar(e, t) {
            e.forEach(n => Array.isArray(n) ? Ar(n, t) : t(n))
        }
        function sg(e, t, n) {
            t >= e.length ? e.push(n) : e.splice(t, 0, n)
        }
        function Ns(e, t) {
            return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
        }
        const xs = To(Mr("Optional"), 8)
          , Os = To(Mr("SkipSelf"), 4);
        function Vs(e) {
            return 128 == (128 & e.flags)
        }
        var Sn = function(e) {
            return e[e.Important = 1] = "Important",
            e[e.DashCase = 2] = "DashCase",
            e
        }(Sn || {});
        const Pc = new Map;
        let yS = 0;
        const kc = "__ngContext__";
        function Re(e, t) {
            qe(t) ? (e[kc] = t[Fo],
            function DS(e) {
                Pc.set(e[Fo], e)
            }(t)) : e[kc] = t
        }
        let Lc;
        function Vc(e, t) {
            return Lc(e, t)
        }
        function Yo(e) {
            const t = e[se];
            return ke(t) ? t[se] : t
        }
        function Sg(e) {
            return Tg(e[Oo])
        }
        function Ag(e) {
            return Tg(e[At])
        }
        function Tg(e) {
            for (; null !== e && !ke(e); )
                e = e[At];
            return e
        }
        function xr(e, t, n, r, o) {
            if (null != r) {
                let i, s = !1;
                ke(r) ? i = r : qe(r) && (s = !0,
                r = r[ce]);
                const a = ne(r);
                0 === e && null !== n ? null == o ? Og(t, n, a) : Wn(t, n, a, o || null, !0) : 1 === e && null !== n ? Wn(t, n, a, o || null, !0) : 2 === e ? function Gs(e, t, n) {
                    const r = Us(e, t);
                    r && function VS(e, t, n, r) {
                        e.removeChild(t, n, r)
                    }(e, r, t, n)
                }(t, a, s) : 3 === e && t.destroyNode(a),
                null != i && function HS(e, t, n, r, o) {
                    const i = n[jt];
                    i !== ne(n) && xr(t, e, r, i, o);
                    for (let a = Me; a < n.length; a++) {
                        const u = n[a];
                        Xo(u[_], u, e, t, r, i)
                    }
                }(t, e, i, n, o)
            }
        }
        function Hs(e, t, n) {
            return e.createElement(t, n)
        }
        function Rg(e, t) {
            const n = e[yr]
              , r = n.indexOf(t);
            Np(t),
            n.splice(r, 1)
        }
        function $s(e, t) {
            if (e.length <= Me)
                return;
            const n = Me + t
              , r = e[n];
            if (r) {
                const o = r[Po];
                null !== o && o !== e && Rg(o, r),
                t > 0 && (e[n - 1][At] = r[At]);
                const i = Ns(e, Me + t);
                !function NS(e, t) {
                    Xo(e, t, t[F], 2, null, null),
                    t[ce] = null,
                    t[Ne] = null
                }(r[_], r);
                const s = i[Vt];
                null !== s && s.detachView(i[_]),
                r[se] = null,
                r[At] = null,
                r[L] &= -129
            }
            return r
        }
        function Bc(e, t) {
            if (!(256 & t[L])) {
                const n = t[F];
                t[ko] && gp(t[ko]),
                t[Lo] && gp(t[Lo]),
                n.destroyNode && Xo(e, t, n, 3, null, null),
                function OS(e) {
                    let t = e[Oo];
                    if (!t)
                        return Hc(e[_], e);
                    for (; t; ) {
                        let n = null;
                        if (qe(t))
                            n = t[Oo];
                        else {
                            const r = t[Me];
                            r && (n = r)
                        }
                        if (!n) {
                            for (; t && !t[At] && t !== e; )
                                qe(t) && Hc(t[_], t),
                                t = t[se];
                            null === t && (t = e),
                            qe(t) && Hc(t[_], t),
                            n = t && t[At]
                        }
                        t = n
                    }
                }(t)
            }
        }
        function Hc(e, t) {
            if (!(256 & t[L])) {
                t[L] &= -129,
                t[L] |= 256,
                function LS(e, t) {
                    let n;
                    if (null != e && null != (n = e.destroyHooks))
                        for (let r = 0; r < n.length; r += 2) {
                            const o = t[n[r]];
                            if (!(o instanceof Ho)) {
                                const i = n[r + 1];
                                if (Array.isArray(i))
                                    for (let s = 0; s < i.length; s += 2) {
                                        const a = o[i[s]]
                                          , u = i[s + 1];
                                        Bt(4, a, u);
                                        try {
                                            u.call(a)
                                        } finally {
                                            Bt(5, a, u)
                                        }
                                    }
                                else {
                                    Bt(4, o, i);
                                    try {
                                        i.call(o)
                                    } finally {
                                        Bt(5, o, i)
                                    }
                                }
                            }
                        }
                }(e, t),
                function kS(e, t) {
                    const n = e.cleanup
                      , r = t[hr];
                    if (null !== n)
                        for (let i = 0; i < n.length - 1; i += 2)
                            if ("string" == typeof n[i]) {
                                const s = n[i + 3];
                                s >= 0 ? r[s]() : r[-s].unsubscribe(),
                                i += 2
                            } else
                                n[i].call(r[n[i + 1]]);
                    null !== r && (t[hr] = null);
                    const o = t[En];
                    if (null !== o) {
                        t[En] = null;
                        for (let i = 0; i < o.length; i++)
                            (0,
                            o[i])()
                    }
                }(e, t),
                1 === t[_].type && t[F].destroy();
                const n = t[Po];
                if (null !== n && ke(t[se])) {
                    n !== t[se] && Rg(n, t);
                    const r = t[Vt];
                    null !== r && r.detachView(e)
                }
                !function CS(e) {
                    Pc.delete(e[Fo])
                }(t)
            }
        }
        function $c(e, t, n) {
            return function xg(e, t, n) {
                let r = t;
                for (; null !== r && 40 & r.type; )
                    r = (t = r).parent;
                if (null === r)
                    return n[ce];
                {
                    const {componentOffset: o} = r;
                    if (o > -1) {
                        const {encapsulation: i} = e.data[r.directiveStart + o];
                        if (i === It.None || i === It.Emulated)
                            return null
                    }
                    return We(r, n)
                }
            }(e, t.parent, n)
        }
        function Wn(e, t, n, r, o) {
            e.insertBefore(t, n, r, o)
        }
        function Og(e, t, n) {
            e.appendChild(t, n)
        }
        function Pg(e, t, n, r, o) {
            null !== r ? Wn(e, t, n, r, o) : Og(e, t, n)
        }
        function Us(e, t) {
            return e.parentNode(t)
        }
        let Uc, Wc, Lg = function kg(e, t, n) {
            return 40 & e.type ? We(e, n) : null
        };
        function zs(e, t, n, r) {
            const o = $c(e, r, t)
              , i = t[F]
              , a = function Fg(e, t, n) {
                return Lg(e, t, n)
            }(r.parent || t[Ne], r, t);
            if (null != o)
                if (Array.isArray(n))
                    for (let u = 0; u < n.length; u++)
                        Pg(i, o, n[u], a, !1);
                else
                    Pg(i, o, n, a, !1);
            void 0 !== Uc && Uc(i, r, t, n, o)
        }
        function Qo(e, t) {
            if (null !== t) {
                const n = t.type;
                if (3 & n)
                    return We(t, e);
                if (4 & n)
                    return zc(-1, e[t.index]);
                if (8 & n) {
                    const r = t.child;
                    if (null !== r)
                        return Qo(e, r);
                    {
                        const o = e[t.index];
                        return ke(o) ? zc(-1, o) : ne(o)
                    }
                }
                if (32 & n)
                    return Vc(t, e)() || ne(e[t.index]);
                {
                    const r = jg(e, t);
                    return null !== r ? Array.isArray(r) ? r[0] : Qo(Yo(e[pe]), r) : Qo(e, t.next)
                }
            }
            return null
        }
        function jg(e, t) {
            return null !== t ? e[pe][Ne].projection[t.projection] : null
        }
        function zc(e, t) {
            const n = Me + e + 1;
            if (n < t.length) {
                const r = t[n]
                  , o = r[_].firstChild;
                if (null !== o)
                    return Qo(r, o)
            }
            return t[jt]
        }
        function Gc(e, t, n, r, o, i, s) {
            for (; null != n; ) {
                const a = r[n.index]
                  , u = n.type;
                if (s && 0 === t && (a && Re(ne(a), r),
                n.flags |= 2),
                32 != (32 & n.flags))
                    if (8 & u)
                        Gc(e, t, n.child, r, o, i, !1),
                        xr(t, e, o, a, i);
                    else if (32 & u) {
                        const c = Vc(n, r);
                        let l;
                        for (; l = c(); )
                            xr(t, e, o, l, i);
                        xr(t, e, o, a, i)
                    } else
                        16 & u ? Hg(e, t, r, n, o, i) : xr(t, e, o, a, i);
                n = s ? n.projectionNext : n.next
            }
        }
        function Xo(e, t, n, r, o, i) {
            Gc(n, r, e.firstChild, t, o, i, !1)
        }
        function Hg(e, t, n, r, o, i) {
            const s = n[pe]
              , u = s[Ne].projection[r.projection];
            if (Array.isArray(u))
                for (let c = 0; c < u.length; c++)
                    xr(t, e, o, u[c], i);
            else {
                let c = u;
                const l = s[se];
                Vs(r) && (c.flags |= 128),
                Gc(e, t, c, l, o, i, !0)
            }
        }
        function $g(e, t, n) {
            "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
        }
        function Ug(e, t, n) {
            const {mergedAttrs: r, classes: o, styles: i} = n;
            null !== r && tc(e, t, r),
            null !== o && $g(e, t, o),
            null !== i && function US(e, t, n) {
                e.setAttribute(t, "style", n)
            }(e, t, i)
        }
        const ti = new I("ENVIRONMENT_INITIALIZER")
          , rm = new I("INJECTOR",-1)
          , om = new I("INJECTOR_DEF_TYPES");
        class Kc {
            get(t, n=Ao) {
                if (n === Ao) {
                    const r = new Error(`NullInjectorError: No provider for ${Ce(t)}!`);
                    throw r.name = "NullInjectorError",
                    r
                }
                return n
            }
        }
        function y0(...e) {
            return {
                \u0275providers: im(0, e),
                \u0275fromNgModule: !0
            }
        }
        function im(e, ...t) {
            const n = []
              , r = new Set;
            let o;
            const i = s => {
                n.push(s)
            }
            ;
            return Ar(t, s => {
                const a = s;
                Ys(a, i, [], r) && (o ||= [],
                o.push(a))
            }
            ),
            void 0 !== o && sm(o, i),
            n
        }
        function sm(e, t) {
            for (let n = 0; n < e.length; n++) {
                const {ngModule: r, providers: o} = e[n];
                tl(o, i => {
                    t(i, r)
                }
                )
            }
        }
        function Ys(e, t, n, r) {
            if (!(e = x(e)))
                return !1;
            let o = null
              , i = us(e);
            const s = !i && $(e);
            if (i || s) {
                if (s && !s.standalone)
                    return !1;
                o = e
            } else {
                const u = e.ngModule;
                if (i = us(u),
                !i)
                    return !1;
                o = u
            }
            const a = r.has(o);
            if (s) {
                if (a)
                    return !1;
                if (r.add(o),
                s.dependencies) {
                    const u = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const c of u)
                        Ys(c, t, n, r)
                }
            } else {
                if (!i)
                    return !1;
                {
                    if (null != i.imports && !a) {
                        let c;
                        r.add(o);
                        try {
                            Ar(i.imports, l => {
                                Ys(l, t, n, r) && (c ||= [],
                                c.push(l))
                            }
                            )
                        } finally {}
                        void 0 !== c && sm(c, t)
                    }
                    if (!a) {
                        const c = zn(o) || ( () => new o);
                        t({
                            provide: o,
                            useFactory: c,
                            deps: z
                        }, o),
                        t({
                            provide: om,
                            useValue: o,
                            multi: !0
                        }, o),
                        t({
                            provide: ti,
                            useValue: () => M(o),
                            multi: !0
                        }, o)
                    }
                    const u = i.providers;
                    if (null != u && !a) {
                        const c = e;
                        tl(u, l => {
                            t(l, c)
                        }
                        )
                    }
                }
            }
            return o !== e && void 0 !== e.providers
        }
        function tl(e, t) {
            for (let n of e)
                Uu(n) && (n = n.\u0275providers),
                Array.isArray(n) ? tl(n, t) : t(n)
        }
        const v0 = Y({
            provide: String,
            useValue: Y
        });
        function nl(e) {
            return null !== e && "object" == typeof e && v0 in e
        }
        function Zn(e) {
            return "function" == typeof e
        }
        const rl = new I("Set Injector scope.")
          , Qs = {}
          , C0 = {};
        let ol;
        function Xs() {
            return void 0 === ol && (ol = new Kc),
            ol
        }
        class ot {
        }
        class kr extends ot {
            get destroyed() {
                return this._destroyed
            }
            constructor(t, n, r, o) {
                super(),
                this.parent = n,
                this.source = r,
                this.scopes = o,
                this.records = new Map,
                this._ngOnDestroyHooks = new Set,
                this._onDestroyHooks = [],
                this._destroyed = !1,
                sl(t, s => this.processProvider(s)),
                this.records.set(rm, Lr(void 0, this)),
                o.has("environment") && this.records.set(ot, Lr(void 0, this));
                const i = this.records.get(rl);
                null != i && "string" == typeof i.value && this.scopes.add(i.value),
                this.injectorDefTypes = new Set(this.get(om.multi, z, B.Self))
            }
            destroy() {
                this.assertNotDestroyed(),
                this._destroyed = !0;
                try {
                    for (const n of this._ngOnDestroyHooks)
                        n.ngOnDestroy();
                    const t = this._onDestroyHooks;
                    this._onDestroyHooks = [];
                    for (const n of t)
                        n()
                } finally {
                    this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear()
                }
            }
            onDestroy(t) {
                return this.assertNotDestroyed(),
                this._onDestroyHooks.push(t),
                () => this.removeOnDestroy(t)
            }
            runInContext(t) {
                this.assertNotDestroyed();
                const n = wn(this)
                  , r = ze(void 0);
                try {
                    return t()
                } finally {
                    wn(n),
                    ze(r)
                }
            }
            get(t, n=Ao, r=B.Default) {
                if (this.assertNotDestroyed(),
                t.hasOwnProperty(qh))
                    return t[qh](this);
                r = ds(r);
                const i = wn(this)
                  , s = ze(void 0);
                try {
                    if (!(r & B.SkipSelf)) {
                        let u = this.records.get(t);
                        if (void 0 === u) {
                            const c = function I0(e) {
                                return "function" == typeof e || "object" == typeof e && e instanceof I
                            }(t) && as(t);
                            u = c && this.injectableDefInScope(c) ? Lr(il(t), Qs) : null,
                            this.records.set(t, u)
                        }
                        if (null != u)
                            return this.hydrate(t, u)
                    }
                    return (r & B.Self ? Xs() : this.parent).get(t, n = r & B.Optional && n === Ao ? null : n)
                } catch (a) {
                    if ("NullInjectorError" === a.name) {
                        if ((a[ls] = a[ls] || []).unshift(Ce(t)),
                        i)
                            throw a;
                        return function DI(e, t, n, r) {
                            const o = e[ls];
                            throw t[Uh] && o.unshift(t[Uh]),
                            e.message = function CI(e, t, n, r=null) {
                                e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                let o = Ce(t);
                                if (Array.isArray(t))
                                    o = t.map(Ce).join(" -> ");
                                else if ("object" == typeof t) {
                                    let i = [];
                                    for (let s in t)
                                        if (t.hasOwnProperty(s)) {
                                            let a = t[s];
                                            i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : Ce(a)))
                                        }
                                    o = `{${i.join(", ")}}`
                                }
                                return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(pI, "\n  ")}`
                            }("\n" + e.message, o, n, r),
                            e.ngTokenPath = o,
                            e[ls] = null,
                            e
                        }(a, t, "R3InjectorError", this.source)
                    }
                    throw a
                } finally {
                    ze(s),
                    wn(i)
                }
            }
            resolveInjectorInitializers() {
                const t = wn(this)
                  , n = ze(void 0);
                try {
                    const o = this.get(ti.multi, z, B.Self);
                    for (const i of o)
                        i()
                } finally {
                    wn(t),
                    ze(n)
                }
            }
            toString() {
                const t = []
                  , n = this.records;
                for (const r of n.keys())
                    t.push(Ce(r));
                return `R3Injector[${t.join(", ")}]`
            }
            assertNotDestroyed() {
                if (this._destroyed)
                    throw new C(205,!1)
            }
            processProvider(t) {
                let n = Zn(t = x(t)) ? t : x(t && t.provide);
                const r = function _0(e) {
                    return nl(e) ? Lr(void 0, e.useValue) : Lr(function cm(e, t, n) {
                        let r;
                        if (Zn(e)) {
                            const o = x(e);
                            return zn(o) || il(o)
                        }
                        if (nl(e))
                            r = () => x(e.useValue);
                        else if (function um(e) {
                            return !(!e || !e.useFactory)
                        }(e))
                            r = () => e.useFactory(...Ju(e.deps || []));
                        else if (function am(e) {
                            return !(!e || !e.useExisting)
                        }(e))
                            r = () => M(x(e.useExisting));
                        else {
                            const o = x(e && (e.useClass || e.provide));
                            if (!function E0(e) {
                                return !!e.deps
                            }(e))
                                return zn(o) || il(o);
                            r = () => new o(...Ju(e.deps))
                        }
                        return r
                    }(e), Qs)
                }(t);
                if (Zn(t) || !0 !== t.multi)
                    this.records.get(n);
                else {
                    let o = this.records.get(n);
                    o || (o = Lr(void 0, Qs, !0),
                    o.factory = () => Ju(o.multi),
                    this.records.set(n, o)),
                    n = t,
                    o.multi.push(t)
                }
                this.records.set(n, r)
            }
            hydrate(t, n) {
                return n.value === Qs && (n.value = C0,
                n.value = n.factory()),
                "object" == typeof n.value && n.value && function b0(e) {
                    return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                }(n.value) && this._ngOnDestroyHooks.add(n.value),
                n.value
            }
            injectableDefInScope(t) {
                if (!t.providedIn)
                    return !1;
                const n = x(t.providedIn);
                return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
            }
            removeOnDestroy(t) {
                const n = this._onDestroyHooks.indexOf(t);
                -1 !== n && this._onDestroyHooks.splice(n, 1)
            }
        }
        function il(e) {
            const t = as(e)
              , n = null !== t ? t.factory : zn(e);
            if (null !== n)
                return n;
            if (e instanceof I)
                throw new C(204,!1);
            if (e instanceof Function)
                return function w0(e) {
                    const t = e.length;
                    if (t > 0)
                        throw function qo(e, t) {
                            const n = [];
                            for (let r = 0; r < e; r++)
                                n.push(t);
                            return n
                        }(t, "?"),
                        new C(204,!1);
                    const n = function lI(e) {
                        return e && (e[cs] || e[jh]) || null
                    }(e);
                    return null !== n ? () => n.factory(e) : () => new e
                }(e);
            throw new C(204,!1)
        }
        function Lr(e, t, n=!1) {
            return {
                factory: e,
                value: t,
                multi: n ? [] : void 0
            }
        }
        function sl(e, t) {
            for (const n of e)
                Array.isArray(n) ? sl(n, t) : n && Uu(n) ? sl(n.\u0275providers, t) : t(n)
        }
        const Js = new I("AppId",{
            providedIn: "root",
            factory: () => M0
        })
          , M0 = "ng"
          , lm = new I("Platform Initializer")
          , Yn = new I("Platform ID",{
            providedIn: "platform",
            factory: () => "unknown"
        })
          , dm = new I("CSP nonce",{
            providedIn: "root",
            factory: () => function Pr() {
                if (void 0 !== Wc)
                    return Wc;
                if (typeof document < "u")
                    return document;
                throw new C(210,!1)
            }().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
        });
        let fm = (e, t, n) => null;
        function pl(e, t, n=!1) {
            return fm(e, t, n)
        }
        class k0 {
        }
        class gm {
        }
        class V0 {
            resolveComponentFactory(t) {
                throw function L0(e) {
                    const t = Error(`No component factory found for ${Ce(e)}.`);
                    return t.ngComponent = e,
                    t
                }(t)
            }
        }
        let oa = ( () => {
            class e {
                static{this.NULL = new V0
                }
            }
            return e
        }
        )();
        function j0() {
            return Br(Ae(), v())
        }
        function Br(e, t) {
            return new it(We(e, t))
        }
        let it = ( () => {
            class e {
                constructor(n) {
                    this.nativeElement = n
                }
                static{this.__NG_ELEMENT_ID__ = j0
                }
            }
            return e
        }
        )();
        class ym {
        }
        let $0 = ( () => {
            class e {
                static{this.\u0275prov = S({
                    token: e,
                    providedIn: "root",
                    factory: () => null
                })
                }
            }
            return e
        }
        )();
        class oi {
            constructor(t) {
                this.full = t,
                this.major = t.split(".")[0],
                this.minor = t.split(".")[1],
                this.patch = t.split(".").slice(2).join(".")
            }
        }
        const U0 = new oi("16.2.12")
          , yl = {};
        function wm(e, t=null, n=null, r) {
            const o = _m(e, t, n, r);
            return o.resolveInjectorInitializers(),
            o
        }
        function _m(e, t=null, n=null, r, o=new Set) {
            const i = [n || z, y0(e)];
            return r = r || ("object" == typeof e ? void 0 : Ce(e)),
            new kr(i,t || Xs(),r || null,o)
        }
        let st = ( () => {
            class e {
                static{this.THROW_IF_NOT_FOUND = Ao
                }static{this.NULL = new Kc
                }static create(n, r) {
                    if (Array.isArray(n))
                        return wm({
                            name: ""
                        }, r, n, "");
                    {
                        const o = n.name ?? "";
                        return wm({
                            name: o
                        }, n.parent, n.providers, o)
                    }
                }
                static{this.\u0275prov = S({
                    token: e,
                    providedIn: "any",
                    factory: () => M(rm)
                })
                }static{this.__NG_ELEMENT_ID__ = -1
                }
            }
            return e
        }
        )();
        function Dl(e) {
            return e.ngOriginalError
        }
        class an {
            constructor() {
                this._console = console
            }
            handleError(t) {
                const n = this._findOriginalError(t);
                this._console.error("ERROR", t),
                n && this._console.error("ORIGINAL ERROR", n)
            }
            _findOriginalError(t) {
                let n = t && Dl(t);
                for (; n && Dl(n); )
                    n = Dl(n);
                return n || null
            }
        }
        function Cl(e) {
            return t => {
                setTimeout(e, void 0, t)
            }
        }
        const le = class X0 extends Et {
            constructor(t=!1) {
                super(),
                this.__isAsync = t
            }
            emit(t) {
                super.next(t)
            }
            subscribe(t, n, r) {
                let o = t
                  , i = n || ( () => null)
                  , s = r;
                if (t && "object" == typeof t) {
                    const u = t;
                    o = u.next?.bind(u),
                    i = u.error?.bind(u),
                    s = u.complete?.bind(u)
                }
                this.__isAsync && (i = Cl(i),
                o && (o = Cl(o)),
                s && (s = Cl(s)));
                const a = super.subscribe({
                    next: o,
                    error: i,
                    complete: s
                });
                return t instanceof Je && t.add(a),
                a
            }
        }
        ;
        function bm(...e) {}
        class re {
            constructor({enableLongStackTrace: t=!1, shouldCoalesceEventChangeDetection: n=!1, shouldCoalesceRunChangeDetection: r=!1}) {
                if (this.hasPendingMacrotasks = !1,
                this.hasPendingMicrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new le(!1),
                this.onMicrotaskEmpty = new le(!1),
                this.onStable = new le(!1),
                this.onError = new le(!1),
                typeof Zone > "u")
                    throw new C(908,!1);
                Zone.assertZonePatched();
                const o = this;
                o._nesting = 0,
                o._outer = o._inner = Zone.current,
                Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)),
                t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
                o.shouldCoalesceEventChangeDetection = !r && n,
                o.shouldCoalesceRunChangeDetection = r,
                o.lastRequestAnimationFrameId = -1,
                o.nativeRequestAnimationFrame = function J0() {
                    const e = "function" == typeof te.requestAnimationFrame;
                    let t = te[e ? "requestAnimationFrame" : "setTimeout"]
                      , n = te[e ? "cancelAnimationFrame" : "clearTimeout"];
                    if (typeof Zone < "u" && t && n) {
                        const r = t[Zone.__symbol__("OriginalDelegate")];
                        r && (t = r);
                        const o = n[Zone.__symbol__("OriginalDelegate")];
                        o && (n = o)
                    }
                    return {
                        nativeRequestAnimationFrame: t,
                        nativeCancelAnimationFrame: n
                    }
                }().nativeRequestAnimationFrame,
                function tA(e) {
                    const t = () => {
                        !function eA(e) {
                            e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(te, () => {
                                e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                    e.lastRequestAnimationFrameId = -1,
                                    _l(e),
                                    e.isCheckStableRunning = !0,
                                    wl(e),
                                    e.isCheckStableRunning = !1
                                }
                                , void 0, () => {}
                                , () => {}
                                )),
                                e.fakeTopEventTask.invoke()
                            }
                            ),
                            _l(e))
                        }(e)
                    }
                    ;
                    e._inner = e._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (n, r, o, i, s, a) => {
                            if (function rA(e) {
                                return !(!Array.isArray(e) || 1 !== e.length) && !0 === e[0].data?.__ignore_ng_zone__
                            }(a))
                                return n.invokeTask(o, i, s, a);
                            try {
                                return Im(e),
                                n.invokeTask(o, i, s, a)
                            } finally {
                                (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && t(),
                                Mm(e)
                            }
                        }
                        ,
                        onInvoke: (n, r, o, i, s, a, u) => {
                            try {
                                return Im(e),
                                n.invoke(o, i, s, a, u)
                            } finally {
                                e.shouldCoalesceRunChangeDetection && t(),
                                Mm(e)
                            }
                        }
                        ,
                        onHasTask: (n, r, o, i) => {
                            n.hasTask(o, i),
                            r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask,
                            _l(e),
                            wl(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                        }
                        ,
                        onHandleError: (n, r, o, i) => (n.handleError(o, i),
                        e.runOutsideAngular( () => e.onError.emit(i)),
                        !1)
                    })
                }(o)
            }
            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!re.isInAngularZone())
                    throw new C(909,!1)
            }
            static assertNotInAngularZone() {
                if (re.isInAngularZone())
                    throw new C(909,!1)
            }
            run(t, n, r) {
                return this._inner.run(t, n, r)
            }
            runTask(t, n, r, o) {
                const i = this._inner
                  , s = i.scheduleEventTask("NgZoneEvent: " + o, t, K0, bm, bm);
                try {
                    return i.runTask(s, n, r)
                } finally {
                    i.cancelTask(s)
                }
            }
            runGuarded(t, n, r) {
                return this._inner.runGuarded(t, n, r)
            }
            runOutsideAngular(t) {
                return this._outer.run(t)
            }
        }
        const K0 = {};
        function wl(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                try {
                    e._nesting++,
                    e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--,
                    !e.hasPendingMicrotasks)
                        try {
                            e.runOutsideAngular( () => e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                }
        }
        function _l(e) {
            e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
        }
        function Im(e) {
            e._nesting++,
            e.isStable && (e.isStable = !1,
            e.onUnstable.emit(null))
        }
        function Mm(e) {
            e._nesting--,
            wl(e)
        }
        class nA {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new le,
                this.onMicrotaskEmpty = new le,
                this.onStable = new le,
                this.onError = new le
            }
            run(t, n, r) {
                return t.apply(n, r)
            }
            runGuarded(t, n, r) {
                return t.apply(n, r)
            }
            runOutsideAngular(t) {
                return t()
            }
            runTask(t, n, r, o) {
                return t.apply(n, r)
            }
        }
        const Sm = new I("",{
            providedIn: "root",
            factory: Am
        });
        function Am() {
            const e = E(re);
            let t = !0;
            return function eI(...e) {
                const t = So(e)
                  , n = function Wb(e, t) {
                    return "number" == typeof ju(e) ? e.pop() : t
                }(e, 1 / 0)
                  , r = e;
                return r.length ? 1 === r.length ? Ke(r[0]) : lr(n)(De(r, t)) : kt
            }(new fe(o => {
                t = e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks,
                e.runOutsideAngular( () => {
                    o.next(t),
                    o.complete()
                }
                )
            }
            ), new fe(o => {
                let i;
                e.runOutsideAngular( () => {
                    i = e.onStable.subscribe( () => {
                        re.assertNotInAngularZone(),
                        queueMicrotask( () => {
                            !t && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks && (t = !0,
                            o.next(!0))
                        }
                        )
                    }
                    )
                }
                );
                const s = e.onUnstable.subscribe( () => {
                    re.assertInAngularZone(),
                    t && (t = !1,
                    e.runOutsideAngular( () => {
                        o.next(!1)
                    }
                    ))
                }
                );
                return () => {
                    i.unsubscribe(),
                    s.unsubscribe()
                }
            }
            ).pipe(kh()))
        }
        function un(e) {
            return e instanceof Function ? e() : e
        }
        let El = ( () => {
            class e {
                constructor() {
                    this.renderDepth = 0,
                    this.handler = null
                }
                begin() {
                    this.handler?.validateBegin(),
                    this.renderDepth++
                }
                end() {
                    this.renderDepth--,
                    0 === this.renderDepth && this.handler?.execute()
                }
                ngOnDestroy() {
                    this.handler?.destroy(),
                    this.handler = null
                }
                static{this.\u0275prov = S({
                    token: e,
                    providedIn: "root",
                    factory: () => new e
                })
                }
            }
            return e
        }
        )();
        function ii(e) {
            for (; e; ) {
                e[L] |= 64;
                const t = Yo(e);
                if (oc(e) && !t)
                    return e;
                e = t
            }
            return null
        }
        const Om = new I("",{
            providedIn: "root",
            factory: () => !1
        });
        let aa = null;
        function Lm(e, t) {
            return e[t] ?? Bm()
        }
        function Vm(e, t) {
            const n = Bm();
            n.producerNode?.length && (e[t] = aa,
            n.lView = e,
            aa = jm())
        }
        const hA = {
            ...cp,
            consumerIsAlwaysLive: !0,
            consumerMarkedDirty: e => {
                ii(e.lView)
            }
            ,
            lView: null
        };
        function jm() {
            return Object.create(hA)
        }
        function Bm() {
            return aa ??= jm(),
            aa
        }
        const k = {};
        function si(e) {
            Hm(U(), v(), Ve() + e, !1)
        }
        function Hm(e, t, n, r) {
            if (!r)
                if (3 == (3 & t[L])) {
                    const i = e.preOrderCheckHooks;
                    null !== i && Es(t, i, n)
                } else {
                    const i = e.preOrderHooks;
                    null !== i && bs(t, i, 0, n)
                }
            Gn(n)
        }
        function w(e, t=B.Default) {
            const n = v();
            return null === n ? M(e, t) : eg(Ae(), n, x(e), t)
        }
        function ua(e, t, n, r, o, i, s, a, u, c, l) {
            const d = t.blueprint.slice();
            return d[ce] = o,
            d[L] = 140 | r,
            (null !== c || e && 2048 & e[L]) && (d[L] |= 2048),
            Tp(d),
            d[se] = d[gr] = e,
            d[he] = n,
            d[pr] = s || e && e[pr],
            d[F] = a || e && e[F],
            d[_n] = u || e && e[_n] || null,
            d[Ne] = i,
            d[Fo] = function vS() {
                return yS++
            }(),
            d[tn] = l,
            d[ip] = c,
            d[pe] = 2 == t.type ? e[pe] : d,
            d
        }
        function Ur(e, t, n, r, o) {
            let i = e.data[t];
            if (null === i)
                i = function bl(e, t, n, r, o) {
                    const i = Fp()
                      , s = pc()
                      , u = e.data[t] = function wA(e, t, n, r, o, i) {
                        let s = t ? t.injectorIndex : -1
                          , a = 0;
                        return function Cr() {
                            return null !== R.skipHydrationRootTNode
                        }() && (a |= 128),
                        {
                            type: n,
                            index: r,
                            insertBeforeIndex: null,
                            injectorIndex: s,
                            directiveStart: -1,
                            directiveEnd: -1,
                            directiveStylingLast: -1,
                            componentOffset: -1,
                            propertyBindings: null,
                            flags: a,
                            providerIndexes: 0,
                            value: o,
                            attrs: i,
                            mergedAttrs: null,
                            localNames: null,
                            initialInputs: void 0,
                            inputs: null,
                            outputs: null,
                            tView: null,
                            next: null,
                            prev: null,
                            projectionNext: null,
                            child: null,
                            parent: t,
                            projection: null,
                            styles: null,
                            stylesWithoutHost: null,
                            residualStyles: void 0,
                            classes: null,
                            classesWithoutHost: null,
                            residualClasses: void 0,
                            classBindings: 0,
                            styleBindings: 0
                        }
                    }(0, s ? i : i && i.parent, n, t, r, o);
                    return null === e.firstChild && (e.firstChild = u),
                    null !== i && (s ? null == i.child && null !== u.parent && (i.child = u) : null === i.next && (i.next = u,
                    u.prev = i)),
                    u
                }(e, t, n, r, o),
                function yM() {
                    return R.lFrame.inI18n
                }() && (i.flags |= 32);
            else if (64 & i.type) {
                i.type = n,
                i.value = r,
                i.attrs = o;
                const s = function Bo() {
                    const e = R.lFrame
                      , t = e.currentTNode;
                    return e.isParent ? t : t.parent
                }();
                i.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return Ht(i, !0),
            i
        }
        function ai(e, t, n, r) {
            if (0 === n)
                return -1;
            const o = t.length;
            for (let i = 0; i < n; i++)
                t.push(r),
                e.blueprint.push(r),
                e.data.push(null);
            return o
        }
        function Um(e, t, n, r, o) {
            const i = Lm(t, ko)
              , s = Ve()
              , a = 2 & r;
            try {
                Gn(-1),
                a && t.length > H && Hm(e, t, H, !1),
                Bt(a ? 2 : 0, o);
                const c = a ? i : null
                  , l = sc(c);
                try {
                    null !== c && (c.dirty = !1),
                    n(r, o)
                } finally {
                    ac(c, l)
                }
            } finally {
                a && null === t[ko] && Vm(t, ko),
                Gn(s),
                Bt(a ? 3 : 1, o)
            }
        }
        function Il(e, t, n) {
            if (rc(t)) {
                const r = mt(null);
                try {
                    const i = t.directiveEnd;
                    for (let s = t.directiveStart; s < i; s++) {
                        const a = e.data[s];
                        a.contentQueries && a.contentQueries(1, n[s], s)
                    }
                } finally {
                    mt(r)
                }
            }
        }
        function Ml(e, t, n) {
            Pp() && (function AA(e, t, n, r) {
                const o = n.directiveStart
                  , i = n.directiveEnd;
                Un(n) && function FA(e, t, n) {
                    const r = We(t, e)
                      , o = zm(n);
                    let s = 16;
                    n.signals ? s = 4096 : n.onPush && (s = 64);
                    const a = ca(e, ua(e, o, null, s, r, t, null, e[pr].rendererFactory.createRenderer(r, n), null, null, null));
                    e[t.index] = a
                }(t, n, e.data[o + n.componentOffset]),
                e.firstCreatePass || Ms(n, t),
                Re(r, t);
                const s = n.initialInputs;
                for (let a = o; a < i; a++) {
                    const u = e.data[a]
                      , c = qn(t, e, a, n);
                    Re(c, t),
                    null !== s && kA(0, a - o, c, u, 0, s),
                    Tt(u) && (nt(n.index, t)[he] = qn(t, e, a, n))
                }
            }(e, t, n, We(n, t)),
            64 == (64 & n.flags) && Ym(e, t, n))
        }
        function Sl(e, t, n=We) {
            const r = t.localNames;
            if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                    const s = r[i + 1]
                      , a = -1 === s ? n(t, e) : e[s];
                    e[o++] = a
                }
            }
        }
        function zm(e) {
            const t = e.tView;
            return null === t || t.incompleteFirstPass ? e.tView = Al(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t
        }
        function Al(e, t, n, r, o, i, s, a, u, c, l) {
            const d = H + r
              , f = d + o
              , h = function gA(e, t) {
                const n = [];
                for (let r = 0; r < t; r++)
                    n.push(r < e ? null : k);
                return n
            }(d, f)
              , p = "function" == typeof c ? c() : c;
            return h[_] = {
                type: e,
                blueprint: h,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: t,
                data: h.slice().fill(null, d),
                bindingStartIndex: d,
                expandoStartIndex: f,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof i ? i() : i,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: u,
                consts: p,
                incompleteFirstPass: !1,
                ssrId: l
            }
        }
        let Gm = e => null;
        function qm(e, t, n, r) {
            for (let o in e)
                if (e.hasOwnProperty(o)) {
                    n = null === n ? {} : n;
                    const i = e[o];
                    null === r ? Wm(n, t, o, i) : r.hasOwnProperty(o) && Wm(n, t, r[o], i)
                }
            return n
        }
        function Wm(e, t, n, r) {
            e.hasOwnProperty(n) ? e[n].push(t, r) : e[n] = [t, r]
        }
        function Tl(e, t, n, r) {
            if (Pp()) {
                const o = null === r ? null : {
                    "": -1
                }
                  , i = function NA(e, t) {
                    const n = e.directiveRegistry;
                    let r = null
                      , o = null;
                    if (n)
                        for (let i = 0; i < n.length; i++) {
                            const s = n[i];
                            if (Kh(t, s.selectors, !1))
                                if (r || (r = []),
                                Tt(s))
                                    if (null !== s.findHostDirectiveDefs) {
                                        const a = [];
                                        o = o || new Map,
                                        s.findHostDirectiveDefs(s, a, o),
                                        r.unshift(...a, s),
                                        Nl(e, t, a.length)
                                    } else
                                        r.unshift(s),
                                        Nl(e, t, 0);
                                else
                                    o = o || new Map,
                                    s.findHostDirectiveDefs?.(s, r, o),
                                    r.push(s)
                        }
                    return null === r ? null : [r, o]
                }(e, n);
                let s, a;
                null === i ? s = a = null : [s,a] = i,
                null !== s && Zm(e, t, n, s, o, a),
                o && function RA(e, t, n) {
                    if (t) {
                        const r = e.localNames = [];
                        for (let o = 0; o < t.length; o += 2) {
                            const i = n[t[o + 1]];
                            if (null == i)
                                throw new C(-301,!1);
                            r.push(t[o], i)
                        }
                    }
                }(n, r, o)
            }
            n.mergedAttrs = Ro(n.mergedAttrs, n.attrs)
        }
        function Zm(e, t, n, r, o, i) {
            for (let c = 0; c < r.length; c++)
                Mc(Ms(n, t), e, r[c].type);
            !function OA(e, t, n) {
                e.flags |= 1,
                e.directiveStart = t,
                e.directiveEnd = t + n,
                e.providerIndexes = t
            }(n, e.data.length, r.length);
            for (let c = 0; c < r.length; c++) {
                const l = r[c];
                l.providersResolver && l.providersResolver(l)
            }
            let s = !1
              , a = !1
              , u = ai(e, t, r.length, null);
            for (let c = 0; c < r.length; c++) {
                const l = r[c];
                n.mergedAttrs = Ro(n.mergedAttrs, l.hostAttrs),
                PA(e, n, t, u, l),
                xA(u, l, o),
                null !== l.contentQueries && (n.flags |= 4),
                (null !== l.hostBindings || null !== l.hostAttrs || 0 !== l.hostVars) && (n.flags |= 64);
                const d = l.type.prototype;
                !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index),
                s = !0),
                !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index),
                a = !0),
                u++
            }
            !function _A(e, t, n) {
                const o = t.directiveEnd
                  , i = e.data
                  , s = t.attrs
                  , a = [];
                let u = null
                  , c = null;
                for (let l = t.directiveStart; l < o; l++) {
                    const d = i[l]
                      , f = n ? n.get(d) : null
                      , p = f ? f.outputs : null;
                    u = qm(d.inputs, l, u, f ? f.inputs : null),
                    c = qm(d.outputs, l, c, p);
                    const g = null === u || null === s || Jh(t) ? null : LA(u, l, s);
                    a.push(g)
                }
                null !== u && (u.hasOwnProperty("class") && (t.flags |= 8),
                u.hasOwnProperty("style") && (t.flags |= 16)),
                t.initialInputs = a,
                t.inputs = u,
                t.outputs = c
            }(e, n, i)
        }
        function Ym(e, t, n) {
            const r = n.directiveStart
              , o = n.directiveEnd
              , i = n.index
              , s = function DM() {
                return R.lFrame.currentDirectiveIndex
            }();
            try {
                Gn(i);
                for (let a = r; a < o; a++) {
                    const u = e.data[a]
                      , c = t[a];
                    mc(a),
                    (null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && TA(u, c)
                }
            } finally {
                Gn(-1),
                mc(s)
            }
        }
        function TA(e, t) {
            null !== e.hostBindings && e.hostBindings(1, t)
        }
        function Nl(e, t, n) {
            t.componentOffset = n,
            (e.components ??= []).push(t.index)
        }
        function xA(e, t, n) {
            if (n) {
                if (t.exportAs)
                    for (let r = 0; r < t.exportAs.length; r++)
                        n[t.exportAs[r]] = e;
                Tt(t) && (n[""] = e)
            }
        }
        function PA(e, t, n, r, o) {
            e.data[r] = o;
            const i = o.factory || (o.factory = zn(o.type))
              , s = new Ho(i,Tt(o),w);
            e.blueprint[r] = s,
            n[r] = s,
            function MA(e, t, n, r, o) {
                const i = o.hostBindings;
                if (i) {
                    let s = e.hostBindingOpCodes;
                    null === s && (s = e.hostBindingOpCodes = []);
                    const a = ~t.index;
                    (function SA(e) {
                        let t = e.length;
                        for (; t > 0; ) {
                            const n = e[--t];
                            if ("number" == typeof n && n < 0)
                                return n
                        }
                        return 0
                    }
                    )(s) != a && s.push(a),
                    s.push(n, r, i)
                }
            }(e, t, r, ai(e, n, o.hostVars, k), o)
        }
        function kA(e, t, n, r, o, i) {
            const s = i[t];
            if (null !== s)
                for (let a = 0; a < s.length; )
                    Qm(r, n, s[a++], s[a++], s[a++])
        }
        function Qm(e, t, n, r, o) {
            const i = mt(null);
            try {
                const s = e.inputTransforms;
                null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
                null !== e.setInput ? e.setInput(t, o, n, r) : t[r] = o
            } finally {
                mt(i)
            }
        }
        function LA(e, t, n) {
            let r = null
              , o = 0;
            for (; o < n.length; ) {
                const i = n[o];
                if (0 !== i)
                    if (5 !== i) {
                        if ("number" == typeof i)
                            break;
                        if (e.hasOwnProperty(i)) {
                            null === r && (r = []);
                            const s = e[i];
                            for (let a = 0; a < s.length; a += 2)
                                if (s[a] === t) {
                                    r.push(i, s[a + 1], n[o + 1]);
                                    break
                                }
                        }
                        o += 2
                    } else
                        o += 2;
                else
                    o += 4
            }
            return r
        }
        function Xm(e, t, n, r) {
            return [e, !0, !1, t, null, 0, r, n, null, null, null]
        }
        function Jm(e, t) {
            const n = e.contentQueries;
            if (null !== n)
                for (let r = 0; r < n.length; r += 2) {
                    const i = n[r + 1];
                    if (-1 !== i) {
                        const s = e.data[i];
                        vc(n[r]),
                        s.contentQueries(2, t[i], i)
                    }
                }
        }
        function ca(e, t) {
            return e[Oo] ? e[op][At] = t : e[Oo] = t,
            e[op] = t,
            t
        }
        function xl(e, t, n) {
            vc(0);
            const r = mt(null);
            try {
                t(e, n)
            } finally {
                mt(r)
            }
        }
        function ny(e, t) {
            const n = e[_n]
              , r = n ? n.get(an, null) : null;
            r && r.handleError(t)
        }
        function Ol(e, t, n, r, o) {
            for (let i = 0; i < n.length; ) {
                const s = n[i++]
                  , a = n[i++];
                Qm(e.data[s], t[s], r, a, o)
            }
        }
        function cn(e, t, n) {
            const r = function Cs(e, t) {
                return ne(t[e])
            }(t, e);
            !function Ng(e, t, n) {
                e.setValue(t, n)
            }(e[F], r, n)
        }
        function VA(e, t) {
            const n = nt(t, e)
              , r = n[_];
            !function jA(e, t) {
                for (let n = t.length; n < e.blueprint.length; n++)
                    t.push(e.blueprint[n])
            }(r, n);
            const o = n[ce];
            null !== o && null === n[tn] && (n[tn] = pl(o, n[_n])),
            Pl(r, n, n[he])
        }
        function Pl(e, t, n) {
            Dc(t);
            try {
                const r = e.viewQuery;
                null !== r && xl(1, r, n);
                const o = e.template;
                null !== o && Um(e, t, o, 1, n),
                e.firstCreatePass && (e.firstCreatePass = !1),
                e.staticContentQueries && Jm(e, t),
                e.staticViewQueries && xl(2, e.viewQuery, n);
                const i = e.components;
                null !== i && function BA(e, t) {
                    for (let n = 0; n < t.length; n++)
                        VA(e, t[n])
                }(t, i)
            } catch (r) {
                throw e.firstCreatePass && (e.incompleteFirstPass = !0,
                e.firstCreatePass = !1),
                r
            } finally {
                t[L] &= -5,
                Cc()
            }
        }
        let ry = ( () => {
            class e {
                constructor() {
                    this.all = new Set,
                    this.queue = new Map
                }
                create(n, r, o) {
                    const i = typeof Zone > "u" ? null : Zone.current
                      , s = function YI(e, t, n) {
                        const r = Object.create(QI);
                        n && (r.consumerAllowSignalWrites = !0),
                        r.fn = e,
                        r.schedule = t;
                        const o = s => {
                            r.cleanupFn = s
                        }
                        ;
                        return r.ref = {
                            notify: () => hp(r),
                            run: () => {
                                if (r.dirty = !1,
                                r.hasRun && !pp(r))
                                    return;
                                r.hasRun = !0;
                                const s = sc(r);
                                try {
                                    r.cleanupFn(),
                                    r.cleanupFn = _p,
                                    r.fn(o)
                                } finally {
                                    ac(r, s)
                                }
                            }
                            ,
                            cleanup: () => r.cleanupFn()
                        },
                        r.ref
                    }(n, c => {
                        this.all.has(c) && this.queue.set(c, i)
                    }
                    , o);
                    let a;
                    this.all.add(s),
                    s.notify();
                    const u = () => {
                        s.cleanup(),
                        a?.(),
                        this.all.delete(s),
                        this.queue.delete(s)
                    }
                    ;
                    return a = r?.onDestroy(u),
                    {
                        destroy: u
                    }
                }
                flush() {
                    if (0 !== this.queue.size)
                        for (const [n,r] of this.queue)
                            this.queue.delete(n),
                            r ? r.run( () => n.run()) : n.run()
                }
                get isQueueEmpty() {
                    return 0 === this.queue.size
                }
                static{this.\u0275prov = S({
                    token: e,
                    providedIn: "root",
                    factory: () => new e
                })
                }
            }
            return e
        }
        )();
        function la(e, t, n) {
            let r = n ? e.styles : null
              , o = n ? e.classes : null
              , i = 0;
            if (null !== t)
                for (let s = 0; s < t.length; s++) {
                    const a = t[s];
                    "number" == typeof a ? i = a : 1 == i ? o = Hu(o, a) : 2 == i && (r = Hu(r, a + ": " + t[++s] + ";"))
                }
            n ? e.styles = r : e.stylesWithoutHost = r,
            n ? e.classes = o : e.classesWithoutHost = o
        }
        function ui(e, t, n, r, o=!1) {
            for (; null !== n; ) {
                const i = t[n.index];
                null !== i && r.push(ne(i)),
                ke(i) && oy(i, r);
                const s = n.type;
                if (8 & s)
                    ui(e, t, n.child, r);
                else if (32 & s) {
                    const a = Vc(n, t);
                    let u;
                    for (; u = a(); )
                        r.push(u)
                } else if (16 & s) {
                    const a = jg(t, n);
                    if (Array.isArray(a))
                        r.push(...a);
                    else {
                        const u = Yo(t[pe]);
                        ui(u[_], u, a, r, !0)
                    }
                }
                n = o ? n.projectionNext : n.next
            }
            return r
        }
        function oy(e, t) {
            for (let n = Me; n < e.length; n++) {
                const r = e[n]
                  , o = r[_].firstChild;
                null !== o && ui(r[_], r, o, t)
            }
            e[jt] !== e[ce] && t.push(e[jt])
        }
        function da(e, t, n, r=!0) {
            const o = t[pr]
              , i = o.rendererFactory
              , s = o.afterRenderEventManager;
            i.begin?.(),
            s?.begin();
            try {
                iy(e, t, e.template, n)
            } catch (u) {
                throw r && ny(t, u),
                u
            } finally {
                i.end?.(),
                o.effectManager?.flush(),
                s?.end()
            }
        }
        function iy(e, t, n, r) {
            const o = t[L];
            if (256 != (256 & o)) {
                t[pr].effectManager?.flush(),
                Dc(t);
                try {
                    Tp(t),
                    function Lp(e) {
                        return R.lFrame.bindingIndex = e
                    }(e.bindingStartIndex),
                    null !== n && Um(e, t, n, 2, r);
                    const s = 3 == (3 & o);
                    if (s) {
                        const c = e.preOrderCheckHooks;
                        null !== c && Es(t, c, null)
                    } else {
                        const c = e.preOrderHooks;
                        null !== c && bs(t, c, 0, null),
                        wc(t, 0)
                    }
                    if (function UA(e) {
                        for (let t = Sg(e); null !== t; t = Ag(t)) {
                            if (!t[sp])
                                continue;
                            const n = t[yr];
                            for (let r = 0; r < n.length; r++) {
                                sM(n[r])
                            }
                        }
                    }(t),
                    sy(t, 2),
                    null !== e.contentQueries && Jm(e, t),
                    s) {
                        const c = e.contentCheckHooks;
                        null !== c && Es(t, c)
                    } else {
                        const c = e.contentHooks;
                        null !== c && bs(t, c, 1),
                        wc(t, 1)
                    }
                    !function pA(e, t) {
                        const n = e.hostBindingOpCodes;
                        if (null === n)
                            return;
                        const r = Lm(t, Lo);
                        try {
                            for (let o = 0; o < n.length; o++) {
                                const i = n[o];
                                if (i < 0)
                                    Gn(~i);
                                else {
                                    const s = i
                                      , a = n[++o]
                                      , u = n[++o];
                                    vM(a, s),
                                    r.dirty = !1;
                                    const c = sc(r);
                                    try {
                                        u(2, t[s])
                                    } finally {
                                        ac(r, c)
                                    }
                                }
                            }
                        } finally {
                            null === t[Lo] && Vm(t, Lo),
                            Gn(-1)
                        }
                    }(e, t);
                    const a = e.components;
                    null !== a && uy(t, a, 0);
                    const u = e.viewQuery;
                    if (null !== u && xl(2, u, r),
                    s) {
                        const c = e.viewCheckHooks;
                        null !== c && Es(t, c)
                    } else {
                        const c = e.viewHooks;
                        null !== c && bs(t, c, 2),
                        wc(t, 2)
                    }
                    !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
                    t[L] &= -73,
                    Np(t)
                } finally {
                    Cc()
                }
            }
        }
        function sy(e, t) {
            for (let n = Sg(e); null !== n; n = Ag(n))
                for (let r = Me; r < n.length; r++)
                    ay(n[r], t)
        }
        function zA(e, t, n) {
            ay(nt(t, e), n)
        }
        function ay(e, t) {
            if (!function oM(e) {
                return 128 == (128 & e[L])
            }(e))
                return;
            const n = e[_]
              , r = e[L];
            if (80 & r && 0 === t || 1024 & r || 2 === t)
                iy(n, e, n.template, e[he]);
            else if (e[xo] > 0) {
                sy(e, 1);
                const o = n.components;
                null !== o && uy(e, o, 1)
            }
        }
        function uy(e, t, n) {
            for (let r = 0; r < t.length; r++)
                zA(e, t[r], n)
        }
        class ci {
            get rootNodes() {
                const t = this._lView
                  , n = t[_];
                return ui(n, t, n.firstChild, [])
            }
            constructor(t, n) {
                this._lView = t,
                this._cdRefInjectingView = n,
                this._appRef = null,
                this._attachedToViewContainer = !1
            }
            get context() {
                return this._lView[he]
            }
            set context(t) {
                this._lView[he] = t
            }
            get destroyed() {
                return 256 == (256 & this._lView[L])
            }
            destroy() {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._attachedToViewContainer) {
                    const t = this._lView[se];
                    if (ke(t)) {
                        const n = t[8]
                          , r = n ? n.indexOf(this) : -1;
                        r > -1 && ($s(t, r),
                        Ns(n, r))
                    }
                    this._attachedToViewContainer = !1
                }
                Bc(this._lView[_], this._lView)
            }
            onDestroy(t) {
                !function xp(e, t) {
                    if (256 == (256 & e[L]))
                        throw new C(911,!1);
                    null === e[En] && (e[En] = []),
                    e[En].push(t)
                }(this._lView, t)
            }
            markForCheck() {
                ii(this._cdRefInjectingView || this._lView)
            }
            detach() {
                this._lView[L] &= -129
            }
            reattach() {
                this._lView[L] |= 128
            }
            detectChanges() {
                da(this._lView[_], this._lView, this.context)
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
                if (this._appRef)
                    throw new C(902,!1);
                this._attachedToViewContainer = !0
            }
            detachFromAppRef() {
                this._appRef = null,
                function xS(e, t) {
                    Xo(e, t, t[F], 2, null, null)
                }(this._lView[_], this._lView)
            }
            attachToAppRef(t) {
                if (this._attachedToViewContainer)
                    throw new C(902,!1);
                this._appRef = t
            }
        }
        class GA extends ci {
            constructor(t) {
                super(t),
                this._view = t
            }
            detectChanges() {
                const t = this._view;
                da(t[_], t, t[he], !1)
            }
            checkNoChanges() {}
            get context() {
                return null
            }
        }
        class cy extends oa {
            constructor(t) {
                super(),
                this.ngModule = t
            }
            resolveComponentFactory(t) {
                const n = $(t);
                return new li(n,this.ngModule)
            }
        }
        function ly(e) {
            const t = [];
            for (let n in e)
                e.hasOwnProperty(n) && t.push({
                    propName: e[n],
                    templateName: n
                });
            return t
        }
        class WA {
            constructor(t, n) {
                this.injector = t,
                this.parentInjector = n
            }
            get(t, n, r) {
                r = ds(r);
                const o = this.injector.get(t, yl, r);
                return o !== yl || n === yl ? o : this.parentInjector.get(t, n, r)
            }
        }
        class li extends gm {
            get inputs() {
                const t = this.componentDef
                  , n = t.inputTransforms
                  , r = ly(t.inputs);
                if (null !== n)
                    for (const o of r)
                        n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
                return r
            }
            get outputs() {
                return ly(this.componentDef.outputs)
            }
            constructor(t, n) {
                super(),
                this.componentDef = t,
                this.ngModule = n,
                this.componentType = t.type,
                this.selector = function NI(e) {
                    return e.map(TI).join(",")
                }(t.selectors),
                this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [],
                this.isBoundToModule = !!n
            }
            create(t, n, r, o) {
                let i = (o = o || this.ngModule)instanceof ot ? o : o?.injector;
                i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                const s = i ? new WA(t,i) : t
                  , a = s.get(ym, null);
                if (null === a)
                    throw new C(407,!1);
                const d = {
                    rendererFactory: a,
                    sanitizer: s.get($0, null),
                    effectManager: s.get(ry, null),
                    afterRenderEventManager: s.get(El, null)
                }
                  , f = a.createRenderer(null, this.componentDef)
                  , h = this.componentDef.selectors[0][0] || "div"
                  , p = r ? function mA(e, t, n, r) {
                    const i = r.get(Om, !1) || n === It.ShadowDom
                      , s = e.selectRootElement(t, i);
                    return function yA(e) {
                        Gm(e)
                    }(s),
                    s
                }(f, r, this.componentDef.encapsulation, s) : Hs(f, h, function qA(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null
                }(h))
                  , D = this.componentDef.signals ? 4608 : this.componentDef.onPush ? 576 : 528;
                let m = null;
                null !== p && (m = pl(p, s, !0));
                const b = Al(0, null, null, 1, 0, null, null, null, null, null, null)
                  , A = ua(null, b, null, D, null, null, d, f, s, null, m);
                let j, Ee;
                Dc(A);
                try {
                    const Xt = this.componentDef;
                    let cr, ch = null;
                    Xt.findHostDirectiveDefs ? (cr = [],
                    ch = new Map,
                    Xt.findHostDirectiveDefs(Xt, cr, ch),
                    cr.push(Xt)) : cr = [Xt];
                    const $j = function YA(e, t) {
                        const n = e[_]
                          , r = H;
                        return e[r] = t,
                        Ur(n, r, 2, "#host", null)
                    }(A, p)
                      , Uj = function QA(e, t, n, r, o, i, s) {
                        const a = o[_];
                        !function XA(e, t, n, r) {
                            for (const o of e)
                                t.mergedAttrs = Ro(t.mergedAttrs, o.hostAttrs);
                            null !== t.mergedAttrs && (la(t, t.mergedAttrs, !0),
                            null !== n && Ug(r, n, t))
                        }(r, e, t, s);
                        let u = null;
                        null !== t && (u = pl(t, o[_n]));
                        const c = i.rendererFactory.createRenderer(t, n);
                        let l = 16;
                        n.signals ? l = 4096 : n.onPush && (l = 64);
                        const d = ua(o, zm(n), null, l, o[e.index], e, i, c, null, null, u);
                        return a.firstCreatePass && Nl(a, e, r.length - 1),
                        ca(o, d),
                        o[e.index] = d
                    }($j, p, Xt, cr, A, d, f);
                    Ee = Ap(b, H),
                    p && function KA(e, t, n, r) {
                        if (r)
                            tc(e, n, ["ng-version", U0.full]);
                        else {
                            const {attrs: o, classes: i} = function RI(e) {
                                const t = []
                                  , n = [];
                                let r = 1
                                  , o = 2;
                                for (; r < e.length; ) {
                                    let i = e[r];
                                    if ("string" == typeof i)
                                        2 === o ? "" !== i && t.push(i, e[++r]) : 8 === o && n.push(i);
                                    else {
                                        if (!Mt(o))
                                            break;
                                        o = i
                                    }
                                    r++
                                }
                                return {
                                    attrs: t,
                                    classes: n
                                }
                            }(t.selectors[0]);
                            o && tc(e, n, o),
                            i && i.length > 0 && $g(e, n, i.join(" "))
                        }
                    }(f, Xt, p, r),
                    void 0 !== n && function eT(e, t, n) {
                        const r = e.projection = [];
                        for (let o = 0; o < t.length; o++) {
                            const i = n[o];
                            r.push(null != i ? Array.from(i) : null)
                        }
                    }(Ee, this.ngContentSelectors, n),
                    j = function JA(e, t, n, r, o, i) {
                        const s = Ae()
                          , a = o[_]
                          , u = We(s, o);
                        Zm(a, o, s, n, null, r);
                        for (let l = 0; l < n.length; l++)
                            Re(qn(o, a, s.directiveStart + l, s), o);
                        Ym(a, o, s),
                        u && Re(u, o);
                        const c = qn(o, a, s.directiveStart + s.componentOffset, s);
                        if (e[he] = o[he] = c,
                        null !== i)
                            for (const l of i)
                                l(c, t);
                        return Il(a, s, e),
                        c
                    }(Uj, Xt, cr, ch, A, [tT]),
                    Pl(b, A, null)
                } finally {
                    Cc()
                }
                return new ZA(this.componentType,j,Br(Ee, A),A,Ee)
            }
        }
        class ZA extends k0 {
            constructor(t, n, r, o, i) {
                super(),
                this.location = r,
                this._rootLView = o,
                this._tNode = i,
                this.previousInputValues = null,
                this.instance = n,
                this.hostView = this.changeDetectorRef = new GA(o),
                this.componentType = t
            }
            setInput(t, n) {
                const r = this._tNode.inputs;
                let o;
                if (null !== r && (o = r[t])) {
                    if (this.previousInputValues ??= new Map,
                    this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
                        return;
                    const i = this._rootLView;
                    Ol(i[_], i, o, t, n),
                    this.previousInputValues.set(t, n),
                    ii(nt(this._tNode.index, i))
                }
            }
            get injector() {
                return new je(this._tNode,this._rootLView)
            }
            destroy() {
                this.hostView.destroy()
            }
            onDestroy(t) {
                this.hostView.onDestroy(t)
            }
        }
        function tT() {
            const e = Ae();
            _s(v()[_], e)
        }
        function ha(e) {
            return !!function Fl(e) {
                return null !== e && ("function" == typeof e || "object" == typeof e)
            }(e) && (Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e)
        }
        function xe(e, t, n) {
            return !Object.is(e[t], n) && (e[t] = n,
            !0)
        }
        let Ty = function Ny(e, t, n, r) {
            return Mn(!0),
            t[F].createComment("")
        };
        function Hl(e) {
            return function Dr(e, t) {
                return e[t]
            }(function mM() {
                return R.lFrame.contextLView
            }(), H + e)
        }
        function $l(e, t, n) {
            const r = v();
            return xe(r, wr(), t) && function at(e, t, n, r, o, i, s, a) {
                const u = We(t, n);
                let l, c = t.inputs;
                !a && null != c && (l = c[r]) ? (Ol(e, n, l, r, o),
                Un(t) && function bA(e, t) {
                    const n = nt(t, e);
                    16 & n[L] || (n[L] |= 64)
                }(n, t.index)) : 3 & t.type && (r = function EA(e) {
                    return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
                }(r),
                o = null != s ? s(o, t.value || "", r) : o,
                i.setProperty(u, r, o))
            }(U(), function ue() {
                const e = R.lFrame;
                return Ap(e.tView, e.selectedIndex)
            }(), r, e, t, r[F], n, !1),
            $l
        }
        function Ul(e, t, n, r, o) {
            const s = o ? "class" : "style";
            Ol(e, n, t.inputs[s], s, r)
        }
        function ut(e, t, n, r) {
            const o = v()
              , i = U()
              , s = H + e
              , a = o[F]
              , u = i.firstCreatePass ? function PT(e, t, n, r, o, i) {
                const s = t.consts
                  , u = Ur(t, e, 2, r, In(s, o));
                return Tl(t, n, u, In(s, i)),
                null !== u.attrs && la(u, u.attrs, !1),
                null !== u.mergedAttrs && la(u, u.mergedAttrs, !0),
                null !== t.queries && t.queries.elementStart(t, u),
                u
            }(s, i, o, t, n, r) : i.data[s]
              , c = Ry(i, o, u, a, t, e);
            o[s] = c;
            const l = ys(u);
            return Ht(u, !0),
            Ug(a, c, u),
            32 != (32 & u.flags) && ws() && zs(i, o, c, u),
            0 === function uM() {
                return R.lFrame.elementDepthCount
            }() && Re(c, o),
            function cM() {
                R.lFrame.elementDepthCount++
            }(),
            l && (Ml(i, o, u),
            Il(i, u, o)),
            null !== r && Sl(o, u),
            ut
        }
        function ct() {
            let e = Ae();
            pc() ? function gc() {
                R.lFrame.isParent = !1
            }() : (e = e.parent,
            Ht(e, !1));
            const t = e;
            (function dM(e) {
                return R.skipHydrationRootTNode === e
            }
            )(t) && function gM() {
                R.skipHydrationRootTNode = null
            }(),
            function lM() {
                R.lFrame.elementDepthCount--
            }();
            const n = U();
            return n.firstCreatePass && (_s(n, e),
            rc(e) && n.queries.elementEnd(e)),
            null != t.classesWithoutHost && function NM(e) {
                return 0 != (8 & e.flags)
            }(t) && Ul(n, t, v(), t.classesWithoutHost, !0),
            null != t.stylesWithoutHost && function RM(e) {
                return 0 != (16 & e.flags)
            }(t) && Ul(n, t, v(), t.stylesWithoutHost, !1),
            ct
        }
        function Kr(e, t, n, r) {
            return ut(e, t, n, r),
            ct(),
            Kr
        }
        let Ry = (e, t, n, r, o, i) => (Mn(!0),
        Hs(r, o, function Gp() {
            return R.lFrame.currentNamespace
        }()));
        function ql() {
            return v()
        }
        function gi(e) {
            return !!e && "function" == typeof e.then
        }
        function Py(e) {
            return !!e && "function" == typeof e.subscribe
        }
        function Ye(e, t, n, r) {
            const o = v()
              , i = U()
              , s = Ae();
            return function ky(e, t, n, r, o, i, s) {
                const a = ys(r)
                  , c = e.firstCreatePass && function ey(e) {
                    return e.cleanup || (e.cleanup = [])
                }(e)
                  , l = t[he]
                  , d = function Km(e) {
                    return e[hr] || (e[hr] = [])
                }(t);
                let f = !0;
                if (3 & r.type || s) {
                    const g = We(r, t)
                      , y = s ? s(g) : g
                      , D = d.length
                      , m = s ? A => s(ne(A[r.index])) : r.index;
                    let b = null;
                    if (!s && a && (b = function BT(e, t, n, r) {
                        const o = e.cleanup;
                        if (null != o)
                            for (let i = 0; i < o.length - 1; i += 2) {
                                const s = o[i];
                                if (s === n && o[i + 1] === r) {
                                    const a = t[hr]
                                      , u = o[i + 2];
                                    return a.length > u ? a[u] : null
                                }
                                "string" == typeof s && (i += 2)
                            }
                        return null
                    }(e, t, o, r.index)),
                    null !== b)
                        (b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = i,
                        b.__ngLastListenerFn__ = i,
                        f = !1;
                    else {
                        i = Vy(r, t, l, i, !1);
                        const A = n.listen(y, o, i);
                        d.push(i, A),
                        c && c.push(o, m, D, D + 1)
                    }
                } else
                    i = Vy(r, t, l, i, !1);
                const h = r.outputs;
                let p;
                if (f && null !== h && (p = h[o])) {
                    const g = p.length;
                    if (g)
                        for (let y = 0; y < g; y += 2) {
                            const j = t[p[y]][p[y + 1]].subscribe(i)
                              , Ee = d.length;
                            d.push(i, j),
                            c && c.push(o, r.index, Ee, -(Ee + 1))
                        }
                }
            }(i, o, o[F], s, e, t, r),
            Ye
        }
        function Ly(e, t, n, r) {
            try {
                return Bt(6, t, n),
                !1 !== n(r)
            } catch (o) {
                return ny(e, o),
                !1
            } finally {
                Bt(7, t, n)
            }
        }
        function Vy(e, t, n, r, o) {
            return function i(s) {
                if (s === Function)
                    return r;
                ii(e.componentOffset > -1 ? nt(e.index, t) : t);
                let u = Ly(t, n, r, s)
                  , c = i.__ngNextListenerFn__;
                for (; c; )
                    u = Ly(t, n, c, s) && u,
                    c = c.__ngNextListenerFn__;
                return o && !1 === u && s.preventDefault(),
                u
            }
        }
        function jy(e=1) {
            return function wM(e) {
                return (R.lFrame.contextLView = function _M(e, t) {
                    for (; e > 0; )
                        t = t[gr],
                        e--;
                    return t
                }(e, R.lFrame.contextLView))[he]
            }(e)
        }
        function ln(e, t="") {
            const n = v()
              , r = U()
              , o = e + H
              , i = r.firstCreatePass ? Ur(r, o, 1, t, null) : r.data[o]
              , s = cv(r, n, i, t, e);
            n[o] = s,
            ws() && zs(r, n, s, i),
            Ht(i, !1)
        }
        let cv = (e, t, n, r, o) => (Mn(!0),
        function Bs(e, t) {
            return e.createText(t)
        }(t[F], r));
        function yi(e) {
            return Jl("", e, ""),
            yi
        }
        function Jl(e, t, n) {
            const r = v()
              , o = function Gr(e, t, n, r) {
                return xe(e, wr(), n) ? t + P(n) + r : k
            }(r, e, t, n);
            return o !== k && cn(r, Ve(), o),
            Jl
        }
        const no = "en-US";
        let Rv = no;
        class Kn {
        }
        class rD {
        }
        class id extends Kn {
            constructor(t, n, r) {
                super(),
                this._parent = n,
                this._bootstrapComponents = [],
                this.destroyCbs = [],
                this.componentFactoryResolver = new cy(this);
                const o = tt(t);
                this._bootstrapComponents = un(o.bootstrap),
                this._r3Injector = _m(t, n, [{
                    provide: Kn,
                    useValue: this
                }, {
                    provide: oa,
                    useValue: this.componentFactoryResolver
                }, ...r], Ce(t), new Set(["environment"])),
                this._r3Injector.resolveInjectorInitializers(),
                this.instance = this._r3Injector.get(t)
            }
            get injector() {
                return this._r3Injector
            }
            destroy() {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(),
                this.destroyCbs.forEach(n => n()),
                this.destroyCbs = null
            }
            onDestroy(t) {
                this.destroyCbs.push(t)
            }
        }
        class sd extends rD {
            constructor(t) {
                super(),
                this.moduleType = t
            }
            create(t) {
                return new id(this.moduleType,t,[])
            }
        }
        class oD extends Kn {
            constructor(t) {
                super(),
                this.componentFactoryResolver = new cy(this),
                this.instance = null;
                const n = new kr([...t.providers, {
                    provide: Kn,
                    useValue: this
                }, {
                    provide: oa,
                    useValue: this.componentFactoryResolver
                }],t.parent || Xs(),t.debugName,new Set(["environment"]));
                this.injector = n,
                t.runEnvironmentInitializers && n.resolveInjectorInitializers()
            }
            destroy() {
                this.injector.destroy()
            }
            onDestroy(t) {
                this.injector.onDestroy(t)
            }
        }
        function ad(e, t, n=null) {
            return new oD({
                providers: e,
                parent: t,
                debugName: n,
                runEnvironmentInitializers: !0
            }).injector
        }
        let FR = ( () => {
            class e {
                constructor(n) {
                    this._injector = n,
                    this.cachedInjectors = new Map
                }
                getOrCreateStandaloneInjector(n) {
                    if (!n.standalone)
                        return null;
                    if (!this.cachedInjectors.has(n)) {
                        const r = im(0, n.type)
                          , o = r.length > 0 ? ad([r], this._injector, `Standalone[${n.type.name}]`) : null;
                        this.cachedInjectors.set(n, o)
                    }
                    return this.cachedInjectors.get(n)
                }
                ngOnDestroy() {
                    try {
                        for (const n of this.cachedInjectors.values())
                            null !== n && n.destroy()
                    } finally {
                        this.cachedInjectors.clear()
                    }
                }
                static{this.\u0275prov = S({
                    token: e,
                    providedIn: "environment",
                    factory: () => new e(M(ot))
                })
                }
            }
            return e
        }
        )();
        function iD(e) {
            e.getStandaloneInjector = t => t.get(FR).getOrCreateStandaloneInjector(e)
        }
        function cx(e, t, n, r=!0) {
            const o = t[_];
            if (function PS(e, t, n, r) {
                const o = Me + r
                  , i = n.length;
                r > 0 && (n[o - 1][At] = t),
                r < i - Me ? (t[At] = n[o],
                sg(n, Me + r, t)) : (n.push(t),
                t[At] = null),
                t[se] = n;
                const s = t[Po];
                null !== s && n !== s && function FS(e, t) {
                    const n = e[yr];
                    t[pe] !== t[se][se][pe] && (e[sp] = !0),
                    null === n ? e[yr] = [t] : n.push(t)
                }(s, t);
                const a = t[Vt];
                null !== a && a.insertView(e),
                t[L] |= 128
            }(o, t, e, n),
            r) {
                const i = zc(n, e)
                  , s = t[F]
                  , a = Us(s, e[jt]);
                null !== a && function RS(e, t, n, r, o, i) {
                    r[ce] = o,
                    r[Ne] = t,
                    Xo(e, r, n, 1, o, i)
                }(o, e[Ne], s, t, a, i)
            }
        }
        let dn = ( () => {
            class e {
                static{this.__NG_ELEMENT_ID__ = fx
                }
            }
            return e
        }
        )();
        const lx = dn
          , dx = class extends lx {
            constructor(t, n, r) {
                super(),
                this._declarationLView = t,
                this._declarationTContainer = n,
                this.elementRef = r
            }
            get ssrId() {
                return this._declarationTContainer.tView?.ssrId || null
            }
            createEmbeddedView(t, n) {
                return this.createEmbeddedViewImpl(t, n)
            }
            createEmbeddedViewImpl(t, n, r) {
                const o = function ux(e, t, n, r) {
                    const o = t.tView
                      , a = ua(e, o, n, 4096 & e[L] ? 4096 : 16, null, t, null, null, null, r?.injector ?? null, r?.hydrationInfo ?? null);
                    a[Po] = e[t.index];
                    const c = e[Vt];
                    return null !== c && (a[Vt] = c.createEmbeddedView(o)),
                    Pl(o, a, n),
                    a
                }(this._declarationLView, this._declarationTContainer, t, {
                    injector: n,
                    hydrationInfo: r
                });
                return new ci(o)
            }
        }
        ;
        function fx() {
            return function Ia(e, t) {
                return 4 & e.type ? new dx(t,e,Br(e, t)) : null
            }(Ae(), v())
        }
        let xt = ( () => {
            class e {
                static{this.__NG_ELEMENT_ID__ = vx
                }
            }
            return e
        }
        )();
        function vx() {
            return function ED(e, t) {
                let n;
                const r = t[e.index];
                return ke(r) ? n = r : (n = Xm(r, t, null, e),
                t[e.index] = n,
                ca(t, n)),
                bD(n, t, e, r),
                new wD(n,e,t)
            }(Ae(), v())
        }
        const Dx = xt
          , wD = class extends Dx {
            constructor(t, n, r) {
                super(),
                this._lContainer = t,
                this._hostTNode = n,
                this._hostLView = r
            }
            get element() {
                return Br(this._hostTNode, this._hostLView)
            }
            get injector() {
                return new je(this._hostTNode,this._hostLView)
            }
            get parentInjector() {
                const t = Ss(this._hostTNode, this._hostLView);
                if (Ec(t)) {
                    const n = Uo(t, this._hostLView)
                      , r = $o(t);
                    return new je(n[_].data[r + 8],n)
                }
                return new je(null,this._hostLView)
            }
            clear() {
                for (; this.length > 0; )
                    this.remove(this.length - 1)
            }
            get(t) {
                const n = _D(this._lContainer);
                return null !== n && n[t] || null
            }
            get length() {
                return this._lContainer.length - Me
            }
            createEmbeddedView(t, n, r) {
                let o, i;
                "number" == typeof r ? o = r : null != r && (o = r.index,
                i = r.injector);
                const a = t.createEmbeddedViewImpl(n || {}, i, null);
                return this.insertImpl(a, o, false),
                a
            }
            createComponent(t, n, r, o, i) {
                const s = t && !function Go(e) {
                    return "function" == typeof e
                }(t);
                let a;
                if (s)
                    a = n;
                else {
                    const g = n || {};
                    a = g.index,
                    r = g.injector,
                    o = g.projectableNodes,
                    i = g.environmentInjector || g.ngModuleRef
                }
                const u = s ? t : new li($(t))
                  , c = r || this.parentInjector;
                if (!i && null == u.ngModule) {
                    const y = (s ? c : this.parentInjector).get(ot, null);
                    y && (i = y)
                }
                $(u.componentType ?? {});
                const h = u.create(c, o, null, i);
                return this.insertImpl(h.hostView, a, false),
                h
            }
            insert(t, n) {
                return this.insertImpl(t, n, !1)
            }
            insertImpl(t, n, r) {
                const o = t._lView;
                if (function iM(e) {
                    return ke(e[se])
                }(o)) {
                    const u = this.indexOf(t);
                    if (-1 !== u)
                        this.detach(u);
                    else {
                        const c = o[se]
                          , l = new wD(c,c[Ne],c[se]);
                        l.detach(l.indexOf(t))
                    }
                }
                const s = this._adjustIndex(n)
                  , a = this._lContainer;
                return cx(a, o, s, !r),
                t.attachToViewContainerRef(),
                sg(ld(a), s, t),
                t
            }
            move(t, n) {
                return this.insert(t, n)
            }
            indexOf(t) {
                const n = _D(this._lContainer);
                return null !== n ? n.indexOf(t) : -1
            }
            remove(t) {
                const n = this._adjustIndex(t, -1)
                  , r = $s(this._lContainer, n);
                r && (Ns(ld(this._lContainer), n),
                Bc(r[_], r))
            }
            detach(t) {
                const n = this._adjustIndex(t, -1)
                  , r = $s(this._lContainer, n);
                return r && null != Ns(ld(this._lContainer), n) ? new ci(r) : null
            }
            _adjustIndex(t, n=0) {
                return t ?? this.length + n
            }
        }
        ;
        function _D(e) {
            return e[8]
        }
        function ld(e) {
            return e[8] || (e[8] = [])
        }
        let bD = function ID(e, t, n, r) {
            if (e[jt])
                return;
            let o;
            o = 8 & n.type ? ne(r) : function Cx(e, t) {
                const n = e[F]
                  , r = n.createComment("")
                  , o = We(t, e);
                return Wn(n, Us(n, o), r, function jS(e, t) {
                    return e.nextSibling(t)
                }(n, o), !1),
                r
            }(t, n),
            e[jt] = o
        };
        const wd = new I("Application Initializer");
        let _d = ( () => {
            class e {
                constructor() {
                    this.initialized = !1,
                    this.done = !1,
                    this.donePromise = new Promise( (n, r) => {
                        this.resolve = n,
                        this.reject = r
                    }
                    ),
                    this.appInits = E(wd, {
                        optional: !0
                    }) ?? []
                }
                runInitializers() {
                    if (this.initialized)
                        return;
                    const n = [];
                    for (const o of this.appInits) {
                        const i = o();
                        if (gi(i))
                            n.push(i);
                        else if (Py(i)) {
                            const s = new Promise( (a, u) => {
                                i.subscribe({
                                    complete: a,
                                    error: u
                                })
                            }
                            );
                            n.push(s)
                        }
                    }
                    const r = () => {
                        this.done = !0,
                        this.resolve()
                    }
                    ;
                    Promise.all(n).then( () => {
                        r()
                    }
                    ).catch(o => {
                        this.reject(o)
                    }
                    ),
                    0 === n.length && r(),
                    this.initialized = !0
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )()
          , QD = ( () => {
            class e {
                log(n) {
                    console.log(n)
                }
                warn(n) {
                    console.warn(n)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                })
                }
            }
            return e
        }
        )();
        const fn = new I("LocaleId",{
            providedIn: "root",
            factory: () => E(fn, B.Optional | B.SkipSelf) || function Xx() {
                return typeof $localize < "u" && $localize.locale || no
            }()
        });
        let Aa = ( () => {
            class e {
                constructor() {
                    this.taskId = 0,
                    this.pendingTasks = new Set,
                    this.hasPendingTasks = new ht(!1)
                }
                add() {
                    this.hasPendingTasks.next(!0);
                    const n = this.taskId++;
                    return this.pendingTasks.add(n),
                    n
                }
                remove(n) {
                    this.pendingTasks.delete(n),
                    0 === this.pendingTasks.size && this.hasPendingTasks.next(!1)
                }
                ngOnDestroy() {
                    this.pendingTasks.clear(),
                    this.hasPendingTasks.next(!1)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        class eO {
            constructor(t, n) {
                this.ngModuleFactory = t,
                this.componentFactories = n
            }
        }
        let XD = ( () => {
            class e {
                compileModuleSync(n) {
                    return new sd(n)
                }
                compileModuleAsync(n) {
                    return Promise.resolve(this.compileModuleSync(n))
                }
                compileModuleAndAllComponentsSync(n) {
                    const r = this.compileModuleSync(n)
                      , i = un(tt(n).declarations).reduce( (s, a) => {
                        const u = $(a);
                        return u && s.push(new li(u)),
                        s
                    }
                    , []);
                    return new eO(r,i)
                }
                compileModuleAndAllComponentsAsync(n) {
                    return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
                }
                clearCache() {}
                clearCacheFor(n) {}
                getModuleId(n) {}
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        const tC = new I("")
          , Na = new I("");
        let Sd, Id = ( () => {
            class e {
                constructor(n, r, o) {
                    this._ngZone = n,
                    this.registry = r,
                    this._pendingCount = 0,
                    this._isZoneStable = !0,
                    this._didWork = !1,
                    this._callbacks = [],
                    this.taskTrackingZone = null,
                    Sd || (function _O(e) {
                        Sd = e
                    }(o),
                    o.addToWindow(r)),
                    this._watchAngularEvents(),
                    n.run( () => {
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                    }
                    )
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: () => {
                            this._didWork = !0,
                            this._isZoneStable = !1
                        }
                    }),
                    this._ngZone.runOutsideAngular( () => {
                        this._ngZone.onStable.subscribe({
                            next: () => {
                                re.assertNotInAngularZone(),
                                queueMicrotask( () => {
                                    this._isZoneStable = !0,
                                    this._runCallbacksIfReady()
                                }
                                )
                            }
                        })
                    }
                    )
                }
                increasePendingRequestCount() {
                    return this._pendingCount += 1,
                    this._didWork = !0,
                    this._pendingCount
                }
                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1,
                    this._pendingCount < 0)
                        throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(),
                    this._pendingCount
                }
                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }
                _runCallbacksIfReady() {
                    if (this.isStable())
                        queueMicrotask( () => {
                            for (; 0 !== this._callbacks.length; ) {
                                let n = this._callbacks.pop();
                                clearTimeout(n.timeoutId),
                                n.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        }
                        );
                    else {
                        let n = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId),
                        !1)),
                        this._didWork = !0
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n => ({
                        source: n.source,
                        creationLocation: n.creationLocation,
                        data: n.data
                    })) : []
                }
                addCallback(n, r, o) {
                    let i = -1;
                    r && r > 0 && (i = setTimeout( () => {
                        this._callbacks = this._callbacks.filter(s => s.timeoutId !== i),
                        n(this._didWork, this.getPendingTasks())
                    }
                    , r)),
                    this._callbacks.push({
                        doneCb: n,
                        timeoutId: i,
                        updateCb: o
                    })
                }
                whenStable(n, r, o) {
                    if (o && !this.taskTrackingZone)
                        throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(n, r, o),
                    this._runCallbacksIfReady()
                }
                getPendingRequestCount() {
                    return this._pendingCount
                }
                registerApplication(n) {
                    this.registry.registerApplication(n, this)
                }
                unregisterApplication(n) {
                    this.registry.unregisterApplication(n)
                }
                findProviders(n, r, o) {
                    return []
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(re),M(Md),M(Na))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )(), Md = ( () => {
            class e {
                constructor() {
                    this._applications = new Map
                }
                registerApplication(n, r) {
                    this._applications.set(n, r)
                }
                unregisterApplication(n) {
                    this._applications.delete(n)
                }
                unregisterAllApplications() {
                    this._applications.clear()
                }
                getTestability(n) {
                    return this._applications.get(n) || null
                }
                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }
                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }
                findTestabilityInTree(n, r=!0) {
                    return Sd?.findTestabilityInTree(this, n, r) ?? null
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                })
                }
            }
            return e
        }
        )(), Nn = null;
        const nC = new I("AllowMultipleToken")
          , Ad = new I("PlatformDestroyListeners")
          , Td = new I("appBootstrapListener");
        class oC {
            constructor(t, n) {
                this.name = t,
                this.token = n
            }
        }
        function sC(e, t, n=[]) {
            const r = `Platform: ${t}`
              , o = new I(r);
            return (i=[]) => {
                let s = Nd();
                if (!s || s.injector.get(nC, !1)) {
                    const a = [...n, ...i, {
                        provide: o,
                        useValue: !0
                    }];
                    e ? e(a) : function IO(e) {
                        if (Nn && !Nn.get(nC, !1))
                            throw new C(400,!1);
                        (function rC() {
                            !function zI(e) {
                                vp = e
                            }( () => {
                                throw new C(600,!1)
                            }
                            )
                        }
                        )(),
                        Nn = e;
                        const t = e.get(uC);
                        (function iC(e) {
                            e.get(lm, null)?.forEach(n => n())
                        }
                        )(e)
                    }(function aC(e=[], t) {
                        return st.create({
                            name: t,
                            providers: [{
                                provide: rl,
                                useValue: "platform"
                            }, {
                                provide: Ad,
                                useValue: new Set([ () => Nn = null])
                            }, ...e]
                        })
                    }(a, r))
                }
                return function SO(e) {
                    const t = Nd();
                    if (!t)
                        throw new C(401,!1);
                    return t
                }()
            }
        }
        function Nd() {
            return Nn?.get(uC) ?? null
        }
        let uC = ( () => {
            class e {
                constructor(n) {
                    this._injector = n,
                    this._modules = [],
                    this._destroyListeners = [],
                    this._destroyed = !1
                }
                bootstrapModuleFactory(n, r) {
                    const o = function AO(e="zone.js", t) {
                        return "noop" === e ? new nA : "zone.js" === e ? new re(t) : e
                    }(r?.ngZone, function cC(e) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                            shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
                        }
                    }({
                        eventCoalescing: r?.ngZoneEventCoalescing,
                        runCoalescing: r?.ngZoneRunCoalescing
                    }));
                    return o.run( () => {
                        const i = function PR(e, t, n) {
                            return new id(e,t,n)
                        }(n.moduleType, this.injector, function pC(e) {
                            return [{
                                provide: re,
                                useFactory: e
                            }, {
                                provide: ti,
                                multi: !0,
                                useFactory: () => {
                                    const t = E(NO, {
                                        optional: !0
                                    });
                                    return () => t.initialize()
                                }
                            }, {
                                provide: hC,
                                useFactory: TO
                            }, {
                                provide: Sm,
                                useFactory: Am
                            }]
                        }( () => o))
                          , s = i.injector.get(an, null);
                        return o.runOutsideAngular( () => {
                            const a = o.onError.subscribe({
                                next: u => {
                                    s.handleError(u)
                                }
                            });
                            i.onDestroy( () => {
                                Ra(this._modules, i),
                                a.unsubscribe()
                            }
                            )
                        }
                        ),
                        function lC(e, t, n) {
                            try {
                                const r = n();
                                return gi(r) ? r.catch(o => {
                                    throw t.runOutsideAngular( () => e.handleError(o)),
                                    o
                                }
                                ) : r
                            } catch (r) {
                                throw t.runOutsideAngular( () => e.handleError(r)),
                                r
                            }
                        }(s, o, () => {
                            const a = i.injector.get(_d);
                            return a.runInitializers(),
                            a.donePromise.then( () => (function xv(e) {
                                pt(e, "Expected localeId to be defined"),
                                "string" == typeof e && (Rv = e.toLowerCase().replace(/_/g, "-"))
                            }(i.injector.get(fn, no) || no),
                            this._moduleDoBootstrap(i),
                            i))
                        }
                        )
                    }
                    )
                }
                bootstrapModule(n, r=[]) {
                    const o = dC({}, r);
                    return function EO(e, t, n) {
                        const r = new sd(n);
                        return Promise.resolve(r)
                    }(0, 0, n).then(i => this.bootstrapModuleFactory(i, o))
                }
                _moduleDoBootstrap(n) {
                    const r = n.injector.get(io);
                    if (n._bootstrapComponents.length > 0)
                        n._bootstrapComponents.forEach(o => r.bootstrap(o));
                    else {
                        if (!n.instance.ngDoBootstrap)
                            throw new C(-403,!1);
                        n.instance.ngDoBootstrap(r)
                    }
                    this._modules.push(n)
                }
                onDestroy(n) {
                    this._destroyListeners.push(n)
                }
                get injector() {
                    return this._injector
                }
                destroy() {
                    if (this._destroyed)
                        throw new C(404,!1);
                    this._modules.slice().forEach(r => r.destroy()),
                    this._destroyListeners.forEach(r => r());
                    const n = this._injector.get(Ad, null);
                    n && (n.forEach(r => r()),
                    n.clear()),
                    this._destroyed = !0
                }
                get destroyed() {
                    return this._destroyed
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(st))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                })
                }
            }
            return e
        }
        )();
        function dC(e, t) {
            return Array.isArray(t) ? t.reduce(dC, e) : {
                ...e,
                ...t
            }
        }
        let io = ( () => {
            class e {
                constructor() {
                    this._bootstrapListeners = [],
                    this._runningTick = !1,
                    this._destroyed = !1,
                    this._destroyListeners = [],
                    this._views = [],
                    this.internalErrorHandler = E(hC),
                    this.zoneIsStable = E(Sm),
                    this.componentTypes = [],
                    this.components = [],
                    this.isStable = E(Aa).hasPendingTasks.pipe(bt(n => n ? T(!1) : this.zoneIsStable), function tI(e, t=Dn) {
                        return e = e ?? nI,
                        ve( (n, r) => {
                            let o, i = !0;
                            n.subscribe(me(r, s => {
                                const a = t(s);
                                (i || !e(o, a)) && (i = !1,
                                o = a,
                                r.next(s))
                            }
                            ))
                        }
                        )
                    }(), kh()),
                    this._injector = E(ot)
                }
                get destroyed() {
                    return this._destroyed
                }
                get injector() {
                    return this._injector
                }
                bootstrap(n, r) {
                    const o = n instanceof gm;
                    if (!this._injector.get(_d).done)
                        throw !o && function fr(e) {
                            const t = $(e) || Ie(e) || Fe(e);
                            return null !== t && t.standalone
                        }(n),
                        new C(405,!1);
                    let s;
                    s = o ? n : this._injector.get(oa).resolveComponentFactory(n),
                    this.componentTypes.push(s.componentType);
                    const a = function bO(e) {
                        return e.isBoundToModule
                    }(s) ? void 0 : this._injector.get(Kn)
                      , c = s.create(st.NULL, [], r || s.selector, a)
                      , l = c.location.nativeElement
                      , d = c.injector.get(tC, null);
                    return d?.registerApplication(l),
                    c.onDestroy( () => {
                        this.detachView(c.hostView),
                        Ra(this.components, c),
                        d?.unregisterApplication(l)
                    }
                    ),
                    this._loadComponent(c),
                    c
                }
                tick() {
                    if (this._runningTick)
                        throw new C(101,!1);
                    try {
                        this._runningTick = !0;
                        for (let n of this._views)
                            n.detectChanges()
                    } catch (n) {
                        this.internalErrorHandler(n)
                    } finally {
                        this._runningTick = !1
                    }
                }
                attachView(n) {
                    const r = n;
                    this._views.push(r),
                    r.attachToAppRef(this)
                }
                detachView(n) {
                    const r = n;
                    Ra(this._views, r),
                    r.detachFromAppRef()
                }
                _loadComponent(n) {
                    this.attachView(n.hostView),
                    this.tick(),
                    this.components.push(n);
                    const r = this._injector.get(Td, []);
                    r.push(...this._bootstrapListeners),
                    r.forEach(o => o(n))
                }
                ngOnDestroy() {
                    if (!this._destroyed)
                        try {
                            this._destroyListeners.forEach(n => n()),
                            this._views.slice().forEach(n => n.destroy())
                        } finally {
                            this._destroyed = !0,
                            this._views = [],
                            this._bootstrapListeners = [],
                            this._destroyListeners = []
                        }
                }
                onDestroy(n) {
                    return this._destroyListeners.push(n),
                    () => Ra(this._destroyListeners, n)
                }
                destroy() {
                    if (this._destroyed)
                        throw new C(406,!1);
                    const n = this._injector;
                    n.destroy && !n.destroyed && n.destroy()
                }
                get viewCount() {
                    return this._views.length
                }
                warnIfDestroyed() {}
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        function Ra(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        const hC = new I("",{
            providedIn: "root",
            factory: () => E(an).handleError.bind(void 0)
        });
        function TO() {
            const e = E(re)
              , t = E(an);
            return n => e.runOutsideAngular( () => t.handleError(n))
        }
        let NO = ( () => {
            class e {
                constructor() {
                    this.zone = E(re),
                    this.applicationRef = E(io)
                }
                initialize() {
                    this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this.zone.run( () => {
                                this.applicationRef.tick()
                            }
                            )
                        }
                    }))
                }
                ngOnDestroy() {
                    this._onMicrotaskEmptySubscription?.unsubscribe()
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        let xa = ( () => {
            class e {
                static{this.__NG_ELEMENT_ID__ = xO
                }
            }
            return e
        }
        )();
        function xO(e) {
            return function OO(e, t, n) {
                if (Un(e) && !n) {
                    const r = nt(e.index, t);
                    return new ci(r,r)
                }
                return 47 & e.type ? new ci(t[pe],t) : null
            }(Ae(), v(), 16 == (16 & e))
        }
        class DC {
            constructor() {}
            supports(t) {
                return ha(t)
            }
            create(t) {
                return new VO(t)
            }
        }
        const LO = (e, t) => t;
        class VO {
            constructor(t) {
                this.length = 0,
                this._linkedRecords = null,
                this._unlinkedRecords = null,
                this._previousItHead = null,
                this._itHead = null,
                this._itTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._movesHead = null,
                this._movesTail = null,
                this._removalsHead = null,
                this._removalsTail = null,
                this._identityChangesHead = null,
                this._identityChangesTail = null,
                this._trackByFn = t || LO
            }
            forEachItem(t) {
                let n;
                for (n = this._itHead; null !== n; n = n._next)
                    t(n)
            }
            forEachOperation(t) {
                let n = this._itHead
                  , r = this._removalsHead
                  , o = 0
                  , i = null;
                for (; n || r; ) {
                    const s = !r || n && n.currentIndex < wC(r, o, i) ? n : r
                      , a = wC(s, o, i)
                      , u = s.currentIndex;
                    if (s === r)
                        o--,
                        r = r._nextRemoved;
                    else if (n = n._next,
                    null == s.previousIndex)
                        o++;
                    else {
                        i || (i = []);
                        const c = a - o
                          , l = u - o;
                        if (c != l) {
                            for (let f = 0; f < c; f++) {
                                const h = f < i.length ? i[f] : i[f] = 0
                                  , p = h + f;
                                l <= p && p < c && (i[f] = h + 1)
                            }
                            i[s.previousIndex] = l - c
                        }
                    }
                    a !== u && t(s, a, u)
                }
            }
            forEachPreviousItem(t) {
                let n;
                for (n = this._previousItHead; null !== n; n = n._nextPrevious)
                    t(n)
            }
            forEachAddedItem(t) {
                let n;
                for (n = this._additionsHead; null !== n; n = n._nextAdded)
                    t(n)
            }
            forEachMovedItem(t) {
                let n;
                for (n = this._movesHead; null !== n; n = n._nextMoved)
                    t(n)
            }
            forEachRemovedItem(t) {
                let n;
                for (n = this._removalsHead; null !== n; n = n._nextRemoved)
                    t(n)
            }
            forEachIdentityChange(t) {
                let n;
                for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange)
                    t(n)
            }
            diff(t) {
                if (null == t && (t = []),
                !ha(t))
                    throw new C(900,!1);
                return this.check(t) ? this : null
            }
            onDestroy() {}
            check(t) {
                this._reset();
                let o, i, s, n = this._itHead, r = !1;
                if (Array.isArray(t)) {
                    this.length = t.length;
                    for (let a = 0; a < this.length; a++)
                        i = t[a],
                        s = this._trackByFn(a, i),
                        null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                        Object.is(n.item, i) || this._addIdentityChange(n, i)) : (n = this._mismatch(n, i, s, a),
                        r = !0),
                        n = n._next
                } else
                    o = 0,
                    function fT(e, t) {
                        if (Array.isArray(e))
                            for (let n = 0; n < e.length; n++)
                                t(e[n]);
                        else {
                            const n = e[Symbol.iterator]();
                            let r;
                            for (; !(r = n.next()).done; )
                                t(r.value)
                        }
                    }(t, a => {
                        s = this._trackByFn(o, a),
                        null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                        Object.is(n.item, a) || this._addIdentityChange(n, a)) : (n = this._mismatch(n, a, s, o),
                        r = !0),
                        n = n._next,
                        o++
                    }
                    ),
                    this.length = o;
                return this._truncate(n),
                this.collection = t,
                this.isDirty
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }
            _reset() {
                if (this.isDirty) {
                    let t;
                    for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
                        t._nextPrevious = t._next;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded)
                        t.previousIndex = t.currentIndex;
                    for (this._additionsHead = this._additionsTail = null,
                    t = this._movesHead; null !== t; t = t._nextMoved)
                        t.previousIndex = t.currentIndex;
                    this._movesHead = this._movesTail = null,
                    this._removalsHead = this._removalsTail = null,
                    this._identityChangesHead = this._identityChangesTail = null
                }
            }
            _mismatch(t, n, r, o) {
                let i;
                return null === t ? i = this._itTail : (i = t._prev,
                this._remove(t)),
                null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, o)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o)) : t = this._addAfter(new jO(n,r), i, o),
                t
            }
            _verifyReinsertion(t, n, r, o) {
                let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
                return null !== i ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o,
                this._addToMoves(t, o)),
                t
            }
            _truncate(t) {
                for (; null !== t; ) {
                    const n = t._next;
                    this._addToRemovals(this._unlink(t)),
                    t = n
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(t, n, r) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                const o = t._prevRemoved
                  , i = t._nextRemoved;
                return null === o ? this._removalsHead = i : o._nextRemoved = i,
                null === i ? this._removalsTail = o : i._prevRemoved = o,
                this._insertAfter(t, n, r),
                this._addToMoves(t, r),
                t
            }
            _moveAfter(t, n, r) {
                return this._unlink(t),
                this._insertAfter(t, n, r),
                this._addToMoves(t, r),
                t
            }
            _addAfter(t, n, r) {
                return this._insertAfter(t, n, r),
                this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t,
                t
            }
            _insertAfter(t, n, r) {
                const o = null === n ? this._itHead : n._next;
                return t._next = o,
                t._prev = n,
                null === o ? this._itTail = t : o._prev = t,
                null === n ? this._itHead = t : n._next = t,
                null === this._linkedRecords && (this._linkedRecords = new CC),
                this._linkedRecords.put(t),
                t.currentIndex = r,
                t
            }
            _remove(t) {
                return this._addToRemovals(this._unlink(t))
            }
            _unlink(t) {
                null !== this._linkedRecords && this._linkedRecords.remove(t);
                const n = t._prev
                  , r = t._next;
                return null === n ? this._itHead = r : n._next = r,
                null === r ? this._itTail = n : r._prev = n,
                t
            }
            _addToMoves(t, n) {
                return t.previousIndex === n || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t),
                t
            }
            _addToRemovals(t) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new CC),
                this._unlinkedRecords.put(t),
                t.currentIndex = null,
                t._nextRemoved = null,
                null === this._removalsTail ? (this._removalsTail = this._removalsHead = t,
                t._prevRemoved = null) : (t._prevRemoved = this._removalsTail,
                this._removalsTail = this._removalsTail._nextRemoved = t),
                t
            }
            _addIdentityChange(t, n) {
                return t.item = n,
                this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t,
                t
            }
        }
        class jO {
            constructor(t, n) {
                this.item = t,
                this.trackById = n,
                this.currentIndex = null,
                this.previousIndex = null,
                this._nextPrevious = null,
                this._prev = null,
                this._next = null,
                this._prevDup = null,
                this._nextDup = null,
                this._prevRemoved = null,
                this._nextRemoved = null,
                this._nextAdded = null,
                this._nextMoved = null,
                this._nextIdentityChange = null
            }
        }
        class BO {
            constructor() {
                this._head = null,
                this._tail = null
            }
            add(t) {
                null === this._head ? (this._head = this._tail = t,
                t._nextDup = null,
                t._prevDup = null) : (this._tail._nextDup = t,
                t._prevDup = this._tail,
                t._nextDup = null,
                this._tail = t)
            }
            get(t, n) {
                let r;
                for (r = this._head; null !== r; r = r._nextDup)
                    if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t))
                        return r;
                return null
            }
            remove(t) {
                const n = t._prevDup
                  , r = t._nextDup;
                return null === n ? this._head = r : n._nextDup = r,
                null === r ? this._tail = n : r._prevDup = n,
                null === this._head
            }
        }
        class CC {
            constructor() {
                this.map = new Map
            }
            put(t) {
                const n = t.trackById;
                let r = this.map.get(n);
                r || (r = new BO,
                this.map.set(n, r)),
                r.add(t)
            }
            get(t, n) {
                const o = this.map.get(t);
                return o ? o.get(t, n) : null
            }
            remove(t) {
                const n = t.trackById;
                return this.map.get(n).remove(t) && this.map.delete(n),
                t
            }
            get isEmpty() {
                return 0 === this.map.size
            }
            clear() {
                this.map.clear()
            }
        }
        function wC(e, t, n) {
            const r = e.previousIndex;
            if (null === r)
                return r;
            let o = 0;
            return n && r < n.length && (o = n[r]),
            r + t + o
        }
        function EC() {
            return new Fa([new DC])
        }
        let Fa = ( () => {
            class e {
                static{this.\u0275prov = S({
                    token: e,
                    providedIn: "root",
                    factory: EC
                })
                }constructor(n) {
                    this.factories = n
                }
                static create(n, r) {
                    if (null != r) {
                        const o = r.factories.slice();
                        n = n.concat(o)
                    }
                    return new e(n)
                }
                static extend(n) {
                    return {
                        provide: e,
                        useFactory: r => e.create(n, r || EC()),
                        deps: [[e, new Os, new xs]]
                    }
                }
                find(n) {
                    const r = this.factories.find(o => o.supports(n));
                    if (null != r)
                        return r;
                    throw new C(901,!1)
                }
            }
            return e
        }
        )();
        const GO = sC(null, "core", []);
        let qO = ( () => {
            class e {
                constructor(n) {}
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(io))
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({})
                }
            }
            return e
        }
        )()
          , kd = null;
        function Rn() {
            return kd
        }
        class sP {
        }
        const lt = new I("DocumentToken");
        let Ld = ( () => {
            class e {
                historyGo(n) {
                    throw new Error("Not implemented")
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function() {
                        return E(uP)
                    },
                    providedIn: "platform"
                })
                }
            }
            return e
        }
        )();
        const aP = new I("Location Initialized");
        let uP = ( () => {
            class e extends Ld {
                constructor() {
                    super(),
                    this._doc = E(lt),
                    this._location = window.location,
                    this._history = window.history
                }
                getBaseHrefFromDOM() {
                    return Rn().getBaseHref(this._doc)
                }
                onPopState(n) {
                    const r = Rn().getGlobalEventTarget(this._doc, "window");
                    return r.addEventListener("popstate", n, !1),
                    () => r.removeEventListener("popstate", n)
                }
                onHashChange(n) {
                    const r = Rn().getGlobalEventTarget(this._doc, "window");
                    return r.addEventListener("hashchange", n, !1),
                    () => r.removeEventListener("hashchange", n)
                }
                get href() {
                    return this._location.href
                }
                get protocol() {
                    return this._location.protocol
                }
                get hostname() {
                    return this._location.hostname
                }
                get port() {
                    return this._location.port
                }
                get pathname() {
                    return this._location.pathname
                }
                get search() {
                    return this._location.search
                }
                get hash() {
                    return this._location.hash
                }
                set pathname(n) {
                    this._location.pathname = n
                }
                pushState(n, r, o) {
                    this._history.pushState(n, r, o)
                }
                replaceState(n, r, o) {
                    this._history.replaceState(n, r, o)
                }
                forward() {
                    this._history.forward()
                }
                back() {
                    this._history.back()
                }
                historyGo(n=0) {
                    this._history.go(n)
                }
                getState() {
                    return this._history.state
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function() {
                        return new e
                    },
                    providedIn: "platform"
                })
                }
            }
            return e
        }
        )();
        function Vd(e, t) {
            if (0 == e.length)
                return t;
            if (0 == t.length)
                return e;
            let n = 0;
            return e.endsWith("/") && n++,
            t.startsWith("/") && n++,
            2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        }
        function OC(e) {
            const t = e.match(/#|\?|$/)
              , n = t && t.index || e.length;
            return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n)
        }
        function hn(e) {
            return e && "?" !== e[0] ? "?" + e : e
        }
        let tr = ( () => {
            class e {
                historyGo(n) {
                    throw new Error("Not implemented")
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function() {
                        return E(FC)
                    },
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        const PC = new I("appBaseHref");
        let FC = ( () => {
            class e extends tr {
                constructor(n, r) {
                    super(),
                    this._platformLocation = n,
                    this._removeListenerFns = [],
                    this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? E(lt).location?.origin ?? ""
                }
                ngOnDestroy() {
                    for (; this._removeListenerFns.length; )
                        this._removeListenerFns.pop()()
                }
                onPopState(n) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                }
                getBaseHref() {
                    return this._baseHref
                }
                prepareExternalUrl(n) {
                    return Vd(this._baseHref, n)
                }
                path(n=!1) {
                    const r = this._platformLocation.pathname + hn(this._platformLocation.search)
                      , o = this._platformLocation.hash;
                    return o && n ? `${r}${o}` : r
                }
                pushState(n, r, o, i) {
                    const s = this.prepareExternalUrl(o + hn(i));
                    this._platformLocation.pushState(n, r, s)
                }
                replaceState(n, r, o, i) {
                    const s = this.prepareExternalUrl(o + hn(i));
                    this._platformLocation.replaceState(n, r, s)
                }
                forward() {
                    this._platformLocation.forward()
                }
                back() {
                    this._platformLocation.back()
                }
                getState() {
                    return this._platformLocation.getState()
                }
                historyGo(n=0) {
                    this._platformLocation.historyGo?.(n)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(Ld),M(PC, 8))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )()
          , cP = ( () => {
            class e extends tr {
                constructor(n, r) {
                    super(),
                    this._platformLocation = n,
                    this._baseHref = "",
                    this._removeListenerFns = [],
                    null != r && (this._baseHref = r)
                }
                ngOnDestroy() {
                    for (; this._removeListenerFns.length; )
                        this._removeListenerFns.pop()()
                }
                onPopState(n) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                }
                getBaseHref() {
                    return this._baseHref
                }
                path(n=!1) {
                    let r = this._platformLocation.hash;
                    return null == r && (r = "#"),
                    r.length > 0 ? r.substring(1) : r
                }
                prepareExternalUrl(n) {
                    const r = Vd(this._baseHref, n);
                    return r.length > 0 ? "#" + r : r
                }
                pushState(n, r, o, i) {
                    let s = this.prepareExternalUrl(o + hn(i));
                    0 == s.length && (s = this._platformLocation.pathname),
                    this._platformLocation.pushState(n, r, s)
                }
                replaceState(n, r, o, i) {
                    let s = this.prepareExternalUrl(o + hn(i));
                    0 == s.length && (s = this._platformLocation.pathname),
                    this._platformLocation.replaceState(n, r, s)
                }
                forward() {
                    this._platformLocation.forward()
                }
                back() {
                    this._platformLocation.back()
                }
                getState() {
                    return this._platformLocation.getState()
                }
                historyGo(n=0) {
                    this._platformLocation.historyGo?.(n)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(Ld),M(PC, 8))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )()
          , jd = ( () => {
            class e {
                constructor(n) {
                    this._subject = new le,
                    this._urlChangeListeners = [],
                    this._urlChangeSubscription = null,
                    this._locationStrategy = n;
                    const r = this._locationStrategy.getBaseHref();
                    this._basePath = function fP(e) {
                        if (new RegExp("^(https?:)?//").test(e)) {
                            const [,n] = e.split(/\/\/[^\/]+/);
                            return n
                        }
                        return e
                    }(OC(kC(r))),
                    this._locationStrategy.onPopState(o => {
                        this._subject.emit({
                            url: this.path(!0),
                            pop: !0,
                            state: o.state,
                            type: o.type
                        })
                    }
                    )
                }
                ngOnDestroy() {
                    this._urlChangeSubscription?.unsubscribe(),
                    this._urlChangeListeners = []
                }
                path(n=!1) {
                    return this.normalize(this._locationStrategy.path(n))
                }
                getState() {
                    return this._locationStrategy.getState()
                }
                isCurrentPathEqualTo(n, r="") {
                    return this.path() == this.normalize(n + hn(r))
                }
                normalize(n) {
                    return e.stripTrailingSlash(function dP(e, t) {
                        if (!e || !t.startsWith(e))
                            return t;
                        const n = t.substring(e.length);
                        return "" === n || ["/", ";", "?", "#"].includes(n[0]) ? n : t
                    }(this._basePath, kC(n)))
                }
                prepareExternalUrl(n) {
                    return n && "/" !== n[0] && (n = "/" + n),
                    this._locationStrategy.prepareExternalUrl(n)
                }
                go(n, r="", o=null) {
                    this._locationStrategy.pushState(o, "", n, r),
                    this._notifyUrlChangeListeners(this.prepareExternalUrl(n + hn(r)), o)
                }
                replaceState(n, r="", o=null) {
                    this._locationStrategy.replaceState(o, "", n, r),
                    this._notifyUrlChangeListeners(this.prepareExternalUrl(n + hn(r)), o)
                }
                forward() {
                    this._locationStrategy.forward()
                }
                back() {
                    this._locationStrategy.back()
                }
                historyGo(n=0) {
                    this._locationStrategy.historyGo?.(n)
                }
                onUrlChange(n) {
                    return this._urlChangeListeners.push(n),
                    this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r => {
                        this._notifyUrlChangeListeners(r.url, r.state)
                    }
                    )),
                    () => {
                        const r = this._urlChangeListeners.indexOf(n);
                        this._urlChangeListeners.splice(r, 1),
                        0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(),
                        this._urlChangeSubscription = null)
                    }
                }
                _notifyUrlChangeListeners(n="", r) {
                    this._urlChangeListeners.forEach(o => o(n, r))
                }
                subscribe(n, r, o) {
                    return this._subject.subscribe({
                        next: n,
                        error: r,
                        complete: o
                    })
                }
                static{this.normalizeQueryParams = hn
                }static{this.joinWithSlash = Vd
                }static{this.stripTrailingSlash = OC
                }static{this.\u0275fac = function(r) {
                    return new (r || e)(M(tr))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function() {
                        return function lP() {
                            return new jd(M(tr))
                        }()
                    },
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        function kC(e) {
            return e.replace(/\/index.html$/, "")
        }
        function GC(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
                const r = n.indexOf("=")
                  , [o,i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
                if (o.trim() === t)
                    return decodeURIComponent(i)
            }
            return null
        }
        class JP {
            constructor(t, n, r, o) {
                this.$implicit = t,
                this.ngForOf = n,
                this.index = r,
                this.count = o
            }
            get first() {
                return 0 === this.index
            }
            get last() {
                return this.index === this.count - 1
            }
            get even() {
                return this.index % 2 == 0
            }
            get odd() {
                return !this.even
            }
        }
        let ZC = ( () => {
            class e {
                set ngForOf(n) {
                    this._ngForOf = n,
                    this._ngForOfDirty = !0
                }
                set ngForTrackBy(n) {
                    this._trackByFn = n
                }
                get ngForTrackBy() {
                    return this._trackByFn
                }
                constructor(n, r, o) {
                    this._viewContainer = n,
                    this._template = r,
                    this._differs = o,
                    this._ngForOf = null,
                    this._ngForOfDirty = !0,
                    this._differ = null
                }
                set ngForTemplate(n) {
                    n && (this._template = n)
                }
                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const n = this._ngForOf;
                        !this._differ && n && (this._differ = this._differs.find(n).create(this.ngForTrackBy))
                    }
                    if (this._differ) {
                        const n = this._differ.diff(this._ngForOf);
                        n && this._applyChanges(n)
                    }
                }
                _applyChanges(n) {
                    const r = this._viewContainer;
                    n.forEachOperation( (o, i, s) => {
                        if (null == o.previousIndex)
                            r.createEmbeddedView(this._template, new JP(o.item,this._ngForOf,-1,-1), null === s ? void 0 : s);
                        else if (null == s)
                            r.remove(null === i ? void 0 : i);
                        else if (null !== i) {
                            const a = r.get(i);
                            r.move(a, s),
                            YC(a, o)
                        }
                    }
                    );
                    for (let o = 0, i = r.length; o < i; o++) {
                        const a = r.get(o).context;
                        a.index = o,
                        a.count = i,
                        a.ngForOf = this._ngForOf
                    }
                    n.forEachIdentityChange(o => {
                        YC(r.get(o.currentIndex), o)
                    }
                    )
                }
                static ngTemplateContextGuard(n, r) {
                    return !0
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(w(xt),w(dn),w(Fa))
                }
                }static{this.\u0275dir = O({
                    type: e,
                    selectors: [["", "ngFor", "", "ngForOf", ""]],
                    inputs: {
                        ngForOf: "ngForOf",
                        ngForTrackBy: "ngForTrackBy",
                        ngForTemplate: "ngForTemplate"
                    },
                    standalone: !0
                })
                }
            }
            return e
        }
        )();
        function YC(e, t) {
            e.context.$implicit = t.item
        }
        let IF = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({})
                }
            }
            return e
        }
        )();
        function ew(e) {
            return "server" === e
        }
        let TF = ( () => {
            class e {
                static{this.\u0275prov = S({
                    token: e,
                    providedIn: "root",
                    factory: () => new NF(M(lt),window)
                })
                }
            }
            return e
        }
        )();
        class NF {
            constructor(t, n) {
                this.document = t,
                this.window = n,
                this.offset = () => [0, 0]
            }
            setOffset(t) {
                this.offset = Array.isArray(t) ? () => t : t
            }
            getScrollPosition() {
                return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
            }
            scrollToPosition(t) {
                this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
            }
            scrollToAnchor(t) {
                if (!this.supportsScrolling())
                    return;
                const n = function RF(e, t) {
                    const n = e.getElementById(t) || e.getElementsByName(t)[0];
                    if (n)
                        return n;
                    if ("function" == typeof e.createTreeWalker && e.body && "function" == typeof e.body.attachShadow) {
                        const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
                        let o = r.currentNode;
                        for (; o; ) {
                            const i = o.shadowRoot;
                            if (i) {
                                const s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                                if (s)
                                    return s
                            }
                            o = r.nextNode()
                        }
                    }
                    return null
                }(this.document, t);
                n && (this.scrollToElement(n),
                n.focus())
            }
            setHistoryScrollRestoration(t) {
                this.supportsScrolling() && (this.window.history.scrollRestoration = t)
            }
            scrollToElement(t) {
                const n = t.getBoundingClientRect()
                  , r = n.left + this.window.pageXOffset
                  , o = n.top + this.window.pageYOffset
                  , i = this.offset();
                this.window.scrollTo(r - i[0], o - i[1])
            }
            supportsScrolling() {
                try {
                    return !!this.window && !!this.window.scrollTo && "pageXOffset"in this.window
                } catch {
                    return !1
                }
            }
        }
        class tw {
        }
        class e1 extends sP {
            constructor() {
                super(...arguments),
                this.supportsDOMEvents = !0
            }
        }
        class nf extends e1 {
            static makeCurrent() {
                !function iP(e) {
                    kd || (kd = e)
                }(new nf)
            }
            onAndCancel(t, n, r) {
                return t.addEventListener(n, r),
                () => {
                    t.removeEventListener(n, r)
                }
            }
            dispatchEvent(t, n) {
                t.dispatchEvent(n)
            }
            remove(t) {
                t.parentNode && t.parentNode.removeChild(t)
            }
            createElement(t, n) {
                return (n = n || this.getDefaultDocument()).createElement(t)
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            isElementNode(t) {
                return t.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(t) {
                return t instanceof DocumentFragment
            }
            getGlobalEventTarget(t, n) {
                return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null
            }
            getBaseHref(t) {
                const n = function t1() {
                    return Ri = Ri || document.querySelector("base"),
                    Ri ? Ri.getAttribute("href") : null
                }();
                return null == n ? null : function n1(e) {
                    Ya = Ya || document.createElement("a"),
                    Ya.setAttribute("href", e);
                    const t = Ya.pathname;
                    return "/" === t.charAt(0) ? t : `/${t}`
                }(n)
            }
            resetBaseElement() {
                Ri = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            getCookie(t) {
                return GC(document.cookie, t)
            }
        }
        let Ya, Ri = null, o1 = ( () => {
            class e {
                build() {
                    return new XMLHttpRequest
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        const rf = new I("EventManagerPlugins");
        let sw = ( () => {
            class e {
                constructor(n, r) {
                    this._zone = r,
                    this._eventNameToPlugin = new Map,
                    n.forEach(o => {
                        o.manager = this
                    }
                    ),
                    this._plugins = n.slice().reverse()
                }
                addEventListener(n, r, o) {
                    return this._findPluginFor(r).addEventListener(n, r, o)
                }
                getZone() {
                    return this._zone
                }
                _findPluginFor(n) {
                    let r = this._eventNameToPlugin.get(n);
                    if (r)
                        return r;
                    if (r = this._plugins.find(i => i.supports(n)),
                    !r)
                        throw new C(5101,!1);
                    return this._eventNameToPlugin.set(n, r),
                    r
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(rf),M(re))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        class aw {
            constructor(t) {
                this._doc = t
            }
        }
        const sf = "ng-app-id";
        let uw = ( () => {
            class e {
                constructor(n, r, o, i={}) {
                    this.doc = n,
                    this.appId = r,
                    this.nonce = o,
                    this.platformId = i,
                    this.styleRef = new Map,
                    this.hostNodes = new Set,
                    this.styleNodesInDOM = this.collectServerRenderedStyles(),
                    this.platformIsServer = ew(i),
                    this.resetHostNodes()
                }
                addStyles(n) {
                    for (const r of n)
                        1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                }
                removeStyles(n) {
                    for (const r of n)
                        this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r)
                }
                ngOnDestroy() {
                    const n = this.styleNodesInDOM;
                    n && (n.forEach(r => r.remove()),
                    n.clear());
                    for (const r of this.getAllStyles())
                        this.onStyleRemoved(r);
                    this.resetHostNodes()
                }
                addHost(n) {
                    this.hostNodes.add(n);
                    for (const r of this.getAllStyles())
                        this.addStyleToHost(n, r)
                }
                removeHost(n) {
                    this.hostNodes.delete(n)
                }
                getAllStyles() {
                    return this.styleRef.keys()
                }
                onStyleAdded(n) {
                    for (const r of this.hostNodes)
                        this.addStyleToHost(r, n)
                }
                onStyleRemoved(n) {
                    const r = this.styleRef;
                    r.get(n)?.elements?.forEach(o => o.remove()),
                    r.delete(n)
                }
                collectServerRenderedStyles() {
                    const n = this.doc.head?.querySelectorAll(`style[${sf}="${this.appId}"]`);
                    if (n?.length) {
                        const r = new Map;
                        return n.forEach(o => {
                            null != o.textContent && r.set(o.textContent, o)
                        }
                        ),
                        r
                    }
                    return null
                }
                changeUsageCount(n, r) {
                    const o = this.styleRef;
                    if (o.has(n)) {
                        const i = o.get(n);
                        return i.usage += r,
                        i.usage
                    }
                    return o.set(n, {
                        usage: r,
                        elements: []
                    }),
                    r
                }
                getStyleElement(n, r) {
                    const o = this.styleNodesInDOM
                      , i = o?.get(r);
                    if (i?.parentNode === n)
                        return o.delete(r),
                        i.removeAttribute(sf),
                        i;
                    {
                        const s = this.doc.createElement("style");
                        return this.nonce && s.setAttribute("nonce", this.nonce),
                        s.textContent = r,
                        this.platformIsServer && s.setAttribute(sf, this.appId),
                        s
                    }
                }
                addStyleToHost(n, r) {
                    const o = this.getStyleElement(n, r);
                    n.appendChild(o);
                    const i = this.styleRef
                      , s = i.get(r)?.elements;
                    s ? s.push(o) : i.set(r, {
                        elements: [o],
                        usage: 1
                    })
                }
                resetHostNodes() {
                    const n = this.hostNodes;
                    n.clear(),
                    n.add(this.doc.head)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(lt),M(Js),M(dm, 8),M(Yn))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        const af = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }
          , uf = /%COMP%/g
          , u1 = new I("RemoveStylesOnCompDestroy",{
            providedIn: "root",
            factory: () => !1
        });
        function lw(e, t) {
            return t.map(n => n.replace(uf, e))
        }
        let dw = ( () => {
            class e {
                constructor(n, r, o, i, s, a, u, c=null) {
                    this.eventManager = n,
                    this.sharedStylesHost = r,
                    this.appId = o,
                    this.removeStylesOnCompDestroy = i,
                    this.doc = s,
                    this.platformId = a,
                    this.ngZone = u,
                    this.nonce = c,
                    this.rendererByCompId = new Map,
                    this.platformIsServer = ew(a),
                    this.defaultRenderer = new cf(n,s,u,this.platformIsServer)
                }
                createRenderer(n, r) {
                    if (!n || !r)
                        return this.defaultRenderer;
                    this.platformIsServer && r.encapsulation === It.ShadowDom && (r = {
                        ...r,
                        encapsulation: It.Emulated
                    });
                    const o = this.getOrCreateRenderer(n, r);
                    return o instanceof hw ? o.applyToHost(n) : o instanceof lf && o.applyStyles(),
                    o
                }
                getOrCreateRenderer(n, r) {
                    const o = this.rendererByCompId;
                    let i = o.get(r.id);
                    if (!i) {
                        const s = this.doc
                          , a = this.ngZone
                          , u = this.eventManager
                          , c = this.sharedStylesHost
                          , l = this.removeStylesOnCompDestroy
                          , d = this.platformIsServer;
                        switch (r.encapsulation) {
                        case It.Emulated:
                            i = new hw(u,c,r,this.appId,l,s,a,d);
                            break;
                        case It.ShadowDom:
                            return new f1(u,c,n,r,s,a,this.nonce,d);
                        default:
                            i = new lf(u,c,r,l,s,a,d)
                        }
                        o.set(r.id, i)
                    }
                    return i
                }
                ngOnDestroy() {
                    this.rendererByCompId.clear()
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(sw),M(uw),M(Js),M(u1),M(lt),M(Yn),M(re),M(dm))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        class cf {
            constructor(t, n, r, o) {
                this.eventManager = t,
                this.doc = n,
                this.ngZone = r,
                this.platformIsServer = o,
                this.data = Object.create(null),
                this.destroyNode = null
            }
            destroy() {}
            createElement(t, n) {
                return n ? this.doc.createElementNS(af[n] || n, t) : this.doc.createElement(t)
            }
            createComment(t) {
                return this.doc.createComment(t)
            }
            createText(t) {
                return this.doc.createTextNode(t)
            }
            appendChild(t, n) {
                (fw(t) ? t.content : t).appendChild(n)
            }
            insertBefore(t, n, r) {
                t && (fw(t) ? t.content : t).insertBefore(n, r)
            }
            removeChild(t, n) {
                t && t.removeChild(n)
            }
            selectRootElement(t, n) {
                let r = "string" == typeof t ? this.doc.querySelector(t) : t;
                if (!r)
                    throw new C(-5104,!1);
                return n || (r.textContent = ""),
                r
            }
            parentNode(t) {
                return t.parentNode
            }
            nextSibling(t) {
                return t.nextSibling
            }
            setAttribute(t, n, r, o) {
                if (o) {
                    n = o + ":" + n;
                    const i = af[o];
                    i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
                } else
                    t.setAttribute(n, r)
            }
            removeAttribute(t, n, r) {
                if (r) {
                    const o = af[r];
                    o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
                } else
                    t.removeAttribute(n)
            }
            addClass(t, n) {
                t.classList.add(n)
            }
            removeClass(t, n) {
                t.classList.remove(n)
            }
            setStyle(t, n, r, o) {
                o & (Sn.DashCase | Sn.Important) ? t.style.setProperty(n, r, o & Sn.Important ? "important" : "") : t.style[n] = r
            }
            removeStyle(t, n, r) {
                r & Sn.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
            }
            setProperty(t, n, r) {
                t[n] = r
            }
            setValue(t, n) {
                t.nodeValue = n
            }
            listen(t, n, r) {
                if ("string" == typeof t && !(t = Rn().getGlobalEventTarget(this.doc, t)))
                    throw new Error(`Unsupported event target ${t} for event ${n}`);
                return this.eventManager.addEventListener(t, n, this.decoratePreventDefault(r))
            }
            decoratePreventDefault(t) {
                return n => {
                    if ("__ngUnwrap__" === n)
                        return t;
                    !1 === (this.platformIsServer ? this.ngZone.runGuarded( () => t(n)) : t(n)) && n.preventDefault()
                }
            }
        }
        function fw(e) {
            return "TEMPLATE" === e.tagName && void 0 !== e.content
        }
        class f1 extends cf {
            constructor(t, n, r, o, i, s, a, u) {
                super(t, i, s, u),
                this.sharedStylesHost = n,
                this.hostEl = r,
                this.shadowRoot = r.attachShadow({
                    mode: "open"
                }),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const c = lw(o.id, o.styles);
                for (const l of c) {
                    const d = document.createElement("style");
                    a && d.setAttribute("nonce", a),
                    d.textContent = l,
                    this.shadowRoot.appendChild(d)
                }
            }
            nodeOrShadowRoot(t) {
                return t === this.hostEl ? this.shadowRoot : t
            }
            appendChild(t, n) {
                return super.appendChild(this.nodeOrShadowRoot(t), n)
            }
            insertBefore(t, n, r) {
                return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
            }
            removeChild(t, n) {
                return super.removeChild(this.nodeOrShadowRoot(t), n)
            }
            parentNode(t) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
        }
        class lf extends cf {
            constructor(t, n, r, o, i, s, a, u) {
                super(t, i, s, a),
                this.sharedStylesHost = n,
                this.removeStylesOnCompDestroy = o,
                this.styles = u ? lw(u, r.styles) : r.styles
            }
            applyStyles() {
                this.sharedStylesHost.addStyles(this.styles)
            }
            destroy() {
                this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles)
            }
        }
        class hw extends lf {
            constructor(t, n, r, o, i, s, a, u) {
                const c = o + "-" + r.id;
                super(t, n, r, i, s, a, u, c),
                this.contentAttr = function c1(e) {
                    return "_ngcontent-%COMP%".replace(uf, e)
                }(c),
                this.hostAttr = function l1(e) {
                    return "_nghost-%COMP%".replace(uf, e)
                }(c)
            }
            applyToHost(t) {
                this.applyStyles(),
                this.setAttribute(t, this.hostAttr, "")
            }
            createElement(t, n) {
                const r = super.createElement(t, n);
                return super.setAttribute(r, this.contentAttr, ""),
                r
            }
        }
        let h1 = ( () => {
            class e extends aw {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return !0
                }
                addEventListener(n, r, o) {
                    return n.addEventListener(r, o, !1),
                    () => this.removeEventListener(n, r, o)
                }
                removeEventListener(n, r, o) {
                    return n.removeEventListener(r, o)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(lt))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        const pw = ["alt", "control", "meta", "shift"]
          , p1 = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , g1 = {
            alt: e => e.altKey,
            control: e => e.ctrlKey,
            meta: e => e.metaKey,
            shift: e => e.shiftKey
        };
        let m1 = ( () => {
            class e extends aw {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return null != e.parseEventName(n)
                }
                addEventListener(n, r, o) {
                    const i = e.parseEventName(r)
                      , s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular( () => Rn().onAndCancel(n, i.domEventName, s))
                }
                static parseEventName(n) {
                    const r = n.toLowerCase().split(".")
                      , o = r.shift();
                    if (0 === r.length || "keydown" !== o && "keyup" !== o)
                        return null;
                    const i = e._normalizeKey(r.pop());
                    let s = ""
                      , a = r.indexOf("code");
                    if (a > -1 && (r.splice(a, 1),
                    s = "code."),
                    pw.forEach(c => {
                        const l = r.indexOf(c);
                        l > -1 && (r.splice(l, 1),
                        s += c + ".")
                    }
                    ),
                    s += i,
                    0 != r.length || 0 === i.length)
                        return null;
                    const u = {};
                    return u.domEventName = o,
                    u.fullKey = s,
                    u
                }
                static matchEventFullKeyCode(n, r) {
                    let o = p1[n.key] || n.key
                      , i = "";
                    return r.indexOf("code.") > -1 && (o = n.code,
                    i = "code."),
                    !(null == o || !o) && (o = o.toLowerCase(),
                    " " === o ? o = "space" : "." === o && (o = "dot"),
                    pw.forEach(s => {
                        s !== o && (0,
                        g1[s])(n) && (i += s + ".")
                    }
                    ),
                    i += o,
                    i === r)
                }
                static eventCallback(n, r, o) {
                    return i => {
                        e.matchEventFullKeyCode(i, n) && o.runGuarded( () => r(i))
                    }
                }
                static _normalizeKey(n) {
                    return "esc" === n ? "escape" : n
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(lt))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        const C1 = sC(GO, "browser", [{
            provide: Yn,
            useValue: "browser"
        }, {
            provide: lm,
            useValue: function y1() {
                nf.makeCurrent()
            },
            multi: !0
        }, {
            provide: lt,
            useFactory: function D1() {
                return function WS(e) {
                    Wc = e
                }(document),
                document
            },
            deps: []
        }])
          , w1 = new I("")
          , yw = [{
            provide: Na,
            useClass: class r1 {
                addToWindow(t) {
                    te.getAngularTestability = (r, o=!0) => {
                        const i = t.findTestabilityInTree(r, o);
                        if (null == i)
                            throw new C(5103,!1);
                        return i
                    }
                    ,
                    te.getAllAngularTestabilities = () => t.getAllTestabilities(),
                    te.getAllAngularRootElements = () => t.getAllRootElements(),
                    te.frameworkStabilizers || (te.frameworkStabilizers = []),
                    te.frameworkStabilizers.push(r => {
                        const o = te.getAllAngularTestabilities();
                        let i = o.length
                          , s = !1;
                        const a = function(u) {
                            s = s || u,
                            i--,
                            0 == i && r(s)
                        };
                        o.forEach(u => {
                            u.whenStable(a)
                        }
                        )
                    }
                    )
                }
                findTestabilityInTree(t, n, r) {
                    return null == n ? null : t.getTestability(n) ?? (r ? Rn().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null)
                }
            }
            ,
            deps: []
        }, {
            provide: tC,
            useClass: Id,
            deps: [re, Md, Na]
        }, {
            provide: Id,
            useClass: Id,
            deps: [re, Md, Na]
        }]
          , vw = [{
            provide: rl,
            useValue: "root"
        }, {
            provide: an,
            useFactory: function v1() {
                return new an
            },
            deps: []
        }, {
            provide: rf,
            useClass: h1,
            multi: !0,
            deps: [lt, re, Yn]
        }, {
            provide: rf,
            useClass: m1,
            multi: !0,
            deps: [lt]
        }, dw, uw, sw, {
            provide: ym,
            useExisting: dw
        }, {
            provide: tw,
            useClass: o1,
            deps: []
        }, []];
        let _1 = ( () => {
            class e {
                constructor(n) {}
                static withServerTransition(n) {
                    return {
                        ngModule: e,
                        providers: [{
                            provide: Js,
                            useValue: n.appId
                        }]
                    }
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(w1, 12))
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({
                    providers: [...vw, ...yw],
                    imports: [IF, qO]
                })
                }
            }
            return e
        }
        )()
          , Dw = ( () => {
            class e {
                constructor(n) {
                    this._doc = n
                }
                getTitle() {
                    return this._doc.title
                }
                setTitle(n) {
                    this._doc.title = n || ""
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(lt))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function(r) {
                        let o = null;
                        return o = r ? new r : function b1() {
                            return new Dw(M(lt))
                        }(),
                        o
                    },
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        typeof window < "u" && window;
        const {isArray: N1} = Array
          , {getPrototypeOf: R1, prototype: x1, keys: O1} = Object;
        const {isArray: F1} = Array;
        function ff(...e) {
            const t = So(e)
              , n = function xh(e) {
                return J(ju(e)) ? e.pop() : void 0
            }(e)
              , {args: r, keys: o} = function Ew(e) {
                if (1 === e.length) {
                    const t = e[0];
                    if (N1(t))
                        return {
                            args: t,
                            keys: null
                        };
                    if (function P1(e) {
                        return e && "object" == typeof e && R1(e) === x1
                    }(t)) {
                        const n = O1(t);
                        return {
                            args: n.map(r => t[r]),
                            keys: n
                        }
                    }
                }
                return {
                    args: e,
                    keys: null
                }
            }(e);
            if (0 === r.length)
                return De([], t);
            const i = new fe(function L1(e, t, n=Dn) {
                return r => {
                    Mw(t, () => {
                        const {length: o} = e
                          , i = new Array(o);
                        let s = o
                          , a = o;
                        for (let u = 0; u < o; u++)
                            Mw(t, () => {
                                const c = De(e[u], t);
                                let l = !1;
                                c.subscribe(me(r, d => {
                                    i[u] = d,
                                    l || (l = !0,
                                    a--),
                                    a || r.next(n(i.slice()))
                                }
                                , () => {
                                    --s || r.complete()
                                }
                                ))
                            }
                            , r)
                    }
                    , r)
                }
            }(r, t, o ? s => function Iw(e, t) {
                return e.reduce( (n, r, o) => (n[r] = t[o],
                n), {})
            }(o, s) : Dn));
            return n ? i.pipe(function bw(e) {
                return G(t => function k1(e, t) {
                    return F1(t) ? e(...t) : e(t)
                }(e, t))
            }(n)) : i
        }
        function Mw(e, t, n) {
            e ? Jt(n, e, t) : t()
        }
        const Qa = bo(e => function() {
            e(this),
            this.name = "EmptyError",
            this.message = "no elements in sequence"
        }
        );
        function hf(...e) {
            return function V1() {
                return lr(1)
            }()(De(e, So(e)))
        }
        function Sw(e) {
            return new fe(t => {
                Ke(e()).subscribe(t)
            }
            )
        }
        function xi(e, t) {
            const n = J(e) ? e : () => e
              , r = o => o.error(n());
            return new fe(t ? o => t.schedule(r, 0, o) : r)
        }
        function pf() {
            return ve( (e, t) => {
                let n = null;
                e._refCount++;
                const r = me(t, void 0, void 0, void 0, () => {
                    if (!e || e._refCount <= 0 || 0 < --e._refCount)
                        return void (n = null);
                    const o = e._connection
                      , i = n;
                    n = null,
                    o && (!i || o === i) && o.unsubscribe(),
                    t.unsubscribe()
                }
                );
                e.subscribe(r),
                r.closed || (n = e.connect())
            }
            )
        }
        class Aw extends fe {
            constructor(t, n) {
                super(),
                this.source = t,
                this.subjectFactory = n,
                this._subject = null,
                this._refCount = 0,
                this._connection = null,
                yh(t) && (this.lift = t.lift)
            }
            _subscribe(t) {
                return this.getSubject().subscribe(t)
            }
            getSubject() {
                const t = this._subject;
                return (!t || t.isStopped) && (this._subject = this.subjectFactory()),
                this._subject
            }
            _teardown() {
                this._refCount = 0;
                const {_connection: t} = this;
                this._subject = this._connection = null,
                t?.unsubscribe()
            }
            connect() {
                let t = this._connection;
                if (!t) {
                    t = this._connection = new Je;
                    const n = this.getSubject();
                    t.add(this.source.subscribe(me(n, void 0, () => {
                        this._teardown(),
                        n.complete()
                    }
                    , r => {
                        this._teardown(),
                        n.error(r)
                    }
                    , () => this._teardown()))),
                    t.closed && (this._connection = null,
                    t = Je.EMPTY)
                }
                return t
            }
            refCount() {
                return pf()(this)
            }
        }
        function uo(e) {
            return e <= 0 ? () => kt : ve( (t, n) => {
                let r = 0;
                t.subscribe(me(n, o => {
                    ++r <= e && (n.next(o),
                    e <= r && n.complete())
                }
                ))
            }
            )
        }
        function mn(e, t) {
            return ve( (n, r) => {
                let o = 0;
                n.subscribe(me(r, i => e.call(t, i, o++) && r.next(i)))
            }
            )
        }
        function Xa(e) {
            return ve( (t, n) => {
                let r = !1;
                t.subscribe(me(n, o => {
                    r = !0,
                    n.next(o)
                }
                , () => {
                    r || n.next(e),
                    n.complete()
                }
                ))
            }
            )
        }
        function Tw(e=B1) {
            return ve( (t, n) => {
                let r = !1;
                t.subscribe(me(n, o => {
                    r = !0,
                    n.next(o)
                }
                , () => r ? n.complete() : n.error(e())))
            }
            )
        }
        function B1() {
            return new Qa
        }
        function nr(e, t) {
            const n = arguments.length >= 2;
            return r => r.pipe(e ? mn( (o, i) => e(o, i, r)) : Dn, uo(1), n ? Xa(t) : Tw( () => new Qa))
        }
        function co(e, t) {
            return J(t) ? be(e, t, 1) : be(e, 1)
        }
        function Oe(e, t, n) {
            const r = J(e) || t || n ? {
                next: e,
                error: t,
                complete: n
            } : e;
            return r ? ve( (o, i) => {
                var s;
                null === (s = r.subscribe) || void 0 === s || s.call(r);
                let a = !0;
                o.subscribe(me(i, u => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, u),
                    i.next(u)
                }
                , () => {
                    var u;
                    a = !1,
                    null === (u = r.complete) || void 0 === u || u.call(r),
                    i.complete()
                }
                , u => {
                    var c;
                    a = !1,
                    null === (c = r.error) || void 0 === c || c.call(r, u),
                    i.error(u)
                }
                , () => {
                    var u, c;
                    a && (null === (u = r.unsubscribe) || void 0 === u || u.call(r)),
                    null === (c = r.finalize) || void 0 === c || c.call(r)
                }
                ))
            }
            ) : Dn
        }
        function rr(e) {
            return ve( (t, n) => {
                let i, r = null, o = !1;
                r = t.subscribe(me(n, void 0, void 0, s => {
                    i = Ke(e(s, rr(e)(t))),
                    r ? (r.unsubscribe(),
                    r = null,
                    i.subscribe(n)) : o = !0
                }
                )),
                o && (r.unsubscribe(),
                r = null,
                i.subscribe(n))
            }
            )
        }
        function gf(e) {
            return e <= 0 ? () => kt : ve( (t, n) => {
                let r = [];
                t.subscribe(me(n, o => {
                    r.push(o),
                    e < r.length && r.shift()
                }
                , () => {
                    for (const o of r)
                        n.next(o);
                    n.complete()
                }
                , void 0, () => {
                    r = null
                }
                ))
            }
            )
        }
        function Oi(e) {
            return ve( (t, n) => {
                try {
                    t.subscribe(n)
                } finally {
                    n.add(e)
                }
            }
            )
        }
        const V = "primary"
          , Pi = Symbol("RouteTitle");
        class q1 {
            constructor(t) {
                this.params = t || {}
            }
            has(t) {
                return Object.prototype.hasOwnProperty.call(this.params, t)
            }
            get(t) {
                if (this.has(t)) {
                    const n = this.params[t];
                    return Array.isArray(n) ? n[0] : n
                }
                return null
            }
            getAll(t) {
                if (this.has(t)) {
                    const n = this.params[t];
                    return Array.isArray(n) ? n : [n]
                }
                return []
            }
            get keys() {
                return Object.keys(this.params)
            }
        }
        function lo(e) {
            return new q1(e)
        }
        function W1(e, t, n) {
            const r = n.path.split("/");
            if (r.length > e.length || "full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
                return null;
            const o = {};
            for (let i = 0; i < r.length; i++) {
                const s = r[i]
                  , a = e[i];
                if (s.startsWith(":"))
                    o[s.substring(1)] = a;
                else if (s !== a.path)
                    return null
            }
            return {
                consumed: e.slice(0, r.length),
                posParams: o
            }
        }
        function Zt(e, t) {
            const n = e ? Object.keys(e) : void 0
              , r = t ? Object.keys(t) : void 0;
            if (!n || !r || n.length != r.length)
                return !1;
            let o;
            for (let i = 0; i < n.length; i++)
                if (o = n[i],
                !Nw(e[o], t[o]))
                    return !1;
            return !0
        }
        function Nw(e, t) {
            if (Array.isArray(e) && Array.isArray(t)) {
                if (e.length !== t.length)
                    return !1;
                const n = [...e].sort()
                  , r = [...t].sort();
                return n.every( (o, i) => r[i] === o)
            }
            return e === t
        }
        function Rw(e) {
            return e.length > 0 ? e[e.length - 1] : null
        }
        function On(e) {
            return function T1(e) {
                return !!e && (e instanceof fe || J(e.lift) && J(e.subscribe))
            }(e) ? e : gi(e) ? De(Promise.resolve(e)) : T(e)
        }
        const Y1 = {
            exact: function Pw(e, t, n) {
                if (!or(e.segments, t.segments) || !Ja(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren)
                    return !1;
                for (const r in t.children)
                    if (!e.children[r] || !Pw(e.children[r], t.children[r], n))
                        return !1;
                return !0
            },
            subset: Fw
        }
          , xw = {
            exact: function Q1(e, t) {
                return Zt(e, t)
            },
            subset: function X1(e, t) {
                return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => Nw(e[n], t[n]))
            },
            ignored: () => !0
        };
        function Ow(e, t, n) {
            return Y1[n.paths](e.root, t.root, n.matrixParams) && xw[n.queryParams](e.queryParams, t.queryParams) && !("exact" === n.fragment && e.fragment !== t.fragment)
        }
        function Fw(e, t, n) {
            return kw(e, t, t.segments, n)
        }
        function kw(e, t, n, r) {
            if (e.segments.length > n.length) {
                const o = e.segments.slice(0, n.length);
                return !(!or(o, n) || t.hasChildren() || !Ja(o, n, r))
            }
            if (e.segments.length === n.length) {
                if (!or(e.segments, n) || !Ja(e.segments, n, r))
                    return !1;
                for (const o in t.children)
                    if (!e.children[o] || !Fw(e.children[o], t.children[o], r))
                        return !1;
                return !0
            }
            {
                const o = n.slice(0, e.segments.length)
                  , i = n.slice(e.segments.length);
                return !!(or(e.segments, o) && Ja(e.segments, o, r) && e.children[V]) && kw(e.children[V], t, i, r)
            }
        }
        function Ja(e, t, n) {
            return t.every( (r, o) => xw[n](e[o].parameters, r.parameters))
        }
        class fo {
            constructor(t=new X([],{}), n={}, r=null) {
                this.root = t,
                this.queryParams = n,
                this.fragment = r
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = lo(this.queryParams)),
                this._queryParamMap
            }
            toString() {
                return ek.serialize(this)
            }
        }
        class X {
            constructor(t, n) {
                this.segments = t,
                this.children = n,
                this.parent = null,
                Object.values(n).forEach(r => r.parent = this)
            }
            hasChildren() {
                return this.numberOfChildren > 0
            }
            get numberOfChildren() {
                return Object.keys(this.children).length
            }
            toString() {
                return Ka(this)
            }
        }
        class Fi {
            constructor(t, n) {
                this.path = t,
                this.parameters = n
            }
            get parameterMap() {
                return this._parameterMap || (this._parameterMap = lo(this.parameters)),
                this._parameterMap
            }
            toString() {
                return jw(this)
            }
        }
        function or(e, t) {
            return e.length === t.length && e.every( (n, r) => n.path === t[r].path)
        }
        let ki = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function() {
                        return new mf
                    },
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        class mf {
            parse(t) {
                const n = new dk(t);
                return new fo(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())
            }
            serialize(t) {
                const n = `/${Li(t.root, !0)}`
                  , r = function rk(e) {
                    const t = Object.keys(e).map(n => {
                        const r = e[n];
                        return Array.isArray(r) ? r.map(o => `${eu(n)}=${eu(o)}`).join("&") : `${eu(n)}=${eu(r)}`
                    }
                    ).filter(n => !!n);
                    return t.length ? `?${t.join("&")}` : ""
                }(t.queryParams);
                return `${n}${r}${"string" == typeof t.fragment ? `#${function tk(e) {
                    return encodeURI(e)
                }(t.fragment)}` : ""}`
            }
        }
        const ek = new mf;
        function Ka(e) {
            return e.segments.map(t => jw(t)).join("/")
        }
        function Li(e, t) {
            if (!e.hasChildren())
                return Ka(e);
            if (t) {
                const n = e.children[V] ? Li(e.children[V], !1) : ""
                  , r = [];
                return Object.entries(e.children).forEach( ([o,i]) => {
                    o !== V && r.push(`${o}:${Li(i, !1)}`)
                }
                ),
                r.length > 0 ? `${n}(${r.join("//")})` : n
            }
            {
                const n = function K1(e, t) {
                    let n = [];
                    return Object.entries(e.children).forEach( ([r,o]) => {
                        r === V && (n = n.concat(t(o, r)))
                    }
                    ),
                    Object.entries(e.children).forEach( ([r,o]) => {
                        r !== V && (n = n.concat(t(o, r)))
                    }
                    ),
                    n
                }(e, (r, o) => o === V ? [Li(e.children[V], !1)] : [`${o}:${Li(r, !1)}`]);
                return 1 === Object.keys(e.children).length && null != e.children[V] ? `${Ka(e)}/${n[0]}` : `${Ka(e)}/(${n.join("//")})`
            }
        }
        function Lw(e) {
            return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
        }
        function eu(e) {
            return Lw(e).replace(/%3B/gi, ";")
        }
        function yf(e) {
            return Lw(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
        }
        function tu(e) {
            return decodeURIComponent(e)
        }
        function Vw(e) {
            return tu(e.replace(/\+/g, "%20"))
        }
        function jw(e) {
            return `${yf(e.path)}${function nk(e) {
                return Object.keys(e).map(t => `;${yf(t)}=${yf(e[t])}`).join("")
            }(e.parameters)}`
        }
        const ok = /^[^\/()?;#]+/;
        function vf(e) {
            const t = e.match(ok);
            return t ? t[0] : ""
        }
        const ik = /^[^\/()?;=#]+/
          , ak = /^[^=?&#]+/
          , ck = /^[^&#]+/;
        class dk {
            constructor(t) {
                this.url = t,
                this.remaining = t
            }
            parseRootSegment() {
                return this.consumeOptional("/"),
                "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new X([],{}) : new X([],this.parseChildren())
            }
            parseQueryParams() {
                const t = {};
                if (this.consumeOptional("?"))
                    do {
                        this.parseQueryParam(t)
                    } while (this.consumeOptional("&"));
                return t
            }
            parseFragment() {
                return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
            }
            parseChildren() {
                if ("" === this.remaining)
                    return {};
                this.consumeOptional("/");
                const t = [];
                for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/("); )
                    this.capture("/"),
                    t.push(this.parseSegment());
                let n = {};
                this.peekStartsWith("/(") && (this.capture("/"),
                n = this.parseParens(!0));
                let r = {};
                return this.peekStartsWith("(") && (r = this.parseParens(!1)),
                (t.length > 0 || Object.keys(n).length > 0) && (r[V] = new X(t,n)),
                r
            }
            parseSegment() {
                const t = vf(this.remaining);
                if ("" === t && this.peekStartsWith(";"))
                    throw new C(4009,!1);
                return this.capture(t),
                new Fi(tu(t),this.parseMatrixParams())
            }
            parseMatrixParams() {
                const t = {};
                for (; this.consumeOptional(";"); )
                    this.parseParam(t);
                return t
            }
            parseParam(t) {
                const n = function sk(e) {
                    const t = e.match(ik);
                    return t ? t[0] : ""
                }(this.remaining);
                if (!n)
                    return;
                this.capture(n);
                let r = "";
                if (this.consumeOptional("=")) {
                    const o = vf(this.remaining);
                    o && (r = o,
                    this.capture(r))
                }
                t[tu(n)] = tu(r)
            }
            parseQueryParam(t) {
                const n = function uk(e) {
                    const t = e.match(ak);
                    return t ? t[0] : ""
                }(this.remaining);
                if (!n)
                    return;
                this.capture(n);
                let r = "";
                if (this.consumeOptional("=")) {
                    const s = function lk(e) {
                        const t = e.match(ck);
                        return t ? t[0] : ""
                    }(this.remaining);
                    s && (r = s,
                    this.capture(r))
                }
                const o = Vw(n)
                  , i = Vw(r);
                if (t.hasOwnProperty(o)) {
                    let s = t[o];
                    Array.isArray(s) || (s = [s],
                    t[o] = s),
                    s.push(i)
                } else
                    t[o] = i
            }
            parseParens(t) {
                const n = {};
                for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0; ) {
                    const r = vf(this.remaining)
                      , o = this.remaining[r.length];
                    if ("/" !== o && ")" !== o && ";" !== o)
                        throw new C(4010,!1);
                    let i;
                    r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")),
                    this.capture(i),
                    this.capture(":")) : t && (i = V);
                    const s = this.parseChildren();
                    n[i] = 1 === Object.keys(s).length ? s[V] : new X([],s),
                    this.consumeOptional("//")
                }
                return n
            }
            peekStartsWith(t) {
                return this.remaining.startsWith(t)
            }
            consumeOptional(t) {
                return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length),
                !0)
            }
            capture(t) {
                if (!this.consumeOptional(t))
                    throw new C(4011,!1)
            }
        }
        function Bw(e) {
            return e.segments.length > 0 ? new X([],{
                [V]: e
            }) : e
        }
        function Hw(e) {
            const t = {};
            for (const r of Object.keys(e.children)) {
                const i = Hw(e.children[r]);
                if (r === V && 0 === i.segments.length && i.hasChildren())
                    for (const [s,a] of Object.entries(i.children))
                        t[s] = a;
                else
                    (i.segments.length > 0 || i.hasChildren()) && (t[r] = i)
            }
            return function fk(e) {
                if (1 === e.numberOfChildren && e.children[V]) {
                    const t = e.children[V];
                    return new X(e.segments.concat(t.segments),t.children)
                }
                return e
            }(new X(e.segments,t))
        }
        function ir(e) {
            return e instanceof fo
        }
        function $w(e) {
            let t;
            const o = Bw(function n(i) {
                const s = {};
                for (const u of i.children) {
                    const c = n(u);
                    s[u.outlet] = c
                }
                const a = new X(i.url,s);
                return i === e && (t = a),
                a
            }(e.root));
            return t ?? o
        }
        function Uw(e, t, n, r) {
            let o = e;
            for (; o.parent; )
                o = o.parent;
            if (0 === t.length)
                return Df(o, o, o, n, r);
            const i = function pk(e) {
                if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                    return new Gw(!0,0,e);
                let t = 0
                  , n = !1;
                const r = e.reduce( (o, i, s) => {
                    if ("object" == typeof i && null != i) {
                        if (i.outlets) {
                            const a = {};
                            return Object.entries(i.outlets).forEach( ([u,c]) => {
                                a[u] = "string" == typeof c ? c.split("/") : c
                            }
                            ),
                            [...o, {
                                outlets: a
                            }]
                        }
                        if (i.segmentPath)
                            return [...o, i.segmentPath]
                    }
                    return "string" != typeof i ? [...o, i] : 0 === s ? (i.split("/").forEach( (a, u) => {
                        0 == u && "." === a || (0 == u && "" === a ? n = !0 : ".." === a ? t++ : "" != a && o.push(a))
                    }
                    ),
                    o) : [...o, i]
                }
                , []);
                return new Gw(n,t,r)
            }(t);
            if (i.toRoot())
                return Df(o, o, new X([],{}), n, r);
            const s = function gk(e, t, n) {
                if (e.isAbsolute)
                    return new ru(t,!0,0);
                if (!n)
                    return new ru(t,!1,NaN);
                if (null === n.parent)
                    return new ru(n,!0,0);
                const r = nu(e.commands[0]) ? 0 : 1;
                return function mk(e, t, n) {
                    let r = e
                      , o = t
                      , i = n;
                    for (; i > o; ) {
                        if (i -= o,
                        r = r.parent,
                        !r)
                            throw new C(4005,!1);
                        o = r.segments.length
                    }
                    return new ru(r,!1,o - i)
                }(n, n.segments.length - 1 + r, e.numberOfDoubleDots)
            }(i, o, e)
              , a = s.processChildren ? ji(s.segmentGroup, s.index, i.commands) : qw(s.segmentGroup, s.index, i.commands);
            return Df(o, s.segmentGroup, a, n, r)
        }
        function nu(e) {
            return "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        }
        function Vi(e) {
            return "object" == typeof e && null != e && e.outlets
        }
        function Df(e, t, n, r, o) {
            let s, i = {};
            r && Object.entries(r).forEach( ([u,c]) => {
                i[u] = Array.isArray(c) ? c.map(l => `${l}`) : `${c}`
            }
            ),
            s = e === t ? n : zw(e, t, n);
            const a = Bw(Hw(s));
            return new fo(a,i,o)
        }
        function zw(e, t, n) {
            const r = {};
            return Object.entries(e.children).forEach( ([o,i]) => {
                r[o] = i === t ? n : zw(i, t, n)
            }
            ),
            new X(e.segments,r)
        }
        class Gw {
            constructor(t, n, r) {
                if (this.isAbsolute = t,
                this.numberOfDoubleDots = n,
                this.commands = r,
                t && r.length > 0 && nu(r[0]))
                    throw new C(4003,!1);
                const o = r.find(Vi);
                if (o && o !== Rw(r))
                    throw new C(4004,!1)
            }
            toRoot() {
                return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
            }
        }
        class ru {
            constructor(t, n, r) {
                this.segmentGroup = t,
                this.processChildren = n,
                this.index = r
            }
        }
        function qw(e, t, n) {
            if (e || (e = new X([],{})),
            0 === e.segments.length && e.hasChildren())
                return ji(e, t, n);
            const r = function vk(e, t, n) {
                let r = 0
                  , o = t;
                const i = {
                    match: !1,
                    pathIndex: 0,
                    commandIndex: 0
                };
                for (; o < e.segments.length; ) {
                    if (r >= n.length)
                        return i;
                    const s = e.segments[o]
                      , a = n[r];
                    if (Vi(a))
                        break;
                    const u = `${a}`
                      , c = r < n.length - 1 ? n[r + 1] : null;
                    if (o > 0 && void 0 === u)
                        break;
                    if (u && c && "object" == typeof c && void 0 === c.outlets) {
                        if (!Zw(u, c, s))
                            return i;
                        r += 2
                    } else {
                        if (!Zw(u, {}, s))
                            return i;
                        r++
                    }
                    o++
                }
                return {
                    match: !0,
                    pathIndex: o,
                    commandIndex: r
                }
            }(e, t, n)
              , o = n.slice(r.commandIndex);
            if (r.match && r.pathIndex < e.segments.length) {
                const i = new X(e.segments.slice(0, r.pathIndex),{});
                return i.children[V] = new X(e.segments.slice(r.pathIndex),e.children),
                ji(i, 0, o)
            }
            return r.match && 0 === o.length ? new X(e.segments,{}) : r.match && !e.hasChildren() ? Cf(e, t, n) : r.match ? ji(e, 0, o) : Cf(e, t, n)
        }
        function ji(e, t, n) {
            if (0 === n.length)
                return new X(e.segments,{});
            {
                const r = function yk(e) {
                    return Vi(e[0]) ? e[0].outlets : {
                        [V]: e
                    }
                }(n)
                  , o = {};
                if (Object.keys(r).some(i => i !== V) && e.children[V] && 1 === e.numberOfChildren && 0 === e.children[V].segments.length) {
                    const i = ji(e.children[V], t, n);
                    return new X(e.segments,i.children)
                }
                return Object.entries(r).forEach( ([i,s]) => {
                    "string" == typeof s && (s = [s]),
                    null !== s && (o[i] = qw(e.children[i], t, s))
                }
                ),
                Object.entries(e.children).forEach( ([i,s]) => {
                    void 0 === r[i] && (o[i] = s)
                }
                ),
                new X(e.segments,o)
            }
        }
        function Cf(e, t, n) {
            const r = e.segments.slice(0, t);
            let o = 0;
            for (; o < n.length; ) {
                const i = n[o];
                if (Vi(i)) {
                    const u = Dk(i.outlets);
                    return new X(r,u)
                }
                if (0 === o && nu(n[0])) {
                    r.push(new Fi(e.segments[t].path,Ww(n[0]))),
                    o++;
                    continue
                }
                const s = Vi(i) ? i.outlets[V] : `${i}`
                  , a = o < n.length - 1 ? n[o + 1] : null;
                s && a && nu(a) ? (r.push(new Fi(s,Ww(a))),
                o += 2) : (r.push(new Fi(s,{})),
                o++)
            }
            return new X(r,{})
        }
        function Dk(e) {
            const t = {};
            return Object.entries(e).forEach( ([n,r]) => {
                "string" == typeof r && (r = [r]),
                null !== r && (t[n] = Cf(new X([],{}), 0, r))
            }
            ),
            t
        }
        function Ww(e) {
            const t = {};
            return Object.entries(e).forEach( ([n,r]) => t[n] = `${r}`),
            t
        }
        function Zw(e, t, n) {
            return e == n.path && Zt(t, n.parameters)
        }
        const Bi = "imperative";
        class Yt {
            constructor(t, n) {
                this.id = t,
                this.url = n
            }
        }
        class ou extends Yt {
            constructor(t, n, r="imperative", o=null) {
                super(t, n),
                this.type = 0,
                this.navigationTrigger = r,
                this.restoredState = o
            }
            toString() {
                return `NavigationStart(id: ${this.id}, url: '${this.url}')`
            }
        }
        class Pn extends Yt {
            constructor(t, n, r) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.type = 1
            }
            toString() {
                return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
            }
        }
        class Hi extends Yt {
            constructor(t, n, r, o) {
                super(t, n),
                this.reason = r,
                this.code = o,
                this.type = 2
            }
            toString() {
                return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
            }
        }
        class ho extends Yt {
            constructor(t, n, r, o) {
                super(t, n),
                this.reason = r,
                this.code = o,
                this.type = 16
            }
        }
        class iu extends Yt {
            constructor(t, n, r, o) {
                super(t, n),
                this.error = r,
                this.target = o,
                this.type = 3
            }
            toString() {
                return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
            }
        }
        class Yw extends Yt {
            constructor(t, n, r, o) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.type = 4
            }
            toString() {
                return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class Ck extends Yt {
            constructor(t, n, r, o) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.type = 7
            }
            toString() {
                return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class wk extends Yt {
            constructor(t, n, r, o, i) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.shouldActivate = i,
                this.type = 8
            }
            toString() {
                return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
            }
        }
        class _k extends Yt {
            constructor(t, n, r, o) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.type = 5
            }
            toString() {
                return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class Ek extends Yt {
            constructor(t, n, r, o) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.type = 6
            }
            toString() {
                return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class bk {
            constructor(t) {
                this.route = t,
                this.type = 9
            }
            toString() {
                return `RouteConfigLoadStart(path: ${this.route.path})`
            }
        }
        class Ik {
            constructor(t) {
                this.route = t,
                this.type = 10
            }
            toString() {
                return `RouteConfigLoadEnd(path: ${this.route.path})`
            }
        }
        class Mk {
            constructor(t) {
                this.snapshot = t,
                this.type = 11
            }
            toString() {
                return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class Sk {
            constructor(t) {
                this.snapshot = t,
                this.type = 12
            }
            toString() {
                return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class Ak {
            constructor(t) {
                this.snapshot = t,
                this.type = 13
            }
            toString() {
                return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class Tk {
            constructor(t) {
                this.snapshot = t,
                this.type = 14
            }
            toString() {
                return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class Qw {
            constructor(t, n, r) {
                this.routerEvent = t,
                this.position = n,
                this.anchor = r,
                this.type = 15
            }
            toString() {
                return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
            }
        }
        class wf {
        }
        class _f {
            constructor(t) {
                this.url = t
            }
        }
        class Nk {
            constructor() {
                this.outlet = null,
                this.route = null,
                this.injector = null,
                this.children = new $i,
                this.attachRef = null
            }
        }
        let $i = ( () => {
            class e {
                constructor() {
                    this.contexts = new Map
                }
                onChildOutletCreated(n, r) {
                    const o = this.getOrCreateContext(n);
                    o.outlet = r,
                    this.contexts.set(n, o)
                }
                onChildOutletDestroyed(n) {
                    const r = this.getContext(n);
                    r && (r.outlet = null,
                    r.attachRef = null)
                }
                onOutletDeactivated() {
                    const n = this.contexts;
                    return this.contexts = new Map,
                    n
                }
                onOutletReAttached(n) {
                    this.contexts = n
                }
                getOrCreateContext(n) {
                    let r = this.getContext(n);
                    return r || (r = new Nk,
                    this.contexts.set(n, r)),
                    r
                }
                getContext(n) {
                    return this.contexts.get(n) || null
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        class Xw {
            constructor(t) {
                this._root = t
            }
            get root() {
                return this._root.value
            }
            parent(t) {
                const n = this.pathFromRoot(t);
                return n.length > 1 ? n[n.length - 2] : null
            }
            children(t) {
                const n = Ef(t, this._root);
                return n ? n.children.map(r => r.value) : []
            }
            firstChild(t) {
                const n = Ef(t, this._root);
                return n && n.children.length > 0 ? n.children[0].value : null
            }
            siblings(t) {
                const n = bf(t, this._root);
                return n.length < 2 ? [] : n[n.length - 2].children.map(o => o.value).filter(o => o !== t)
            }
            pathFromRoot(t) {
                return bf(t, this._root).map(n => n.value)
            }
        }
        function Ef(e, t) {
            if (e === t.value)
                return t;
            for (const n of t.children) {
                const r = Ef(e, n);
                if (r)
                    return r
            }
            return null
        }
        function bf(e, t) {
            if (e === t.value)
                return [t];
            for (const n of t.children) {
                const r = bf(e, n);
                if (r.length)
                    return r.unshift(t),
                    r
            }
            return []
        }
        class yn {
            constructor(t, n) {
                this.value = t,
                this.children = n
            }
            toString() {
                return `TreeNode(${this.value})`
            }
        }
        function po(e) {
            const t = {};
            return e && e.children.forEach(n => t[n.value.outlet] = n),
            t
        }
        class Jw extends Xw {
            constructor(t, n) {
                super(t),
                this.snapshot = n,
                If(this, t)
            }
            toString() {
                return this.snapshot.toString()
            }
        }
        function Kw(e, t) {
            const n = function Rk(e, t) {
                const s = new su([],{},{},"",{},V,t,null,{});
                return new t_("",new yn(s,[]))
            }(0, t)
              , r = new ht([new Fi("",{})])
              , o = new ht({})
              , i = new ht({})
              , s = new ht({})
              , a = new ht("")
              , u = new go(r,o,s,a,i,V,t,n.root);
            return u.snapshot = n.root,
            new Jw(new yn(u,[]),n)
        }
        class go {
            constructor(t, n, r, o, i, s, a, u) {
                this.urlSubject = t,
                this.paramsSubject = n,
                this.queryParamsSubject = r,
                this.fragmentSubject = o,
                this.dataSubject = i,
                this.outlet = s,
                this.component = a,
                this._futureSnapshot = u,
                this.title = this.dataSubject?.pipe(G(c => c[Pi])) ?? T(void 0),
                this.url = t,
                this.params = n,
                this.queryParams = r,
                this.fragment = o,
                this.data = i
            }
            get routeConfig() {
                return this._futureSnapshot.routeConfig
            }
            get root() {
                return this._routerState.root
            }
            get parent() {
                return this._routerState.parent(this)
            }
            get firstChild() {
                return this._routerState.firstChild(this)
            }
            get children() {
                return this._routerState.children(this)
            }
            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }
            get paramMap() {
                return this._paramMap || (this._paramMap = this.params.pipe(G(t => lo(t)))),
                this._paramMap
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(G(t => lo(t)))),
                this._queryParamMap
            }
            toString() {
                return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
            }
        }
        function e_(e, t="emptyOnly") {
            const n = e.pathFromRoot;
            let r = 0;
            if ("always" !== t)
                for (r = n.length - 1; r >= 1; ) {
                    const o = n[r]
                      , i = n[r - 1];
                    if (o.routeConfig && "" === o.routeConfig.path)
                        r--;
                    else {
                        if (i.component)
                            break;
                        r--
                    }
                }
            return function xk(e) {
                return e.reduce( (t, n) => ({
                    params: {
                        ...t.params,
                        ...n.params
                    },
                    data: {
                        ...t.data,
                        ...n.data
                    },
                    resolve: {
                        ...n.data,
                        ...t.resolve,
                        ...n.routeConfig?.data,
                        ...n._resolvedData
                    }
                }), {
                    params: {},
                    data: {},
                    resolve: {}
                })
            }(n.slice(r))
        }
        class su {
            get title() {
                return this.data?.[Pi]
            }
            constructor(t, n, r, o, i, s, a, u, c) {
                this.url = t,
                this.params = n,
                this.queryParams = r,
                this.fragment = o,
                this.data = i,
                this.outlet = s,
                this.component = a,
                this.routeConfig = u,
                this._resolve = c
            }
            get root() {
                return this._routerState.root
            }
            get parent() {
                return this._routerState.parent(this)
            }
            get firstChild() {
                return this._routerState.firstChild(this)
            }
            get children() {
                return this._routerState.children(this)
            }
            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }
            get paramMap() {
                return this._paramMap || (this._paramMap = lo(this.params)),
                this._paramMap
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = lo(this.queryParams)),
                this._queryParamMap
            }
            toString() {
                return `Route(url:'${this.url.map(r => r.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`
            }
        }
        class t_ extends Xw {
            constructor(t, n) {
                super(n),
                this.url = t,
                If(this, n)
            }
            toString() {
                return n_(this._root)
            }
        }
        function If(e, t) {
            t.value._routerState = e,
            t.children.forEach(n => If(e, n))
        }
        function n_(e) {
            const t = e.children.length > 0 ? ` { ${e.children.map(n_).join(", ")} } ` : "";
            return `${e.value}${t}`
        }
        function Mf(e) {
            if (e.snapshot) {
                const t = e.snapshot
                  , n = e._futureSnapshot;
                e.snapshot = n,
                Zt(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams),
                t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
                Zt(t.params, n.params) || e.paramsSubject.next(n.params),
                function Z1(e, t) {
                    if (e.length !== t.length)
                        return !1;
                    for (let n = 0; n < e.length; ++n)
                        if (!Zt(e[n], t[n]))
                            return !1;
                    return !0
                }(t.url, n.url) || e.urlSubject.next(n.url),
                Zt(t.data, n.data) || e.dataSubject.next(n.data)
            } else
                e.snapshot = e._futureSnapshot,
                e.dataSubject.next(e._futureSnapshot.data)
        }
        function Sf(e, t) {
            const n = Zt(e.params, t.params) && function J1(e, t) {
                return or(e, t) && e.every( (n, r) => Zt(n.parameters, t[r].parameters))
            }(e.url, t.url);
            return n && !(!e.parent != !t.parent) && (!e.parent || Sf(e.parent, t.parent))
        }
        let Af = ( () => {
            class e {
                constructor() {
                    this.activated = null,
                    this._activatedRoute = null,
                    this.name = V,
                    this.activateEvents = new le,
                    this.deactivateEvents = new le,
                    this.attachEvents = new le,
                    this.detachEvents = new le,
                    this.parentContexts = E($i),
                    this.location = E(xt),
                    this.changeDetector = E(xa),
                    this.environmentInjector = E(ot),
                    this.inputBinder = E(au, {
                        optional: !0
                    }),
                    this.supportsBindingToComponentInputs = !0
                }
                get activatedComponentRef() {
                    return this.activated
                }
                ngOnChanges(n) {
                    if (n.name) {
                        const {firstChange: r, previousValue: o} = n.name;
                        if (r)
                            return;
                        this.isTrackedInParentContexts(o) && (this.deactivate(),
                        this.parentContexts.onChildOutletDestroyed(o)),
                        this.initializeOutletWithName()
                    }
                }
                ngOnDestroy() {
                    this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name),
                    this.inputBinder?.unsubscribeFromRouteData(this)
                }
                isTrackedInParentContexts(n) {
                    return this.parentContexts.getContext(n)?.outlet === this
                }
                ngOnInit() {
                    this.initializeOutletWithName()
                }
                initializeOutletWithName() {
                    if (this.parentContexts.onChildOutletCreated(this.name, this),
                    this.activated)
                        return;
                    const n = this.parentContexts.getContext(this.name);
                    n?.route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector))
                }
                get isActivated() {
                    return !!this.activated
                }
                get component() {
                    if (!this.activated)
                        throw new C(4012,!1);
                    return this.activated.instance
                }
                get activatedRoute() {
                    if (!this.activated)
                        throw new C(4012,!1);
                    return this._activatedRoute
                }
                get activatedRouteData() {
                    return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                }
                detach() {
                    if (!this.activated)
                        throw new C(4012,!1);
                    this.location.detach();
                    const n = this.activated;
                    return this.activated = null,
                    this._activatedRoute = null,
                    this.detachEvents.emit(n.instance),
                    n
                }
                attach(n, r) {
                    this.activated = n,
                    this._activatedRoute = r,
                    this.location.insert(n.hostView),
                    this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                    this.attachEvents.emit(n.instance)
                }
                deactivate() {
                    if (this.activated) {
                        const n = this.component;
                        this.activated.destroy(),
                        this.activated = null,
                        this._activatedRoute = null,
                        this.deactivateEvents.emit(n)
                    }
                }
                activateWith(n, r) {
                    if (this.isActivated)
                        throw new C(4013,!1);
                    this._activatedRoute = n;
                    const o = this.location
                      , s = n.snapshot.component
                      , a = this.parentContexts.getOrCreateContext(this.name).children
                      , u = new Ok(n,a,o.injector);
                    this.activated = o.createComponent(s, {
                        index: o.length,
                        injector: u,
                        environmentInjector: r ?? this.environmentInjector
                    }),
                    this.changeDetector.markForCheck(),
                    this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                    this.activateEvents.emit(this.activated.instance)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275dir = O({
                    type: e,
                    selectors: [["router-outlet"]],
                    inputs: {
                        name: "name"
                    },
                    outputs: {
                        activateEvents: "activate",
                        deactivateEvents: "deactivate",
                        attachEvents: "attach",
                        detachEvents: "detach"
                    },
                    exportAs: ["outlet"],
                    standalone: !0,
                    features: [yt]
                })
                }
            }
            return e
        }
        )();
        class Ok {
            constructor(t, n, r) {
                this.route = t,
                this.childContexts = n,
                this.parent = r
            }
            get(t, n) {
                return t === go ? this.route : t === $i ? this.childContexts : this.parent.get(t, n)
            }
        }
        const au = new I("");
        let r_ = ( () => {
            class e {
                constructor() {
                    this.outletDataSubscriptions = new Map
                }
                bindActivatedRouteToOutletComponent(n) {
                    this.unsubscribeFromRouteData(n),
                    this.subscribeToRouteData(n)
                }
                unsubscribeFromRouteData(n) {
                    this.outletDataSubscriptions.get(n)?.unsubscribe(),
                    this.outletDataSubscriptions.delete(n)
                }
                subscribeToRouteData(n) {
                    const {activatedRoute: r} = n
                      , o = ff([r.queryParams, r.params, r.data]).pipe(bt( ([i,s,a], u) => (a = {
                        ...i,
                        ...s,
                        ...a
                    },
                    0 === u ? T(a) : Promise.resolve(a)))).subscribe(i => {
                        if (!n.isActivated || !n.activatedComponentRef || n.activatedRoute !== r || null === r.component)
                            return void this.unsubscribeFromRouteData(n);
                        const s = function oP(e) {
                            const t = $(e);
                            if (!t)
                                return null;
                            const n = new li(t);
                            return {
                                get selector() {
                                    return n.selector
                                },
                                get type() {
                                    return n.componentType
                                },
                                get inputs() {
                                    return n.inputs
                                },
                                get outputs() {
                                    return n.outputs
                                },
                                get ngContentSelectors() {
                                    return n.ngContentSelectors
                                },
                                get isStandalone() {
                                    return t.standalone
                                },
                                get isSignal() {
                                    return t.signals
                                }
                            }
                        }(r.component);
                        if (s)
                            for (const {templateName: a} of s.inputs)
                                n.activatedComponentRef.setInput(a, i[a]);
                        else
                            this.unsubscribeFromRouteData(n)
                    }
                    );
                    this.outletDataSubscriptions.set(n, o)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        function Ui(e, t, n) {
            if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
                const r = n.value;
                r._futureSnapshot = t.value;
                const o = function Fk(e, t, n) {
                    return t.children.map(r => {
                        for (const o of n.children)
                            if (e.shouldReuseRoute(r.value, o.value.snapshot))
                                return Ui(e, r, o);
                        return Ui(e, r)
                    }
                    )
                }(e, t, n);
                return new yn(r,o)
            }
            {
                if (e.shouldAttach(t.value)) {
                    const i = e.retrieve(t.value);
                    if (null !== i) {
                        const s = i.route;
                        return s.value._futureSnapshot = t.value,
                        s.children = t.children.map(a => Ui(e, a)),
                        s
                    }
                }
                const r = function kk(e) {
                    return new go(new ht(e.url),new ht(e.params),new ht(e.queryParams),new ht(e.fragment),new ht(e.data),e.outlet,e.component,e)
                }(t.value)
                  , o = t.children.map(i => Ui(e, i));
                return new yn(r,o)
            }
        }
        const Tf = "ngNavigationCancelingError";
        function o_(e, t) {
            const {redirectTo: n, navigationBehaviorOptions: r} = ir(t) ? {
                redirectTo: t,
                navigationBehaviorOptions: void 0
            } : t
              , o = i_(!1, 0, t);
            return o.url = n,
            o.navigationBehaviorOptions = r,
            o
        }
        function i_(e, t, n) {
            const r = new Error("NavigationCancelingError: " + (e || ""));
            return r[Tf] = !0,
            r.cancellationCode = t,
            n && (r.url = n),
            r
        }
        function s_(e) {
            return e && e[Tf]
        }
        let a_ = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275cmp = ps({
                    type: e,
                    selectors: [["ng-component"]],
                    standalone: !0,
                    features: [iD],
                    decls: 1,
                    vars: 0,
                    template: function(r, o) {
                        1 & r && Kr(0, "router-outlet")
                    },
                    dependencies: [Af],
                    encapsulation: 2
                })
                }
            }
            return e
        }
        )();
        function Nf(e) {
            const t = e.children && e.children.map(Nf)
              , n = t ? {
                ...e,
                children: t
            } : {
                ...e
            };
            return !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== V && (n.component = a_),
            n
        }
        function Ft(e) {
            return e.outlet || V
        }
        function zi(e) {
            if (!e)
                return null;
            if (e.routeConfig?._injector)
                return e.routeConfig._injector;
            for (let t = e.parent; t; t = t.parent) {
                const n = t.routeConfig;
                if (n?._loadedInjector)
                    return n._loadedInjector;
                if (n?._injector)
                    return n._injector
            }
            return null
        }
        class zk {
            constructor(t, n, r, o, i) {
                this.routeReuseStrategy = t,
                this.futureState = n,
                this.currState = r,
                this.forwardEvent = o,
                this.inputBindingEnabled = i
            }
            activate(t) {
                const n = this.futureState._root
                  , r = this.currState ? this.currState._root : null;
                this.deactivateChildRoutes(n, r, t),
                Mf(this.futureState.root),
                this.activateChildRoutes(n, r, t)
            }
            deactivateChildRoutes(t, n, r) {
                const o = po(n);
                t.children.forEach(i => {
                    const s = i.value.outlet;
                    this.deactivateRoutes(i, o[s], r),
                    delete o[s]
                }
                ),
                Object.values(o).forEach(i => {
                    this.deactivateRouteAndItsChildren(i, r)
                }
                )
            }
            deactivateRoutes(t, n, r) {
                const o = t.value
                  , i = n ? n.value : null;
                if (o === i)
                    if (o.component) {
                        const s = r.getContext(o.outlet);
                        s && this.deactivateChildRoutes(t, n, s.children)
                    } else
                        this.deactivateChildRoutes(t, n, r);
                else
                    i && this.deactivateRouteAndItsChildren(n, r)
            }
            deactivateRouteAndItsChildren(t, n) {
                t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, n) : this.deactivateRouteAndOutlet(t, n)
            }
            detachAndStoreRouteSubtree(t, n) {
                const r = n.getContext(t.value.outlet)
                  , o = r && t.value.component ? r.children : n
                  , i = po(t);
                for (const s of Object.keys(i))
                    this.deactivateRouteAndItsChildren(i[s], o);
                if (r && r.outlet) {
                    const s = r.outlet.detach()
                      , a = r.children.onOutletDeactivated();
                    this.routeReuseStrategy.store(t.value.snapshot, {
                        componentRef: s,
                        route: t,
                        contexts: a
                    })
                }
            }
            deactivateRouteAndOutlet(t, n) {
                const r = n.getContext(t.value.outlet)
                  , o = r && t.value.component ? r.children : n
                  , i = po(t);
                for (const s of Object.keys(i))
                    this.deactivateRouteAndItsChildren(i[s], o);
                r && (r.outlet && (r.outlet.deactivate(),
                r.children.onOutletDeactivated()),
                r.attachRef = null,
                r.route = null)
            }
            activateChildRoutes(t, n, r) {
                const o = po(n);
                t.children.forEach(i => {
                    this.activateRoutes(i, o[i.value.outlet], r),
                    this.forwardEvent(new Tk(i.value.snapshot))
                }
                ),
                t.children.length && this.forwardEvent(new Sk(t.value.snapshot))
            }
            activateRoutes(t, n, r) {
                const o = t.value
                  , i = n ? n.value : null;
                if (Mf(o),
                o === i)
                    if (o.component) {
                        const s = r.getOrCreateContext(o.outlet);
                        this.activateChildRoutes(t, n, s.children)
                    } else
                        this.activateChildRoutes(t, n, r);
                else if (o.component) {
                    const s = r.getOrCreateContext(o.outlet);
                    if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                        const a = this.routeReuseStrategy.retrieve(o.snapshot);
                        this.routeReuseStrategy.store(o.snapshot, null),
                        s.children.onOutletReAttached(a.contexts),
                        s.attachRef = a.componentRef,
                        s.route = a.route.value,
                        s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                        Mf(a.route.value),
                        this.activateChildRoutes(t, null, s.children)
                    } else {
                        const a = zi(o.snapshot);
                        s.attachRef = null,
                        s.route = o,
                        s.injector = a,
                        s.outlet && s.outlet.activateWith(o, s.injector),
                        this.activateChildRoutes(t, null, s.children)
                    }
                } else
                    this.activateChildRoutes(t, null, r)
            }
        }
        class u_ {
            constructor(t) {
                this.path = t,
                this.route = this.path[this.path.length - 1]
            }
        }
        class uu {
            constructor(t, n) {
                this.component = t,
                this.route = n
            }
        }
        function Gk(e, t, n) {
            const r = e._root;
            return Gi(r, t ? t._root : null, n, [r.value])
        }
        function mo(e, t) {
            const n = Symbol()
              , r = t.get(e, n);
            return r === n ? "function" != typeof e || function cI(e) {
                return null !== as(e)
            }(e) ? t.get(e) : e : r
        }
        function Gi(e, t, n, r, o={
            canDeactivateChecks: [],
            canActivateChecks: []
        }) {
            const i = po(t);
            return e.children.forEach(s => {
                (function Wk(e, t, n, r, o={
                    canDeactivateChecks: [],
                    canActivateChecks: []
                }) {
                    const i = e.value
                      , s = t ? t.value : null
                      , a = n ? n.getContext(e.value.outlet) : null;
                    if (s && i.routeConfig === s.routeConfig) {
                        const u = function Zk(e, t, n) {
                            if ("function" == typeof n)
                                return n(e, t);
                            switch (n) {
                            case "pathParamsChange":
                                return !or(e.url, t.url);
                            case "pathParamsOrQueryParamsChange":
                                return !or(e.url, t.url) || !Zt(e.queryParams, t.queryParams);
                            case "always":
                                return !0;
                            case "paramsOrQueryParamsChange":
                                return !Sf(e, t) || !Zt(e.queryParams, t.queryParams);
                            default:
                                return !Sf(e, t)
                            }
                        }(s, i, i.routeConfig.runGuardsAndResolvers);
                        u ? o.canActivateChecks.push(new u_(r)) : (i.data = s.data,
                        i._resolvedData = s._resolvedData),
                        Gi(e, t, i.component ? a ? a.children : null : n, r, o),
                        u && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new uu(a.outlet.component,s))
                    } else
                        s && qi(t, a, o),
                        o.canActivateChecks.push(new u_(r)),
                        Gi(e, null, i.component ? a ? a.children : null : n, r, o)
                }
                )(s, i[s.value.outlet], n, r.concat([s.value]), o),
                delete i[s.value.outlet]
            }
            ),
            Object.entries(i).forEach( ([s,a]) => qi(a, n.getContext(s), o)),
            o
        }
        function qi(e, t, n) {
            const r = po(e)
              , o = e.value;
            Object.entries(r).forEach( ([i,s]) => {
                qi(s, o.component ? t ? t.children.getContext(i) : null : t, n)
            }
            ),
            n.canDeactivateChecks.push(new uu(o.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null,o))
        }
        function Wi(e) {
            return "function" == typeof e
        }
        function c_(e) {
            return e instanceof Qa || "EmptyError" === e?.name
        }
        const cu = Symbol("INITIAL_VALUE");
        function yo() {
            return bt(e => ff(e.map(t => t.pipe(uo(1), function j1(...e) {
                const t = So(e);
                return ve( (n, r) => {
                    (t ? hf(e, n, t) : hf(e, n)).subscribe(r)
                }
                )
            }(cu)))).pipe(G(t => {
                for (const n of t)
                    if (!0 !== n) {
                        if (n === cu)
                            return cu;
                        if (!1 === n || n instanceof fo)
                            return n
                    }
                return !0
            }
            ), mn(t => t !== cu), uo(1)))
        }
        function l_(e) {
            return function sb(...e) {
                return ph(e)
            }(Oe(t => {
                if (ir(t))
                    throw o_(0, t)
            }
            ), G(t => !0 === t))
        }
        class lu {
            constructor(t) {
                this.segmentGroup = t || null
            }
        }
        class d_ {
            constructor(t) {
                this.urlTree = t
            }
        }
        function vo(e) {
            return xi(new lu(e))
        }
        function f_(e) {
            return xi(new d_(e))
        }
        class pL {
            constructor(t, n) {
                this.urlSerializer = t,
                this.urlTree = n
            }
            noMatchError(t) {
                return new C(4002,!1)
            }
            lineralizeSegments(t, n) {
                let r = []
                  , o = n.root;
                for (; ; ) {
                    if (r = r.concat(o.segments),
                    0 === o.numberOfChildren)
                        return T(r);
                    if (o.numberOfChildren > 1 || !o.children[V])
                        return xi(new C(4e3,!1));
                    o = o.children[V]
                }
            }
            applyRedirectCommands(t, n, r) {
                return this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r)
            }
            applyRedirectCreateUrlTree(t, n, r, o) {
                const i = this.createSegmentGroup(t, n.root, r, o);
                return new fo(i,this.createQueryParams(n.queryParams, this.urlTree.queryParams),n.fragment)
            }
            createQueryParams(t, n) {
                const r = {};
                return Object.entries(t).forEach( ([o,i]) => {
                    if ("string" == typeof i && i.startsWith(":")) {
                        const a = i.substring(1);
                        r[o] = n[a]
                    } else
                        r[o] = i
                }
                ),
                r
            }
            createSegmentGroup(t, n, r, o) {
                const i = this.createSegments(t, n.segments, r, o);
                let s = {};
                return Object.entries(n.children).forEach( ([a,u]) => {
                    s[a] = this.createSegmentGroup(t, u, r, o)
                }
                ),
                new X(i,s)
            }
            createSegments(t, n, r, o) {
                return n.map(i => i.path.startsWith(":") ? this.findPosParam(t, i, o) : this.findOrReturn(i, r))
            }
            findPosParam(t, n, r) {
                const o = r[n.path.substring(1)];
                if (!o)
                    throw new C(4001,!1);
                return o
            }
            findOrReturn(t, n) {
                let r = 0;
                for (const o of n) {
                    if (o.path === t.path)
                        return n.splice(r),
                        o;
                    r++
                }
                return t
            }
        }
        const Rf = {
            matched: !1,
            consumedSegments: [],
            remainingSegments: [],
            parameters: {},
            positionalParamSegments: {}
        };
        function gL(e, t, n, r, o) {
            const i = xf(e, t, n);
            return i.matched ? (r = function Vk(e, t) {
                return e.providers && !e._injector && (e._injector = ad(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
            }(t, r),
            function dL(e, t, n, r) {
                const o = t.canMatch;
                return o && 0 !== o.length ? T(o.map(s => {
                    const a = mo(s, e);
                    return On(function eL(e) {
                        return e && Wi(e.canMatch)
                    }(a) ? a.canMatch(t, n) : e.runInContext( () => a(t, n)))
                }
                )).pipe(yo(), l_()) : T(!0)
            }(r, t, n).pipe(G(s => !0 === s ? i : {
                ...Rf
            }))) : T(i)
        }
        function xf(e, t, n) {
            if ("" === t.path)
                return "full" === t.pathMatch && (e.hasChildren() || n.length > 0) ? {
                    ...Rf
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: n,
                    parameters: {},
                    positionalParamSegments: {}
                };
            const o = (t.matcher || W1)(n, e, t);
            if (!o)
                return {
                    ...Rf
                };
            const i = {};
            Object.entries(o.posParams ?? {}).forEach( ([a,u]) => {
                i[a] = u.path
            }
            );
            const s = o.consumed.length > 0 ? {
                ...i,
                ...o.consumed[o.consumed.length - 1].parameters
            } : i;
            return {
                matched: !0,
                consumedSegments: o.consumed,
                remainingSegments: n.slice(o.consumed.length),
                parameters: s,
                positionalParamSegments: o.posParams ?? {}
            }
        }
        function h_(e, t, n, r) {
            return n.length > 0 && function vL(e, t, n) {
                return n.some(r => du(e, t, r) && Ft(r) !== V)
            }(e, n, r) ? {
                segmentGroup: new X(t,yL(r, new X(n,e.children))),
                slicedSegments: []
            } : 0 === n.length && function DL(e, t, n) {
                return n.some(r => du(e, t, r))
            }(e, n, r) ? {
                segmentGroup: new X(e.segments,mL(e, 0, n, r, e.children)),
                slicedSegments: n
            } : {
                segmentGroup: new X(e.segments,e.children),
                slicedSegments: n
            }
        }
        function mL(e, t, n, r, o) {
            const i = {};
            for (const s of r)
                if (du(e, n, s) && !o[Ft(s)]) {
                    const a = new X([],{});
                    i[Ft(s)] = a
                }
            return {
                ...o,
                ...i
            }
        }
        function yL(e, t) {
            const n = {};
            n[V] = t;
            for (const r of e)
                if ("" === r.path && Ft(r) !== V) {
                    const o = new X([],{});
                    n[Ft(r)] = o
                }
            return n
        }
        function du(e, t, n) {
            return (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) && "" === n.path
        }
        class EL {
            constructor(t, n, r, o, i, s, a) {
                this.injector = t,
                this.configLoader = n,
                this.rootComponentType = r,
                this.config = o,
                this.urlTree = i,
                this.paramsInheritanceStrategy = s,
                this.urlSerializer = a,
                this.allowRedirects = !0,
                this.applyRedirects = new pL(this.urlSerializer,this.urlTree)
            }
            noMatchError(t) {
                return new C(4002,!1)
            }
            recognize() {
                const t = h_(this.urlTree.root, [], [], this.config).segmentGroup;
                return this.processSegmentGroup(this.injector, this.config, t, V).pipe(rr(n => {
                    if (n instanceof d_)
                        return this.allowRedirects = !1,
                        this.urlTree = n.urlTree,
                        this.match(n.urlTree);
                    throw n instanceof lu ? this.noMatchError(n) : n
                }
                ), G(n => {
                    const r = new su([],Object.freeze({}),Object.freeze({
                        ...this.urlTree.queryParams
                    }),this.urlTree.fragment,{},V,this.rootComponentType,null,{})
                      , o = new yn(r,n)
                      , i = new t_("",o)
                      , s = function hk(e, t, n=null, r=null) {
                        return Uw($w(e), t, n, r)
                    }(r, [], this.urlTree.queryParams, this.urlTree.fragment);
                    return s.queryParams = this.urlTree.queryParams,
                    i.url = this.urlSerializer.serialize(s),
                    this.inheritParamsAndData(i._root),
                    {
                        state: i,
                        tree: s
                    }
                }
                ))
            }
            match(t) {
                return this.processSegmentGroup(this.injector, this.config, t.root, V).pipe(rr(r => {
                    throw r instanceof lu ? this.noMatchError(r) : r
                }
                ))
            }
            inheritParamsAndData(t) {
                const n = t.value
                  , r = e_(n, this.paramsInheritanceStrategy);
                n.params = Object.freeze(r.params),
                n.data = Object.freeze(r.data),
                t.children.forEach(o => this.inheritParamsAndData(o))
            }
            processSegmentGroup(t, n, r, o) {
                return 0 === r.segments.length && r.hasChildren() ? this.processChildren(t, n, r) : this.processSegment(t, n, r, r.segments, o, !0)
            }
            processChildren(t, n, r) {
                const o = [];
                for (const i of Object.keys(r.children))
                    "primary" === i ? o.unshift(i) : o.push(i);
                return De(o).pipe(co(i => {
                    const s = r.children[i]
                      , a = function $k(e, t) {
                        const n = e.filter(r => Ft(r) === t);
                        return n.push(...e.filter(r => Ft(r) !== t)),
                        n
                    }(n, i);
                    return this.processSegmentGroup(t, a, s, i)
                }
                ), function $1(e, t) {
                    return ve(function H1(e, t, n, r, o) {
                        return (i, s) => {
                            let a = n
                              , u = t
                              , c = 0;
                            i.subscribe(me(s, l => {
                                const d = c++;
                                u = a ? e(u, l, d) : (a = !0,
                                l),
                                r && s.next(u)
                            }
                            , o && ( () => {
                                a && s.next(u),
                                s.complete()
                            }
                            )))
                        }
                    }(e, t, arguments.length >= 2, !0))
                }( (i, s) => (i.push(...s),
                i)), Xa(null), function U1(e, t) {
                    const n = arguments.length >= 2;
                    return r => r.pipe(e ? mn( (o, i) => e(o, i, r)) : Dn, gf(1), n ? Xa(t) : Tw( () => new Qa))
                }(), be(i => {
                    if (null === i)
                        return vo(r);
                    const s = p_(i);
                    return function bL(e) {
                        e.sort( (t, n) => t.value.outlet === V ? -1 : n.value.outlet === V ? 1 : t.value.outlet.localeCompare(n.value.outlet))
                    }(s),
                    T(s)
                }
                ))
            }
            processSegment(t, n, r, o, i, s) {
                return De(n).pipe(co(a => this.processSegmentAgainstRoute(a._injector ?? t, n, a, r, o, i, s).pipe(rr(u => {
                    if (u instanceof lu)
                        return T(null);
                    throw u
                }
                ))), nr(a => !!a), rr(a => {
                    if (c_(a))
                        return function wL(e, t, n) {
                            return 0 === t.length && !e.children[n]
                        }(r, o, i) ? T([]) : vo(r);
                    throw a
                }
                ))
            }
            processSegmentAgainstRoute(t, n, r, o, i, s, a) {
                return function CL(e, t, n, r) {
                    return !!(Ft(e) === r || r !== V && du(t, n, e)) && ("**" === e.path || xf(t, e, n).matched)
                }(r, o, i, s) ? void 0 === r.redirectTo ? this.matchSegmentAgainstRoute(t, o, r, i, s, a) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s) : vo(o) : vo(o)
            }
            expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
                return "**" === o.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
            }
            expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
                const i = this.applyRedirects.applyRedirectCommands([], r.redirectTo, {});
                return r.redirectTo.startsWith("/") ? f_(i) : this.applyRedirects.lineralizeSegments(r, i).pipe(be(s => {
                    const a = new X(s,{});
                    return this.processSegment(t, n, a, s, o, !1)
                }
                ))
            }
            expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
                const {matched: a, consumedSegments: u, remainingSegments: c, positionalParamSegments: l} = xf(n, o, i);
                if (!a)
                    return vo(n);
                const d = this.applyRedirects.applyRedirectCommands(u, o.redirectTo, l);
                return o.redirectTo.startsWith("/") ? f_(d) : this.applyRedirects.lineralizeSegments(o, d).pipe(be(f => this.processSegment(t, r, n, f.concat(c), s, !1)))
            }
            matchSegmentAgainstRoute(t, n, r, o, i, s) {
                let a;
                if ("**" === r.path) {
                    const u = o.length > 0 ? Rw(o).parameters : {};
                    a = T({
                        snapshot: new su(o,u,Object.freeze({
                            ...this.urlTree.queryParams
                        }),this.urlTree.fragment,g_(r),Ft(r),r.component ?? r._loadedComponent ?? null,r,m_(r)),
                        consumedSegments: [],
                        remainingSegments: []
                    }),
                    n.children = {}
                } else
                    a = gL(n, r, o, t).pipe(G( ({matched: u, consumedSegments: c, remainingSegments: l, parameters: d}) => u ? {
                        snapshot: new su(c,d,Object.freeze({
                            ...this.urlTree.queryParams
                        }),this.urlTree.fragment,g_(r),Ft(r),r.component ?? r._loadedComponent ?? null,r,m_(r)),
                        consumedSegments: c,
                        remainingSegments: l
                    } : null));
                return a.pipe(bt(u => null === u ? vo(n) : this.getChildConfig(t = r._injector ?? t, r, o).pipe(bt( ({routes: c}) => {
                    const l = r._loadedInjector ?? t
                      , {snapshot: d, consumedSegments: f, remainingSegments: h} = u
                      , {segmentGroup: p, slicedSegments: g} = h_(n, f, h, c);
                    if (0 === g.length && p.hasChildren())
                        return this.processChildren(l, c, p).pipe(G(D => null === D ? null : [new yn(d,D)]));
                    if (0 === c.length && 0 === g.length)
                        return T([new yn(d,[])]);
                    const y = Ft(r) === i;
                    return this.processSegment(l, c, p, g, y ? V : i, !0).pipe(G(D => [new yn(d,D)]))
                }
                ))))
            }
            getChildConfig(t, n, r) {
                return n.children ? T({
                    routes: n.children,
                    injector: t
                }) : n.loadChildren ? void 0 !== n._loadedRoutes ? T({
                    routes: n._loadedRoutes,
                    injector: n._loadedInjector
                }) : function lL(e, t, n, r) {
                    const o = t.canLoad;
                    return void 0 === o || 0 === o.length ? T(!0) : T(o.map(s => {
                        const a = mo(s, e);
                        return On(function Qk(e) {
                            return e && Wi(e.canLoad)
                        }(a) ? a.canLoad(t, n) : e.runInContext( () => a(t, n)))
                    }
                    )).pipe(yo(), l_())
                }(t, n, r).pipe(be(o => o ? this.configLoader.loadChildren(t, n).pipe(Oe(i => {
                    n._loadedRoutes = i.routes,
                    n._loadedInjector = i.injector
                }
                )) : function hL(e) {
                    return xi(i_(!1, 3))
                }())) : T({
                    routes: [],
                    injector: t
                })
            }
        }
        function IL(e) {
            const t = e.value.routeConfig;
            return t && "" === t.path
        }
        function p_(e) {
            const t = []
              , n = new Set;
            for (const r of e) {
                if (!IL(r)) {
                    t.push(r);
                    continue
                }
                const o = t.find(i => r.value.routeConfig === i.value.routeConfig);
                void 0 !== o ? (o.children.push(...r.children),
                n.add(o)) : t.push(r)
            }
            for (const r of n) {
                const o = p_(r.children);
                t.push(new yn(r.value,o))
            }
            return t.filter(r => !n.has(r))
        }
        function g_(e) {
            return e.data || {}
        }
        function m_(e) {
            return e.resolve || {}
        }
        function y_(e) {
            return "string" == typeof e.title || null === e.title
        }
        function Of(e) {
            return bt(t => {
                const n = e(t);
                return n ? De(n).pipe(G( () => t)) : T(t)
            }
            )
        }
        const Do = new I("ROUTES");
        let Pf = ( () => {
            class e {
                constructor() {
                    this.componentLoaders = new WeakMap,
                    this.childrenLoaders = new WeakMap,
                    this.compiler = E(XD)
                }
                loadComponent(n) {
                    if (this.componentLoaders.get(n))
                        return this.componentLoaders.get(n);
                    if (n._loadedComponent)
                        return T(n._loadedComponent);
                    this.onLoadStartListener && this.onLoadStartListener(n);
                    const r = On(n.loadComponent()).pipe(G(v_), Oe(i => {
                        this.onLoadEndListener && this.onLoadEndListener(n),
                        n._loadedComponent = i
                    }
                    ), Oi( () => {
                        this.componentLoaders.delete(n)
                    }
                    ))
                      , o = new Aw(r, () => new Et).pipe(pf());
                    return this.componentLoaders.set(n, o),
                    o
                }
                loadChildren(n, r) {
                    if (this.childrenLoaders.get(r))
                        return this.childrenLoaders.get(r);
                    if (r._loadedRoutes)
                        return T({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                    this.onLoadStartListener && this.onLoadStartListener(r);
                    const i = function xL(e, t, n, r) {
                        return On(e.loadChildren()).pipe(G(v_), be(o => o instanceof rD || Array.isArray(o) ? T(o) : De(t.compileModuleAsync(o))), G(o => {
                            r && r(e);
                            let i, s, a = !1;
                            return Array.isArray(o) ? (s = o,
                            !0) : (i = o.create(n).injector,
                            s = i.get(Do, [], {
                                optional: !0,
                                self: !0
                            }).flat()),
                            {
                                routes: s.map(Nf),
                                injector: i
                            }
                        }
                        ))
                    }(r, this.compiler, n, this.onLoadEndListener).pipe(Oi( () => {
                        this.childrenLoaders.delete(r)
                    }
                    ))
                      , s = new Aw(i, () => new Et).pipe(pf());
                    return this.childrenLoaders.set(r, s),
                    s
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        function v_(e) {
            return function OL(e) {
                return e && "object" == typeof e && "default"in e
            }(e) ? e.default : e
        }
        let fu = ( () => {
            class e {
                get hasRequestedNavigation() {
                    return 0 !== this.navigationId
                }
                constructor() {
                    this.currentNavigation = null,
                    this.currentTransition = null,
                    this.lastSuccessfulNavigation = null,
                    this.events = new Et,
                    this.transitionAbortSubject = new Et,
                    this.configLoader = E(Pf),
                    this.environmentInjector = E(ot),
                    this.urlSerializer = E(ki),
                    this.rootContexts = E($i),
                    this.inputBindingEnabled = null !== E(au, {
                        optional: !0
                    }),
                    this.navigationId = 0,
                    this.afterPreactivation = () => T(void 0),
                    this.rootComponentType = null,
                    this.configLoader.onLoadEndListener = o => this.events.next(new Ik(o)),
                    this.configLoader.onLoadStartListener = o => this.events.next(new bk(o))
                }
                complete() {
                    this.transitions?.complete()
                }
                handleNavigationRequest(n) {
                    const r = ++this.navigationId;
                    this.transitions?.next({
                        ...this.transitions.value,
                        ...n,
                        id: r
                    })
                }
                setupNavigations(n, r, o) {
                    return this.transitions = new ht({
                        id: 0,
                        currentUrlTree: r,
                        currentRawUrl: r,
                        currentBrowserUrl: r,
                        extractedUrl: n.urlHandlingStrategy.extract(r),
                        urlAfterRedirects: n.urlHandlingStrategy.extract(r),
                        rawUrl: r,
                        extras: {},
                        resolve: null,
                        reject: null,
                        promise: Promise.resolve(!0),
                        source: Bi,
                        restoredState: null,
                        currentSnapshot: o.snapshot,
                        targetSnapshot: null,
                        currentRouterState: o,
                        targetRouterState: null,
                        guards: {
                            canActivateChecks: [],
                            canDeactivateChecks: []
                        },
                        guardsResult: null
                    }),
                    this.transitions.pipe(mn(i => 0 !== i.id), G(i => ({
                        ...i,
                        extractedUrl: n.urlHandlingStrategy.extract(i.rawUrl)
                    })), bt(i => {
                        this.currentTransition = i;
                        let s = !1
                          , a = !1;
                        return T(i).pipe(Oe(u => {
                            this.currentNavigation = {
                                id: u.id,
                                initialUrl: u.rawUrl,
                                extractedUrl: u.extractedUrl,
                                trigger: u.source,
                                extras: u.extras,
                                previousNavigation: this.lastSuccessfulNavigation ? {
                                    ...this.lastSuccessfulNavigation,
                                    previousNavigation: null
                                } : null
                            }
                        }
                        ), bt(u => {
                            const c = u.currentBrowserUrl.toString()
                              , l = !n.navigated || u.extractedUrl.toString() !== c || c !== u.currentUrlTree.toString();
                            if (!l && "reload" !== (u.extras.onSameUrlNavigation ?? n.onSameUrlNavigation)) {
                                const f = "";
                                return this.events.next(new ho(u.id,this.urlSerializer.serialize(u.rawUrl),f,0)),
                                u.resolve(null),
                                kt
                            }
                            if (n.urlHandlingStrategy.shouldProcessUrl(u.rawUrl))
                                return T(u).pipe(bt(f => {
                                    const h = this.transitions?.getValue();
                                    return this.events.next(new ou(f.id,this.urlSerializer.serialize(f.extractedUrl),f.source,f.restoredState)),
                                    h !== this.transitions?.getValue() ? kt : Promise.resolve(f)
                                }
                                ), function ML(e, t, n, r, o, i) {
                                    return be(s => function _L(e, t, n, r, o, i, s="emptyOnly") {
                                        return new EL(e,t,n,r,o,s,i).recognize()
                                    }(e, t, n, r, s.extractedUrl, o, i).pipe(G( ({state: a, tree: u}) => ({
                                        ...s,
                                        targetSnapshot: a,
                                        urlAfterRedirects: u
                                    }))))
                                }(this.environmentInjector, this.configLoader, this.rootComponentType, n.config, this.urlSerializer, n.paramsInheritanceStrategy), Oe(f => {
                                    i.targetSnapshot = f.targetSnapshot,
                                    i.urlAfterRedirects = f.urlAfterRedirects,
                                    this.currentNavigation = {
                                        ...this.currentNavigation,
                                        finalUrl: f.urlAfterRedirects
                                    };
                                    const h = new Yw(f.id,this.urlSerializer.serialize(f.extractedUrl),this.urlSerializer.serialize(f.urlAfterRedirects),f.targetSnapshot);
                                    this.events.next(h)
                                }
                                ));
                            if (l && n.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)) {
                                const {id: f, extractedUrl: h, source: p, restoredState: g, extras: y} = u
                                  , D = new ou(f,this.urlSerializer.serialize(h),p,g);
                                this.events.next(D);
                                const m = Kw(0, this.rootComponentType).snapshot;
                                return this.currentTransition = i = {
                                    ...u,
                                    targetSnapshot: m,
                                    urlAfterRedirects: h,
                                    extras: {
                                        ...y,
                                        skipLocationChange: !1,
                                        replaceUrl: !1
                                    }
                                },
                                T(i)
                            }
                            {
                                const f = "";
                                return this.events.next(new ho(u.id,this.urlSerializer.serialize(u.extractedUrl),f,1)),
                                u.resolve(null),
                                kt
                            }
                        }
                        ), Oe(u => {
                            const c = new Ck(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot);
                            this.events.next(c)
                        }
                        ), G(u => (this.currentTransition = i = {
                            ...u,
                            guards: Gk(u.targetSnapshot, u.currentSnapshot, this.rootContexts)
                        },
                        i)), function nL(e, t) {
                            return be(n => {
                                const {targetSnapshot: r, currentSnapshot: o, guards: {canActivateChecks: i, canDeactivateChecks: s}} = n;
                                return 0 === s.length && 0 === i.length ? T({
                                    ...n,
                                    guardsResult: !0
                                }) : function rL(e, t, n, r) {
                                    return De(e).pipe(be(o => function cL(e, t, n, r, o) {
                                        const i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
                                        return i && 0 !== i.length ? T(i.map(a => {
                                            const u = zi(t) ?? o
                                              , c = mo(a, u);
                                            return On(function Kk(e) {
                                                return e && Wi(e.canDeactivate)
                                            }(c) ? c.canDeactivate(e, t, n, r) : u.runInContext( () => c(e, t, n, r))).pipe(nr())
                                        }
                                        )).pipe(yo()) : T(!0)
                                    }(o.component, o.route, n, t, r)), nr(o => !0 !== o, !0))
                                }(s, r, o, e).pipe(be(a => a && function Yk(e) {
                                    return "boolean" == typeof e
                                }(a) ? function oL(e, t, n, r) {
                                    return De(t).pipe(co(o => hf(function sL(e, t) {
                                        return null !== e && t && t(new Mk(e)),
                                        T(!0)
                                    }(o.route.parent, r), function iL(e, t) {
                                        return null !== e && t && t(new Ak(e)),
                                        T(!0)
                                    }(o.route, r), function uL(e, t, n) {
                                        const r = t[t.length - 1]
                                          , i = t.slice(0, t.length - 1).reverse().map(s => function qk(e) {
                                            const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                                            return t && 0 !== t.length ? {
                                                node: e,
                                                guards: t
                                            } : null
                                        }(s)).filter(s => null !== s).map(s => Sw( () => T(s.guards.map(u => {
                                            const c = zi(s.node) ?? n
                                              , l = mo(u, c);
                                            return On(function Jk(e) {
                                                return e && Wi(e.canActivateChild)
                                            }(l) ? l.canActivateChild(r, e) : c.runInContext( () => l(r, e))).pipe(nr())
                                        }
                                        )).pipe(yo())));
                                        return T(i).pipe(yo())
                                    }(e, o.path, n), function aL(e, t, n) {
                                        const r = t.routeConfig ? t.routeConfig.canActivate : null;
                                        if (!r || 0 === r.length)
                                            return T(!0);
                                        const o = r.map(i => Sw( () => {
                                            const s = zi(t) ?? n
                                              , a = mo(i, s);
                                            return On(function Xk(e) {
                                                return e && Wi(e.canActivate)
                                            }(a) ? a.canActivate(t, e) : s.runInContext( () => a(t, e))).pipe(nr())
                                        }
                                        ));
                                        return T(o).pipe(yo())
                                    }(e, o.route, n))), nr(o => !0 !== o, !0))
                                }(r, i, e, t) : T(a)), G(a => ({
                                    ...n,
                                    guardsResult: a
                                })))
                            }
                            )
                        }(this.environmentInjector, u => this.events.next(u)), Oe(u => {
                            if (i.guardsResult = u.guardsResult,
                            ir(u.guardsResult))
                                throw o_(0, u.guardsResult);
                            const c = new wk(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot,!!u.guardsResult);
                            this.events.next(c)
                        }
                        ), mn(u => !!u.guardsResult || (this.cancelNavigationTransition(u, "", 3),
                        !1)), Of(u => {
                            if (u.guards.canActivateChecks.length)
                                return T(u).pipe(Oe(c => {
                                    const l = new _k(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);
                                    this.events.next(l)
                                }
                                ), bt(c => {
                                    let l = !1;
                                    return T(c).pipe(function SL(e, t) {
                                        return be(n => {
                                            const {targetSnapshot: r, guards: {canActivateChecks: o}} = n;
                                            if (!o.length)
                                                return T(n);
                                            let i = 0;
                                            return De(o).pipe(co(s => function AL(e, t, n, r) {
                                                const o = e.routeConfig
                                                  , i = e._resolve;
                                                return void 0 !== o?.title && !y_(o) && (i[Pi] = o.title),
                                                function TL(e, t, n, r) {
                                                    const o = function NL(e) {
                                                        return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
                                                    }(e);
                                                    if (0 === o.length)
                                                        return T({});
                                                    const i = {};
                                                    return De(o).pipe(be(s => function RL(e, t, n, r) {
                                                        const o = zi(t) ?? r
                                                          , i = mo(e, o);
                                                        return On(i.resolve ? i.resolve(t, n) : o.runInContext( () => i(t, n)))
                                                    }(e[s], t, n, r).pipe(nr(), Oe(a => {
                                                        i[s] = a
                                                    }
                                                    ))), gf(1), function z1(e) {
                                                        return G( () => e)
                                                    }(i), rr(s => c_(s) ? kt : xi(s)))
                                                }(i, e, t, r).pipe(G(s => (e._resolvedData = s,
                                                e.data = e_(e, n).resolve,
                                                o && y_(o) && (e.data[Pi] = o.title),
                                                null)))
                                            }(s.route, r, e, t)), Oe( () => i++), gf(1), be(s => i === o.length ? T(n) : kt))
                                        }
                                        )
                                    }(n.paramsInheritanceStrategy, this.environmentInjector), Oe({
                                        next: () => l = !0,
                                        complete: () => {
                                            l || this.cancelNavigationTransition(c, "", 2)
                                        }
                                    }))
                                }
                                ), Oe(c => {
                                    const l = new Ek(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);
                                    this.events.next(l)
                                }
                                ))
                        }
                        ), Of(u => {
                            const c = l => {
                                const d = [];
                                l.routeConfig?.loadComponent && !l.routeConfig._loadedComponent && d.push(this.configLoader.loadComponent(l.routeConfig).pipe(Oe(f => {
                                    l.component = f
                                }
                                ), G( () => {}
                                )));
                                for (const f of l.children)
                                    d.push(...c(f));
                                return d
                            }
                            ;
                            return ff(c(u.targetSnapshot.root)).pipe(Xa(), uo(1))
                        }
                        ), Of( () => this.afterPreactivation()), G(u => {
                            const c = function Pk(e, t, n) {
                                const r = Ui(e, t._root, n ? n._root : void 0);
                                return new Jw(r,t)
                            }(n.routeReuseStrategy, u.targetSnapshot, u.currentRouterState);
                            return this.currentTransition = i = {
                                ...u,
                                targetRouterState: c
                            },
                            i
                        }
                        ), Oe( () => {
                            this.events.next(new wf)
                        }
                        ), ( (e, t, n, r) => G(o => (new zk(t,o.targetRouterState,o.currentRouterState,n,r).activate(e),
                        o)))(this.rootContexts, n.routeReuseStrategy, u => this.events.next(u), this.inputBindingEnabled), uo(1), Oe({
                            next: u => {
                                s = !0,
                                this.lastSuccessfulNavigation = this.currentNavigation,
                                this.events.next(new Pn(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects))),
                                n.titleStrategy?.updateTitle(u.targetRouterState.snapshot),
                                u.resolve(!0)
                            }
                            ,
                            complete: () => {
                                s = !0
                            }
                        }), function G1(e) {
                            return ve( (t, n) => {
                                Ke(e).subscribe(me(n, () => n.complete(), Au)),
                                !n.closed && t.subscribe(n)
                            }
                            )
                        }(this.transitionAbortSubject.pipe(Oe(u => {
                            throw u
                        }
                        ))), Oi( () => {
                            s || a || this.cancelNavigationTransition(i, "", 1),
                            this.currentNavigation?.id === i.id && (this.currentNavigation = null)
                        }
                        ), rr(u => {
                            if (a = !0,
                            s_(u))
                                this.events.next(new Hi(i.id,this.urlSerializer.serialize(i.extractedUrl),u.message,u.cancellationCode)),
                                function Lk(e) {
                                    return s_(e) && ir(e.url)
                                }(u) ? this.events.next(new _f(u.url)) : i.resolve(!1);
                            else {
                                this.events.next(new iu(i.id,this.urlSerializer.serialize(i.extractedUrl),u,i.targetSnapshot ?? void 0));
                                try {
                                    i.resolve(n.errorHandler(u))
                                } catch (c) {
                                    i.reject(c)
                                }
                            }
                            return kt
                        }
                        ))
                    }
                    ))
                }
                cancelNavigationTransition(n, r, o) {
                    const i = new Hi(n.id,this.urlSerializer.serialize(n.extractedUrl),r,o);
                    this.events.next(i),
                    n.resolve(!1)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        function D_(e) {
            return e !== Bi
        }
        let C_ = ( () => {
            class e {
                buildTitle(n) {
                    let r, o = n.root;
                    for (; void 0 !== o; )
                        r = this.getResolvedTitleForRoute(o) ?? r,
                        o = o.children.find(i => i.outlet === V);
                    return r
                }
                getResolvedTitleForRoute(n) {
                    return n.data[Pi]
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function() {
                        return E(PL)
                    },
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )()
          , PL = ( () => {
            class e extends C_ {
                constructor(n) {
                    super(),
                    this.title = n
                }
                updateTitle(n) {
                    const r = this.buildTitle(n);
                    void 0 !== r && this.title.setTitle(r)
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(Dw))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )()
          , FL = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function() {
                        return E(LL)
                    },
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        class kL {
            shouldDetach(t) {
                return !1
            }
            store(t, n) {}
            shouldAttach(t) {
                return !1
            }
            retrieve(t) {
                return null
            }
            shouldReuseRoute(t, n) {
                return t.routeConfig === n.routeConfig
            }
        }
        let LL = ( () => {
            class e extends kL {
                static{this.\u0275fac = function() {
                    let n;
                    return function(o) {
                        return (n || (n = function Te(e) {
                            return Kt( () => {
                                const t = e.prototype.constructor
                                  , n = t[en] || Sc(t)
                                  , r = Object.prototype;
                                let o = Object.getPrototypeOf(e.prototype).constructor;
                                for (; o && o !== r; ) {
                                    const i = o[en] || Sc(o);
                                    if (i && i !== n)
                                        return i;
                                    o = Object.getPrototypeOf(o)
                                }
                                return i => new i
                            }
                            )
                        }(e)))(o || e)
                    }
                }()
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        const hu = new I("",{
            providedIn: "root",
            factory: () => ({})
        });
        let VL = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: function() {
                        return E(jL)
                    },
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )()
          , jL = ( () => {
            class e {
                shouldProcessUrl(n) {
                    return !0
                }
                extract(n) {
                    return n
                }
                merge(n, r) {
                    return n
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        var Zi = function(e) {
            return e[e.COMPLETE = 0] = "COMPLETE",
            e[e.FAILED = 1] = "FAILED",
            e[e.REDIRECTING = 2] = "REDIRECTING",
            e
        }(Zi || {});
        function w_(e, t) {
            e.events.pipe(mn(n => n instanceof Pn || n instanceof Hi || n instanceof iu || n instanceof ho), G(n => n instanceof Pn || n instanceof ho ? Zi.COMPLETE : n instanceof Hi && (0 === n.code || 1 === n.code) ? Zi.REDIRECTING : Zi.FAILED), mn(n => n !== Zi.REDIRECTING), uo(1)).subscribe( () => {
                t()
            }
            )
        }
        function BL(e) {
            throw e
        }
        function HL(e, t, n) {
            return t.parse("/")
        }
        const $L = {
            paths: "exact",
            fragment: "ignored",
            matrixParams: "ignored",
            queryParams: "exact"
        }
          , UL = {
            paths: "subset",
            fragment: "ignored",
            matrixParams: "ignored",
            queryParams: "subset"
        };
        let _t = ( () => {
            class e {
                get navigationId() {
                    return this.navigationTransitions.navigationId
                }
                get browserPageId() {
                    return "computed" !== this.canceledNavigationResolution ? this.currentPageId : this.location.getState()?.\u0275routerPageId ?? this.currentPageId
                }
                get events() {
                    return this._events
                }
                constructor() {
                    this.disposed = !1,
                    this.currentPageId = 0,
                    this.console = E(QD),
                    this.isNgZoneEnabled = !1,
                    this._events = new Et,
                    this.options = E(hu, {
                        optional: !0
                    }) || {},
                    this.pendingTasks = E(Aa),
                    this.errorHandler = this.options.errorHandler || BL,
                    this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || HL,
                    this.navigated = !1,
                    this.lastSuccessfulId = -1,
                    this.urlHandlingStrategy = E(VL),
                    this.routeReuseStrategy = E(FL),
                    this.titleStrategy = E(C_),
                    this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore",
                    this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly",
                    this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred",
                    this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace",
                    this.config = E(Do, {
                        optional: !0
                    })?.flat() ?? [],
                    this.navigationTransitions = E(fu),
                    this.urlSerializer = E(ki),
                    this.location = E(jd),
                    this.componentInputBindingEnabled = !!E(au, {
                        optional: !0
                    }),
                    this.eventsSubscription = new Je,
                    this.isNgZoneEnabled = E(re)instanceof re && re.isInAngularZone(),
                    this.resetConfig(this.config),
                    this.currentUrlTree = new fo,
                    this.rawUrlTree = this.currentUrlTree,
                    this.browserUrlTree = this.currentUrlTree,
                    this.routerState = Kw(0, null),
                    this.navigationTransitions.setupNavigations(this, this.currentUrlTree, this.routerState).subscribe(n => {
                        this.lastSuccessfulId = n.id,
                        this.currentPageId = this.browserPageId
                    }
                    , n => {
                        this.console.warn(`Unhandled Navigation Error: ${n}`)
                    }
                    ),
                    this.subscribeToNavigationEvents()
                }
                subscribeToNavigationEvents() {
                    const n = this.navigationTransitions.events.subscribe(r => {
                        try {
                            const {currentTransition: o} = this.navigationTransitions;
                            if (null === o)
                                return void (__(r) && this._events.next(r));
                            if (r instanceof ou)
                                D_(o.source) && (this.browserUrlTree = o.extractedUrl);
                            else if (r instanceof ho)
                                this.rawUrlTree = o.rawUrl;
                            else if (r instanceof Yw) {
                                if ("eager" === this.urlUpdateStrategy) {
                                    if (!o.extras.skipLocationChange) {
                                        const i = this.urlHandlingStrategy.merge(o.urlAfterRedirects, o.rawUrl);
                                        this.setBrowserUrl(i, o)
                                    }
                                    this.browserUrlTree = o.urlAfterRedirects
                                }
                            } else if (r instanceof wf)
                                this.currentUrlTree = o.urlAfterRedirects,
                                this.rawUrlTree = this.urlHandlingStrategy.merge(o.urlAfterRedirects, o.rawUrl),
                                this.routerState = o.targetRouterState,
                                "deferred" === this.urlUpdateStrategy && (o.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, o),
                                this.browserUrlTree = o.urlAfterRedirects);
                            else if (r instanceof Hi)
                                0 !== r.code && 1 !== r.code && (this.navigated = !0),
                                (3 === r.code || 2 === r.code) && this.restoreHistory(o);
                            else if (r instanceof _f) {
                                const i = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl)
                                  , s = {
                                    skipLocationChange: o.extras.skipLocationChange,
                                    replaceUrl: "eager" === this.urlUpdateStrategy || D_(o.source)
                                };
                                this.scheduleNavigation(i, Bi, null, s, {
                                    resolve: o.resolve,
                                    reject: o.reject,
                                    promise: o.promise
                                })
                            }
                            r instanceof iu && this.restoreHistory(o, !0),
                            r instanceof Pn && (this.navigated = !0),
                            __(r) && this._events.next(r)
                        } catch (o) {
                            this.navigationTransitions.transitionAbortSubject.next(o)
                        }
                    }
                    );
                    this.eventsSubscription.add(n)
                }
                resetRootComponentType(n) {
                    this.routerState.root.component = n,
                    this.navigationTransitions.rootComponentType = n
                }
                initialNavigation() {
                    if (this.setUpLocationChangeListener(),
                    !this.navigationTransitions.hasRequestedNavigation) {
                        const n = this.location.getState();
                        this.navigateToSyncWithBrowser(this.location.path(!0), Bi, n)
                    }
                }
                setUpLocationChangeListener() {
                    this.locationSubscription || (this.locationSubscription = this.location.subscribe(n => {
                        const r = "popstate" === n.type ? "popstate" : "hashchange";
                        "popstate" === r && setTimeout( () => {
                            this.navigateToSyncWithBrowser(n.url, r, n.state)
                        }
                        , 0)
                    }
                    ))
                }
                navigateToSyncWithBrowser(n, r, o) {
                    const i = {
                        replaceUrl: !0
                    }
                      , s = o?.navigationId ? o : null;
                    if (o) {
                        const u = {
                            ...o
                        };
                        delete u.navigationId,
                        delete u.\u0275routerPageId,
                        0 !== Object.keys(u).length && (i.state = u)
                    }
                    const a = this.parseUrl(n);
                    this.scheduleNavigation(a, r, s, i)
                }
                get url() {
                    return this.serializeUrl(this.currentUrlTree)
                }
                getCurrentNavigation() {
                    return this.navigationTransitions.currentNavigation
                }
                get lastSuccessfulNavigation() {
                    return this.navigationTransitions.lastSuccessfulNavigation
                }
                resetConfig(n) {
                    this.config = n.map(Nf),
                    this.navigated = !1,
                    this.lastSuccessfulId = -1
                }
                ngOnDestroy() {
                    this.dispose()
                }
                dispose() {
                    this.navigationTransitions.complete(),
                    this.locationSubscription && (this.locationSubscription.unsubscribe(),
                    this.locationSubscription = void 0),
                    this.disposed = !0,
                    this.eventsSubscription.unsubscribe()
                }
                createUrlTree(n, r={}) {
                    const {relativeTo: o, queryParams: i, fragment: s, queryParamsHandling: a, preserveFragment: u} = r
                      , c = u ? this.currentUrlTree.fragment : s;
                    let d, l = null;
                    switch (a) {
                    case "merge":
                        l = {
                            ...this.currentUrlTree.queryParams,
                            ...i
                        };
                        break;
                    case "preserve":
                        l = this.currentUrlTree.queryParams;
                        break;
                    default:
                        l = i || null
                    }
                    null !== l && (l = this.removeEmptyProps(l));
                    try {
                        d = $w(o ? o.snapshot : this.routerState.snapshot.root)
                    } catch {
                        ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                        d = this.currentUrlTree.root
                    }
                    return Uw(d, n, l, c ?? null)
                }
                navigateByUrl(n, r={
                    skipLocationChange: !1
                }) {
                    const o = ir(n) ? n : this.parseUrl(n)
                      , i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                    return this.scheduleNavigation(i, Bi, null, r)
                }
                navigate(n, r={
                    skipLocationChange: !1
                }) {
                    return function zL(e) {
                        for (let t = 0; t < e.length; t++)
                            if (null == e[t])
                                throw new C(4008,!1)
                    }(n),
                    this.navigateByUrl(this.createUrlTree(n, r), r)
                }
                serializeUrl(n) {
                    return this.urlSerializer.serialize(n)
                }
                parseUrl(n) {
                    let r;
                    try {
                        r = this.urlSerializer.parse(n)
                    } catch (o) {
                        r = this.malformedUriErrorHandler(o, this.urlSerializer, n)
                    }
                    return r
                }
                isActive(n, r) {
                    let o;
                    if (o = !0 === r ? {
                        ...$L
                    } : !1 === r ? {
                        ...UL
                    } : r,
                    ir(n))
                        return Ow(this.currentUrlTree, n, o);
                    const i = this.parseUrl(n);
                    return Ow(this.currentUrlTree, i, o)
                }
                removeEmptyProps(n) {
                    return Object.keys(n).reduce( (r, o) => {
                        const i = n[o];
                        return null != i && (r[o] = i),
                        r
                    }
                    , {})
                }
                scheduleNavigation(n, r, o, i, s) {
                    if (this.disposed)
                        return Promise.resolve(!1);
                    let a, u, c;
                    s ? (a = s.resolve,
                    u = s.reject,
                    c = s.promise) : c = new Promise( (d, f) => {
                        a = d,
                        u = f
                    }
                    );
                    const l = this.pendingTasks.add();
                    return w_(this, () => {
                        queueMicrotask( () => this.pendingTasks.remove(l))
                    }
                    ),
                    this.navigationTransitions.handleNavigationRequest({
                        source: r,
                        restoredState: o,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        currentBrowserUrl: this.browserUrlTree,
                        rawUrl: n,
                        extras: i,
                        resolve: a,
                        reject: u,
                        promise: c,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState
                    }),
                    c.catch(d => Promise.reject(d))
                }
                setBrowserUrl(n, r) {
                    const o = this.urlSerializer.serialize(n);
                    if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
                        const s = {
                            ...r.extras.state,
                            ...this.generateNgRouterState(r.id, this.browserPageId)
                        };
                        this.location.replaceState(o, "", s)
                    } else {
                        const i = {
                            ...r.extras.state,
                            ...this.generateNgRouterState(r.id, this.browserPageId + 1)
                        };
                        this.location.go(o, "", i)
                    }
                }
                restoreHistory(n, r=!1) {
                    if ("computed" === this.canceledNavigationResolution) {
                        const i = this.currentPageId - this.browserPageId;
                        0 !== i ? this.location.historyGo(i) : this.currentUrlTree === this.getCurrentNavigation()?.finalUrl && 0 === i && (this.resetState(n),
                        this.browserUrlTree = n.currentUrlTree,
                        this.resetUrlToCurrentUrlTree())
                    } else
                        "replace" === this.canceledNavigationResolution && (r && this.resetState(n),
                        this.resetUrlToCurrentUrlTree())
                }
                resetState(n) {
                    this.routerState = n.currentRouterState,
                    this.currentUrlTree = n.currentUrlTree,
                    this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.rawUrl)
                }
                resetUrlToCurrentUrlTree() {
                    this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                }
                generateNgRouterState(n, r) {
                    return "computed" === this.canceledNavigationResolution ? {
                        navigationId: n,
                        \u0275routerPageId: r
                    } : {
                        navigationId: n
                    }
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        function __(e) {
            return !(e instanceof wf || e instanceof _f)
        }
        class E_ {
        }
        let WL = ( () => {
            class e {
                constructor(n, r, o, i, s) {
                    this.router = n,
                    this.injector = o,
                    this.preloadingStrategy = i,
                    this.loader = s
                }
                setUpPreloading() {
                    this.subscription = this.router.events.pipe(mn(n => n instanceof Pn), co( () => this.preload())).subscribe( () => {}
                    )
                }
                preload() {
                    return this.processRoutes(this.injector, this.router.config)
                }
                ngOnDestroy() {
                    this.subscription && this.subscription.unsubscribe()
                }
                processRoutes(n, r) {
                    const o = [];
                    for (const i of r) {
                        i.providers && !i._injector && (i._injector = ad(i.providers, n, `Route: ${i.path}`));
                        const s = i._injector ?? n
                          , a = i._loadedInjector ?? s;
                        (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad || i.loadComponent && !i._loadedComponent) && o.push(this.preloadConfig(s, i)),
                        (i.children || i._loadedRoutes) && o.push(this.processRoutes(a, i.children ?? i._loadedRoutes))
                    }
                    return De(o).pipe(lr())
                }
                preloadConfig(n, r) {
                    return this.preloadingStrategy.preload(r, () => {
                        let o;
                        o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(n, r) : T(null);
                        const i = o.pipe(be(s => null === s ? T(void 0) : (r._loadedRoutes = s.routes,
                        r._loadedInjector = s.injector,
                        this.processRoutes(s.injector ?? n, s.routes))));
                        return r.loadComponent && !r._loadedComponent ? De([i, this.loader.loadComponent(r)]).pipe(lr()) : i
                    }
                    )
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(_t),M(XD),M(ot),M(E_),M(Pf))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        const kf = new I("");
        let b_ = ( () => {
            class e {
                constructor(n, r, o, i, s={}) {
                    this.urlSerializer = n,
                    this.transitions = r,
                    this.viewportScroller = o,
                    this.zone = i,
                    this.options = s,
                    this.lastId = 0,
                    this.lastSource = "imperative",
                    this.restoredId = 0,
                    this.store = {},
                    s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled",
                    s.anchorScrolling = s.anchorScrolling || "disabled"
                }
                init() {
                    "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"),
                    this.routerEventsSubscription = this.createScrollEvents(),
                    this.scrollEventsSubscription = this.consumeScrollEvents()
                }
                createScrollEvents() {
                    return this.transitions.events.subscribe(n => {
                        n instanceof ou ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(),
                        this.lastSource = n.navigationTrigger,
                        this.restoredId = n.restoredState ? n.restoredState.navigationId : 0) : n instanceof Pn ? (this.lastId = n.id,
                        this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment)) : n instanceof ho && 0 === n.code && (this.lastSource = void 0,
                        this.restoredId = 0,
                        this.scheduleScrollEvent(n, this.urlSerializer.parse(n.url).fragment))
                    }
                    )
                }
                consumeScrollEvents() {
                    return this.transitions.events.subscribe(n => {
                        n instanceof Qw && (n.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(n.position) : n.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(n.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                    }
                    )
                }
                scheduleScrollEvent(n, r) {
                    this.zone.runOutsideAngular( () => {
                        setTimeout( () => {
                            this.zone.run( () => {
                                this.transitions.events.next(new Qw(n,"popstate" === this.lastSource ? this.store[this.restoredId] : null,r))
                            }
                            )
                        }
                        , 0)
                    }
                    )
                }
                ngOnDestroy() {
                    this.routerEventsSubscription?.unsubscribe(),
                    this.scrollEventsSubscription?.unsubscribe()
                }
                static{this.\u0275fac = function(r) {
                    !function $m() {
                        throw new Error("invalid")
                    }()
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        function vn(e, t) {
            return {
                \u0275kind: e,
                \u0275providers: t
            }
        }
        function M_() {
            const e = E(st);
            return t => {
                const n = e.get(io);
                if (t !== n.components[0])
                    return;
                const r = e.get(_t)
                  , o = e.get(S_);
                1 === e.get(Lf) && r.initialNavigation(),
                e.get(A_, null, B.Optional)?.setUpPreloading(),
                e.get(kf, null, B.Optional)?.init(),
                r.resetRootComponentType(n.componentTypes[0]),
                o.closed || (o.next(),
                o.complete(),
                o.unsubscribe())
            }
        }
        const S_ = new I("",{
            factory: () => new Et
        })
          , Lf = new I("",{
            providedIn: "root",
            factory: () => 1
        })
          , A_ = new I("");
        function XL(e) {
            return vn(0, [{
                provide: A_,
                useExisting: WL
            }, {
                provide: E_,
                useExisting: e
            }])
        }
        const T_ = new I("ROUTER_FORROOT_GUARD")
          , KL = [jd, {
            provide: ki,
            useClass: mf
        }, _t, $i, {
            provide: go,
            useFactory: function I_(e) {
                return e.routerState.root
            },
            deps: [_t]
        }, Pf, []];
        function eV() {
            return new oC("Router",_t)
        }
        let N_ = ( () => {
            class e {
                constructor(n) {}
                static forRoot(n, r) {
                    return {
                        ngModule: e,
                        providers: [KL, [], {
                            provide: Do,
                            multi: !0,
                            useValue: n
                        }, {
                            provide: T_,
                            useFactory: oV,
                            deps: [[_t, new xs, new Os]]
                        }, {
                            provide: hu,
                            useValue: r || {}
                        }, r?.useHash ? {
                            provide: tr,
                            useClass: cP
                        } : {
                            provide: tr,
                            useClass: FC
                        }, {
                            provide: kf,
                            useFactory: () => {
                                const e = E(TF)
                                  , t = E(re)
                                  , n = E(hu)
                                  , r = E(fu)
                                  , o = E(ki);
                                return n.scrollOffset && e.setOffset(n.scrollOffset),
                                new b_(o,r,e,t,n)
                            }
                        }, r?.preloadingStrategy ? XL(r.preloadingStrategy).\u0275providers : [], {
                            provide: oC,
                            multi: !0,
                            useFactory: eV
                        }, r?.initialNavigation ? iV(r) : [], r?.bindToComponentInputs ? vn(8, [r_, {
                            provide: au,
                            useExisting: r_
                        }]).\u0275providers : [], [{
                            provide: R_,
                            useFactory: M_
                        }, {
                            provide: Td,
                            multi: !0,
                            useExisting: R_
                        }]]
                    }
                }
                static forChild(n) {
                    return {
                        ngModule: e,
                        providers: [{
                            provide: Do,
                            multi: !0,
                            useValue: n
                        }]
                    }
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(T_, 8))
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({})
                }
            }
            return e
        }
        )();
        function oV(e) {
            return "guarded"
        }
        function iV(e) {
            return ["disabled" === e.initialNavigation ? vn(3, [{
                provide: wd,
                multi: !0,
                useFactory: () => {
                    const t = E(_t);
                    return () => {
                        t.setUpLocationChangeListener()
                    }
                }
            }, {
                provide: Lf,
                useValue: 2
            }]).\u0275providers : [], "enabledBlocking" === e.initialNavigation ? vn(2, [{
                provide: Lf,
                useValue: 0
            }, {
                provide: wd,
                multi: !0,
                deps: [st],
                useFactory: t => {
                    const n = t.get(aP, Promise.resolve());
                    return () => n.then( () => new Promise(r => {
                        const o = t.get(_t)
                          , i = t.get(S_);
                        w_(o, () => {
                            r(!0)
                        }
                        ),
                        t.get(fu).afterPreactivation = () => (r(!0),
                        i.closed ? T(void 0) : i),
                        o.initialNavigation()
                    }
                    ))
                }
            }]).\u0275providers : []]
        }
        const R_ = new I("");
        class pu {
        }
        class gu {
        }
        class ft {
            constructor(t) {
                this.normalizedNames = new Map,
                this.lazyUpdate = null,
                t ? "string" == typeof t ? this.lazyInit = () => {
                    this.headers = new Map,
                    t.split("\n").forEach(n => {
                        const r = n.indexOf(":");
                        if (r > 0) {
                            const o = n.slice(0, r)
                              , i = o.toLowerCase()
                              , s = n.slice(r + 1).trim();
                            this.maybeSetNormalizedName(o, i),
                            this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s])
                        }
                    }
                    )
                }
                : typeof Headers < "u" && t instanceof Headers ? (this.headers = new Map,
                t.forEach( (n, r) => {
                    this.setHeaderEntries(r, n)
                }
                )) : this.lazyInit = () => {
                    this.headers = new Map,
                    Object.entries(t).forEach( ([n,r]) => {
                        this.setHeaderEntries(n, r)
                    }
                    )
                }
                : this.headers = new Map
            }
            has(t) {
                return this.init(),
                this.headers.has(t.toLowerCase())
            }
            get(t) {
                this.init();
                const n = this.headers.get(t.toLowerCase());
                return n && n.length > 0 ? n[0] : null
            }
            keys() {
                return this.init(),
                Array.from(this.normalizedNames.values())
            }
            getAll(t) {
                return this.init(),
                this.headers.get(t.toLowerCase()) || null
            }
            append(t, n) {
                return this.clone({
                    name: t,
                    value: n,
                    op: "a"
                })
            }
            set(t, n) {
                return this.clone({
                    name: t,
                    value: n,
                    op: "s"
                })
            }
            delete(t, n) {
                return this.clone({
                    name: t,
                    value: n,
                    op: "d"
                })
            }
            maybeSetNormalizedName(t, n) {
                this.normalizedNames.has(n) || this.normalizedNames.set(n, t)
            }
            init() {
                this.lazyInit && (this.lazyInit instanceof ft ? this.copyFrom(this.lazyInit) : this.lazyInit(),
                this.lazyInit = null,
                this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)),
                this.lazyUpdate = null))
            }
            copyFrom(t) {
                t.init(),
                Array.from(t.headers.keys()).forEach(n => {
                    this.headers.set(n, t.headers.get(n)),
                    this.normalizedNames.set(n, t.normalizedNames.get(n))
                }
                )
            }
            clone(t) {
                const n = new ft;
                return n.lazyInit = this.lazyInit && this.lazyInit instanceof ft ? this.lazyInit : this,
                n.lazyUpdate = (this.lazyUpdate || []).concat([t]),
                n
            }
            applyUpdate(t) {
                const n = t.name.toLowerCase();
                switch (t.op) {
                case "a":
                case "s":
                    let r = t.value;
                    if ("string" == typeof r && (r = [r]),
                    0 === r.length)
                        return;
                    this.maybeSetNormalizedName(t.name, n);
                    const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
                    o.push(...r),
                    this.headers.set(n, o);
                    break;
                case "d":
                    const i = t.value;
                    if (i) {
                        let s = this.headers.get(n);
                        if (!s)
                            return;
                        s = s.filter(a => -1 === i.indexOf(a)),
                        0 === s.length ? (this.headers.delete(n),
                        this.normalizedNames.delete(n)) : this.headers.set(n, s)
                    } else
                        this.headers.delete(n),
                        this.normalizedNames.delete(n)
                }
            }
            setHeaderEntries(t, n) {
                const r = (Array.isArray(n) ? n : [n]).map(i => i.toString())
                  , o = t.toLowerCase();
                this.headers.set(o, r),
                this.maybeSetNormalizedName(t, o)
            }
            forEach(t) {
                this.init(),
                Array.from(this.normalizedNames.keys()).forEach(n => t(this.normalizedNames.get(n), this.headers.get(n)))
            }
        }
        class aV {
            encodeKey(t) {
                return x_(t)
            }
            encodeValue(t) {
                return x_(t)
            }
            decodeKey(t) {
                return decodeURIComponent(t)
            }
            decodeValue(t) {
                return decodeURIComponent(t)
            }
        }
        const cV = /%(\d[a-f0-9])/gi
          , lV = {
            40: "@",
            "3A": ":",
            24: "$",
            "2C": ",",
            "3B": ";",
            "3D": "=",
            "3F": "?",
            "2F": "/"
        };
        function x_(e) {
            return encodeURIComponent(e).replace(cV, (t, n) => lV[n] ?? t)
        }
        function mu(e) {
            return `${e}`
        }
        class Fn {
            constructor(t={}) {
                if (this.updates = null,
                this.cloneFrom = null,
                this.encoder = t.encoder || new aV,
                t.fromString) {
                    if (t.fromObject)
                        throw new Error("Cannot specify both fromString and fromObject.");
                    this.map = function uV(e, t) {
                        const n = new Map;
                        return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o => {
                            const i = o.indexOf("=")
                              , [s,a] = -1 == i ? [t.decodeKey(o), ""] : [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))]
                              , u = n.get(s) || [];
                            u.push(a),
                            n.set(s, u)
                        }
                        ),
                        n
                    }(t.fromString, this.encoder)
                } else
                    t.fromObject ? (this.map = new Map,
                    Object.keys(t.fromObject).forEach(n => {
                        const r = t.fromObject[n]
                          , o = Array.isArray(r) ? r.map(mu) : [mu(r)];
                        this.map.set(n, o)
                    }
                    )) : this.map = null
            }
            has(t) {
                return this.init(),
                this.map.has(t)
            }
            get(t) {
                this.init();
                const n = this.map.get(t);
                return n ? n[0] : null
            }
            getAll(t) {
                return this.init(),
                this.map.get(t) || null
            }
            keys() {
                return this.init(),
                Array.from(this.map.keys())
            }
            append(t, n) {
                return this.clone({
                    param: t,
                    value: n,
                    op: "a"
                })
            }
            appendAll(t) {
                const n = [];
                return Object.keys(t).forEach(r => {
                    const o = t[r];
                    Array.isArray(o) ? o.forEach(i => {
                        n.push({
                            param: r,
                            value: i,
                            op: "a"
                        })
                    }
                    ) : n.push({
                        param: r,
                        value: o,
                        op: "a"
                    })
                }
                ),
                this.clone(n)
            }
            set(t, n) {
                return this.clone({
                    param: t,
                    value: n,
                    op: "s"
                })
            }
            delete(t, n) {
                return this.clone({
                    param: t,
                    value: n,
                    op: "d"
                })
            }
            toString() {
                return this.init(),
                this.keys().map(t => {
                    const n = this.encoder.encodeKey(t);
                    return this.map.get(t).map(r => n + "=" + this.encoder.encodeValue(r)).join("&")
                }
                ).filter(t => "" !== t).join("&")
            }
            clone(t) {
                const n = new Fn({
                    encoder: this.encoder
                });
                return n.cloneFrom = this.cloneFrom || this,
                n.updates = (this.updates || []).concat(t),
                n
            }
            init() {
                null === this.map && (this.map = new Map),
                null !== this.cloneFrom && (this.cloneFrom.init(),
                this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))),
                this.updates.forEach(t => {
                    switch (t.op) {
                    case "a":
                    case "s":
                        const n = ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                        n.push(mu(t.value)),
                        this.map.set(t.param, n);
                        break;
                    case "d":
                        if (void 0 === t.value) {
                            this.map.delete(t.param);
                            break
                        }
                        {
                            let r = this.map.get(t.param) || [];
                            const o = r.indexOf(mu(t.value));
                            -1 !== o && r.splice(o, 1),
                            r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param)
                        }
                    }
                }
                ),
                this.cloneFrom = this.updates = null)
            }
        }
        class dV {
            constructor() {
                this.map = new Map
            }
            set(t, n) {
                return this.map.set(t, n),
                this
            }
            get(t) {
                return this.map.has(t) || this.map.set(t, t.defaultValue()),
                this.map.get(t)
            }
            delete(t) {
                return this.map.delete(t),
                this
            }
            has(t) {
                return this.map.has(t)
            }
            keys() {
                return this.map.keys()
            }
        }
        function O_(e) {
            return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
        }
        function P_(e) {
            return typeof Blob < "u" && e instanceof Blob
        }
        function F_(e) {
            return typeof FormData < "u" && e instanceof FormData
        }
        class Yi {
            constructor(t, n, r, o) {
                let i;
                if (this.url = n,
                this.body = null,
                this.reportProgress = !1,
                this.withCredentials = !1,
                this.responseType = "json",
                this.method = t.toUpperCase(),
                function fV(e) {
                    switch (e) {
                    case "DELETE":
                    case "GET":
                    case "HEAD":
                    case "OPTIONS":
                    case "JSONP":
                        return !1;
                    default:
                        return !0
                    }
                }(this.method) || o ? (this.body = void 0 !== r ? r : null,
                i = o) : i = r,
                i && (this.reportProgress = !!i.reportProgress,
                this.withCredentials = !!i.withCredentials,
                i.responseType && (this.responseType = i.responseType),
                i.headers && (this.headers = i.headers),
                i.context && (this.context = i.context),
                i.params && (this.params = i.params)),
                this.headers || (this.headers = new ft),
                this.context || (this.context = new dV),
                this.params) {
                    const s = this.params.toString();
                    if (0 === s.length)
                        this.urlWithParams = n;
                    else {
                        const a = n.indexOf("?");
                        this.urlWithParams = n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s
                    }
                } else
                    this.params = new Fn,
                    this.urlWithParams = n
            }
            serializeBody() {
                return null === this.body ? null : O_(this.body) || P_(this.body) || F_(this.body) || function hV(e) {
                    return typeof URLSearchParams < "u" && e instanceof URLSearchParams
                }(this.body) || "string" == typeof this.body ? this.body : this.body instanceof Fn ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
            }
            detectContentTypeHeader() {
                return null === this.body || F_(this.body) ? null : P_(this.body) ? this.body.type || null : O_(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof Fn ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null
            }
            clone(t={}) {
                const n = t.method || this.method
                  , r = t.url || this.url
                  , o = t.responseType || this.responseType
                  , i = void 0 !== t.body ? t.body : this.body
                  , s = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials
                  , a = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
                let u = t.headers || this.headers
                  , c = t.params || this.params;
                const l = t.context ?? this.context;
                return void 0 !== t.setHeaders && (u = Object.keys(t.setHeaders).reduce( (d, f) => d.set(f, t.setHeaders[f]), u)),
                t.setParams && (c = Object.keys(t.setParams).reduce( (d, f) => d.set(f, t.setParams[f]), c)),
                new Yi(n,r,i,{
                    params: c,
                    headers: u,
                    context: l,
                    reportProgress: a,
                    responseType: o,
                    withCredentials: s
                })
            }
        }
        var Co = function(e) {
            return e[e.Sent = 0] = "Sent",
            e[e.UploadProgress = 1] = "UploadProgress",
            e[e.ResponseHeader = 2] = "ResponseHeader",
            e[e.DownloadProgress = 3] = "DownloadProgress",
            e[e.Response = 4] = "Response",
            e[e.User = 5] = "User",
            e
        }(Co || {});
        class Vf {
            constructor(t, n=200, r="OK") {
                this.headers = t.headers || new ft,
                this.status = void 0 !== t.status ? t.status : n,
                this.statusText = t.statusText || r,
                this.url = t.url || null,
                this.ok = this.status >= 200 && this.status < 300
            }
        }
        class jf extends Vf {
            constructor(t={}) {
                super(t),
                this.type = Co.ResponseHeader
            }
            clone(t={}) {
                return new jf({
                    headers: t.headers || this.headers,
                    status: void 0 !== t.status ? t.status : this.status,
                    statusText: t.statusText || this.statusText,
                    url: t.url || this.url || void 0
                })
            }
        }
        class wo extends Vf {
            constructor(t={}) {
                super(t),
                this.type = Co.Response,
                this.body = void 0 !== t.body ? t.body : null
            }
            clone(t={}) {
                return new wo({
                    body: void 0 !== t.body ? t.body : this.body,
                    headers: t.headers || this.headers,
                    status: void 0 !== t.status ? t.status : this.status,
                    statusText: t.statusText || this.statusText,
                    url: t.url || this.url || void 0
                })
            }
        }
        class k_ extends Vf {
            constructor(t) {
                super(t, 0, "Unknown Error"),
                this.name = "HttpErrorResponse",
                this.ok = !1,
                this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${t.url || "(unknown url)"}` : `Http failure response for ${t.url || "(unknown url)"}: ${t.status} ${t.statusText}`,
                this.error = t.error || null
            }
        }
        function Bf(e, t) {
            return {
                body: t,
                headers: e.headers,
                context: e.context,
                observe: e.observe,
                params: e.params,
                reportProgress: e.reportProgress,
                responseType: e.responseType,
                withCredentials: e.withCredentials
            }
        }
        let L_ = ( () => {
            class e {
                constructor(n) {
                    this.handler = n
                }
                request(n, r, o={}) {
                    let i;
                    if (n instanceof Yi)
                        i = n;
                    else {
                        let u, c;
                        u = o.headers instanceof ft ? o.headers : new ft(o.headers),
                        o.params && (c = o.params instanceof Fn ? o.params : new Fn({
                            fromObject: o.params
                        })),
                        i = new Yi(n,r,void 0 !== o.body ? o.body : null,{
                            headers: u,
                            context: o.context,
                            params: c,
                            reportProgress: o.reportProgress,
                            responseType: o.responseType || "json",
                            withCredentials: o.withCredentials
                        })
                    }
                    const s = T(i).pipe(co(u => this.handler.handle(u)));
                    if (n instanceof Yi || "events" === o.observe)
                        return s;
                    const a = s.pipe(mn(u => u instanceof wo));
                    switch (o.observe || "body") {
                    case "body":
                        switch (i.responseType) {
                        case "arraybuffer":
                            return a.pipe(G(u => {
                                if (null !== u.body && !(u.body instanceof ArrayBuffer))
                                    throw new Error("Response is not an ArrayBuffer.");
                                return u.body
                            }
                            ));
                        case "blob":
                            return a.pipe(G(u => {
                                if (null !== u.body && !(u.body instanceof Blob))
                                    throw new Error("Response is not a Blob.");
                                return u.body
                            }
                            ));
                        case "text":
                            return a.pipe(G(u => {
                                if (null !== u.body && "string" != typeof u.body)
                                    throw new Error("Response is not a string.");
                                return u.body
                            }
                            ));
                        default:
                            return a.pipe(G(u => u.body))
                        }
                    case "response":
                        return a;
                    default:
                        throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)
                    }
                }
                delete(n, r={}) {
                    return this.request("DELETE", n, r)
                }
                get(n, r={}) {
                    return this.request("GET", n, r)
                }
                head(n, r={}) {
                    return this.request("HEAD", n, r)
                }
                jsonp(n, r) {
                    return this.request("JSONP", n, {
                        params: (new Fn).append(r, "JSONP_CALLBACK"),
                        observe: "body",
                        responseType: "json"
                    })
                }
                options(n, r={}) {
                    return this.request("OPTIONS", n, r)
                }
                patch(n, r, o={}) {
                    return this.request("PATCH", n, Bf(o, r))
                }
                post(n, r, o={}) {
                    return this.request("POST", n, Bf(o, r))
                }
                put(n, r, o={}) {
                    return this.request("PUT", n, Bf(o, r))
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(pu))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        function B_(e, t) {
            return t(e)
        }
        function gV(e, t) {
            return (n, r) => t.intercept(n, {
                handle: o => e(o, r)
            })
        }
        const yV = new I("")
          , Qi = new I("")
          , H_ = new I("");
        function vV() {
            let e = null;
            return (t, n) => {
                null === e && (e = (E(yV, {
                    optional: !0
                }) ?? []).reduceRight(gV, B_));
                const r = E(Aa)
                  , o = r.add();
                return e(t, n).pipe(Oi( () => r.remove(o)))
            }
        }
        let $_ = ( () => {
            class e extends pu {
                constructor(n, r) {
                    super(),
                    this.backend = n,
                    this.injector = r,
                    this.chain = null,
                    this.pendingTasks = E(Aa)
                }
                handle(n) {
                    if (null === this.chain) {
                        const o = Array.from(new Set([...this.injector.get(Qi), ...this.injector.get(H_, [])]));
                        this.chain = o.reduceRight( (i, s) => function mV(e, t, n) {
                            return (r, o) => n.runInContext( () => t(r, i => e(i, o)))
                        }(i, s, this.injector), B_)
                    }
                    const r = this.pendingTasks.add();
                    return this.chain(n, o => this.backend.handle(o)).pipe(Oi( () => this.pendingTasks.remove(r)))
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(gu),M(ot))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        const _V = /^\)\]\}',?\n/;
        let z_ = ( () => {
            class e {
                constructor(n) {
                    this.xhrFactory = n
                }
                handle(n) {
                    if ("JSONP" === n.method)
                        throw new C(-2800,!1);
                    const r = this.xhrFactory;
                    return (r.\u0275loadImpl ? De(r.\u0275loadImpl()) : T(null)).pipe(bt( () => new fe(i => {
                        const s = r.build();
                        if (s.open(n.method, n.urlWithParams),
                        n.withCredentials && (s.withCredentials = !0),
                        n.headers.forEach( (g, y) => s.setRequestHeader(g, y.join(","))),
                        n.headers.has("Accept") || s.setRequestHeader("Accept", "application/json, text/plain, */*"),
                        !n.headers.has("Content-Type")) {
                            const g = n.detectContentTypeHeader();
                            null !== g && s.setRequestHeader("Content-Type", g)
                        }
                        if (n.responseType) {
                            const g = n.responseType.toLowerCase();
                            s.responseType = "json" !== g ? g : "text"
                        }
                        const a = n.serializeBody();
                        let u = null;
                        const c = () => {
                            if (null !== u)
                                return u;
                            const g = s.statusText || "OK"
                              , y = new ft(s.getAllResponseHeaders())
                              , D = function EV(e) {
                                return "responseURL"in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
                            }(s) || n.url;
                            return u = new jf({
                                headers: y,
                                status: s.status,
                                statusText: g,
                                url: D
                            }),
                            u
                        }
                          , l = () => {
                            let {headers: g, status: y, statusText: D, url: m} = c()
                              , b = null;
                            204 !== y && (b = typeof s.response > "u" ? s.responseText : s.response),
                            0 === y && (y = b ? 200 : 0);
                            let A = y >= 200 && y < 300;
                            if ("json" === n.responseType && "string" == typeof b) {
                                const j = b;
                                b = b.replace(_V, "");
                                try {
                                    b = "" !== b ? JSON.parse(b) : null
                                } catch (Ee) {
                                    b = j,
                                    A && (A = !1,
                                    b = {
                                        error: Ee,
                                        text: b
                                    })
                                }
                            }
                            A ? (i.next(new wo({
                                body: b,
                                headers: g,
                                status: y,
                                statusText: D,
                                url: m || void 0
                            })),
                            i.complete()) : i.error(new k_({
                                error: b,
                                headers: g,
                                status: y,
                                statusText: D,
                                url: m || void 0
                            }))
                        }
                          , d = g => {
                            const {url: y} = c()
                              , D = new k_({
                                error: g,
                                status: s.status || 0,
                                statusText: s.statusText || "Unknown Error",
                                url: y || void 0
                            });
                            i.error(D)
                        }
                        ;
                        let f = !1;
                        const h = g => {
                            f || (i.next(c()),
                            f = !0);
                            let y = {
                                type: Co.DownloadProgress,
                                loaded: g.loaded
                            };
                            g.lengthComputable && (y.total = g.total),
                            "text" === n.responseType && s.responseText && (y.partialText = s.responseText),
                            i.next(y)
                        }
                          , p = g => {
                            let y = {
                                type: Co.UploadProgress,
                                loaded: g.loaded
                            };
                            g.lengthComputable && (y.total = g.total),
                            i.next(y)
                        }
                        ;
                        return s.addEventListener("load", l),
                        s.addEventListener("error", d),
                        s.addEventListener("timeout", d),
                        s.addEventListener("abort", d),
                        n.reportProgress && (s.addEventListener("progress", h),
                        null !== a && s.upload && s.upload.addEventListener("progress", p)),
                        s.send(a),
                        i.next({
                            type: Co.Sent
                        }),
                        () => {
                            s.removeEventListener("error", d),
                            s.removeEventListener("abort", d),
                            s.removeEventListener("load", l),
                            s.removeEventListener("timeout", d),
                            n.reportProgress && (s.removeEventListener("progress", h),
                            null !== a && s.upload && s.upload.removeEventListener("progress", p)),
                            s.readyState !== s.DONE && s.abort()
                        }
                    }
                    )))
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(tw))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        const Hf = new I("XSRF_ENABLED")
          , G_ = new I("XSRF_COOKIE_NAME",{
            providedIn: "root",
            factory: () => "XSRF-TOKEN"
        })
          , q_ = new I("XSRF_HEADER_NAME",{
            providedIn: "root",
            factory: () => "X-XSRF-TOKEN"
        });
        class W_ {
        }
        let MV = ( () => {
            class e {
                constructor(n, r, o) {
                    this.doc = n,
                    this.platform = r,
                    this.cookieName = o,
                    this.lastCookieString = "",
                    this.lastToken = null,
                    this.parseCount = 0
                }
                getToken() {
                    if ("server" === this.platform)
                        return null;
                    const n = this.doc.cookie || "";
                    return n !== this.lastCookieString && (this.parseCount++,
                    this.lastToken = GC(n, this.cookieName),
                    this.lastCookieString = n),
                    this.lastToken
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(lt),M(Yn),M(G_))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac
                })
                }
            }
            return e
        }
        )();
        function SV(e, t) {
            const n = e.url.toLowerCase();
            if (!E(Hf) || "GET" === e.method || "HEAD" === e.method || n.startsWith("http://") || n.startsWith("https://"))
                return t(e);
            const r = E(W_).getToken()
              , o = E(q_);
            return null != r && !e.headers.has(o) && (e = e.clone({
                headers: e.headers.set(o, r)
            })),
            t(e)
        }
        var kn = function(e) {
            return e[e.Interceptors = 0] = "Interceptors",
            e[e.LegacyInterceptors = 1] = "LegacyInterceptors",
            e[e.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration",
            e[e.NoXsrfProtection = 3] = "NoXsrfProtection",
            e[e.JsonpSupport = 4] = "JsonpSupport",
            e[e.RequestsMadeViaParent = 5] = "RequestsMadeViaParent",
            e[e.Fetch = 6] = "Fetch",
            e
        }(kn || {});
        function sr(e, t) {
            return {
                \u0275kind: e,
                \u0275providers: t
            }
        }
        function AV(...e) {
            const t = [L_, z_, $_, {
                provide: pu,
                useExisting: $_
            }, {
                provide: gu,
                useExisting: z_
            }, {
                provide: Qi,
                useValue: SV,
                multi: !0
            }, {
                provide: Hf,
                useValue: !0
            }, {
                provide: W_,
                useClass: MV
            }];
            for (const n of e)
                t.push(...n.\u0275providers);
            return function el(e) {
                return {
                    \u0275providers: e
                }
            }(t)
        }
        const Z_ = new I("LEGACY_INTERCEPTOR_FN");
        let NV = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({
                    providers: [AV(sr(kn.LegacyInterceptors, [{
                        provide: Z_,
                        useFactory: vV
                    }, {
                        provide: Qi,
                        useExisting: Z_,
                        multi: !0
                    }]))]
                })
                }
            }
            return e
        }
        )()
          , kV = ( () => {
            class e {
                constructor(n) {
                    this.httpClient = n,
                    this.baseURL = "http://localhost:8081/user"
                }
                getAllUsers() {
                    let n = new ft;
                    return n.append("Access-Control-Allow-Origin", "*"),
                    this.httpClient.get(this.baseURL + "/all", {
                        headers: n
                    })
                }
                deleteUser(n) {
                    let r = new ft;
                    return r.append("Access-Control-Allow-Origin", "*"),
                    this.httpClient.delete(this.baseURL + "/delete/" + n, {
                        headers: r
                    })
                }
                addUser(n, r) {
                    let o = {
                        firstName: n,
                        lastName: r
                    }
                      , i = this.baseURL + "/add"
                      , s = new ft;
                    return s.append("Access-Control-Allow-Origin", "*"),
                    this.httpClient.post(i, o, {
                        headers: s
                    })
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)(M(L_))
                }
                }static{this.\u0275prov = S({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
                }
            }
            return e
        }
        )();
        function LV(e, t) {
            if (1 & e) {
                const n = ql();
                ut(0, "tr")(1, "td", 3),
                ln(2),
                ct(),
                ut(3, "td", 3),
                ln(4),
                ct(),
                ut(5, "td", 3),
                ln(6),
                ct(),
                ut(7, "td")(8, "i", 10),
                Ye("click", function() {
                    const i = fc(n).$implicit;
                    return hc(jy().deleteUser((null == i ? null : i.id) || ""))
                }),
                ct()()()
            }
            if (2 & e) {
                const n = t.$implicit;
                si(2),
                yi(n.id),
                si(2),
                yi(n.firstName),
                si(2),
                yi(n.lastName)
            }
        }
        const VV = [{
            path: "",
            component: ( () => {
                class e {
                    constructor(n) {
                        this.userService = n,
                        this.usersList = []
                    }
                    ngOnInit() {
                        this.getAllUsers()
                    }
                    getAllUsers() {
                        this.userService.getAllUsers().subscribe(n => {
                            n.map(r => {
                                this.usersList.push(r)
                            }
                            )
                        }
                        , n => {
                            alert(n)
                        }
                        )
                    }
                    addUser(n, r) {
                        this.userService.addUser(n, r).subscribe(o => {
                            window.location.reload()
                        }
                        )
                    }
                    deleteUser(n) {
                        this.userService.deleteUser(n).subscribe(r => {
                            window.location.reload()
                        }
                        )
                    }
                    static{this.\u0275fac = function(r) {
                        return new (r || e)(w(kV))
                    }
                    }static{this.\u0275cmp = ps({
                        type: e,
                        selectors: [["app-home"]],
                        decls: 21,
                        vars: 1,
                        consts: [["rel", "stylesheet", "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"], [1, "centered-div"], [1, "table-container"], [1, "td"], [4, "ngFor", "ngForOf"], ["type", "text", "placeholder", "First Name"], ["firstname", ""], ["type", "text", "placeholder", "Last Name", 2, "margin-top", "10px"], ["lastname", ""], [2, "margin-top", "30px", 3, "click"], ["aria-hidden", "true", 1, "fa", "fa-trash", 3, "click"]],
                        template: function(r, o) {
                            if (1 & r) {
                                const i = ql();
                                Kr(0, "link", 0),
                                ut(1, "div", 1)(2, "table", 2)(3, "thead")(4, "tr")(5, "td", 3),
                                ln(6, "ID"),
                                ct(),
                                ut(7, "td", 3),
                                ln(8, "First Name"),
                                ct(),
                                ut(9, "td", 3),
                                ln(10, "Last Name"),
                                ct(),
                                ut(11, "td", 3),
                                ln(12, "Action"),
                                ct()()(),
                                ut(13, "tbody"),
                                function Ay(e, t, n, r, o, i, s, a) {
                                    const u = v()
                                      , c = U()
                                      , l = e + H
                                      , d = c.firstCreatePass ? function NT(e, t, n, r, o, i, s, a, u) {
                                        const c = t.consts
                                          , l = Ur(t, e, 4, s || null, In(c, a));
                                        Tl(t, n, l, In(c, u)),
                                        _s(t, l);
                                        const d = l.tView = Al(2, l, r, o, i, t.directiveRegistry, t.pipeRegistry, null, t.schemas, c, null);
                                        return null !== t.queries && (t.queries.template(t, l),
                                        d.queries = t.queries.embeddedTView(l)),
                                        l
                                    }(l, c, u, t, n, r, o, i, s) : c.data[l];
                                    Ht(d, !1);
                                    const f = Ty(c, u, d, e);
                                    ws() && zs(c, u, f, d),
                                    Re(f, u),
                                    ca(u, u[l] = Xm(f, u, f, d)),
                                    ys(d) && Ml(c, u, d),
                                    null != s && Sl(u, d, a)
                                }(14, LV, 9, 3, "tr", 4),
                                ct()(),
                                Kr(15, "input", 5, 6)(17, "input", 7, 8),
                                ut(19, "button", 9),
                                Ye("click", function() {
                                    fc(i);
                                    const a = Hl(16)
                                      , u = Hl(18);
                                    return hc(o.addUser(a.value, u.value))
                                }),
                                ln(20, "add User"),
                                ct()()
                            }
                            2 & r && (si(14),
                            $l("ngForOf", o.usersList))
                        },
                        dependencies: [ZC],
                        styles: [".centered-div[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;background-color:#f0f0f0}.table-container[_ngcontent-%COMP%]{background-color:#6be03d;padding:20px;border:1px solid #ccc;box-shadow:0 0 10px #0003;text-align:center;margin-bottom:20px}button[_ngcontent-%COMP%]{background-color:#6be03d;color:#fff;padding:10px 20px;border:none;cursor:pointer}.fa-trash[_ngcontent-%COMP%]{color:red;font-size:15px;cursor:pointer}"]
                    })
                    }
                }
                return e
            }
            )()
        }];
        let jV = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({
                    imports: [N_.forRoot(VV), N_]
                })
                }
            }
            return e
        }
        )()
          , BV = ( () => {
            class e {
                constructor() {}
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275cmp = ps({
                    type: e,
                    selectors: [["app-root"]],
                    decls: 1,
                    vars: 0,
                    template: function(r, o) {
                        1 & r && Kr(0, "router-outlet")
                    },
                    dependencies: [Af]
                })
                }
            }
            return e
        }
        )();
        const Eo = new I("CallSetDisabledState",{
            providedIn: "root",
            factory: () => Eu
        })
          , Eu = "always";
        let PE = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({})
                }
            }
            return e
        }
        )()
          , Vj = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({
                    imports: [PE]
                })
                }
            }
            return e
        }
        )()
          , Bj = ( () => {
            class e {
                static withConfig(n) {
                    return {
                        ngModule: e,
                        providers: [{
                            provide: Eo,
                            useValue: n.callSetDisabledState ?? Eu
                        }]
                    }
                }
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275mod = St({
                    type: e
                })
                }static{this.\u0275inj = gt({
                    imports: [Vj]
                })
                }
            }
            return e
        }
        )()
          , Hj = ( () => {
            class e {
                static{this.\u0275fac = function(r) {
                    return new (r || e)
                }
                }static{this.\u0275mod = St({
                    type: e,
                    bootstrap: [BV]
                })
                }static{this.\u0275inj = gt({
                    imports: [_1, Bj, jV, NV]
                })
                }
            }
            return e
        }
        )();
        C1().bootstrapModule(Hj).catch(e => console.error(e))
    }
}, J => {
    J(J.s = 732)
}
]);
