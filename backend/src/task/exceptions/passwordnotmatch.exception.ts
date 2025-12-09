import { NotFoundException } from "@nestjs/common";

export class PasswordNotMatchException extends NotFoundException {
    constructor() {
        super("password does not match")
    }
}