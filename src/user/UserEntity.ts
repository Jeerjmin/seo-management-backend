import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() ownerName: string
  @Column() shopName: string
  @Column() originalDomain: string
  @Column() domain: string
  @Column() email: string
  @Column() @Exclude() accessToken: string
}
