export function isAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

export function isSupervisor(req, res, next) {
    if (req.user.role === 'operario con permisos' || req.user.role === 'admin') {
        next();
    } else {
        res.redirect('/error');
    }
}

export function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.redirect('/error');
    }
}