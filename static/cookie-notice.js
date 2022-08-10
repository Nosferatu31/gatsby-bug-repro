var cnArgs = {
  nonce: 'e5faedcf20',
  hideEffect: 'fade',
  position: 'bottom',
  onScroll: '0',
  onScrollOffset: '100',
  onClick: '0',
  cookieName: 'cookie_notice_accepted',
  cookieTime: '2592000',
  cookieTimeRejected: '2592000',
  cookiePath: '/',
  cookieDomain: '',
  redirection: '0',
  cache: '1',
  refuse: '0',
  revokeCookies: '0',
  revokeCookiesOpt: 'automatic',
  secure: '1',
  coronabarActive: '0',
}

!(function () {
  function e(e, t) {
    t = t || { bubbles: !1, cancelable: !1, detail: void 0 }
    var n = document.createEvent('CustomEvent')
    return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
  }
  'function' != typeof window.CustomEvent &&
    ((e.prototype = window.Event.prototype), (window.CustomEvent = e))
})(),
  (function () {
    function t(e) {
      return new RegExp('(^| )' + e + '( |$)')
    }
    function e(e, t, n) {
      for (var i = 0; i < e.length; i++) t.call(n, e[i])
    }
    function n(e) {
      this.element = e
    }
    ;(n.prototype = {
      add: function () {
        e(
          arguments,
          function (e) {
            this.contains(e) ||
              (this.element.className +=
                0 < this.element.className.length ? ' ' + e : e)
          },
          this
        )
      },
      remove: function () {
        e(
          arguments,
          function (e) {
            this.element.className = this.element.className.replace(t(e), '')
          },
          this
        )
      },
      toggle: function (e) {
        return this.contains(e) ? (this.remove(e), !1) : (this.add(e), !0)
      },
      contains: function (e) {
        return t(e).test(this.element.className)
      },
      replace: function (e, t) {
        this.remove(e), this.add(t)
      },
    }),
      'classList' in Element.prototype ||
        Object.defineProperty(Element.prototype, 'classList', {
          get: function () {
            return new n(this)
          },
        }),
      window.DOMTokenList &&
        null == DOMTokenList.prototype.replace &&
        (DOMTokenList.prototype.replace = n.prototype.replace)
  })(),
  (function (a, r) {
    var e = new (function () {
      ;(this.cookiesAccepted = null),
        (this.noticeContainer = null),
        (this.setStatus = function (e) {
          var t = this
          '1' === cnArgs.onScroll &&
            a.removeEventListener('scroll', this.handleScroll)
          var n = new Date(),
            i = new Date()
          'accept' === e
            ? ((e = 'true'),
              i.setTime(
                parseInt(n.getTime()) + 1e3 * parseInt(cnArgs.cookieTime)
              ))
            : ((e = 'false'),
              i.setTime(
                parseInt(n.getTime()) +
                  1e3 * parseInt(cnArgs.cookieTimeRejected)
              )),
            (r.cookie =
              cnArgs.cookieName +
              '=' +
              e +
              ';expires=' +
              i.toUTCString() +
              ';' +
              (cnArgs.cookieDomain
                ? 'domain=' + cnArgs.cookieDomain + ';'
                : '') +
              (cnArgs.cookiePath ? 'path=' + cnArgs.cookiePath + ';' : '') +
              ('1' === cnArgs.secure ? 'secure;' : '')),
            (this.cookiesAccepted = 'true' === e)
          var o = new CustomEvent('setCookieNotice', {
            detail: { value: e, time: n, expires: i, data: cnArgs },
          })
          if (
            (r.dispatchEvent(o),
            this.setBodyClass([
              'cookies-set',
              'true' === e ? 'cookies-accepted' : 'cookies-refused',
            ]),
            this.hideCookieNotice(),
            'automatic' === cnArgs.revokeCookiesOpt &&
              (this.noticeContainer.addEventListener(
                'animationend',
                function e() {
                  t.noticeContainer.removeEventListener('animationend', e),
                    t.showRevokeNotice()
                }
              ),
              this.noticeContainer.addEventListener(
                'webkitAnimationEnd',
                function e() {
                  t.noticeContainer.removeEventListener(
                    'webkitAnimationEnd',
                    e
                  ),
                    t.showRevokeNotice()
                }
              )),
            '1' === cnArgs.redirection &&
              (('true' === e && null === this.cookiesAccepted) ||
                (e !== this.cookiesAccepted && null !== this.cookiesAccepted)))
          ) {
            var s = a.location.protocol + '//',
              c = a.location.host + '/' + a.location.pathname
            '1' === cnArgs.cache
              ? ((s =
                  s +
                  c.replace('//', '/') +
                  ('' === a.location.search ? '?' : a.location.search + '&') +
                  'cn-reloaded=1' +
                  a.location.hash),
                (a.location.href = s))
              : ((s =
                  s +
                  c.replace('//', '/') +
                  a.location.search +
                  a.location.hash),
                a.location.reload(!0))
          } else;
        }),
        (this.getStatus = function (e) {
          var t = ('; ' + r.cookie).split('; cookie_notice_accepted=')
          if (2 !== t.length) return null
          var n = t.pop().split(';').shift()
          return e ? 'true' === n : n
        }),
        (this.showCookieNotice = function () {
          var t = this,
            e = new CustomEvent('showCookieNotice', {
              detail: { data: cnArgs },
            })
          r.dispatchEvent(e),
            this.noticeContainer.classList.remove('cookie-notice-hidden'),
            this.noticeContainer.classList.add('cn-animated'),
            this.noticeContainer.classList.add('cookie-notice-visible'),
            this.noticeContainer.addEventListener('animationend', function e() {
              t.noticeContainer.removeEventListener('animationend', e),
                t.noticeContainer.classList.remove('cn-animated')
            }),
            this.noticeContainer.addEventListener(
              'webkitAnimationEnd',
              function e() {
                t.noticeContainer.removeEventListener('webkitAnimationEnd', e),
                  t.noticeContainer.classList.remove('cn-animated')
              }
            )
        }),
        (this.hideCookieNotice = function () {
          var t = this,
            e = new CustomEvent('hideCookieNotice', {
              detail: { data: cnArgs },
            })
          r.dispatchEvent(e),
            this.noticeContainer.classList.add('cn-animated'),
            this.noticeContainer.classList.remove('cookie-notice-visible'),
            this.noticeContainer.addEventListener('animationend', function e() {
              t.noticeContainer.removeEventListener('animationend', e),
                t.noticeContainer.classList.remove('cn-animated'),
                t.noticeContainer.classList.add('cookie-notice-hidden')
            }),
            this.noticeContainer.addEventListener(
              'webkitAnimationEnd',
              function e() {
                t.noticeContainer.removeEventListener('webkitAnimationEnd', e),
                  t.noticeContainer.classList.remove('cn-animated'),
                  t.noticeContainer.classList.add('cookie-notice-hidden')
              }
            )
        }),
        (this.showRevokeNotice = function () {
          var t = this,
            e = new CustomEvent('showRevokeNotice', {
              detail: { data: cnArgs },
            })
          r.dispatchEvent(e),
            this.noticeContainer.classList.remove('cookie-revoke-hidden'),
            this.noticeContainer.classList.add('cn-animated'),
            this.noticeContainer.classList.add('cookie-revoke-visible'),
            this.noticeContainer.addEventListener('animationend', function e() {
              t.noticeContainer.removeEventListener('animationend', e),
                t.noticeContainer.classList.remove('cn-animated')
            }),
            this.noticeContainer.addEventListener(
              'webkitAnimationEnd',
              function e() {
                t.noticeContainer.removeEventListener('webkitAnimationEnd', e),
                  t.noticeContainer.classList.remove('cn-animated')
              }
            )
        }),
        (this.hideRevokeNotice = function () {
          var t = this,
            e = new CustomEvent('hideRevokeNotice', {
              detail: { data: cnArgs },
            })
          r.dispatchEvent(e),
            this.noticeContainer.classList.add('cn-animated'),
            this.noticeContainer.classList.remove('cookie-revoke-visible'),
            this.noticeContainer.addEventListener('animationend', function e() {
              t.noticeContainer.removeEventListener('animationend', e),
                t.noticeContainer.classList.remove('cn-animated'),
                t.noticeContainer.classList.add('cookie-revoke-hidden')
            }),
            this.noticeContainer.addEventListener(
              'webkitAnimationEnd',
              function e() {
                t.noticeContainer.removeEventListener('webkitAnimationEnd', e),
                  t.noticeContainer.classList.remove('cn-animated'),
                  t.noticeContainer.classList.add('cookie-revoke-hidden')
              }
            )
        }),
        (this.setBodyClass = function (e) {
          r.body.classList.remove('cookies-revoke'),
            r.body.classList.remove('cookies-accepted'),
            r.body.classList.remove('cookies-refused'),
            r.body.classList.remove('cookies-set'),
            r.body.classList.remove('cookies-not-set')
          for (var t = 0; t < e.length; t++) r.body.classList.add(e[t])
        }),
        (this.handleScroll = function () {
          ;(a.pageYOffset ||
            (r.documentElement || r.body.parentNode || r.body).scrollTop) >
            parseInt(cnArgs.onScrollOffset) && this.setStatus('accept')
        }),
        (this.adjustOffset = function () {
          var e = r.getElementById('coronabar'),
            t = r.getElementById('wpadminbar'),
            n = 0,
            i = 0
          'top' === cnArgs.position &&
            null !== t &&
            ((i = t.offsetHeight), (this.noticeContainer.style.top = i + 'px')),
            null !== e &&
              ((n = e.offsetHeight - 1),
              'top' === cnArgs.position
                ? ((e.style.top = i + 'px'),
                  (this.noticeContainer.style.top = n + i + 'px'))
                : (this.noticeContainer.style.bottom = n + 'px'))
        }),
        (this.getClosest = function (e, t) {
          for (
            Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.matchesSelector ||
              Element.prototype.mozMatchesSelector ||
              Element.prototype.msMatchesSelector ||
              Element.prototype.oMatchesSelector ||
              Element.prototype.webkitMatchesSelector ||
              function (e) {
                for (
                  var t = (
                      this.document || this.ownerDocument
                    ).querySelectorAll(e),
                    n = t.length;
                  0 <= --n && t.item(n) !== this;

                );
                return -1 < n
              });
            e && e !== r;
            e = e.parentNode
          )
            if (e.matches(t)) return e
          return null
        }),
        (this.init = function () {
          var t = this
          ;(this.cookiesAccepted = this.getStatus(!0)),
            (this.noticeContainer = r.getElementById('cookie-notice'))
          var e = r.getElementsByClassName('cn-set-cookie'),
            n = r.getElementsByClassName('cn-revoke-cookie'),
            i = r.getElementById('cn-close-notice')
          this.noticeContainer.classList.add('cn-effect-' + cnArgs.hideEffect),
            t.adjustOffset(),
            a.addEventListener('resize', function (e) {
              t.adjustOffset()
            }),
            '1' === cnArgs.coronabarActive &&
              (r.addEventListener('display.coronabar', function (e) {
                t.adjustOffset()
              }),
              r.addEventListener('hide.coronabar', function (e) {
                t.adjustOffset()
              }),
              r.addEventListener('saveData.coronabar', function (e) {
                var t = e.detail
                if (null !== t) {
                  var n = new XMLHttpRequest()
                  n.open('POST', cnArgs.ajaxUrl, !0),
                    n.setRequestHeader(
                      'Content-Type',
                      'application/x-www-form-urlencoded;'
                    ),
                    (n.onload = function () {
                      200 <= this.status && this.status
                    }),
                    (n.onerror = function () {}),
                    n.send(
                      'action=cn_save_cases&nonce=' +
                        cnArgs.nonce +
                        '&data=' +
                        JSON.stringify(t)
                    )
                }
              })),
            null === this.cookiesAccepted
              ? ('1' === cnArgs.onScroll &&
                  a.addEventListener('scroll', function (e) {
                    t.handleScroll()
                  }),
                '1' === cnArgs.onClick &&
                  a.addEventListener(
                    'click',
                    function (e) {
                      null === t.getClosest(e.target, '#cookie-notice') &&
                        t.setStatus('accept')
                    },
                    !0
                  ),
                this.setBodyClass(['cookies-not-set']),
                this.showCookieNotice())
              : (this.setBodyClass([
                  'cookies-set',
                  !0 === this.cookiesAccepted
                    ? 'cookies-accepted'
                    : 'cookies-refused',
                ]),
                '1' === cnArgs.revokeCookies &&
                  'automatic' === cnArgs.revokeCookiesOpt &&
                  this.showRevokeNotice())
          for (var o = 0; o < e.length; o++)
            e[o].addEventListener('click', function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                t.setStatus(this.dataset.cookieSet)
            })
          'null' !== i &&
            i.addEventListener('click', function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                t.setStatus(this.dataset.cookieSet)
            })
          for (o = 0; o < n.length; o++)
            n[o].addEventListener('click', function (e) {
              e.preventDefault(),
                t.noticeContainer.classList.contains('cookie-revoke-visible')
                  ? (t.hideRevokeNotice(),
                    t.noticeContainer.addEventListener(
                      'animationend',
                      function e() {
                        t.noticeContainer.removeEventListener(
                          'animationend',
                          e
                        ),
                          t.showCookieNotice()
                      }
                    ),
                    t.noticeContainer.addEventListener(
                      'webkitAnimationEnd',
                      function e() {
                        t.noticeContainer.removeEventListener(
                          'webkitAnimationEnd',
                          e
                        ),
                          t.showCookieNotice()
                      }
                    ))
                  : t.noticeContainer.classList.contains(
                      'cookie-notice-hidden'
                    ) &&
                    t.noticeContainer.classList.contains(
                      'cookie-revoke-hidden'
                    ) &&
                    t.showCookieNotice()
            })
        })
    })()
    a.addEventListener(
      'load',
      function () {
        e.init()
      },
      !1
    )
  })(window, document)
