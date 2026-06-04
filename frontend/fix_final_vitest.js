const fs = require('fs');

// Fix tickets-list
let pList = 'src/app/features/tickets/tickets-list/tickets-list.component.spec.ts';
let cList = fs.readFileSync(pList, 'utf8');
cList = cList.replace(/let dialogSpy: any;/g, 'let dialog: MatDialog;\n  let dialogSpy: any;');
cList = cList.replace(/\{ provide: MatDialog, useValue: dialogSpy \}/g, '');
cList = cList.replace(/fixture = TestBed\.createComponent/g, `dialog = TestBed.inject(MatDialog);\n    dialogSpy = { open: vi.spyOn(dialog, 'open') };\n    fixture = TestBed.createComponent`);
fs.writeFileSync(pList, cList);

// Fix ticket.service
let pSvc = 'src/app/core/services/ticket.service.spec.ts';
let cSvc = fs.readFileSync(pSvc, 'utf8');
cSvc = `import { firstValueFrom } from 'rxjs';\n` + cSvc;
cSvc = cSvc.replace(/let result: any;\n\s*service\.getTickets\(\)\.subscribe\(res => result = res\);\n\s*expect\(result/g, 
  `const result: any = await firstValueFrom(service.getTickets());\n    expect(result`);
cSvc = cSvc.replace(/let result: any;\n\s*service\.createTicket\(payload\)\.subscribe\(res => result = res\);\n\s*expect\(result/g, 
  `const result: any = await firstValueFrom(service.createTicket(payload));\n    expect(result`);
cSvc = cSvc.replace(/let result: any;\n\s*service\.changeTicketStatus\('test-id', \{ status: 'CLOSED' \}\)\.subscribe\(res => result = res\);\n\s*expect\(result/g, 
  `const result: any = await firstValueFrom(service.changeTicketStatus('test-id', { status: 'CLOSED' }));\n    expect(result`);
cSvc = cSvc.replace(/it\('should return mock/, `it('should return mock`);
cSvc = cSvc.replace(/\(\) => \{/g, 'async () => {');
fs.writeFileSync(pSvc, cSvc);
console.log('Fixed final tests');
