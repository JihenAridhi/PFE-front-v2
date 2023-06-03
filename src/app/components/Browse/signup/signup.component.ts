import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonService} from "../../../services/person.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
  content: any
  themes: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false]
  constructor(private ps: PersonService, private ls: LanguageService) {ls.getLanguage().subscribe(data => this.content=data)}

  ngOnInit() {
    // Wait for the DOM to load before executing code
    document.addEventListener('DOMContentLoaded', () => {
      // Get the divs and buttons
      const partA = document.querySelector('.part-A');
      const partB = document.querySelector('.part-B');
      const partC = document.querySelector('.part-C');
      const partD = document.querySelector('.part-D');
      const nextButtons = document.querySelectorAll('.next-button');
      const previousButtons = document.querySelectorAll('.previous-button');
      const addF = document.getElementById('addF');

      // Function to show a specific part and hide others
      const showPart = (partToShow: HTMLElement) => {
        const parts = [partA, partB, partC, partD];
        parts.forEach(part => {
          if (part === partToShow) {
            (part as HTMLElement).style.display = 'block'; // Type assertion
          } else {
            (part as HTMLElement).style.display = 'none'; // Type assertion
          }
        });
      };

      // Show part-B when next is clicked in part-A
      nextButtons[0].addEventListener('click', event => {
        event.preventDefault();
        showPart(partB as HTMLElement);
      });

      // Show part-C when next is clicked in part-B
      nextButtons[1].addEventListener('click', event => {
        event.preventDefault();
        showPart(partC as HTMLElement);
      });

      // Show part-D when next is clicked in part-C
      nextButtons[2].addEventListener('click', event => {
        event.preventDefault();
        showPart(partD as HTMLElement);
      });

      // Show part-A when previous is clicked in part-B
      previousButtons[0].addEventListener('click', event => {
        event.preventDefault();
        showPart(partA as HTMLElement);
      });

      // Show part-B when previous is clicked in part-C
      previousButtons[1].addEventListener('click', event => {
        event.preventDefault();
        showPart(partB as HTMLElement);
      });

      // Show part-C when previous is clicked in part-D
      previousButtons[2].addEventListener('click', event => {
        event.preventDefault();
        showPart(partC as HTMLElement);
      });
    });
  }

  addPerson(addF: NgForm) {
    if(addF.value.password=='')
      alert('enter your password please !!')
    if (addF.value.password != addF.value.password1)
      alert('confirm password please !!')
    else this.ps.add(addF.value)
  }
}
