// import { io } from 'socket.io-client';

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = 'http://localhost:8080';

// export const socket = io(URL);

import { io } from 'socket.io-client'
export const socket = io('ws://localhost:8080')