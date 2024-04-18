export const BASE_URL = "http://192.168.10.108:3000/api"
// export const BASE_URL = "http://192.168.10.109:3000/api" 
// export const BASE_URL = "http://192.168.202.153:3000/api" 
//http://192.168.10.109:3000

export const AUTH = {
    REGISTER: "/user/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
}

export const MEDIA={
    SELF: BASE_URL.concat("/media/self")
}

export const COMMENT ={
    SELF: "/comment/self",
    CREATE: "/comment/create",
    SEARCH: "/comment/search",
    UPDATE: "/comment/update",
    DELETE: "/comment/delete",
    LIKE: "/comment/like",
    UNLIKE: "/comment/like",
}

export const COMMENT_POST ={
    SELF: "/comment-post/self",
    CREATE: "/comment-post/create",
    SEARCH: "/comment-post/search",
    UPDATE: "/comment-post/update",
    DELETE: "/comment-post/delete",
    LIKE: "/comment-post/like",
    UNLIKE: "/comment-post/like",
}

export const DIARY ={
    SELF: "/diary/self",
    CREATE: "/diary/create",
    SEARCH: "/diary/search",
    UPDATE: "/diary/update",
    DELETE: "/diary/delete",
}

export const GARDEN_INFO ={
    SELF: "/garden-info/self",
    CREATE: "/garden-info/create",
    SEARCH: "/garden-info/search",
    UPDATE: "/garden-info/update",
    DELETE: "/garden-info/delete",
    UPDATE_COVER: "garden-info/update-cover"
}

export const LAND ={
    SELF: "/land/self",
    CREATE: "/land/create",
    SEARCH: "/land/search",
    UPDATE: "/land/update",
    DELETE: "/land/delete",
    UPDATE_IMAGE: "land/update-image"
}

export const POST ={
    SELF: "/post/self",
    CREATE: "/post/create",
    SEARCH: "/post/search",
    UPDATE: "/post/update",
    DELETE: "/post/delete",
    LIKE: "/post/like",
    UNLIKE: "/post/like",
}

export const STATUS ={
    SELF: "/status/self",
    CREATE: "/status/create",
    SEARCH: "/status/search",
    UPDATE: "/status/update",
    DELETE: "/status/delete",
    LIKE: "/status/like",
    UNLIKE: "/status/like",
}

export const TREE ={
    SELF: "/tree/self",
    CREATE: "/tree/create",
    SEARCH: "/tree/search",
    UPDATE: "/tree/update",
    DELETE: "/tree/delete",
}

export const USER_INFO = {
    SELF: "/user-info/self",
    CREATE: "/user-info/create",
    SEARCH: "/user-info/search",
    UPDATE: "/user-info/update",
    DELETE: "/user-info/delete",
    UPDATE_AVATAR: "user-info/update-avata"
}