import { Item } from "src/items/entities/item.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like extends Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isLike: boolean;

    @OneToOne((type) => Item, (item) => item.like)
    @JoinColumn({ name: "like" })
    item: Item;

    @ManyToOne((type) => User, (user) => user.like)
    @JoinColumn({ name: "like" })
    user: User;
}

@Entity()
export class Like_relation extends Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    likeCount: number;

    @OneToOne((type) => Item, (item) => item.like_relation)
    @JoinColumn({ name: "like_relation" })
    item: Item;
}
