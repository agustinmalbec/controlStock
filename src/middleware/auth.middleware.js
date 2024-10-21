export function isAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

export function isSupervisor(req, res, next) {
    if (req.user.role === 'super') {
        next();
    } else {
        res.redirect('/');
    }
}

export function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.redirect('/');
    }
}