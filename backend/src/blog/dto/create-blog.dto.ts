export class CreateBlogDto {
  readonly tag: string[];
  readonly title: string;
  readonly author: string;
  slug: string;
  readonly category: string;
  readonly description: string;
  readonly timestamp: Date;
  imageUrl: string;
}
