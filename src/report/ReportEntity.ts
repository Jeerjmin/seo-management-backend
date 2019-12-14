import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { ReportDetailsEntity } from './ReportDetailsEntity'

@Entity({ name: 'reports' })
export class ReportEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() ownerId: number
  @CreateDateColumn() createdAt: Date
  @OneToOne(type => ReportDetailsEntity, { cascade: true, eager: true }) @JoinColumn() details: ReportDetailsEntity

  constructor(ownerId: number, details: any) {
    this.ownerId = ownerId
    this.details = details
  }
}
