illumination.pi
===============

A simple Raspberry Pi application for controlling lamps in my house.

To enable SMS listening functionality, simply find line 13:
 `var client = new twilio.RestClient('', '');` and add your Twilio account SID and Auth Token.

Necessary Hardware
------------------

* Raspberry Pi Model-B
* Woods 13569 Wireless Remote (3-pack)
* RPi GPIO Ribbon Cable
* Soldering Iron and thin-gauge solder
* 2N2222A Transistors (6)
* Patience

LICENSE
=======
The MIT License (MIT)

Copyright (c) 2014 Will Ricketts

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
