const fs = require('fs');
let pList = 'src/app/features/tickets/tickets-list/tickets-list.component.spec.ts';
let cList = fs.readFileSync(pList, 'utf8');

cList = cList.replace(
  /dialog = fixture\.debugElement\.injector\.get\(MatDialog\);\s*dialogSpy = \{ open: vi\.spyOn\(dialog, 'open'\) \};\s*fixture = TestBed\.createComponent\(TicketsListComponent\);/m,
  "fixture = TestBed.createComponent(TicketsListComponent);\n    dialog = fixture.debugElement.injector.get(MatDialog);\n    dialogSpy = { open: vi.spyOn(dialog, 'open') };"
);

fs.writeFileSync(pList, cList);
console.log('Fixed fixture initialization order');
