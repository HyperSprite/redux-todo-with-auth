webpackJsonp([72138227098318],{661:function(e,t){function n(e){var t=e.target||e.srcElement;t.__resizeRAF__&&a(t.__resizeRAF__),t.__resizeRAF__=r(function(){var n=t.__resizeTrigger__;n.__resizeListeners__.forEach(function(t){t.call(n,e)})})}var r=function(){var e=this,t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){return e.setTimeout(t,20)};return function(e){return t(e)}}(),a=function(){var e=this,t=e.cancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelAnimationFrame||e.clearTimeout;return function(e){return t(e)}}(),t=function(e,t){function r(){this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__,this.contentDocument.defaultView.addEventListener("resize",n)}var a,i=this,o=i.document,s=o.attachEvent;if("undefined"!=typeof navigator&&(a=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)),!e.__resizeListeners__)if(e.__resizeListeners__=[],s)e.__resizeTrigger__=e,e.attachEvent("onresize",n);else{"static"===getComputedStyle(e).position&&(e.style.position="relative");var l=e.__resizeTrigger__=o.createElement("object");l.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;"),l.setAttribute("class","resize-sensor"),l.__resizeElement__=e,l.onload=r,l.type="text/html",a&&e.appendChild(l),l.data="about:blank",a||e.appendChild(l)}e.__resizeListeners__.push(t)};e.exports="undefined"==typeof window?t:t.bind(window),e.exports.unbind=function(e,t){var r=document.attachEvent;t?e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1):e.__resizeListeners__=[],e.__resizeListeners__.length||(r?e.detachEvent("onresize",n):(e.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize",n),delete e.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__,e.__resizeTrigger__=!e.removeChild(e.__resizeTrigger__)),delete e.__resizeListeners__)}},94:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(){return"undefined"==typeof x&&"undefined"!=typeof window&&window.IntersectionObserver&&(x=new window.IntersectionObserver(function(e){e.forEach(function(e){E.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(x.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),x}t.__esModule=!0;var i=n(8),o=r(i),s=n(10),l=r(s),u=n(9),d=r(u),c=n(5),f=r(c),p=n(4),m=r(p),h=n(1),g=r(h),y=n(2),b=r(y),v=function(e){var t=(0,m.default)({},e);return t.responsiveResolution&&(t.resolutions=t.responsiveResolution,delete t.responsiveResolution),t.responsiveSizes&&(t.sizes=t.responsiveSizes,delete t.responsiveSizes),t},_={},w=function(e){var t=v(e),n=t.sizes?t.sizes.src:t.resolutions.src;return!!_[n]||(_[n]=!0,!1)},x=void 0,E=[],k=function(e,t){a().observe(e),E.push([e,t])},S=null,z=function(){if(null!==S)return S;var e="undefined"!=typeof window?window.document.createElement("canvas"):{};return S=!(!e.getContext||!e.getContext("2d"))&&0===e.toDataURL("image/webp").indexOf("data:image/webp")},C=function(e){var t=e.opacity,n=void 0===t?"1":t,r=e.src,a=e.srcSet,i=e.sizes,o=void 0===i?"":i,s=e.title,l=void 0===s?"":s,u=e.alt,d=void 0===u?"":u,c=e.width,f=void 0===c?"":c,p=e.height,m=void 0===p?"":p,h=e.transitionDelay,g=void 0===h?"0.5s":h;return'<img width="'+f+'" height="'+m+'" src="'+r+'" srcset="'+a+'" alt="'+d+'" title="'+l+'" sizes="'+o+'" style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+g+";opacity:"+n+';width:100%;height:100%;object-fit:cover;object-position:center"/>'},O=function(e){var t=e.style,n=e.onLoad,r=(0,f.default)(e,["style","onLoad"]);return g.default.createElement("img",(0,m.default)({},r,{onLoad:n,style:(0,m.default)({position:"absolute",top:0,left:0,transition:"opacity 0.5s",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},t)}))};O.propTypes={style:b.default.object,onLoad:b.default.func};var j=function(e){function t(n){(0,o.default)(this,t);var r=(0,l.default)(this,e.call(this,n)),a=!0,i=!0,s=!1,u=w(n);return!u&&"undefined"!=typeof window&&window.IntersectionObserver&&(a=!1,i=!1,s=!0),"undefined"==typeof window&&(a=!1,i=!1),r.state={isVisible:a,imgLoaded:i,IOSupported:s},r.handleRef=r.handleRef.bind(r),r}return(0,d.default)(t,e),t.prototype.handleRef=function(e){var t=this;this.state.IOSupported&&e&&k(e,function(){t.setState({isVisible:!0,imgLoaded:!1})})},t.prototype.render=function(){var e=this,t=v(this.props),n=t.title,r=t.alt,a=t.className,i=t.outerWrapperClassName,o=t.style,s=void 0===o?{}:o,l=t.imgStyle,u=void 0===l?{}:l,d=t.sizes,c=t.resolutions,f=t.backgroundColor,p=t.Tag,h=void 0;h="boolean"==typeof f?"lightgray":f;var y=(0,m.default)({opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s"},u),b=(0,m.default)({opacity:this.state.imgLoaded||this.props.fadeIn===!1?1:0},u);if(d){var _=d;return _.srcWebp&&_.srcSetWebp&&z()&&(_.src=_.srcWebp,_.srcSet=_.srcSetWebp),g.default.createElement(p,{className:(i?i:"")+" gatsby-image-outer-wrapper",style:{position:"absolute"===s.position?"initial":"relative"}},g.default.createElement(p,{className:(a?a:"")+" gatsby-image-wrapper",style:(0,m.default)({position:"relative",overflow:"hidden"},s),ref:this.handleRef},g.default.createElement(p,{style:{width:"100%",paddingBottom:100/_.aspectRatio+"%"}}),_.base64&&g.default.createElement(O,{alt:r,title:n,src:_.base64,style:y}),_.tracedSVG&&g.default.createElement(O,{alt:r,title:n,src:_.tracedSVG,style:y}),h&&g.default.createElement(p,{title:n,style:{backgroundColor:h,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&g.default.createElement(O,{alt:r,title:n,srcSet:_.srcSet,src:_.src,sizes:_.sizes,style:b,onLoad:function(){e.state.IOSupported&&e.setState({imgLoaded:!0}),e.props.onLoad&&e.props.onLoad()}}),g.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:C((0,m.default)({alt:r,title:n},_))}})))}if(c){var w=c,x=(0,m.default)({position:"relative",overflow:"hidden",display:"inline-block",width:w.width,height:w.height},s);return"inherit"===s.display&&delete x.display,w.srcWebp&&w.srcSetWebp&&z()&&(w.src=w.srcWebp,w.srcSet=w.srcSetWebp),g.default.createElement(p,{className:(i?i:"")+" gatsby-image-outer-wrapper",style:{position:"absolute"===s.position?"initial":"relative"}},g.default.createElement(p,{className:(a?a:"")+" gatsby-image-wrapper",style:x,ref:this.handleRef},w.base64&&g.default.createElement(O,{alt:r,title:n,src:w.base64,style:y}),w.tracedSVG&&g.default.createElement(O,{alt:r,title:n,src:w.tracedSVG,style:y}),h&&g.default.createElement(p,{title:n,style:{backgroundColor:h,width:w.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:w.height}}),this.state.isVisible&&g.default.createElement(O,{alt:r,title:n,width:w.width,height:w.height,srcSet:w.srcSet,src:w.src,style:b,onLoad:function(){e.setState({imgLoaded:!0}),e.props.onLoad&&e.props.onLoad()}}),g.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:C((0,m.default)({alt:r,title:n,width:w.width,height:w.height},w))}})))}return null},t}(g.default.Component);j.defaultProps={fadeIn:!0,alt:"",Tag:"div"},j.propTypes={responsiveResolution:b.default.object,responsiveSizes:b.default.object,resolutions:b.default.object,sizes:b.default.object,fadeIn:b.default.bool,title:b.default.string,alt:b.default.string,className:b.default.oneOfType([b.default.string,b.default.object]),outerWrapperClassName:b.default.oneOfType([b.default.string,b.default.object]),style:b.default.object,imgStyle:b.default.object,position:b.default.string,backgroundColor:b.default.oneOfType([b.default.string,b.default.bool]),onLoad:b.default.func,Tag:b.default.string},t.default=j},98:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.raised,n=(0,l.default)(e,["raised"]);return d.default.createElement(p.default,(0,o.default)({elevation:t?8:2},n))}Object.defineProperty(t,"__esModule",{value:!0});var i=n(4),o=r(i),s=n(5),l=r(s),u=n(1),d=r(u),c=n(2),f=(r(c),n(41)),p=r(f);a.propTypes={},a.defaultProps={raised:!1},t.default=a},99:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.disableActionSpacing,n=e.children,r=e.classes,a=e.className,i=(0,l.default)(e,["disableActionSpacing","children","classes","className"]);return f.default.createElement("div",(0,o.default)({className:(0,h.default)(r.root,a)},i),t?n:(0,b.cloneChildrenWithClassName)(n,r.action))}Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0;var i=n(4),o=r(i),s=n(5),l=r(s),u=n(11),d=r(u),c=n(1),f=r(c),p=n(2),m=(r(p),n(6)),h=r(m),g=n(7),y=r(g),b=n(108),v=t.styles=function(e){return{root:(0,d.default)({display:"flex",alignItems:"center",boxSizing:"border-box",padding:e.spacing.unit+"px "+e.spacing.unit/2+"px"},e.breakpoints.up("sm"),{padding:e.spacing.unit+"px "+1.5*e.spacing.unit+"px"}),action:{margin:"0 "+e.spacing.unit/2+"px"}}};a.propTypes={},a.defaultProps={disableActionSpacing:!1},t.default=(0,y.default)(v,{name:"MuiCardActions"})(a)},100:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.classes,n=e.className,r=e.component,a=(0,l.default)(e,["classes","className","component"]);return d.default.createElement(r,(0,o.default)({className:(0,p.default)(t.root,n)},a))}Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0;var i=n(4),o=r(i),s=n(5),l=r(s),u=n(1),d=r(u),c=n(2),f=(r(c),n(6)),p=r(f),m=n(7),h=r(m),g=t.styles=function(e){return{root:e.mixins.gutters({paddingTop:2*e.spacing.unit,paddingBottom:2*e.spacing.unit,"&:last-child":{paddingBottom:3*e.spacing.unit}})}};a.propTypes={},a.defaultProps={component:"div"},t.default=(0,h.default)(g,{name:"MuiCardContent"})(a)},101:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.action,n=e.avatar,r=e.classes,a=e.className,i=e.component,s=e.subheader,u=e.title,c=(0,l.default)(e,["action","avatar","classes","className","component","subheader","title"]);return d.default.createElement(i,(0,o.default)({className:(0,p.default)(r.root,a)},c),n&&d.default.createElement("div",{className:r.avatar},n),d.default.createElement("div",{className:r.content},d.default.createElement(y.default,{variant:n?"body2":"headline",component:"span",className:r.title},u),s&&d.default.createElement(y.default,{variant:n?"body2":"body1",component:"span",color:"textSecondary",className:r.subheader},s)),t&&d.default.createElement("div",{className:r.action},t))}Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0;var i=n(4),o=r(i),s=n(5),l=r(s),u=n(1),d=r(u),c=n(2),f=(r(c),n(6)),p=r(f),m=n(7),h=r(m),g=n(42),y=r(g),b=t.styles=function(e){return{root:e.mixins.gutters({display:"flex",alignItems:"center",paddingTop:2*e.spacing.unit,paddingBottom:2*e.spacing.unit}),avatar:{flex:"0 0 auto",marginRight:2*e.spacing.unit},action:{flex:"0 0 auto",alignSelf:"flex-start",marginTop:e.spacing.unit*-1,marginRight:e.spacing.unit*-2},content:{flex:"1 1 auto"},title:{},subheader:{}}};a.propTypes={},a.defaultProps={component:"div"},t.default=(0,h.default)(b,{name:"MuiCardHeader"})(a)},102:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.classes,n=e.className,r=e.component,a=e.image,i=e.src,s=e.style,u=(0,d.default)(e,["classes","className","component","image","src","style"]),c=_.indexOf(r)!==-1,p=!c&&a?(0,l.default)({backgroundImage:"url("+a+")"},s):s;return f.default.createElement(r,(0,l.default)({className:(0,h.default)(t.root,(0,o.default)({},t.media,c),n),style:p,src:c?a||i:void 0},u))}Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0;var i=n(11),o=r(i),s=n(4),l=r(s),u=n(5),d=r(u),c=n(1),f=r(c),p=n(2),m=(r(p),n(6)),h=r(m),g=n(14),y=(r(g),n(7)),b=r(y),v=t.styles={root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"}},_=["video","audio","picture","iframe","img"];a.propTypes={},a.defaultProps={component:"div"},t.default=(0,b.default)(v,{name:"MuiCardMedia"})(a)},103:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(98);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(a).default}});var i=n(100);Object.defineProperty(t,"CardContent",{enumerable:!0,get:function(){return r(i).default}});var o=n(99);Object.defineProperty(t,"CardActions",{enumerable:!0,get:function(){return r(o).default}});var s=n(102);Object.defineProperty(t,"CardMedia",{enumerable:!0,get:function(){return r(s).default}});var l=n(101);Object.defineProperty(t,"CardHeader",{enumerable:!0,get:function(){return r(l).default}})},823:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e){return e.clientWidth}function s(e){return e.clientHeight}var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(1),c=n(661),f={width:"100%",height:"100%",padding:0,border:0};e.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getHeight,n=void 0===t?s:t,p=e.getWidth,m=void 0===p?o:p,h=e.containerStyle,g=void 0===h?f:h,y=e.className,b=void 0===y?null:y,v=e.elementResize,_=void 0!==v&&v;return function(e){return function(t){function o(){var e,t,i,s;r(this,o);for(var l=arguments.length,u=Array(l),d=0;d<l;d++)u[d]=arguments[d];return t=i=a(this,(e=o.__proto__||Object.getPrototypeOf(o)).call.apply(e,[this].concat(u))),i.state={},i.updateDimensions=function(){var e=i.refs.container,t=m(e),r=n(e);t===i.state.containerWidth&&r===i.state.containerHeight||i.setState({containerWidth:t,containerHeight:r})},i.onResize=function(){i.rqf||(i.rqf=i.getWindow().requestAnimationFrame(function(){i.rqf=null,i.updateDimensions()}))},s=t,a(i,s)}return i(o,t),u(o,[{key:"getWindow",value:function(){return this.refs.container?this.refs.container.ownerDocument.defaultView||window:window}},{key:"componentDidMount",value:function(){if(!this.refs.container)throw new Error("Cannot find container div");this.updateDimensions(),_?c(this.refs.container,this.updateDimensions):this.getWindow().addEventListener("resize",this.onResize,!1)}},{key:"componentWillUnmount",value:function(){this.getWindow().removeEventListener("resize",this.onResize)}},{key:"getWrappedInstance",value:function(){this.refs.wrappedInstance}},{key:"render",value:function(){var t=this.state,n=t.containerWidth,r=t.containerHeight;return n||r||console.warn("Wrapper div has no height or width, try overriding style with `containerStyle` option"),d.createElement("div",{className:b,style:g,ref:"container"},(n||r)&&d.createElement(e,l({},this.state,this.props,{updateDimensions:this.updateDimensions,ref:"wrappedInstance"})))}}]),o}(d.Component)}}},117:function(e,t){"use strict";function n(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}t.__esModule=!0,t.default=n},76:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(1),i=r(a),o=n(2),s=r(o),l=n(117),u=r(l),d=n(19),c={classes:s.default.object},f=function(e){var t;return{root:(t={display:"flex",flexWrap:"wrap"},t[e.breakpoints.up("md")]={justifyContent:"center"},t[e.breakpoints.up("lg")]={},t)}},p=function(e){var t=e.classes;return i.default.createElement("div",{className:t.root},e.children)};p.propTypes=c,t.default=(0,u.default)((0,d.withStyles)(f,{name:"styledGridColun"}))(p),e.exports=t.default},77:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(76);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(a).default}}),e.exports=t.default},414:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var s=n(1),l=r(s),u=n(2),d=r(u),c=n(823),f=r(c),p=function(e){function t(){return a(this,t),i(this,e.apply(this,arguments))}return o(t,e),t.prototype.render=function(){var e=this.props.containerWidth<769?"url('"+this.props.backgroundImageNarrow+"')":"url('"+this.props.backgroundImageWide+"')";return l.default.createElement("div",{style:{backgroundImage:e,backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"bottom center",height:this.props.height}},this.props.children)},t}(l.default.Component);p.propTypes={backgroundImageNarrow:d.default.string,backgroundImageWide:d.default.string,children:d.default.node,containerWidth:d.default.number.isRequired,height:d.default.oneOfType([d.default.string,d.default.number])},p.defaultProps={backgroundImageNarrow:"",backgroundImageWide:"",children:null,height:"80vh"},t.default=(0,f.default)()(p),e.exports=t.default},415:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(414);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(a).default}}),e.exports=t.default},78:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(79);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(a).default}}),e.exports=t.default},79:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(1),i=r(a),o=n(2),s=(r(o),n(40)),l=(r(s),n(6)),u=r(l),d=n(94),c=r(d),f=n(19),p=n(97),m=(r(p),n(103)),h=r(m),g=n(41),y=(r(g),n(42)),b=r(y),v=n(62),_=(r(v),{}),w=function(e){var t,n,r,a,i,o;return{root:(t={"@global":e.typography.global,textAlign:"left",color:e.palette.secondary.dark,margin:"10px 0 0 0",transition:"all "+(.001*e.transitions.duration.standard).toFixed(2)+"s "+e.transitions.easing.easeInOut,borderRadius:2},t[e.breakpoints.up("lg")]={maxWidth:412,margin:"20px"},t),withHover:{"&:hover, :active":{boxShadow:e.shadows[20],cursor:"pointer"},"&:focus":{boxShadow:e.shadows[20],outlineColor:e.palette.primary.dark,cursor:"pointer"}},flexBody:(n={display:"flex",flexWrap:"wrap",alignContent:"stretch"},n[e.breakpoints.up("lg")]={justifyContent:"center",flexGrow:1},n),cover:(r={maxWidth:640,minWidth:300,flexGrow:2},r[e.breakpoints.up("md")]={minWidth:345},r),excerpt:(a={flexGrow:1,display:"flex",flexWrap:"wrap",padding:2*e.spacing.unit},a[e.breakpoints.up("md")]={maxWidth:400},a),title:(i={fontSize:22,margin:"0.5em",maxWidth:500,color:e.palette.primary[900],borderBottom:"3px solid "+e.palette.primary[600],paddingBottom:"2px","&:hover":{color:e.palette.primary[600],borderBottom:"5px solid "+e.palette.primary[500],paddingBottom:"0"}},i[e.breakpoints.up("md")]={fontSize:28,fontWeight:700},i),contentBody:{display:"flex",flexDirection:"column"},contentPushOne:{flex:2,display:"flex",justifyContent:"center",flexDirection:"column"},contentPushTwo:{flex:1,display:"flex",justifyContent:"center",flexDirection:"column"},contentHTML:(o={fontSize:18,flexGrow:2,paddingBottom:2*e.spacing.unit},o[e.breakpoints.up("md")]={fontSize:20},o),space:{flexGrow:3},tags:{flexGrow:1}}},x=function(e){var t,n=e.classes,r=e.cover,a=(e.excerpt,e.feature,e.html),o=e.linkPath,l=e.path,d=e.title,f=(e.tags,o?"https://www.araceathlete.com/blog"+o:null),p=l||f,g={onClick:null,tab:null,role:null,link:!1};(l||o)&&(f?g.onClick=function(){return window.open(p,"_blank")}:g.onClick=function(){return(0,s.navigateTo)(p)},g.tab=1,g.role="button",g.link=!0);var y=function(e){var t=e.keyCode||e.which;13===t&&g.onClick()};return i.default.createElement(h.default,{className:(0,u.default)(n.root,(t={},t[n.withHover]=g.link,t)),role:g.role,tabIndex:g.tab,onClick:g.onClick,onKeyPress:function(e){return y(e)}},i.default.createElement("div",{className:n.flexBody},i.default.createElement("div",{className:n.cover},r?i.default.createElement(c.default,{sizes:r,alt:d}):i.default.createElement(b.default,{className:n.title,variant:"title"},d)),i.default.createElement(m.CardContent,{className:n.excerpt},i.default.createElement("div",{className:n.contentHTML,dangerouslySetInnerHTML:{__html:a}}))))};x.propTypes=_,t.default=(0,f.withStyles)(w,{name:"StyledPostFull"})(x),e.exports=t.default},434:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var s=n(1),l=r(s),u=n(19),d=n(120),c=r(d),f=n(77),p=r(f),m=n(121),h=r(m),g=n(78),y=r(g),b=n(415),v=(r(b),function(e){var t,n;return{root:{margin:"0 0 100px 0"},headlineBase:(t={"@global":e.typography.global,width:"100%",display:"flex",justifyContent:"center"},t[e.breakpoints.up("md")]={},t[e.breakpoints.up("lg")]={},t),headlineStage:(n={margin:20,fontSize:"1em",fontWeight:500,maxWidth:600},n[e.breakpoints.up("md")]={fontSize:"1.3em",fontWeight:500,maxWidth:600},n["& p"]={margin:10},n)}}),_=function(e){function t(){return a(this,t),i(this,e.apply(this,arguments))}return o(t,e),t.prototype.getPostList=function(){var e=this.props.data.allMarkdownRemark.edges.filter(function(e){return e.node.frontmatter.features}).map(function(e){return{excerpt:e.node.excerpt,html:e.node.html.substr(0,e.node.html.indexOf("<hr>")),slug:e.node.fields.slug,linkPath:e.node.frontmatter.path,title:e.node.frontmatter.title,date:e.node.frontmatter.date,cover:e.node.frontmatter.cover?e.node.frontmatter.cover.childImageSharp.responsiveSizes:null}});return e},t.prototype.render=function(){var e=this.getPostList();return l.default.createElement("div",{className:this.props.classes.root},l.default.createElement(c.default,null,l.default.createElement("div",{className:this.props.classes.headlineBase},l.default.createElement("div",{className:this.props.classes.headlineStage},l.default.createElement("h1",null,"Welcome to A Race athlete"),l.default.createElement("p",null,"Getting started is easy. All you need to do is click the ",l.default.createElement("strong",null,"Connect with STRAVA")," button in the upper right corner. You will be redirected to Strava to sign in and they will return you, logged in and ready to go."),l.default.createElement("p",null,"Check out the features below."))),l.default.createElement(p.default,null,e.map(function(e){return l.default.createElement(h.default,{key:e.linkPath,page:e,PostType:y.default})}))))},t}(l.default.Component);t.default=(0,u.withStyles)(v,{name:"StyledFeatures"})(_);t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-features-js-fb04772202a44e40fb0a.js.map