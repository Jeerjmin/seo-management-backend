import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({ name: 'reports' })
export class ReportEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() ownerId: number
  @CreateDateColumn() createdAt: Date
  @Column({ type: 'json' }) details
}
