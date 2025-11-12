const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const userQueries = new db.UserQueries()

class ControllerActions {
    createUser = async function(userData){
        try{
            let processedData = await processUserData(userData);
            if(processedData.isSuccess){
                let newId = await userQueries.createUser(processedData.userData);
                return newId;
            } else {    
                console.log("fail la procesarea datelor.")
                return processedData;
            }
            
            
        } catch(error){
            console.error(error);
        }
        
    }
}

async function processUserData(userData){
    console.log("=== Processing User Data ===");
    let processingResult = {
        isSuccess : false
    }
    const stringFields = ['first_name', 'last_name', 'email'];
    const secureFields = ['password', 'confirm_password'];
    const processed = {...userData};

    for(const field of stringFields){
        if(processed[field] !== null && typeof processed[field] == "string"){
            processed[field] = processed[field].trim();
        }
    }

    if(processed.password == processed.confirm_password){
        const hashedPassword = await hashPassword(processed.password);
        processed.password = hashedPassword;
        processed.confirm_password = hashedPassword;
    } else {
        processingResult.errorMessage = `Password and password confirmation fields must be identical!`;
        return processingResult;
    }

    processed.full_name = processed.first_name + " " + processed.last_name;
    processed.membership_status = true;
    processed.admin = true;
    console.log("=== Finished Processing User Data ===");
    processingResult.isSuccess = true;
    processingResult.userData = processed;
    return processingResult;
}

async function hashPassword(password){
    let hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

module.exports = {
    ControllerActions
}
