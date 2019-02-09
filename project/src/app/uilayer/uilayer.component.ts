import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'uilayer',
  templateUrl: './uilayer.component.html',
  styleUrls: ['./uilayer.component.css']
})
export class UilayerComponent implements OnInit {

  posts:any[];
  httpAddress="http://jsonplaceholder.typicode.com/posts";

  constructor(private http:Http) { 
    this.posts=[];
    http.get('http://localhost:5000/violation/all')
      .subscribe(response => {
        let responseString= response["_body"];
        let responseArray = responseString.split(";");
        let responseArray2 = [];
        for(let responseBit of responseArray){
          let temp=responseBit.split(":");
          let length = responseArray2.push(temp[1]);
        }
        for(let i=0;i<responseArray2.length;i+=8){
          this.posts.push(
            responseArray2[i]+" "+
            responseArray2[i+1]+" "+
            responseArray2[i+2]+" "+
            responseArray2[i+3]+" "+
            responseArray2[i+4]+" "+
            responseArray2[i+5]+" "+
            responseArray2[i+6]+" "+
            responseArray2[i+7]
          );
        }
      })
  }

  ngOnInit() {
  }

  createPost(input :HTMLInputElement){
    let post ={ title: input.value};
    input.value ="";

    this.http.post(this.httpAddress,JSON.stringify(post))
      .subscribe(response => {
        post["id"] =response.json().id
        this.posts.push(post);
      });
  }

  updatePost(post){
    post.title="pie"
    this.http.put(this.httpAddress+"/"+post.id, post)
      .subscribe(response =>{
      });
  }

  deletePost(post){
    this.http.delete(this.httpAddress +"/"+post.id)
      .subscribe(response =>{
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
      })
  }

}
