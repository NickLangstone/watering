On Raspberry Pi  - getting node dev to run is a pain
https://github.com/creationix/nvm    bas script to determine the correct node and npm versions and installs them 
		wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.6/install.sh | bash
		export NVM_DIR="$HOME/.nvm"
		[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

npm install -g nodemon
run the app with 

nodemon   -- utility to monitor directory and rerun server as files change

------------ Install the GPIO library ----
https://www.npmjs.com/package/rpi-gpio    GPIO node module that supports async and onChange events from ports

npm install rpi-gpio

https://github.com/fivdi/onoff