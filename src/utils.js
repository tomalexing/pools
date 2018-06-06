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
      this.load(nextProps)
    }
  }

  load(props) {
    try {
      
    if(typeof props.load  === 'string'){
      (() => import(`${props.load}`))().then((src) => {
        if(this._isMounted)
        this.setState({src, loaded:true})
        if(typeof props.loaded == 'function')
        props.loaded()
      })

      return
    } 

    props.load().then((src) => {
      if(this._isMounted)
      this.setState({src, loaded:true})
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


export const roundeWithDec = (num) => {
  return Math.floor(num) + Math.floor(num % 1 * 100) / 100;
}

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
export default util