# LCARS SONOS Player
This is a player for the SONOS sound system based on the Star Trek LCARS design (https://en.wikipedia.org/wiki/LCARS). It is intended to run as a Windows 10 UWP application on a RaspberryPi 2 on Windows 10 Iot, but it is totally possible to just use it standalone as a normal Angular2 application in your browser. It is based on the following things:
- Angular 2.0
- node-sonos-http-api (https://github.com/jishi/node-sonos-http-api)
- RaspberryPi 2 (optional)
- Windows 10 Iot (optional)
- RaspberryPi touch display (optional)

![LCARS SONOS Player](http://timokorinth.de/wp-content/uploads/2016/03/LCARS_SONOS_Player.png

## Angular 2 application
You can use it without a RaspberryPi or Windows 10. To do this you just have to run "npm install" and then "npm start".

## Setup node-sonos-http-api
In order to communicate with your local SONOS system, it uses node-sonos-http-api (https://github.com/jishi/node-sonos-http-api). You have to download it first and do the following steps:
- Download latest version of node-sonos-http-api (https://github.com/jishi/node-sonos-http-api)
- Call "npm install --production" in root folder of node-sonos-http-api
- Start it as a node server: "node server.js"

## Setup a RaspberryPi 2 & Windows 10 Iot
- Download & Install latest version of Windows 10 IoT on Raspberry Pi
- Download ARM node.js (https://github.com/nodejs/node-chakracore) and extract
- Use Windows Explorer and go to "\\minwinpc\$c"
- Create folder on root "Nodejs" and copy both ARM node.js files to this folder
- Download latest version of node-sonos-http-api (https://github.com/jishi/node-sonos-http-api)
- Call "npm install --production" in root folder of node-sonos-http-api
- Create folder on Raspberry Pi (e.g. "Projects\nodesonos") and copy the entire content of node-sonos-http-api folder to this folder
- Start Windows PowerShell (as administrator)
- Start the WinRM service on your desktop to enable remote connections: "net start WinRM"
- Type "Set-Item WSMan:\localhost\Client\TrustedHosts -Value <machine-name or IP Address>"
- Now start a session with your Windows IoT Core device: "Enter-PSSession -ComputerName <machine-name or IP Address> -Credential <machine-name or IP Address or localhost>\Administrator"
- (Optional: Allow Node.exe to communicate through the firewall with the following command: "netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Nodejs\node.exe" enable=yes")
- Create task: "schtasks /create /tn "NodeJS" /tr "c:\Nodejs\node.exe c:\Projects\nodesonos\server.js" /sc onstart /ru SYSTEM"

## Enable CORS (Cross-Origin Resource Sharing)
- Change "sonos-http-api.js" in nodesonos/lib folder. Add the following lines to requestHandler function (just above "res.write(new Buffer(jsonResponse));"):
    - res.setHeader("Access-Control-Allow-Origin", "*");
    - res.setHeader("Access-Control-Request-Method", "POST, GET, OPTIONS");
    - res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control, pragma, expires");
- Change "req.method === 'GET'" in nodesonos/server.js to "req.method === 'GET' || req.method === 'OPTIONS'" (~line 66)