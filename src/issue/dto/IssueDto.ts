export class IssueDto {
  constructor(
    private readonly ownerId: number,
    private readonly type: string,
    private readonly imageSrc: string,
    private readonly title: string,
    private readonly description: string,
    private readonly createdAt: Date,
  ) {}
}
