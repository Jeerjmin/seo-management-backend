import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({ name: 'raports' })
export class AnalyzerEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() ownerId: number
  @Column() @CreateDateColumn() createdAt: Date
  @Column({ type: 'json' }) details
}
