const imports = require('./imports');
const { dialog } = require('electron').remote

let handlers = {};

handlers['test'] = async () => {
	return 'success';
}

handlers['get-user'] = async ({ db, user_id }) => {
	const row = db.prepare('SELECT * FROM user WHERE id=?').get(user_id);

  	return row;
}

handlers['account-activity-all'] = async({ db }) => {
	const rows = db.prepare('SELECT * FROM account_activity').all();
	return rows;
}

handlers['account-activity-get-all'] = async({ db }) => {
	const rows = db.prepare('SELECT * FROM account_activity').all();
	return rows;
}

handlers['account-activity-dates'] = async( { db }) => {
	const rows = db.prepare('SELECT DISTINCT activity_date from account_activity ORDER BY activity_date desc').all();
	return rows;
}

handlers['account-activity-symbols'] = async( { db }) => {
	const rows = db.prepare('SELECT DISTINCT symbol, activity_date from account_activity GROUP BY symbol, activity_date ORDER BY symbol ').all();
	return rows;
}

handlers['account-activity-import'] = async( { db } ) => {
	console.log(dialog)
	csvFile = imports.openFileDialog(dialog)
	if (csvFile)
		return imports.importAccountActivity(db, csvFile);
	
	return 0;
}



module.exports = handlers;
