import {PassportStrategy} from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secret123",
        })
    }

    validate({username, email} : {username: string, email: string}): {username: string, email: string} {
        return {username, email}
    }
}