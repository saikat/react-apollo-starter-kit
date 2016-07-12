import minilog from 'minilog'

minilog.enable()
const log = minilog('client')
const existingErrorLogger = log.error
log.error = (err) => {
  window.Rollbar.error(err)
  existingErrorLogger(err)
}
export default log
