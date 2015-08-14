/**
 * ChessTimer Module
 * @param {number} seed - Initial timer values
 * @param {number} interval - Interval at which to decrement timers
 */
var ChessTimer = (function(seed, interval) {
    var STATE = {
        0: 'OFF',
        1: 'BLACK',
        2: 'WHITE'
    },
    _currentState = STATE[0],
    _blackTimer,
    _whiteTimer,
    _winIntervalID;

    /**
     * Private function to check if the timer has run out
     * @private
     */
    function _resetWinInterval()
    {
        clearInterval(_winIntervalID);
        _winIntervalID = setInterval(function()
        {
            _validateTimer(getCurrentTime());
        }, interval);
    }

    /**
     * Private function to identify
     * @param {number} currTime - Current timer value
     * @private
     */
    function _validateTimer(currTime)
    {
        if(currTime <= 0)
        {
            switch(_currentState)
            {
                case STATE[1]:
                    console.log("White Wins!");
                    break;
                case STATE[2]:
                    console.log("Black Wins!");
                    break;
            }
            resetTimers();
        }
    }

    /**
     * Function to start either black or white timer
     * @param {string} state - Value representing timer color to start ("BLACK" or "WHITE")
     */
    function startTimer(state) {
        if (state !== _currentState) {
            switch (state) {
                case STATE[1]:
                    _whiteTimer.pause();
                    _blackTimer.start();
                    _currentState = STATE[1];
                    break;
                case STATE[2]:
                    _blackTimer.pause();
                    _whiteTimer.start();
                    _currentState = STATE[2];
                    break;
            }
            _resetWinInterval();
        }
    }

    /**
     * Function to instantiate individual timers
     */
    function initializeTimers() {
        //Instantiate Timers
        _blackTimer = new Timer(seed, interval);
        _whiteTimer = new Timer(seed, interval);
    }

    /**
     * Function to reset timer values
     */
    function resetTimers()
    {
        _blackTimer.reset();
        _whiteTimer.reset();
        clearInterval(_winIntervalID);
        _currentState = STATE[0];
    }

    /**
     * Function to return the time of the currently running timer
     * @returns {number} Time in ms
     */
    function getCurrentTime()
    {
        switch(_currentState)
        {
            case STATE[1]:
                return _blackTimer.getTime();
            case STATE[2]:
                return _whiteTimer.getTime();
            default:
                return seed;
        }
    }

    /**
     * Expose Public Interface
     */
    return {
        start: startTimer,
        init: initializeTimers,
        reset: resetTimers,
        getTime: getCurrentTime
    };
});
