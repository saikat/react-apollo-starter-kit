import minilog from 'minilog'
import rollbar from 'rollbar'
let enableRollbar = false
if (process.env.NODE_ENV === 'production') {
  enableRollbar = true
  rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN)
}

minilog.suggest.deny(/.*/, process.env.NODE_ENV === 'development' ? 'debug' : 'debug')

minilog.enable()
  .pipe(minilog.backends.console.formatWithStack)
  .pipe(minilog.backends.console)

const log = minilog('backend')
const existingErrorLogger = log.error
log.error = (err) => {
  if (enableRollbar) {
    if (typeof err === 'object') {
      rollbar.handleError(err)
    } else if (typeof err === 'string') {
      rollbar.reportMessage(err)
    } else {
      rollbar.reportMessage('Got backend error with no error message')
    }
  }
  existingErrorLogger(err ? err.stack : err)
}
export default log
