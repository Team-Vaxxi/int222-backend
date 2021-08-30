import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Locations" })
export class Locations {
    @PrimaryGeneratedColumn()
    idLocation: number;

    @Column()
    name: string;
}