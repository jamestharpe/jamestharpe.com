(self.webpackChunkjamestharpe_com=self.webpackChunkjamestharpe_com||[]).push([[351],{2993:function(e){var t="undefined"!=typeof Element,r="function"==typeof Map,n="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var c,s,l,u;if(Array.isArray(e)){if((c=e.length)!=a.length)return!1;for(s=c;0!=s--;)if(!i(e[s],a[s]))return!1;return!0}if(r&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(u=e.entries();!(s=u.next()).done;)if(!a.has(s.value[0]))return!1;for(u=e.entries();!(s=u.next()).done;)if(!i(s.value[1],a.get(s.value[0])))return!1;return!0}if(n&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(u=e.entries();!(s=u.next()).done;)if(!a.has(s.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((c=e.length)!=a.length)return!1;for(s=c;0!=s--;)if(e[s]!==a[s])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===a.toString();if((c=(l=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(s=c;0!=s--;)if(!Object.prototype.hasOwnProperty.call(a,l[s]))return!1;if(t&&e instanceof Element)return!1;for(s=c;0!=s--;)if(("_owner"!==l[s]&&"__v"!==l[s]&&"__o"!==l[s]||!e.$$typeof)&&!i(e[l[s]],a[l[s]]))return!1;return!0}return e!=e&&a!=a}e.exports=function(e,t){try{return i(e,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}},4839:function(e,t,r){"use strict";var n,o=r(7294),i=(n=o)&&"object"==typeof n&&"default"in n?n.default:n;function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var s,l=[];function u(){s=e(l.map((function(e){return e.props}))),f.canUseDOM?t(s):r&&(s=r(s))}var f=function(e){var t,r;function o(){return e.apply(this,arguments)||this}r=e,(t=o).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,o.peek=function(){return s},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=s;return s=void 0,l=[],e};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){l.push(this),u()},a.componentDidUpdate=function(){u()},a.componentWillUnmount=function(){var e=l.indexOf(this);l.splice(e,1),u()},a.render=function(){return i.createElement(n,this.props)},o}(o.PureComponent);return a(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),a(f,"canUseDOM",c),f}}},5821:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(1597),o=r(7294),i=function(){var e=(0,o.useState)(""),t=e[0],r=e[1],i=(0,o.useState)([]),a=i[0],c=i[1];return(0,o.useEffect)((function(){if(t&&window.__LUNR__){var e=window.__LUNR__.en,r=e.index.search(t);c(r.map((function(t){var r=t.ref;return e.store[r]})))}else c([])}),[t]),o.createElement("form",{onSubmit:function(e){return e.preventDefault()},role:"search","area-label":"All Articles"},o.createElement("label",{htmlFor:"search"},"Search: "),o.createElement("input",{id:"search",type:"text",placeholder:"Topic, keyword, etc...",defaultValue:t,autoComplete:"off",onChange:function(e){r(e.target.value)}}),o.createElement("ul",null,a.map((function(e){var t=e.url,r=e.title;return o.createElement("li",{key:t},o.createElement(n.Link,{to:t},r))}))))},a=function(e){var t=e.location,r=e.children,a=(0,n.useStaticQuery)("3794076007");return o.createElement(o.Fragment,null,o.createElement("header",null,o.createElement("div",{className:"row"},o.createElement("h1",null,o.createElement(n.Link,{to:"/"},a.site.siteMetadata.title||"Oops! Forgot to set a title"))),o.createElement("nav",{className:"clearfix","aria-label":"Primary"},o.createElement("div",{className:"row"},o.createElement("div",{className:"column small-6 medium-6 large-6"},o.createElement(i,null)),o.createElement("div",{className:"column small-6 medium-6 large-6"},o.createElement(n.Link,{to:"/browse",className:"active"},"Browse"))))),o.createElement("main",null,r),o.createElement("footer",{className:"clearfix"},o.createElement("div",{className:"row"},o.createElement("section",{className:"column small-12 medium-6 large-3"},o.createElement("h2",null,"About James"),o.createElement("p",null,"James is a father at home, Principal Software Engineer at work, and"," ",o.createElement("em",null,"wannabe")," autodidact everywhere else."),o.createElement("p",null,o.createElement(n.Link,{to:"/contact"},"Contact James"))),o.createElement("section",{className:"column small-12 medium-6 large-3"},o.createElement("h2",null,"Social"),o.createElement("a",{href:a.site.siteMetadata.siteUrl},o.createElement("img",{alt:"James Tharpe's Website",width:"22px",src:"https://raw.githubusercontent.com/iconic/open-iconic/master/svg/globe.svg"}))," ",o.createElement("a",{href:"https://twitter.com/jamestharpe"},o.createElement("img",{alt:"James Tharpe's Twitter",width:"22px",src:"https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/twitter.svg"}))," ",o.createElement("a",{href:"https://www.linkedin.com/in/jamestharpe/"},o.createElement("img",{alt:"James Tharpe's LinkedIn",width:"22px",src:"https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg"}))," ",o.createElement("a",{href:"https://stackoverflow.com/users/104763/james"},o.createElement("img",{alt:"James Tharpe's StackOverflow",width:"22px",src:"https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/stackoverflow.svg"}))," ",o.createElement("a",{href:"https://gitlab.com/jamestharpe"},o.createElement("img",{alt:"James Tharpe's GitLab",width:"22px",src:"https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/gitlab.svg"}))),o.createElement("section",{className:"column small-12 medium-6 large-3","aria-label":"Copyright and Licensing"},o.createElement("p",{"xmlns:dct":"http://purl.org/dc/terms/","xmlns:cc":"http://creativecommons.org/ns#",className:"license-text"},o.createElement(n.Link,{rel:"cc:attributionURL",property:"dct:title",to:t.pathname},"This article")," ","by",o.createElement("a",{rel:"cc:attributionURL dct:creator",property:"cc:attributionName",href:a.site.siteMetadata.siteUrl},"James Tharpe")," ","is licensed under"," ",o.createElement("a",{rel:"license",href:"https://creativecommons.org/licenses/by-nc-sa/4.0"},"CC BY-NC-SA 4.0",o.createElement("br",null),o.createElement("img",{style:{height:"22px!important",marginLeft:"3px",verticalAlign:"text-bottom"},src:"https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1",alt:"Creative Commons"}),o.createElement("img",{style:{height:"22px!important",marginLeft:"3px",verticalAlign:"text-bottom"},src:"https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1",alt:"Attribution"}),o.createElement("img",{style:{height:"22px!important",marginLeft:"3px",verticalAlign:"text-bottom"},src:"https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1",alt:"Non-Commercial"}),o.createElement("img",{style:{height:"22px!important",marginLeft:"3px",verticalAlign:"text-bottom"},src:"https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1",alt:"Share Alike"})))))))}},1069:function(e,t,r){"use strict";r.d(t,{Z:function(){return ve}});var n,o,i,a,c=r(1597),s=r(7294),l=r(5697),u=r.n(l),f=r(4839),p=r.n(f),m=r(2993),d=r.n(m),h=r(6494),y=r.n(h),v="bodyAttributes",g="htmlAttributes",b="titleAttributes",T={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},w=(Object.keys(T).map((function(e){return T[e]})),"charset"),E="cssText",A="href",C="http-equiv",O="innerHTML",S="itemprop",k="name",j="property",x="rel",L="src",P="target",N={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},I="defaultTitle",M="defer",_="encodeSpecialCharacters",R="onChangeClientState",B="titleTemplate",U=Object.keys(N).reduce((function(e,t){return e[N[t]]=t,e}),{}),D=[T.NOSCRIPT,T.SCRIPT,T.STYLE],F="data-react-helmet",H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},Y=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},z=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},K=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},V=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},W=function(e){var t=X(e,T.TITLE),r=X(e,B);if(r&&t)return r.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var n=X(e,I);return t||n||void 0},Q=function(e){return X(e,R)||function(){}},Z=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return J({},e,t)}),{})},$=function(e,t){return t.filter((function(e){return void 0!==e[T.BASE]})).map((function(e){return e[T.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),o=0;o<n.length;o++){var i=n[o].toLowerCase();if(-1!==e.indexOf(i)&&r[i])return t.concat(r)}return t}),[])},G=function(e,t,r){var n={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&oe("Helmet: "+e+' should be of type "Array". Instead found type "'+H(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var o={};r.filter((function(e){for(var r=void 0,i=Object.keys(e),a=0;a<i.length;a++){var c=i[a],s=c.toLowerCase();-1===t.indexOf(s)||r===x&&"canonical"===e[r].toLowerCase()||s===x&&"stylesheet"===e[s].toLowerCase()||(r=s),-1===t.indexOf(c)||c!==O&&c!==E&&c!==S||(r=c)}if(!r||!e[r])return!1;var l=e[r].toLowerCase();return n[r]||(n[r]={}),o[r]||(o[r]={}),!n[r][l]&&(o[r][l]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var c=i[a],s=y()({},n[c],o[c]);n[c]=s}return e}),[]).reverse()},X=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},ee=(n=Date.now(),function(e){var t=Date.now();t-n>16?(n=t,e(t)):setTimeout((function(){ee(e)}),0)}),te=function(e){return clearTimeout(e)},re="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||ee:r.g.requestAnimationFrame||ee,ne="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||te:r.g.cancelAnimationFrame||te,oe=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ie=null,ae=function(e,t){var r=e.baseTag,n=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,s=e.onChangeClientState,l=e.scriptTags,u=e.styleTags,f=e.title,p=e.titleAttributes;le(T.BODY,n),le(T.HTML,o),se(f,p);var m={baseTag:ue(T.BASE,r),linkTags:ue(T.LINK,i),metaTags:ue(T.META,a),noscriptTags:ue(T.NOSCRIPT,c),scriptTags:ue(T.SCRIPT,l),styleTags:ue(T.STYLE,u)},d={},h={};Object.keys(m).forEach((function(e){var t=m[e],r=t.newTags,n=t.oldTags;r.length&&(d[e]=r),n.length&&(h[e]=m[e].oldTags)})),t&&t(),s(e,d,h)},ce=function(e){return Array.isArray(e)?e.join(""):e},se=function(e,t){void 0!==e&&document.title!==e&&(document.title=ce(e)),le(T.TITLE,t)},le=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(F),o=n?n.split(","):[],i=[].concat(o),a=Object.keys(t),c=0;c<a.length;c++){var s=a[c],l=t[s]||"";r.getAttribute(s)!==l&&r.setAttribute(s,l),-1===o.indexOf(s)&&o.push(s);var u=i.indexOf(s);-1!==u&&i.splice(u,1)}for(var f=i.length-1;f>=0;f--)r.removeAttribute(i[f]);o.length===i.length?r.removeAttribute(F):r.getAttribute(F)!==a.join(",")&&r.setAttribute(F,a.join(","))}},ue=function(e,t){var r=document.head||document.querySelector(T.HEAD),n=r.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(n),i=[],a=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===O)r.innerHTML=t.innerHTML;else if(n===E)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[n]?"":t[n];r.setAttribute(n,c)}r.setAttribute(F,"true"),o.some((function(e,t){return a=t,r.isEqualNode(e)}))?o.splice(a,1):i.push(r)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return r.appendChild(e)})),{oldTags:o,newTags:i}},fe=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},pe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[N[r]||r]=e[r],t}),t)},me=function(e,t,r){switch(e){case T.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})[F]=!0,o=pe(r,n),[s.createElement(T.TITLE,o,e)];var e,r,n,o},toString:function(){return function(e,t,r,n){var o=fe(r),i=ce(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+V(i,n)+"</"+e+">":"<"+e+' data-react-helmet="true">'+V(i,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case v:case g:return{toComponent:function(){return pe(t)},toString:function(){return fe(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,o=((n={key:r})[F]=!0,n);return Object.keys(t).forEach((function(e){var r=N[e]||e;if(r===O||r===E){var n=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:n}}else o[r]=t[e]})),s.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var o=Object.keys(n).filter((function(e){return!(e===O||e===E)})).reduce((function(e,t){var o=void 0===n[t]?t:t+'="'+V(n[t],r)+'"';return e?e+" "+o:o}),""),i=n.innerHTML||n.cssText||"",a=-1===D.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(a?"/>":">"+i+"</"+e+">")}),"")}(e,t,r)}}}},de=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,s=e.scriptTags,l=e.styleTags,u=e.title,f=void 0===u?"":u,p=e.titleAttributes;return{base:me(T.BASE,t,n),bodyAttributes:me(v,r,n),htmlAttributes:me(g,o,n),link:me(T.LINK,i,n),meta:me(T.META,a,n),noscript:me(T.NOSCRIPT,c,n),script:me(T.SCRIPT,s,n),style:me(T.STYLE,l,n),title:me(T.TITLE,{title:f,titleAttributes:p},n)}},he=p()((function(e){return{baseTag:$([A,P],e),bodyAttributes:Z(v,e),defer:X(e,M),encode:X(e,_),htmlAttributes:Z(g,e),linkTags:G(T.LINK,[x,A],e),metaTags:G(T.META,[k,w,C,j,S],e),noscriptTags:G(T.NOSCRIPT,[O],e),onChangeClientState:Q(e),scriptTags:G(T.SCRIPT,[L,O],e),styleTags:G(T.STYLE,[E],e),title:W(e),titleAttributes:Z(b,e)}}),(function(e){ie&&ne(ie),e.defer?ie=re((function(){ae(e,(function(){ie=null}))})):(ae(e),ie=null)}),de)((function(){return null})),ye=(o=he,a=i=function(e){function t(){return q(this,t),K(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!d()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case T.SCRIPT:case T.NOSCRIPT:return{innerHTML:t};case T.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,n=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return J({},n,((t={})[r.type]=[].concat(n[r.type]||[],[J({},o,this.mapNestedChildrenToProps(r,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,n=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(n.type){case T.TITLE:return J({},o,((t={})[n.type]=a,t.titleAttributes=J({},i),t));case T.BODY:return J({},o,{bodyAttributes:J({},i)});case T.HTML:return J({},o,{htmlAttributes:J({},i)})}return J({},o,((r={})[n.type]=J({},i),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=J({},t);return Object.keys(e).forEach((function(t){var n;r=J({},r,((n={})[t]=e[t],n))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return s.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,i=o.children,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[U[r]||r]=e[r],t}),t)}(z(o,["children"]));switch(r.warnOnInvalidChildren(e,i),e.type){case T.LINK:case T.META:case T.NOSCRIPT:case T.SCRIPT:case T.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:a,nestedChildren:i});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:a,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=z(e,["children"]),n=J({},r);return t&&(n=this.mapChildrenToProps(t,n)),s.createElement(o,n)},Y(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(s.Component),i.propTypes={base:u().object,bodyAttributes:u().object,children:u().oneOfType([u().arrayOf(u().node),u().node]),defaultTitle:u().string,defer:u().bool,encodeSpecialCharacters:u().bool,htmlAttributes:u().object,link:u().arrayOf(u().object),meta:u().arrayOf(u().object),noscript:u().arrayOf(u().object),onChangeClientState:u().func,script:u().arrayOf(u().object),style:u().arrayOf(u().object),title:u().string,titleAttributes:u().object,titleTemplate:u().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var e=o.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},a);ye.renderStatic=ye.rewind;var ve=function(e){var t=e.author,r=e.description,n=e.lang,o=e.meta,i=e.title,a=(0,c.useStaticQuery)("80858887").site.siteMetadata,l=a.author,u=a.description,f=a.title;return t=t||l,r=r||u,n=n||"en",o=o||[],s.createElement(ye,{htmlAttributes:{lang:n},title:i,titleTemplate:i?"%s | "+f:void 0,meta:[{name:"description",content:r},{property:"og:title",content:i},{property:"og:description",content:r},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:t},{name:"twitter:title",content:i},{name:"twitter:description",content:r}].concat(o)})}}}]);
//# sourceMappingURL=commons-985656fd5ca2f8ba37e7.js.map