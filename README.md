# TestCentre (Javascript version)
TestCentre is a portable ping/traceroute tool design for Cisco IOS devices

  - Provides real-time output for ping/traceroute commands without having to use a terminal client
  - Supports both telnet and ssh access
  - VRF-aware and multiline telnet capable

Live demonstration available on [Youtube]

### Version
1.0

### Installation

1. Download **dist** directory
```sh
git clone git://github.com/mkashin/test5
```
2. Install Sails.js as desribed on their website [Sails]
3. From the cloned directory do 
```sh
sails lift
```
4. Login as admin user (default password is admin)
5. Create new Devices from *Device* tab
6. Switch to *Testing* tab and select *Source* and *Destination* device pairs


[YOUTUBE]:http://youtube.com/
[SAILS]: http://sailsjs.org/#!/getStarted
