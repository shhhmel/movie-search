import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'genres'
})
export class GenresPipe implements PipeTransform {

  transform(genres: string[]): string {
    if (!genres || !genres.length) { return null; }
    return genres.map(this.capitalizeFirstLetter).join(', ');
  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

}
