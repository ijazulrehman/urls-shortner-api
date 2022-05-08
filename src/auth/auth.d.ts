//

import { UserRole } from "src/user/user.enum";

export interface UserInfo {
    id: string,
    name: string,
    email: string
}

export interface AuthPayload extends UserInfo { }

export interface AuthResponse extends UserInfo {
    token: string
}