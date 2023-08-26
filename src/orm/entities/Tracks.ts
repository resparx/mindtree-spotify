import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('tracks')
export class Track {
    @PrimaryGeneratedColumn({primaryKeyConstraintName: "track_id"})
    id: number;

    @Column({type: "varchar", length: 20, unique: true})
    isrc: string;

    @Column({ type: "varchar", length: 200})
    image_uri: string;

    @Column({type: 'varchar', length: 100})
    title: string;

    @Column({type: 'simple-array', nullable: true})
    artists: string[];
}