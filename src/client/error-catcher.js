import log from './log'

export default (error) => {
  if (!error) {
    log.error('Uncaught exception with null error object')
    return
  }

  log.error(error)

  setTimeout(() => {
    alert(`Whoops! Something went wrong. We\'re looking into it,
      but in the meantime please refresh your browser.`)
    document.location.reload(true)
  }, 2000)
}
