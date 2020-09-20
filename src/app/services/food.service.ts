import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class FoodService {
  private foodURL = 'https://food-app-2020.herokuapp.com/';
  constructor(
    private httpService : HttpClient
  ){

   
  }

   findAllFoods = async () => {
     try{
       const list_food = await this.httpService.post(this.foodURL + 'foods', {}).toPromise();
       return list_food;
     }
     catch (e) {
       return e;
     }
   }

   deleteFood = async (id : string) => {
     try{
       const food_deleted = await this.httpService.post(this.foodURL + 'delete-food', {id}).toPromise();
       return food_deleted;
     }
     catch(e) {
       return e;
     }
   }

   createFood = async (data : any) => {
     try{
       const {name,category} =  data;

       const food__create =await this.httpService.post(this.foodURL +'food', { name, category }).toPromise();
        return food__create;
     }
     catch(e) {
       return e;
     }
   }

   update__food = async (data) => {
    try {
        const food__update = await this.httpService.post(this.foodURL +'update-food', { ...data}).toPromise();
        return food__update;
    } catch (error) {
        return error;
    }
}
}