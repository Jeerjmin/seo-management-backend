import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { IssueType } from './IssueType'

@Entity({ name: 'issues' })
export class IssueEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() ownerId: number
  @Column({ enum: IssueType }) type: string
  @Column() imageSrc: string
  @Column() title: string
  @Column() description: string
  @CreateDateColumn() createdAt: Date
}
