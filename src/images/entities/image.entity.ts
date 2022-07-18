import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ImageUpload {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    originalName: string;

    @Column({ nullable: true })
    mimeType: string;

    @Column({ nullable: true })
    url: string;

    @Column({ nullable: true })
    target: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
