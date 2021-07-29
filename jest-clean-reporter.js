const { DefaultReporter } = require('@jest/reporters')
const { clearLine } = require('jest-util')

class CondoReporter extends DefaultReporter {
    constructor (globalConfig, options) {
        super(globalConfig)
        this._globalConfig = globalConfig
        this._options = options
    }
    onTestResult (test, testResult, aggregatedResults){
        this.testFinished(test.context.config, testResult, aggregatedResults)
        if (!testResult.skipped) {
		  this.printTestFileHeader(
                testResult.testFilePath,
                test.context.config,
                testResult,
		  )
        }
        this.forceFlushBufferedOutput()
    }

    onRunComplete (test, results) {
        this.forceFlushBufferedOutput()
        this._status.runFinished()
        process.stdout.write = this._out
        process.stderr.write = this._err
        clearLine(process.stderr)
    }
}

module.exports = CondoReporter