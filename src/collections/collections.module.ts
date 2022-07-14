import { Module } from "@nestjs/common";
import { CollectionsController } from "./collections.controller";
import { CollectionsService } from "./collections.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collection } from "./entities/collection.entity";
import { Users } from "src/users/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ImageUpload } from "src/images/entities/image.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Collection, Users, ImageUpload]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: "test",
        }),
    ],
    exports: [TypeOrmModule],
    controllers: [CollectionsController],
    providers: [CollectionsService],
})
export class CollectionsModule {}
