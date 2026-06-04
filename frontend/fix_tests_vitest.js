const fs = require('fs');
const paths = [
  'src/app/features/auth/login/login.component.spec.ts',
  'src/app/features/auth/register/register.component.spec.ts',
  'src/app/features/tickets/components/ticket-create-dialog/ticket-create-dialog.component.spec.ts',
  'src/app/features/tickets/components/ticket-confirm-dialog/ticket-confirm-dialog.component.spec.ts',
  'src/app/features/tickets/components/ticket-priority-dialog/ticket-priority-dialog.component.spec.ts',
  'src/app/features/tickets/tickets-list/tickets-list.component.spec.ts',
  'src/app/core/services/ticket.service.spec.ts'
];
paths.forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/spyOn\(/g, 'vi.spyOn(');
    c = c.replace(/jasmine\.createSpy\([^)]*\)\.and\.returnValue/g, "vi.fn().mockReturnValue");
    c = c.replace(/jasmine\.createSpy\([^)]*\)/g, "vi.fn()");
    c = c.replace(/fakeAsync\(\(\) => \{/g, '() => {');
    c = c.replace(/tick\(500\);.*\n/g, '');
    fs.writeFileSync(p, c);
  }
});
console.log('Fixed syntax to vitest');
