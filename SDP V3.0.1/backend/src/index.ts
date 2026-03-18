import express, { Request, Response } from 'express';
import EventRouters from './routers/EventRouters';
import ClassRouters from './routers/ClassRouters';
import AppointmentRouter from './routers/AppointmentRouter';
import ErrorMiddlewares from './middlewares/ErrorMiddlewares';
import cors from 'cors';
import AuthRouter from './routers/AuthRouter';
import AttendanceRouter from './routers/AttendanceRouter';
import UserRouter from './routers/UserRouter';
import RevenueRouter from './routers/RevenueRouter';
import { authenticate } from './middlewares/auth.middleware';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use(authenticate);
app.use("/api/events", EventRouters);
app.use("/api/classes", ClassRouters);
app.use("/api/appointments", AppointmentRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/attendance", AttendanceRouter);
app.use("/api/users", UserRouter);
app.use("/api/admin/revenue", RevenueRouter);

// Error middleware
app.use(ErrorMiddlewares);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});