webpackJsonp([0xd2a57dc1d883],{199:function(e,n,t){"use strict";function o(e,n,t){var o=a.map(function(t){if(t.plugin[e]){var o=t.plugin[e](n,t.options);return o}});return o=o.filter(function(e){return"undefined"!=typeof e}),o.length>0?o:t?[t]:[]}function r(e,n,t){return a.reduce(function(t,o){return o.plugin[e]?t.then(function(){return o.plugin[e](n,o.options)}):t},Promise.resolve())}n.__esModule=!0,n.apiRunner=o,n.apiRunnerAsync=r;var a=[{plugin:t(714),options:{plugins:[],trackingId:"UA-47311644-4"}},{plugin:t(713),options:{plugins:[]}}]},426:function(e,n,t){"use strict";n.components={"component---src-templates-blog-post-js":t(693),"component---src-pages-404-js":t(688),"component---src-pages-features-js":t(689),"component---src-pages-index-js":t(690),"component---src-pages-tag-js":t(691),"component---src-pages-theme-object-js":t(692)},n.json={"layout-index.json":t(695),"activity-search.json":t(698),"events.json":t(699),"feature-requirements.json":t(700),"markdown-for-activity-descriptions.json":t(703),"news-for-v-5.json":t(704),"odd-readings-from-heart-rate-monitors.json":t(705),"power-and-weight.json":t(706),"power-at-altitude.json":t(707),"toggle-m-pref.json":t(710),"weekly-stats.json":t(711),"404.json":t(696),"layout-features.json":t(694),"features.json":t(701),"index.json":t(702),"tag.json":t(708),"theme-object.json":t(709),"404-html.json":t(697)},n.layouts={"layout---index":t(687),"layout---features":t(686)}},427:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function a(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function u(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}n.__esModule=!0;var i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},s=t(1),c=o(s),l=t(3),f=o(l),p=t(273),d=o(p),m=t(144),h=o(m),g=t(199),y=t(817),v=o(y),j=function(e){var n=e.children;return c.default.createElement("div",null,n())},w=function(e){function n(t){r(this,n);var o=a(this,e.call(this)),u=t.location;return d.default.getPage(u.pathname)||(u=i({},u,{pathname:"/404.html"})),o.state={location:u,pageResources:d.default.getResourcesForPathname(u.pathname)},o}return u(n,e),n.prototype.componentWillReceiveProps=function(e){var n=this;if(this.state.location.pathname!==e.location.pathname){var t=d.default.getResourcesForPathname(e.location.pathname);if(t)this.setState({location:e.location,pageResources:t});else{var o=e.location;d.default.getPage(o.pathname)||(o=i({},o,{pathname:"/404.html"})),d.default.getResourcesForPathname(o.pathname,function(e){n.setState({location:o,pageResources:e})})}}},n.prototype.componentDidMount=function(){var e=this;h.default.on("onPostLoadPageResources",function(n){d.default.getPage(e.state.location.pathname)&&n.page.path===d.default.getPage(e.state.location.pathname).path&&e.setState({pageResources:n.pageResources})})},n.prototype.shouldComponentUpdate=function(e,n){return!n.pageResources||(!(this.state.pageResources||!n.pageResources)||(this.state.pageResources.component!==n.pageResources.component||(this.state.pageResources.json!==n.pageResources.json||(!(this.state.location.key===n.location.key||!n.pageResources.page||!n.pageResources.page.matchPath&&!n.pageResources.page.path)||(0,v.default)(this,e,n)))))},n.prototype.render=function(){var e=(0,g.apiRunner)("replaceComponentRenderer",{props:i({},this.props,{pageResources:this.state.pageResources}),loader:p.publicLoader}),n=e[0];return this.props.page?this.state.pageResources?n||(0,s.createElement)(this.state.pageResources.component,i({key:this.props.location.pathname},this.props,this.state.pageResources.json)):null:this.props.layout?n||(0,s.createElement)(this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:j,i({key:this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:"DefaultLayout"},this.props)):null},n}(c.default.Component);w.propTypes={page:f.default.bool,layout:f.default.bool,location:f.default.object},n.default=w,e.exports=n.default},144:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=t(763),a=o(r),u=(0,a.default)();e.exports=u},428:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=t(174),a=t(274),u=o(a),i={};e.exports=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return function(t){var o=decodeURIComponent(t),a=(0,u.default)(o,n);if(a.split("#").length>1&&(a=a.split("#").slice(0,-1).join("")),a.split("?").length>1&&(a=a.split("?").slice(0,-1).join("")),i[a])return i[a];var s=void 0;return e.some(function(e){if(e.matchPath){if((0,r.matchPath)(a,{path:e.path})||(0,r.matchPath)(a,{path:e.matchPath}))return s=e,i[a]=e,!0}else{if((0,r.matchPath)(a,{path:e.path,exact:!0}))return s=e,i[a]=e,!0;if((0,r.matchPath)(a,{path:e.path+"index.html"}))return s=e,i[a]=e,!0}return!1}),s}}},429:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=t(252),a=o(r),u=t(199),i=(0,u.apiRunner)("replaceHistory"),s=i[0],c=s||(0,a.default)();e.exports=c},697:function(e,n,t){t(18),e.exports=function(e){return t.e(0xa2868bfb69fc,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(721)})})}},696:function(e,n,t){t(18),e.exports=function(e){return t.e(0xe70826b53c04,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(722)})})}},698:function(e,n,t){t(18),e.exports=function(e){return t.e(0xc32e0a26ce27,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(723)})})}},699:function(e,n,t){t(18),e.exports=function(e){return t.e(44713349584700,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(724)})})}},700:function(e,n,t){t(18),e.exports=function(e){return t.e(0x9cacec90c6f,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(725)})})}},701:function(e,n,t){t(18),e.exports=function(e){return t.e(56980643304056,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(726)})})}},702:function(e,n,t){t(18),e.exports=function(e){return t.e(0x81b8806e4260,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(727)})})}},694:function(e,n,t){t(18),e.exports=function(e){return t.e(60335399758886,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(255)})})}},695:function(e,n,t){t(18),e.exports=function(e){return t.e(60335399758886,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(256)})})}},703:function(e,n,t){t(18),e.exports=function(e){return t.e(0xa4bf60b47f01,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(728)})})}},704:function(e,n,t){t(18),e.exports=function(e){return t.e(0xdd9f2d3637d4,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(729)})})}},705:function(e,n,t){t(18),e.exports=function(e){return t.e(0xb4f4ecd6383,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(730)})})}},706:function(e,n,t){t(18),e.exports=function(e){return t.e(24780226909333,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(731)})})}},707:function(e,n,t){t(18),e.exports=function(e){return t.e(0x87bd1351ce55,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(732)})})}},708:function(e,n,t){t(18),e.exports=function(e){return t.e(98043277450883,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(733)})})}},709:function(e,n,t){t(18),e.exports=function(e){return t.e(98865243130998,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(734)})})}},710:function(e,n,t){t(18),e.exports=function(e){return t.e(89225878084094,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(735)})})}},711:function(e,n,t){t(18),e.exports=function(e){return t.e(0xdbcf92924524,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(736)})})}},686:function(e,n,t){t(18),e.exports=function(e){return t.e(0xd2cf8b09763b,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(430)})})}},687:function(e,n,t){t(18),e.exports=function(e){return t.e(0x67ef26645b2a,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(431)})})}},273:function(e,n,t){(function(e){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0,n.publicLoader=void 0;var r=t(1),a=(o(r),t(428)),u=o(a),i=t(144),s=o(i),c=t(274),l=o(c),f=void 0,p={},d={},m={},h={},g={},y=[],v=[],j={},w="",x=[],R={},b=function(e){return e&&e.default||e},C=void 0,N=!0,_=[],P={},k={},E=5;C=t(432)({getNextQueuedResources:function(){return x.slice(-1)[0]},createResourceDownload:function(e){T(e,function(){x=x.filter(function(n){return n!==e}),C.onResourcedFinished(e)})}}),s.default.on("onPreLoadPageResources",function(e){C.onPreLoadPageResources(e)}),s.default.on("onPostLoadPageResources",function(e){C.onPostLoadPageResources(e)});var L=function(e,n){return R[e]>R[n]?1:R[e]<R[n]?-1:0},O=function(e,n){return j[e]>j[n]?1:j[e]<j[n]?-1:0},T=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(h[n])e.nextTick(function(){t(null,h[n])});else{var o=void 0;o="component---"===n.slice(0,12)?d.components[n]:"layout---"===n.slice(0,9)?d.layouts[n]:d.json[n],o(function(e,o){h[n]=o,_.push({resource:n,succeeded:!e}),k[n]||(k[n]=e),_=_.slice(-E),t(e,o)})}},S=function(n,t){g[n]?e.nextTick(function(){t(null,g[n])}):k[n]?e.nextTick(function(){t(k[n])}):T(n,function(e,o){if(e)t(e);else{var r=b(o());g[n]=r,t(e,r)}})},A=function(){var e=navigator.onLine;if("boolean"==typeof e)return e;var n=_.find(function(e){return e.succeeded});return!!n},D=function(e,n){console.log(n),P[e]||(P[e]=n),A()&&window.location.pathname.replace(/\/$/g,"")!==e.replace(/\/$/g,"")&&(window.location.pathname=e)},U=1,M={empty:function(){v=[],j={},R={},x=[],y=[],w=""},addPagesArray:function(e){y=e,w="/blog",f=(0,u.default)(e,w)},addDevRequires:function(e){p=e},addProdRequires:function(e){d=e},dequeue:function(){return v.pop()},enqueue:function(e){var n=(0,l.default)(e,w);if(!y.some(function(e){return e.path===n}))return!1;var t=1/U;U+=1,j[n]?j[n]+=1:j[n]=1,M.has(n)||v.unshift(n),v.sort(O);var o=f(n);return o.jsonName&&(R[o.jsonName]?R[o.jsonName]+=1+t:R[o.jsonName]=1+t,x.indexOf(o.jsonName)!==-1||h[o.jsonName]||x.unshift(o.jsonName)),o.componentChunkName&&(R[o.componentChunkName]?R[o.componentChunkName]+=1+t:R[o.componentChunkName]=1+t,x.indexOf(o.componentChunkName)!==-1||h[o.jsonName]||x.unshift(o.componentChunkName)),x.sort(L),C.onNewResourcesAdded(),!0},getResources:function(){return{resourcesArray:x,resourcesCount:R}},getPages:function(){return{pathArray:v,pathCount:j}},getPage:function(e){return f(e)},has:function(e){return v.some(function(n){return n===e})},getResourcesForPathname:function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};N&&navigator&&navigator.serviceWorker&&navigator.serviceWorker.controller&&"activated"===navigator.serviceWorker.controller.state&&(f(n)||navigator.serviceWorker.getRegistrations().then(function(e){if(e.length){for(var n=e,t=Array.isArray(n),o=0,n=t?n:n[Symbol.iterator]();;){var r;if(t){if(o>=n.length)break;r=n[o++]}else{if(o=n.next(),o.done)break;r=o.value}var a=r;a.unregister()}window.location.reload()}})),N=!1;if(P[n])return D(n,'Previously detected load failure for "'+n+'"'),t();var o=f(n);if(!o)return D(n,"A page wasn't found for \""+n+'"'),t();if(n=o.path,m[n])return e.nextTick(function(){t(m[n]),s.default.emit("onPostLoadPageResources",{page:o,pageResources:m[n]})}),m[n];s.default.emit("onPreLoadPageResources",{path:n});var r=void 0,a=void 0,u=void 0,i=function(){if(r&&a&&(!o.layoutComponentChunkName||u)){m[n]={component:r,json:a,layout:u,page:o};var e={component:r,json:a,layout:u,page:o};t(e),s.default.emit("onPostLoadPageResources",{page:o,pageResources:e})}};return S(o.componentChunkName,function(e,n){e&&D(o.path,"Loading the component for "+o.path+" failed"),r=n,i()}),S(o.jsonName,function(e,n){e&&D(o.path,"Loading the JSON for "+o.path+" failed"),a=n,i()}),void(o.layoutComponentChunkName&&S(o.layout,function(e,n){e&&D(o.path,"Loading the Layout for "+o.path+" failed"),u=n,i()}))},peek:function(e){return v.slice(-1)[0]},length:function(){return v.length},indexOf:function(e){return v.length-v.indexOf(e)-1}};n.publicLoader={getResourcesForPathname:M.getResourcesForPathname};n.default=M}).call(n,t(368))},737:function(e,n){e.exports=[{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"activity-search.json",path:"/activity-search/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"events.json",path:"/events/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"feature-requirements.json",path:"/feature-requirements/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"markdown-for-activity-descriptions.json",path:"/markdown-for-activity-descriptions/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"news-for-v-5.json",path:"/news-for-v5/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"odd-readings-from-heart-rate-monitors.json",path:"/odd-readings-from-heart-rate-monitors/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"power-and-weight.json",path:"/power-and-weight/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"power-at-altitude.json",path:"/power-at-altitude/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"toggle-m-pref.json",path:"/toggle-m-pref/"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"weekly-stats.json",path:"/weekly-stats/"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404.json",path:"/404/"},{componentChunkName:"component---src-pages-features-js",layout:"layout---features",layoutComponentChunkName:"component---src-layouts-features-js",jsonName:"features.json",path:"/features/"},{componentChunkName:"component---src-pages-index-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"index.json",path:"/"},{componentChunkName:"component---src-pages-tag-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"tag.json",path:"/tag/"},{componentChunkName:"component---src-pages-theme-object-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"theme-object.json",path:"/theme-object/"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404-html.json",path:"/404.html"}]},432:function(e,n){"use strict";e.exports=function(e){var n=e.getNextQueuedResources,t=e.createResourceDownload,o=[],r=[],a=function(){var e=n();e&&(r.push(e),t(e))},u=function(e){switch(e.type){case"RESOURCE_FINISHED":r=r.filter(function(n){return n!==e.payload});break;case"ON_PRE_LOAD_PAGE_RESOURCES":o.push(e.payload.path);break;case"ON_POST_LOAD_PAGE_RESOURCES":o=o.filter(function(n){return n!==e.payload.page.path});break;case"ON_NEW_RESOURCES_ADDED":}setTimeout(function(){0===r.length&&0===o.length&&a()},0)};return{onResourcedFinished:function(e){u({type:"RESOURCE_FINISHED",payload:e})},onPreLoadPageResources:function(e){u({type:"ON_PRE_LOAD_PAGE_RESOURCES",payload:e})},onPostLoadPageResources:function(e){u({type:"ON_POST_LOAD_PAGE_RESOURCES",payload:e})},onNewResourcesAdded:function(){u({type:"ON_NEW_RESOURCES_ADDED"})},getState:function(){return{pagesLoading:o,resourcesDownloading:r}},empty:function(){o=[],r=[]}}}},0:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},a=t(199),u=t(1),i=o(u),s=t(22),c=o(s),l=t(174),f=t(718),p=t(678),d=o(p),m=t(254),h=t(429),g=o(h),y=t(144),v=o(y),j=t(737),w=o(j),x=t(738),R=o(x),b=t(427),C=o(b),N=t(426),_=o(N),P=t(273),k=o(P);t(478),window.___history=g.default,window.___emitter=v.default,k.default.addPagesArray(w.default),k.default.addProdRequires(_.default),window.asyncRequires=_.default,window.___loader=k.default,window.matchPath=l.matchPath;var E=R.default.reduce(function(e,n){return e[n.fromPath]=n,e},{}),L=function(e){var n=E[e];return null!=n&&(g.default.replace(n.toPath),!0)};L(window.location.pathname),(0,a.apiRunnerAsync)("onClientEntry").then(function(){function e(e){window.___history&&s!==!1||(window.___history=e,s=!0,e.listen(function(e,n){L(e.pathname)||setTimeout(function(){(0,a.apiRunner)("onRouteUpdate",{location:e,action:n})},0)}))}function n(e,n){var t=n.location.pathname,o=(0,a.apiRunner)("shouldUpdateScroll",{prevRouterProps:e,pathname:t});if(o.length>0)return o[0];if(e){var r=e.location.pathname;if(r===t)return!1}return!0}(0,a.apiRunner)("registerServiceWorker").length>0&&t(433);var o=function(e){function n(e){e.page.path===k.default.getPage(o).path&&(v.default.off("onPostLoadPageResources",n),clearTimeout(u),window.___history.push(t))}var t=(0,m.createLocation)(e,null,null,g.default.location),o=t.pathname,r=E[o];r&&(o=r.toPath);var a=window.location;if(a.pathname!==t.pathname||a.search!==t.search||a.hash!==t.hash){var u=setTimeout(function(){v.default.off("onPostLoadPageResources",n),v.default.emit("onDelayedLoadPageResources",{pathname:o}),window.___history.push(t)},1e3);k.default.getResourcesForPathname(o)?(clearTimeout(u),window.___history.push(t)):v.default.on("onPostLoadPageResources",n)}};window.___navigateTo=o,(0,a.apiRunner)("onRouteUpdate",{location:g.default.location,action:g.default.action});var s=!1,p=(0,a.apiRunner)("replaceRouterComponent",{history:g.default})[0],h=function(e){var n=e.children;return i.default.createElement(l.Router,{history:g.default},n)},y=(0,l.withRouter)(C.default);k.default.getResourcesForPathname(window.location.pathname,function(){var t=function(){return(0,u.createElement)(p?p:h,null,(0,u.createElement)(f.ScrollContext,{shouldUpdateScroll:n},(0,u.createElement)(y,{layout:!0,children:function(n){return(0,u.createElement)(l.Route,{render:function(t){e(t.history);var o=n?n:t;return k.default.getPage(o.location.pathname)?(0,u.createElement)(C.default,r({page:!0},o)):(0,u.createElement)(C.default,{page:!0,location:{pathname:"/404.html"}})}})}})))},o=(0,a.apiRunner)("wrapRootComponent",{Root:t},t)[0],s=(0,a.apiRunner)("replaceHydrateFunction",void 0,c.default.render)[0];(0,d.default)(function(){return s(i.default.createElement(o,null),"undefined"!=typeof window?document.getElementById("___gatsby"):void 0,function(){(0,a.apiRunner)("onInitialClientRender")})})})})},738:function(e,n){e.exports=[]},433:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=t(144),a=o(r),u="/";u="/blog/","serviceWorker"in navigator&&navigator.serviceWorker.register(u+"sw.js").then(function(e){e.addEventListener("updatefound",function(){var n=e.installing;console.log("installingWorker",n),n.addEventListener("statechange",function(){switch(n.state){case"installed":navigator.serviceWorker.controller?window.location.reload():(console.log("Content is now available offline!"),a.default.emit("sw:installed"));break;case"redundant":console.error("The installing service worker became redundant.")}})})}).catch(function(e){console.error("Error during service worker registration:",e)})},274:function(e,n){"use strict";n.__esModule=!0,n.default=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return e.substr(0,n.length)===n?e.slice(n.length):e},e.exports=n.default},678:function(e,n,t){!function(n,t){e.exports=t()}("domready",function(){var e,n=[],t=document,o=t.documentElement.doScroll,r="DOMContentLoaded",a=(o?/^loaded|^c/:/^loaded|^i|^c/).test(t.readyState);return a||t.addEventListener(r,e=function(){for(t.removeEventListener(r,e),a=1;e=n.shift();)e()}),function(e){a?setTimeout(e,0):n.push(e)}})},18:function(e,n,t){"use strict";function o(){function e(e){var n=o.lastChild;return"SCRIPT"!==n.tagName?void("undefined"!=typeof console&&console.warn&&console.warn("Script is not a script",n)):void(n.onload=n.onerror=function(){n.onload=n.onerror=null,setTimeout(e,0)})}var n,o=document.querySelector("head"),r=t.e,a=t.s;t.e=function(o,u){var i=!1,s=!0,c=function(e){u&&(u(t,e),u=null)};return!a&&n&&n[o]?void c(!0):(r(o,function(){i||(i=!0,s?setTimeout(function(){c()}):c())}),void(i||(s=!1,e(function(){i||(i=!0,a?a[o]=void 0:(n||(n={}),n[o]=!0),c(!0))}))))}}o()},712:function(e,n,t){"use strict";var o=t(37);e.exports=function(e,n){e.addEventListener("click",function(e){if(0!==e.button||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.defaultPrevented)return!0;for(var t=null,r=e.target;r.parentNode;r=r.parentNode)if("A"===r.nodeName){t=r;break}if(!t)return!0;if(t.target&&"_self"!==t.target.toLowerCase())return!0;if(t.pathname===window.location.pathname&&""!==t.hash)return!0;if(""===t.pathname)return!0;if(t.pathname.search(/^.*\.((?!htm)[a-z0-9]{1,5})$/i)!==-1)return!0;var a=document.createElement("a");a.href=t.href;var u=document.createElement("a");if(u.href=window.location.href,a.host!==u.host)return!0;var i=new RegExp("^"+u.host+(0,o.withPrefix)("/"));return!i.test(""+a.host+a.pathname)||(e.preventDefault(),n(t.getAttribute("href")),!1)})}},713:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=t(37),a=t(712),u=o(a);n.onClientEntry=function(){(0,u.default)(window,function(e){(0,r.navigateTo)(e)})}},714:function(e,n,t){"use strict";n.onRouteUpdate=function(e){var n=e.location;if("function"==typeof ga){if(n&&"undefined"!=typeof window.excludeGAPaths&&window.excludeGAPaths.some(function(e){return e.test(n.pathname)}))return;window.ga("set","page",n?n.pathname+n.search+n.hash:void 0),window.ga("send","pageview")}}},763:function(e,n){function t(e){return e=e||Object.create(null),{on:function(n,t){(e[n]||(e[n]=[])).push(t)},off:function(n,t){e[n]&&e[n].splice(e[n].indexOf(t)>>>0,1)},emit:function(n,t){(e[n]||[]).slice().map(function(e){e(t)}),(e["*"]||[]).slice().map(function(e){e(n,t)})}}}e.exports=t},368:function(e,n){function t(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(e){if(l===setTimeout)return setTimeout(e,0);if((l===t||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(n){try{return l.call(null,e,0)}catch(n){return l.call(this,e,0)}}}function a(e){if(f===clearTimeout)return clearTimeout(e);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(n){try{return f.call(null,e)}catch(n){return f.call(this,e)}}}function u(){h&&d&&(h=!1,d.length?m=d.concat(m):g=-1,m.length&&i())}function i(){if(!h){var e=r(u);h=!0;for(var n=m.length;n;){for(d=m,m=[];++g<n;)d&&d[g].run();g=-1,n=m.length}d=null,h=!1,a(e)}}function s(e,n){this.fun=e,this.array=n}function c(){}var l,f,p=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:t}catch(e){l=t}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(e){f=o}}();var d,m=[],h=!1,g=-1;p.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];m.push(new s(e,n)),1!==m.length||h||r(i)},s.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.prependListener=c,p.prependOnceListener=c,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},817:function(e,n){"use strict";function t(e,n){for(var t in e)if(!(t in n))return!0;for(var o in n)if(e[o]!==n[o])return!0;return!1}n.__esModule=!0,n.default=function(e,n,o){return t(e.props,n)||t(e.state,o)},e.exports=n.default},688:function(e,n,t){t(18),e.exports=function(e){return t.e(0x9427c64ab85d,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(460)})})}},689:function(e,n,t){t(18),e.exports=function(e){return t.e(72138227098318,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(461)})})}},690:function(e,n,t){t(18),e.exports=function(e){return t.e(35783957827783,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(462)})})}},691:function(e,n,t){t(18),e.exports=function(e){return t.e(78997501137040,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(463)})})}},692:function(e,n,t){t(18),e.exports=function(e){return t.e(0xa225f1dc95e3,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(464)})})}},693:function(e,n,t){t(18),e.exports=function(e){return t.e(0x620f737b6699,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(465)})})}}});
//# sourceMappingURL=app-b00c3ee5d9cf8a155c7f.js.map