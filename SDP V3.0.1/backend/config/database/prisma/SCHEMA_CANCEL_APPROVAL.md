# Future Schema: Cancel Approval for VocalRecordingAppointmentDetail

When implementing cancel approval flow, add these optional fields to `VocalRecordingAppointmentDetail`:

```prisma
cancel_reason       String?   @map("cancel_reason")
cancel_requested_at DateTime? @map("cancel_requested_at")
cancel_approved_by   Int?      @map("cancel_approved_by")
```

Then run: `npx prisma migrate dev --name add_cancel_approval_fields`
