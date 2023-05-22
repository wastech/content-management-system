export interface JwtPayload {
    sub: string;
    _id: string;
    name: string;
    email: string;
    roles: string[];
    iat?: number;
    exp?: number;
}
