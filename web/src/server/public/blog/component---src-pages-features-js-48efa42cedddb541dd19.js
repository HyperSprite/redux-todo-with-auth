webpackJsonp([72138227098318],{636:function(e,t){function n(e){var t=e.target||e.srcElement;t.__resizeRAF__&&i(t.__resizeRAF__),t.__resizeRAF__=r(function(){var n=t.__resizeTrigger__;n.__resizeListeners__.forEach(function(t){t.call(n,e)})})}var r=function(){var e=this,t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){return e.setTimeout(t,20)};return function(e){return t(e)}}(),i=function(){var e=this,t=e.cancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelAnimationFrame||e.clearTimeout;return function(e){return t(e)}}(),t=function(e,t){function r(){this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__,this.contentDocument.defaultView.addEventListener("resize",n)}var i,o=this,a=o.document,u=a.attachEvent;if("undefined"!=typeof navigator&&(i=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)),!e.__resizeListeners__)if(e.__resizeListeners__=[],u)e.__resizeTrigger__=e,e.attachEvent("onresize",n);else{"static"===getComputedStyle(e).position&&(e.style.position="relative");var s=e.__resizeTrigger__=a.createElement("object");s.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;"),s.setAttribute("class","resize-sensor"),s.__resizeElement__=e,s.onload=r,s.type="text/html",i&&e.appendChild(s),s.data="about:blank",i||e.appendChild(s)}e.__resizeListeners__.push(t)};e.exports="undefined"==typeof window?t:t.bind(window),e.exports.unbind=function(e,t){var r=document.attachEvent;t?e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1):e.__resizeListeners__=[],e.__resizeListeners__.length||(r?e.detachEvent("onresize",n):(e.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize",n),delete e.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__,e.__resizeTrigger__=!e.removeChild(e.__resizeTrigger__)),delete e.__resizeListeners__)}},789:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){return e.clientWidth}function u(e){return e.clientHeight}var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),f=n(636),d={width:"100%",height:"100%",padding:0,border:0};e.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getHeight,n=void 0===t?u:t,p=e.getWidth,_=void 0===p?a:p,h=e.containerStyle,m=void 0===h?d:h,g=e.className,y=void 0===g?null:g,v=e.elementResize,b=void 0!==v&&v;return function(e){return function(t){function a(){var e,t,o,u;r(this,a);for(var s=arguments.length,c=Array(s),l=0;l<s;l++)c[l]=arguments[l];return t=o=i(this,(e=a.__proto__||Object.getPrototypeOf(a)).call.apply(e,[this].concat(c))),o.state={},o.updateDimensions=function(){var e=o.refs.container,t=_(e),r=n(e);t===o.state.containerWidth&&r===o.state.containerHeight||o.setState({containerWidth:t,containerHeight:r})},o.onResize=function(){o.rqf||(o.rqf=o.getWindow().requestAnimationFrame(function(){o.rqf=null,o.updateDimensions()}))},u=t,i(o,u)}return o(a,t),c(a,[{key:"getWindow",value:function(){return this.refs.container?this.refs.container.ownerDocument.defaultView||window:window}},{key:"componentDidMount",value:function(){if(!this.refs.container)throw new Error("Cannot find container div");this.updateDimensions(),b?f(this.refs.container,this.updateDimensions):this.getWindow().addEventListener("resize",this.onResize,!1)}},{key:"componentWillUnmount",value:function(){this.getWindow().removeEventListener("resize",this.onResize)}},{key:"getWrappedInstance",value:function(){this.refs.wrappedInstance}},{key:"render",value:function(){var t=this.state,n=t.containerWidth,r=t.containerHeight;return n||r||console.warn("Wrapper div has no height or width, try overriding style with `containerStyle` option"),l.createElement("div",{className:y,style:m,ref:"container"},(n||r)&&l.createElement(e,s({},this.state,this.props,{updateDimensions:this.updateDimensions,ref:"wrappedInstance"})))}}]),a}(l.Component)}}},396:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var u=n(1),s=r(u),c=n(2),l=r(c),f=n(789),d=r(f),p=function(e){function t(){return i(this,t),o(this,e.apply(this,arguments))}return a(t,e),t.prototype.render=function(){var e=this.props.containerWidth<769?"url('"+this.props.backgroundImageNarrow+"')":"url('"+this.props.backgroundImageWide+"')";return s.default.createElement("div",{style:{backgroundImage:e,backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"bottom center",height:this.props.height}},this.props.children)},t}(s.default.Component);p.propTypes={backgroundImageNarrow:l.default.string,backgroundImageWide:l.default.string,children:l.default.node,containerWidth:l.default.number.isRequired,height:l.default.oneOfType([l.default.string,l.default.number])},p.defaultProps={backgroundImageNarrow:"",backgroundImageWide:"",children:null,height:"80vh"},t.default=(0,d.default)()(p),e.exports=t.default},397:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var i=n(396);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(i).default}}),e.exports=t.default},147:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var i=n(148);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(i).default}}),e.exports=t.default},148:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var i=n(1),o=r(i),a=n(2),u=(r(a),n(21)),s=n(45),c=r(s),l=n(58),f=r(l);n(198);var d={},p=function(e){return{root:{padding:16,color:e.palette.primary.dark},titleMain:{color:e.palette.primary.dark},bodyMain:{}}},_=function(e){var t=e.classes,n=e.html,r=(e.path,e.title),i=e.tags;return o.default.createElement("div",{className:t.root},o.default.createElement(c.default,{variant:"title",className:t.titleMain,gutterBottom:!0},r),o.default.createElement("div",{className:t.bodyMain,dangerouslySetInnerHTML:{__html:n}}),o.default.createElement(f.default,{tags:i,navClick:!0}))};_.propTypes=d,t.default=(0,u.withStyles)(p,{name:"StyledPostFull"})(_),e.exports=t.default},198:function(e,t){},414:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var u=n(1),s=r(u),c=n(21),l=n(107),f=r(l),d=n(108),p=r(d),_=n(147),h=r(_),m=n(397),g=(r(m),function(e){return{root:{}}}),y=function(e){function t(){return i(this,t),o(this,e.apply(this,arguments))}return a(t,e),t.prototype.getPostList=function(){var e=this.props.data.allMarkdownRemark.edges.filter(function(e){return e.node.frontmatter.features}).map(function(e){return{excerpt:e.node.excerpt,html:e.node.html,slug:e.node.fields.slug,path:e.node.frontmatter.path,title:e.node.frontmatter.title,date:e.node.frontmatter.date,cover:e.node.frontmatter.cover?e.node.frontmatter.cover.childImageSharp.responsiveResolution.src:null}});return e},t.prototype.render=function(){var e=this.getPostList();return s.default.createElement("div",null,s.default.createElement(f.default,null,e.map(function(e){return s.default.createElement(p.default,{key:e.path,page:e,PostType:h.default})})))},t}(s.default.Component);t.default=(0,c.withStyles)(g,{name:"StyledFeatures"})(y);t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-features-js-48efa42cedddb541dd19.js.map