import { AngularFireAuth } from '@angular/fire/auth';
import { Reviews } from '../../models/reviews';
import { ReviewsService } from '../../services/reviews.service';
import { ReviewItem } from '../../models/reviewItem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { DatabaseService } from '../../services/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  product!: Product;
  reviewForm!: FormGroup;
  rating!: number;

  startIndex!: number;
  endIndex!: number;

  subscriptions!: Subscription;

  constructor(private db: DatabaseService,
              private route: ActivatedRoute,
              private reviewsService: ReviewsService,
              public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.subscriptions = this.route.params.pipe(
      switchMap(params => this.db.getProduct(Number(params.id))),
      tap(data => this.product = data)
    ).subscribe();

    this.reviewForm = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      name: new FormControl( '', [Validators.minLength(3), Validators.required]),
      message: new FormControl('', [Validators.minLength(5), Validators.required])
    });
  }

  setPaginationIndex(data: number[]): void {
    this.startIndex = data[0];
    this.endIndex = data[1];
    window.scrollTo({top: 0});
  }

  addReview(): void {
    const review: ReviewItem = {
      date: Date.now(),
      message: this.reviewForm.value.message,
      name: this.reviewForm.value.name,
      rating: Number(this.reviewForm.value.rating)
    };

    let reviews: Reviews;
    if (this.product.reviews) {
      this.product.reviews.reviewsItems.push(review);
      reviews = this.product.reviews;
    } else {
      reviews = {
        totalRating: this.reviewForm.value.rating,
        reviewsItems: [review]
      };
    }
    this.reviewsService.setReviews(this.product.id, reviews);
    this.reviewForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
