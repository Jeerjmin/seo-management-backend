export class UserCreateDto {
  constructor(
    private readonly shopName: string,
    private readonly ownerName: string,
    private readonly originalDomain: string,
    private readonly domain: string,
    private readonly email: string,
    private readonly accessToken: string,
  ) {}
}
