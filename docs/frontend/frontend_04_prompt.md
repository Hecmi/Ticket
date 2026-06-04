Genera TicketService para Angular 21.

No consumir el backend real.

Implementa servicios mock utilizando exactamente los contratos definidos a continuación:

# getTickets()

Debe retornar:
{
    "status": "success",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "title": "Problema de acceso a VPN",
            "description": "No puedo conectarme a la VPN de la empresa
            desde la actualización de Windows.",
            "status": "OPEN",
            "priority": "HIGH",
            "user_id": "987e6543-e21b-12d3-a456-426614174000",
            "assigned_to": null,
            "created_at": "2026-04-25T10:00:00Z",
            "updated_at": "2026-04-25T10:00:00Z"
        }
    ]
}

# createTicket()

Debe recibir:

{
    "title": "Nuevo mouse defectuoso",
    "description": "El click derecho del mouse entregado ayer no
    funciona.",
    "priority": "LOW",
    "user_id": "987e6543-e21b-12d3-a456-426614174000"
}

Y retornar:

{
    "status": "success",
    "data": {
        "id": "123e4567-e89b-12d3-a456-426614174111",
        "title": "Nuevo mouse defectuoso",

        "description": "El click derecho del mouse entregado ayer no
        funciona.",
        "status": "OPEN",
        "priority": "LOW",
        "user_id": "987e6543-e21b-12d3-a456-426614174000",
        "assigned_to": null,
        "created_at": "2026-04-25T10:30:00Z",
        "updated_at": "2026-04-25T10:30:00Z"
    }
}

# changeTicketStatus()

Debe recibir:

{
    "status": "IN_PROGRESS"
}

Y retornar:

{
    "status": "success",
    "data": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "status": "IN_PROGRESS",
        "updated_at": "2026-04-25T11:00:00Z"
    }
}

No usar HttpClient.