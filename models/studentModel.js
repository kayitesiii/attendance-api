const mysql = require('mysql');
// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'bks5ex1iniscdlux9mga-mysql.services.clever-cloud.com',
    user: 'u2g1plqiidert8m2',
    password: 'BSJ5fHxrIHtHfDmJBrbL',
    database: 'bks5ex1iniscdlux9mga'
});

// Function to get all students from the database
exports.getAllStudents = (callback) => {
    pool.query('SELECT * FROM students', (error, results, fields) => {
        if (error) {
            console.error('Error retrieving students:', error);
            callback(error, null);
            return;
        }

        callback(null, results);
    });
};

// Function to add a new student to the database
exports.addStudent = (id, fname, lname,reg_no,email, callback) => {
    pool.query('INSERT INTO students (id, firstname,lastname,reg_no,email ) VALUES (?, ?,?,?,?)', [id, fname, lname,reg_no,email , id], (error, results, fields) => {
        if (error) {
            console.error('Error adding student:', error);
            callback(error, null);
            return;
        }

        callback(null, 'Student added successfully');
    });
};
// Function to update a student in the database
exports.updateStudent = (id, firstname,lastname,reg_no,email, callback) => {
    pool.query('UPDATE students SET firstname = ?,lastname=?,reg_no=?,email=?  WHERE id = ?', [firstname, lastname,reg_no,email, id], (error, results, fields) => {
        if (error) {
            console.error('Error updating student:', error);
            callback(error, null);
            return;
        }

        callback(null, 'Student updated successfully');
    });
};

// Method to partially update a student
exports.partialUpdateStudent = (id, updatedFields, callback) => {
    // Construct the SQL query to update the student record
    let query = 'UPDATE students SET ';
    const values = [];
    
    // Iterate over the updatedFields object and build the SET clause of the query
    Object.keys(updatedFields).forEach((key, index) => {
        query += `${key} = ?`;
        values.push(updatedFields[key]);
        
        // Add comma if it's not the last field
        if (index < Object.keys(updatedFields).length - 1) {
            query += ', ';
        }
    });

    // Add the WHERE clause to specify the student ID
    query += ' WHERE id = ?';
    values.push(id);

    // Execute the query
    pool.query(query, values, (error, results, fields) => {
        if (error) {
            // If an error occurs, invoke the callback with the error
            callback(error);
            return;
        }

        // If the update is successful, invoke the callback with null for the error
        callback(null, 'Student updated successfully');
    });
};

// Function to delete a student from the database
exports.deleteStudent = (id, callback) => {
    pool.query('DELETE FROM students WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            console.error('Error deleting student:', error);
            callback(error, null);
            return;
        }

        callback(null, 'Student deleted successfully');
    });
};
