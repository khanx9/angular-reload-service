import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class ReloadPageService implements OnDestroy {

    mySubscription: any;
    constructor(
        private httpService: HttpClient,
        public router: Router
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
            }
        });

    }

    reloadPage() {
        this.router.navigate([this.router.url]);
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            console.log('d')
            this.mySubscription.unsubscribe();
        }
    }


}