const JWT = require("jsonwebtoken");

//Password not hashed for showcase purposes only
const users = [
    {"username": "testowner", "password": "own_password", "role": "owner"},
    {"username": "testemployee", "password": "emp_password", "role": "employee"}
];

exports.loginUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).json({ message: "Username is incorrect" });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Password is incorrect" });
    }

    // Sign a JWT token and pass the username and role as the payload, valid for one hour only
    const token = JWT.sign({ username: user.username, role: user.role }, 'secret', { expiresIn: 60 * 60 });

    // Send the token as the response
    res.status(200).json({ token });
}


