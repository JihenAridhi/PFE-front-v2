import {Component, HostListener} from '@angular/core';
import {Project} from "../../../entities/Project";
import {LanguageService} from "../../../services/language.service";
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../services/project.service";
import {ActivatedRoute} from "@angular/router";
import {Theme} from "../../../entities/Theme";
import {Partner} from "../../../entities/Partner";
import {PartnersService} from "../../../services/partners.service";

@Component({
  selector: 'app-save-project',
  templateUrl: './save-project.component.html',
  styleUrls: ['./save-project.component.css']
})
export class SaveProjectComponent {
  project: Project = new Project();
  date: any;
  content: any;
  private selectedFiles: any;
  searchList: Partner[] = []
  filteredList: Partner[] = []
  showDropdown: boolean = false;

  constructor(private ls: LanguageService, private route: ActivatedRoute, private pr: ProjectService, private pt: PartnersService) {ls.getLanguage().subscribe(data => this.content=data)}

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.project.id?.toString()+'.jpg');
    //await this.ps.setPhoto(formData).then()
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    // Check if the clicked element is outside the input and the dropdown
    const isOutsideInput = !clickedElement.closest('input');
    const isOutsideDropdown = !clickedElement.closest('.dropdown');

    if (isOutsideInput && isOutsideDropdown) {
      this.showDropdown = false;
    }
  }
  addproject(form: NgForm)
  {
    let project = form.value
    project.date = new Date()
    project.id=this.project.id
    this.pr.save(project, this.selectedFiles)
  }

  async ngOnInit()
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id)
      this.pr.get(id).then(data => this.project=data!)
    this.addPartner()
    await this.pr.getAll().then(data =>
    {
      this.searchList = data!.filter(project => !this.project.partners?.some(partner => partner.id === project.id))
      this.filteredList = this.searchList
    })
  }
  addPartner() {
    if (!this.project.partners)
      this.project.partners = []
    this.project.partners.push(new Partner())
  }

  removePartner() {
    let partner = this.project.partners!.splice(this.project.partners!.length - 1, 1)
    if (partner[0].id) {
      this.searchList.push(partner[0])
      this.filteredList = this.searchList
    }
  }

  selectPartner(partner: Partner) {
    this.project.partners![this.project.partners!.length - 1] = partner
    console.log(partner)
    this.searchList = this.searchList.filter(r => r!==partner)
    this.filteredList = this.searchList
    this.showDropdown = false;
  }

  /*selectTheme(e: any) {
    let theme: Theme = e.value as Theme
    console.log(typeof theme)
    this.person.themes![this.person.themes!.length - 1] = theme
    this.filteredList = this.searchList.filter(r => r!=theme)
  }*/

  searchPartner(i: number)
  {
    if (this.project.partners![i].name=='')
      this.filteredList = []
    this.filteredList = this.searchList.filter(partner => partner.name?.toUpperCase().includes(this.project.partners![i].name!.toUpperCase()))
  }
}
