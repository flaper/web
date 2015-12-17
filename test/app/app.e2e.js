describe('App', function () {
  beforeEach(function () {
    browser.get('/');
  });


  it('should have <header>', function () {
    var subject = element(by.deepCss('app /deep/ header')).isPresent();
    var result = true;
    expect(subject).toEqual(result);
  });

  it('should have <main>', function () {
    var subject = element(by.deepCss('app /deep/ main')).isPresent();
    var result = true;
    expect(subject).toEqual(result);
  });
});
