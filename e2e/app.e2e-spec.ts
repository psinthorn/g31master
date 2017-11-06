import { E31consolPage } from './app.po';

describe('e31consol App', () => {
  let page: E31consolPage;

  beforeEach(() => {
    page = new E31consolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
