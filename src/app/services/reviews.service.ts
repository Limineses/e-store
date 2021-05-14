import { DatabaseService } from './database.service';
import { ReviewItem } from './../models/reviewItem';
import { Reviews } from './../models/reviews';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private db: DatabaseService) { }

  setReviews(id: number, data: Reviews): void {
    data.totalRating = this.getTotalRating(data.reviewsItems);
    this.db.setReviews(id, data);
  }

  getTotalRating(arr: ReviewItem[]): number {
    const total =  arr.reduce((sum: number, item: ReviewItem) => {
      return sum + item.rating;
    }, 0);
    return total / arr.length;
  }
}
