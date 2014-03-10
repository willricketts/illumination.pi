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
