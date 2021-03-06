// @flow
import React from 'react';
import {withRouter} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const util = {};

export class LazyImage extends React.Component {
  constructor(p){
    super(p);
    this._isMounted = false;
  }

  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
    loaded: false,
    src: ''
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.setState({loaded: false})
      this.load(nextProps)
    }
  }

  load(props) {
    try {
    let that = this;
      if(typeof props.load  === 'string'){
        (() => import(`${props.load}`))().then((src) => {
          if(that._isMounted)
            that.setState({src: src.default, loaded:true})
          if(typeof props.loaded == 'function')
            props.loaded()
        })

        return
      } 

      props.load().then((src) => {
        if(this._isMounted)
        this.setState({src: src.default, loaded:true})
        if(typeof props.loaded == 'function')
          props.loaded()
      })

    } catch (error) {
      this.load(props)
    }
  }

  render() {
    let {mod , load, loaded,  ...rest} = this.props;
    let {src, loaded: imgloaded} = this.state;
    return  !imgloaded ? <div {...rest}  ><CircularProgress color="secondary" /></div> : <div {...rest}  ><img src={src}/></div>
  }
}

export class Lazy extends React.Component {
  constructor(p){
    super(p);
    this._isMounted = false;
  }

  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    props.load().then((mod) => {
      if(this._isMounted)
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    let {load , ...rest} = this.props;
    return  React.createElement(
            'div', 
            null, 
            this.state.mod && React.createElement(this.state.mod, rest, null))
  }
}


export const dump = (props) => Object.keys(props).map((prop, i) => <pre style={{'paddingLeft': '10px'}}key={i}>{prop + ':'} {(typeof props[prop] === "object"  ? dump(props[prop])  : props[prop])  }</pre> )

export const getUniqueKey = (key = '') => {
  return `${key?key+'-':''}${~~(Math.random()*1000)}_${~~(Math.random()*1000)}`
}


export function removeClass(element, className){
  if ( element.classList)
    element.classList.remove(className)
  else
    element.className = element.className
      .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
      .replace(/\s+/g, ' ')
      .replace(/^\s*|\s*$/g, '');
}

export function addClass(element, className){
  if ( element.classList)
    element.classList.add(className)
  else if ( !hasClass(element))
    element.className = element.className + ' ' + className
}

export function hasClass(element, className) {
  if ( element.classList)
    return !!className && element.classList.contains(className)
  else
    return ` ${element.className} `.indexOf(` ${className} `) !== -1
}

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function delegate(target, type, selector, handler, capture = false, once = false) {
    const dispatchEvent = (event) => {
        // console.time('delegate');
        let targetElement = event.target;
        while (targetElement && targetElement !== target ) {
        if ( typeof targetElement.matches == 'function' && targetElement.matches(selector)) {
          
            event.delegateTarget = event.delegateTarget || targetElement;
            handler.call(this, event);
            break;
        }
        targetElement = targetElement.parentNode;
        }
        // console.timeEnd('delegate');
    };

    target.addEventListener(type, dispatchEvent, !!capture);

    return () => target.removeEventListener(type, dispatchEvent, {capture: !!capture, once: !!once});

};

export function listener(target, type, handler, capture) {
    const dispatchEvent = (event) => {
        handler.call(this, event);
    };

    target.addEventListener(type, dispatchEvent, !!capture);

    return () => target.removeEventListener(type, dispatchEvent, !!capture);

};

export function sleep(timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
};

export function humanReadableTimeDiff(date) {
  var dateDiff = Date.now() - date;
  if (dateDiff <= 0 || Math.floor(dateDiff / 1000) == 0) {
    return 'now';
  }
  if (dateDiff < 1000 * 60) {
    return Math.floor(dateDiff / 1000) + 's';
  }
  if (dateDiff < 1000 * 60 * 60) {
    return Math.floor(dateDiff / (1000 * 60)) + 'm';
  }
  if (dateDiff < 1000 * 60 * 60 * 24) {
    return Math.floor(dateDiff / (1000 * 60 * 60)) + 'h';
  }
  return Math.floor(dateDiff / (1000 * 60 * 60 * 24)) + 'd';
}

export function humanReadableTime(date) {

    try{
        if (date <= 0 || Math.floor(date) == 0) {
            return '0'; // not sure
        }
        if (date < 60) {
            return Math.floor(date) + 'с ';
        }
        if (date < 60 * 60) {
            return Math.floor(date / 60) + 'м ' + humanReadableTime(date - Math.floor(date / 60) * 60);
        }
        if (date < 60 * 60 * 24) {
            return Math.floor(date / (60 * 60)) + 'ч ' + humanReadableTime(date - Math.floor(date / (60 * 60)) * 60 * 60);
        }
        return Math.floor(date / (60 * 60 * 24)) + 'д ' + humanReadableTime(date - Math.floor(date / (60 * 60 * 24)) * 60 * 60 * 24);
    } catch(e){
        return '';
    }
}
export const getMonthName = (month) => {
  let months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  return months[ month || 0 ];
}

export const getFullTimeDigits = (Minutes) => {
  return (('' + Minutes).length == 1) ? ('0' + Minutes) : Minutes
}
export const getDayName = (day) => {
  let days = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
  return days[ day || 0 ];

}

function swap(items, firstIndex, secondIndex){
  var temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function partition(items, left, right, item, comporator) {

  var pivot   = items[Math.floor((right + left) / 2)],
      i       = left,
      j       = right;


  while (i <= j) {

      while (comporator(items[i], pivot, false, item)) {
          i++;
      }

      while (comporator(items[j], pivot, true, item)) {
          j--;
      }

      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }

  return i;
}
export function quickSort(items, left, right, item, comporator) {

  var index;

  if (items.length > 1) {

      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;

      index = partition(items, left, right, item, comporator);

      if (left < index - 1) {
          quickSort(items, left, index - 1, item, comporator)
      }

      if (index < right) {
          quickSort(items, index, right, item, comporator)
      }

  }

  return items;
};

export const call = (fn, ...args) => {
if (typeof fn === 'function') {
    return fn(...args);
}
};

export class ScrollRestortion extends React.Component {

  componentDidMount(){
    this.scrollId =  this.props.scrollId;
    if(this.scrollId){
      let el = this.refs[this.scrollId];
      if(el){
        this.notListen = listener(el, "scroll", debounce((e) => {
          if(typeof window !== "undefined"){
            window.sessionStorage.setItem(`ScrollRestortion${this.scrollId}`, e.target.scrollTop)
          }
        }, 500), false);
      }
      var scrollPos = window.sessionStorage.getItem(`ScrollRestortion${this.scrollId}`);
      if(scrollPos){
        let el = this.refs[this.scrollId];
        if( el ) el.scrollTop =  scrollPos || 0
      }else{
        if( el && this.props.scrollToEndByDefault ) el.scrollTop = el.scrollHeight;
      }
    }
  }

  componentDidUpdate(prevProps){
      if(typeof window !== "undefined" && this.scrollId){
        var scrollPos = window.sessionStorage.getItem(`ScrollRestortion${this.scrollId}`);
        let el = this.refs[this.scrollId];
        if(scrollPos){
          if( el ) el.scrollTop =  scrollPos
        }else{
          if( el && this.props.scrollToEndByDefault ) el.scrollTop = el.scrollHeight;
        }
      }
  }

  componentWillUnmount(){
   this.scrollId && this.notListen();
  }

  render() {
    let {scrollId, scrollToEndByDefault,  ...domProps} = this.props;
    return React.createElement('div', {...domProps, ref: `${scrollId}`},this.props.children);
  }
}

export  function withGracefulUnmount(WrappedComponent) {

    return class extends React.Component {

        constructor(props){
            super(props);
            this.state = { mounted: false };
            this.componentGracefulUnmount = this.componentGracefulUnmount.bind(this)
        }


        componentGracefulUnmount(){
            this.setState({mounted: false});

            window.removeEventListener('beforeunload', this.componentGracefulUnmount);
        }

        componentWillMount(){
            this.setState({mounted: true})
        }

        componentDidMount(){
            // make sure the componentWillUnmount of the wrapped instance is executed even if React
            // does not have the time to unmount properly. we achieve that by
            // * hooking on beforeunload for normal page browsing
            // * hooking on turbolinks:before-render for turbolinks page browsing
            window.addEventListener('beforeunload', this.componentGracefulUnmount);
        }

        componentWillUnmount(){
            this.componentGracefulUnmount()
        }

        render(){

            let { mounted }  = this.state;

            if (mounted) {
                return <WrappedComponent {...this.props} />
            } else {
                return null // force the unmount
            }
        }
    }

}

export const getTabTime = (time) => {
    let now = new Date();
    let outputPublishTime = ''; 
    
    if(time.getFullYear() === now.getFullYear() && time.getMonth() === now.getMonth() && time.getDate() + 7 >  now.getDay() ){
      outputPublishTime = getDayName(time.getDay());
    }
    if(time.getFullYear() !== now.getFullYear() || time.getMonth() !== now.getMonth() || time.getDate() + 7 <=  now.getDay()){
      outputPublishTime = `${time.getDate()}.${getFullTimeDigits(time.getMonth())}.${time.getFullYear().toString().substr(-2, 2)}`;
    }
    if( time.getFullYear() === now.getFullYear() && time.getMonth() === now.getMonth() && time.getDate() === now.getDate()){
      outputPublishTime = `${time.getHours()}:${getFullTimeDigits(time.getMinutes())}`
    }
    return outputPublishTime
}


export const requestAnimationFramePromise = _ => new Promise(requestAnimationFrame);
export const transitionEndPromise = elem => new Promise(resolve => {
  elem.addEventListener('transitionend', resolve, {capture: false, once: true});
});

export const transitionEndWithStrictPromise = (elem, propertyName) => new Promise(resolve => {
  elem.addEventListener('transitionend', e => {
      if( e.target === elem && e.propertyName == propertyName)
          resolve();
  }, {capture: false})
  });

export const lerp = (minIn, maxIn, minOut, maxOut, opts = {}) => {
  const rangeIn = maxIn - minIn;
  const rangeOut = maxOut - minOut;
  
  return (v) => {
    v = opts.absolute ? Math.abs(v) : v;
    let p;
    if (opts.noClamp) p = (v - minIn) / rangeIn;
    else p = Math.max(Math.min((v - minIn) / rangeIn, 1), 0);
    return p * rangeOut + minOut;
  };
}

export const parallel = f => setTimeout( f, 0);

export const getIMP = c => c;

export const wait = time => new Promise(resolve => {
  setTimeout( resolve , time)});


export const LightenDarkenColor = (col, amt) => {
  
    var usePound = false;
  
    if( (/^.*rgb/g).test(col) ) return col;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

export const IsBright = (col) => {
  
  if( (/^.*rgb/g).test(col) ) return col;

  if (col[0] == "#") {
      col = col.slice(1);
  }

  var num = parseInt(col,16);

  var r = (num >> 16);


  if (r > 255 / 2) r = 1;
  else  r = 0;

  var b = ((num >> 8) & 0x00FF);

  if (b > 255 / 2) b = 1;
  else b = 0;

  var g = (num & 0x0000FF);

  if (g > 255 / 2) g = 1;
  else  g = 0;

  return r + b + g > 3 / 2

}


export const roundeWithDec = (value) => {

  let sign = '';
  if(value < 0){
    value = Math.abs(value);
    sign = '-';
  }
  const whole = Math.floor(Number(value));
  const decimal = Math.abs(Math.round((Number(value) % 1) * 100));
  const marker = (1.1).toLocaleString().charAt(1);

  if (decimal < 10) {
    return `${sign}${whole.toLocaleString()}${marker}0${decimal.toString()}`;
  }
  return `${sign}${whole.toLocaleString()}${marker}${decimal.toString()}`;
}

export const isTouchDevice = () => {
  return (
    !!(typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        (window.DocumentTouch &&
          typeof document !== 'undefined' &&
          document instanceof window.DocumentTouch))) ||
    !!(typeof navigator !== 'undefined' &&
      (navigator.maxTouchPoints || navigator.msMaxTouchPoints))
  );
}

export const loadScript = (url, async) => {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    if (typeof async !== 'undefined') {
      script.async = async;
    }

    script.onerror = reject;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

export const parseMustache = (tmpl, data) => {

    const reservedWords = ['startIf', 'endIf'];

    let reg = new RegExp(/{{[^}}]+}}/g), m, startMatch;
    let isInclude = false;
    let output = tmpl;
    while ((m = reg.exec(tmpl)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === reg.lastIndex) {
          reg.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {

          let matchData = match.replace('{{','').replace('}}','').trim();

          if( reservedWords.some( w  =>  match.includes(w)) ){ // handle operator

              
              if(match.includes('startIf')){   // startIF
                startMatch = match;
                matchData = matchData.replace('startIf','');

                isInclude =  matchData.split('and').map(equation => {


                  if( (equation.indexOf('>=')) > 0 ){ // >= before than > 

                    let [left, right] = equation.split('>=');

                    if( isNaN(parseInt(left)) ){
                      left = left.trim();
                      if( left in data){
                        left = data[left]
                      }
                    }

                    if( isNaN(parseInt(right)) ){
                      right = right.trim();
                      if( right in data){
                        right = data[right]
                      }
                    }

                    if(parseInt(left) >= parseInt(right)){
                      return true
                    }

                  }

                  if( (equation.indexOf('<=')) > 0 ){ // <= before than <

                    let [left, right] = equation.split('<=');

                    if( isNaN(parseInt(left)) ){
                      left = left.trim();
                      if( left in data){
                        left = data[left]
                      }
                    }

                    if( isNaN(parseInt(right)) ){
                      right = right.trim();
                      if( right in data){
                        right = data[right]
                      }
                    }

                    if(parseInt(left) <= parseInt(right)){
                      return true
                    }

                  }

                  if( (equation.indexOf('>')) > 0 ){ // handle more

                    let [left, right] = equation.split('>');

                    if( isNaN(parseInt(left)) ){
                      left = left.trim();
                      if( left in data){
                        left = data[left]
                      }
                    }

                    if( isNaN(parseInt(right)) ){
                      right = right.trim();
                      if( right in data){
                        right = data[right]
                      }
                    }

                    if(parseInt(left) > parseInt(right)){
                      return true
                    }
                    
                  }

                  if( (equation.indexOf('<')) > 0 ){ // handle less

                    let [left, right] = equation.split('<');

                    if( isNaN(parseInt(left)) ){
                      left = left.trim();
                      if( left in data){
                        left = data[left]
                      }
                    }

                    if( isNaN(parseInt(right)) ){
                      right = right.trim();
                      if( right in data){
                        right = data[right]
                      }
                    }

                    if(parseInt(left) < parseInt(right)){
                      return true
                    }

                  }


                  if( (equation.indexOf('=')) > 0 ){  // handle equal
                    let [left, right] = equation.split('=');

                    if( isNaN(parseInt(left)) ){
                      left = left.trim();
                      if( left in data){
                        left = data[left]
                      }
                    }

                    if( isNaN(parseInt(right)) ){
                      right = right.trim();
                      if( right in data){
                        right = data[right]
                      }
                    }

                    if(parseInt(left) === parseInt(right)){
                      return true
                    }
                  }

                  if( (equation.indexOf('%')) > 0 ){  // handle %
                    let [left, right] = equation.split('%');

                    if( isNaN(parseInt(left)) ){
                      left = left.trim();
                      if( left in data){
                        left = data[left]
                      }
                    }

                    if( isNaN(parseInt(right)) ){
                      right = right.trim();
                      if( right in data){
                        right = data[right]
                      }
                    }

                    return parseInt(left) % parseInt(right)
                      
                  }

                  return false

                }).every(t => t)
              }

              if(match.includes('endIf')){  // endIF

                if(isInclude){
                  output = output.replace(startMatch, '');
                  output = output.replace(match, '');
                 
                }else{
                  output = output.substr(0, output.indexOf(startMatch) ) + output.substr(output.indexOf(match) + match.length);
                }

                isInclude = false;
              }

          }else{ // no operator, just replace variable if posible
          
            if( matchData in data){
              output = output.replace(match, data[matchData])
            }
          
          } 
        });
    }

    return output
}

export const metaContent = (entry) => {
  for(let { propertyName, content } of entry){
    let meta = document.querySelector(propertyName);
    if(content) meta.content = content;
  }
}


export const copy = (function(window, document, navigator) {
  var textArea,
      copy;

  function isOS() {
      return navigator.userAgent.match(/ipad|iphone/i);
  }


  function createTextArea(text) {
      textArea = document.createElement('textArea');
      textArea.value = text;
      textArea.setAttribute('value', text);
      document.body.appendChild(textArea);
  }

  function selectText() {
      var range,
          selection;

      if (isOS()) {
          range = document.createRange();
          range.selectNodeContents(textArea);
          selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          textArea.setSelectionRange(0, 999999);
      } else {
          textArea.select();
      }
  }

  function copyToClipboard() {        
      document.execCommand('copy');
  }

  function removeTextArea() {        
      document.body.removeChild(textArea);
  }

  copy = function(textOrElement) {
      
      if(textOrElement.current && textOrElement.current instanceof Element){
          textArea = textOrElement.current;
          selectText();
          copyToClipboard();
      }else{
          createTextArea(textOrElement);
          selectText();
          copyToClipboard();
          removeTextArea(textOrElement);
      }
  };

  return copy
})(window, document, navigator);



export const formatedTime = (date) => {
  let dateInstance = new Date(date); 
  return `${dateInstance.getHours().toString().length > 1 ? dateInstance.getHours() : `0${dateInstance.getHours()}`}:${dateInstance.getMinutes().toString().length > 1 ? dateInstance.getMinutes() : `0${dateInstance.getMinutes()}`}
          ${dateInstance.getDate()}/${dateInstance.getMonth().toString().length > 1 ? dateInstance.getMonth() : `0${dateInstance.getMonth()}`}/${dateInstance.getFullYear()}`;
}

util.copy = copy
util.listener = listener
util.requestAnimationFramePromise = requestAnimationFramePromise
util.transitionEndPromise = transitionEndPromise
util.delegate = delegate
util.removeClass = removeClass
util.hasClass = hasClass
util.addClass = addClass
util.debounce = debounce
util.dump = dump
util.Lazy = Lazy
util.sleep = sleep
util.humanReadableTime = humanReadableTime
util.getFullTimeDigits = getFullTimeDigits
util.getDayName = getDayName
util.getMonthName = getMonthName
util.quickSort = quickSort
util.call = call
util.withGracefulUnmount = withGracefulUnmount
util.ScrollRestortion = ScrollRestortion
util.getTabTime = getTabTime
util.parseMustache = parseMustache
util.metaContent = metaContent
util.formatedTime = formatedTime

export default util