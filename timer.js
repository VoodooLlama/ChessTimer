/**
 * Generic Countdown Timer Module
 * @param {number} seed - Starting Time (ms)
 * @param {number} interval - Interval at which the timer is decremented
 */
var Timer = (function(seed, interval) {
    var _currentTime = seed,
    _intervalID;

    /**
     * Start the timer, begin counting down
     */
    function startTimer()
    {
        _intervalID = setInterval(function()
        {
            _currentTime -= interval;
            if(_currentTime <= 0)
            {
                clearInterval(_intervalID);
            }
        }, interval);
    }

    /**
     * Pause the timer, halt counting down
     */
    function pauseTimer()
    {
        clearInterval(_intervalID);
    }

    /**
     * Reset timer to initial seed value
     */
    function resetTimer()
    {
        clearInterval(_intervalID);
        _currentTime = seed;
    }

    /**
     * Accessor for Current Time
     * @returns {number} Current Time
     */
    function getCurrentTime()
    {
        return _currentTime;
    }

    /**
     * Expose Public Interface
     */
    return {
        start:   startTimer,
        pause:   pauseTimer,
        reset:   resetTimer,
        getTime: getCurrentTime
    };
});