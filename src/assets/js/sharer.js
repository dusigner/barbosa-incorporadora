(function (m, r) {
	"use strict";
	var s = function (t) {
		this.elem = t;
	};
	s.init = function () {
		var t = r.querySelectorAll("[data-sharer]"),
			e,
			a = t.length;
		for (e = 0; e < a; e++) {
			t[e].addEventListener("click", s.add);
		}
	};
	s.add = function (t) {
		var e = t.currentTarget || t.srcElement;
		var a = new s(e);
		a.share();
	};
	s.prototype = {
		constructor: s,
		getValue: function (t) {
			var e = this.elem.getAttribute("data-" + t);
			if (e && t === "hashtag") {
				if (!e.startsWith("#")) {
					e = "#" + e;
				}
			}
			return e === null ? "" : e;
		},
		share: function () {
			var t = this.getValue("sharer").toLowerCase(),
				e = {
					facebook: {
						shareUrl: "https://www.facebook.com/sharer/sharer.php",
						params: {
							u: this.getValue("url"),
							hashtag: this.getValue("hashtag"),
							quote: this.getValue("quote"),
						},
					},
					linkedin: {
						shareUrl: "https://www.linkedin.com/shareArticle",
						params: { url: this.getValue("url"), mini: true },
					},
					twitter: {
						shareUrl: "https://twitter.com/intent/tweet/",
						params: {
							text: this.getValue("title"),
							url: this.getValue("url"),
							hashtags: this.getValue("hashtags"),
							via: this.getValue("via"),
						},
					},
					email: {
						shareUrl: "mailto:" + this.getValue("to"),
						params: {
							subject: this.getValue("subject"),
							body: this.getValue("title") + "\n" + this.getValue("url"),
						},
					},
					whatsapp: {
						shareUrl:
							this.getValue("web") === "true"
								? "https://web.whatsapp.com/send"
								: "https://wa.me/",
						params: {
							phone: this.getValue("to"),
							text: this.getValue("title") + " " + this.getValue("url"),
						},
					},
					telegram: {
						shareUrl: "https://t.me/share",
						params: { text: this.getValue("title"), url: this.getValue("url") },
					},
					viber: {
						shareUrl: "viber://forward",
						params: {
							text: this.getValue("title") + " " + this.getValue("url"),
						},
					},
					line: {
						shareUrl:
							"http://line.me/R/msg/text/?" +
							encodeURIComponent(
								this.getValue("title") + " " + this.getValue("url")
							),
					},
					pinterest: {
						shareUrl: "https://www.pinterest.com/pin/create/button/",
						params: {
							url: this.getValue("url"),
							media: this.getValue("image"),
							description: this.getValue("description"),
						},
					},
					tumblr: {
						shareUrl: "http://tumblr.com/widgets/share/tool",
						params: {
							canonicalUrl: this.getValue("url"),
							content: this.getValue("url"),
							posttype: "link",
							title: this.getValue("title"),
							caption: this.getValue("caption"),
							tags: this.getValue("tags"),
						},
					},
					hackernews: {
						shareUrl: "https://news.ycombinator.com/submitlink",
						params: { u: this.getValue("url"), t: this.getValue("title") },
					},
					reddit: {
						shareUrl: "https://www.reddit.com/submit",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
						},
					},
					vk: {
						shareUrl: "http://vk.com/share.php",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
							description: this.getValue("caption"),
							image: this.getValue("image"),
						},
					},
					xing: {
						shareUrl: "https://www.xing.com/social/share/spi",
						params: { url: this.getValue("url") },
					},
					buffer: {
						shareUrl: "https://buffer.com/add",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
							via: this.getValue("via"),
							picture: this.getValue("picture"),
						},
					},
					instapaper: {
						shareUrl: "http://www.instapaper.com/edit",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
							description: this.getValue("description"),
						},
					},
					pocket: {
						shareUrl: "https://getpocket.com/save",
						params: { url: this.getValue("url") },
					},
					mashable: {
						shareUrl: "https://mashable.com/submit",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
						},
					},
					mix: {
						shareUrl: "https://mix.com/add",
						params: { url: this.getValue("url") },
					},
					flipboard: {
						shareUrl: "https://share.flipboard.com/bookmarklet/popout",
						params: {
							v: 2,
							title: this.getValue("title"),
							url: this.getValue("url"),
							t: Date.now(),
						},
					},
					weibo: {
						shareUrl: "http://service.weibo.com/share/share.php",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
							pic: this.getValue("image"),
							appkey: this.getValue("appkey"),
							ralateUid: this.getValue("ralateuid"),
							language: "zh_cn",
						},
					},
					blogger: {
						shareUrl: "https://www.blogger.com/blog-this.g",
						params: {
							u: this.getValue("url"),
							n: this.getValue("title"),
							t: this.getValue("description"),
						},
					},
					baidu: {
						shareUrl: "http://cang.baidu.com/do/add",
						params: { it: this.getValue("title"), iu: this.getValue("url") },
					},
					douban: {
						shareUrl: "https://www.douban.com/share/service",
						params: {
							name: this.getValue("name"),
							href: this.getValue("url"),
							image: this.getValue("image"),
							comment: this.getValue("description"),
						},
					},
					okru: {
						shareUrl: "https://connect.ok.ru/dk",
						params: {
							"st.cmd": "WidgetSharePreview",
							"st.shareUrl": this.getValue("url"),
							title: this.getValue("title"),
						},
					},
					mailru: {
						shareUrl: "http://connect.mail.ru/share",
						params: {
							share_url: this.getValue("url"),
							linkname: this.getValue("title"),
							linknote: this.getValue("description"),
							type: "page",
						},
					},
					evernote: {
						shareUrl: "https://www.evernote.com/clip.action",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
						},
					},
					skype: {
						shareUrl: "https://web.skype.com/share",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
						},
					},
					delicious: {
						shareUrl: "https://del.icio.us/post",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
						},
					},
					sms: { shareUrl: "sms://", params: { body: this.getValue("body") } },
					trello: {
						shareUrl: "https://trello.com/add-card",
						params: {
							url: this.getValue("url"),
							name: this.getValue("title"),
							desc: this.getValue("description"),
							mode: "popup",
						},
					},
					messenger: {
						shareUrl: "fb-messenger://share",
						params: { link: this.getValue("url") },
					},
					odnoklassniki: {
						shareUrl: "https://connect.ok.ru/dk",
						params: {
							st: {
								cmd: "WidgetSharePreview",
								deprecated: 1,
								shareUrl: this.getValue("url"),
							},
						},
					},
					meneame: {
						shareUrl: "https://www.meneame.net/submit",
						params: { url: this.getValue("url") },
					},
					diaspora: {
						shareUrl: "https://share.diasporafoundation.org",
						params: {
							title: this.getValue("title"),
							url: this.getValue("url"),
						},
					},
					googlebookmarks: {
						shareUrl: "https://www.google.com/bookmarks/mark",
						params: {
							op: "edit",
							bkmk: this.getValue("url"),
							title: this.getValue("title"),
						},
					},
					qzone: {
						shareUrl:
							"https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
						params: { url: this.getValue("url") },
					},
					refind: {
						shareUrl: "https://refind.com",
						params: { url: this.getValue("url") },
					},
					surfingbird: {
						shareUrl: "https://surfingbird.ru/share",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
							description: this.getValue("description"),
						},
					},
					yahoomail: {
						shareUrl: "http://compose.mail.yahoo.com",
						params: {
							to: this.getValue("to"),
							subject: this.getValue("subject"),
							body: this.getValue("body"),
						},
					},
					wordpress: {
						shareUrl: "https://wordpress.com/wp-admin/press-this.php",
						params: {
							u: this.getValue("url"),
							t: this.getValue("title"),
							s: this.getValue("title"),
						},
					},
					amazon: {
						shareUrl: "https://www.amazon.com/gp/wishlist/static-add",
						params: { u: this.getValue("url"), t: this.getValue("title") },
					},
					pinboard: {
						shareUrl: "https://pinboard.in/add",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
							description: this.getValue("description"),
						},
					},
					threema: {
						shareUrl: "threema://compose",
						params: { text: this.getValue("text"), id: this.getValue("id") },
					},
					kakaostory: {
						shareUrl: "https://story.kakao.com/share",
						params: { url: this.getValue("url") },
					},
					yummly: {
						shareUrl: "http://www.yummly.com/urb/verify",
						params: {
							url: this.getValue("url"),
							title: this.getValue("title"),
							yumtype: "button",
						},
					},
				},
				a = e[t];
			if (a) {
				a.width = this.getValue("width");
				a.height = this.getValue("height");
			}
			return a !== undefined ? this.urlSharer(a) : false;
		},
		urlSharer: function (t) {
			var e = t.params || {},
				a = Object.keys(e),
				r,
				s = a.length > 0 ? "?" : "";
			for (r = 0; r < a.length; r++) {
				if (s !== "?") {
					s += "&";
				}
				if (e[a[r]]) {
					s += a[r] + "=" + encodeURIComponent(e[a[r]]);
				}
			}
			t.shareUrl += s;
			var l = this.getValue("link") === "true";
			var i = this.getValue("blank") === "true";
			if (l) {
				if (i) {
					m.open(t.shareUrl, "_blank");
				} else {
					m.location.href = t.shareUrl;
				}
			} else {
				console.log(t.shareUrl);
				var h = t.width || 600,
					u = t.height || 480,
					o = m.innerWidth / 2 - h / 2 + m.screenX,
					p = m.innerHeight / 2 - u / 2 + m.screenY,
					g =
						"scrollbars=no, width=" +
						h +
						", height=" +
						u +
						", top=" +
						p +
						", left=" +
						o,
					n = m.open(t.shareUrl, "", g);
				if (m.focus) {
					n.focus();
				}
			}
		},
	};
	if (r.readyState === "complete" || r.readyState !== "loading") {
		s.init();
	} else {
		r.addEventListener("DOMContentLoaded", s.init);
	}
	m.Sharer = s;
})(window, document);
