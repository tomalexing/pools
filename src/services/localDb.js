var localDB = {};

export function clearLocalDB() {
  //localDB = {};
}

function prepareDb_() {
  return new Promise(function(resolve, reject) {
    try {
     // throw new Error('test Safari embed error');
      if (window.indexedDB) {
        let req = window.indexedDB.open('db', 1);
      
        if (req) {
          req.onerror = (event) => reject(event);
          req.onsuccess = function(event) {
            let db = event.target.result;
            resolve(db);
          };
          req.onupgradeneeded = function(event) {
            let db = event.target.result;
            db.createObjectStore('kv');
          };
        } else {
          reject('IndexedDB open failed.');
        }
      } else {
        reject('IndexedDB not available.');
      }

    } catch(e){
      resolve( localDB );
    }
  });
}

/**
 * Returns a promise for loading a value from our key-value store on
 * IndexedDB.
 * Falls back to local storage if IndexedDB is unavailable.
 *
 * @param {string} key The key-value pair key.
 * @return {Promise.<Object>} Promise to the key-value pair value.
 */
export function loadFromStore(key) {
  return new Promise(function(resolve, reject) {
    if (window.indexedDB) {
      let dbPromise = prepareDb_();
      dbPromise.then((db) => {
        if(typeof db.transaction == 'function'){

          db.onerror = (event) => reject(event);
          let get = db.transaction('kv', 'readonly').objectStore('kv').get(key);
          get.onsuccess = (event) => {
            if (event.target.result !== undefined) {
              resolve(event.target.result);
            } else {
              reject();
            }
          };

        }else{
          if(localDB[key]){
            resolve(localDB[key]);
          }else{
            reject();
          }
        }

      });
    } else {
      resolve(JSON.parse(localStorage.getItem(key)));
    }
  });
}

/**
 * Returns a promise for loading  all values from our key-value store on
 * IndexedDB.
 * Falls back to local storage if IndexedDB is unavailable.
 *
 * @return {Promise.<Object>} Promise to the key-value pair value.
 */
export function loadAllFromStore() {
  return new Promise(function(resolve, reject) {
    if (window.indexedDB) {
      let dbPromise = prepareDb_();
      dbPromise.then((db) => {
        if(typeof db.transaction == 'function'){

          db.onerror = (event) => reject(event);
          let keys = db.transaction('kv', 'readonly').objectStore('kv').getAllKeys();
          keys.onsuccess = (event) => {
            if (event.target.result !== undefined) {
              keys = event.target.result;
            
              let data = db.transaction('kv', 'readonly').objectStore('kv').getAll();
              data.onsuccess = (event) => {
                if (event.target.result !== undefined) {
                  let result = {};
                  for ( let i = 0; i < keys.length; i++){
                    result[keys[i]] = event.target.result[i];
                  }
                  resolve(result);
                } else {
                  reject(new Error(`Datas not found`));
                }
            };

            } else {
              reject(new Error(`Keys not found`));
            }
          };
        }else{
              resolve(getlocalDB());
        }

      });
    } else {

      resolve( allFromLocalStorage() );
    }
  });
}

function allFromLocalStorage() {
  var archive = {}, // Notice change here
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      archive[ keys[i] ] = localStorage.getItem( keys[i] );
  }

  return archive;
}


/**
 * Returns a promise for saving a value onto our key-value store on IndexedDB.
 * Falls back to local storage if IndexedDB is unavailable.
 *
 * @param {string} key The key-value pair key.
 * @param {Object} value The key-value pair value.
 * @return {Promise} Promise to storage success.
 */
export function saveToStore(key, value) {
  return new Promise(function(resolve, reject) {
    if (window.indexedDB) {
      let dbPromise = prepareDb_();
      dbPromise.then((db) => {
        if(typeof db.transaction == 'function'){

          db.onerror = (event) => reject(event);
          let put = db.transaction('kv', 'readwrite')
              .objectStore('kv').put(value, key);
          put.onsuccess = () => resolve();

        }else{
          localDB[key] = value;
          resolve();
        }
      });
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    }
  });
}

/**
 * Returns a promise for saving a value onto our key-value store on IndexedDB.
 * Falls back to local storage if IndexedDB is unavailable.
 *
 * @param {string} key The key-value pair key.
 * @param {Object} value The key-value pair value.
 * @return {Promise} Promise to storage success.
 */
export function saveAllToStore(data) {
  if(!data) return Promise.resolve()
  return new Promise(function(resolve, reject) {
    if (window.indexedDB) {
        let savePromise = []; 
        clearAll().then(_ => {
          for( let [key, val] of Object.entries(data)){
            savePromise.push(saveToStore(key, val))
          }
          Promise.all(savePromise).then(_ => resolve(data));
        
        })
    } else {
      for(let [key, val] in Object.entries(data)){
        localStorage.setItem(key, JSON.stringify(val));
      }
      resolve();
    }
  });
}

export function saveAllToStoreMerge(data) {
  if(!data) return Promise.resolve()
  return new Promise(function(resolve, reject) {
    if (window.indexedDB) {

        let savePromise = []; 
       
        for( let [key, val] of Object.entries(data)){
          savePromise.push(saveToStore(key, val))
        }
        Promise.all(savePromise).then(_ => resolve(data));
      
    } else {

      for(let [key, val] in Object.entries(data)){
        localStorage.setItem(key, JSON.stringify(val));
      }
      resolve();
    }
  });
}

export function clearAll(){

  return new Promise(function(resolve, reject) {
    if (window.indexedDB) {
      let dbPromise = prepareDb_();
      dbPromise.then((db) => {
        if(typeof db.transaction == 'function'){
          db.onerror = (event) => reject(event);
          let clear = db.transaction('kv', 'readwrite').objectStore('kv').clear();
          clear.onsuccess = () => resolve();
        }else{
          localDB = {};
          resolve()
        }
      });
    } else {
      localStorage.clear();
      resolve();
    }
  })
}


export function getlocalDB(){
  return localDB
}


export function getlocalDBBtoa(){
  return new Promise((resolve, reject) => {
    if( Object.keys(localDB).length > 0 ) {
      resolve(window.btoa(JSON.stringify(localDB)))
    } else{
      loadAllFromStore().then(backup => resolve(window.btoa(JSON.stringify(backup))))
    }

  });
   
}

window.localDB = localDB