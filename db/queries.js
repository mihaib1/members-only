const pool = require("./pool");
const bcrypt = require("bcryptjs");

class MessageQueries {
    async getAllMessagesWithDetails() {
        const SQL = `SELECT * FROM message ORDER BY created_on DESC;`;
        const {rows} = await pool.query(SQL);
        return rows;
    }

    async getOnlyMessages() {
        const SQL = `SELECT title, text FROM message ORDER BY created_on DESC;`;
        const { rows } = await pool.query(SQL);
        return rows;
    }
}

class UserQueries {
    async createUser(userData){
        const SQL = `INSERT INTO member (email, password, first_name, last_name, full_name, membership_status, admin, created_on, modified_on) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`
        if(userData){
            const insertData = [userData.email, userData.password, userData.first_name, userData.last_name, userData.full_name, userData.membership_status, userData.admin, new Date(), new Date()];
            let insertRequest = await pool.query(SQL, insertData);
            return insertRequest.rows[0].id;
        } 
        return false;
    }
}

module.exports = {
    MessageQueries,
    UserQueries
}