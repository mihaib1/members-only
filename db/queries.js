const pool = require("./pool");

class MessageQueries {
    async getAllMessagesWithDetails() {
        const SQL = `SELECT msg.title, msg.text, msg.created_on, m.full_name FROM message AS msg
                    INNER JOIN member AS m ON msg.created_by = m.id
                    ORDER BY msg.created_on DESC;`;
        const {rows} = await pool.query(SQL);
        return rows;
    }

    async getOnlyMessages() {
        const SQL = `SELECT title, text FROM message ORDER BY created_on DESC;`;
        const { rows } = await pool.query(SQL);
        return rows;
    }

    async createMessage(data){
        const SQL = `INSERT INTO message (title, text, created_by, created_on, modified_on)
                    VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
        
        if(data){
            let insertData = [data.title, data.text, data.created_by, new Date(), new Date()];
            let insertRequest = await pool.query(SQL, insertData);
            return insertRequest.rows[0].id;
        }           
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

    async getUserDetailsByEmail(email){
        const SQL = `SELECT * FROM member WHERE email = $1`;
        if(email){
            const requestData = [email];
            let result = await pool.query(SQL, requestData);
            return result.rows[0];
        } return null;
    }

    async getUserById(id){
        const SQL = `SELECT * FROM member WHERE id = $1`;
        if(id){
            const requestData = [id];
            let result = await pool.query(SQL, requestData);
            return result.rows[0];
        }
        return null;
    }
}

module.exports = {
    MessageQueries,
    UserQueries
}