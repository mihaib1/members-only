require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const userQueries = new db.UserQueries();

class ControllerActions {
    createUser = async function(userData){
        try{
            let existingUser = await checkForExistingUser(userData.email);
            if(!existingUser){
                let processedData = await processUserData(userData);
                if(processedData.isSuccess){
                    let newId = await userQueries.createUser(processedData.userData);
                    return newId;
                } else {    
                    console.log("fail la procesarea datelor.")
                    return processedData;
                }
            } else {
                return {
                    isSuccess: false,
                    message: `User with email ${userData.email} already exists!`
                };
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
    const stringFields = ['first_name', 'last_name', 'email', 'secret'];
    const secureFields = ['password', 'confirm_password'];
    const processed = {...userData};

    for(const field of stringFields){
        if(processed[field] !== null && typeof processed[field] == "string"){
            processed[field] = processed[field].trim();
        }
    }

    processed.membership_status = false;
    processed.admin = false;

    if(processed.password == processed.confirm_password){
        const hashedPassword = await hashPassword(processed.password);
        processed.password = hashedPassword;
        processed.confirm_password = hashedPassword;
    } else {
        processingResult.errorMessage = `Password and password confirmation fields must be identical!`;
        return processingResult;
    }

    if(processed.secret == process.env.SECRET_PASSCODE){
        processed.membership_status = true;
    } else if (processed.secret == process.env.ADMIN_PASSCODE){
        processed.membership_status = true;
        processed.admin = true;
    }

    processed.full_name = processed.first_name + " " + processed.last_name;
    console.log("=== Finished Processing User Data ===");
    processingResult.isSuccess = true;
    processingResult.userData = processed;
    return processingResult;
}

async function hashPassword(password){
    let hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function checkForExistingUser(email){
    console.log("checkForExistingUser email = " + email);
    if(email){
        const user = userQueries.getUserDetailsByEmail(email);
        if(user && user.length > 0){
            console.log('return true')
            return true;
        } else {
            console.log("return false")
            return false;
        }
        
    } else {
        console.log("nu a primit email");
        return {
            isSuccess: false,
            message: "Email is required for verification!"
        }
    }
}

module.exports = {
    ControllerActions
}
