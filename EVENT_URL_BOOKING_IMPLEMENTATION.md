# Event URL Booking Flow - Implementation Guide

## Overview
Updated the event booking system to allow organizers to provide custom Event URLs (ticketing pages, Zoom links, registration pages) instead of redirecting to a hardcoded mytickets.lk URL.

## Changes Made

### 1. Database Schema Update
**File**: `SDP V3.0.1/backend/config/database/prisma/schema.prisma`

Added `eventUrl` field to Event model:
```prisma
model Event {
  id           Int       @id @default(autoincrement())
  title        String
  description  String?
  startDate    DateTime 
  endDate      DateTime?
  location     String?
  time         DateTime?
  eventUrl     String?   @map("event_url")  // ✅ NEW FIELD
  note         String?

  @@map("event")
}
```

**After this change, run:**
```bash
cd "SDP V3.0.1/backend"
npm run db:generate
npm run db:push
```

### 2. Backend Service Update
**File**: `SDP V3.0.1/backend/src/service/EventService.ts`

**createEvent function:**
```typescript
const createEvent = async (data: Partial<Event>): Promise<Event> => {
  return prisma.event.create({
    data: {
      title: data.title!,
      description: data.description,
      startDate: new Date(data.startDate!),
      endDate: data.endDate ? new Date(data.endDate) : null,
      location: data.location,
      time: data.time ? new Date(data.time) : null,
      eventUrl: data.eventUrl,  // ✅ NEW
      note: data.note,
    },
  });
};
```

**updateEvent function:**
```typescript
const updateEvent = async (
  id: number,
  data: Partial<Event>
): Promise<Event | null> => {
  // ...
  return prisma.event.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      location: data.location,
      time: data.time ? new Date(data.time) : undefined,
      eventUrl: data.eventUrl,  // ✅ NEW
      note: data.note,
    },
  });
};
```

### 3. Admin Event Management Page
**File**: `SDP V3.0.1/sdp/src/page/admin/Event.tsx`

**Added eventUrl to form state:**
```typescript
const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    time: "",
    eventUrl: "",  // ✅ NEW
    note: ""
});
```

**Added Event URL input field in the form modal:**
```typescript
<div>
    <label className="block text-sm font-medium text-slate-300 mb-1">
        Event URL
    </label>
    <input 
        type="url" 
        placeholder="https://example.com/event-booking" 
        className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500" 
        value={formData.eventUrl || ""} 
        onChange={(e) => setFormData({ ...formData, eventUrl: e.target.value })} 
    />
    <p className="text-xs text-slate-400 mt-1">
        Booking/registration link (optional)
    </p>
</div>
```

### 4. Public Event Page
**File**: `SDP V3.0.1/sdp/src/page/Event.tsx`

**Updated Event type:**
```typescript
type Event = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  time: string;
  eventUrl?: string;  // ✅ NEW
  note: string;
};
```

**Pass eventUrl to EventCard:**
```typescript
<EventCard
    key={event.id}
    eventImage={bg2}
    eventName={event.title}
    eventDescription={event.description}
    eventDate={new Date(event.startDate).toLocaleDateString("en-GB")}
    eventTime={new Date(event.time).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })}
    eventVenue={event.location}
    url={event.eventUrl || ""}  // ✅ CHANGED from hardcoded URL
/>
```

### 5. EventCard Component
**File**: `SDP V3.0.1/sdp/src/components/EventCard.tsx`

**Updated button logic:**
```typescript
<button
  className={`mt-4 px-6 py-2.5 rounded-lg font-medium transition-all ${
    isEventOver || !url
      ? "bg-slate-600 cursor-not-allowed text-slate-400"
      : "bg-amber-500 text-slate-900 hover:bg-amber-400"
  }`}
  onClick={() => {
    if (!isEventOver && url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }}
  disabled={isEventOver || !url}
>
  {isEventOver 
    ? "Event is over" 
    : !url 
      ? "Booking link not available" 
      : "Book Event"}
</button>
```

## How It Works

### Admin Flow:
1. **Navigate to Event Management** (Admin Dashboard → Events)
2. **Click "Add Event"** or edit existing event
3. **Fill in event details** including:
   - Title, Description, Date, Time, Location (as before)
   - **Event URL** (new field - optional)
     - Examples:
       - `https://mytickets.lk/event/123`
       - `https://zoom.us/j/123456789`
       - `https://eventbrite.com/e/my-event`
       - `https://example.com/register`
4. **Click "Save"** → Event stored with custom URL

### User Flow:
1. **User visits Event Page** (public site)
2. **Views event details** in EventCard
3. **Clicks "Book Event" button**:
   - **If Event URL provided** → Opens URL in new tab
   - **If no Event URL** → Button shows "Booking link not available" (disabled)
   - **If event is over** → Button shows "Event is over" (disabled)

## Button States

| Condition | Button Text | Button State | Behavior |
|-----------|-------------|--------------|----------|
| Event has URL + Not over | "Book Event" | Enabled (amber) | Opens URL in new tab |
| Event has no URL | "Booking link not available" | Disabled (gray) | No action |
| Event is over | "Event is over" | Disabled (gray) | No action |

## Security Features

1. **Input Type**: `<input type="url">` validates URL format
2. **window.open parameters**: 
   - `target="_blank"` - Opens in new tab
   - `noopener` - Prevents access to window.opener
   - `noreferrer` - Doesn't send referrer info
3. **Optional field**: Event URL is not required (backward compatible)

## Example URLs

Valid Event URLs:
- `https://mytickets.lk/event/audio-diary-concert`
- `https://zoom.us/j/123456789?pwd=abc123`
- `https://forms.google.com/event-registration`
- `https://eventbrite.com/e/12345678`
- `https://www.facebook.com/events/123456`
- Any HTTPS URL

## Testing Checklist

### Admin Side:
- [ ] Can create event without Event URL (optional)
- [ ] Can create event with Event URL
- [ ] URL input validates format
- [ ] Can edit event and add/change Event URL
- [ ] Event URL saves to database
- [ ] Event URL persists after refresh

### User Side:
- [ ] Event without URL shows "Booking link not available"
- [ ] Event with URL shows "Book Event" button
- [ ] Click "Book Event" opens URL in new tab
- [ ] Past events show "Event is over"
- [ ] Disabled buttons cannot be clicked

## Database Migration

After updating the schema, run these commands:

```bash
# Navigate to backend
cd "SDP V3.0.1/backend"

# Generate Prisma client
npm run db:generate

# Push schema to database (creates event_url column)
npm run db:push

# Verify in database
# The event table should now have an event_url column
```

## Backward Compatibility

✅ **Fully backward compatible!**
- Existing events without eventUrl will work fine
- Button will show "Booking link not available" for old events
- No data migration needed
- Optional field (nullable in database)

## Summary

### Before:
- ❌ Hardcoded mytickets.lk URL
- ❌ All events redirect to same URL
- ❌ No flexibility for organizers

### After:
- ✅ Custom Event URL per event
- ✅ Organizers can specify any booking link
- ✅ Opens in new tab with security
- ✅ Clear "Booking link not available" message
- ✅ Fully backward compatible
- ✅ Optional field (not required)

The event booking system now supports custom URLs for each event, giving organizers full control over where users are directed when they book!
