 // $(document).ready(function(){
//     var token = window.localStorage.getItem("token");
//     var baseUrl = 'http://mycaa.caa.ac.zw/';

//     var url = baseUrl + "webservice/rest/server.php?wstoken="+ token +"&wsfunction=core_webservice_get_site_info"+"&moodlewsrestformat=json";

//     $.getJSON(url , function(result){

//         var username = '<p>' + result.username + result.userid + '</p>';

//         $(username).appendTo('#name');
//     });

//     $("#courses").click(function(){
//        var link = baseUrl +"webservice/rest/server.php?wstoken="+ token + "&wsfunction=core_enrol_get_users_courses&userid=818&moodlewsrestformat=json";
//         $.getJSON(link, function(courses){
//            $.each(courses, function(i, f){
//                var courseDetails = f.id
//                  var tblRow = "<tr>" + "<td>" + f.id + "</td>" +
//                 "<td>" + f.shortname + "</td>" + "<td>" +
//                  f.fullname + "</td>"   +
//                  "<td>" + "<button class='btn btn-warning' id='"+ courseDetails +"'>more details</button>"+ "</td>"  + "</tr>"
//                  $(tblRow).appendTo("#userdata tbody")
//             });

//         });
//     });

// });

$(document).ready(function(){
    var token = window.localStorage.getItem("token");
    var baseUrl = 'http://mycaa.caa.ac.zw/';

    var url = baseUrl + "webservice/rest/server.php?wstoken="+ token +"&wsfunction=core_webservice_get_site_info"+"&moodlewsrestformat=json";

    $.getJSON(url , function(result){

        var username = '<p>' + result.username +'</p>';
        var userid = localStorage.setItem("userid" , result.userid);
        $(username).appendTo('#name');
    });

    // User Click Courses
    $("#courses").one("click", function (){
        // get courses through webseervice 
       var link = baseUrl +"webservice/rest/server.php?wstoken="+ token + "&wsfunction=core_enrol_get_users_courses&userid=" + localStorage.getItem("userid") + "&moodlewsrestformat=json";
       //var i 
       i=0
        $.getJSON(link, function(courses){
           $.each(courses, function(i, f){
                var courseId = f.id;
                i++

                // display courses in html
                 var tblRow = "<tr>" + "<td>" + i + "</td>" +
                "<td>" + f.shortname + "</td>" + "<td>" +
                 f.fullname + "</td>"   +
                 "<td>" + "<button class='btn btn-default' id='grade_"+ f.id +"'>Grades</button>"+ "</td>" +
                 "<td>" + "<button class='btn btn-default' id='participants_"+  f.id + "'>Participants<i class='fa fa-fw fa-user'></></button>"+ "</td>" +
                 "<td>" + "<a href='#!/contents'><button class='btn btn-default' id='content_"+ f.id + "'>Contents<i class='fa fa-fw fa-folder'></button></a>"+ "</td>"  + "</tr>"
                 $(tblRow).appendTo("#userdata tbody")

                 // user clicks grades button

                 $("#grade_"+ f.id).one("click", function (){
                    var getGradesUrl = 	baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=gradereport_user_get_grades_table&courseid="+ courseId +"&userid="+localStorage.getItem("userid")+"&moodlewsrestformat=json";
                    $.getJSON(getGradesUrl, function(grades){
                        var data = grades.tables[0].tabledata;
                        $.each(data, function(index, g){

                                var itemname = data[index+1].itemname.content
                                var mark =  data[index+1].grade.content;
                                var feedback = data[index+1].feedback.content;

                                // remove html tags form json response
                                var newItemName = itemname.replace(/(<([^>]+)>)/ig," ");
                                var newMark = mark.replace(/(<([^>]+)>)/ig," ");
                                var newFeedback = feedback.replace(/(<([^>]+)>)/ig," ");

                             console.log(newItemName);
                             console.log(newMark);
                             console.log(newFeedback);
                             var rows = "<tr><td>" + newItemName + "</td><td>" +  newFeedback + "</td><td>"+ newMark + "</td></tr>";
                             $(rows).appendTo("#gradesdata tbody")
                             document.getElementById("course_grade").innerHTML = f.fullname;

                             // user  grades button;
                             $( "#grades" ).slideDown( "slow", function() {
                                
                              });

                              //close grades table
                              $("#closeTable").one("click", function (){
                                    $("#grades").slideUp("slow", function(){

                                    });
                                    $("#grades tbody tr").remove();
                              });
                        });
                    });
                 });

                 // User clicks participants buttons

                 $("#participants_"+ f.id).one("click", function (){
                       var participantsUrl = 	baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=moodle_user_get_users_by_courseid&courseid="+ courseId+"&moodlewsrestformat=json";

                       $.getJSON(participantsUrl, function(people){
                            console.log(people);
                        $.each(people , function(index, person){

                             var participants = "<tr><td>" + "<img style='height:20px;' src='" + person.profileimageurlsmall + "'>" + "</td><td>"+ 

                            //  person.fullname + "</td><td>" + person.email + "</td><td>" + person.lastaccess + "</td></tr>";   
                             person.fullname + "</td><td>" + person.email + "</td><td><a href='#!/chat' id='chat_"+ person.id +"'><span class='glyphicon glyphicon-envelope'></span></a></td></tr>";   
                             
                            



                             $(participants).appendTo("#participantsdata tbody")

                             document.getElementById("coursepat").innerHTML = f.fullname;

                             // user clicks Participants button

                            

                                $("#participantsTable").slideDown("slow", function(){

                                });

                                $("#closeParticipants").click(function(){
                                    $("#participantsTable").slideUp("slow", function(){
                                        $("#participantsdaata tbody tr").remove();
                                    });
                                });

                                //  var person_id =  localStorage.setItem("personid",person.id);
                             $("#chat_"+ person.id).one("click", function (){
                                console.log(person.fullname);

                                var messagesreceivedUrl = baseUrl + "webservice/rest/server.php?wstoken="+ token +"&wsfunction=core_message_get_messages&useridto="+ person.id +"&useridfrom="+ localStorage.getItem("userid") +"&type=conversations&read=0&newestfirst=1&limitfrom=0&limitnum=20&moodlewsrestformat=json";
                                var messagessentUrl = baseUrl + "webservice/rest/server.php?wstoken="+ token +"&wsfunction=core_message_get_messages&useridto="+ localStorage.getItem("userid") +"&useridfrom="+ person.id +"&type=conversations&read=0&newestfirst=1&limitfrom=0&limitnum=20&moodlewsrestformat=json";
                                var chats;
                                 $.getJSON(messagessentUrl, function(messages){
                                    var chats = messages.messages;
                                    // console.log(messagesreceivedUrl)

                                    $.getJSON(messagesreceivedUrl, function(message){

                                        $.each(message.messages, function(i, m){
                                          chats.push(m);
                                        });

                                        console.log("chats sent");
                                        chats.sort(function(a,b){ return a.timecreated - b.timecreated})

                                        console.log(chats);

                                        var contact = person.fullname;
                                        $(contact).appendTo("#contact");

                                        $.each(chats, function(i, txt){

                                            if(txt.useridfrom == localStorage.getItem("userid")){
                                            var allchats = "<div style='float: right;' class='row btn btn-success'>"+ txt.userfromfullname + " ==> " + txt.text +" time "+ txt.timecreated +"</div><br><hr>";
                                            var nextln = "</br>";
                                            txt.usertofullname + " " +

                                            $(allchats).appendTo("#chats");
                                            }
                                            else{
                                                var allchats = "<div class='row btn btn-success'>"+ txt.userfromfullname + " ==> " + txt.text +" time "+ txt.timecreated +"</div><br><hr>";
                                                var nextln = "</br>";
                                                txt.usertofullname + " " +
    
                                                $(allchats).appendTo("#chats");
                                            }

                                            
                                        });
                                            // if(txt.useridfrom == localStorage.getItem("userid")){
                                                // $(nextln).appendTo("#allchats")
                                                // $(allchats).appendTo("#allchats");

                                                // if(txt.usertoid == person.id){
                                                //     $(allchats).appendTo("#allchats1");
                                                // }
                                                // $(nextln).appendTo("#allchats1")

                                            // }
                                            // else if(txt.useridto == person.id){
                                            //     $(allchats).appendTo("#allchats1");

                                            //     if(txt.useridfrom == localStorage.getItem("userid")){
                                            //         $(allchats).appendTo("#allchats");
                                            //     }
                                            // }
                                            // else{
                                                // $(nextln).appendTo("#allchats")
                                            //   $(allchats).appendTo("#allchats1");
                                            //   $(nextln).appendTo("#allchats")
                                            

                                            // var sendmessageUrl = baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=core_message_send_instant_messages&messages[0][touserid]="+person.id+"&messages[0][text]="+txt.text+"&messages[0][textformat]=2&moodlewsrestformat=json";
                                            // $.getJSON(sendmessageUrl, function(sms){
                                            //     console.log(sms);
                                            // });
                                        

                                    });

                                 });

                                 

                         });
                                

                        });
                    
                    });
                });




                

                $("#content_" + f.id).one("click", function (){
                    console.log("home");

                    var contentsUrl = 	baseUrl + "webservice/rest/server.php?wstoken="+token+"&wsfunction=core_course_get_contents&courseid="+ courseId + "&moodlewsrestformat=json";

                    $.getJSON(contentsUrl, function(contents){
                        // console.log(contents);

                        var names = contents[0]['modules']

                        // $.each(contents, function(index, file){
                            

                                $.each(names, function(index, files){


                                    var content = "<li><a href='#!/con' id='con_"+ files.id +"' ><img src='" + files.modicon + "'> " + files.name + "</a></li><hr>";  
                                    // var content = "<ul id='con'><li>" + files.name + "</li></ul><hr>";   

                                    $(content).appendTo("#contents1");
                                    
                                    switch(files.name){
                                        case "News forum":
                                            $("#con_" + files.id).click(function(){
                                                console.log(files.id);
                                                var nyc = 	baseUrl + "/webservice/rest/server.php?wstoken="+ token +"&wsfunction=mod_forum_get_forums_by_courses&courseids[0]="+ courseId +"&moodlewsrestformat=json";
                                                console.log(courseId);
                                                $.getJSON(nyc, function(contents){
                                                    
                                                    $.each(contents , function(index, con){
                                                        var leo = "<li>"+ con.name +"</li><li>"+ con.intro +"</li><li>"+ con.numdiscussions +"</li><li>"+ con.completionposts +"</li><li>"+ con.completionreplies +"</li><li>"+ con.completiondiscussions +"</li><hr>";  
                                                        $(leo).appendTo("#data")
                                                    });
                                                });
                                            });
                                            break;
                                    
                                    }

                                    
                                });
                               
                            // var url1 = contents[index].modules[index].url;
                            // console.log(name);
                            // console.log(url1);
                            
                            

                        });
                       
                    // });
                });
                
            });
        });
    });

    
    $("#onlineLibrary").one("click", function (){
        var libraryUrl = "http://196.29.35.115:8000/api/v1/library/list/?format=json";
        $.getJSON(libraryUrl, function(books){
            $.each(books , function(index, book){
                // var libs = "<div class='col-md-3'><img style='height:220px; width:250px;' alt='book icon' src='"+ 'http://196.29.35.115:8000'+ book.cover_image + "'><hr>" + 
                var libs = "<div class='col-md-3'><p><img style='height:250px; width:auto;' alt='book icon' src='"+ 'http://196.29.35.115:8000'+ book.cover_image + "'></p><hr>" + 
                "<p> Title:" + book.title + "</p>" +
                "<p> Author:" + book.author + "</p>" +
                "<a href='#'><img src='img/download.png' style='height:20px;width:20px'>download<i></i>" +
                "<a href='#'><img src='img/preview.png' style='height:20px;width:20px'>preview<i></i>" ;

                $(libs).appendTo("#books");
            });
        });
    });


    // Clickers
    $("#onlineclickers").one("click", function (){
        var clickersUrl = "http://196.29.35.115:8000/api/v1/clickers/multiple-questions/list";
        $.getJSON(clickersUrl, function(clickers){
          var number = 1;
            $.each(clickers , function(index, clicker){
                
                var click = "<div class='col-md-6'><hr>" + 
                "<p class='form-control'> Question : "+number+" " + clicker.question + "</p>" +
                
                "<p>  <input type='radio' name='"+ clicker.optionA +"'>  A "+ clicker.optionA +"</p>"+
                "<p>  <input type='radio' name='"+ clicker.optionA +"'>  B "+ clicker.optionB +"</p>"+
                "<p>  <input type='radio' name='"+ clicker.optionA +"'>  C "+ clicker.optionC +"</p>"+
                "<p>  <input type='radio' name='"+ clicker.optionA +"'>  D "+ clicker.optionD +"</p>";
              

                $(click).appendTo("#clickers");
                number++;

               
            });

                
        });
    });
});
