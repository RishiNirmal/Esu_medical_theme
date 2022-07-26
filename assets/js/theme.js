"use strict";

function _typeof(t) {
   return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
   } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
   })(t)
}! function (t) {
   var e;
   "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : ("undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Promise = t())
}(function () {
   return function i(a, s, c) {
      function l(n, t) {
         if (!s[n]) {
            if (!a[n]) {
               var e = "function" == typeof _dereq_ && _dereq_;
               if (!t && e) return e(n, !0);
               if (u) return u(n, !0);
               var r = new Error("Cannot find module '" + n + "'");
               throw r.code = "MODULE_NOT_FOUND", r
            }
            var o = s[n] = {
               exports: {}
            };
            a[n][0].call(o.exports, function (t) {
               var e = a[n][1][t];
               return l(e || t)
            }, o, o.exports, i, a, s, c)
         }
         return s[n].exports
      }
      for (var u = "function" == typeof _dereq_ && _dereq_, t = 0; t < c.length; t++) l(c[t]);
      return l
   }({
      1: [function (t, e, n) {
         e.exports = function (t) {
            function e(t) {
               var e = new r(t),
                  n = e.promise();
               return e.setHowMany(1), e.setUnwrap(), e.init(), n
            }
            var r = t._SomePromiseArray;
            t.any = e, t.prototype.any = function () {
               return e(this)
            }
         }
      }, {}],
      2: [function (t, e, n) {
         function r() {
            this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new s(16), this._normalQueue = new s(16), this._haveDrainedQueues = !1;
            var t = this;
            this.drainQueues = function () {
               t._drainQueues()
            }, this._schedule = a
         }

         function o(t) {
            for (; 0 < t.length();) ! function (t) {
               var e = t.shift(); {
                  var n, r;
                  "function" != typeof e ? e._settlePromises() : (n = t.shift(), r = t.shift(), e.call(n, r))
               }
            }(t)
         }
         var i;
         try {
            throw new Error
         } catch (t) {
            i = t
         }
         var a = t("./schedule"),
            s = t("./queue");
         r.prototype.setScheduler = function (t) {
            var e = this._schedule;
            return this._schedule = t, this._customScheduler = !0, e
         }, r.prototype.hasCustomScheduler = function () {
            return this._customScheduler
         }, r.prototype.haveItemsQueued = function () {
            return this._isTickUsed || this._haveDrainedQueues
         }, r.prototype.fatalError = function (t, e) {
            e ? (process.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), process.exit(2)) : this.throwLater(t)
         }, r.prototype.throwLater = function (t, e) {
            if (1 === arguments.length && (e = t, t = function () {
                  throw e
               }), "undefined" != typeof setTimeout) setTimeout(function () {
               t(e)
            }, 0);
            else try {
               this._schedule(function () {
                  t(e)
               })
            } catch (t) {
               throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
            }
         }, r.prototype.invokeLater = function (t, e, n) {
            this._lateQueue.push(t, e, n), this._queueTick()
         }, r.prototype.invoke = function (t, e, n) {
            this._normalQueue.push(t, e, n), this._queueTick()
         }, r.prototype.settlePromises = function (t) {
            this._normalQueue._pushOne(t), this._queueTick()
         }, r.prototype._drainQueues = function () {
            o(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, o(this._lateQueue)
         }, r.prototype._queueTick = function () {
            this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues))
         }, r.prototype._reset = function () {
            this._isTickUsed = !1
         }, e.exports = r, e.exports.firstLineError = i
      }, {
         "./queue": 26,
         "./schedule": 29
      }],
      3: [function (t, e, n) {
         e.exports = function (i, a, s, c) {
            function n(t, e) {
               this._reject(e)
            }

            function l(t, e) {
               e.promiseRejectionQueued = !0, e.bindingPromise._then(n, n, null, this, t)
            }

            function u(t, e) {
               0 == (50397184 & this._bitField) && this._resolveCallback(e.target)
            }

            function p(t, e) {
               e.promiseRejectionQueued || this._reject(t)
            }
            var h = !1;
            i.prototype.bind = function (t) {
               h || (h = !0, i.prototype._propagateFrom = c.propagateFromFunction(), i.prototype._boundValue = c.boundValueFunction());
               var e = s(t),
                  n = new i(a);
               n._propagateFrom(this, 1);
               var r, o = this._target();
               return n._setBoundTo(e), e instanceof i ? (r = {
                  promiseRejectionQueued: !1,
                  promise: n,
                  target: o,
                  bindingPromise: e
               }, o._then(a, l, void 0, n, r), e._then(u, p, void 0, n, r), n._setOnCancel(e)) : n._resolveCallback(o), n
            }, i.prototype._setBoundTo = function (t) {
               void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField
            }, i.prototype._isBound = function () {
               return 2097152 == (2097152 & this._bitField)
            }, i.bind = function (t, e) {
               return i.resolve(e).bind(t)
            }
         }
      }, {}],
      4: [function (t, e, n) {
         var r;
         "undefined" != typeof Promise && (r = Promise);
         var o = t("./promise")();
         o.noConflict = function () {
            try {
               Promise === o && (Promise = r)
            } catch (t) {}
            return o
         }, e.exports = o
      }, {
         "./promise": 22
      }],
      5: [function (t, e, n) {
         var r, o, i = Object.create;
         i && (r = i(null), o = i(null), r[" size"] = o[" size"] = 0), e.exports = function (o) {
            function n(t) {
               return function (t, e) {
                  var n;
                  if (null != t && (n = t[e]), "function" == typeof n) return n;
                  var r = "Object " + a.classString(t) + " has no method '" + a.toString(e) + "'";
                  throw new o.TypeError(r)
               }(t, this.pop()).apply(t, this)
            }

            function r(t) {
               return t[this]
            }

            function i(t) {
               var e = +this;
               return e < 0 && (e = Math.max(0, e + t.length)), t[e]
            }
            var a = t("./util"),
               s = a.canEvaluate;
            a.isIdentifier, o.prototype.call = function (t) {
               var e = [].slice.call(arguments, 1);
               return e.push(t), this._then(n, void 0, void 0, e, void 0)
            }, o.prototype.get = function (t) {
               var e, n;
               return n = "number" == typeof t ? i : s && null !== (e = (void 0)(t)) ? e : r, this._then(n, void 0, void 0, t, void 0)
            }
         }
      }, {
         "./util": 36
      }],
      6: [function (c, t, e) {
         t.exports = function (t, e, n, r) {
            var o = c("./util"),
               i = o.tryCatch,
               a = o.errorObj,
               s = t._async;
            t.prototype.break = t.prototype.cancel = function () {
               if (!r.cancellation()) return this._warn("cancellation is disabled");
               for (var t = this, e = t; t._isCancellable();) {
                  if (!t._cancelBy(e)) {
                     e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                     break
                  }
                  var n = t._cancellationParent;
                  if (null == n || !n._isCancellable()) {
                     t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                     break
                  }
                  t._isFollowing() && t._followee().cancel(), t._setWillBeCancelled(), e = t, t = n
               }
            }, t.prototype._branchHasCancelled = function () {
               this._branchesRemainingToCancel--
            }, t.prototype._enoughBranchesHaveCancelled = function () {
               return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0
            }, t.prototype._cancelBy = function (t) {
               return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), !0))
            }, t.prototype._cancelBranched = function () {
               this._enoughBranchesHaveCancelled() && this._cancel()
            }, t.prototype._cancel = function () {
               this._isCancellable() && (this._setCancelled(), s.invoke(this._cancelPromises, this, void 0))
            }, t.prototype._cancelPromises = function () {
               0 < this._length() && this._settlePromises()
            }, t.prototype._unsetOnCancel = function () {
               this._onCancelField = void 0
            }, t.prototype._isCancellable = function () {
               return this.isPending() && !this._isCancelled()
            }, t.prototype.isCancellable = function () {
               return this.isPending() && !this.isCancelled()
            }, t.prototype._doInvokeOnCancel = function (t, e) {
               var n;
               if (o.isArray(t))
                  for (var r = 0; r < t.length; ++r) this._doInvokeOnCancel(t[r], e);
               else void 0 !== t && ("function" == typeof t ? e || (n = i(t).call(this._boundValue())) === a && (this._attachExtraTrace(n.e), s.throwLater(n.e)) : t._resultCancelled(this))
            }, t.prototype._invokeOnCancel = function () {
               var t = this._onCancel();
               this._unsetOnCancel(), s.invoke(this._doInvokeOnCancel, this, t)
            }, t.prototype._invokeInternalOnCancel = function () {
               this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel())
            }, t.prototype._resultCancelled = function () {
               this.cancel()
            }
         }
      }, {
         "./util": 36
      }],
      7: [function (t, e, n) {
         e.exports = function (p) {
            var h = t("./util"),
               f = t("./es5").keys,
               d = h.tryCatch,
               _ = h.errorObj;
            return function (c, l, u) {
               return function (t) {
                  var e = u._boundValue();
                  t: for (var n = 0; n < c.length; ++n) {
                     var r = c[n];
                     if (r === Error || null != r && r.prototype instanceof Error) {
                        if (t instanceof r) return d(l).call(e, t)
                     } else if ("function" == typeof r) {
                        var o = d(r).call(e, t);
                        if (o === _) return o;
                        if (o) return d(l).call(e, t)
                     } else if (h.isObject(t)) {
                        for (var i = f(r), a = 0; a < i.length; ++a) {
                           var s = i[a];
                           if (r[s] != t[s]) continue t
                        }
                        return d(l).call(e, t)
                     }
                  }
                  return p
               }
            }
         }
      }, {
         "./es5": 13,
         "./util": 36
      }],
      8: [function (t, e, n) {
         e.exports = function (i) {
            function a() {
               this._trace = new a.CapturedTrace(s())
            }

            function s() {
               var t = n.length - 1;
               return 0 <= t ? n[t] : void 0
            }
            var c = !1,
               n = [];
            return i.prototype._promiseCreated = function () {}, i.prototype._pushContext = function () {}, i.prototype._popContext = function () {
               return null
            }, i._peekContext = i.prototype._peekContext = function () {}, a.prototype._pushContext = function () {
               void 0 !== this._trace && (this._trace._promiseCreated = null, n.push(this._trace))
            }, a.prototype._popContext = function () {
               if (void 0 === this._trace) return null;
               var t = n.pop(),
                  e = t._promiseCreated;
               return t._promiseCreated = null, e
            }, a.CapturedTrace = null, a.create = function () {
               return c ? new a : void 0
            }, a.deactivateLongStackTraces = function () {}, a.activateLongStackTraces = function () {
               var t = i.prototype._pushContext,
                  e = i.prototype._popContext,
                  n = i._peekContext,
                  r = i.prototype._peekContext,
                  o = i.prototype._promiseCreated;
               a.deactivateLongStackTraces = function () {
                  i.prototype._pushContext = t, i.prototype._popContext = e, i._peekContext = n, i.prototype._peekContext = r, i.prototype._promiseCreated = o, c = !1
               }, c = !0, i.prototype._pushContext = a.prototype._pushContext, i.prototype._popContext = a.prototype._popContext, i._peekContext = i.prototype._peekContext = s, i.prototype._promiseCreated = function () {
                  var t = this._peekContext();
                  t && null == t._promiseCreated && (t._promiseCreated = this)
               }
            }, a
         }
      }, {}],
      9: [function (ot, t, e) {
         t.exports = function (a, r, o, i) {
            function t(t, e) {
               return {
                  promise: e
               }
            }

            function s() {
               return !1
            }

            function c(t, e, n) {
               var r = this;
               try {
                  t(e, n, function (t) {
                     if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + O.toString(t));
                     r._attachCancellationCallback(t)
                  })
               } catch (t) {
                  return t
               }
            }

            function l(t) {
               if (!this._isCancellable()) return this;
               var e = this._onCancel();
               void 0 !== e ? O.isArray(e) ? e.push(t) : this._setOnCancel([e, t]) : this._setOnCancel(t)
            }

            function u() {
               return this._onCancelField
            }

            function p(t) {
               this._onCancelField = t
            }

            function h() {
               this._cancellationParent = void 0, this._onCancelField = void 0
            }

            function f(t, e) {
               var n;
               0 != (1 & e) && (void 0 === (n = (this._cancellationParent = t)._branchesRemainingToCancel) && (n = 0), t._branchesRemainingToCancel = n + 1), 0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo)
            }

            function e() {
               var t = this._boundTo;
               return void 0 !== t && t instanceof a ? t.isFulfilled() ? t.value() : void 0 : t
            }

            function d() {
               this._trace = new j(this._peekContext())
            }

            function _(t, e) {
               var n, r;
               $(t) && (void 0 !== (n = this._trace) && e && (n = n._parent), void 0 !== n ? n.attachExtraTrace(t) : t.__stackCleaned__ || (r = m(t), O.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), O.notEnumerableProp(t, "__stackCleaned__", !0)))
            }

            function v() {
               this._trace = void 0
            }

            function y(t, e, n) {
               var r, o, i;
               rt.warnings && (o = new R(t), e ? n._attachExtraTrace(o) : rt.longStackTraces && (r = a._peekContext()) ? r.attachExtraTrace(o) : (i = m(o), o.stack = i.message + "\n" + i.stack.join("\n")), J("warning", o) || b(o, "", !0))
            }

            function g(t) {
               for (var e = [], n = 0; n < t.length; ++n) {
                  var r = t[n],
                     o = "    (No stack trace)" === r || I.test(r),
                     i = o && tt(r);
                  o && !i && (N && " " !== r.charAt(0) && (r = "    " + r), e.push(r))
               }
               return e
            }

            function m(t) {
               var e = t.stack,
                  n = t.toString(),
                  e = "string" == typeof e && 0 < e.length ? function (t) {
                     for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                        var r = e[n];
                        if ("    (No stack trace)" === r || I.test(r)) break
                     }
                     return 0 < n && "SyntaxError" != t.name && (e = e.slice(n)), e
                  }(t) : ["    (No stack trace)"];
               return {
                  message: n,
                  stack: "SyntaxError" == t.name ? e : g(e)
               }
            }

            function b(t, e, n) {
               var r, o;
               "undefined" != typeof console && (o = O.isObject(t) ? (r = t.stack, e + L(r, t)) : e + String(t), "function" == typeof x ? x(o, n) : "function" != typeof console.log && "object" != _typeof(console.log) || console.log(o))
            }

            function n(t, e, n, r) {
               var o = !1;
               try {
                  "function" == typeof e && (o = !0, "rejectionHandled" === t ? e(r) : e(n, r))
               } catch (t) {
                  S.throwLater(t)
               }
               "unhandledRejection" === t ? J(t, n, r) || o || b(n, "Unhandled rejection ") : J(t, r)
            }

            function w(t) {
               var e;
               if ("function" == typeof t) n = "[function " + (t.name || "anonymous") + "]";
               else {
                  n = t && "function" == typeof t.toString ? t.toString() : O.toString(t);
                  if (/\[object [a-zA-Z0-9$_]+\]/.test(n)) try {
                     var n = JSON.stringify(t)
                  } catch (t) {}
                  0 === n.length && (n = "(empty array)")
               }
               return "(<" + ((e = n).length < 41 ? e : e.substr(0, 38) + "...") + ">, no stack trace)"
            }

            function C() {
               return "function" == typeof nt
            }

            function k(t) {
               var e = t.match(et);
               return e ? {
                  fileName: e[1],
                  line: parseInt(e[2], 10)
               } : void 0
            }

            function j(t) {
               this._parent = t, this._promisesCreated = 0;
               var e = this._length = 1 + (void 0 === t ? 0 : t._length);
               nt(this, j), 32 < e && this.uncycle()
            }
            var E, F, x, T, P, S = a._async,
               R = ot("./errors").Warning,
               O = ot("./util"),
               A = ot("./es5"),
               $ = O.canAttachTrace,
               D = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
               V = /\((?:timers\.js):\d+:\d+\)/,
               H = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,
               I = null,
               L = null,
               N = !1,
               U = !(0 == O.env("BLUEBIRD_DEBUG") || !O.env("BLUEBIRD_DEBUG") && "development" !== O.env("NODE_ENV")),
               B = !(0 == O.env("BLUEBIRD_WARNINGS") || !U && !O.env("BLUEBIRD_WARNINGS")),
               M = !(0 == O.env("BLUEBIRD_LONG_STACK_TRACES") || !U && !O.env("BLUEBIRD_LONG_STACK_TRACES")),
               z = 0 != O.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (B || !!O.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

            function q() {
               for (var t = 0; t < P.length; ++t) P[t]._notifyUnhandledRejection();
               Q()
            }

            function Q() {
               P.length = 0
            }
            P = [], T = function (t) {
               P.push(t), setTimeout(q, 1)
            }, A.defineProperty(a, "_unhandledRejectionCheck", {
               value: q
            }), A.defineProperty(a, "_unhandledRejectionClear", {
               value: Q
            }), a.prototype.suppressUnhandledRejections = function () {
               var t = this._target();
               t._bitField = -1048577 & t._bitField | 524288
            }, a.prototype._ensurePossibleRejectionHandled = function () {
               0 == (524288 & this._bitField) && (this._setRejectionIsUnhandled(), T(this))
            }, a.prototype._notifyUnhandledRejectionIsHandled = function () {
               n("rejectionHandled", E, void 0, this)
            }, a.prototype._setReturnedNonUndefined = function () {
               this._bitField = 268435456 | this._bitField
            }, a.prototype._returnedNonUndefined = function () {
               return 0 != (268435456 & this._bitField)
            }, a.prototype._notifyUnhandledRejection = function () {
               var t;
               this._isRejectionUnhandled() && (t = this._settledValue(), this._setUnhandledRejectionIsNotified(), n("unhandledRejection", F, t, this))
            }, a.prototype._setUnhandledRejectionIsNotified = function () {
               this._bitField = 262144 | this._bitField
            }, a.prototype._unsetUnhandledRejectionIsNotified = function () {
               this._bitField = -262145 & this._bitField
            }, a.prototype._isUnhandledRejectionNotified = function () {
               return 0 < (262144 & this._bitField)
            }, a.prototype._setRejectionIsUnhandled = function () {
               this._bitField = 1048576 | this._bitField
            }, a.prototype._unsetRejectionIsUnhandled = function () {
               this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled())
            }, a.prototype._isRejectionUnhandled = function () {
               return 0 < (1048576 & this._bitField)
            }, a.prototype._warn = function (t, e, n) {
               return y(t, e, n || this)
            }, a.onPossiblyUnhandledRejection = function (t) {
               var e = a._getContext();
               F = O.contextBind(e, t)
            }, a.onUnhandledRejectionHandled = function (t) {
               var e = a._getContext();
               E = O.contextBind(e, t)
            };
            var G = function () {};
            a.longStackTraces = function () {
               if (S.haveItemsQueued() && !rt.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
               var t, e, n;
               !rt.longStackTraces && C() && (t = a.prototype._captureStackTrace, e = a.prototype._attachExtraTrace, n = a.prototype._dereferenceTrace, rt.longStackTraces = !0, G = function () {
                  if (S.haveItemsQueued() && !rt.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                  a.prototype._captureStackTrace = t, a.prototype._attachExtraTrace = e, a.prototype._dereferenceTrace = n, r.deactivateLongStackTraces(), rt.longStackTraces = !1
               }, a.prototype._captureStackTrace = d, a.prototype._attachExtraTrace = _, a.prototype._dereferenceTrace = v, r.activateLongStackTraces())
            }, a.hasLongStackTraces = function () {
               return rt.longStackTraces && C()
            };
            var W = {
                  unhandledrejection: {
                     before: function () {
                        var t = O.global.onunhandledrejection;
                        return O.global.onunhandledrejection = null, t
                     },
                     after: function (t) {
                        O.global.onunhandledrejection = t
                     }
                  },
                  rejectionhandled: {
                     before: function () {
                        var t = O.global.onrejectionhandled;
                        return O.global.onrejectionhandled = null, t
                     },
                     after: function (t) {
                        O.global.onrejectionhandled = t
                     }
                  }
               },
               X = function () {
                  function r(t, e) {
                     if (!t) return !O.global.dispatchEvent(e);
                     var n;
                     try {
                        return n = t.before(), !O.global.dispatchEvent(e)
                     } finally {
                        t.after(n)
                     }
                  }
                  try {
                     if ("function" == typeof CustomEvent) {
                        var t = new CustomEvent("CustomEvent");
                        return O.global.dispatchEvent(t),
                           function (t, e) {
                              t = t.toLowerCase();
                              var n = new CustomEvent(t, {
                                 detail: e,
                                 cancelable: !0
                              });
                              return A.defineProperty(n, "promise", {
                                 value: e.promise
                              }), A.defineProperty(n, "reason", {
                                 value: e.reason
                              }), r(W[t], n)
                           }
                     }
                     if ("function" != typeof Event) return (t = document.createEvent("CustomEvent")).initCustomEvent("testingtheevent", !1, !0, {}), O.global.dispatchEvent(t),
                        function (t, e) {
                           t = t.toLowerCase();
                           var n = document.createEvent("CustomEvent");
                           return n.initCustomEvent(t, !1, !0, e), r(W[t], n)
                        };
                     var t = new Event("CustomEvent");
                     return O.global.dispatchEvent(t),
                        function (t, e) {
                           t = t.toLowerCase();
                           var n = new Event(t, {
                              cancelable: !0
                           });
                           return n.detail = e, A.defineProperty(n, "promise", {
                              value: e.promise
                           }), A.defineProperty(n, "reason", {
                              value: e.reason
                           }), r(W[t], n)
                        }
                  } catch (t) {}
                  return function () {
                     return !1
                  }
               }(),
               K = O.isNode ? function () {
                  return process.emit.apply(process, arguments)
               } : O.global ? function (t) {
                  var e = "on" + t.toLowerCase(),
                     n = O.global[e];
                  return !!n && (n.apply(O.global, [].slice.call(arguments, 1)), !0)
               } : function () {
                  return !1
               },
               Y = {
                  promiseCreated: t,
                  promiseFulfilled: t,
                  promiseRejected: t,
                  promiseResolved: t,
                  promiseCancelled: t,
                  promiseChained: function (t, e, n) {
                     return {
                        promise: e,
                        child: n
                     }
                  },
                  warning: function (t, e) {
                     return {
                        warning: e
                     }
                  },
                  unhandledRejection: function (t, e, n) {
                     return {
                        reason: e,
                        promise: n
                     }
                  },
                  rejectionHandled: t
               },
               J = function (t) {
                  var e = !1;
                  try {
                     e = K.apply(null, arguments)
                  } catch (t) {
                     S.throwLater(t), e = !0
                  }
                  var n = !1;
                  try {
                     n = X(t, Y[t].apply(null, arguments))
                  } catch (t) {
                     S.throwLater(t), n = !0
                  }
                  return n || e
               };
            a.config = function (t) {
               var e, n;
               if ("longStackTraces" in (t = Object(t)) && (t.longStackTraces ? a.longStackTraces() : !t.longStackTraces && a.hasLongStackTraces() && G()), "warnings" in t && (e = t.warnings, rt.warnings = !!e, z = rt.warnings, O.isObject(e) && "wForgottenReturn" in e && (z = !!e.wForgottenReturn)), "cancellation" in t && t.cancellation && !rt.cancellation) {
                  if (S.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
                  a.prototype._clearCancellationData = h, a.prototype._propagateFrom = f, a.prototype._onCancel = u, a.prototype._setOnCancel = p, a.prototype._attachCancellationCallback = l, a.prototype._execute = c, Z = f, rt.cancellation = !0
               }
               return "monitoring" in t && (t.monitoring && !rt.monitoring ? (rt.monitoring = !0, a.prototype._fireEvent = J) : !t.monitoring && rt.monitoring && (rt.monitoring = !1, a.prototype._fireEvent = s)), "asyncHooks" in t && O.nodeSupportsAsyncResource && rt.asyncHooks !== (n = !!t.asyncHooks) && ((rt.asyncHooks = n) ? o : i)(), a
            }, a.prototype._fireEvent = s, a.prototype._execute = function (t, e, n) {
               try {
                  t(e, n)
               } catch (t) {
                  return t
               }
            }, a.prototype._onCancel = function () {}, a.prototype._setOnCancel = function (t) {}, a.prototype._attachCancellationCallback = function (t) {}, a.prototype._captureStackTrace = function () {}, a.prototype._attachExtraTrace = function () {}, a.prototype._dereferenceTrace = function () {}, a.prototype._clearCancellationData = function () {}, a.prototype._propagateFrom = function (t, e) {};
            var Z = function (t, e) {
                  0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo)
               },
               tt = function () {
                  return !1
               },
               et = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
            O.inherits(j, Error), (r.CapturedTrace = j).prototype.uncycle = function () {
               var t = this._length;
               if (!(t < 2)) {
                  for (var e = [], n = {}, r = 0, o = this; void 0 !== o; ++r) e.push(o), o = o._parent;
                  for (r = (t = this._length = r) - 1; 0 <= r; --r) {
                     var i = e[r].stack;
                     void 0 === n[i] && (n[i] = r)
                  }
                  for (r = 0; r < t; ++r) {
                     var a = n[e[r].stack];
                     if (void 0 !== a && a !== r) {
                        0 < a && (e[a - 1]._parent = void 0, e[a - 1]._length = 1), e[r]._parent = void 0, e[r]._length = 1;
                        var s = 0 < r ? e[r - 1] : this;
                        a < t - 1 ? (s._parent = e[a + 1], s._parent.uncycle(), s._length = s._parent._length + 1) : (s._parent = void 0, s._length = 1);
                        for (var c = s._length + 1, l = r - 2; 0 <= l; --l) e[l]._length = c, c++;
                        return
                     }
                  }
               }
            }, j.prototype.attachExtraTrace = function (t) {
               if (!t.__stackCleaned__) {
                  this.uncycle();
                  for (var e = m(t), n = e.message, r = [e.stack], o = this; void 0 !== o;) r.push(g(o.stack.split("\n"))), o = o._parent;
                  (function (t) {
                     for (var e = t[0], n = 1; n < t.length; ++n) {
                        for (var r = t[n], o = e.length - 1, i = e[o], a = -1, s = r.length - 1; 0 <= s; --s)
                           if (r[s] === i) {
                              a = s;
                              break
                           } for (s = a; 0 <= s; --s) {
                           var c = r[s];
                           if (e[o] !== c) break;
                           e.pop(), o--
                        }
                        e = r
                     }
                  })(r),
                  function (t) {
                     for (var e = 0; e < t.length; ++e)(0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), e--)
                  }(r), O.notEnumerableProp(t, "stack", function (t, e) {
                     for (var n = 0; n < e.length - 1; ++n) e[n].push("From previous event:"), e[n] = e[n].join("\n");
                     return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n")
                  }(n, r)), O.notEnumerableProp(t, "__stackCleaned__", !0)
               }
            };
            var nt = function () {
               function t(t, e) {
                  return "string" == typeof t ? t : void 0 !== e.name && void 0 !== e.message ? e.toString() : w(e)
               }
               var e = /^\s*at\s*/;
               if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                  Error.stackTraceLimit += 6, I = e, L = t;
                  var n = Error.captureStackTrace;
                  return tt = function (t) {
                        return D.test(t)
                     },
                     function (t, e) {
                        Error.stackTraceLimit += 6, n(t, e), Error.stackTraceLimit -= 6
                     }
               }
               var r, o = new Error;
               if ("string" == typeof o.stack && 0 <= o.stack.split("\n")[0].indexOf("stackDetection@")) return I = /@/, L = t, N = !0,
                  function (t) {
                     t.stack = (new Error).stack
                  };
               try {
                  throw new Error
               } catch (t) {
                  r = "stack" in t
               }
               return "stack" in o || !r || "number" != typeof Error.stackTraceLimit ? (L = function (t, e) {
                  return "string" == typeof t ? t : "object" != _typeof(e) && "function" != typeof e || void 0 === e.name || void 0 === e.message ? w(e) : e.toString()
               }, null) : (I = e, L = t, function (e) {
                  Error.stackTraceLimit += 6;
                  try {
                     throw new Error
                  } catch (t) {
                     e.stack = t.stack
                  }
                  Error.stackTraceLimit -= 6
               })
            }();
            "undefined" != typeof console && void 0 !== console.warn && (x = function (t) {
               console.warn(t)
            }, O.isNode && process.stderr.isTTY ? x = function (t, e) {
               var n = e ? "[33m" : "[31m";
               console.warn(n + t + "[0m\n")
            } : O.isNode || "string" != typeof (new Error).stack || (x = function (t, e) {
               console.warn("%c" + t, e ? "color: darkorange" : "color: red")
            }));
            var rt = {
               warnings: B,
               longStackTraces: !1,
               cancellation: !1,
               monitoring: !1,
               asyncHooks: !1
            };
            return M && a.longStackTraces(), {
               asyncHooks: function () {
                  return rt.asyncHooks
               },
               longStackTraces: function () {
                  return rt.longStackTraces
               },
               warnings: function () {
                  return rt.warnings
               },
               cancellation: function () {
                  return rt.cancellation
               },
               monitoring: function () {
                  return rt.monitoring
               },
               propagateFromFunction: function () {
                  return Z
               },
               boundValueFunction: function () {
                  return e
               },
               checkForgottenReturns: function (t, e, n, r, o) {
                  if (void 0 === t && null !== e && z) {
                     if (void 0 !== o && o._returnedNonUndefined()) return;
                     if (0 == (65535 & r._bitField)) return;
                     n && (n += " ");
                     var i = "",
                        a = "";
                     if (e._trace) {
                        for (var s = e._trace.stack.split("\n"), c = g(s), l = c.length - 1; 0 <= l; --l) {
                           var u = c[l];
                           if (!V.test(u)) {
                              var p = u.match(H);
                              p && (i = "at " + p[1] + ":" + p[2] + ":" + p[3] + " ");
                              break
                           }
                        }
                        if (0 < c.length)
                           for (var h = c[0], l = 0; l < s.length; ++l)
                              if (s[l] === h) {
                                 0 < l && (a = "\n" + s[l - 1]);
                                 break
                              }
                     }
                     var f = "a promise was created in a " + n + "handler " + i + "but was not returned from it, see http://goo.gl/rRqMUw" + a;
                     r._warn(f, !0, e)
                  }
               },
               setBounds: function (t, e) {
                  if (C()) {
                     for (var n, r, o = (t.stack || "").split("\n"), i = (e.stack || "").split("\n"), a = -1, s = -1, c = 0; c < o.length; ++c) {
                        if (l = k(o[c])) {
                           n = l.fileName, a = l.line;
                           break
                        }
                     }
                     for (var l, c = 0; c < i.length; ++c) {
                        if (l = k(i[c])) {
                           r = l.fileName, s = l.line;
                           break
                        }
                     }
                     a < 0 || s < 0 || !n || !r || n !== r || s <= a || (tt = function (t) {
                        if (D.test(t)) return !0;
                        var e = k(t);
                        return !!(e && e.fileName === n && a <= e.line && e.line <= s)
                     })
                  }
               },
               warn: y,
               deprecated: function (t, e) {
                  var n = t + " is deprecated and will be removed in a future version.";
                  return e && (n += " Use " + e + " instead."), y(n)
               },
               CapturedTrace: j,
               fireDomEvent: X,
               fireGlobalEvent: K
            }
         }
      }, {
         "./errors": 12,
         "./es5": 13,
         "./util": 36
      }],
      10: [function (t, e, n) {
         e.exports = function (n) {
            function r() {
               return this.value
            }

            function o() {
               throw this.reason
            }
            n.prototype.return = n.prototype.thenReturn = function (t) {
               return t instanceof n && t.suppressUnhandledRejections(), this._then(r, void 0, void 0, {
                  value: t
               }, void 0)
            }, n.prototype.throw = n.prototype.thenThrow = function (t) {
               return this._then(o, void 0, void 0, {
                  reason: t
               }, void 0)
            }, n.prototype.catchThrow = function (t) {
               if (arguments.length <= 1) return this._then(void 0, o, void 0, {
                  reason: t
               }, void 0);
               var e = arguments[1];
               return this.caught(t, function () {
                  throw e
               })
            }, n.prototype.catchReturn = function (t) {
               if (arguments.length <= 1) return t instanceof n && t.suppressUnhandledRejections(), this._then(void 0, r, void 0, {
                  value: t
               }, void 0);
               var e = arguments[1];
               e instanceof n && e.suppressUnhandledRejections();
               return this.caught(t, function () {
                  return e
               })
            }
         }
      }, {}],
      11: [function (t, e, n) {
         e.exports = function (t, n) {
            function r() {
               return e(this)
            }
            var o = t.reduce,
               e = t.all;
            t.prototype.each = function (t) {
               return o(this, t, n, 0)._then(r, void 0, void 0, this, void 0)
            }, t.prototype.mapSeries = function (t) {
               return o(this, t, n, n)
            }, t.each = function (t, e) {
               return o(t, e, n, 0)._then(r, void 0, void 0, t, void 0)
            }, t.mapSeries = function (t, e) {
               return o(t, e, n, n)
            }
         }
      }, {}],
      12: [function (t, e, n) {
         function r(e, n) {
            function r(t) {
               return this instanceof r ? (p(this, "message", "string" == typeof t ? t : n), p(this, "name", e), void(Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new r(t)
            }
            return u(r, Error), r
         }

         function o(t) {
            return this instanceof o ? (p(this, "name", "OperationalError"), p(this, "message", t), this.cause = t, this.isOperational = !0, void(t instanceof Error ? (p(this, "message", t.message), p(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor))) : new o(t)
         }
         var i, a, s = t("./es5"),
            c = s.freeze,
            l = t("./util"),
            u = l.inherits,
            p = l.notEnumerableProp,
            h = r("Warning", "warning"),
            f = r("CancellationError", "cancellation error"),
            d = r("TimeoutError", "timeout error"),
            _ = r("AggregateError", "aggregate error");
         try {
            i = TypeError, a = RangeError
         } catch (t) {
            i = r("TypeError", "type error"), a = r("RangeError", "range error")
         }
         for (var v = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), y = 0; y < v.length; ++y) "function" == typeof Array.prototype[v[y]] && (_.prototype[v[y]] = Array.prototype[v[y]]);
         s.defineProperty(_.prototype, "length", {
            value: 0,
            configurable: !1,
            writable: !0,
            enumerable: !0
         }), _.prototype.isOperational = !0;
         var g = 0;
         _.prototype.toString = function () {
            var t = Array(4 * g + 1).join(" "),
               e = "\n" + t + "AggregateError of:\n";
            g++, t = Array(4 * g + 1).join(" ");
            for (var n = 0; n < this.length; ++n) {
               for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", o = r.split("\n"), i = 0; i < o.length; ++i) o[i] = t + o[i];
               e += (r = o.join("\n")) + "\n"
            }
            return g--, e
         }, u(o, Error);
         var m = Error.__BluebirdErrorTypes__;
         m || (m = c({
            CancellationError: f,
            TimeoutError: d,
            OperationalError: o,
            RejectionError: o,
            AggregateError: _
         }), s.defineProperty(Error, "__BluebirdErrorTypes__", {
            value: m,
            writable: !1,
            enumerable: !1,
            configurable: !1
         })), e.exports = {
            Error: Error,
            TypeError: i,
            RangeError: a,
            CancellationError: m.CancellationError,
            OperationalError: m.OperationalError,
            TimeoutError: m.TimeoutError,
            AggregateError: m.AggregateError,
            Warning: h
         }
      }, {
         "./es5": 13,
         "./util": 36
      }],
      13: [function (t, e, n) {
         var r, o, i, a, s = function () {
            return void 0 === this
         }();
         s ? e.exports = {
            freeze: Object.freeze,
            defineProperty: Object.defineProperty,
            getDescriptor: Object.getOwnPropertyDescriptor,
            keys: Object.keys,
            names: Object.getOwnPropertyNames,
            getPrototypeOf: Object.getPrototypeOf,
            isArray: Array.isArray,
            isES5: s,
            propertyIsWritable: function (t, e) {
               var n = Object.getOwnPropertyDescriptor(t, e);
               return !(n && !n.writable && !n.set)
            }
         } : (r = {}.hasOwnProperty, o = {}.toString, i = {}.constructor.prototype, a = function (t) {
            var e, n = [];
            for (e in t) r.call(t, e) && n.push(e);
            return n
         }, e.exports = {
            isArray: function (t) {
               try {
                  return "[object Array]" === o.call(t)
               } catch (t) {
                  return !1
               }
            },
            keys: a,
            names: a,
            defineProperty: function (t, e, n) {
               return t[e] = n.value, t
            },
            getDescriptor: function (t, e) {
               return {
                  value: t[e]
               }
            },
            freeze: function (t) {
               return t
            },
            getPrototypeOf: function (t) {
               try {
                  return Object(t).constructor.prototype
               } catch (t) {
                  return i
               }
            },
            isES5: s,
            propertyIsWritable: function () {
               return !0
            }
         })
      }, {}],
      14: [function (t, e, n) {
         e.exports = function (t, r) {
            var o = t.map;
            t.prototype.filter = function (t, e) {
               return o(this, t, e, r)
            }, t.filter = function (t, e, n) {
               return o(t, e, n, r)
            }
         }
      }, {}],
      15: [function (t, e, n) {
         e.exports = function (s, a, c) {
            function o(t, e, n) {
               this.promise = t, this.type = e, this.handler = n, this.called = !1, this.cancelPromise = null
            }

            function l(t) {
               this.finallyHandler = t
            }

            function u(t, e) {
               return null != t.cancelPromise && (1 < arguments.length ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), t.cancelPromise = null, 1)
            }

            function p() {
               return f.call(this, this.promise._target()._settledValue())
            }

            function h(t) {
               return u(this, t) ? void 0 : (v.e = t, v)
            }

            function f(t) {
               var e = this.promise,
                  n = this.handler;
               if (!this.called) {
                  this.called = !0;
                  var r = this.isFinallyHandler() ? n.call(e._boundValue()) : n.call(e._boundValue(), t);
                  if (r === c) return r;
                  if (void 0 !== r) {
                     e._setReturnedNonUndefined();
                     var o = a(r, e);
                     if (o instanceof s) {
                        if (null != this.cancelPromise) {
                           if (o._isCancelled()) {
                              var i = new _("late cancellation observer");
                              return e._attachExtraTrace(i), v.e = i, v
                           }
                           o.isPending() && o._attachCancellationCallback(new l(this))
                        }
                        return o._then(p, h, void 0, this, void 0)
                     }
                  }
               }
               return e.isRejected() ? (u(this), v.e = t, v) : (u(this), t)
            }
            var d = t("./util"),
               _ = s.CancellationError,
               v = d.errorObj,
               y = t("./catch_filter")(c);
            return o.prototype.isFinallyHandler = function () {
               return 0 === this.type
            }, l.prototype._resultCancelled = function () {
               u(this.finallyHandler)
            }, s.prototype._passThrough = function (t, e, n, r) {
               return "function" != typeof t ? this.then() : this._then(n, r, void 0, new o(this, e, t), void 0)
            }, s.prototype.lastly = s.prototype.finally = function (t) {
               return this._passThrough(t, 0, f, f)
            }, s.prototype.tap = function (t) {
               return this._passThrough(t, 1, f)
            }, s.prototype.tapCatch = function (t) {
               var e = arguments.length;
               if (1 === e) return this._passThrough(t, 1, void 0, f);
               for (var n = new Array(e - 1), r = 0, o = 0; o < e - 1; ++o) {
                  var i = arguments[o];
                  if (!d.isObject(i)) return s.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + d.classString(i)));
                  n[r++] = i
               }
               n.length = r;
               var a = arguments[o];
               return this._passThrough(y(n, a, this), 1, void 0, f)
            }, o
         }
      }, {
         "./catch_filter": 7,
         "./util": 36
      }],
      16: [function (n, t, e) {
         t.exports = function (s, r, a, c, t, l) {
            function u(t, e, n, r) {
               var o, i;
               l.cancellation() ? (o = new s(a), i = this._finallyPromise = new s(a), this._promise = o.lastly(function () {
                  return i
               }), o._captureStackTrace(), o._setOnCancel(this)) : (this._promise = new s(a))._captureStackTrace(), this._stack = r, this._generatorFunction = t, this._receiver = e, this._generator = void 0, this._yieldHandlers = "function" == typeof n ? [n].concat(d) : d, this._yieldedPromise = null, this._cancellationPhase = !1
            }
            var p = n("./errors").TypeError,
               e = n("./util"),
               h = e.errorObj,
               f = e.tryCatch,
               d = [];
            e.inherits(u, t), u.prototype._isResolved = function () {
               return null === this._promise
            }, u.prototype._cleanup = function () {
               this._promise = this._generator = null, l.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), this._finallyPromise = null)
            }, u.prototype._promiseCancelled = function () {
               var t, e;
               this._isResolved() || (e = void 0 !== this._generator.return ? (this._promise._pushContext(), f(this._generator.return).call(this._generator, void 0)) : (t = new s.CancellationError("generator .return() sentinel"), s.coroutine.returnSentinel = t, this._promise._attachExtraTrace(t), this._promise._pushContext(), f(this._generator.throw).call(this._generator, t)), this._promise._popContext(), this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(e))
            }, u.prototype._promiseFulfilled = function (t) {
               this._yieldedPromise = null, this._promise._pushContext();
               var e = f(this._generator.next).call(this._generator, t);
               this._promise._popContext(), this._continue(e)
            }, u.prototype._promiseRejected = function (t) {
               this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();
               var e = f(this._generator.throw).call(this._generator, t);
               this._promise._popContext(), this._continue(e)
            }, u.prototype._resultCancelled = function () {
               var t;
               this._yieldedPromise instanceof s && (t = this._yieldedPromise, this._yieldedPromise = null, t.cancel())
            }, u.prototype.promise = function () {
               return this._promise
            }, u.prototype._run = function () {
               this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0)
            }, u.prototype._continue = function (t) {
               var e = this._promise;
               if (t === h) return this._cleanup(), this._cancellationPhase ? e.cancel() : e._rejectCallback(t.e, !1);
               var n = t.value;
               if (!0 === t.done) return this._cleanup(), this._cancellationPhase ? e.cancel() : e._resolveCallback(n);
               var r, o = c(n, this._promise);
               o instanceof s || null !== (o = function (t, e, n) {
                  for (var r = 0; r < e.length; ++r) {
                     n._pushContext();
                     var o = f(e[r])(t);
                     if (n._popContext(), o === h) {
                        n._pushContext();
                        var i = s.reject(h.e);
                        return n._popContext(), i
                     }
                     var a = c(o, n);
                     if (a instanceof s) return a
                  }
                  return null
               }(o, this._yieldHandlers, this._promise)) ? 0 == (50397184 & (r = (o = o._target())._bitField)) ? (this._yieldedPromise = o)._proxy(this, null) : 0 != (33554432 & r) ? s._async.invoke(this._promiseFulfilled, this, o._value()) : 0 != (16777216 & r) ? s._async.invoke(this._promiseRejected, this, o._reason()) : this._promiseCancelled() : this._promiseRejected(new p("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(n)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")))
            }, s.coroutine = function (r, t) {
               if ("function" != typeof r) throw new p("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
               var o = Object(t).yieldHandler,
                  i = u,
                  a = (new Error).stack;
               return function () {
                  var t = r.apply(this, arguments),
                     e = new i(void 0, void 0, o, a),
                     n = e.promise();
                  return e._generator = t, e._promiseFulfilled(void 0), n
               }
            }, s.coroutine.addYieldHandler = function (t) {
               if ("function" != typeof t) throw new p("expecting a function but got " + e.classString(t));
               d.push(t)
            }, s.spawn = function (t) {
               if (l.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return r("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
               var e = new u(t, this),
                  n = e.promise();
               return e._run(s.spawn), n
            }
         }
      }, {
         "./errors": 12,
         "./util": 36
      }],
      17: [function (a, t, e) {
         t.exports = function (t, o, e, n, r) {
            var i = a("./util");
            i.canEvaluate, i.tryCatch, i.errorObj, t.join = function () {
               var t, e = arguments.length - 1;
               0 < e && "function" == typeof arguments[e] && (t = arguments[e]);
               var n = [].slice.call(arguments);
               t && n.pop();
               var r = new o(n).promise();
               return void 0 !== t ? r.spread(t) : r
            }
         }
      }, {
         "./util": 36
      }],
      18: [function (e, t, n) {
         t.exports = function (f, t, i, d, s, _) {
            function a(t, e, n, r) {
               this.constructor$(t), this._promise._captureStackTrace();
               var o = f._getContext();
               if (this._callback = c.contextBind(o, e), this._preservedValues = r === s ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = [], l.invoke(this._asyncInit, this, void 0), c.isArray(t))
                  for (var i = 0; i < t.length; ++i) {
                     var a = t[i];
                     a instanceof f && a.suppressUnhandledRejections()
                  }
            }

            function n(t, e, n, r) {
               if ("function" != typeof e) return i("expecting a function but got " + c.classString(e));
               var o = 0;
               if (void 0 !== n) {
                  if ("object" != _typeof(n) || null === n) return f.reject(new TypeError("options argument must be an object but it is " + c.classString(n)));
                  if ("number" != typeof n.concurrency) return f.reject(new TypeError("'concurrency' must be a number but it is " + c.classString(n.concurrency)));
                  o = n.concurrency
               }
               return new a(t, e, o = "number" == typeof o && isFinite(o) && 1 <= o ? o : 0, r).promise()
            }
            var c = e("./util"),
               v = c.tryCatch,
               y = c.errorObj,
               l = f._async;
            c.inherits(a, t), a.prototype._asyncInit = function () {
               this._init$(void 0, -2)
            }, a.prototype._init = function () {}, a.prototype._promiseFulfilled = function (t, e) {
               var n = this._values,
                  r = this.length(),
                  o = this._preservedValues,
                  i = this._limit;
               if (e < 0) {
                  if (n[e = -1 * e - 1] = t, 1 <= i && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0
               } else {
                  if (1 <= i && this._inFlight >= i) return n[e] = t, this._queue.push(e), !1;
                  null !== o && (o[e] = t);
                  var a = this._promise,
                     s = this._callback,
                     c = a._boundValue();
                  a._pushContext();
                  var l = v(s).call(c, t, e, r),
                     u = a._popContext();
                  if (_.checkForgottenReturns(l, u, null !== o ? "Promise.filter" : "Promise.map", a), l === y) return this._reject(l.e), !0;
                  var p = d(l, this._promise);
                  if (p instanceof f) {
                     var h = (p = p._target())._bitField;
                     if (0 == (50397184 & h)) return 1 <= i && this._inFlight++, (n[e] = p)._proxy(this, -1 * (e + 1)), !1;
                     if (0 == (33554432 & h)) return 0 != (16777216 & h) ? this._reject(p._reason()) : this._cancel(), !0;
                     l = p._value()
                  }
                  n[e] = l
               }
               return r <= ++this._totalResolved && (null !== o ? this._filter(n, o) : this._resolve(n), !0)
            }, a.prototype._drainQueue = function () {
               for (var t = this._queue, e = this._limit, n = this._values; 0 < t.length && this._inFlight < e;) {
                  if (this._isResolved()) return;
                  var r = t.pop();
                  this._promiseFulfilled(n[r], r)
               }
            }, a.prototype._filter = function (t, e) {
               for (var n = e.length, r = new Array(n), o = 0, i = 0; i < n; ++i) t[i] && (r[o++] = e[i]);
               r.length = o, this._resolve(r)
            }, a.prototype.preservedValues = function () {
               return this._preservedValues
            }, f.prototype.map = function (t, e) {
               return n(this, t, e, null)
            }, f.map = n
         }
      }, {
         "./util": 36
      }],
      19: [function (e, t, n) {
         t.exports = function (a, s, t, c, l) {
            var u = e("./util"),
               p = u.tryCatch;
            a.method = function (r) {
               if ("function" != typeof r) throw new a.TypeError("expecting a function but got " + u.classString(r));
               return function () {
                  var t = new a(s);
                  t._captureStackTrace(), t._pushContext();
                  var e = p(r).apply(this, arguments),
                     n = t._popContext();
                  return l.checkForgottenReturns(e, n, "Promise.method", t), t._resolveFromSyncValue(e), t
               }
            }, a.attempt = a.try = function (t) {
               if ("function" != typeof t) return c("expecting a function but got " + u.classString(t));
               var e, n, r, o = new a(s);
               o._captureStackTrace(), o._pushContext(), r = 1 < arguments.length ? (l.deprecated("calling Promise.try with more than 1 argument"), e = arguments[1], n = arguments[2], u.isArray(e) ? p(t).apply(n, e) : p(t).call(n, e)) : p(t)();
               var i = o._popContext();
               return l.checkForgottenReturns(r, i, "Promise.try", o), o._resolveFromSyncValue(r), o
            }, a.prototype._resolveFromSyncValue = function (t) {
               t === u.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0)
            }
         }
      }, {
         "./util": 36
      }],
      20: [function (t, e, n) {
         function a(t) {
            var e, n;
            if ((n = t) instanceof Error && u.getPrototypeOf(n) === Error.prototype) {
               (e = new l(t)).name = t.name, e.message = t.message, e.stack = t.stack;
               for (var r = u.keys(t), o = 0; o < r.length; ++o) {
                  var i = r[o];
                  p.test(i) || (e[i] = t[i])
               }
               return e
            }
            return s.markAsOriginatingFromRejection(t), t
         }
         var s = t("./util"),
            c = s.maybeWrapAsError,
            l = t("./errors").OperationalError,
            u = t("./es5"),
            p = /^(?:name|message|stack|cause)$/;
         e.exports = function (o, i) {
            return function (t, e) {
               var n, r;
               null !== o && (t ? (n = a(c(t)), o._attachExtraTrace(n), o._reject(n)) : i ? (r = [].slice.call(arguments, 1), o._fulfill(r)) : o._fulfill(e), o = null)
            }
         }
      }, {
         "./errors": 12,
         "./es5": 13,
         "./util": 36
      }],
      21: [function (e, t, n) {
         t.exports = function (t) {
            function r(t, e) {
               if (!a.isArray(t)) return o.call(this, t, e);
               var n = c(e).apply(this._boundValue(), [null].concat(t));
               n === l && s.throwLater(n.e)
            }

            function o(t, e) {
               var n = this._boundValue(),
                  r = void 0 === t ? c(e).call(n, null) : c(e).call(n, null, t);
               r === l && s.throwLater(r.e)
            }

            function i(t, e) {
               var n;
               t || ((n = new Error(t + "")).cause = t, t = n);
               var r = c(e).call(this._boundValue(), t);
               r === l && s.throwLater(r.e)
            }
            var a = e("./util"),
               s = t._async,
               c = a.tryCatch,
               l = a.errorObj;
            t.prototype.asCallback = t.prototype.nodeify = function (t, e) {
               var n;
               return "function" == typeof t && (n = o, void 0 !== e && Object(e).spread && (n = r), this._then(n, i, void 0, this, t)), this
            }
         }
      }, {
         "./util": 36
      }],
      22: [function ($, D, t) {
         D.exports = function () {
            function s() {}

            function f(t) {
               t !== w && function (t, e) {
                  if (null == t || t.constructor !== f) throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                  if ("function" != typeof e) throw new m("expecting a function but got " + d.classString(e))
               }(this, t), this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._resolveFromExecutor(t), this._promiseCreated(), this._fireEvent("promiseCreated", this)
            }

            function t(t) {
               this.promise._resolveCallback(t)
            }

            function e(t) {
               this.promise._rejectCallback(t, !1)
            }

            function n(t) {
               var e = new f(w);
               e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t
            }

            function c() {
               return new m("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")
            }

            function l() {
               return new f.PromiseInspection(this._target())
            }

            function a(t) {
               return f.reject(new m(t))
            }
            var u = {},
               d = $("./util");
            d.setReflectHandler(l);

            function r() {
               var t = process.domain;
               return void 0 === t ? null : t
            }

            function o() {
               return {
                  domain: r(),
                  async: null
               }
            }

            function i() {
               return {
                  domain: r(),
                  async: new p("Bluebird::Promise")
               }
            }
            var p = d.isNode && d.nodeSupportsAsyncResource ? $("async_hooks").AsyncResource : null,
               _ = d.isNode ? o : function () {
                  return null
               };
            d.notEnumerableProp(f, "_getContext", _);
            var h = $("./es5"),
               v = $("./async"),
               y = new v;
            h.defineProperty(f, "_async", {
               value: y
            });
            var g = $("./errors"),
               m = f.TypeError = g.TypeError;
            f.RangeError = g.RangeError;
            var b = f.CancellationError = g.CancellationError;
            f.TimeoutError = g.TimeoutError, f.OperationalError = g.OperationalError, f.RejectionError = g.OperationalError, f.AggregateError = g.AggregateError;
            var w = function () {},
               C = {},
               k = {},
               j = $("./thenables")(f, w),
               E = $("./promise_array")(f, w, j, a, s),
               F = $("./context")(f),
               x = F.create,
               T = $("./debuggability")(f, F, function () {
                  _ = i, d.notEnumerableProp(f, "_getContext", i)
               }, function () {
                  _ = o, d.notEnumerableProp(f, "_getContext", o)
               }),
               P = (T.CapturedTrace, $("./finally")(f, j, k)),
               S = $("./catch_filter")(k),
               R = $("./nodeback"),
               O = d.errorObj,
               A = d.tryCatch;
            return f.prototype.toString = function () {
               return "[object Promise]"
            }, f.prototype.caught = f.prototype.catch = function (t) {
               var e = arguments.length;
               if (1 < e) {
                  for (var n = new Array(e - 1), r = 0, o = 0; o < e - 1; ++o) {
                     var i = arguments[o];
                     if (!d.isObject(i)) return a("Catch statement predicate: expecting an object but got " + d.classString(i));
                     n[r++] = i
                  }
                  if (n.length = r, "function" != typeof (t = arguments[o])) throw new m("The last argument to .catch() must be a function, got " + d.toString(t));
                  return this.then(void 0, S(n, t, this))
               }
               return this.then(void 0, t)
            }, f.prototype.reflect = function () {
               return this._then(l, l, void 0, this, void 0)
            }, f.prototype.then = function (t, e) {
               var n;
               return T.warnings() && 0 < arguments.length && "function" != typeof t && "function" != typeof e && (n = ".then() only accepts functions but was passed: " + d.classString(t), 1 < arguments.length && (n += ", " + d.classString(e)), this._warn(n)), this._then(t, e, void 0, void 0, void 0)
            }, f.prototype.done = function (t, e) {
               this._then(t, e, void 0, void 0, void 0)._setIsFinal()
            }, f.prototype.spread = function (t) {
               return "function" != typeof t ? a("expecting a function but got " + d.classString(t)) : this.all()._then(t, void 0, void 0, C, void 0)
            }, f.prototype.toJSON = function () {
               var t = {
                  isFulfilled: !1,
                  isRejected: !1,
                  fulfillmentValue: void 0,
                  rejectionReason: void 0
               };
               return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), t.isRejected = !0), t
            }, f.prototype.all = function () {
               return 0 < arguments.length && this._warn(".all() was passed arguments but it does not take any"), new E(this).promise()
            }, f.prototype.error = function (t) {
               return this.caught(d.originatesFromRejection, t)
            }, f.getNewLibraryCopy = D.exports, f.is = function (t) {
               return t instanceof f
            }, f.fromNode = f.fromCallback = function (t) {
               var e = new f(w);
               e._captureStackTrace();
               var n = 1 < arguments.length && !!Object(arguments[1]).multiArgs,
                  r = A(t)(R(e, n));
               return r === O && e._rejectCallback(r.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), e
            }, f.all = function (t) {
               return new E(t).promise()
            }, f.resolve = f.fulfilled = f.cast = function (t) {
               var e = j(t);
               return e instanceof f || ((e = new f(w))._captureStackTrace(), e._setFulfilled(), e._rejectionHandler0 = t), e
            }, f.reject = f.rejected = function (t) {
               var e = new f(w);
               return e._captureStackTrace(), e._rejectCallback(t, !0), e
            }, f.setScheduler = function (t) {
               if ("function" != typeof t) throw new m("expecting a function but got " + d.classString(t));
               return y.setScheduler(t)
            }, f.prototype._then = function (t, e, n, r, o) {
               var i = void 0 !== o,
                  a = i ? o : new f(w),
                  s = this._target(),
                  c = s._bitField;
               i || (a._propagateFrom(this, 3), a._captureStackTrace(), void 0 === r && 0 != (2097152 & this._bitField) && (r = 0 != (50397184 & c) ? this._boundValue() : s === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, a));
               var l, u, p, h = _();
               return 0 != (50397184 & c) ? (p = s._settlePromiseCtx, 0 != (33554432 & c) ? (u = s._rejectionHandler0, l = t) : 0 != (16777216 & c) ? (u = s._fulfillmentHandler0, l = e, s._unsetRejectionIsUnhandled()) : (p = s._settlePromiseLateCancellationObserver, u = new b("late cancellation observer"), s._attachExtraTrace(u), l = e), y.invoke(p, s, {
                  handler: d.contextBind(h, l),
                  promise: a,
                  receiver: r,
                  value: u
               })) : s._addCallbacks(t, e, a, r, h), a
            }, f.prototype._length = function () {
               return 65535 & this._bitField
            }, f.prototype._isFateSealed = function () {
               return 0 != (117506048 & this._bitField)
            }, f.prototype._isFollowing = function () {
               return 67108864 == (67108864 & this._bitField)
            }, f.prototype._setLength = function (t) {
               this._bitField = -65536 & this._bitField | 65535 & t
            }, f.prototype._setFulfilled = function () {
               this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this)
            }, f.prototype._setRejected = function () {
               this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this)
            }, f.prototype._setFollowing = function () {
               this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this)
            }, f.prototype._setIsFinal = function () {
               this._bitField = 4194304 | this._bitField
            }, f.prototype._isFinal = function () {
               return 0 < (4194304 & this._bitField)
            }, f.prototype._unsetCancelled = function () {
               this._bitField = -65537 & this._bitField
            }, f.prototype._setCancelled = function () {
               this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this)
            }, f.prototype._setWillBeCancelled = function () {
               this._bitField = 8388608 | this._bitField
            }, f.prototype._setAsyncGuaranteed = function () {
               var t;
               y.hasCustomScheduler() || (t = this._bitField, this._bitField = t | (536870912 & t) >> 2 ^ 134217728)
            }, f.prototype._setNoAsyncGuarantee = function () {
               this._bitField = -134217729 & (536870912 | this._bitField)
            }, f.prototype._receiverAt = function (t) {
               var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
               return e === u ? void 0 : void 0 === e && this._isBound() ? this._boundValue() : e
            }, f.prototype._promiseAt = function (t) {
               return this[4 * t - 4 + 2]
            }, f.prototype._fulfillmentHandlerAt = function (t) {
               return this[4 * t - 4]
            }, f.prototype._rejectionHandlerAt = function (t) {
               return this[4 * t - 4 + 1]
            }, f.prototype._boundValue = function () {}, f.prototype._migrateCallback0 = function (t) {
               var e = (t._bitField, t._fulfillmentHandler0),
                  n = t._rejectionHandler0,
                  r = t._promise0,
                  o = t._receiverAt(0);
               void 0 === o && (o = u), this._addCallbacks(e, n, r, o, null)
            }, f.prototype._migrateCallbackAt = function (t, e) {
               var n = t._fulfillmentHandlerAt(e),
                  r = t._rejectionHandlerAt(e),
                  o = t._promiseAt(e),
                  i = t._receiverAt(e);
               void 0 === i && (i = u), this._addCallbacks(n, r, o, i, null)
            }, f.prototype._addCallbacks = function (t, e, n, r, o) {
               var i, a = this._length();
               return 65531 <= a && (a = 0, this._setLength(0)), 0 === a ? (this._promise0 = n, this._receiver0 = r, "function" == typeof t && (this._fulfillmentHandler0 = d.contextBind(o, t)), "function" == typeof e && (this._rejectionHandler0 = d.contextBind(o, e))) : (this[2 + (i = 4 * a - 4)] = n, this[3 + i] = r, "function" == typeof t && (this[i] = d.contextBind(o, t)), "function" == typeof e && (this[1 + i] = d.contextBind(o, e))), this._setLength(a + 1), a
            }, f.prototype._proxy = function (t, e) {
               this._addCallbacks(void 0, void 0, e, t, null)
            }, f.prototype._resolveCallback = function (t, e) {
               if (0 == (117506048 & this._bitField)) {
                  if (t === this) return this._rejectCallback(c(), !1);
                  var n = j(t, this);
                  if (!(n instanceof f)) return this._fulfill(t);
                  e && this._propagateFrom(n, 2);
                  var r = n._target();
                  if (r === this) return void this._reject(c());
                  var o, i = r._bitField;
                  if (0 == (50397184 & i)) {
                     var a = this._length();
                     0 < a && r._migrateCallback0(this);
                     for (var s = 1; s < a; ++s) r._migrateCallbackAt(this, s);
                     this._setFollowing(), this._setLength(0), this._setFollowee(n)
                  } else {
                     0 != (33554432 & i) ? this._fulfill(r._value()) : 0 != (16777216 & i) ? this._reject(r._reason()) : (o = new b("late cancellation observer"), r._attachExtraTrace(o), this._reject(o))
                  }
               }
            }, f.prototype._rejectCallback = function (t, e, n) {
               var r, o = d.ensureErrorObject(t),
                  i = o === t;
               i || n || !T.warnings() || (r = "a promise was rejected with a non-error: " + d.classString(t), this._warn(r, !0)), this._attachExtraTrace(o, !!e && i), this._reject(t)
            }, f.prototype._resolveFromExecutor = function (t) {
               var e, n, r;
               t !== w && ((e = this)._captureStackTrace(), this._pushContext(), r = !0, n = this._execute(t, function (t) {
                  e._resolveCallback(t)
               }, function (t) {
                  e._rejectCallback(t, r)
               }), r = !1, this._popContext(), void 0 !== n && e._rejectCallback(n, !0))
            }, f.prototype._settlePromiseFromHandler = function (t, e, n, r) {
               var o, i;
               0 == (65536 & r._bitField) && (r._pushContext(), e === C ? n && "number" == typeof n.length ? o = A(t).apply(this._boundValue(), n) : (o = O).e = new m("cannot .spread() a non-array: " + d.classString(n)) : o = A(t).call(e, n), i = r._popContext(), 0 == (65536 & r._bitField) && (o === k ? r._reject(n) : o === O ? r._rejectCallback(o.e, !1) : (T.checkForgottenReturns(o, i, "", r, this), r._resolveCallback(o))))
            }, f.prototype._target = function () {
               for (var t = this; t._isFollowing();) t = t._followee();
               return t
            }, f.prototype._followee = function () {
               return this._rejectionHandler0
            }, f.prototype._setFollowee = function (t) {
               this._rejectionHandler0 = t
            }, f.prototype._settlePromise = function (t, e, n, r) {
               var o = t instanceof f,
                  i = this._bitField,
                  a = 0 != (134217728 & i);
               0 != (65536 & i) ? (o && t._invokeInternalOnCancel(), n instanceof P && n.isFinallyHandler() ? (n.cancelPromise = t, A(e).call(n, r) === O && t._reject(O.e)) : e === l ? t._fulfill(l.call(n)) : n instanceof s ? n._promiseCancelled(t) : o || t instanceof E ? t._cancel() : n.cancel()) : "function" == typeof e ? o ? (a && t._setAsyncGuaranteed(), this._settlePromiseFromHandler(e, n, r, t)) : e.call(n, r, t) : n instanceof s ? n._isResolved() || (0 != (33554432 & i) ? n._promiseFulfilled(r, t) : n._promiseRejected(r, t)) : o && (a && t._setAsyncGuaranteed(), 0 != (33554432 & i) ? t._fulfill(r) : t._reject(r))
            }, f.prototype._settlePromiseLateCancellationObserver = function (t) {
               var e = t.handler,
                  n = t.promise,
                  r = t.receiver,
                  o = t.value;
               "function" == typeof e ? n instanceof f ? this._settlePromiseFromHandler(e, r, o, n) : e.call(r, o, n) : n instanceof f && n._reject(o)
            }, f.prototype._settlePromiseCtx = function (t) {
               this._settlePromise(t.promise, t.handler, t.receiver, t.value)
            }, f.prototype._settlePromise0 = function (t, e, n) {
               var r = this._promise0,
                  o = this._receiverAt(0);
               this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(r, t, o, e)
            }, f.prototype._clearCallbackDataAtIndex = function (t) {
               var e = 4 * t - 4;
               this[2 + e] = this[3 + e] = this[e] = this[1 + e] = void 0
            }, f.prototype._fulfill = function (t) {
               var e = this._bitField;
               if (!((117506048 & e) >>> 16)) {
                  if (t === this) {
                     var n = c();
                     return this._attachExtraTrace(n), this._reject(n)
                  }
                  this._setFulfilled(), this._rejectionHandler0 = t, 0 < (65535 & e) && (0 != (134217728 & e) ? this._settlePromises() : y.settlePromises(this), this._dereferenceTrace())
               }
            }, f.prototype._reject = function (t) {
               var e = this._bitField;
               if (!((117506048 & e) >>> 16)) return this._setRejected(), this._fulfillmentHandler0 = t, this._isFinal() ? y.fatalError(t, d.isNode) : void(0 < (65535 & e) ? y.settlePromises(this) : this._ensurePossibleRejectionHandled())
            }, f.prototype._fulfillPromises = function (t, e) {
               for (var n = 1; n < t; n++) {
                  var r = this._fulfillmentHandlerAt(n),
                     o = this._promiseAt(n),
                     i = this._receiverAt(n);
                  this._clearCallbackDataAtIndex(n), this._settlePromise(o, r, i, e)
               }
            }, f.prototype._rejectPromises = function (t, e) {
               for (var n = 1; n < t; n++) {
                  var r = this._rejectionHandlerAt(n),
                     o = this._promiseAt(n),
                     i = this._receiverAt(n);
                  this._clearCallbackDataAtIndex(n), this._settlePromise(o, r, i, e)
               }
            }, f.prototype._settlePromises = function () {
               var t, e, n = this._bitField,
                  r = 65535 & n;
               0 < r && (0 != (16842752 & n) ? (t = this._fulfillmentHandler0, this._settlePromise0(this._rejectionHandler0, t, n), this._rejectPromises(r, t)) : (e = this._rejectionHandler0, this._settlePromise0(this._fulfillmentHandler0, e, n), this._fulfillPromises(r, e)), this._setLength(0)), this._clearCancellationData()
            }, f.prototype._settledValue = function () {
               var t = this._bitField;
               return 0 != (33554432 & t) ? this._rejectionHandler0 : 0 != (16777216 & t) ? this._fulfillmentHandler0 : void 0
            }, "undefined" != typeof Symbol && Symbol.toStringTag && h.defineProperty(f.prototype, Symbol.toStringTag, {
               get: function () {
                  return "Object"
               }
            }), f.defer = f.pending = function () {
               return T.deprecated("Promise.defer", "new Promise"), {
                  promise: new f(w),
                  resolve: t,
                  reject: e
               }
            }, d.notEnumerableProp(f, "_makeSelfResolutionError", c), $("./method")(f, w, j, a, T), $("./bind")(f, w, j, T), $("./cancel")(f, E, a, T), $("./direct_resolve")(f), $("./synchronous_inspection")(f), $("./join")(f, E, j, w, y), (f.Promise = f).version = "3.7.2", $("./call_get.js")(f), $("./generators.js")(f, a, w, j, s, T), $("./map.js")(f, E, a, j, w, T), $("./nodeify.js")(f), $("./promisify.js")(f, w), $("./props.js")(f, E, j, a), $("./race.js")(f, w, j, a), $("./reduce.js")(f, E, a, j, w, T), $("./settle.js")(f, E, T), $("./some.js")(f, E, a), $("./timers.js")(f, w, T), $("./using.js")(f, a, j, x, w, T), $("./any.js")(f), $("./each.js")(f, w), $("./filter.js")(f, w), d.toFastProperties(f), d.toFastProperties(f.prototype), n({
               a: 1
            }), n({
               b: 2
            }), n({
               c: 3
            }), n(1), n(function () {}), n(void 0), n(!1), n(new f(w)), T.setBounds(v.firstLineError, d.lastLineError), f
         }
      }, {
         "./any.js": 1,
         "./async": 2,
         "./bind": 3,
         "./call_get.js": 5,
         "./cancel": 6,
         "./catch_filter": 7,
         "./context": 8,
         "./debuggability": 9,
         "./direct_resolve": 10,
         "./each.js": 11,
         "./errors": 12,
         "./es5": 13,
         "./filter.js": 14,
         "./finally": 15,
         "./generators.js": 16,
         "./join": 17,
         "./map.js": 18,
         "./method": 19,
         "./nodeback": 20,
         "./nodeify.js": 21,
         "./promise_array": 23,
         "./promisify.js": 24,
         "./props.js": 25,
         "./race.js": 27,
         "./reduce.js": 28,
         "./settle.js": 30,
         "./some.js": 31,
         "./synchronous_inspection": 32,
         "./thenables": 33,
         "./timers.js": 34,
         "./using.js": 35,
         "./util": 36,
         async_hooks: void 0
      }],
      23: [function (r, t, e) {
         t.exports = function (s, n, c, a, t) {
            function e(t) {
               var e = this._promise = new s(n);
               t instanceof s && (e._propagateFrom(t, 3), t.suppressUnhandledRejections()), e._setOnCancel(this), this._values = t, this._length = 0, this._totalResolved = 0, this._init(void 0, -2)
            }
            var l = r("./util");
            return l.isArray, l.inherits(e, t), e.prototype.length = function () {
               return this._length
            }, e.prototype.promise = function () {
               return this._promise
            }, e.prototype._init = function t(e, n) {
               var r = c(this._values, this._promise);
               if (r instanceof s) {
                  var o = (r = r._target())._bitField;
                  if (this._values = r, 0 == (50397184 & o)) return this._promise._setAsyncGuaranteed(), r._then(t, this._reject, void 0, this, n);
                  if (0 == (33554432 & o)) return 0 != (16777216 & o) ? this._reject(r._reason()) : this._cancel();
                  r = r._value()
               }
               if (null !== (r = l.asArray(r))) return 0 === r.length ? void(-5 === n ? this._resolveEmptyArray() : this._resolve(function (t) {
                  switch (t) {
                     case -2:
                        return [];
                     case -3:
                        return {};
                     case -6:
                        return new Map
                  }
               }(n))) : void this._iterate(r);
               var i = a("expecting an array or an iterable object but got " + l.classString(r)).reason();
               this._promise._rejectCallback(i, !1)
            }, e.prototype._iterate = function (t) {
               var e = this.getActualLength(t.length);
               this._length = e, this._values = this.shouldCopyValues() ? new Array(e) : this._values;
               for (var n = this._promise, r = !1, o = null, i = 0; i < e; ++i) {
                  var a = c(t[i], n),
                     o = a instanceof s ? (a = a._target())._bitField : null;
                  r ? null !== o && a.suppressUnhandledRejections() : null !== o ? 0 == (50397184 & o) ? (a._proxy(this, i), this._values[i] = a) : r = 0 != (33554432 & o) ? this._promiseFulfilled(a._value(), i) : 0 != (16777216 & o) ? this._promiseRejected(a._reason(), i) : this._promiseCancelled(i) : r = this._promiseFulfilled(a, i)
               }
               r || n._setAsyncGuaranteed()
            }, e.prototype._isResolved = function () {
               return null === this._values
            }, e.prototype._resolve = function (t) {
               this._values = null, this._promise._fulfill(t)
            }, e.prototype._cancel = function () {
               !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel())
            }, e.prototype._reject = function (t) {
               this._values = null, this._promise._rejectCallback(t, !1)
            }, e.prototype._promiseFulfilled = function (t, e) {
               return this._values[e] = t, ++this._totalResolved >= this._length && (this._resolve(this._values), !0)
            }, e.prototype._promiseCancelled = function () {
               return this._cancel(), !0
            }, e.prototype._promiseRejected = function (t) {
               return this._totalResolved++, this._reject(t), !0
            }, e.prototype._resultCancelled = function () {
               if (!this._isResolved()) {
                  var t = this._values;
                  if (this._cancel(), t instanceof s) t.cancel();
                  else
                     for (var e = 0; e < t.length; ++e) t[e] instanceof s && t[e].cancel()
               }
            }, e.prototype.shouldCopyValues = function () {
               return !0
            }, e.prototype.getActualLength = function (t) {
               return t
            }, e
         }
      }, {
         "./util": 36
      }],
      24: [function (n, t, e) {
         t.exports = function (l, u) {
            function a(t) {
               return !e.test(t)
            }

            function d(t) {
               try {
                  return !0 === t.__isPromisified__
               } catch (t) {
                  return !1
               }
            }

            function f(t, e, n, r) {
               for (var o, i, a, s, c = v.inheritedDataKeys(t), l = [], u = 0; u < c.length; ++u) {
                  var p = c[u],
                     h = t[p],
                     f = r === w || w(p, h, t);
                  "function" != typeof h || d(h) || (o = t, i = p, a = e, s = void 0, (s = v.getDataPropertyOrDefault(o, i + a, b)) && d(s)) || !r(p, h, t, f) || l.push(p, h)
               }
               return function (t, e, n) {
                  for (var r = 0; r < t.length; r += 2) {
                     var o = t[r];
                     if (n.test(o))
                        for (var i = o.replace(n, ""), a = 0; a < t.length; a += 2)
                           if (t[a] === i) throw new m("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e))
                  }
               }(l, e, n), l
            }

            function p(t, e, n, r, o) {
               for (var i = new RegExp(C(e) + "$"), a = f(t, e, i, n), s = 0, c = a.length; s < c; s += 2) {
                  var l, u = a[s],
                     p = a[s + 1],
                     h = u + e;
                  r === k ? t[h] = k(u, _, u, p, e, o) : (l = r(p, function () {
                     return k(u, _, u, p, e, o)
                  }), v.notEnumerableProp(l, "__isPromisified__", !0), t[h] = l)
               }
               return v.toFastProperties(t), t
            }
            var _ = {},
               v = n("./util"),
               h = n("./nodeback"),
               y = v.withAppended,
               g = v.maybeWrapAsError,
               t = v.canEvaluate,
               m = n("./errors").TypeError,
               b = {
                  __isPromisified__: !0
               },
               e = new RegExp("^(?:" + ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"].join("|") + ")$"),
               w = function (t) {
                  return v.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t
               },
               C = function (t) {
                  return t.replace(/([$])/, "\\$")
               },
               k = t ? void 0 : function (o, i, t, e, n, a) {
                  function r() {
                     var t = i;
                     i === _ && (t = this);
                     var e = new l(u);
                     e._captureStackTrace();
                     var n = "string" == typeof c && this !== s ? this[c] : o,
                        r = h(e, a);
                     try {
                        n.apply(t, y(arguments, r))
                     } catch (t) {
                        e._rejectCallback(g(t), !0, !0)
                     }
                     return e._isFateSealed() || e._setAsyncGuaranteed(), e
                  }
                  var s = function () {
                        return this
                     }(),
                     c = o;
                  return "string" == typeof c && (o = e), v.notEnumerableProp(r, "__isPromisified__", !0), r
               };
            l.promisify = function (t, e) {
               if ("function" != typeof t) throw new m("expecting a function but got " + v.classString(t));
               if (d(t)) return t;
               var n, r = void 0 === (e = Object(e)).context ? _ : e.context,
                  o = !!e.multiArgs,
                  i = k(n = t, r, void 0, n, null, o);
               return v.copyDescriptors(t, i, a), i
            }, l.promisifyAll = function (t, e) {
               if ("function" != typeof t && "object" != _typeof(t)) throw new m("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
               var n = !!(e = Object(e)).multiArgs,
                  r = e.suffix;
               "string" != typeof r && (r = "Async");
               var o = e.filter;
               "function" != typeof o && (o = w);
               var i = e.promisifier;
               if ("function" != typeof i && (i = k), !v.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
               for (var a = v.inheritedDataKeys(t), s = 0; s < a.length; ++s) {
                  var c = t[a[s]];
                  "constructor" !== a[s] && v.isClass(c) && (p(c.prototype, r, o, i, n), p(c, r, o, i, n))
               }
               return p(t, r, o, i, n)
            }
         }
      }, {
         "./errors": 12,
         "./nodeback": 20,
         "./util": 36
      }],
      25: [function (d, t, e) {
         t.exports = function (r, t, o, i) {
            function a(t) {
               var e = !1;
               if (void 0 !== s && t instanceof s) o = h(t), e = !0;
               else
                  for (var n = l.keys(t), r = n.length, o = new Array(2 * r), i = 0; i < r; ++i) {
                     var a = n[i];
                     o[i] = t[a], o[i + r] = a
                  }
               this.constructor$(o), this._isMap = e, this._init$(void 0, e ? -6 : -3)
            }

            function e(t) {
               var e, n = o(t);
               return c(n) ? (e = n instanceof r ? n._then(r.props, void 0, void 0, void 0, void 0) : new a(n).promise(), n instanceof r && e._propagateFrom(n, 2), e) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n")
            }
            var s, n = d("./util"),
               c = n.isObject,
               l = d("./es5");
            "function" == typeof Map && (s = Map);
            var u, p, h = (p = 0, function (t) {
               u = t.size, p = 0;
               var e = new Array(2 * t.size);
               return t.forEach(f, e), e
            });

            function f(t, e) {
               this[p] = t, this[p + u] = e, p++
            }
            n.inherits(a, t), a.prototype._init = function () {}, a.prototype._promiseFulfilled = function (t, e) {
               var n;
               if (this._values[e] = t, ++this._totalResolved >= this._length) {
                  if (this._isMap) n = function (t) {
                     for (var e = new s, n = t.length / 2 | 0, r = 0; r < n; ++r) {
                        var o = t[n + r],
                           i = t[r];
                        e.set(o, i)
                     }
                     return e
                  }(this._values);
                  else {
                     n = {};
                     for (var r = this.length(), o = 0, i = this.length(); o < i; ++o) n[this._values[o + r]] = this._values[o]
                  }
                  return this._resolve(n), !0
               }
               return !1
            }, a.prototype.shouldCopyValues = function () {
               return !1
            }, a.prototype.getActualLength = function (t) {
               return t >> 1
            }, r.prototype.props = function () {
               return e(this)
            }, r.props = e
         }
      }, {
         "./es5": 13,
         "./util": 36
      }],
      26: [function (t, e, n) {
         function r(t) {
            this._capacity = t, this._length = 0, this._front = 0
         }
         r.prototype._willBeOverCapacity = function (t) {
            return this._capacity < t
         }, r.prototype._pushOne = function (t) {
            var e = this.length();
            this._checkCapacity(e + 1), this[this._front + e & this._capacity - 1] = t, this._length = e + 1
         }, r.prototype.push = function (t, e, n) {
            var r = this.length() + 3;
            if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
            var o = this._front + r - 3;
            this._checkCapacity(r);
            var i = this._capacity - 1;
            this[o & i] = t, this[1 + o & i] = e, this[2 + o & i] = n, this._length = r
         }, r.prototype.shift = function () {
            var t = this._front,
               e = this[t];
            return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, e
         }, r.prototype.length = function () {
            return this._length
         }, r.prototype._checkCapacity = function (t) {
            this._capacity < t && this._resizeTo(this._capacity << 1)
         }, r.prototype._resizeTo = function (t) {
            var e = this._capacity;
            this._capacity = t,
               function (t, e, n, r, o) {
                  for (var i = 0; i < o; ++i) n[i + r] = t[i + e], t[i + e] = void 0
               }(this, 0, this, e, this._front + this._length & e - 1)
         }, e.exports = r
      }, {}],
      27: [function (t, e, n) {
         e.exports = function (l, u, p, h) {
            function n(t, e) {
               var n = p(t);
               if (n instanceof l) return d(n);
               if (null === (t = f.asArray(t))) return h("expecting an array or an iterable object but got " + f.classString(t));
               var r = new l(u);
               void 0 !== e && r._propagateFrom(e, 3);
               for (var o = r._fulfill, i = r._reject, a = 0, s = t.length; a < s; ++a) {
                  var c = t[a];
                  (void 0 !== c || a in t) && l.cast(c)._then(o, i, void 0, r, null)
               }
               return r
            }
            var f = t("./util"),
               d = function (e) {
                  return e.then(function (t) {
                     return n(t, e)
                  })
               };
            l.race = function (t) {
               return n(t, void 0)
            }, l.prototype.race = function () {
               return n(this, void 0)
            }
         }
      }, {
         "./util": 36
      }],
      28: [function (e, t, n) {
         t.exports = function (s, t, o, n, i, a) {
            function c(t, e, n, r) {
               this.constructor$(t);
               var o = s._getContext();
               this._fn = h.contextBind(o, e), void 0 !== n && (n = s.resolve(n))._attachCancellationCallback(this), this._initialValue = n, this._currentCancellable = null, this._eachValues = r === i ? Array(this._length) : 0 === r ? null : void 0, this._promise._captureStackTrace(), this._init$(void 0, -5)
            }

            function l(t, e) {
               this.isFulfilled() ? e._resolve(t) : e._reject(t)
            }

            function r(t, e, n, r) {
               return "function" != typeof e ? o("expecting a function but got " + h.classString(e)) : new c(t, e, n, r).promise()
            }

            function u(t) {
               this.accum = t, this.array._gotAccum(t);
               var e = n(this.value, this.array._promise);
               return e instanceof s ? (this.array._currentCancellable = e)._then(p, void 0, void 0, this, void 0) : p.call(this, e)
            }

            function p(t) {
               var e, n = this.array,
                  r = n._promise,
                  o = f(n._fn);
               r._pushContext(), (e = void 0 !== n._eachValues ? o.call(r._boundValue(), t, this.index, this.length) : o.call(r._boundValue(), this.accum, t, this.index, this.length)) instanceof s && (n._currentCancellable = e);
               var i = r._popContext();
               return a.checkForgottenReturns(e, i, void 0 !== n._eachValues ? "Promise.each" : "Promise.reduce", r), e
            }
            var h = e("./util"),
               f = h.tryCatch;
            h.inherits(c, t), c.prototype._gotAccum = function (t) {
               void 0 !== this._eachValues && null !== this._eachValues && t !== i && this._eachValues.push(t)
            }, c.prototype._eachComplete = function (t) {
               return null !== this._eachValues && this._eachValues.push(t), this._eachValues
            }, c.prototype._init = function () {}, c.prototype._resolveEmptyArray = function () {
               this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue)
            }, c.prototype.shouldCopyValues = function () {
               return !1
            }, c.prototype._resolve = function (t) {
               this._promise._resolveCallback(t), this._values = null
            }, c.prototype._resultCancelled = function (t) {
               return t === this._initialValue ? this._cancel() : void(this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof s && this._currentCancellable.cancel(), this._initialValue instanceof s && this._initialValue.cancel()))
            }, c.prototype._iterate = function (t) {
               var e = (this._values = t).length,
                  n = void 0 !== this._initialValue ? (a = this._initialValue, 0) : (a = s.resolve(t[0]), 1);
               this._currentCancellable = a;
               for (var r = n; r < e; ++r) {
                  var o = t[r];
                  o instanceof s && o.suppressUnhandledRejections()
               }
               if (!a.isRejected())
                  for (; n < e; ++n) {
                     var i = {
                           accum: null,
                           value: t[n],
                           index: n,
                           length: e,
                           array: this
                        },
                        a = a._then(u, void 0, void 0, i, void 0);
                     0 == (127 & n) && a._setNoAsyncGuarantee()
                  }
               void 0 !== this._eachValues && (a = a._then(this._eachComplete, void 0, void 0, this, void 0)), a._then(l, l, void 0, a, this)
            }, s.prototype.reduce = function (t, e) {
               return r(this, t, e, null)
            }, s.reduce = r
         }
      }, {
         "./util": 36
      }],
      29: [function (t, e, n) {
         var r, o, i, a, s = t("./util"),
            c = s.getNativePromise();
         i = s.isNode && "undefined" == typeof MutationObserver ? (r = global.setImmediate, o = process.nextTick, s.isRecentNode ? function (t) {
            r.call(global, t)
         } : function (t) {
            o.call(process, t)
         }) : "function" == typeof c && "function" == typeof c.resolve ? (a = c.resolve(), function (t) {
            a.then(t)
         }) : "undefined" != typeof MutationObserver && ("undefined" == typeof window || !window.navigator || !window.navigator.standalone && !window.cordova) && "classList" in document.documentElement ? function () {
            var n = document.createElement("div"),
               r = {
                  attributes: !0
               },
               o = !1,
               i = document.createElement("div");
            new MutationObserver(function () {
               n.classList.toggle("foo"), o = !1
            }).observe(i, r);
            return function (t) {
               var e = new MutationObserver(function () {
                  e.disconnect(), t()
               });
               e.observe(n, r), o || (o = !0, i.classList.toggle("foo"))
            }
         }() : "undefined" != typeof setImmediate ? function (t) {
            setImmediate(t)
         } : "undefined" != typeof setTimeout ? function (t) {
            setTimeout(t, 0)
         } : function () {
            throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
         }, e.exports = i
      }, {
         "./util": 36
      }],
      30: [function (i, t, e) {
         t.exports = function (t, e, n) {
            function r(t) {
               this.constructor$(t)
            }
            var o = t.PromiseInspection;
            i("./util").inherits(r, e), r.prototype._promiseResolved = function (t, e) {
               return this._values[t] = e, ++this._totalResolved >= this._length && (this._resolve(this._values), !0)
            }, r.prototype._promiseFulfilled = function (t, e) {
               var n = new o;
               return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n)
            }, r.prototype._promiseRejected = function (t, e) {
               var n = new o;
               return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n)
            }, t.settle = function (t) {
               return n.deprecated(".settle()", ".reflect()"), new r(t).promise()
            }, t.allSettled = function (t) {
               return new r(t).promise()
            }, t.prototype.settle = function () {
               return t.settle(this)
            }
         }
      }, {
         "./util": 36
      }],
      31: [function (u, t, e) {
         t.exports = function (t, e, o) {
            function i(t) {
               this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1
            }

            function n(t, e) {
               if ((0 | e) !== e || e < 0) return o("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
               var n = new i(t),
                  r = n.promise();
               return n.setHowMany(e), n.init(), r
            }
            var r = u("./util"),
               a = u("./errors").RangeError,
               s = u("./errors").AggregateError,
               c = r.isArray,
               l = {};
            r.inherits(i, e), i.prototype._init = function () {
               if (this._initialized) {
                  if (0 === this._howMany) return void this._resolve([]);
                  this._init$(void 0, -5);
                  var t = c(this._values);
                  !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()))
               }
            }, i.prototype.init = function () {
               this._initialized = !0, this._init()
            }, i.prototype.setUnwrap = function () {
               this._unwrap = !0
            }, i.prototype.howMany = function () {
               return this._howMany
            }, i.prototype.setHowMany = function (t) {
               this._howMany = t
            }, i.prototype._promiseFulfilled = function (t) {
               return this._addFulfilled(t), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0)
            }, i.prototype._promiseRejected = function (t) {
               return this._addRejected(t), this._checkOutcome()
            }, i.prototype._promiseCancelled = function () {
               return this._values instanceof t || null == this._values ? this._cancel() : (this._addRejected(l), this._checkOutcome())
            }, i.prototype._checkOutcome = function () {
               if (this.howMany() > this._canPossiblyFulfill()) {
                  for (var t = new s, e = this.length(); e < this._values.length; ++e) this._values[e] !== l && t.push(this._values[e]);
                  return 0 < t.length ? this._reject(t) : this._cancel(), !0
               }
               return !1
            }, i.prototype._fulfilled = function () {
               return this._totalResolved
            }, i.prototype._rejected = function () {
               return this._values.length - this.length()
            }, i.prototype._addRejected = function (t) {
               this._values.push(t)
            }, i.prototype._addFulfilled = function (t) {
               this._values[this._totalResolved++] = t
            }, i.prototype._canPossiblyFulfill = function () {
               return this.length() - this._rejected()
            }, i.prototype._getRangeError = function (t) {
               var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
               return new a(e)
            }, i.prototype._resolveEmptyArray = function () {
               this._reject(this._getRangeError(0))
            }, t.some = n, t.prototype.some = function (t) {
               return n(this, t)
            }, t._SomePromiseArray = i
         }
      }, {
         "./errors": 12,
         "./util": 36
      }],
      32: [function (t, e, n) {
         e.exports = function (t) {
            function e(t) {
               void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0)
            }
            e.prototype._settledValue = function () {
               return this._settledValueField
            };
            var n = e.prototype.value = function () {
                  if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                  return this._settledValue()
               },
               r = e.prototype.error = e.prototype.reason = function () {
                  if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                  return this._settledValue()
               },
               o = e.prototype.isFulfilled = function () {
                  return 0 != (33554432 & this._bitField)
               },
               i = e.prototype.isRejected = function () {
                  return 0 != (16777216 & this._bitField)
               },
               a = e.prototype.isPending = function () {
                  return 0 == (50397184 & this._bitField)
               },
               s = e.prototype.isResolved = function () {
                  return 0 != (50331648 & this._bitField)
               };
            e.prototype.isCancelled = function () {
               return 0 != (8454144 & this._bitField)
            }, t.prototype.__isCancelled = function () {
               return 65536 == (65536 & this._bitField)
            }, t.prototype._isCancelled = function () {
               return this._target().__isCancelled()
            }, t.prototype.isCancelled = function () {
               return 0 != (8454144 & this._target()._bitField)
            }, t.prototype.isPending = function () {
               return a.call(this._target())
            }, t.prototype.isRejected = function () {
               return i.call(this._target())
            }, t.prototype.isFulfilled = function () {
               return o.call(this._target())
            }, t.prototype.isResolved = function () {
               return s.call(this._target())
            }, t.prototype.value = function () {
               return n.call(this._target())
            }, t.prototype.reason = function () {
               var t = this._target();
               return t._unsetRejectionIsUnhandled(), r.call(t)
            }, t.prototype._value = function () {
               return this._settledValue()
            }, t.prototype._reason = function () {
               return this._unsetRejectionIsUnhandled(), this._settledValue()
            }, t.PromiseInspection = e
         }
      }, {}],
      33: [function (t, e, n) {
         e.exports = function (s, c) {
            var l = t("./util"),
               u = l.errorObj,
               o = l.isObject,
               i = {}.hasOwnProperty;
            return function (t, e) {
               if (o(t)) {
                  if (t instanceof s) return t;
                  var n = function (t) {
                     try {
                        return t.then
                     } catch (t) {
                        return u.e = t, u
                     }
                  }(t);
                  if (n === u) {
                     e && e._pushContext();
                     var r = s.reject(n.e);
                     return e && e._popContext(), r
                  }
                  if ("function" == typeof n) {
                     if (function (t) {
                           try {
                              return i.call(t, "_promise0")
                           } catch (t) {
                              return !1
                           }
                        }(t)) {
                        r = new s(c);
                        return t._then(r._fulfill, r._reject, void 0, r, null), r
                     }
                     return function (t, e, n) {
                        var r = new s(c),
                           o = r;
                        n && n._pushContext(), r._captureStackTrace(), n && n._popContext();
                        var i = !0,
                           a = l.tryCatch(e).call(t, function (t) {
                              r && (r._resolveCallback(t), r = null)
                           }, function (t) {
                              r && (r._rejectCallback(t, i, !0), r = null)
                           });
                        return i = !1, r && a === u && (r._rejectCallback(a.e, !0, !0), r = null), o
                     }(t, n, e)
                  }
               }
               return t
            }
         }
      }, {
         "./util": 36
      }],
      34: [function (t, e, n) {
         e.exports = function (o, i, s) {
            function c(t) {
               this.handle = t
            }

            function n(t) {
               return clearTimeout(this.handle), t
            }

            function r(t) {
               throw clearTimeout(this.handle), t
            }
            var l = t("./util"),
               u = o.TimeoutError;
            c.prototype._resultCancelled = function () {
               clearTimeout(this.handle)
            };

            function a(t) {
               return e(+this).thenReturn(t)
            }
            var e = o.delay = function (t, e) {
               var n, r;
               return void 0 !== e ? (n = o.resolve(e)._then(a, null, null, t, void 0), s.cancellation() && e instanceof o && n._setOnCancel(e)) : (n = new o(i), r = setTimeout(function () {
                  n._fulfill()
               }, +t), s.cancellation() && n._setOnCancel(new c(r)), n._captureStackTrace()), n._setAsyncGuaranteed(), n
            };
            o.prototype.delay = function (t) {
               return e(t, this)
            };
            o.prototype.timeout = function (t, o) {
               t = +t;
               var i, a, e = new c(setTimeout(function () {
                  var t, e, n, r;
                  i.isPending() && (t = i, n = a, r = "string" != typeof (e = o) ? e instanceof Error ? e : new u("operation timed out") : new u(e), l.markAsOriginatingFromRejection(r), t._attachExtraTrace(r), t._reject(r), null != n && n.cancel())
               }, t));
               return s.cancellation() ? (a = this.then(), (i = a._then(n, r, void 0, e, void 0))._setOnCancel(e)) : i = this._then(n, r, void 0, e, void 0), i
            }
         }
      }, {
         "./util": 36
      }],
      35: [function (a, t, e) {
         t.exports = function (h, f, d, e, t, _) {
            function l(t) {
               setTimeout(function () {
                  throw t
               }, 0)
            }

            function v(o, i) {
               var a = 0,
                  s = o.length,
                  c = new h(t);
               return function t() {
                  if (s <= a) return c._fulfill();
                  var e, n, r = (e = o[a++], (n = d(e)) !== e && "function" == typeof e._isDisposable && "function" == typeof e._getDisposer && e._isDisposable() && n._setDisposable(e._getDisposer()), n);
                  if (r instanceof h && r._isDisposable()) {
                     try {
                        r = d(r._getDisposer().tryDispose(i), o.promise)
                     } catch (t) {
                        return l(t)
                     }
                     if (r instanceof h) return r._then(t, l, null, null, null)
                  }
                  t()
               }(), c
            }

            function y(t, e, n) {
               this._data = t, this._promise = e, this._context = n
            }

            function n(t, e, n) {
               this.constructor$(t, e, n)
            }

            function g(t) {
               return y.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t
            }

            function m(t) {
               this.length = t, this.promise = null, this[t - 1] = null
            }
            var b = a("./util"),
               r = a("./errors").TypeError,
               o = a("./util").inherits,
               w = b.errorObj,
               C = b.tryCatch,
               i = {};
            y.prototype.data = function () {
               return this._data
            }, y.prototype.promise = function () {
               return this._promise
            }, y.prototype.resource = function () {
               return this.promise().isFulfilled() ? this.promise().value() : i
            }, y.prototype.tryDispose = function (t) {
               var e = this.resource(),
                  n = this._context;
               void 0 !== n && n._pushContext();
               var r = e !== i ? this.doDispose(e, t) : null;
               return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, r
            }, y.isDisposer = function (t) {
               return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose
            }, o(n, y), n.prototype.doDispose = function (t, e) {
               return this.data().call(t, t, e)
            }, m.prototype._resultCancelled = function () {
               for (var t = this.length, e = 0; e < t; ++e) {
                  var n = this[e];
                  n instanceof h && n.cancel()
               }
            }, h.using = function () {
               var t = arguments.length;
               if (t < 2) return f("you must pass at least 2 arguments to Promise.using");
               var i = arguments[t - 1];
               if ("function" != typeof i) return f("expecting a function but got " + b.classString(i));
               var e, a = !0;
               2 === t && Array.isArray(arguments[0]) ? (t = (e = arguments[0]).length, a = !1) : (e = arguments, t--);
               for (var n = new m(t), r = 0; r < t; ++r) {
                  var o, s, c = e[r];
                  y.isDisposer(c) ? (c = (o = c).promise())._setDisposable(o) : (s = d(c)) instanceof h && (c = s._then(g, null, null, {
                     resources: n,
                     index: r
                  }, void 0)), n[r] = c
               }
               for (var l = new Array(n.length), r = 0; r < l.length; ++r) l[r] = h.resolve(n[r]).reflect();
               var u = h.all(l).then(function (t) {
                     for (var e = 0; e < t.length; ++e) {
                        var n = t[e];
                        if (n.isRejected()) return w.e = n.error(), w;
                        if (!n.isFulfilled()) return void u.cancel();
                        t[e] = n.value()
                     }
                     p._pushContext(), i = C(i);
                     var r = a ? i.apply(void 0, t) : i(t),
                        o = p._popContext();
                     return _.checkForgottenReturns(r, o, "Promise.using", p), r
                  }),
                  p = u.lastly(function () {
                     var t = new h.PromiseInspection(u);
                     return v(n, t)
                  });
               return (n.promise = p)._setOnCancel(n), p
            }, h.prototype._setDisposable = function (t) {
               this._bitField = 131072 | this._bitField, this._disposer = t
            }, h.prototype._isDisposable = function () {
               return 0 < (131072 & this._bitField)
            }, h.prototype._getDisposer = function () {
               return this._disposer
            }, h.prototype._unsetDisposable = function () {
               this._bitField = -131073 & this._bitField, this._disposer = void 0
            }, h.prototype.disposer = function (t) {
               if ("function" == typeof t) return new n(t, this, e());
               throw new r
            }
         }
      }, {
         "./errors": 12,
         "./util": 36
      }],
      36: [function (t, e, n) {
         function r() {
            try {
               var t = u;
               return u = null, t.apply(this, arguments)
            } catch (t) {
               return d.e = t, d
            }
         }

         function o(t) {
            return null == t || !0 === t || !1 === t || "string" == typeof t || "number" == typeof t
         }

         function i(t, e, n) {
            if (o(t)) return t;
            var r = {
               value: n,
               configurable: !0,
               enumerable: !1,
               writable: !0
            };
            return h.defineProperty(t, e, r), t
         }

         function a(t) {
            try {
               return t + ""
            } catch (t) {
               return "[no string representation]"
            }
         }

         function s(t) {
            return t instanceof Error || null !== t && "object" == _typeof(t) && "string" == typeof t.message && "string" == typeof t.name
         }

         function c(t) {
            return s(t) && h.propertyIsWritable(t, "stack")
         }

         function l(t) {
            return {}.toString.call(t)
         }
         var u, p, h = t("./es5"),
            f = "undefined" == typeof navigator,
            d = {
               e: {}
            },
            _ = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0 !== this ? this : null,
            v = function () {
               function s(t) {
                  for (var e = 0; e < o.length; ++e)
                     if (o[e] === t) return 1
               }
               var o = [Array.prototype, Object.prototype, Function.prototype];
               if (h.isES5) {
                  var c = Object.getOwnPropertyNames;
                  return function (t) {
                     for (var e, n = [], r = Object.create(null); null != t && !s(t);) {
                        try {
                           e = c(t)
                        } catch (t) {
                           return n
                        }
                        for (var o = 0; o < e.length; ++o) {
                           var i, a = e[o];
                           r[a] || (r[a] = !0, null != (i = Object.getOwnPropertyDescriptor(t, a)) && null == i.get && null == i.set && n.push(a))
                        }
                        t = h.getPrototypeOf(t)
                     }
                     return n
                  }
               }
               var i = {}.hasOwnProperty;
               return function (t) {
                  if (s(t)) return [];
                  var e = [];
                  t: for (var n in t)
                     if (i.call(t, n)) e.push(n);
                     else {
                        for (var r = 0; r < o.length; ++r)
                           if (i.call(o[r], n)) continue t;
                        e.push(n)
                     }
                  return e
               }
            }(),
            y = /this\s*\.\s*\S+\s*=/,
            g = /^[a-z$_][a-z$_0-9]*$/i,
            m = "stack" in new Error ? function (t) {
               return c(t) ? t : new Error(a(t))
            } : function (t) {
               if (c(t)) return t;
               try {
                  throw new Error(a(t))
               } catch (t) {
                  return t
               }
            },
            b = function (t) {
               return h.isArray(t) ? t : null
            };
         "undefined" != typeof Symbol && Symbol.iterator && (p = "function" == typeof Array.from ? function (t) {
            return Array.from(t)
         } : function (t) {
            for (var e, n = [], r = t[Symbol.iterator](); !(e = r.next()).done;) n.push(e.value);
            return n
         }, b = function (t) {
            return h.isArray(t) ? t : null != t && "function" == typeof t[Symbol.iterator] ? p(t) : null
         });
         var w, C, k = "undefined" != typeof process && "[object process]" === l(process).toLowerCase(),
            j = "undefined" != typeof process && void 0 !== process.env,
            E = {
               setReflectHandler: function (t) {
                  w = t
               },
               isClass: function (t) {
                  try {
                     if ("function" == typeof t) {
                        var e = h.names(t.prototype),
                           n = h.isES5 && 1 < e.length,
                           r = 0 < e.length && !(1 === e.length && "constructor" === e[0]),
                           o = y.test(t + "") && 0 < h.names(t).length;
                        if (n || r || o) return !0
                     }
                     return !1
                  } catch (t) {
                     return !1
                  }
               },
               isIdentifier: function (t) {
                  return g.test(t)
               },
               inheritedDataKeys: v,
               getDataPropertyOrDefault: function (t, e, n) {
                  if (!h.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
                  var r = Object.getOwnPropertyDescriptor(t, e);
                  return null != r ? null == r.get && null == r.set ? r.value : n : void 0
               },
               thrower: function (t) {
                  throw t
               },
               isArray: h.isArray,
               asArray: b,
               notEnumerableProp: i,
               isPrimitive: o,
               isObject: function (t) {
                  return "function" == typeof t || "object" == _typeof(t) && null !== t
               },
               isError: s,
               canEvaluate: f,
               errorObj: d,
               tryCatch: function (t) {
                  return u = t, r
               },
               inherits: function (e, n) {
                  function t() {
                     for (var t in this.constructor = e, (this.constructor$ = n).prototype) r.call(n.prototype, t) && "$" !== t.charAt(t.length - 1) && (this[t + "$"] = n.prototype[t])
                  }
                  var r = {}.hasOwnProperty;
                  return t.prototype = n.prototype, e.prototype = new t, e.prototype
               },
               withAppended: function (t, e) {
                  for (var n = t.length, r = new Array(n + 1), o = 0; o < n; ++o) r[o] = t[o];
                  return r[o] = e, r
               },
               maybeWrapAsError: function (t) {
                  return o(t) ? new Error(a(t)) : t
               },
               toFastProperties: function (t) {
                  function e() {}

                  function n() {
                     return _typeof(r.foo)
                  }
                  e.prototype = t;
                  var r = new e;
                  return n(), n(), t
               },
               filledRange: function (t, e, n) {
                  for (var r = new Array(t), o = 0; o < t; ++o) r[o] = e + o + n;
                  return r
               },
               toString: a,
               canAttachTrace: c,
               ensureErrorObject: m,
               originatesFromRejection: function (t) {
                  return null != t && (t instanceof Error.__BluebirdErrorTypes__.OperationalError || !0 === t.isOperational)
               },
               markAsOriginatingFromRejection: function (t) {
                  try {
                     i(t, "isOperational", !0)
                  } catch (t) {}
               },
               classString: l,
               copyDescriptors: function (t, e, n) {
                  for (var r = h.names(t), o = 0; o < r.length; ++o) {
                     var i = r[o];
                     if (n(i)) try {
                        h.defineProperty(e, i, h.getDescriptor(t, i))
                     } catch (t) {}
                  }
               },
               isNode: k,
               hasEnvVariables: j,
               env: function (t) {
                  return j ? process.env[t] : void 0
               },
               global: _,
               getNativePromise: function () {
                  if ("function" == typeof Promise) try {
                     if ("[object Promise]" === l(new Promise(function () {}))) return Promise
                  } catch (t) {}
               },
               contextBind: function (t, e) {
                  if (null === t || "function" != typeof e || e === w) return e;
                  null !== t.domain && (e = t.domain.bind(e));
                  var n, r = t.async;
                  return null !== r && (n = e, e = function () {
                     var t = new Array(2).concat([].slice.call(arguments));
                     return t[0] = n, t[1] = this, r.runInAsyncScope.apply(r, t)
                  }), e
               }
            };
         E.isRecentNode = E.isNode && (process.versions && process.versions.node ? C = process.versions.node.split(".").map(Number) : process.version && (C = process.version.split(".").map(Number)), 0 === C[0] && 10 < C[1] || 0 < C[0]), E.nodeSupportsAsyncResource = E.isNode && function () {
            var e = !1;
            try {
               e = "function" == typeof t("async_hooks").AsyncResource.prototype.runInAsyncScope
            } catch (t) {
               e = !1
            }
            return e
         }(), E.isNode && E.toFastProperties(process);
         try {
            throw new Error
         } catch (t) {
            E.lastLineError = t
         }
         e.exports = E
      }, {
         "./es5": 13,
         async_hooks: void 0
      }]
   }, {}, [4])(4)
}), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);
var Preloader = new Promise(function (t) {
      var e = $(".preloader"),
         n = $(".spinner");
      e.length && $(window).on({
         load: function () {
            n.delay(750).fadeOut(), setTimeout(function () {
               e.delay(750).fadeOut("slow"), t()
            }, 350)
         }
      })
   }),
   Navbar = function () {
      var o = $(".esu-navbar"),
         t = o.data("transparent"),
         i = o.data("text-color"),
         a = o.css("background-color"),
         s = o.find(".navbar-text"),
         c = o.find('.navbar-text a:not(".btn")'),
         l = $("main").find("section:first-child");

      function e() {
         var t, e = $(window).scrollTop(),
            n = $(window).width(),
            r = (e / (l.find(".bg-container").length ? l.outerHeight() : 800) * 1.5).toString();
         992 <= n ? -1 == a.indexOf("a") && (t = a.replace(")", ", " + r + ")").replace("rgb", "rgba"), o.attr("style", "background-color: " + t + "!important"), "0.4" < r ? (s.css("color", i), c.css("color", i)) : (s.css("color", ""), c.css("color", "")), "0.97" < r && (t = a.replace(")", ", 0.97)").replace("rgb", "rgba"), o.attr("style", "background-color: " + t + "!important"))) : (o.attr("style", "background-color: " + a + "!important"), s.css("color", i), c.css("color", i))
      }
      o.length && void 0 !== t && (e(), $(window).on({
         "scroll resize": function () {
            e()
         }
      }))
   }(),
   Menu = function () {
      var t = $(".menu-toggle"),
         e = $(".esu-navbar-overlay"),
         n = $(".esu-navbar-nav"),
         r = $(".search i"),
         o = $(".navbar-text");

      function i() {
         t.addClass("open"), e.addClass("open"), n.addClass("open"), o.css("z-index", -1)
      }
      e.length && t.on({
         click: function () {
            $(this).hasClass("open") ? (n.removeClass("open"), setTimeout(function () {
               t.removeClass("open"), e.removeClass("open"), o.delay(800).queue(function (t) {
                  $(this).css("z-index", 0), t()
               })
            }, 500), r.length && r.parent().removeClass("open")) : i()
         }
      }), r.length && r.on({
         click: function () {
            e.length && i(), setTimeout(function () {
               r.parent().addClass("open")
            }, 500)
         }
      })
   }(),
   DropdownToggle = function () {
      var t = $(".dropdown-toggle"),
         e = $(".dropdown-menu");
      t.length && t.on({
         click: function () {
            var t;
            t = $(this), e.not(t.next(".dropdown-menu")).slideUp(500), t.next(".dropdown-menu").slideToggle(500)
         }
      })
   }(),
   Sticky = function () {
      var t = $('[data-toggle="sticky"]');

      function e(t) {
         var e = $(window).width();
         !(void 0 === t.data("sticky-disable-mobile") || t.data("sticky-disable-mobile")) || 992 <= e ? n(t) : t.trigger("sticky_kit:detach")
      }

      function n(t) {
         var e = t.data("sticky-offset-top") || 0,
            n = t.data("sticky-parent") || "section",
            r = void 0 === t.data("sticky-bottom") || t.data("sticky-bottom");
         t.stick_in_parent({
            parent: n,
            offset_top: e,
            bottoming: r
         })
      }
      t.length && (t.each(function () {
         e($(this))
      }), $(window).on({
         resize: function () {
            t.each(function () {
               e($(this))
            })
         }
      }))
   }(),
   Parallax = void($(".parallax").length && new Rellax(".parallax")),
   SmooothScroll = function () {
      var t = $("[data-smooth-scroll]"),
         o = t.data("smooth-scroll-offset") || 0,
         i = $("html, body");

      function e(t) {
         var e, n, r = t.data("smooth-scroll-hash");
         void 0 !== r && !1 === r && event.preventDefault(), n = (e = t).attr("href") ? e.attr("href") : e, i.stop(!0, !0).animate({
            scrollTop: $(n).offset().top - o
         }, 800, function () {})
      }
      t.length && "" !== t.hash && t.on({
         click: function () {
            e($(this))
         }
      })
   }(),
   BackgroundText = function () {
      var t = $("[data-background-text], .bg-text");
      t.length && t.each(function () {
         var t, e, n, r, o, i, a, s, c, l;
         t = $(this), e = t.data("color"), n = t.data("opacity"), r = t.data("font-size"), o = t.data("font-weight"), i = t.data("offset-x"), a = t.data("offset-y"), s = t.data("padding"), c = t.data("margin"), l = t.data("letter-spacing"), t.css({
            color: e,
            opacity: n,
            "font-size": r,
            "font-weight": o,
            left: i,
            top: a,
            padding: s,
            margin: c,
            "letter-spacing": l
         })
      })
   }(),
   Typed = function () {
      var t = $("[data-typed-text], .typed");
      t.length && t.each(function (t) {
         ! function (t, e) {
            var n = "typed_" + e,
               r = t.data("typed-text").split("###"),
               o = void 0 === t.data("typed-loop") || t.data("typed-loop"),
               i = t.data("typed-speed") || 100,
               a = t.data("typed-back-speed") || 50,
               s = t.data("typed-back-delay") || 1e3,
               c = t.data("typed-start-delay") || 0,
               l = t.data("typed-cursor") || "";+
            t.attr("data-typed-id", n);
            var u = new Typed("[data-typed-id=" + n + "]", {
               strings: r,
               typeSpeed: i,
               backSpeed: a,
               startDelay: c,
               cursorChar: l,
               loop: o,
               backDelay: s
            });
            u.stop(), $(".preloader").length ? Preloader.then(function () {
               setTimeout(function () {
                  u.start()
               }, 1500)
            }, function (t) {}) : setTimeout(function () {
               u.start()
            }, 1500)
         }($(this), t)
      })
   }(),
   GoogleMap = function () {
      var t = $("[data-latlng]");
      t.length && google.maps.event.addDomListener(window, "load", void t.each(function (t) {
         var e, n = $(this),
            r = n.data("latlng").split(","),
            o = {
               lat: parseFloat(r[0]),
               lng: parseFloat(r[1])
            },
            i = n.html(),
            a = void 0 !== n.data("zoom") ? n.data("zoom") : 14,
            s = n.data("marker"),
            c = {},
            l = void 0 === $(this).data("zoom-control") || n.data("zoom-control"),
            u = void 0 === $(this).data("map-type-control") || n.data("map-type-control"),
            p = void 0 === $(this).data("scale-control") || n.data("scale-control"),
            h = void 0 === $(this).data("street-view-control") || n.data("street-view-control"),
            f = void 0 === $(this).data("rotate-control") || n.data("rotate-control"),
            d = void 0 === $(this).data("full-screen-control") || n.data("full-screen-control"),
            _ = void 0 !== $(this).data("disable-default-ui") && n.data("disable-default-ui"),
            v = void 0 !== $(this).data("styles") ? n.data("styles") : [],
            y = void 0 !== $(this).data("streetview") && n.data("streetview"),
            g = void 0 !== $(this).data("pov-heading") ? n.data("pov-heading") : 0,
            m = void 0 !== $(this).data("pov-pitch") ? n.data("pov-pitch") : 0,
            c = _ ? {
               disableDefaultUI: _
            } : {
               zoomControl: l,
               mapTypeControl: u,
               scaleControl: p,
               streetViewControl: h,
               rotateControl: f,
               fullscreenControl: d
            },
            b = {
               zoom: a,
               center: o,
               mapTypeId: google.maps.MapTypeId.ROADMAP,
               styles: v
            },
            b = $.extend(b, c),
            w = new google.maps.Map(n.get(0), b);
         y && (e = new google.maps.StreetViewPanorama(n.get(0), {
            position: o,
            pov: {
               heading: g,
               pitch: m
            }
         }), w.setStreetView(e));
         var C, k = new google.maps.Marker({
            position: o,
            map: w,
            icon: s
         });
         i.length && (C = new google.maps.InfoWindow({
            content: i
         }), google.maps.event.addListener(k, "click", function () {
            C.open(w, k)
         }))
      }))
   }(),
   Carousel = function () {
      var t = $(".owl-carousel");
      t.length && t.each(function (t) {
         ! function (t, e) {
            var n = t.data("carousel-options"),
               r = "carousel_" + e;
            t.hasClass("carousel-nav-pos-edge") && t.after('<div class="container-nav container" id="' + r + '"><div class="owl-nav"></div></div>');
            var o = $.extend({
               margin: 0,
               stagePadding: 0,
               loop:true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
               navText: ['<i class="zmdi zmdi-long-arrow-left"></i>', '<i class="zmdi zmdi-long-arrow-right"></i>']
            }, n);
            t.owlCarousel(o)
         }($(this), t)
      })
   }(),
   Player = function () {
      var t = $(".vimeo"),
         e = $(".youtube");
      t.length && $(".vimeo").vimeo_player(), e.length && $(".youtube").YTPlayer()
   }(),
   Countdown = function () {
      var t = $("[data-countdown]");
      t.length && t.each(function () {
         var e, t;
         e = $(this), t = e.data("countdown"), e.countdown(t, function (t) {
            void 0 !== e.data("countdown-template") ? e.html(t.strftime(e.data("countdown-template"))) : e.html(t.strftime("%D days %H:%M:%S"))
         })
      })
   }(),
   Isotope = function () {
      var r = $(".grid, [data-isotope]"),
         o = $("[data-filter]"),
         t = {
            itemSelector: ".grid-item",
            layoutMode: "packery"
         };
      r.length && ($(this), r.imagesLoaded(function () {
         r.isotope(t)
      }), o.length && o.on({
         click: function () {
            var t, e, n;
            t = $(this), e = {
               filter: t.data("filter")
            }, n = $.extend(e, void 0), r.isotope(n), o.removeClass("active"), t.addClass("active"), r.data("isotope").filteredItems.length ? r.find(".no-grid-result").remove() : r.append('<p class="no-grid-result text-center text-600 py-8">Unfortunately there is no result!</p>')
         }
      }))
   }(),
   Animation = void($("[data-aos]").length && ($(".preloader").length ? Preloader.then(function () {
      setTimeout(function () {
         AOS.init({
            offset: 150,
            delay: 0,
            once: !0
         })
      }, 1e3)
   }, function (t) {}) : AOS.init({
      offset: 150,
      delay: 0,
      once: !0
   })));
//# sourceMappingURL=theme.js.map


$('#top-scrolltop').on('click',function(){
 $('html, body').animate({scrollTop:0},500);
});

$(function ($) {
    "use strict";
    /*Back to top */
	$(".back-to-top").addClass("hidden-top");
		$(window).scroll(function () {
		if ($(this).scrollTop() === 0) {
			$(".back-to-top").addClass("hidden-top")
		} else {
			$(".back-to-top").removeClass("hidden-top")
		}
	});

	$('.back-to-top').click(function () {
		$('body,html').animate({scrollTop:0}, 1200);
		return false;
	});	
});

