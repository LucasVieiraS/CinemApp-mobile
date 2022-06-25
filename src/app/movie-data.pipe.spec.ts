import { MovieDataPipe } from './movie-data.pipe';

describe('MovieDataPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieDataPipe();
    expect(pipe).toBeTruthy();
  });
});
