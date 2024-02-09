import Jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(401).send("אין לך הרשאת גישה למערכת")
    try {
        let user = Jwt.verify(token, process.env.JWT_SECRET);
        req.myUser = user;
        next();
    }
    catch (err) {
        return res.status(401).send("invalid token")
    }
}
export const authAdmin = (req, res, next) => {

    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(401).send("אין לך הרשאת גישה למערכת")
    try {
        let user = Jwt.verify(token, process.env.JWT_SECRET);
        req.myUser = user;
        if (user.role != "ADMIN")
            return res.status(403).send("נדרשת הרשאת מנהלת לפעולה זו")
        next();
    }
    catch (err) {
        return res.status(401).send("invalid token")
    }
}