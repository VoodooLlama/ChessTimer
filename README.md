ChessTimer
==============

/js/timer.js
--------------
Contains a generic Timer module which provides the basic timer actions utilized in the chess timer. After each interval of time, it updates the time property by the interval, which is assumed to be a value equal to a power of ten. The timer is assumed to be a countdown timer, but could easily count up given a negative interval.  If this were to be used in a library, I'd likely build an adapter on top of this which provided separate generic countdown and counting timers without utilizing an unintuitive negative interval parameter.

/js/chess-timer.js
--------------
Contains a ChessTimer module which provides the chess timer actions such as switching between the timers, maintaining the timer state, and resetting both timers when one reaches zero. This module relies on the Timer module described above for the basic actions. An interval is defined to check for the status of the timers to determine if there is a winner. This module has no knowledge of the DOM, providing clearly separated concerns. 

/js/index.js
--------------
Provides the browser functionality of the chess timer. This file is tightly coupled to the DOM structure, and implements the ChessTimer module API to provide timing functionality. This file also contains helper methods to work with browser inconsistencies and provide a consistent view for the timer value itself. This timer value, under the current formatting, supports only a MM:SS.mm view of the current time. Minor changes to the _toString function and timeInterval could provide any format, but that seemed superfluous in the current context. The assumption here is that timing to the hundredths place is sufficient, and that even if the timer is set to above an hour, a consisten view in minutes is still provided . Separate intervals are defined for the timer, and for updating the timer container DOM. This allows the timer itself to be set to an arbitrary interval, while minimizing the amount of expensive redraws.