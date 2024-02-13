import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { HttpClient } from '@angular/common/http';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.css']
})
export class ViewComplaintsComponent implements OnInit {
  replyIcon = faReply;
  Answer = "";
  currentReplying = null;

  getAllComplaintsURL = "https://laptoputopia.000webhostapp.com/backend/Complaints/getAllComplaints.php";
  replyComplaintUrl = "https://laptoputopia.000webhostapp.com/backend/Complaints/replyComplaint.php";

  constructor(private http:HttpClient, private Converter: ObjectToFormdataService) { }

  ComplaintsLoaded = false;

  ngOnInit(): void {

    this.http.get(this.getAllComplaintsURL).subscribe(
      (data)=>
      {
        this.Complaints = data;
        this.ComplaintsLoaded = true;
      }
    )

  }

  Complaints;

  reply(currentReply)
  {
    this.currentReplying = currentReply;
  }

  SendAnswer()
  {
    this.currentReplying.anwser = this.Answer;
    this.currentReplying.adminid = sessionStorage.getItem("username");

    let x = {
      adminid : this.currentReplying.adminid,
      answer : this.Answer,
      customerid: this.currentReplying.customerid,
      question: this.currentReplying.question
    }
    
    

    let Request = this.Converter.convertToFormData(x);
    this.http.post(this.replyComplaintUrl,Request).subscribe((data)=>
    {
      console.log(data);

      this.http.get(this.getAllComplaintsURL).subscribe(
        (data)=>
        {
          this.Complaints = data;
        }
      )
    })
    
  }



}
