// import { writable } from 'svelte/store';

// import { writable } from 'svelte/store';

// export function persisted<T>(key: string, initialValue: T) {
//   const store = writable<T>(initialValue);

//   const subscribe = () => {
//     const value = localStorage.getItem(key);
//     return value ? JSON.parse(value) : initialValue;
//   };

//   const set = (value: T) => {
//     localStorage.setItem(key, JSON.stringify(value));
//     store.set(value);
//   };

//   return {
//     subscribe,
//     set
//   };
// }

import { writable } from 'svelte/store';

function createCount() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0)
  };
}

export const count = createCount();

// export function persisted<T>(key: string, initialValue: T) {
//   const createStore = () => {
//     const { subscribe, set, update } = writable<T>(initialValue);

//     subscribe(val=>{
//         localStorage.setItem(key, JSON.stringify(val));
//     })

//     return {
//       subscribe,
//       update(val: T){

//       },
//       reset: () => set(0)
//     };
//   };

//   return createStore();
// }
