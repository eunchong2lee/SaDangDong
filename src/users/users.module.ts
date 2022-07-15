import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entities/user.entity";
import { Collection } from "src/collections/entities/collection.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtStragtegy } from "./jwt.stratege";
import { Item } from "src/items/entities/item.entity";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: "test",
        }),
        TypeOrmModule.forFeature([Users, Collection, Item]),
    ],
    exports: [TypeOrmModule, jwtStragtegy, PassportModule],
    controllers: [UsersController],
    providers: [UsersService, jwtStragtegy],
})
export class UsersModule {}
