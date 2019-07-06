import { Injectable } from '@angular/core';
import { Http , Headers ,RequestOptions , Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs/Observable';

let baseUrl = "http://mycaa.caa.ac.zw/";



@Injectable()
export class AuthServiceProvider {
	

	constructor(public http: Http){
		
		console.log('Hello AuthService Provider')
	}
	/*postData(credentials , type){
		
		var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        const requestOptions = new RequestOptions({ headers: headers }); 
			
		return new Promise((resolve , reject)=>{
		
			this.http.post(apiUrl+type,JSON.stringify(credentials),requestOptions).subscribe(res =>{
				resolve(res.json());
			},(err) =>{
				reject(err);
			});
			
		});
			
	} */
	
	getCourse(token,userId){

   	   let url = baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=core_enrol_get_users_courses&userid="+userId+"&moodlewsrestformat=json"
	  
	   return this.http.get(url).map((res: Response)=> res.json())
		
	}
	getToken(user , pass){
		let url = baseUrl+"login/token.php?" + "username=" + user + "&password=" + pass + "&service=moodle_mobile_app";
	  
	   return this.http.get(url).map((res: Response)=> res.json())
	}
	getUserDetails(token){

	 let url = baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=core_webservice_get_site_info"+"&moodlewsrestformat=json";
 
	   return this.http.get(url).map((res: Response)=> res.json())

	}

	getGrades(token,courseid,userid){

	 let url = 	baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=gradereport_user_get_grades_table&courseid="+courseid+"&userid="+userid+"&moodlewsrestformat=json";
     
     return this.http.get(url).map((res: Response)=> res.json())
	}


	getParticipants(token,courseid){

	  let url = baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=moodle_user_get_users_by_courseid&courseid="+courseid+"&moodlewsrestformat=json";
      return this.http.get(url).map((res: Response)=> res.json())
	
	}
	
	getContents(token,courseid){

       let url = baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=core_course_get_contents&courseid="+courseid+"&moodlewsrestformat=json";
      return this.http.get(url).map((res: Response)=> res.json())
	}
	
	getNotes(token,courseid){
      
       let url = baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=core_notes_get_course_notes&courseid="+courseid+"&moodlewsrestformat=json";
      return this.http.get(url).map((res: Response)=> res.json())

	}

	library(){
		let url = " http://196.29.35.115:8000/api/v1/library/list/";
		return this.http.get(url).map((res: Response)=> res.json())

	}

	getClickers(){

		let url = "http://196.29.35.115:8000/api/v1/clickers/multiple-questions/list";
		return this.http.get(url).map((res: Response)=> res.json())

	}

	sendMsg(token , touserid , text ){

       let url = "http://mycaa.caa.ac.zw/webservice/rest/server.php?wstoken="+token+"&wsfunction=core_message_send_instant_messages&messages[0][touserid]="+touserid+"&messages[0][text]="+text+"&messages[0][textformat]=2&moodlewsrestformat=json";
       
       return this.http.get(url).map((res: Response)=> res.json())
	}

	getConvaFrom(token,useridto,useridfrom){

      let url = "http://mycaa.caa.ac.zw/webservice/rest/server.php?wstoken="+token+"&wsfunction=core_message_get_messages&useridto="+useridfrom+"&useridfrom="+useridto+"&type=conversations&read=0&newestfirst=1&limitfrom=0&limitnum=20&moodlewsrestformat=json";

      return this.http.get(url).map((res: Response)=> res.json())

	}

	getConvaMe(token,useridto,useridfrom){

      let url = "http://mycaa.caa.ac.zw/webservice/rest/server.php?wstoken="+token+"&wsfunction=core_message_get_messages&useridto="+useridto+"&useridfrom="+useridfrom+"&type=conversations&read=0&newestfirst=1&limitfrom=0&limitnum=20&moodlewsrestformat=json";

      return this.http.get(url).map((res: Response)=> res.json())

	}
	
	getForums(token,courseid){
     
     let url = "http://mycaa.caa.ac.zw/webservice/rest/server.php?wstoken="+token+"&wsfunction=mod_forum_get_forums_by_courses&courseids[0]="+courseid+"&moodlewsrestformat=json"  ;
     return this.http.get(url).map((res: Response)=> res.json())
    
	}
}