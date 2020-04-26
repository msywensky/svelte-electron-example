let handlers = {};

handlers['test'] = async () => {
	return 'success';
}

handlers['get-user'] = async ({ db, user_id }) => {
	const row = db.prepare('SELECT * FROM user WHERE id=?').get(user_id);

  	return row;
}

handlers['get-all'] = async({ db }) => {
	const rows = db.prepare('SELECT * FROM user').all();
	return rows;
}

handlers['account-activity-get-all'] = async({ db }) => {
	const rows = db.prepare('SELECT * FROM account_activity').all();
	return rows;
}

module.exports = handlers;
