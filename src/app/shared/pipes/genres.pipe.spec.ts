import { GenresPipe } from './genres.pipe';


describe('GenresPipe', () => {
  let pipe: GenresPipe;

  beforeEach(() => {
    pipe = new GenresPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform() should return null', () => {
    expect(pipe.transform([])).toBe(null);
  });

  it('transform() should map genres with capitalizeFirstLetter()', () => {
    const genres = ['adventure', 'drama'];
    spyOn(genres, 'map').and.callThrough();
    pipe.transform(genres);
    // tslint:disable-next-line
    expect(genres.map).toHaveBeenCalledWith(pipe['capitalizeFirstLetter']);
  });
});
