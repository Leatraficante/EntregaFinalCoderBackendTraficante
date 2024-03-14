import passport from 'passport';
import jwt from 'passport-jwt';
import { passportStrategiesEnum } from './enums.js';
import usersModel from '../dao/DBManager/models/users.model.js';
import configs from './configs.js';

const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const initPassport = () => {
    passport.use(passportStrategiesEnum.JWT, new JWTStrategy({
        jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: configs.privateKeyJwt
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById(id);
        done(null, user);
    })

};

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token;
};

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, function (err, user, info) {
            if (err) {
                console.error('Error en autenticación:', err);
                return next(err);
            }

            if (!user) {
                const errorMessage = info.message ? info.message : 'Usuario no autenticado.';
                console.error('Error de autenticación:', errorMessage);
                return res.status(401).json({ status: 'error', error: errorMessage });
            }

            req.user = user;
            next();
        })(req, res, next);
    };
};




export { initPassport, passportCall }


