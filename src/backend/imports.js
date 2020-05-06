const lineByLine = require('n-readlines');

function openFileDialog(dialog) {
    let options = {
        // See place holder 1 in above image
        title : "Import Account History", 
        
        // See place holder 2 in above image
        //defaultPath : "D:\\electron-app",
        
        // See place holder 3 in above image
        buttonLabel : "Import",
        
        // See place holder 4 in above image
        filters :[
         {name: 'CSV files', extensions: ['csv']},
         {name: 'Text files', extensions: ['txt']},
         {name: 'All Files', extensions: ['*']}
        ],
        properties: ['openFile']
       }
       
       //Synchronous
       file =  dialog.showOpenDialogSync( null, options)
       if (Array.isArray(file)) 
           return file[0];
       
       return null;
}

function importAccountActivity( db, file ) {
    //Run Date, Account, Action, Symbol, Security Description, Security Type,
    //Quantity, Price ($), Commission ($), Fees ($), Accrued Interest ($),
    //Amount ($), Settlement Date

//    const liner = new lineByLine('/Users/sywenm/Documents/stocks/Accounts_History.csv');
    const liner = new lineByLine(file);
    let line, activity;
 
    //console.log("about to delete all records");
    db.prepare('DELETE FROM account_activity').run();

    let count = 0;


    try {

        const stmt = db.prepare('INSERT INTO account_activity (account, activity_date, symbol, security_description, symbol_type,' +
        ' underlying_symbol, strike, expiration, action, quantity, price, commission, fees, amount, settlement_date)' +
        ' VALUES (@account, @activity_date, @symbol, @security_description, @symbol_type, @underlying_symbol, @strike, ' +
        ' @expiration, @action, @quantity, @price, @commission, @fees, @amount, @settlement_date)');

        while ( line = liner.next() ) {
            const l = line.toString('utf-8');
            if (( l > '') && (l.startsWith(" ")) )  {
                activity = l.split(",");
                stmt.run(getAccountActivityRecord(activity));
                count++;
                
            }
        }
    } catch (error) {
        return "Failed " + error;

    }

    return count;
}

function getAccountActivityRecord(activity) {
    let result = {};

    result.activity_date = activity[0].trim();
    result.account = activity[1].trim();
    result.action = getAccountActivityAction(activity[2].trim());
    activity[3] = activity[3].trim();

    if (activity[3].startsWith('-'))
      result.symbol = activity[3].substr(1).trim();
    else
      result.symbol = activity[3].trim();
    
    result.security_description = activity[4].trim();
    result.symbol_type = getAccountActivitySymbolType(activity[4].trim());


    if ( (result.symbol_type === 'Call') || (result.symbol_type === 'Put') ) {
        let parsed_symbol = parseOptionSymbol(activity[3]);
        result.strike = parsed_symbol.strike;
        result.expiration = parsed_symbol.expiration;
        result.underlying_symbol = parsed_symbol.underlying_symbol;
    } else {
        result.strike = null;
        result.expiration = null;
        result.underlying_symbol = null;
    }

    result.quantity = strToNum(activity[6]);
    result.price = strToNum(activity[7]);
    result.commission = strToNum(activity[8]);
    result.fees = strToNum(activity[9]);
    result.amount = strToNum(activity[11]);
    result.settlement_date = ("" + activity[12]).trim();

    return result;
}

function strToNum(text) {
    let t = ("" + text).trim();

    if (isNaN(t))
        return 0;
    else
        return Number(t);
}

function getAccountActivityAction(action_text) {
    if (action_text.startsWith('YOU BOUGHT OPENING '))
        return "Buy Open";
    
    if (action_text.startsWith('YOU BOUGHT CLOSING '))
       return "Buy Close";

    if (action_text.startsWith('YOU SOLD OPENING '))
       return "Sold Open";
   
    if (action_text.startsWith('YOU SOLD CLOSING '))
       return "Sold Close";

    if (action_text.startsWith('YOU BOUGHT '))
       return "Buy";

    if (action_text.startsWith('YOU SOLD '))
       return "Sold";

    if (action_text.startsWith('EXPIRED '))
       return "Expired";

    if (action_text.startsWith('INTEREST '))
       return "Interest";

    if (action_text.startsWith('REINVESTMENT '))
       return "Reinvestment";

    if (action_text.startsWith('DIVIDEND '))
       return "Dividend";

    return action_text;

}

function getAccountActivitySymbolType(security_description) {

    if (security_description.startsWith('PUT '))
        return "Put";

    if (security_description.startsWith('CALL '))
        return "Call";

    return security_description;
    
}

function parseOptionSymbol(symbol) {
    // ZM200424P155
    let result = {
        strike: 0,
        expiration: '',
        underlying_symbol: ''
    };
    let tmp = '';
    let i = 0;

    if (symbol.startsWith('-'))
        symbol = symbol.substr(1);
    
    console.log(symbol);
    do {
        tmp = symbol.substr(i,1);
        result.underlying_symbol += tmp;
        i++;

    } while (symbol.substr(i,1).match(/[A-Z]/i));

    result.expiration = symbol.substr(i+2,2) + "/" + symbol.substr(i+4,2) + "/20" + symbol.substr(i,2);
    result.strike = symbol.substr(i+7);

    return result;
    
}
module.exports = { openFileDialog, importAccountActivity }