import { Component, OnInit } from '@angular/core';
import { OutFlowHandler } from 'src/app/handlers/outflowHandler';

@Component({
  selector: 'app-outflow-report-page',
  templateUrl: './outflow-report-page.component.html'
})
export class OutflowReportPageComponent implements OnInit {
  protected busy = false;

  constructor(private handler: OutFlowHandler) {
    
  }

  ngOnInit(): void {
    
  }
}
