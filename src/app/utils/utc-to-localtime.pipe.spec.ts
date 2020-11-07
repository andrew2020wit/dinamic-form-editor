import { UtcToLocalTimePipe } from './utc-to-localtime.pipe';

describe('UtcToLocaltimePipe', () => {
  it('create an instance', () => {
    const pipe = new UtcToLocalTimePipe();
    expect(pipe).toBeTruthy();
  });
});
