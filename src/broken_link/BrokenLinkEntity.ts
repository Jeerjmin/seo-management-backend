import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({ name: 'broken-links' })
export class BrokenLinkEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() ownerId: number
  @Column() overallLinksCount: number
  @Column() pagesCount: number
  @Column('text', { array: true }) brokenLinks: string[]
  @CreateDateColumn() createdAt: Date
}
