import minilog from 'minilog'

minilog.enable()
const log = minilog('client')
const existingErrorLogger = log.error
log.error = () => {
  window.Rollbar.error(...arguments)
  existingErrorLogger(...arguments)
}
export default log
