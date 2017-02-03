/* This is a function wrapper to correctly
 catch and handle uncaught exceptions in
 asynchronous code. */
import log from '../log'
export default (fn) =>
  (...args) =>
    fn(...args)
      .catch((ex) => {
        log.error(ex)
      })
