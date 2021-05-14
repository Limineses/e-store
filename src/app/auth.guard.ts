import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    flag = false;

    constructor( private auth: AngularFireAuth ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.auth.user.pipe(
            take(1),
            map(user => {
                if (user?.uid) {
                    this.flag = true;
                } else {
                    this.flag = false;
                }
            })
        ).subscribe();

        return this.flag;
    }
}
