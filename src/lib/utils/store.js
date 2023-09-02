import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let localUser = {};

if (browser) {
  if (localStorage.getItem('user') != '{}' && localStorage.getItem('user') != 'null') {
    localUser = JSON.parse(localStorage.getItem('user'));
  }
}

export const user = writable(localUser);

user.subscribe((value) => {
  if (browser) localStorage.setItem('user', JSON.stringify(value));
});