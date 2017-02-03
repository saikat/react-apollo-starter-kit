import minilog from 'minilog'
import rollbar from 'rollbar'

function isClient() {
  return typeof window !== 'undefined'
}

let logInstance = null

if (isClient()) {
  minilog.enable()
  logInstance = minilog('client')
  const existingErrorLogger = logInstance.error
  logInstance.error = (err) => {
    window.Rollbar.error(err)
    existingErrorLogger(err)
  }
} else {
  let enableRollbar = false
  if (process.env.NODE_ENV === 'production') {
    enableRollbar = true
    rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN)
    const options = {
      exitOnUncaughtException: false
    }
    rollbar.handleUncaughtExceptions(process.env.ROLLBAR_ACCESS_TOKEN, options)
  }

  minilog.suggest.deny(/.*/, process.env.NODE_ENV === 'development' ? 'debug' : 'debug')

  minilog.enable()
    .pipe(minilog.backends.console.formatWithStack)
    .pipe(minilog.backends.console)

  logInstance = minilog('backend')
  const existingErrorLogger = logInstance.error
  logInstance.error = (err) => {
    existingErrorLogger(err.stack ? err.stack : err)
    try {
      if (enableRollbar) {
        if (typeof err === 'object') {
          rollbar.handleError(err)
        } else if (typeof err === 'string') {
          rollbar.reportMessage(err)
        } else {
          rollbar.reportMessage('Got backend error with no error message')
        }
      }
    } catch (ex) {
      rollbar.reportMessage('Error converting message to rollbar.')
    }
  }
}

const log = logInstance
export default log
