import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Clinic {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}

export default Clinic;
