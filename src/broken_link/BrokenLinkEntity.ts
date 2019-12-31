import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { BrokenLinkSourceType } from 'analyzer/broken_links/BrokenLinkSourceType'

@Entity({ name: 'broken-links' })
export class BrokenLinkEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() ownerId: number
  @Column() url: string
  @Column() origin: string
  @Column({ default: 'N/A' }) text: string
  @Column({ enum: BrokenLinkSourceType }) source: string
  @CreateDateColumn() createdAt: Date
}
