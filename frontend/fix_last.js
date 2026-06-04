const fs = require('fs');

// Fix ticket.service
let pSvc = 'src/app/core/services/ticket.service.spec.ts';
let cSvc = fs.readFileSync(pSvc, 'utf8');
cSvc = cSvc.replace(/let result: any;\s*const payload = \{ title: 'Test Ticket', description: 'Desc', priority: 'HIGH', user_id: '123' \};\s*service\.createTicket\(payload\)\.subscribe\(res => result = res\);\s*expect\(result\.status\)\.toBe\('success'\);/m,
  `const payload = { title: 'Test Ticket', description: 'Desc', priority: 'HIGH', user_id: '123' };\n    const result: any = await firstValueFrom(service.createTicket(payload));\n    expect(result.status).toBe('success');`);
fs.writeFileSync(pSvc, cSvc);

// Fix tickets-list
let pList = 'src/app/features/tickets/tickets-list/tickets-list.component.spec.ts';
let cList = fs.readFileSync(pList, 'utf8');
cList = cList.replace(/dialog = TestBed\.inject\(MatDialog\);/g, 'dialog = fixture.debugElement.injector.get(MatDialog);');
fs.writeFileSync(pList, cList);
console.log('Fixed last 2 bugs');
