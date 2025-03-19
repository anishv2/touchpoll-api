const CONSTANTS = {
    ROUTES: {
        SIGNIN: '/auth/signin',
        REGISTER: '/auth/register',
        POLLS: '/polls',
        POLL:'/polls/:id',
        SUBMIT_POLL: '/submit/polls/:id',
        CHANGE_PWD: '/account/profile/change-password',
    },
    STATUS_CODES: {
        SUCCESS: 200,
        CREATE: 201,
        BAD_REQUEST:400,
        UNAUTHORIZE: 401,
        EXIST:403,
        RESOURCE_NOT_FOUND: 404,
        CONFLICT:409,
        SERVER_ERROR: 500
    },
    DEFAULT_LANG: 'en'
}

module.exports = CONSTANTS;