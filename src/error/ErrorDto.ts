export class ErrorDto {
  constructor(
    private readonly status: number,
    private readonly message: string,
    private readonly externalMessage?: string,
  ) {}
}
