import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule, NavbarComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
      // Formu başlatın ve doğrulamalar ekleyin
      this.contactForm = this.fb.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          subject: ['', Validators.required]
      });
  }

  onSubmit() {
    //   if (this.contactForm.valid) {
    //       // Form verilerini al
    //       const formData = this.contactForm.value;

    //       // ContactService üzerinden form verilerini gönder
    //       this.contactService.sendEmail(formData).subscribe(
    //           response => {
    //               // Başarılı bir şekilde gönderildiğinde kullanıcıya bildirin
    //               alert('Mesajınız başarıyla gönderildi!');
    //           },
    //           error => {
    //               // Hata durumunda kullanıcıyı bilgilendirin
    //               console.error('Gönderme hatası:', error);
    //               alert('Gönderme sırasında bir hata meydana geldi. Lütfen tekrar deneyin.');
    //           }
    //       );
    //   } else {
    //       // Form doğrulama hatası varsa kullanıcıyı bilgilendirin
    //       alert('Lütfen tüm alanları doğru doldurun.');
    //   }
  }
}
