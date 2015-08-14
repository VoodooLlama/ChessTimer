/**
 * Index File to Associate DOM Elements to ChessTimer API
 * @param document - Pass in current document object model
 */
(function(document){
    //Set initial variables
    var seed              = 240000, //4 * (1000 * 60) minutes
        timeInterval      = 10,
        drawInterval      = 10,
        chessTimer        = new ChessTimer(seed, timeInterval),
        drawIntervalID,
        blackTimerDisplay = document.getElementById('black-timer'),
        whiteTimerDisplay = document.getElementById('white-timer'),
        blackButton       = document.getElementById('black-button'),
        whiteButton       = document.getElementById('white-button');

    /**
     * Initialize and setup page elements
     */
    function initialize() {

        chessTimer.init();

        _bindEvents();

        _resetTimerDisplay();
    }

    /**
     * Bind Button events to black and white timer start buttons and reset button
     * @private
     */
    function _bindEvents() {

        blackButton.addEventListener('click', function () {
            chessTimer.start('BLACK');
            _displayTime(blackTimerDisplay);
            blackButton.disabled = true;
            whiteButton.disabled = false;
        });

        document.getElementById('white-button').addEventListener('click', function () {
            chessTimer.start('WHITE');
            _displayTime(whiteTimerDisplay);
            whiteButton.disabled = true;
            blackButton.disabled = false;
        });

        document.getElementById('reset-button').addEventListener('click', function () {
            chessTimer.reset();
            _resetTimerDisplay();
        });
    }

    /**
     * Reset timer displays to initial seed value
     * @private
     */
    function _resetTimerDisplay() {
        clearInterval(drawIntervalID);

        //Support innerText and textContent properties
        _setText(blackTimerDisplay, _toString(seed));
        _setText(whiteTimerDisplay, _toString(seed));

        whiteButton.disabled = false;
        blackButton.disabled = false;
    }

    /**
     * Function to display current timer's current time
     * @param displayElement
     * @private
     */
    function _displayTime(displayElement) {
        clearInterval(drawIntervalID);
        drawIntervalID = setInterval(function () {
            var currTime = chessTimer.getTime()
            _setText(displayElement, _toString(currTime));
            if (currTime === 0 || currTime === seed) {
                _resetTimerDisplay();
            }
        }, drawInterval);
    }

    /**
     * Helper function to support updating text in all browsers
     * @param {HTMLElement} displayElement - Element to update the inner text
     */
    function _setText(displayElement, text)
    {
        if(typeof displayElement.innerText !== "undefined")
        {
            displayElement.innerText = text;
        }
        else
        {
            displayElement.textContent = text;
        }
    }

    /**
     * Helper function to convert time in ms to MM:SS.mm
     * @param {number} currentTime - Time in ms
     * @returns {string} Current time in format MM:SS.mm
     * @private
     */
    function _toString(currentTime)
    {
        var milliseconds = (currentTime % 1000 / 10),
            seconds      = Math.floor((currentTime / 1000) % 60),
            minutes      = Math.floor((currentTime / 1000) / 60);

        //Add zero padding to milliseconds/seconds if necessary
        seconds = seconds < 10 ? "0" + seconds : seconds;
        milliseconds = milliseconds < 10 ? milliseconds += "0" : milliseconds;

        return minutes + ":" + seconds + "." + milliseconds;
    }

    initialize();

})(document);