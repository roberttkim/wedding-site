import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  // .offcanvas a component of Jasny Bootstrap found here http://www.jasny.net/bootstrap/components/
  toggleNavMenu() {
    // console.log($('#wedding-menu').offcanvas());
    $('#wedding-menu').offcanvas('toggle');
  }

  closeNavMenu() {
    $('#wedding-menu').offcanvas('hide');
  }

  ngAfterViewInit(): void {
    $('#wedding-menu').offcanvas({canvas: 'body', toggle: false, autohide: true, placement: 'left', recalc: true});
  }
}
