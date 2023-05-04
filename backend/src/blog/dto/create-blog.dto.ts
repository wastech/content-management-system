export class CreateBlogDto {
  readonly tag: string[];
  readonly title: string;
  readonly author: string;
  readonly slug: string;
  readonly description: string;
  readonly timestamp: Date;
  readonly imageUrl: string;
}
