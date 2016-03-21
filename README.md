# lcars-sonos

# Setup
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

# CORS
- Change "sonos-http-api.js" in nodesonos/lib folder. Add the following lines to requestHandler function (just above "res.end();"):
    - res.setHeader("Access-Control-Allow-Origin", "*");
    - res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");