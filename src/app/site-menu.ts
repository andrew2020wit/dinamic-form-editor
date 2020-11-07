export interface ILink {
  name: string;
  link: string;
}

export const menuList: ILink[] = [
  { name: 'Home', link: '/' },
  { name: 'Create Form', link: '/edit-page' },
  { name: 'TestPage', link: '/test-page' },
  { name: 'About', link: '/about' },
];
