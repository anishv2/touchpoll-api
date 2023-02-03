const CONSTANTS = {
    ROUTES: {
        SIGNIN: '/user/signin',
        REGISTER: '/user/register',
        ALL_POLLS: '/admin/manage/polls',
        CREATE_POLL: '/admin/manage/create-poll',
        DELETE_POLL: '/admin/manage/delete/:id',
        EDIT_POLL: '/admin/manage/edit/:id',
        USER_POLL:'/user/poll/:id',
        SUBMIT_POLL: '/submit/poll/:id',
        CHANGE_PWD: '/admin/account/profile/change-password',

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