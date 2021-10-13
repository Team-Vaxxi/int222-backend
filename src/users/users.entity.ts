import { Locations } from "src/locations/locations.entity";
import { Vaccines } from "src/vaccines/vaccines.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Users" })
export class Users {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    gender: string;

    @Column()
    address: string;

    @Column({ type: 'date'})
    dob: string;

    @Column()
    tel: string;

    @Column()
    idCard: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    isOrder: string;

    
    @OneToOne(() => Vaccines, { eager: true, onUpdate: 'CASCADE', onDelete: 'SET NULL'})
    @JoinColumn({ name: 'Vaccines_idVaccine', referencedColumnName: 'idVaccine'})
    vaccine?: Vaccines;

    @OneToOne(() => Locations, { eager: true, onUpdate: 'CASCADE', onDelete: 'SET NULL'})
    @JoinColumn({ name: 'Locations_idLocation', referencedColumnName: 'idLocation'})
    location?: Locations;



}