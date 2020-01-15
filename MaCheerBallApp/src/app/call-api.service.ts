import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { user } from "./Models/user";
import { poll } from './Models/poll';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  public static host: string = "https://localhost:5001/api/";
  // public nameuser :any;
  // public teluser :any;
  public user = {
    "nameUser":null,
    "telUser":null
  };

  constructor(public http:HttpClient) { }

  public addUserVote(data: user) {
    return this.http.post<user>(CallApiService.host + 'Poll/PollGetAllData', data);
  }

  public getUserAll() {
    return this.http.get<user>(CallApiService.host + 'Poll/PollGetAllData');
  }

  
  public getUserById(Id: string) {
    return this.http.get<user>(CallApiService.host + 'Poll/PollGetByid/' + Id);
  }

  public voteHome(id:string,data)
  {
    return this.http.put<poll>(CallApiService.host + 'Poll/VoteHome/' + id ,data);
  }

  public voteAway(id:string,data)
  {
    return this.http.put<poll>(CallApiService.host + 'Poll/VoteAway/' + id ,data);
  }

  // public editDataUser(Id: string, data) {
  //   return this.http.put<user>(CallapiService.host + 'User/EditUserData/' + Id, data);
  // }

  // public DeleteUser(Id: string) {
  //   return this.http.delete<user>(CallapiService.host + 'User/DeleteUser/' + Id);
  // }
}
