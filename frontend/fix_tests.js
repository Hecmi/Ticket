const fs = require('fs');
const paths = [
  'src/app/features/auth/login/login.component.spec.ts',
  'src/app/features/auth/register/register.component.spec.ts',
  'src/app/features/tickets/components/ticket-create-dialog/ticket-create-dialog.component.spec.ts',
  'src/app/features/tickets/components/ticket-confirm-dialog/ticket-confirm-dialog.component.spec.ts',
  'src/app/features/tickets/components/ticket-priority-dialog/ticket-priority-dialog.component.spec.ts',
  'src/app/features/tickets/tickets-list/tickets-list.component.spec.ts'
];

paths.forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/jest\.spyOn\(/g, 'spyOn(');
    c = c.replace(/jest\.Mocked</g, 'jasmine.SpyObj<');
    c = c.replace(/jest\.fn\(\)/g, "jasmine.createSpy()");
    c = c.replace(/jasmine\.createSpy\(\)\.mockReturnValue/g, "jasmine.createSpy().and.returnValue");
    fs.writeFileSync(p, c);
  }
});
console.log('Tests converted to Jasmine syntax');
