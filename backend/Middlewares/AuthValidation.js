const signupValidation = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400)
            .json({ message: 'name, email, and password are all required', success: false });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400)
            .json({ message: 'email and password are all required', success: false });
    }
    next();
};

module.exports = { signupValidation, loginValidation };
