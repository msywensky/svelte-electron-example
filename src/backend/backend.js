let backendHandlers = require('./backend-handlers');
let ipc = require('./backend-ipc');
let path = require('path');

let isDev, version;

if(process.argv[2] === '--subprocess'){
	const fs = require('fs');

  	isDev = false;
  	version = process.argv[3];

	const socketName = process.argv[4];
	const dbOriginPath = path.join(process.argv[5], 'database.db');
	const dbDestinyPath = path.join(process.argv[6], 'database.db');

	// If the database does NOT exist un the user data folder we copy our bundled database
	if(!fs.existsSync(dbDestinyPath)){
		console.log('Database file not found! Copying bundled database...');

		fs.copyFileSync(dbOriginPath, dbDestinyPath, (err) => {
			if(err) throw err;
			console.log('"' + dbOriginPath + '" copied to "' + dbDestinyPath + '"');
		});
	} else {
		console.log("using " + dbDestinyPath + " for databaser");
	
	}

	const db = require('better-sqlite3')(dbDestinyPath);

  	ipc.init(socketName, backendHandlers, db);
}else{
	const { ipcRenderer, remote } = require('electron');
	const dbPath = __dirname + '/../../database.db';
	const db = require('better-sqlite3')(dbPath, {verbose: console.log});

	console.log("using database here " + dbPath);

	isDev = true;
  	version = remote.app.getVersion();

  	ipcRenderer.on('set-socket', (event, { name }) => {
    	ipc.init(name, backendHandlers, db);
  	});
}

console.log(version, isDev);
