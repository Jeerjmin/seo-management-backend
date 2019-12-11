import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { IssueType } from './IssueType'

@Entity({ name: 'issues' })
export class IssueEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() ownerId: number
  @Column({ enum: IssueType }) type: string
  @Column({ nullable: true }) imageSrc: string
  @Column() title: string
  @Column({ nullable: true }) description: string
  @Column() seoScore: number
  @Column() seoIssues: number
  @CreateDateColumn() createdAt: Date
}
