const fs = require('fs');
const paths = [
  'src/app/features/tickets/components/ticket-create-dialog/ticket-create-dialog.component.spec.ts',
  'src/app/features/tickets/components/ticket-confirm-dialog/ticket-confirm-dialog.component.spec.ts',
  'src/app/features/tickets/components/ticket-priority-dialog/ticket-priority-dialog.component.spec.ts'
];

paths.forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/jasmine\.SpyObj<MatDialogRef<[^>]+>>/g, 'any');
    fs.writeFileSync(p, c);
  }
});
console.log('Fixed types');
