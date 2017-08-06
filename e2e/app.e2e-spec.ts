import { Shift2Page } from './app.po';

describe('shift2 App', () => {
  let page: Shift2Page;

  beforeEach(() => {
    page = new Shift2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
