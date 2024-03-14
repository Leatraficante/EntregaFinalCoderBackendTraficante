const passportStrategiesEnum = {
    JWT: 'jwt',
    NOTHING: 'na',
};

const accessRolesEnum = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    PUBLIC: 'PUBLIC',
    PREMIUM_USER: 'PREMIUM'
};

const EErrors = {
    ROUTING_ERROR: 1,
    INVALID_TYPE_ERROR: 2,
    USER_NOT_FOUND: 3,
    PRODUCT_NOT_FOUND: 4,
    INTERNAL_SERVER_ERROR: 5,
    DATABASE_ERROR: 6
};


export {
    passportStrategiesEnum,
    accessRolesEnum,
    EErrors
};
