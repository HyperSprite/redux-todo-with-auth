webpackJsonp([0xd2cf8b09763b],{209:function(e,t){e.exports={layoutContext:{}}},402:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},a=o(1),l=r(a),u=o(430),i=r(u),f=o(209),d=r(f);t.default=function(e){return l.default.createElement(i.default,n({},e,d.default))},e.exports=t.default},216:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(15),a=r(n),l=o(8),u=r(l),i=o(12),f=r(i),d=o(10),c=r(d),s=o(9),p=r(s),y=o(1),h=r(y),m=o(2),b=(r(m),o(19)),g=o(50),_=(r(g),function(e){return{"@global":{html:{WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box"},"*, *::before, *::after":{boxSizing:"inherit"},body:{margin:0,backgroundColor:e.palette.background.default,"@media print":{backgroundColor:e.palette.common.white}}}}}),x=function(e){function t(){return(0,u.default)(this,t),(0,c.default)(this,(t.__proto__||(0,a.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,f.default)(t,[{key:"render",value:function(){return this.props.children}}]),t}(h.default.Component);x.propTypes={},x.propTypes={},x.defaultProps={children:null},t.default=(0,b.withStyles)(_,{name:"MuiCssBaseline"})(x)},217:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(216);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(n).default}})},205:function(e,t){},430:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var u=o(1),i=r(u),f=o(2),d=r(f),c=o(19),s=o(162),p=r(s),y=function(e){return{body:{fontFamily:e.typography.fontFamily,fontSize:e.typography.fontSize,fontWeight:e.typography.fontWeightRegular}}},h=function(e){function t(){return n(this,t),a(this,e.apply(this,arguments))}return l(t,e),t.prototype.componentDidMount=function(){document.body.style.margin="0 auto",document.body.style.paddingTop=0},t.prototype.render=function(){return i.default.createElement(p.default,null,i.default.createElement("div",{className:this.props.classes.body},this.props.children()))},t}(i.default.Component);h.propTypes={children:d.default.oneOfType([d.default.array,d.default.func]).isRequired},t.default=(0,c.withStyles)(y,{name:"styledLayoutFeatures"})(h),e.exports=t.default},80:function(e,t){"use strict";t.__esModule=!0,t.default={type:"light",primary:{50:"#ffe7e7",100:"#ffb7b7",200:"#ff5959",300:"#ff1212",400:"#de0000",500:"#c40000",600:"#aa0000",700:"#910000",800:"#770000",900:"#5e0000",A100:"#c89999",A200:"#ad6666",A400:"#923232",A700:"#770000",contrastDefaultColor:"light"},secondary:{50:"#e4e8eb",100:"#c9d2d7",200:"#aebcc3",300:"#93a6af",400:"#78909c",500:"#60737c",600:"#48565d",700:"#30393e",800:"#242b2e",900:"#181c1f",A100:"#c9d2d7",A200:"#78909C",A400:"#60737c",A700:"#48565d",contrastDefaultColor:"light"}},e.exports=t.default},161:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var n=o(80),a=r(n);t.default={global:{fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',"h1, h2, h3":{color:a.default.primary[700]},"h4, h5, h6":{color:a.default.primary[800],paddingLeft:"0.5em"},"li, p":{color:a.default.secondary[700],paddingLeft:"1em"},a:{textDecoration:"none",color:a.default.primary[900],transition:"0.3s",borderBottom:"2px solid "+a.default.secondary[200],paddingBottom:"0px","&:hover":{color:a.default.primary[500],borderBottom:"3px solid "+a.default.primary[600],paddingBottom:"0"},"& h2":{color:a.default.primary[900],borderBottom:"1px solid "+a.default.primary[600],paddingBottom:"2px"}},table:{borderCollapse:"collapse",width:"100%"},th:{textAlign:"center",padding:"8px"},td:{textAlign:"center",padding:"8px"},hr:{borderTop:"1px solid "+a.default.primary[400]}},fontWeightHeavy:700,title2:{fontSize:"2.0rem",fontWeight:700,lineHeight:"1.16667em",color:"rgba(0, 0, 0, 0.62)",fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'},body3:{fontSize:"0.875rem",fontWeight:500,fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',lineHeight:"1.46429em",color:"rgba(0, 0, 0, 0.87)"},button:{lineHeight:"1.71429em"}},e.exports=t.default},162:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,o(205);var n=o(1),a=r(n),l=o(2),u=r(l),i=o(19),f=o(217),d=r(f),c=o(80),s=r(c),p=o(161),y=r(p),h={children:u.default.oneOfType([u.default.arrayOf(u.default.node),u.default.node]).isRequired},m=(0,i.createMuiTheme)({palette:s.default,typography:y.default}),b=function(e){return a.default.createElement(i.MuiThemeProvider,{theme:m,sheetsManager:new Map},a.default.createElement("div",null,a.default.createElement(d.default,null),e.children))};b.propTypes=h,t.default=b,e.exports=t.default}});
//# sourceMappingURL=component---src-layouts-features-js-4b3d3260cedf1f0ba9c6.js.map