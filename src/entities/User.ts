import { Expose } from "class-transformer";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @Column()
  password: string;

  @Expose({name: "nameCustom"})
    nameCustom(): string {
      return `#${this.name}`
    }
  
  

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
