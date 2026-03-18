
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserType
 * 
 */
export type UserType = $Result.DefaultSelection<Prisma.$UserTypePayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model Class_Student
 * 
 */
export type Class_Student = $Result.DefaultSelection<Prisma.$Class_StudentPayload>
/**
 * Model Class_Installment
 * 
 */
export type Class_Installment = $Result.DefaultSelection<Prisma.$Class_InstallmentPayload>
/**
 * Model VocalRecordingAppointment
 * 
 */
export type VocalRecordingAppointment = $Result.DefaultSelection<Prisma.$VocalRecordingAppointmentPayload>
/**
 * Model VocalRecordingAppointmentDetail
 * 
 */
export type VocalRecordingAppointmentDetail = $Result.DefaultSelection<Prisma.$VocalRecordingAppointmentDetailPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PaymentType: {
  Appointment: 'Appointment',
  Course_Installment: 'Course_Installment'
};

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType]

}

export type PaymentType = $Enums.PaymentType

export const PaymentType: typeof $Enums.PaymentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userType`: Exposes CRUD operations for the **UserType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTypes
    * const userTypes = await prisma.userType.findMany()
    * ```
    */
  get userType(): Prisma.UserTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class_Student`: Exposes CRUD operations for the **Class_Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Class_Students
    * const class_Students = await prisma.class_Student.findMany()
    * ```
    */
  get class_Student(): Prisma.Class_StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class_Installment`: Exposes CRUD operations for the **Class_Installment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Class_Installments
    * const class_Installments = await prisma.class_Installment.findMany()
    * ```
    */
  get class_Installment(): Prisma.Class_InstallmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vocalRecordingAppointment`: Exposes CRUD operations for the **VocalRecordingAppointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VocalRecordingAppointments
    * const vocalRecordingAppointments = await prisma.vocalRecordingAppointment.findMany()
    * ```
    */
  get vocalRecordingAppointment(): Prisma.VocalRecordingAppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vocalRecordingAppointmentDetail`: Exposes CRUD operations for the **VocalRecordingAppointmentDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VocalRecordingAppointmentDetails
    * const vocalRecordingAppointmentDetails = await prisma.vocalRecordingAppointmentDetail.findMany()
    * ```
    */
  get vocalRecordingAppointmentDetail(): Prisma.VocalRecordingAppointmentDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserType: 'UserType',
    Attendance: 'Attendance',
    Event: 'Event',
    Class: 'Class',
    Class_Student: 'Class_Student',
    Class_Installment: 'Class_Installment',
    VocalRecordingAppointment: 'VocalRecordingAppointment',
    VocalRecordingAppointmentDetail: 'VocalRecordingAppointmentDetail',
    Payment: 'Payment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userType" | "attendance" | "event" | "class" | "class_Student" | "class_Installment" | "vocalRecordingAppointment" | "vocalRecordingAppointmentDetail" | "payment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserType: {
        payload: Prisma.$UserTypePayload<ExtArgs>
        fields: Prisma.UserTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload>
          }
          findFirst: {
            args: Prisma.UserTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload>
          }
          findMany: {
            args: Prisma.UserTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload>[]
          }
          create: {
            args: Prisma.UserTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload>
          }
          createMany: {
            args: Prisma.UserTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload>
          }
          update: {
            args: Prisma.UserTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload>
          }
          deleteMany: {
            args: Prisma.UserTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTypePayload>
          }
          aggregate: {
            args: Prisma.UserTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserType>
          }
          groupBy: {
            args: Prisma.UserTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserTypeCountArgs<ExtArgs>
            result: $Utils.Optional<UserTypeCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      Class_Student: {
        payload: Prisma.$Class_StudentPayload<ExtArgs>
        fields: Prisma.Class_StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Class_StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Class_StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload>
          }
          findFirst: {
            args: Prisma.Class_StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Class_StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload>
          }
          findMany: {
            args: Prisma.Class_StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload>[]
          }
          create: {
            args: Prisma.Class_StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload>
          }
          createMany: {
            args: Prisma.Class_StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.Class_StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload>
          }
          update: {
            args: Prisma.Class_StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload>
          }
          deleteMany: {
            args: Prisma.Class_StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Class_StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Class_StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_StudentPayload>
          }
          aggregate: {
            args: Prisma.Class_StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass_Student>
          }
          groupBy: {
            args: Prisma.Class_StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<Class_StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.Class_StudentCountArgs<ExtArgs>
            result: $Utils.Optional<Class_StudentCountAggregateOutputType> | number
          }
        }
      }
      Class_Installment: {
        payload: Prisma.$Class_InstallmentPayload<ExtArgs>
        fields: Prisma.Class_InstallmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Class_InstallmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Class_InstallmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload>
          }
          findFirst: {
            args: Prisma.Class_InstallmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Class_InstallmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload>
          }
          findMany: {
            args: Prisma.Class_InstallmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload>[]
          }
          create: {
            args: Prisma.Class_InstallmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload>
          }
          createMany: {
            args: Prisma.Class_InstallmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.Class_InstallmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload>
          }
          update: {
            args: Prisma.Class_InstallmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload>
          }
          deleteMany: {
            args: Prisma.Class_InstallmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Class_InstallmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Class_InstallmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Class_InstallmentPayload>
          }
          aggregate: {
            args: Prisma.Class_InstallmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass_Installment>
          }
          groupBy: {
            args: Prisma.Class_InstallmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<Class_InstallmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.Class_InstallmentCountArgs<ExtArgs>
            result: $Utils.Optional<Class_InstallmentCountAggregateOutputType> | number
          }
        }
      }
      VocalRecordingAppointment: {
        payload: Prisma.$VocalRecordingAppointmentPayload<ExtArgs>
        fields: Prisma.VocalRecordingAppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VocalRecordingAppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VocalRecordingAppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload>
          }
          findFirst: {
            args: Prisma.VocalRecordingAppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VocalRecordingAppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload>
          }
          findMany: {
            args: Prisma.VocalRecordingAppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload>[]
          }
          create: {
            args: Prisma.VocalRecordingAppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload>
          }
          createMany: {
            args: Prisma.VocalRecordingAppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VocalRecordingAppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload>
          }
          update: {
            args: Prisma.VocalRecordingAppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload>
          }
          deleteMany: {
            args: Prisma.VocalRecordingAppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VocalRecordingAppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VocalRecordingAppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentPayload>
          }
          aggregate: {
            args: Prisma.VocalRecordingAppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVocalRecordingAppointment>
          }
          groupBy: {
            args: Prisma.VocalRecordingAppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<VocalRecordingAppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.VocalRecordingAppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<VocalRecordingAppointmentCountAggregateOutputType> | number
          }
        }
      }
      VocalRecordingAppointmentDetail: {
        payload: Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>
        fields: Prisma.VocalRecordingAppointmentDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VocalRecordingAppointmentDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VocalRecordingAppointmentDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload>
          }
          findFirst: {
            args: Prisma.VocalRecordingAppointmentDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VocalRecordingAppointmentDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload>
          }
          findMany: {
            args: Prisma.VocalRecordingAppointmentDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload>[]
          }
          create: {
            args: Prisma.VocalRecordingAppointmentDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload>
          }
          createMany: {
            args: Prisma.VocalRecordingAppointmentDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VocalRecordingAppointmentDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload>
          }
          update: {
            args: Prisma.VocalRecordingAppointmentDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload>
          }
          deleteMany: {
            args: Prisma.VocalRecordingAppointmentDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VocalRecordingAppointmentDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VocalRecordingAppointmentDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocalRecordingAppointmentDetailPayload>
          }
          aggregate: {
            args: Prisma.VocalRecordingAppointmentDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVocalRecordingAppointmentDetail>
          }
          groupBy: {
            args: Prisma.VocalRecordingAppointmentDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<VocalRecordingAppointmentDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.VocalRecordingAppointmentDetailCountArgs<ExtArgs>
            result: $Utils.Optional<VocalRecordingAppointmentDetailCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userType?: UserTypeOmit
    attendance?: AttendanceOmit
    event?: EventOmit
    class?: ClassOmit
    class_Student?: Class_StudentOmit
    class_Installment?: Class_InstallmentOmit
    vocalRecordingAppointment?: VocalRecordingAppointmentOmit
    vocalRecordingAppointmentDetail?: VocalRecordingAppointmentDetailOmit
    payment?: PaymentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    attendance: number
    appointments: number
    class_students: number
    payments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | UserCountOutputTypeCountAttendanceArgs
    appointments?: boolean | UserCountOutputTypeCountAppointmentsArgs
    class_students?: boolean | UserCountOutputTypeCountClass_studentsArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocalRecordingAppointmentDetailWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClass_studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Class_StudentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type UserTypeCountOutputType
   */

  export type UserTypeCountOutputType = {
    users: number
  }

  export type UserTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | UserTypeCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * UserTypeCountOutputType without action
   */
  export type UserTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTypeCountOutputType
     */
    select?: UserTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserTypeCountOutputType without action
   */
  export type UserTypeCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type ClassCountOutputType
   */

  export type ClassCountOutputType = {
    class_students: number
  }

  export type ClassCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class_students?: boolean | ClassCountOutputTypeCountClass_studentsArgs
  }

  // Custom InputTypes
  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassCountOutputType
     */
    select?: ClassCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountClass_studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Class_StudentWhereInput
  }


  /**
   * Count Type Class_StudentCountOutputType
   */

  export type Class_StudentCountOutputType = {
    class_installments: number
  }

  export type Class_StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class_installments?: boolean | Class_StudentCountOutputTypeCountClass_installmentsArgs
  }

  // Custom InputTypes
  /**
   * Class_StudentCountOutputType without action
   */
  export type Class_StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_StudentCountOutputType
     */
    select?: Class_StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Class_StudentCountOutputType without action
   */
  export type Class_StudentCountOutputTypeCountClass_installmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Class_InstallmentWhereInput
  }


  /**
   * Count Type VocalRecordingAppointmentCountOutputType
   */

  export type VocalRecordingAppointmentCountOutputType = {
    details: number
  }

  export type VocalRecordingAppointmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    details?: boolean | VocalRecordingAppointmentCountOutputTypeCountDetailsArgs
  }

  // Custom InputTypes
  /**
   * VocalRecordingAppointmentCountOutputType without action
   */
  export type VocalRecordingAppointmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentCountOutputType
     */
    select?: VocalRecordingAppointmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VocalRecordingAppointmentCountOutputType without action
   */
  export type VocalRecordingAppointmentCountOutputTypeCountDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocalRecordingAppointmentDetailWhereInput
  }


  /**
   * Count Type VocalRecordingAppointmentDetailCountOutputType
   */

  export type VocalRecordingAppointmentDetailCountOutputType = {
    payments: number
  }

  export type VocalRecordingAppointmentDetailCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | VocalRecordingAppointmentDetailCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * VocalRecordingAppointmentDetailCountOutputType without action
   */
  export type VocalRecordingAppointmentDetailCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetailCountOutputType
     */
    select?: VocalRecordingAppointmentDetailCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VocalRecordingAppointmentDetailCountOutputType without action
   */
  export type VocalRecordingAppointmentDetailCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    typeId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    typeId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    firstName: string | null
    lastName: string | null
    password: string | null
    typeId: number | null
    contactNumber: string | null
    address: string | null
    city: string | null
    district: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleteStatus: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    firstName: string | null
    lastName: string | null
    password: string | null
    typeId: number | null
    contactNumber: string | null
    address: string | null
    city: string | null
    district: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleteStatus: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    password: number
    typeId: number
    contactNumber: number
    address: number
    city: number
    district: number
    createdAt: number
    updatedAt: number
    deleteStatus: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    typeId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    typeId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    password?: true
    typeId?: true
    contactNumber?: true
    address?: true
    city?: true
    district?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    password?: true
    typeId?: true
    contactNumber?: true
    address?: true
    city?: true
    district?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    password?: true
    typeId?: true
    contactNumber?: true
    address?: true
    city?: true
    district?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    firstName: string | null
    lastName: string | null
    password: string
    typeId: number
    contactNumber: string | null
    address: string | null
    city: string | null
    district: string | null
    createdAt: Date
    updatedAt: Date
    deleteStatus: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    password?: boolean
    typeId?: boolean
    contactNumber?: boolean
    address?: boolean
    city?: boolean
    district?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleteStatus?: boolean
    type?: boolean | UserTypeDefaultArgs<ExtArgs>
    attendance?: boolean | User$attendanceArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    class_students?: boolean | User$class_studentsArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    password?: boolean
    typeId?: boolean
    contactNumber?: boolean
    address?: boolean
    city?: boolean
    district?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleteStatus?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "password" | "typeId" | "contactNumber" | "address" | "city" | "district" | "createdAt" | "updatedAt" | "deleteStatus", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type?: boolean | UserTypeDefaultArgs<ExtArgs>
    attendance?: boolean | User$attendanceArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    class_students?: boolean | User$class_studentsArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      type: Prisma.$UserTypePayload<ExtArgs>
      attendance: Prisma.$AttendancePayload<ExtArgs>[]
      appointments: Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>[]
      class_students: Prisma.$Class_StudentPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      firstName: string | null
      lastName: string | null
      password: string
      typeId: number
      contactNumber: string | null
      address: string | null
      city: string | null
      district: string | null
      createdAt: Date
      updatedAt: Date
      deleteStatus: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    type<T extends UserTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserTypeDefaultArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attendance<T extends User$attendanceArgs<ExtArgs> = {}>(args?: Subset<T, User$attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends User$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    class_students<T extends User$class_studentsArgs<ExtArgs> = {}>(args?: Subset<T, User$class_studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly typeId: FieldRef<"User", 'Int'>
    readonly contactNumber: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly city: FieldRef<"User", 'String'>
    readonly district: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deleteStatus: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.attendance
   */
  export type User$attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * User.appointments
   */
  export type User$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    where?: VocalRecordingAppointmentDetailWhereInput
    orderBy?: VocalRecordingAppointmentDetailOrderByWithRelationInput | VocalRecordingAppointmentDetailOrderByWithRelationInput[]
    cursor?: VocalRecordingAppointmentDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VocalRecordingAppointmentDetailScalarFieldEnum | VocalRecordingAppointmentDetailScalarFieldEnum[]
  }

  /**
   * User.class_students
   */
  export type User$class_studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    where?: Class_StudentWhereInput
    orderBy?: Class_StudentOrderByWithRelationInput | Class_StudentOrderByWithRelationInput[]
    cursor?: Class_StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Class_StudentScalarFieldEnum | Class_StudentScalarFieldEnum[]
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserType
   */

  export type AggregateUserType = {
    _count: UserTypeCountAggregateOutputType | null
    _avg: UserTypeAvgAggregateOutputType | null
    _sum: UserTypeSumAggregateOutputType | null
    _min: UserTypeMinAggregateOutputType | null
    _max: UserTypeMaxAggregateOutputType | null
  }

  export type UserTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type UserTypeSumAggregateOutputType = {
    id: number | null
  }

  export type UserTypeMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type UserTypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type UserTypeCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type UserTypeAvgAggregateInputType = {
    id?: true
  }

  export type UserTypeSumAggregateInputType = {
    id?: true
  }

  export type UserTypeMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type UserTypeMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type UserTypeCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type UserTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserType to aggregate.
     */
    where?: UserTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTypes to fetch.
     */
    orderBy?: UserTypeOrderByWithRelationInput | UserTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserTypes
    **/
    _count?: true | UserTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserTypeMaxAggregateInputType
  }

  export type GetUserTypeAggregateType<T extends UserTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserType[P]>
      : GetScalarType<T[P], AggregateUserType[P]>
  }




  export type UserTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTypeWhereInput
    orderBy?: UserTypeOrderByWithAggregationInput | UserTypeOrderByWithAggregationInput[]
    by: UserTypeScalarFieldEnum[] | UserTypeScalarFieldEnum
    having?: UserTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserTypeCountAggregateInputType | true
    _avg?: UserTypeAvgAggregateInputType
    _sum?: UserTypeSumAggregateInputType
    _min?: UserTypeMinAggregateInputType
    _max?: UserTypeMaxAggregateInputType
  }

  export type UserTypeGroupByOutputType = {
    id: number
    name: string
    _count: UserTypeCountAggregateOutputType | null
    _avg: UserTypeAvgAggregateOutputType | null
    _sum: UserTypeSumAggregateOutputType | null
    _min: UserTypeMinAggregateOutputType | null
    _max: UserTypeMaxAggregateOutputType | null
  }

  type GetUserTypeGroupByPayload<T extends UserTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserTypeGroupByOutputType[P]>
            : GetScalarType<T[P], UserTypeGroupByOutputType[P]>
        }
      >
    >


  export type UserTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    users?: boolean | UserType$usersArgs<ExtArgs>
    _count?: boolean | UserTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userType"]>



  export type UserTypeSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type UserTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["userType"]>
  export type UserTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | UserType$usersArgs<ExtArgs>
    _count?: boolean | UserTypeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserType"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["userType"]>
    composites: {}
  }

  type UserTypeGetPayload<S extends boolean | null | undefined | UserTypeDefaultArgs> = $Result.GetResult<Prisma.$UserTypePayload, S>

  type UserTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserTypeCountAggregateInputType | true
    }

  export interface UserTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserType'], meta: { name: 'UserType' } }
    /**
     * Find zero or one UserType that matches the filter.
     * @param {UserTypeFindUniqueArgs} args - Arguments to find a UserType
     * @example
     * // Get one UserType
     * const userType = await prisma.userType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserTypeFindUniqueArgs>(args: SelectSubset<T, UserTypeFindUniqueArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserTypeFindUniqueOrThrowArgs} args - Arguments to find a UserType
     * @example
     * // Get one UserType
     * const userType = await prisma.userType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, UserTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTypeFindFirstArgs} args - Arguments to find a UserType
     * @example
     * // Get one UserType
     * const userType = await prisma.userType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserTypeFindFirstArgs>(args?: SelectSubset<T, UserTypeFindFirstArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTypeFindFirstOrThrowArgs} args - Arguments to find a UserType
     * @example
     * // Get one UserType
     * const userType = await prisma.userType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, UserTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTypes
     * const userTypes = await prisma.userType.findMany()
     * 
     * // Get first 10 UserTypes
     * const userTypes = await prisma.userType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userTypeWithIdOnly = await prisma.userType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserTypeFindManyArgs>(args?: SelectSubset<T, UserTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserType.
     * @param {UserTypeCreateArgs} args - Arguments to create a UserType.
     * @example
     * // Create one UserType
     * const UserType = await prisma.userType.create({
     *   data: {
     *     // ... data to create a UserType
     *   }
     * })
     * 
     */
    create<T extends UserTypeCreateArgs>(args: SelectSubset<T, UserTypeCreateArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserTypes.
     * @param {UserTypeCreateManyArgs} args - Arguments to create many UserTypes.
     * @example
     * // Create many UserTypes
     * const userType = await prisma.userType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserTypeCreateManyArgs>(args?: SelectSubset<T, UserTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserType.
     * @param {UserTypeDeleteArgs} args - Arguments to delete one UserType.
     * @example
     * // Delete one UserType
     * const UserType = await prisma.userType.delete({
     *   where: {
     *     // ... filter to delete one UserType
     *   }
     * })
     * 
     */
    delete<T extends UserTypeDeleteArgs>(args: SelectSubset<T, UserTypeDeleteArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserType.
     * @param {UserTypeUpdateArgs} args - Arguments to update one UserType.
     * @example
     * // Update one UserType
     * const userType = await prisma.userType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserTypeUpdateArgs>(args: SelectSubset<T, UserTypeUpdateArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserTypes.
     * @param {UserTypeDeleteManyArgs} args - Arguments to filter UserTypes to delete.
     * @example
     * // Delete a few UserTypes
     * const { count } = await prisma.userType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserTypeDeleteManyArgs>(args?: SelectSubset<T, UserTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTypes
     * const userType = await prisma.userType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserTypeUpdateManyArgs>(args: SelectSubset<T, UserTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserType.
     * @param {UserTypeUpsertArgs} args - Arguments to update or create a UserType.
     * @example
     * // Update or create a UserType
     * const userType = await prisma.userType.upsert({
     *   create: {
     *     // ... data to create a UserType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserType we want to update
     *   }
     * })
     */
    upsert<T extends UserTypeUpsertArgs>(args: SelectSubset<T, UserTypeUpsertArgs<ExtArgs>>): Prisma__UserTypeClient<$Result.GetResult<Prisma.$UserTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTypeCountArgs} args - Arguments to filter UserTypes to count.
     * @example
     * // Count the number of UserTypes
     * const count = await prisma.userType.count({
     *   where: {
     *     // ... the filter for the UserTypes we want to count
     *   }
     * })
    **/
    count<T extends UserTypeCountArgs>(
      args?: Subset<T, UserTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTypeAggregateArgs>(args: Subset<T, UserTypeAggregateArgs>): Prisma.PrismaPromise<GetUserTypeAggregateType<T>>

    /**
     * Group by UserType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserTypeGroupByArgs['orderBy'] }
        : { orderBy?: UserTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserType model
   */
  readonly fields: UserTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends UserType$usersArgs<ExtArgs> = {}>(args?: Subset<T, UserType$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserType model
   */
  interface UserTypeFieldRefs {
    readonly id: FieldRef<"UserType", 'Int'>
    readonly name: FieldRef<"UserType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserType findUnique
   */
  export type UserTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * Filter, which UserType to fetch.
     */
    where: UserTypeWhereUniqueInput
  }

  /**
   * UserType findUniqueOrThrow
   */
  export type UserTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * Filter, which UserType to fetch.
     */
    where: UserTypeWhereUniqueInput
  }

  /**
   * UserType findFirst
   */
  export type UserTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * Filter, which UserType to fetch.
     */
    where?: UserTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTypes to fetch.
     */
    orderBy?: UserTypeOrderByWithRelationInput | UserTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTypes.
     */
    cursor?: UserTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTypes.
     */
    distinct?: UserTypeScalarFieldEnum | UserTypeScalarFieldEnum[]
  }

  /**
   * UserType findFirstOrThrow
   */
  export type UserTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * Filter, which UserType to fetch.
     */
    where?: UserTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTypes to fetch.
     */
    orderBy?: UserTypeOrderByWithRelationInput | UserTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTypes.
     */
    cursor?: UserTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTypes.
     */
    distinct?: UserTypeScalarFieldEnum | UserTypeScalarFieldEnum[]
  }

  /**
   * UserType findMany
   */
  export type UserTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * Filter, which UserTypes to fetch.
     */
    where?: UserTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTypes to fetch.
     */
    orderBy?: UserTypeOrderByWithRelationInput | UserTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserTypes.
     */
    cursor?: UserTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTypes.
     */
    skip?: number
    distinct?: UserTypeScalarFieldEnum | UserTypeScalarFieldEnum[]
  }

  /**
   * UserType create
   */
  export type UserTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserType.
     */
    data: XOR<UserTypeCreateInput, UserTypeUncheckedCreateInput>
  }

  /**
   * UserType createMany
   */
  export type UserTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserTypes.
     */
    data: UserTypeCreateManyInput | UserTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserType update
   */
  export type UserTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserType.
     */
    data: XOR<UserTypeUpdateInput, UserTypeUncheckedUpdateInput>
    /**
     * Choose, which UserType to update.
     */
    where: UserTypeWhereUniqueInput
  }

  /**
   * UserType updateMany
   */
  export type UserTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserTypes.
     */
    data: XOR<UserTypeUpdateManyMutationInput, UserTypeUncheckedUpdateManyInput>
    /**
     * Filter which UserTypes to update
     */
    where?: UserTypeWhereInput
    /**
     * Limit how many UserTypes to update.
     */
    limit?: number
  }

  /**
   * UserType upsert
   */
  export type UserTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserType to update in case it exists.
     */
    where: UserTypeWhereUniqueInput
    /**
     * In case the UserType found by the `where` argument doesn't exist, create a new UserType with this data.
     */
    create: XOR<UserTypeCreateInput, UserTypeUncheckedCreateInput>
    /**
     * In case the UserType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserTypeUpdateInput, UserTypeUncheckedUpdateInput>
  }

  /**
   * UserType delete
   */
  export type UserTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
    /**
     * Filter which UserType to delete.
     */
    where: UserTypeWhereUniqueInput
  }

  /**
   * UserType deleteMany
   */
  export type UserTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserTypes to delete
     */
    where?: UserTypeWhereInput
    /**
     * Limit how many UserTypes to delete.
     */
    limit?: number
  }

  /**
   * UserType.users
   */
  export type UserType$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * UserType without action
   */
  export type UserTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserType
     */
    select?: UserTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserType
     */
    omit?: UserTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTypeInclude<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type AttendanceSumAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    date: Date | null
    time_in: Date | null
    time_out: Date | null
    note: string | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    date: Date | null
    time_in: Date | null
    time_out: Date | null
    note: string | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    user_id: number
    date: number
    time_in: number
    time_out: number
    note: number
    _all: number
  }


  export type AttendanceAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type AttendanceSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type AttendanceMinAggregateInputType = {
    id?: true
    user_id?: true
    date?: true
    time_in?: true
    time_out?: true
    note?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    user_id?: true
    date?: true
    time_in?: true
    time_out?: true
    note?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    user_id?: true
    date?: true
    time_in?: true
    time_out?: true
    note?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _avg?: AttendanceAvgAggregateInputType
    _sum?: AttendanceSumAggregateInputType
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: number
    user_id: number
    date: Date
    time_in: Date
    time_out: Date | null
    note: string | null
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    date?: boolean
    time_in?: boolean
    time_out?: boolean
    note?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>



  export type AttendanceSelectScalar = {
    id?: boolean
    user_id?: boolean
    date?: boolean
    time_in?: boolean
    time_out?: boolean
    note?: boolean
  }

  export type AttendanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "date" | "time_in" | "time_out" | "note", ExtArgs["result"]["attendance"]>
  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      date: Date
      time_in: Date
      time_out: Date | null
      note: string | null
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'Int'>
    readonly user_id: FieldRef<"Attendance", 'Int'>
    readonly date: FieldRef<"Attendance", 'DateTime'>
    readonly time_in: FieldRef<"Attendance", 'DateTime'>
    readonly time_out: FieldRef<"Attendance", 'DateTime'>
    readonly note: FieldRef<"Attendance", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to delete.
     */
    limit?: number
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    id: number | null
  }

  export type EventSumAggregateOutputType = {
    id: number | null
  }

  export type EventMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    location: string | null
    time: Date | null
    note: string | null
  }

  export type EventMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    location: string | null
    time: Date | null
    note: string | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    description: number
    startDate: number
    endDate: number
    location: number
    time: number
    note: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    id?: true
  }

  export type EventSumAggregateInputType = {
    id?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    location?: true
    time?: true
    note?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    location?: true
    time?: true
    note?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    location?: true
    time?: true
    note?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: number
    title: string
    description: string | null
    startDate: Date
    endDate: Date | null
    location: string | null
    time: Date | null
    note: string | null
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    location?: boolean
    time?: boolean
    note?: boolean
  }, ExtArgs["result"]["event"]>



  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    location?: boolean
    time?: boolean
    note?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "startDate" | "endDate" | "location" | "time" | "note", ExtArgs["result"]["event"]>

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      startDate: Date
      endDate: Date | null
      location: string | null
      time: Date | null
      note: string | null
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'Int'>
    readonly title: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly startDate: FieldRef<"Event", 'DateTime'>
    readonly endDate: FieldRef<"Event", 'DateTime'>
    readonly location: FieldRef<"Event", 'String'>
    readonly time: FieldRef<"Event", 'DateTime'>
    readonly note: FieldRef<"Event", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassAvgAggregateOutputType = {
    id: number | null
    installments_count: number | null
    installments_price: Decimal | null
    full_price: Decimal | null
  }

  export type ClassSumAggregateOutputType = {
    id: number | null
    installments_count: number | null
    installments_price: Decimal | null
    full_price: Decimal | null
  }

  export type ClassMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    duration: string | null
    day: string | null
    startTime: string | null
    endTime: string | null
    installments_count: number | null
    installments_price: Decimal | null
    full_price: Decimal | null
    startDate: Date | null
  }

  export type ClassMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    duration: string | null
    day: string | null
    startTime: string | null
    endTime: string | null
    installments_count: number | null
    installments_price: Decimal | null
    full_price: Decimal | null
    startDate: Date | null
  }

  export type ClassCountAggregateOutputType = {
    id: number
    name: number
    description: number
    duration: number
    day: number
    startTime: number
    endTime: number
    installments_count: number
    installments_price: number
    full_price: number
    startDate: number
    _all: number
  }


  export type ClassAvgAggregateInputType = {
    id?: true
    installments_count?: true
    installments_price?: true
    full_price?: true
  }

  export type ClassSumAggregateInputType = {
    id?: true
    installments_count?: true
    installments_price?: true
    full_price?: true
  }

  export type ClassMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    day?: true
    startTime?: true
    endTime?: true
    installments_count?: true
    installments_price?: true
    full_price?: true
    startDate?: true
  }

  export type ClassMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    day?: true
    startTime?: true
    endTime?: true
    installments_count?: true
    installments_price?: true
    full_price?: true
    startDate?: true
  }

  export type ClassCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    day?: true
    startTime?: true
    endTime?: true
    installments_count?: true
    installments_price?: true
    full_price?: true
    startDate?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _avg?: ClassAvgAggregateInputType
    _sum?: ClassSumAggregateInputType
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    id: number
    name: string
    description: string | null
    duration: string
    day: string
    startTime: string
    endTime: string | null
    installments_count: number
    installments_price: Decimal
    full_price: Decimal
    startDate: Date
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    duration?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    installments_count?: boolean
    installments_price?: boolean
    full_price?: boolean
    startDate?: boolean
    class_students?: boolean | Class$class_studentsArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>



  export type ClassSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    duration?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    installments_count?: boolean
    installments_price?: boolean
    full_price?: boolean
    startDate?: boolean
  }

  export type ClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "duration" | "day" | "startTime" | "endTime" | "installments_count" | "installments_price" | "full_price" | "startDate", ExtArgs["result"]["class"]>
  export type ClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class_students?: boolean | Class$class_studentsArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {
      class_students: Prisma.$Class_StudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      duration: string
      day: string
      startTime: string
      endTime: string | null
      installments_count: number
      installments_price: Prisma.Decimal
      full_price: Prisma.Decimal
      startDate: Date
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class_students<T extends Class$class_studentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$class_studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class model
   */
  interface ClassFieldRefs {
    readonly id: FieldRef<"Class", 'Int'>
    readonly name: FieldRef<"Class", 'String'>
    readonly description: FieldRef<"Class", 'String'>
    readonly duration: FieldRef<"Class", 'String'>
    readonly day: FieldRef<"Class", 'String'>
    readonly startTime: FieldRef<"Class", 'String'>
    readonly endTime: FieldRef<"Class", 'String'>
    readonly installments_count: FieldRef<"Class", 'Int'>
    readonly installments_price: FieldRef<"Class", 'Decimal'>
    readonly full_price: FieldRef<"Class", 'Decimal'>
    readonly startDate: FieldRef<"Class", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to delete.
     */
    limit?: number
  }

  /**
   * Class.class_students
   */
  export type Class$class_studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    where?: Class_StudentWhereInput
    orderBy?: Class_StudentOrderByWithRelationInput | Class_StudentOrderByWithRelationInput[]
    cursor?: Class_StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Class_StudentScalarFieldEnum | Class_StudentScalarFieldEnum[]
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
  }


  /**
   * Model Class_Student
   */

  export type AggregateClass_Student = {
    _count: Class_StudentCountAggregateOutputType | null
    _avg: Class_StudentAvgAggregateOutputType | null
    _sum: Class_StudentSumAggregateOutputType | null
    _min: Class_StudentMinAggregateOutputType | null
    _max: Class_StudentMaxAggregateOutputType | null
  }

  export type Class_StudentAvgAggregateOutputType = {
    id: number | null
    class_id: number | null
    student_id: number | null
  }

  export type Class_StudentSumAggregateOutputType = {
    id: number | null
    class_id: number | null
    student_id: number | null
  }

  export type Class_StudentMinAggregateOutputType = {
    id: number | null
    class_id: number | null
    student_id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deleteStatus: boolean | null
  }

  export type Class_StudentMaxAggregateOutputType = {
    id: number | null
    class_id: number | null
    student_id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deleteStatus: boolean | null
  }

  export type Class_StudentCountAggregateOutputType = {
    id: number
    class_id: number
    student_id: number
    createdAt: number
    updatedAt: number
    deleteStatus: number
    _all: number
  }


  export type Class_StudentAvgAggregateInputType = {
    id?: true
    class_id?: true
    student_id?: true
  }

  export type Class_StudentSumAggregateInputType = {
    id?: true
    class_id?: true
    student_id?: true
  }

  export type Class_StudentMinAggregateInputType = {
    id?: true
    class_id?: true
    student_id?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
  }

  export type Class_StudentMaxAggregateInputType = {
    id?: true
    class_id?: true
    student_id?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
  }

  export type Class_StudentCountAggregateInputType = {
    id?: true
    class_id?: true
    student_id?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
    _all?: true
  }

  export type Class_StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class_Student to aggregate.
     */
    where?: Class_StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_Students to fetch.
     */
    orderBy?: Class_StudentOrderByWithRelationInput | Class_StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Class_StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Class_Students
    **/
    _count?: true | Class_StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Class_StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Class_StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Class_StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Class_StudentMaxAggregateInputType
  }

  export type GetClass_StudentAggregateType<T extends Class_StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateClass_Student]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass_Student[P]>
      : GetScalarType<T[P], AggregateClass_Student[P]>
  }




  export type Class_StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Class_StudentWhereInput
    orderBy?: Class_StudentOrderByWithAggregationInput | Class_StudentOrderByWithAggregationInput[]
    by: Class_StudentScalarFieldEnum[] | Class_StudentScalarFieldEnum
    having?: Class_StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Class_StudentCountAggregateInputType | true
    _avg?: Class_StudentAvgAggregateInputType
    _sum?: Class_StudentSumAggregateInputType
    _min?: Class_StudentMinAggregateInputType
    _max?: Class_StudentMaxAggregateInputType
  }

  export type Class_StudentGroupByOutputType = {
    id: number
    class_id: number
    student_id: number
    createdAt: Date
    updatedAt: Date
    deleteStatus: boolean
    _count: Class_StudentCountAggregateOutputType | null
    _avg: Class_StudentAvgAggregateOutputType | null
    _sum: Class_StudentSumAggregateOutputType | null
    _min: Class_StudentMinAggregateOutputType | null
    _max: Class_StudentMaxAggregateOutputType | null
  }

  type GetClass_StudentGroupByPayload<T extends Class_StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Class_StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Class_StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Class_StudentGroupByOutputType[P]>
            : GetScalarType<T[P], Class_StudentGroupByOutputType[P]>
        }
      >
    >


  export type Class_StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    class_id?: boolean
    student_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleteStatus?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
    class_installments?: boolean | Class_Student$class_installmentsArgs<ExtArgs>
    _count?: boolean | Class_StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class_Student"]>



  export type Class_StudentSelectScalar = {
    id?: boolean
    class_id?: boolean
    student_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleteStatus?: boolean
  }

  export type Class_StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "class_id" | "student_id" | "createdAt" | "updatedAt" | "deleteStatus", ExtArgs["result"]["class_Student"]>
  export type Class_StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
    class_installments?: boolean | Class_Student$class_installmentsArgs<ExtArgs>
    _count?: boolean | Class_StudentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $Class_StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class_Student"
    objects: {
      class: Prisma.$ClassPayload<ExtArgs>
      student: Prisma.$UserPayload<ExtArgs>
      class_installments: Prisma.$Class_InstallmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      class_id: number
      student_id: number
      createdAt: Date
      updatedAt: Date
      deleteStatus: boolean
    }, ExtArgs["result"]["class_Student"]>
    composites: {}
  }

  type Class_StudentGetPayload<S extends boolean | null | undefined | Class_StudentDefaultArgs> = $Result.GetResult<Prisma.$Class_StudentPayload, S>

  type Class_StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Class_StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Class_StudentCountAggregateInputType | true
    }

  export interface Class_StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class_Student'], meta: { name: 'Class_Student' } }
    /**
     * Find zero or one Class_Student that matches the filter.
     * @param {Class_StudentFindUniqueArgs} args - Arguments to find a Class_Student
     * @example
     * // Get one Class_Student
     * const class_Student = await prisma.class_Student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Class_StudentFindUniqueArgs>(args: SelectSubset<T, Class_StudentFindUniqueArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class_Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Class_StudentFindUniqueOrThrowArgs} args - Arguments to find a Class_Student
     * @example
     * // Get one Class_Student
     * const class_Student = await prisma.class_Student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Class_StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, Class_StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class_Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_StudentFindFirstArgs} args - Arguments to find a Class_Student
     * @example
     * // Get one Class_Student
     * const class_Student = await prisma.class_Student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Class_StudentFindFirstArgs>(args?: SelectSubset<T, Class_StudentFindFirstArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class_Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_StudentFindFirstOrThrowArgs} args - Arguments to find a Class_Student
     * @example
     * // Get one Class_Student
     * const class_Student = await prisma.class_Student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Class_StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, Class_StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Class_Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Class_Students
     * const class_Students = await prisma.class_Student.findMany()
     * 
     * // Get first 10 Class_Students
     * const class_Students = await prisma.class_Student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const class_StudentWithIdOnly = await prisma.class_Student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Class_StudentFindManyArgs>(args?: SelectSubset<T, Class_StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class_Student.
     * @param {Class_StudentCreateArgs} args - Arguments to create a Class_Student.
     * @example
     * // Create one Class_Student
     * const Class_Student = await prisma.class_Student.create({
     *   data: {
     *     // ... data to create a Class_Student
     *   }
     * })
     * 
     */
    create<T extends Class_StudentCreateArgs>(args: SelectSubset<T, Class_StudentCreateArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Class_Students.
     * @param {Class_StudentCreateManyArgs} args - Arguments to create many Class_Students.
     * @example
     * // Create many Class_Students
     * const class_Student = await prisma.class_Student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Class_StudentCreateManyArgs>(args?: SelectSubset<T, Class_StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Class_Student.
     * @param {Class_StudentDeleteArgs} args - Arguments to delete one Class_Student.
     * @example
     * // Delete one Class_Student
     * const Class_Student = await prisma.class_Student.delete({
     *   where: {
     *     // ... filter to delete one Class_Student
     *   }
     * })
     * 
     */
    delete<T extends Class_StudentDeleteArgs>(args: SelectSubset<T, Class_StudentDeleteArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class_Student.
     * @param {Class_StudentUpdateArgs} args - Arguments to update one Class_Student.
     * @example
     * // Update one Class_Student
     * const class_Student = await prisma.class_Student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Class_StudentUpdateArgs>(args: SelectSubset<T, Class_StudentUpdateArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Class_Students.
     * @param {Class_StudentDeleteManyArgs} args - Arguments to filter Class_Students to delete.
     * @example
     * // Delete a few Class_Students
     * const { count } = await prisma.class_Student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Class_StudentDeleteManyArgs>(args?: SelectSubset<T, Class_StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Class_Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Class_Students
     * const class_Student = await prisma.class_Student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Class_StudentUpdateManyArgs>(args: SelectSubset<T, Class_StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Class_Student.
     * @param {Class_StudentUpsertArgs} args - Arguments to update or create a Class_Student.
     * @example
     * // Update or create a Class_Student
     * const class_Student = await prisma.class_Student.upsert({
     *   create: {
     *     // ... data to create a Class_Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class_Student we want to update
     *   }
     * })
     */
    upsert<T extends Class_StudentUpsertArgs>(args: SelectSubset<T, Class_StudentUpsertArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Class_Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_StudentCountArgs} args - Arguments to filter Class_Students to count.
     * @example
     * // Count the number of Class_Students
     * const count = await prisma.class_Student.count({
     *   where: {
     *     // ... the filter for the Class_Students we want to count
     *   }
     * })
    **/
    count<T extends Class_StudentCountArgs>(
      args?: Subset<T, Class_StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Class_StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class_Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Class_StudentAggregateArgs>(args: Subset<T, Class_StudentAggregateArgs>): Prisma.PrismaPromise<GetClass_StudentAggregateType<T>>

    /**
     * Group by Class_Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Class_StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Class_StudentGroupByArgs['orderBy'] }
        : { orderBy?: Class_StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Class_StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClass_StudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class_Student model
   */
  readonly fields: Class_StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class_Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Class_StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    class_installments<T extends Class_Student$class_installmentsArgs<ExtArgs> = {}>(args?: Subset<T, Class_Student$class_installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class_Student model
   */
  interface Class_StudentFieldRefs {
    readonly id: FieldRef<"Class_Student", 'Int'>
    readonly class_id: FieldRef<"Class_Student", 'Int'>
    readonly student_id: FieldRef<"Class_Student", 'Int'>
    readonly createdAt: FieldRef<"Class_Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Class_Student", 'DateTime'>
    readonly deleteStatus: FieldRef<"Class_Student", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Class_Student findUnique
   */
  export type Class_StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Student to fetch.
     */
    where: Class_StudentWhereUniqueInput
  }

  /**
   * Class_Student findUniqueOrThrow
   */
  export type Class_StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Student to fetch.
     */
    where: Class_StudentWhereUniqueInput
  }

  /**
   * Class_Student findFirst
   */
  export type Class_StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Student to fetch.
     */
    where?: Class_StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_Students to fetch.
     */
    orderBy?: Class_StudentOrderByWithRelationInput | Class_StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Class_Students.
     */
    cursor?: Class_StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Class_Students.
     */
    distinct?: Class_StudentScalarFieldEnum | Class_StudentScalarFieldEnum[]
  }

  /**
   * Class_Student findFirstOrThrow
   */
  export type Class_StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Student to fetch.
     */
    where?: Class_StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_Students to fetch.
     */
    orderBy?: Class_StudentOrderByWithRelationInput | Class_StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Class_Students.
     */
    cursor?: Class_StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Class_Students.
     */
    distinct?: Class_StudentScalarFieldEnum | Class_StudentScalarFieldEnum[]
  }

  /**
   * Class_Student findMany
   */
  export type Class_StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Students to fetch.
     */
    where?: Class_StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_Students to fetch.
     */
    orderBy?: Class_StudentOrderByWithRelationInput | Class_StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Class_Students.
     */
    cursor?: Class_StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_Students.
     */
    skip?: number
    distinct?: Class_StudentScalarFieldEnum | Class_StudentScalarFieldEnum[]
  }

  /**
   * Class_Student create
   */
  export type Class_StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Class_Student.
     */
    data: XOR<Class_StudentCreateInput, Class_StudentUncheckedCreateInput>
  }

  /**
   * Class_Student createMany
   */
  export type Class_StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Class_Students.
     */
    data: Class_StudentCreateManyInput | Class_StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class_Student update
   */
  export type Class_StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Class_Student.
     */
    data: XOR<Class_StudentUpdateInput, Class_StudentUncheckedUpdateInput>
    /**
     * Choose, which Class_Student to update.
     */
    where: Class_StudentWhereUniqueInput
  }

  /**
   * Class_Student updateMany
   */
  export type Class_StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Class_Students.
     */
    data: XOR<Class_StudentUpdateManyMutationInput, Class_StudentUncheckedUpdateManyInput>
    /**
     * Filter which Class_Students to update
     */
    where?: Class_StudentWhereInput
    /**
     * Limit how many Class_Students to update.
     */
    limit?: number
  }

  /**
   * Class_Student upsert
   */
  export type Class_StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Class_Student to update in case it exists.
     */
    where: Class_StudentWhereUniqueInput
    /**
     * In case the Class_Student found by the `where` argument doesn't exist, create a new Class_Student with this data.
     */
    create: XOR<Class_StudentCreateInput, Class_StudentUncheckedCreateInput>
    /**
     * In case the Class_Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Class_StudentUpdateInput, Class_StudentUncheckedUpdateInput>
  }

  /**
   * Class_Student delete
   */
  export type Class_StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
    /**
     * Filter which Class_Student to delete.
     */
    where: Class_StudentWhereUniqueInput
  }

  /**
   * Class_Student deleteMany
   */
  export type Class_StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class_Students to delete
     */
    where?: Class_StudentWhereInput
    /**
     * Limit how many Class_Students to delete.
     */
    limit?: number
  }

  /**
   * Class_Student.class_installments
   */
  export type Class_Student$class_installmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    where?: Class_InstallmentWhereInput
    orderBy?: Class_InstallmentOrderByWithRelationInput | Class_InstallmentOrderByWithRelationInput[]
    cursor?: Class_InstallmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Class_InstallmentScalarFieldEnum | Class_InstallmentScalarFieldEnum[]
  }

  /**
   * Class_Student without action
   */
  export type Class_StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Student
     */
    select?: Class_StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Student
     */
    omit?: Class_StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_StudentInclude<ExtArgs> | null
  }


  /**
   * Model Class_Installment
   */

  export type AggregateClass_Installment = {
    _count: Class_InstallmentCountAggregateOutputType | null
    _avg: Class_InstallmentAvgAggregateOutputType | null
    _sum: Class_InstallmentSumAggregateOutputType | null
    _min: Class_InstallmentMinAggregateOutputType | null
    _max: Class_InstallmentMaxAggregateOutputType | null
  }

  export type Class_InstallmentAvgAggregateOutputType = {
    id: number | null
    class_student_id: number | null
    amount: Decimal | null
  }

  export type Class_InstallmentSumAggregateOutputType = {
    id: number | null
    class_student_id: number | null
    amount: Decimal | null
  }

  export type Class_InstallmentMinAggregateOutputType = {
    id: number | null
    class_student_id: number | null
    amount: Decimal | null
    status: string | null
    paymentDate: Date | null
    paymentMethod: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleteStatus: boolean | null
    installments_Due_Date: Date | null
  }

  export type Class_InstallmentMaxAggregateOutputType = {
    id: number | null
    class_student_id: number | null
    amount: Decimal | null
    status: string | null
    paymentDate: Date | null
    paymentMethod: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleteStatus: boolean | null
    installments_Due_Date: Date | null
  }

  export type Class_InstallmentCountAggregateOutputType = {
    id: number
    class_student_id: number
    amount: number
    status: number
    paymentDate: number
    paymentMethod: number
    createdAt: number
    updatedAt: number
    deleteStatus: number
    installments_Due_Date: number
    _all: number
  }


  export type Class_InstallmentAvgAggregateInputType = {
    id?: true
    class_student_id?: true
    amount?: true
  }

  export type Class_InstallmentSumAggregateInputType = {
    id?: true
    class_student_id?: true
    amount?: true
  }

  export type Class_InstallmentMinAggregateInputType = {
    id?: true
    class_student_id?: true
    amount?: true
    status?: true
    paymentDate?: true
    paymentMethod?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
    installments_Due_Date?: true
  }

  export type Class_InstallmentMaxAggregateInputType = {
    id?: true
    class_student_id?: true
    amount?: true
    status?: true
    paymentDate?: true
    paymentMethod?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
    installments_Due_Date?: true
  }

  export type Class_InstallmentCountAggregateInputType = {
    id?: true
    class_student_id?: true
    amount?: true
    status?: true
    paymentDate?: true
    paymentMethod?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
    installments_Due_Date?: true
    _all?: true
  }

  export type Class_InstallmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class_Installment to aggregate.
     */
    where?: Class_InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_Installments to fetch.
     */
    orderBy?: Class_InstallmentOrderByWithRelationInput | Class_InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Class_InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Class_Installments
    **/
    _count?: true | Class_InstallmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Class_InstallmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Class_InstallmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Class_InstallmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Class_InstallmentMaxAggregateInputType
  }

  export type GetClass_InstallmentAggregateType<T extends Class_InstallmentAggregateArgs> = {
        [P in keyof T & keyof AggregateClass_Installment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass_Installment[P]>
      : GetScalarType<T[P], AggregateClass_Installment[P]>
  }




  export type Class_InstallmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Class_InstallmentWhereInput
    orderBy?: Class_InstallmentOrderByWithAggregationInput | Class_InstallmentOrderByWithAggregationInput[]
    by: Class_InstallmentScalarFieldEnum[] | Class_InstallmentScalarFieldEnum
    having?: Class_InstallmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Class_InstallmentCountAggregateInputType | true
    _avg?: Class_InstallmentAvgAggregateInputType
    _sum?: Class_InstallmentSumAggregateInputType
    _min?: Class_InstallmentMinAggregateInputType
    _max?: Class_InstallmentMaxAggregateInputType
  }

  export type Class_InstallmentGroupByOutputType = {
    id: number
    class_student_id: number
    amount: Decimal
    status: string
    paymentDate: Date
    paymentMethod: string
    createdAt: Date
    updatedAt: Date
    deleteStatus: boolean
    installments_Due_Date: Date
    _count: Class_InstallmentCountAggregateOutputType | null
    _avg: Class_InstallmentAvgAggregateOutputType | null
    _sum: Class_InstallmentSumAggregateOutputType | null
    _min: Class_InstallmentMinAggregateOutputType | null
    _max: Class_InstallmentMaxAggregateOutputType | null
  }

  type GetClass_InstallmentGroupByPayload<T extends Class_InstallmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Class_InstallmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Class_InstallmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Class_InstallmentGroupByOutputType[P]>
            : GetScalarType<T[P], Class_InstallmentGroupByOutputType[P]>
        }
      >
    >


  export type Class_InstallmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    class_student_id?: boolean
    amount?: boolean
    status?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleteStatus?: boolean
    installments_Due_Date?: boolean
    class_student?: boolean | Class_StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class_Installment"]>



  export type Class_InstallmentSelectScalar = {
    id?: boolean
    class_student_id?: boolean
    amount?: boolean
    status?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleteStatus?: boolean
    installments_Due_Date?: boolean
  }

  export type Class_InstallmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "class_student_id" | "amount" | "status" | "paymentDate" | "paymentMethod" | "createdAt" | "updatedAt" | "deleteStatus" | "installments_Due_Date", ExtArgs["result"]["class_Installment"]>
  export type Class_InstallmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class_student?: boolean | Class_StudentDefaultArgs<ExtArgs>
  }

  export type $Class_InstallmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class_Installment"
    objects: {
      class_student: Prisma.$Class_StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      class_student_id: number
      amount: Prisma.Decimal
      status: string
      paymentDate: Date
      paymentMethod: string
      createdAt: Date
      updatedAt: Date
      deleteStatus: boolean
      installments_Due_Date: Date
    }, ExtArgs["result"]["class_Installment"]>
    composites: {}
  }

  type Class_InstallmentGetPayload<S extends boolean | null | undefined | Class_InstallmentDefaultArgs> = $Result.GetResult<Prisma.$Class_InstallmentPayload, S>

  type Class_InstallmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Class_InstallmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Class_InstallmentCountAggregateInputType | true
    }

  export interface Class_InstallmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class_Installment'], meta: { name: 'Class_Installment' } }
    /**
     * Find zero or one Class_Installment that matches the filter.
     * @param {Class_InstallmentFindUniqueArgs} args - Arguments to find a Class_Installment
     * @example
     * // Get one Class_Installment
     * const class_Installment = await prisma.class_Installment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Class_InstallmentFindUniqueArgs>(args: SelectSubset<T, Class_InstallmentFindUniqueArgs<ExtArgs>>): Prisma__Class_InstallmentClient<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class_Installment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Class_InstallmentFindUniqueOrThrowArgs} args - Arguments to find a Class_Installment
     * @example
     * // Get one Class_Installment
     * const class_Installment = await prisma.class_Installment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Class_InstallmentFindUniqueOrThrowArgs>(args: SelectSubset<T, Class_InstallmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Class_InstallmentClient<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class_Installment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_InstallmentFindFirstArgs} args - Arguments to find a Class_Installment
     * @example
     * // Get one Class_Installment
     * const class_Installment = await prisma.class_Installment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Class_InstallmentFindFirstArgs>(args?: SelectSubset<T, Class_InstallmentFindFirstArgs<ExtArgs>>): Prisma__Class_InstallmentClient<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class_Installment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_InstallmentFindFirstOrThrowArgs} args - Arguments to find a Class_Installment
     * @example
     * // Get one Class_Installment
     * const class_Installment = await prisma.class_Installment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Class_InstallmentFindFirstOrThrowArgs>(args?: SelectSubset<T, Class_InstallmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__Class_InstallmentClient<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Class_Installments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_InstallmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Class_Installments
     * const class_Installments = await prisma.class_Installment.findMany()
     * 
     * // Get first 10 Class_Installments
     * const class_Installments = await prisma.class_Installment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const class_InstallmentWithIdOnly = await prisma.class_Installment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Class_InstallmentFindManyArgs>(args?: SelectSubset<T, Class_InstallmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class_Installment.
     * @param {Class_InstallmentCreateArgs} args - Arguments to create a Class_Installment.
     * @example
     * // Create one Class_Installment
     * const Class_Installment = await prisma.class_Installment.create({
     *   data: {
     *     // ... data to create a Class_Installment
     *   }
     * })
     * 
     */
    create<T extends Class_InstallmentCreateArgs>(args: SelectSubset<T, Class_InstallmentCreateArgs<ExtArgs>>): Prisma__Class_InstallmentClient<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Class_Installments.
     * @param {Class_InstallmentCreateManyArgs} args - Arguments to create many Class_Installments.
     * @example
     * // Create many Class_Installments
     * const class_Installment = await prisma.class_Installment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Class_InstallmentCreateManyArgs>(args?: SelectSubset<T, Class_InstallmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Class_Installment.
     * @param {Class_InstallmentDeleteArgs} args - Arguments to delete one Class_Installment.
     * @example
     * // Delete one Class_Installment
     * const Class_Installment = await prisma.class_Installment.delete({
     *   where: {
     *     // ... filter to delete one Class_Installment
     *   }
     * })
     * 
     */
    delete<T extends Class_InstallmentDeleteArgs>(args: SelectSubset<T, Class_InstallmentDeleteArgs<ExtArgs>>): Prisma__Class_InstallmentClient<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class_Installment.
     * @param {Class_InstallmentUpdateArgs} args - Arguments to update one Class_Installment.
     * @example
     * // Update one Class_Installment
     * const class_Installment = await prisma.class_Installment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Class_InstallmentUpdateArgs>(args: SelectSubset<T, Class_InstallmentUpdateArgs<ExtArgs>>): Prisma__Class_InstallmentClient<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Class_Installments.
     * @param {Class_InstallmentDeleteManyArgs} args - Arguments to filter Class_Installments to delete.
     * @example
     * // Delete a few Class_Installments
     * const { count } = await prisma.class_Installment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Class_InstallmentDeleteManyArgs>(args?: SelectSubset<T, Class_InstallmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Class_Installments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_InstallmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Class_Installments
     * const class_Installment = await prisma.class_Installment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Class_InstallmentUpdateManyArgs>(args: SelectSubset<T, Class_InstallmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Class_Installment.
     * @param {Class_InstallmentUpsertArgs} args - Arguments to update or create a Class_Installment.
     * @example
     * // Update or create a Class_Installment
     * const class_Installment = await prisma.class_Installment.upsert({
     *   create: {
     *     // ... data to create a Class_Installment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class_Installment we want to update
     *   }
     * })
     */
    upsert<T extends Class_InstallmentUpsertArgs>(args: SelectSubset<T, Class_InstallmentUpsertArgs<ExtArgs>>): Prisma__Class_InstallmentClient<$Result.GetResult<Prisma.$Class_InstallmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Class_Installments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_InstallmentCountArgs} args - Arguments to filter Class_Installments to count.
     * @example
     * // Count the number of Class_Installments
     * const count = await prisma.class_Installment.count({
     *   where: {
     *     // ... the filter for the Class_Installments we want to count
     *   }
     * })
    **/
    count<T extends Class_InstallmentCountArgs>(
      args?: Subset<T, Class_InstallmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Class_InstallmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class_Installment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_InstallmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Class_InstallmentAggregateArgs>(args: Subset<T, Class_InstallmentAggregateArgs>): Prisma.PrismaPromise<GetClass_InstallmentAggregateType<T>>

    /**
     * Group by Class_Installment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Class_InstallmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Class_InstallmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Class_InstallmentGroupByArgs['orderBy'] }
        : { orderBy?: Class_InstallmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Class_InstallmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClass_InstallmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class_Installment model
   */
  readonly fields: Class_InstallmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class_Installment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Class_InstallmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class_student<T extends Class_StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, Class_StudentDefaultArgs<ExtArgs>>): Prisma__Class_StudentClient<$Result.GetResult<Prisma.$Class_StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class_Installment model
   */
  interface Class_InstallmentFieldRefs {
    readonly id: FieldRef<"Class_Installment", 'Int'>
    readonly class_student_id: FieldRef<"Class_Installment", 'Int'>
    readonly amount: FieldRef<"Class_Installment", 'Decimal'>
    readonly status: FieldRef<"Class_Installment", 'String'>
    readonly paymentDate: FieldRef<"Class_Installment", 'DateTime'>
    readonly paymentMethod: FieldRef<"Class_Installment", 'String'>
    readonly createdAt: FieldRef<"Class_Installment", 'DateTime'>
    readonly updatedAt: FieldRef<"Class_Installment", 'DateTime'>
    readonly deleteStatus: FieldRef<"Class_Installment", 'Boolean'>
    readonly installments_Due_Date: FieldRef<"Class_Installment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Class_Installment findUnique
   */
  export type Class_InstallmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Installment to fetch.
     */
    where: Class_InstallmentWhereUniqueInput
  }

  /**
   * Class_Installment findUniqueOrThrow
   */
  export type Class_InstallmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Installment to fetch.
     */
    where: Class_InstallmentWhereUniqueInput
  }

  /**
   * Class_Installment findFirst
   */
  export type Class_InstallmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Installment to fetch.
     */
    where?: Class_InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_Installments to fetch.
     */
    orderBy?: Class_InstallmentOrderByWithRelationInput | Class_InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Class_Installments.
     */
    cursor?: Class_InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Class_Installments.
     */
    distinct?: Class_InstallmentScalarFieldEnum | Class_InstallmentScalarFieldEnum[]
  }

  /**
   * Class_Installment findFirstOrThrow
   */
  export type Class_InstallmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Installment to fetch.
     */
    where?: Class_InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_Installments to fetch.
     */
    orderBy?: Class_InstallmentOrderByWithRelationInput | Class_InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Class_Installments.
     */
    cursor?: Class_InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Class_Installments.
     */
    distinct?: Class_InstallmentScalarFieldEnum | Class_InstallmentScalarFieldEnum[]
  }

  /**
   * Class_Installment findMany
   */
  export type Class_InstallmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Class_Installments to fetch.
     */
    where?: Class_InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Class_Installments to fetch.
     */
    orderBy?: Class_InstallmentOrderByWithRelationInput | Class_InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Class_Installments.
     */
    cursor?: Class_InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Class_Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Class_Installments.
     */
    skip?: number
    distinct?: Class_InstallmentScalarFieldEnum | Class_InstallmentScalarFieldEnum[]
  }

  /**
   * Class_Installment create
   */
  export type Class_InstallmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Class_Installment.
     */
    data: XOR<Class_InstallmentCreateInput, Class_InstallmentUncheckedCreateInput>
  }

  /**
   * Class_Installment createMany
   */
  export type Class_InstallmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Class_Installments.
     */
    data: Class_InstallmentCreateManyInput | Class_InstallmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class_Installment update
   */
  export type Class_InstallmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Class_Installment.
     */
    data: XOR<Class_InstallmentUpdateInput, Class_InstallmentUncheckedUpdateInput>
    /**
     * Choose, which Class_Installment to update.
     */
    where: Class_InstallmentWhereUniqueInput
  }

  /**
   * Class_Installment updateMany
   */
  export type Class_InstallmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Class_Installments.
     */
    data: XOR<Class_InstallmentUpdateManyMutationInput, Class_InstallmentUncheckedUpdateManyInput>
    /**
     * Filter which Class_Installments to update
     */
    where?: Class_InstallmentWhereInput
    /**
     * Limit how many Class_Installments to update.
     */
    limit?: number
  }

  /**
   * Class_Installment upsert
   */
  export type Class_InstallmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Class_Installment to update in case it exists.
     */
    where: Class_InstallmentWhereUniqueInput
    /**
     * In case the Class_Installment found by the `where` argument doesn't exist, create a new Class_Installment with this data.
     */
    create: XOR<Class_InstallmentCreateInput, Class_InstallmentUncheckedCreateInput>
    /**
     * In case the Class_Installment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Class_InstallmentUpdateInput, Class_InstallmentUncheckedUpdateInput>
  }

  /**
   * Class_Installment delete
   */
  export type Class_InstallmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
    /**
     * Filter which Class_Installment to delete.
     */
    where: Class_InstallmentWhereUniqueInput
  }

  /**
   * Class_Installment deleteMany
   */
  export type Class_InstallmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class_Installments to delete
     */
    where?: Class_InstallmentWhereInput
    /**
     * Limit how many Class_Installments to delete.
     */
    limit?: number
  }

  /**
   * Class_Installment without action
   */
  export type Class_InstallmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class_Installment
     */
    select?: Class_InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class_Installment
     */
    omit?: Class_InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Class_InstallmentInclude<ExtArgs> | null
  }


  /**
   * Model VocalRecordingAppointment
   */

  export type AggregateVocalRecordingAppointment = {
    _count: VocalRecordingAppointmentCountAggregateOutputType | null
    _avg: VocalRecordingAppointmentAvgAggregateOutputType | null
    _sum: VocalRecordingAppointmentSumAggregateOutputType | null
    _min: VocalRecordingAppointmentMinAggregateOutputType | null
    _max: VocalRecordingAppointmentMaxAggregateOutputType | null
  }

  export type VocalRecordingAppointmentAvgAggregateOutputType = {
    id: number | null
  }

  export type VocalRecordingAppointmentSumAggregateOutputType = {
    id: number | null
  }

  export type VocalRecordingAppointmentMinAggregateOutputType = {
    id: number | null
    date: string | null
    status: string | null
    note: string | null
  }

  export type VocalRecordingAppointmentMaxAggregateOutputType = {
    id: number | null
    date: string | null
    status: string | null
    note: string | null
  }

  export type VocalRecordingAppointmentCountAggregateOutputType = {
    id: number
    date: number
    status: number
    note: number
    _all: number
  }


  export type VocalRecordingAppointmentAvgAggregateInputType = {
    id?: true
  }

  export type VocalRecordingAppointmentSumAggregateInputType = {
    id?: true
  }

  export type VocalRecordingAppointmentMinAggregateInputType = {
    id?: true
    date?: true
    status?: true
    note?: true
  }

  export type VocalRecordingAppointmentMaxAggregateInputType = {
    id?: true
    date?: true
    status?: true
    note?: true
  }

  export type VocalRecordingAppointmentCountAggregateInputType = {
    id?: true
    date?: true
    status?: true
    note?: true
    _all?: true
  }

  export type VocalRecordingAppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VocalRecordingAppointment to aggregate.
     */
    where?: VocalRecordingAppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocalRecordingAppointments to fetch.
     */
    orderBy?: VocalRecordingAppointmentOrderByWithRelationInput | VocalRecordingAppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VocalRecordingAppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocalRecordingAppointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocalRecordingAppointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VocalRecordingAppointments
    **/
    _count?: true | VocalRecordingAppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VocalRecordingAppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VocalRecordingAppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VocalRecordingAppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VocalRecordingAppointmentMaxAggregateInputType
  }

  export type GetVocalRecordingAppointmentAggregateType<T extends VocalRecordingAppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateVocalRecordingAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVocalRecordingAppointment[P]>
      : GetScalarType<T[P], AggregateVocalRecordingAppointment[P]>
  }




  export type VocalRecordingAppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocalRecordingAppointmentWhereInput
    orderBy?: VocalRecordingAppointmentOrderByWithAggregationInput | VocalRecordingAppointmentOrderByWithAggregationInput[]
    by: VocalRecordingAppointmentScalarFieldEnum[] | VocalRecordingAppointmentScalarFieldEnum
    having?: VocalRecordingAppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VocalRecordingAppointmentCountAggregateInputType | true
    _avg?: VocalRecordingAppointmentAvgAggregateInputType
    _sum?: VocalRecordingAppointmentSumAggregateInputType
    _min?: VocalRecordingAppointmentMinAggregateInputType
    _max?: VocalRecordingAppointmentMaxAggregateInputType
  }

  export type VocalRecordingAppointmentGroupByOutputType = {
    id: number
    date: string
    status: string
    note: string | null
    _count: VocalRecordingAppointmentCountAggregateOutputType | null
    _avg: VocalRecordingAppointmentAvgAggregateOutputType | null
    _sum: VocalRecordingAppointmentSumAggregateOutputType | null
    _min: VocalRecordingAppointmentMinAggregateOutputType | null
    _max: VocalRecordingAppointmentMaxAggregateOutputType | null
  }

  type GetVocalRecordingAppointmentGroupByPayload<T extends VocalRecordingAppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VocalRecordingAppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VocalRecordingAppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VocalRecordingAppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], VocalRecordingAppointmentGroupByOutputType[P]>
        }
      >
    >


  export type VocalRecordingAppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    status?: boolean
    note?: boolean
    details?: boolean | VocalRecordingAppointment$detailsArgs<ExtArgs>
    _count?: boolean | VocalRecordingAppointmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocalRecordingAppointment"]>



  export type VocalRecordingAppointmentSelectScalar = {
    id?: boolean
    date?: boolean
    status?: boolean
    note?: boolean
  }

  export type VocalRecordingAppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "status" | "note", ExtArgs["result"]["vocalRecordingAppointment"]>
  export type VocalRecordingAppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    details?: boolean | VocalRecordingAppointment$detailsArgs<ExtArgs>
    _count?: boolean | VocalRecordingAppointmentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VocalRecordingAppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VocalRecordingAppointment"
    objects: {
      details: Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: string
      status: string
      note: string | null
    }, ExtArgs["result"]["vocalRecordingAppointment"]>
    composites: {}
  }

  type VocalRecordingAppointmentGetPayload<S extends boolean | null | undefined | VocalRecordingAppointmentDefaultArgs> = $Result.GetResult<Prisma.$VocalRecordingAppointmentPayload, S>

  type VocalRecordingAppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VocalRecordingAppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VocalRecordingAppointmentCountAggregateInputType | true
    }

  export interface VocalRecordingAppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VocalRecordingAppointment'], meta: { name: 'VocalRecordingAppointment' } }
    /**
     * Find zero or one VocalRecordingAppointment that matches the filter.
     * @param {VocalRecordingAppointmentFindUniqueArgs} args - Arguments to find a VocalRecordingAppointment
     * @example
     * // Get one VocalRecordingAppointment
     * const vocalRecordingAppointment = await prisma.vocalRecordingAppointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VocalRecordingAppointmentFindUniqueArgs>(args: SelectSubset<T, VocalRecordingAppointmentFindUniqueArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VocalRecordingAppointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VocalRecordingAppointmentFindUniqueOrThrowArgs} args - Arguments to find a VocalRecordingAppointment
     * @example
     * // Get one VocalRecordingAppointment
     * const vocalRecordingAppointment = await prisma.vocalRecordingAppointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VocalRecordingAppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, VocalRecordingAppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VocalRecordingAppointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentFindFirstArgs} args - Arguments to find a VocalRecordingAppointment
     * @example
     * // Get one VocalRecordingAppointment
     * const vocalRecordingAppointment = await prisma.vocalRecordingAppointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VocalRecordingAppointmentFindFirstArgs>(args?: SelectSubset<T, VocalRecordingAppointmentFindFirstArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VocalRecordingAppointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentFindFirstOrThrowArgs} args - Arguments to find a VocalRecordingAppointment
     * @example
     * // Get one VocalRecordingAppointment
     * const vocalRecordingAppointment = await prisma.vocalRecordingAppointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VocalRecordingAppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, VocalRecordingAppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VocalRecordingAppointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VocalRecordingAppointments
     * const vocalRecordingAppointments = await prisma.vocalRecordingAppointment.findMany()
     * 
     * // Get first 10 VocalRecordingAppointments
     * const vocalRecordingAppointments = await prisma.vocalRecordingAppointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vocalRecordingAppointmentWithIdOnly = await prisma.vocalRecordingAppointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VocalRecordingAppointmentFindManyArgs>(args?: SelectSubset<T, VocalRecordingAppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VocalRecordingAppointment.
     * @param {VocalRecordingAppointmentCreateArgs} args - Arguments to create a VocalRecordingAppointment.
     * @example
     * // Create one VocalRecordingAppointment
     * const VocalRecordingAppointment = await prisma.vocalRecordingAppointment.create({
     *   data: {
     *     // ... data to create a VocalRecordingAppointment
     *   }
     * })
     * 
     */
    create<T extends VocalRecordingAppointmentCreateArgs>(args: SelectSubset<T, VocalRecordingAppointmentCreateArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VocalRecordingAppointments.
     * @param {VocalRecordingAppointmentCreateManyArgs} args - Arguments to create many VocalRecordingAppointments.
     * @example
     * // Create many VocalRecordingAppointments
     * const vocalRecordingAppointment = await prisma.vocalRecordingAppointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VocalRecordingAppointmentCreateManyArgs>(args?: SelectSubset<T, VocalRecordingAppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VocalRecordingAppointment.
     * @param {VocalRecordingAppointmentDeleteArgs} args - Arguments to delete one VocalRecordingAppointment.
     * @example
     * // Delete one VocalRecordingAppointment
     * const VocalRecordingAppointment = await prisma.vocalRecordingAppointment.delete({
     *   where: {
     *     // ... filter to delete one VocalRecordingAppointment
     *   }
     * })
     * 
     */
    delete<T extends VocalRecordingAppointmentDeleteArgs>(args: SelectSubset<T, VocalRecordingAppointmentDeleteArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VocalRecordingAppointment.
     * @param {VocalRecordingAppointmentUpdateArgs} args - Arguments to update one VocalRecordingAppointment.
     * @example
     * // Update one VocalRecordingAppointment
     * const vocalRecordingAppointment = await prisma.vocalRecordingAppointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VocalRecordingAppointmentUpdateArgs>(args: SelectSubset<T, VocalRecordingAppointmentUpdateArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VocalRecordingAppointments.
     * @param {VocalRecordingAppointmentDeleteManyArgs} args - Arguments to filter VocalRecordingAppointments to delete.
     * @example
     * // Delete a few VocalRecordingAppointments
     * const { count } = await prisma.vocalRecordingAppointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VocalRecordingAppointmentDeleteManyArgs>(args?: SelectSubset<T, VocalRecordingAppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VocalRecordingAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VocalRecordingAppointments
     * const vocalRecordingAppointment = await prisma.vocalRecordingAppointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VocalRecordingAppointmentUpdateManyArgs>(args: SelectSubset<T, VocalRecordingAppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VocalRecordingAppointment.
     * @param {VocalRecordingAppointmentUpsertArgs} args - Arguments to update or create a VocalRecordingAppointment.
     * @example
     * // Update or create a VocalRecordingAppointment
     * const vocalRecordingAppointment = await prisma.vocalRecordingAppointment.upsert({
     *   create: {
     *     // ... data to create a VocalRecordingAppointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VocalRecordingAppointment we want to update
     *   }
     * })
     */
    upsert<T extends VocalRecordingAppointmentUpsertArgs>(args: SelectSubset<T, VocalRecordingAppointmentUpsertArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VocalRecordingAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentCountArgs} args - Arguments to filter VocalRecordingAppointments to count.
     * @example
     * // Count the number of VocalRecordingAppointments
     * const count = await prisma.vocalRecordingAppointment.count({
     *   where: {
     *     // ... the filter for the VocalRecordingAppointments we want to count
     *   }
     * })
    **/
    count<T extends VocalRecordingAppointmentCountArgs>(
      args?: Subset<T, VocalRecordingAppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VocalRecordingAppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VocalRecordingAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VocalRecordingAppointmentAggregateArgs>(args: Subset<T, VocalRecordingAppointmentAggregateArgs>): Prisma.PrismaPromise<GetVocalRecordingAppointmentAggregateType<T>>

    /**
     * Group by VocalRecordingAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VocalRecordingAppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VocalRecordingAppointmentGroupByArgs['orderBy'] }
        : { orderBy?: VocalRecordingAppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VocalRecordingAppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVocalRecordingAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VocalRecordingAppointment model
   */
  readonly fields: VocalRecordingAppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VocalRecordingAppointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VocalRecordingAppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    details<T extends VocalRecordingAppointment$detailsArgs<ExtArgs> = {}>(args?: Subset<T, VocalRecordingAppointment$detailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VocalRecordingAppointment model
   */
  interface VocalRecordingAppointmentFieldRefs {
    readonly id: FieldRef<"VocalRecordingAppointment", 'Int'>
    readonly date: FieldRef<"VocalRecordingAppointment", 'String'>
    readonly status: FieldRef<"VocalRecordingAppointment", 'String'>
    readonly note: FieldRef<"VocalRecordingAppointment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VocalRecordingAppointment findUnique
   */
  export type VocalRecordingAppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointment to fetch.
     */
    where: VocalRecordingAppointmentWhereUniqueInput
  }

  /**
   * VocalRecordingAppointment findUniqueOrThrow
   */
  export type VocalRecordingAppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointment to fetch.
     */
    where: VocalRecordingAppointmentWhereUniqueInput
  }

  /**
   * VocalRecordingAppointment findFirst
   */
  export type VocalRecordingAppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointment to fetch.
     */
    where?: VocalRecordingAppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocalRecordingAppointments to fetch.
     */
    orderBy?: VocalRecordingAppointmentOrderByWithRelationInput | VocalRecordingAppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VocalRecordingAppointments.
     */
    cursor?: VocalRecordingAppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocalRecordingAppointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocalRecordingAppointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VocalRecordingAppointments.
     */
    distinct?: VocalRecordingAppointmentScalarFieldEnum | VocalRecordingAppointmentScalarFieldEnum[]
  }

  /**
   * VocalRecordingAppointment findFirstOrThrow
   */
  export type VocalRecordingAppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointment to fetch.
     */
    where?: VocalRecordingAppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocalRecordingAppointments to fetch.
     */
    orderBy?: VocalRecordingAppointmentOrderByWithRelationInput | VocalRecordingAppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VocalRecordingAppointments.
     */
    cursor?: VocalRecordingAppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocalRecordingAppointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocalRecordingAppointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VocalRecordingAppointments.
     */
    distinct?: VocalRecordingAppointmentScalarFieldEnum | VocalRecordingAppointmentScalarFieldEnum[]
  }

  /**
   * VocalRecordingAppointment findMany
   */
  export type VocalRecordingAppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointments to fetch.
     */
    where?: VocalRecordingAppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocalRecordingAppointments to fetch.
     */
    orderBy?: VocalRecordingAppointmentOrderByWithRelationInput | VocalRecordingAppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VocalRecordingAppointments.
     */
    cursor?: VocalRecordingAppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocalRecordingAppointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocalRecordingAppointments.
     */
    skip?: number
    distinct?: VocalRecordingAppointmentScalarFieldEnum | VocalRecordingAppointmentScalarFieldEnum[]
  }

  /**
   * VocalRecordingAppointment create
   */
  export type VocalRecordingAppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a VocalRecordingAppointment.
     */
    data: XOR<VocalRecordingAppointmentCreateInput, VocalRecordingAppointmentUncheckedCreateInput>
  }

  /**
   * VocalRecordingAppointment createMany
   */
  export type VocalRecordingAppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VocalRecordingAppointments.
     */
    data: VocalRecordingAppointmentCreateManyInput | VocalRecordingAppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VocalRecordingAppointment update
   */
  export type VocalRecordingAppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a VocalRecordingAppointment.
     */
    data: XOR<VocalRecordingAppointmentUpdateInput, VocalRecordingAppointmentUncheckedUpdateInput>
    /**
     * Choose, which VocalRecordingAppointment to update.
     */
    where: VocalRecordingAppointmentWhereUniqueInput
  }

  /**
   * VocalRecordingAppointment updateMany
   */
  export type VocalRecordingAppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VocalRecordingAppointments.
     */
    data: XOR<VocalRecordingAppointmentUpdateManyMutationInput, VocalRecordingAppointmentUncheckedUpdateManyInput>
    /**
     * Filter which VocalRecordingAppointments to update
     */
    where?: VocalRecordingAppointmentWhereInput
    /**
     * Limit how many VocalRecordingAppointments to update.
     */
    limit?: number
  }

  /**
   * VocalRecordingAppointment upsert
   */
  export type VocalRecordingAppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the VocalRecordingAppointment to update in case it exists.
     */
    where: VocalRecordingAppointmentWhereUniqueInput
    /**
     * In case the VocalRecordingAppointment found by the `where` argument doesn't exist, create a new VocalRecordingAppointment with this data.
     */
    create: XOR<VocalRecordingAppointmentCreateInput, VocalRecordingAppointmentUncheckedCreateInput>
    /**
     * In case the VocalRecordingAppointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VocalRecordingAppointmentUpdateInput, VocalRecordingAppointmentUncheckedUpdateInput>
  }

  /**
   * VocalRecordingAppointment delete
   */
  export type VocalRecordingAppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
    /**
     * Filter which VocalRecordingAppointment to delete.
     */
    where: VocalRecordingAppointmentWhereUniqueInput
  }

  /**
   * VocalRecordingAppointment deleteMany
   */
  export type VocalRecordingAppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VocalRecordingAppointments to delete
     */
    where?: VocalRecordingAppointmentWhereInput
    /**
     * Limit how many VocalRecordingAppointments to delete.
     */
    limit?: number
  }

  /**
   * VocalRecordingAppointment.details
   */
  export type VocalRecordingAppointment$detailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    where?: VocalRecordingAppointmentDetailWhereInput
    orderBy?: VocalRecordingAppointmentDetailOrderByWithRelationInput | VocalRecordingAppointmentDetailOrderByWithRelationInput[]
    cursor?: VocalRecordingAppointmentDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VocalRecordingAppointmentDetailScalarFieldEnum | VocalRecordingAppointmentDetailScalarFieldEnum[]
  }

  /**
   * VocalRecordingAppointment without action
   */
  export type VocalRecordingAppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointment
     */
    select?: VocalRecordingAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointment
     */
    omit?: VocalRecordingAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentInclude<ExtArgs> | null
  }


  /**
   * Model VocalRecordingAppointmentDetail
   */

  export type AggregateVocalRecordingAppointmentDetail = {
    _count: VocalRecordingAppointmentDetailCountAggregateOutputType | null
    _avg: VocalRecordingAppointmentDetailAvgAggregateOutputType | null
    _sum: VocalRecordingAppointmentDetailSumAggregateOutputType | null
    _min: VocalRecordingAppointmentDetailMinAggregateOutputType | null
    _max: VocalRecordingAppointmentDetailMaxAggregateOutputType | null
  }

  export type VocalRecordingAppointmentDetailAvgAggregateOutputType = {
    id: number | null
    appointment_id: number | null
    user_id: number | null
  }

  export type VocalRecordingAppointmentDetailSumAggregateOutputType = {
    id: number | null
    appointment_id: number | null
    user_id: number | null
  }

  export type VocalRecordingAppointmentDetailMinAggregateOutputType = {
    id: number | null
    appointment_id: number | null
    time_in: string | null
    time_out: string | null
    note: string | null
    user_id: number | null
    status: string | null
    isCancel: boolean | null
  }

  export type VocalRecordingAppointmentDetailMaxAggregateOutputType = {
    id: number | null
    appointment_id: number | null
    time_in: string | null
    time_out: string | null
    note: string | null
    user_id: number | null
    status: string | null
    isCancel: boolean | null
  }

  export type VocalRecordingAppointmentDetailCountAggregateOutputType = {
    id: number
    appointment_id: number
    time_in: number
    time_out: number
    note: number
    user_id: number
    status: number
    isCancel: number
    _all: number
  }


  export type VocalRecordingAppointmentDetailAvgAggregateInputType = {
    id?: true
    appointment_id?: true
    user_id?: true
  }

  export type VocalRecordingAppointmentDetailSumAggregateInputType = {
    id?: true
    appointment_id?: true
    user_id?: true
  }

  export type VocalRecordingAppointmentDetailMinAggregateInputType = {
    id?: true
    appointment_id?: true
    time_in?: true
    time_out?: true
    note?: true
    user_id?: true
    status?: true
    isCancel?: true
  }

  export type VocalRecordingAppointmentDetailMaxAggregateInputType = {
    id?: true
    appointment_id?: true
    time_in?: true
    time_out?: true
    note?: true
    user_id?: true
    status?: true
    isCancel?: true
  }

  export type VocalRecordingAppointmentDetailCountAggregateInputType = {
    id?: true
    appointment_id?: true
    time_in?: true
    time_out?: true
    note?: true
    user_id?: true
    status?: true
    isCancel?: true
    _all?: true
  }

  export type VocalRecordingAppointmentDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VocalRecordingAppointmentDetail to aggregate.
     */
    where?: VocalRecordingAppointmentDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocalRecordingAppointmentDetails to fetch.
     */
    orderBy?: VocalRecordingAppointmentDetailOrderByWithRelationInput | VocalRecordingAppointmentDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VocalRecordingAppointmentDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocalRecordingAppointmentDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocalRecordingAppointmentDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VocalRecordingAppointmentDetails
    **/
    _count?: true | VocalRecordingAppointmentDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VocalRecordingAppointmentDetailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VocalRecordingAppointmentDetailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VocalRecordingAppointmentDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VocalRecordingAppointmentDetailMaxAggregateInputType
  }

  export type GetVocalRecordingAppointmentDetailAggregateType<T extends VocalRecordingAppointmentDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateVocalRecordingAppointmentDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVocalRecordingAppointmentDetail[P]>
      : GetScalarType<T[P], AggregateVocalRecordingAppointmentDetail[P]>
  }




  export type VocalRecordingAppointmentDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocalRecordingAppointmentDetailWhereInput
    orderBy?: VocalRecordingAppointmentDetailOrderByWithAggregationInput | VocalRecordingAppointmentDetailOrderByWithAggregationInput[]
    by: VocalRecordingAppointmentDetailScalarFieldEnum[] | VocalRecordingAppointmentDetailScalarFieldEnum
    having?: VocalRecordingAppointmentDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VocalRecordingAppointmentDetailCountAggregateInputType | true
    _avg?: VocalRecordingAppointmentDetailAvgAggregateInputType
    _sum?: VocalRecordingAppointmentDetailSumAggregateInputType
    _min?: VocalRecordingAppointmentDetailMinAggregateInputType
    _max?: VocalRecordingAppointmentDetailMaxAggregateInputType
  }

  export type VocalRecordingAppointmentDetailGroupByOutputType = {
    id: number
    appointment_id: number
    time_in: string
    time_out: string
    note: string | null
    user_id: number
    status: string
    isCancel: boolean
    _count: VocalRecordingAppointmentDetailCountAggregateOutputType | null
    _avg: VocalRecordingAppointmentDetailAvgAggregateOutputType | null
    _sum: VocalRecordingAppointmentDetailSumAggregateOutputType | null
    _min: VocalRecordingAppointmentDetailMinAggregateOutputType | null
    _max: VocalRecordingAppointmentDetailMaxAggregateOutputType | null
  }

  type GetVocalRecordingAppointmentDetailGroupByPayload<T extends VocalRecordingAppointmentDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VocalRecordingAppointmentDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VocalRecordingAppointmentDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VocalRecordingAppointmentDetailGroupByOutputType[P]>
            : GetScalarType<T[P], VocalRecordingAppointmentDetailGroupByOutputType[P]>
        }
      >
    >


  export type VocalRecordingAppointmentDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointment_id?: boolean
    time_in?: boolean
    time_out?: boolean
    note?: boolean
    user_id?: boolean
    status?: boolean
    isCancel?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointment?: boolean | VocalRecordingAppointmentDefaultArgs<ExtArgs>
    payments?: boolean | VocalRecordingAppointmentDetail$paymentsArgs<ExtArgs>
    _count?: boolean | VocalRecordingAppointmentDetailCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocalRecordingAppointmentDetail"]>



  export type VocalRecordingAppointmentDetailSelectScalar = {
    id?: boolean
    appointment_id?: boolean
    time_in?: boolean
    time_out?: boolean
    note?: boolean
    user_id?: boolean
    status?: boolean
    isCancel?: boolean
  }

  export type VocalRecordingAppointmentDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "appointment_id" | "time_in" | "time_out" | "note" | "user_id" | "status" | "isCancel", ExtArgs["result"]["vocalRecordingAppointmentDetail"]>
  export type VocalRecordingAppointmentDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointment?: boolean | VocalRecordingAppointmentDefaultArgs<ExtArgs>
    payments?: boolean | VocalRecordingAppointmentDetail$paymentsArgs<ExtArgs>
    _count?: boolean | VocalRecordingAppointmentDetailCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VocalRecordingAppointmentDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VocalRecordingAppointmentDetail"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      appointment: Prisma.$VocalRecordingAppointmentPayload<ExtArgs>
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      appointment_id: number
      time_in: string
      time_out: string
      note: string | null
      user_id: number
      status: string
      isCancel: boolean
    }, ExtArgs["result"]["vocalRecordingAppointmentDetail"]>
    composites: {}
  }

  type VocalRecordingAppointmentDetailGetPayload<S extends boolean | null | undefined | VocalRecordingAppointmentDetailDefaultArgs> = $Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload, S>

  type VocalRecordingAppointmentDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VocalRecordingAppointmentDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VocalRecordingAppointmentDetailCountAggregateInputType | true
    }

  export interface VocalRecordingAppointmentDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VocalRecordingAppointmentDetail'], meta: { name: 'VocalRecordingAppointmentDetail' } }
    /**
     * Find zero or one VocalRecordingAppointmentDetail that matches the filter.
     * @param {VocalRecordingAppointmentDetailFindUniqueArgs} args - Arguments to find a VocalRecordingAppointmentDetail
     * @example
     * // Get one VocalRecordingAppointmentDetail
     * const vocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VocalRecordingAppointmentDetailFindUniqueArgs>(args: SelectSubset<T, VocalRecordingAppointmentDetailFindUniqueArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VocalRecordingAppointmentDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VocalRecordingAppointmentDetailFindUniqueOrThrowArgs} args - Arguments to find a VocalRecordingAppointmentDetail
     * @example
     * // Get one VocalRecordingAppointmentDetail
     * const vocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VocalRecordingAppointmentDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, VocalRecordingAppointmentDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VocalRecordingAppointmentDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentDetailFindFirstArgs} args - Arguments to find a VocalRecordingAppointmentDetail
     * @example
     * // Get one VocalRecordingAppointmentDetail
     * const vocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VocalRecordingAppointmentDetailFindFirstArgs>(args?: SelectSubset<T, VocalRecordingAppointmentDetailFindFirstArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VocalRecordingAppointmentDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentDetailFindFirstOrThrowArgs} args - Arguments to find a VocalRecordingAppointmentDetail
     * @example
     * // Get one VocalRecordingAppointmentDetail
     * const vocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VocalRecordingAppointmentDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, VocalRecordingAppointmentDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VocalRecordingAppointmentDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VocalRecordingAppointmentDetails
     * const vocalRecordingAppointmentDetails = await prisma.vocalRecordingAppointmentDetail.findMany()
     * 
     * // Get first 10 VocalRecordingAppointmentDetails
     * const vocalRecordingAppointmentDetails = await prisma.vocalRecordingAppointmentDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vocalRecordingAppointmentDetailWithIdOnly = await prisma.vocalRecordingAppointmentDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VocalRecordingAppointmentDetailFindManyArgs>(args?: SelectSubset<T, VocalRecordingAppointmentDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VocalRecordingAppointmentDetail.
     * @param {VocalRecordingAppointmentDetailCreateArgs} args - Arguments to create a VocalRecordingAppointmentDetail.
     * @example
     * // Create one VocalRecordingAppointmentDetail
     * const VocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.create({
     *   data: {
     *     // ... data to create a VocalRecordingAppointmentDetail
     *   }
     * })
     * 
     */
    create<T extends VocalRecordingAppointmentDetailCreateArgs>(args: SelectSubset<T, VocalRecordingAppointmentDetailCreateArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VocalRecordingAppointmentDetails.
     * @param {VocalRecordingAppointmentDetailCreateManyArgs} args - Arguments to create many VocalRecordingAppointmentDetails.
     * @example
     * // Create many VocalRecordingAppointmentDetails
     * const vocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VocalRecordingAppointmentDetailCreateManyArgs>(args?: SelectSubset<T, VocalRecordingAppointmentDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VocalRecordingAppointmentDetail.
     * @param {VocalRecordingAppointmentDetailDeleteArgs} args - Arguments to delete one VocalRecordingAppointmentDetail.
     * @example
     * // Delete one VocalRecordingAppointmentDetail
     * const VocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.delete({
     *   where: {
     *     // ... filter to delete one VocalRecordingAppointmentDetail
     *   }
     * })
     * 
     */
    delete<T extends VocalRecordingAppointmentDetailDeleteArgs>(args: SelectSubset<T, VocalRecordingAppointmentDetailDeleteArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VocalRecordingAppointmentDetail.
     * @param {VocalRecordingAppointmentDetailUpdateArgs} args - Arguments to update one VocalRecordingAppointmentDetail.
     * @example
     * // Update one VocalRecordingAppointmentDetail
     * const vocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VocalRecordingAppointmentDetailUpdateArgs>(args: SelectSubset<T, VocalRecordingAppointmentDetailUpdateArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VocalRecordingAppointmentDetails.
     * @param {VocalRecordingAppointmentDetailDeleteManyArgs} args - Arguments to filter VocalRecordingAppointmentDetails to delete.
     * @example
     * // Delete a few VocalRecordingAppointmentDetails
     * const { count } = await prisma.vocalRecordingAppointmentDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VocalRecordingAppointmentDetailDeleteManyArgs>(args?: SelectSubset<T, VocalRecordingAppointmentDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VocalRecordingAppointmentDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VocalRecordingAppointmentDetails
     * const vocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VocalRecordingAppointmentDetailUpdateManyArgs>(args: SelectSubset<T, VocalRecordingAppointmentDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VocalRecordingAppointmentDetail.
     * @param {VocalRecordingAppointmentDetailUpsertArgs} args - Arguments to update or create a VocalRecordingAppointmentDetail.
     * @example
     * // Update or create a VocalRecordingAppointmentDetail
     * const vocalRecordingAppointmentDetail = await prisma.vocalRecordingAppointmentDetail.upsert({
     *   create: {
     *     // ... data to create a VocalRecordingAppointmentDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VocalRecordingAppointmentDetail we want to update
     *   }
     * })
     */
    upsert<T extends VocalRecordingAppointmentDetailUpsertArgs>(args: SelectSubset<T, VocalRecordingAppointmentDetailUpsertArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VocalRecordingAppointmentDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentDetailCountArgs} args - Arguments to filter VocalRecordingAppointmentDetails to count.
     * @example
     * // Count the number of VocalRecordingAppointmentDetails
     * const count = await prisma.vocalRecordingAppointmentDetail.count({
     *   where: {
     *     // ... the filter for the VocalRecordingAppointmentDetails we want to count
     *   }
     * })
    **/
    count<T extends VocalRecordingAppointmentDetailCountArgs>(
      args?: Subset<T, VocalRecordingAppointmentDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VocalRecordingAppointmentDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VocalRecordingAppointmentDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VocalRecordingAppointmentDetailAggregateArgs>(args: Subset<T, VocalRecordingAppointmentDetailAggregateArgs>): Prisma.PrismaPromise<GetVocalRecordingAppointmentDetailAggregateType<T>>

    /**
     * Group by VocalRecordingAppointmentDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocalRecordingAppointmentDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VocalRecordingAppointmentDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VocalRecordingAppointmentDetailGroupByArgs['orderBy'] }
        : { orderBy?: VocalRecordingAppointmentDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VocalRecordingAppointmentDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVocalRecordingAppointmentDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VocalRecordingAppointmentDetail model
   */
  readonly fields: VocalRecordingAppointmentDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VocalRecordingAppointmentDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VocalRecordingAppointmentDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointment<T extends VocalRecordingAppointmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VocalRecordingAppointmentDefaultArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payments<T extends VocalRecordingAppointmentDetail$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, VocalRecordingAppointmentDetail$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VocalRecordingAppointmentDetail model
   */
  interface VocalRecordingAppointmentDetailFieldRefs {
    readonly id: FieldRef<"VocalRecordingAppointmentDetail", 'Int'>
    readonly appointment_id: FieldRef<"VocalRecordingAppointmentDetail", 'Int'>
    readonly time_in: FieldRef<"VocalRecordingAppointmentDetail", 'String'>
    readonly time_out: FieldRef<"VocalRecordingAppointmentDetail", 'String'>
    readonly note: FieldRef<"VocalRecordingAppointmentDetail", 'String'>
    readonly user_id: FieldRef<"VocalRecordingAppointmentDetail", 'Int'>
    readonly status: FieldRef<"VocalRecordingAppointmentDetail", 'String'>
    readonly isCancel: FieldRef<"VocalRecordingAppointmentDetail", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * VocalRecordingAppointmentDetail findUnique
   */
  export type VocalRecordingAppointmentDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointmentDetail to fetch.
     */
    where: VocalRecordingAppointmentDetailWhereUniqueInput
  }

  /**
   * VocalRecordingAppointmentDetail findUniqueOrThrow
   */
  export type VocalRecordingAppointmentDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointmentDetail to fetch.
     */
    where: VocalRecordingAppointmentDetailWhereUniqueInput
  }

  /**
   * VocalRecordingAppointmentDetail findFirst
   */
  export type VocalRecordingAppointmentDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointmentDetail to fetch.
     */
    where?: VocalRecordingAppointmentDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocalRecordingAppointmentDetails to fetch.
     */
    orderBy?: VocalRecordingAppointmentDetailOrderByWithRelationInput | VocalRecordingAppointmentDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VocalRecordingAppointmentDetails.
     */
    cursor?: VocalRecordingAppointmentDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocalRecordingAppointmentDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocalRecordingAppointmentDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VocalRecordingAppointmentDetails.
     */
    distinct?: VocalRecordingAppointmentDetailScalarFieldEnum | VocalRecordingAppointmentDetailScalarFieldEnum[]
  }

  /**
   * VocalRecordingAppointmentDetail findFirstOrThrow
   */
  export type VocalRecordingAppointmentDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointmentDetail to fetch.
     */
    where?: VocalRecordingAppointmentDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocalRecordingAppointmentDetails to fetch.
     */
    orderBy?: VocalRecordingAppointmentDetailOrderByWithRelationInput | VocalRecordingAppointmentDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VocalRecordingAppointmentDetails.
     */
    cursor?: VocalRecordingAppointmentDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocalRecordingAppointmentDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocalRecordingAppointmentDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VocalRecordingAppointmentDetails.
     */
    distinct?: VocalRecordingAppointmentDetailScalarFieldEnum | VocalRecordingAppointmentDetailScalarFieldEnum[]
  }

  /**
   * VocalRecordingAppointmentDetail findMany
   */
  export type VocalRecordingAppointmentDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * Filter, which VocalRecordingAppointmentDetails to fetch.
     */
    where?: VocalRecordingAppointmentDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocalRecordingAppointmentDetails to fetch.
     */
    orderBy?: VocalRecordingAppointmentDetailOrderByWithRelationInput | VocalRecordingAppointmentDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VocalRecordingAppointmentDetails.
     */
    cursor?: VocalRecordingAppointmentDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocalRecordingAppointmentDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocalRecordingAppointmentDetails.
     */
    skip?: number
    distinct?: VocalRecordingAppointmentDetailScalarFieldEnum | VocalRecordingAppointmentDetailScalarFieldEnum[]
  }

  /**
   * VocalRecordingAppointmentDetail create
   */
  export type VocalRecordingAppointmentDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a VocalRecordingAppointmentDetail.
     */
    data: XOR<VocalRecordingAppointmentDetailCreateInput, VocalRecordingAppointmentDetailUncheckedCreateInput>
  }

  /**
   * VocalRecordingAppointmentDetail createMany
   */
  export type VocalRecordingAppointmentDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VocalRecordingAppointmentDetails.
     */
    data: VocalRecordingAppointmentDetailCreateManyInput | VocalRecordingAppointmentDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VocalRecordingAppointmentDetail update
   */
  export type VocalRecordingAppointmentDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a VocalRecordingAppointmentDetail.
     */
    data: XOR<VocalRecordingAppointmentDetailUpdateInput, VocalRecordingAppointmentDetailUncheckedUpdateInput>
    /**
     * Choose, which VocalRecordingAppointmentDetail to update.
     */
    where: VocalRecordingAppointmentDetailWhereUniqueInput
  }

  /**
   * VocalRecordingAppointmentDetail updateMany
   */
  export type VocalRecordingAppointmentDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VocalRecordingAppointmentDetails.
     */
    data: XOR<VocalRecordingAppointmentDetailUpdateManyMutationInput, VocalRecordingAppointmentDetailUncheckedUpdateManyInput>
    /**
     * Filter which VocalRecordingAppointmentDetails to update
     */
    where?: VocalRecordingAppointmentDetailWhereInput
    /**
     * Limit how many VocalRecordingAppointmentDetails to update.
     */
    limit?: number
  }

  /**
   * VocalRecordingAppointmentDetail upsert
   */
  export type VocalRecordingAppointmentDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the VocalRecordingAppointmentDetail to update in case it exists.
     */
    where: VocalRecordingAppointmentDetailWhereUniqueInput
    /**
     * In case the VocalRecordingAppointmentDetail found by the `where` argument doesn't exist, create a new VocalRecordingAppointmentDetail with this data.
     */
    create: XOR<VocalRecordingAppointmentDetailCreateInput, VocalRecordingAppointmentDetailUncheckedCreateInput>
    /**
     * In case the VocalRecordingAppointmentDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VocalRecordingAppointmentDetailUpdateInput, VocalRecordingAppointmentDetailUncheckedUpdateInput>
  }

  /**
   * VocalRecordingAppointmentDetail delete
   */
  export type VocalRecordingAppointmentDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
    /**
     * Filter which VocalRecordingAppointmentDetail to delete.
     */
    where: VocalRecordingAppointmentDetailWhereUniqueInput
  }

  /**
   * VocalRecordingAppointmentDetail deleteMany
   */
  export type VocalRecordingAppointmentDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VocalRecordingAppointmentDetails to delete
     */
    where?: VocalRecordingAppointmentDetailWhereInput
    /**
     * Limit how many VocalRecordingAppointmentDetails to delete.
     */
    limit?: number
  }

  /**
   * VocalRecordingAppointmentDetail.payments
   */
  export type VocalRecordingAppointmentDetail$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * VocalRecordingAppointmentDetail without action
   */
  export type VocalRecordingAppointmentDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocalRecordingAppointmentDetail
     */
    select?: VocalRecordingAppointmentDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocalRecordingAppointmentDetail
     */
    omit?: VocalRecordingAppointmentDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocalRecordingAppointmentDetailInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    amount: Decimal | null
    appointment_id: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    amount: Decimal | null
    appointment_id: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    amount: Decimal | null
    note: string | null
    status: string | null
    paymentDate: Date | null
    paymentMethod: string | null
    paymentType: $Enums.PaymentType | null
    createdAt: Date | null
    updatedAt: Date | null
    deleteStatus: boolean | null
    appointment_id: number | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    amount: Decimal | null
    note: string | null
    status: string | null
    paymentDate: Date | null
    paymentMethod: string | null
    paymentType: $Enums.PaymentType | null
    createdAt: Date | null
    updatedAt: Date | null
    deleteStatus: boolean | null
    appointment_id: number | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    user_id: number
    amount: number
    note: number
    status: number
    paymentDate: number
    paymentMethod: number
    paymentType: number
    createdAt: number
    updatedAt: number
    deleteStatus: number
    appointment_id: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    appointment_id?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    appointment_id?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    note?: true
    status?: true
    paymentDate?: true
    paymentMethod?: true
    paymentType?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
    appointment_id?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    note?: true
    status?: true
    paymentDate?: true
    paymentMethod?: true
    paymentType?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
    appointment_id?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    note?: true
    status?: true
    paymentDate?: true
    paymentMethod?: true
    paymentType?: true
    createdAt?: true
    updatedAt?: true
    deleteStatus?: true
    appointment_id?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    user_id: number
    amount: Decimal
    note: string | null
    status: string
    paymentDate: Date
    paymentMethod: string
    paymentType: $Enums.PaymentType
    createdAt: Date
    updatedAt: Date
    deleteStatus: boolean
    appointment_id: number
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    note?: boolean
    status?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    paymentType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleteStatus?: boolean
    appointment_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointment?: boolean | VocalRecordingAppointmentDetailDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>



  export type PaymentSelectScalar = {
    id?: boolean
    user_id?: boolean
    amount?: boolean
    note?: boolean
    status?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    paymentType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleteStatus?: boolean
    appointment_id?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "amount" | "note" | "status" | "paymentDate" | "paymentMethod" | "paymentType" | "createdAt" | "updatedAt" | "deleteStatus" | "appointment_id", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointment?: boolean | VocalRecordingAppointmentDetailDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      appointment: Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      amount: Prisma.Decimal
      note: string | null
      status: string
      paymentDate: Date
      paymentMethod: string
      paymentType: $Enums.PaymentType
      createdAt: Date
      updatedAt: Date
      deleteStatus: boolean
      appointment_id: number
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointment<T extends VocalRecordingAppointmentDetailDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VocalRecordingAppointmentDetailDefaultArgs<ExtArgs>>): Prisma__VocalRecordingAppointmentDetailClient<$Result.GetResult<Prisma.$VocalRecordingAppointmentDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly user_id: FieldRef<"Payment", 'Int'>
    readonly amount: FieldRef<"Payment", 'Decimal'>
    readonly note: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'String'>
    readonly paymentDate: FieldRef<"Payment", 'DateTime'>
    readonly paymentMethod: FieldRef<"Payment", 'String'>
    readonly paymentType: FieldRef<"Payment", 'PaymentType'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
    readonly deleteStatus: FieldRef<"Payment", 'Boolean'>
    readonly appointment_id: FieldRef<"Payment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    password: 'password',
    typeId: 'typeId',
    contactNumber: 'contactNumber',
    address: 'address',
    city: 'city',
    district: 'district',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleteStatus: 'deleteStatus'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserTypeScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type UserTypeScalarFieldEnum = (typeof UserTypeScalarFieldEnum)[keyof typeof UserTypeScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    date: 'date',
    time_in: 'time_in',
    time_out: 'time_out',
    note: 'note'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    location: 'location',
    time: 'time',
    note: 'note'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    duration: 'duration',
    day: 'day',
    startTime: 'startTime',
    endTime: 'endTime',
    installments_count: 'installments_count',
    installments_price: 'installments_price',
    full_price: 'full_price',
    startDate: 'startDate'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const Class_StudentScalarFieldEnum: {
    id: 'id',
    class_id: 'class_id',
    student_id: 'student_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleteStatus: 'deleteStatus'
  };

  export type Class_StudentScalarFieldEnum = (typeof Class_StudentScalarFieldEnum)[keyof typeof Class_StudentScalarFieldEnum]


  export const Class_InstallmentScalarFieldEnum: {
    id: 'id',
    class_student_id: 'class_student_id',
    amount: 'amount',
    status: 'status',
    paymentDate: 'paymentDate',
    paymentMethod: 'paymentMethod',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleteStatus: 'deleteStatus',
    installments_Due_Date: 'installments_Due_Date'
  };

  export type Class_InstallmentScalarFieldEnum = (typeof Class_InstallmentScalarFieldEnum)[keyof typeof Class_InstallmentScalarFieldEnum]


  export const VocalRecordingAppointmentScalarFieldEnum: {
    id: 'id',
    date: 'date',
    status: 'status',
    note: 'note'
  };

  export type VocalRecordingAppointmentScalarFieldEnum = (typeof VocalRecordingAppointmentScalarFieldEnum)[keyof typeof VocalRecordingAppointmentScalarFieldEnum]


  export const VocalRecordingAppointmentDetailScalarFieldEnum: {
    id: 'id',
    appointment_id: 'appointment_id',
    time_in: 'time_in',
    time_out: 'time_out',
    note: 'note',
    user_id: 'user_id',
    status: 'status',
    isCancel: 'isCancel'
  };

  export type VocalRecordingAppointmentDetailScalarFieldEnum = (typeof VocalRecordingAppointmentDetailScalarFieldEnum)[keyof typeof VocalRecordingAppointmentDetailScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    amount: 'amount',
    note: 'note',
    status: 'status',
    paymentDate: 'paymentDate',
    paymentMethod: 'paymentMethod',
    paymentType: 'paymentType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleteStatus: 'deleteStatus',
    appointment_id: 'appointment_id'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    password: 'password',
    contactNumber: 'contactNumber',
    address: 'address',
    city: 'city',
    district: 'district'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const UserTypeOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type UserTypeOrderByRelevanceFieldEnum = (typeof UserTypeOrderByRelevanceFieldEnum)[keyof typeof UserTypeOrderByRelevanceFieldEnum]


  export const AttendanceOrderByRelevanceFieldEnum: {
    note: 'note'
  };

  export type AttendanceOrderByRelevanceFieldEnum = (typeof AttendanceOrderByRelevanceFieldEnum)[keyof typeof AttendanceOrderByRelevanceFieldEnum]


  export const EventOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description',
    location: 'location',
    note: 'note'
  };

  export type EventOrderByRelevanceFieldEnum = (typeof EventOrderByRelevanceFieldEnum)[keyof typeof EventOrderByRelevanceFieldEnum]


  export const ClassOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description',
    duration: 'duration',
    day: 'day',
    startTime: 'startTime',
    endTime: 'endTime'
  };

  export type ClassOrderByRelevanceFieldEnum = (typeof ClassOrderByRelevanceFieldEnum)[keyof typeof ClassOrderByRelevanceFieldEnum]


  export const Class_InstallmentOrderByRelevanceFieldEnum: {
    status: 'status',
    paymentMethod: 'paymentMethod'
  };

  export type Class_InstallmentOrderByRelevanceFieldEnum = (typeof Class_InstallmentOrderByRelevanceFieldEnum)[keyof typeof Class_InstallmentOrderByRelevanceFieldEnum]


  export const VocalRecordingAppointmentOrderByRelevanceFieldEnum: {
    date: 'date',
    status: 'status',
    note: 'note'
  };

  export type VocalRecordingAppointmentOrderByRelevanceFieldEnum = (typeof VocalRecordingAppointmentOrderByRelevanceFieldEnum)[keyof typeof VocalRecordingAppointmentOrderByRelevanceFieldEnum]


  export const VocalRecordingAppointmentDetailOrderByRelevanceFieldEnum: {
    time_in: 'time_in',
    time_out: 'time_out',
    note: 'note',
    status: 'status'
  };

  export type VocalRecordingAppointmentDetailOrderByRelevanceFieldEnum = (typeof VocalRecordingAppointmentDetailOrderByRelevanceFieldEnum)[keyof typeof VocalRecordingAppointmentDetailOrderByRelevanceFieldEnum]


  export const PaymentOrderByRelevanceFieldEnum: {
    note: 'note',
    status: 'status',
    paymentMethod: 'paymentMethod'
  };

  export type PaymentOrderByRelevanceFieldEnum = (typeof PaymentOrderByRelevanceFieldEnum)[keyof typeof PaymentOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'PaymentType'
   */
  export type EnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    typeId?: IntFilter<"User"> | number
    contactNumber?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    district?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deleteStatus?: BoolFilter<"User"> | boolean
    type?: XOR<UserTypeScalarRelationFilter, UserTypeWhereInput>
    attendance?: AttendanceListRelationFilter
    appointments?: VocalRecordingAppointmentDetailListRelationFilter
    class_students?: Class_StudentListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    password?: SortOrder
    typeId?: SortOrder
    contactNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    type?: UserTypeOrderByWithRelationInput
    attendance?: AttendanceOrderByRelationAggregateInput
    appointments?: VocalRecordingAppointmentDetailOrderByRelationAggregateInput
    class_students?: Class_StudentOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    typeId?: IntFilter<"User"> | number
    contactNumber?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    district?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deleteStatus?: BoolFilter<"User"> | boolean
    type?: XOR<UserTypeScalarRelationFilter, UserTypeWhereInput>
    attendance?: AttendanceListRelationFilter
    appointments?: VocalRecordingAppointmentDetailListRelationFilter
    class_students?: Class_StudentListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    password?: SortOrder
    typeId?: SortOrder
    contactNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    typeId?: IntWithAggregatesFilter<"User"> | number
    contactNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    city?: StringNullableWithAggregatesFilter<"User"> | string | null
    district?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deleteStatus?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type UserTypeWhereInput = {
    AND?: UserTypeWhereInput | UserTypeWhereInput[]
    OR?: UserTypeWhereInput[]
    NOT?: UserTypeWhereInput | UserTypeWhereInput[]
    id?: IntFilter<"UserType"> | number
    name?: StringFilter<"UserType"> | string
    users?: UserListRelationFilter
  }

  export type UserTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    users?: UserOrderByRelationAggregateInput
    _relevance?: UserTypeOrderByRelevanceInput
  }

  export type UserTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: UserTypeWhereInput | UserTypeWhereInput[]
    OR?: UserTypeWhereInput[]
    NOT?: UserTypeWhereInput | UserTypeWhereInput[]
    users?: UserListRelationFilter
  }, "id" | "name">

  export type UserTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: UserTypeCountOrderByAggregateInput
    _avg?: UserTypeAvgOrderByAggregateInput
    _max?: UserTypeMaxOrderByAggregateInput
    _min?: UserTypeMinOrderByAggregateInput
    _sum?: UserTypeSumOrderByAggregateInput
  }

  export type UserTypeScalarWhereWithAggregatesInput = {
    AND?: UserTypeScalarWhereWithAggregatesInput | UserTypeScalarWhereWithAggregatesInput[]
    OR?: UserTypeScalarWhereWithAggregatesInput[]
    NOT?: UserTypeScalarWhereWithAggregatesInput | UserTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserType"> | number
    name?: StringWithAggregatesFilter<"UserType"> | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: IntFilter<"Attendance"> | number
    user_id?: IntFilter<"Attendance"> | number
    date?: DateTimeFilter<"Attendance"> | Date | string
    time_in?: DateTimeFilter<"Attendance"> | Date | string
    time_out?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    note?: StringNullableFilter<"Attendance"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    date?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: AttendanceOrderByRelevanceInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    user_id?: IntFilter<"Attendance"> | number
    date?: DateTimeFilter<"Attendance"> | Date | string
    time_in?: DateTimeFilter<"Attendance"> | Date | string
    time_out?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    note?: StringNullableFilter<"Attendance"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    date?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _avg?: AttendanceAvgOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
    _sum?: AttendanceSumOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attendance"> | number
    user_id?: IntWithAggregatesFilter<"Attendance"> | number
    date?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    time_in?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    time_out?: DateTimeNullableWithAggregatesFilter<"Attendance"> | Date | string | null
    note?: StringNullableWithAggregatesFilter<"Attendance"> | string | null
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: IntFilter<"Event"> | number
    title?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    startDate?: DateTimeFilter<"Event"> | Date | string
    endDate?: DateTimeNullableFilter<"Event"> | Date | string | null
    location?: StringNullableFilter<"Event"> | string | null
    time?: DateTimeNullableFilter<"Event"> | Date | string | null
    note?: StringNullableFilter<"Event"> | string | null
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _relevance?: EventOrderByRelevanceInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    startDate?: DateTimeFilter<"Event"> | Date | string
    endDate?: DateTimeNullableFilter<"Event"> | Date | string | null
    location?: StringNullableFilter<"Event"> | string | null
    time?: DateTimeNullableFilter<"Event"> | Date | string | null
    note?: StringNullableFilter<"Event"> | string | null
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Event"> | number
    title?: StringWithAggregatesFilter<"Event"> | string
    description?: StringNullableWithAggregatesFilter<"Event"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    location?: StringNullableWithAggregatesFilter<"Event"> | string | null
    time?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    note?: StringNullableWithAggregatesFilter<"Event"> | string | null
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    id?: IntFilter<"Class"> | number
    name?: StringFilter<"Class"> | string
    description?: StringNullableFilter<"Class"> | string | null
    duration?: StringFilter<"Class"> | string
    day?: StringFilter<"Class"> | string
    startTime?: StringFilter<"Class"> | string
    endTime?: StringNullableFilter<"Class"> | string | null
    installments_count?: IntFilter<"Class"> | number
    installments_price?: DecimalFilter<"Class"> | Decimal | DecimalJsLike | number | string
    full_price?: DecimalFilter<"Class"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFilter<"Class"> | Date | string
    class_students?: Class_StudentListRelationFilter
  }

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    duration?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    installments_count?: SortOrder
    installments_price?: SortOrder
    full_price?: SortOrder
    startDate?: SortOrder
    class_students?: Class_StudentOrderByRelationAggregateInput
    _relevance?: ClassOrderByRelevanceInput
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    name?: StringFilter<"Class"> | string
    description?: StringNullableFilter<"Class"> | string | null
    duration?: StringFilter<"Class"> | string
    day?: StringFilter<"Class"> | string
    startTime?: StringFilter<"Class"> | string
    endTime?: StringNullableFilter<"Class"> | string | null
    installments_count?: IntFilter<"Class"> | number
    installments_price?: DecimalFilter<"Class"> | Decimal | DecimalJsLike | number | string
    full_price?: DecimalFilter<"Class"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFilter<"Class"> | Date | string
    class_students?: Class_StudentListRelationFilter
  }, "id">

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    duration?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    installments_count?: SortOrder
    installments_price?: SortOrder
    full_price?: SortOrder
    startDate?: SortOrder
    _count?: ClassCountOrderByAggregateInput
    _avg?: ClassAvgOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
    _sum?: ClassSumOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class"> | number
    name?: StringWithAggregatesFilter<"Class"> | string
    description?: StringNullableWithAggregatesFilter<"Class"> | string | null
    duration?: StringWithAggregatesFilter<"Class"> | string
    day?: StringWithAggregatesFilter<"Class"> | string
    startTime?: StringWithAggregatesFilter<"Class"> | string
    endTime?: StringNullableWithAggregatesFilter<"Class"> | string | null
    installments_count?: IntWithAggregatesFilter<"Class"> | number
    installments_price?: DecimalWithAggregatesFilter<"Class"> | Decimal | DecimalJsLike | number | string
    full_price?: DecimalWithAggregatesFilter<"Class"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeWithAggregatesFilter<"Class"> | Date | string
  }

  export type Class_StudentWhereInput = {
    AND?: Class_StudentWhereInput | Class_StudentWhereInput[]
    OR?: Class_StudentWhereInput[]
    NOT?: Class_StudentWhereInput | Class_StudentWhereInput[]
    id?: IntFilter<"Class_Student"> | number
    class_id?: IntFilter<"Class_Student"> | number
    student_id?: IntFilter<"Class_Student"> | number
    createdAt?: DateTimeFilter<"Class_Student"> | Date | string
    updatedAt?: DateTimeFilter<"Class_Student"> | Date | string
    deleteStatus?: BoolFilter<"Class_Student"> | boolean
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    class_installments?: Class_InstallmentListRelationFilter
  }

  export type Class_StudentOrderByWithRelationInput = {
    id?: SortOrder
    class_id?: SortOrder
    student_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    class?: ClassOrderByWithRelationInput
    student?: UserOrderByWithRelationInput
    class_installments?: Class_InstallmentOrderByRelationAggregateInput
  }

  export type Class_StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Class_StudentWhereInput | Class_StudentWhereInput[]
    OR?: Class_StudentWhereInput[]
    NOT?: Class_StudentWhereInput | Class_StudentWhereInput[]
    class_id?: IntFilter<"Class_Student"> | number
    student_id?: IntFilter<"Class_Student"> | number
    createdAt?: DateTimeFilter<"Class_Student"> | Date | string
    updatedAt?: DateTimeFilter<"Class_Student"> | Date | string
    deleteStatus?: BoolFilter<"Class_Student"> | boolean
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    class_installments?: Class_InstallmentListRelationFilter
  }, "id">

  export type Class_StudentOrderByWithAggregationInput = {
    id?: SortOrder
    class_id?: SortOrder
    student_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    _count?: Class_StudentCountOrderByAggregateInput
    _avg?: Class_StudentAvgOrderByAggregateInput
    _max?: Class_StudentMaxOrderByAggregateInput
    _min?: Class_StudentMinOrderByAggregateInput
    _sum?: Class_StudentSumOrderByAggregateInput
  }

  export type Class_StudentScalarWhereWithAggregatesInput = {
    AND?: Class_StudentScalarWhereWithAggregatesInput | Class_StudentScalarWhereWithAggregatesInput[]
    OR?: Class_StudentScalarWhereWithAggregatesInput[]
    NOT?: Class_StudentScalarWhereWithAggregatesInput | Class_StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class_Student"> | number
    class_id?: IntWithAggregatesFilter<"Class_Student"> | number
    student_id?: IntWithAggregatesFilter<"Class_Student"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Class_Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Class_Student"> | Date | string
    deleteStatus?: BoolWithAggregatesFilter<"Class_Student"> | boolean
  }

  export type Class_InstallmentWhereInput = {
    AND?: Class_InstallmentWhereInput | Class_InstallmentWhereInput[]
    OR?: Class_InstallmentWhereInput[]
    NOT?: Class_InstallmentWhereInput | Class_InstallmentWhereInput[]
    id?: IntFilter<"Class_Installment"> | number
    class_student_id?: IntFilter<"Class_Installment"> | number
    amount?: DecimalFilter<"Class_Installment"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Class_Installment"> | string
    paymentDate?: DateTimeFilter<"Class_Installment"> | Date | string
    paymentMethod?: StringFilter<"Class_Installment"> | string
    createdAt?: DateTimeFilter<"Class_Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Class_Installment"> | Date | string
    deleteStatus?: BoolFilter<"Class_Installment"> | boolean
    installments_Due_Date?: DateTimeFilter<"Class_Installment"> | Date | string
    class_student?: XOR<Class_StudentScalarRelationFilter, Class_StudentWhereInput>
  }

  export type Class_InstallmentOrderByWithRelationInput = {
    id?: SortOrder
    class_student_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    installments_Due_Date?: SortOrder
    class_student?: Class_StudentOrderByWithRelationInput
    _relevance?: Class_InstallmentOrderByRelevanceInput
  }

  export type Class_InstallmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Class_InstallmentWhereInput | Class_InstallmentWhereInput[]
    OR?: Class_InstallmentWhereInput[]
    NOT?: Class_InstallmentWhereInput | Class_InstallmentWhereInput[]
    class_student_id?: IntFilter<"Class_Installment"> | number
    amount?: DecimalFilter<"Class_Installment"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Class_Installment"> | string
    paymentDate?: DateTimeFilter<"Class_Installment"> | Date | string
    paymentMethod?: StringFilter<"Class_Installment"> | string
    createdAt?: DateTimeFilter<"Class_Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Class_Installment"> | Date | string
    deleteStatus?: BoolFilter<"Class_Installment"> | boolean
    installments_Due_Date?: DateTimeFilter<"Class_Installment"> | Date | string
    class_student?: XOR<Class_StudentScalarRelationFilter, Class_StudentWhereInput>
  }, "id">

  export type Class_InstallmentOrderByWithAggregationInput = {
    id?: SortOrder
    class_student_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    installments_Due_Date?: SortOrder
    _count?: Class_InstallmentCountOrderByAggregateInput
    _avg?: Class_InstallmentAvgOrderByAggregateInput
    _max?: Class_InstallmentMaxOrderByAggregateInput
    _min?: Class_InstallmentMinOrderByAggregateInput
    _sum?: Class_InstallmentSumOrderByAggregateInput
  }

  export type Class_InstallmentScalarWhereWithAggregatesInput = {
    AND?: Class_InstallmentScalarWhereWithAggregatesInput | Class_InstallmentScalarWhereWithAggregatesInput[]
    OR?: Class_InstallmentScalarWhereWithAggregatesInput[]
    NOT?: Class_InstallmentScalarWhereWithAggregatesInput | Class_InstallmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class_Installment"> | number
    class_student_id?: IntWithAggregatesFilter<"Class_Installment"> | number
    amount?: DecimalWithAggregatesFilter<"Class_Installment"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"Class_Installment"> | string
    paymentDate?: DateTimeWithAggregatesFilter<"Class_Installment"> | Date | string
    paymentMethod?: StringWithAggregatesFilter<"Class_Installment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Class_Installment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Class_Installment"> | Date | string
    deleteStatus?: BoolWithAggregatesFilter<"Class_Installment"> | boolean
    installments_Due_Date?: DateTimeWithAggregatesFilter<"Class_Installment"> | Date | string
  }

  export type VocalRecordingAppointmentWhereInput = {
    AND?: VocalRecordingAppointmentWhereInput | VocalRecordingAppointmentWhereInput[]
    OR?: VocalRecordingAppointmentWhereInput[]
    NOT?: VocalRecordingAppointmentWhereInput | VocalRecordingAppointmentWhereInput[]
    id?: IntFilter<"VocalRecordingAppointment"> | number
    date?: StringFilter<"VocalRecordingAppointment"> | string
    status?: StringFilter<"VocalRecordingAppointment"> | string
    note?: StringNullableFilter<"VocalRecordingAppointment"> | string | null
    details?: VocalRecordingAppointmentDetailListRelationFilter
  }

  export type VocalRecordingAppointmentOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    details?: VocalRecordingAppointmentDetailOrderByRelationAggregateInput
    _relevance?: VocalRecordingAppointmentOrderByRelevanceInput
  }

  export type VocalRecordingAppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VocalRecordingAppointmentWhereInput | VocalRecordingAppointmentWhereInput[]
    OR?: VocalRecordingAppointmentWhereInput[]
    NOT?: VocalRecordingAppointmentWhereInput | VocalRecordingAppointmentWhereInput[]
    date?: StringFilter<"VocalRecordingAppointment"> | string
    status?: StringFilter<"VocalRecordingAppointment"> | string
    note?: StringNullableFilter<"VocalRecordingAppointment"> | string | null
    details?: VocalRecordingAppointmentDetailListRelationFilter
  }, "id">

  export type VocalRecordingAppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    _count?: VocalRecordingAppointmentCountOrderByAggregateInput
    _avg?: VocalRecordingAppointmentAvgOrderByAggregateInput
    _max?: VocalRecordingAppointmentMaxOrderByAggregateInput
    _min?: VocalRecordingAppointmentMinOrderByAggregateInput
    _sum?: VocalRecordingAppointmentSumOrderByAggregateInput
  }

  export type VocalRecordingAppointmentScalarWhereWithAggregatesInput = {
    AND?: VocalRecordingAppointmentScalarWhereWithAggregatesInput | VocalRecordingAppointmentScalarWhereWithAggregatesInput[]
    OR?: VocalRecordingAppointmentScalarWhereWithAggregatesInput[]
    NOT?: VocalRecordingAppointmentScalarWhereWithAggregatesInput | VocalRecordingAppointmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VocalRecordingAppointment"> | number
    date?: StringWithAggregatesFilter<"VocalRecordingAppointment"> | string
    status?: StringWithAggregatesFilter<"VocalRecordingAppointment"> | string
    note?: StringNullableWithAggregatesFilter<"VocalRecordingAppointment"> | string | null
  }

  export type VocalRecordingAppointmentDetailWhereInput = {
    AND?: VocalRecordingAppointmentDetailWhereInput | VocalRecordingAppointmentDetailWhereInput[]
    OR?: VocalRecordingAppointmentDetailWhereInput[]
    NOT?: VocalRecordingAppointmentDetailWhereInput | VocalRecordingAppointmentDetailWhereInput[]
    id?: IntFilter<"VocalRecordingAppointmentDetail"> | number
    appointment_id?: IntFilter<"VocalRecordingAppointmentDetail"> | number
    time_in?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    time_out?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    note?: StringNullableFilter<"VocalRecordingAppointmentDetail"> | string | null
    user_id?: IntFilter<"VocalRecordingAppointmentDetail"> | number
    status?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    isCancel?: BoolFilter<"VocalRecordingAppointmentDetail"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointment?: XOR<VocalRecordingAppointmentScalarRelationFilter, VocalRecordingAppointmentWhereInput>
    payments?: PaymentListRelationFilter
  }

  export type VocalRecordingAppointmentDetailOrderByWithRelationInput = {
    id?: SortOrder
    appointment_id?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrder
    note?: SortOrderInput | SortOrder
    user_id?: SortOrder
    status?: SortOrder
    isCancel?: SortOrder
    user?: UserOrderByWithRelationInput
    appointment?: VocalRecordingAppointmentOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
    _relevance?: VocalRecordingAppointmentDetailOrderByRelevanceInput
  }

  export type VocalRecordingAppointmentDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VocalRecordingAppointmentDetailWhereInput | VocalRecordingAppointmentDetailWhereInput[]
    OR?: VocalRecordingAppointmentDetailWhereInput[]
    NOT?: VocalRecordingAppointmentDetailWhereInput | VocalRecordingAppointmentDetailWhereInput[]
    appointment_id?: IntFilter<"VocalRecordingAppointmentDetail"> | number
    time_in?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    time_out?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    note?: StringNullableFilter<"VocalRecordingAppointmentDetail"> | string | null
    user_id?: IntFilter<"VocalRecordingAppointmentDetail"> | number
    status?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    isCancel?: BoolFilter<"VocalRecordingAppointmentDetail"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointment?: XOR<VocalRecordingAppointmentScalarRelationFilter, VocalRecordingAppointmentWhereInput>
    payments?: PaymentListRelationFilter
  }, "id">

  export type VocalRecordingAppointmentDetailOrderByWithAggregationInput = {
    id?: SortOrder
    appointment_id?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrder
    note?: SortOrderInput | SortOrder
    user_id?: SortOrder
    status?: SortOrder
    isCancel?: SortOrder
    _count?: VocalRecordingAppointmentDetailCountOrderByAggregateInput
    _avg?: VocalRecordingAppointmentDetailAvgOrderByAggregateInput
    _max?: VocalRecordingAppointmentDetailMaxOrderByAggregateInput
    _min?: VocalRecordingAppointmentDetailMinOrderByAggregateInput
    _sum?: VocalRecordingAppointmentDetailSumOrderByAggregateInput
  }

  export type VocalRecordingAppointmentDetailScalarWhereWithAggregatesInput = {
    AND?: VocalRecordingAppointmentDetailScalarWhereWithAggregatesInput | VocalRecordingAppointmentDetailScalarWhereWithAggregatesInput[]
    OR?: VocalRecordingAppointmentDetailScalarWhereWithAggregatesInput[]
    NOT?: VocalRecordingAppointmentDetailScalarWhereWithAggregatesInput | VocalRecordingAppointmentDetailScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VocalRecordingAppointmentDetail"> | number
    appointment_id?: IntWithAggregatesFilter<"VocalRecordingAppointmentDetail"> | number
    time_in?: StringWithAggregatesFilter<"VocalRecordingAppointmentDetail"> | string
    time_out?: StringWithAggregatesFilter<"VocalRecordingAppointmentDetail"> | string
    note?: StringNullableWithAggregatesFilter<"VocalRecordingAppointmentDetail"> | string | null
    user_id?: IntWithAggregatesFilter<"VocalRecordingAppointmentDetail"> | number
    status?: StringWithAggregatesFilter<"VocalRecordingAppointmentDetail"> | string
    isCancel?: BoolWithAggregatesFilter<"VocalRecordingAppointmentDetail"> | boolean
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    user_id?: IntFilter<"Payment"> | number
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    note?: StringNullableFilter<"Payment"> | string | null
    status?: StringFilter<"Payment"> | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    paymentMethod?: StringFilter<"Payment"> | string
    paymentType?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    deleteStatus?: BoolFilter<"Payment"> | boolean
    appointment_id?: IntFilter<"Payment"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointment?: XOR<VocalRecordingAppointmentDetailScalarRelationFilter, VocalRecordingAppointmentDetailWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    paymentType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    appointment_id?: SortOrder
    user?: UserOrderByWithRelationInput
    appointment?: VocalRecordingAppointmentDetailOrderByWithRelationInput
    _relevance?: PaymentOrderByRelevanceInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    user_id?: IntFilter<"Payment"> | number
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    note?: StringNullableFilter<"Payment"> | string | null
    status?: StringFilter<"Payment"> | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    paymentMethod?: StringFilter<"Payment"> | string
    paymentType?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    deleteStatus?: BoolFilter<"Payment"> | boolean
    appointment_id?: IntFilter<"Payment"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointment?: XOR<VocalRecordingAppointmentDetailScalarRelationFilter, VocalRecordingAppointmentDetailWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    paymentType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    appointment_id?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    user_id?: IntWithAggregatesFilter<"Payment"> | number
    amount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    note?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    status?: StringWithAggregatesFilter<"Payment"> | string
    paymentDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    paymentMethod?: StringWithAggregatesFilter<"Payment"> | string
    paymentType?: EnumPaymentTypeWithAggregatesFilter<"Payment"> | $Enums.PaymentType
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    deleteStatus?: BoolWithAggregatesFilter<"Payment"> | boolean
    appointment_id?: IntWithAggregatesFilter<"Payment"> | number
  }

  export type UserCreateInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    type: UserTypeCreateNestedOneWithoutUsersInput
    attendance?: AttendanceCreateNestedManyWithoutUserInput
    appointments?: VocalRecordingAppointmentDetailCreateNestedManyWithoutUserInput
    class_students?: Class_StudentCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    typeId: number
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    attendance?: AttendanceUncheckedCreateNestedManyWithoutUserInput
    appointments?: VocalRecordingAppointmentDetailUncheckedCreateNestedManyWithoutUserInput
    class_students?: Class_StudentUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    type?: UserTypeUpdateOneRequiredWithoutUsersNestedInput
    attendance?: AttendanceUpdateManyWithoutUserNestedInput
    appointments?: VocalRecordingAppointmentDetailUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    attendance?: AttendanceUncheckedUpdateManyWithoutUserNestedInput
    appointments?: VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    typeId: number
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserTypeCreateInput = {
    name: string
    users?: UserCreateNestedManyWithoutTypeInput
  }

  export type UserTypeUncheckedCreateInput = {
    id?: number
    name: string
    users?: UserUncheckedCreateNestedManyWithoutTypeInput
  }

  export type UserTypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutTypeNestedInput
  }

  export type UserTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutTypeNestedInput
  }

  export type UserTypeCreateManyInput = {
    id?: number
    name: string
  }

  export type UserTypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceCreateInput = {
    date: Date | string
    time_in: Date | string
    time_out?: Date | string | null
    note?: string | null
    user: UserCreateNestedOneWithoutAttendanceInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: number
    user_id: number
    date: Date | string
    time_in: Date | string
    time_out?: Date | string | null
    note?: string | null
  }

  export type AttendanceUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time_in?: DateTimeFieldUpdateOperationsInput | Date | string
    time_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAttendanceNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time_in?: DateTimeFieldUpdateOperationsInput | Date | string
    time_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendanceCreateManyInput = {
    id?: number
    user_id: number
    date: Date | string
    time_in: Date | string
    time_out?: Date | string | null
    note?: string | null
  }

  export type AttendanceUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time_in?: DateTimeFieldUpdateOperationsInput | Date | string
    time_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time_in?: DateTimeFieldUpdateOperationsInput | Date | string
    time_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateInput = {
    title: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    location?: string | null
    time?: Date | string | null
    note?: string | null
  }

  export type EventUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    location?: string | null
    time?: Date | string | null
    note?: string | null
  }

  export type EventUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    location?: string | null
    time?: Date | string | null
    note?: string | null
  }

  export type EventUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassCreateInput = {
    name: string
    description?: string | null
    duration: string
    day: string
    startTime: string
    endTime?: string | null
    installments_count: number
    installments_price: Decimal | DecimalJsLike | number | string
    full_price: Decimal | DecimalJsLike | number | string
    startDate?: Date | string
    class_students?: Class_StudentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    duration: string
    day: string
    startTime: string
    endTime?: string | null
    installments_count: number
    installments_price: Decimal | DecimalJsLike | number | string
    full_price: Decimal | DecimalJsLike | number | string
    startDate?: Date | string
    class_students?: Class_StudentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    installments_count?: IntFieldUpdateOperationsInput | number
    installments_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    full_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    class_students?: Class_StudentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    installments_count?: IntFieldUpdateOperationsInput | number
    installments_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    full_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    class_students?: Class_StudentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    duration: string
    day: string
    startTime: string
    endTime?: string | null
    installments_count: number
    installments_price: Decimal | DecimalJsLike | number | string
    full_price: Decimal | DecimalJsLike | number | string
    startDate?: Date | string
  }

  export type ClassUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    installments_count?: IntFieldUpdateOperationsInput | number
    installments_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    full_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    installments_count?: IntFieldUpdateOperationsInput | number
    installments_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    full_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Class_StudentCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    class: ClassCreateNestedOneWithoutClass_studentsInput
    student: UserCreateNestedOneWithoutClass_studentsInput
    class_installments?: Class_InstallmentCreateNestedManyWithoutClass_studentInput
  }

  export type Class_StudentUncheckedCreateInput = {
    id?: number
    class_id: number
    student_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    class_installments?: Class_InstallmentUncheckedCreateNestedManyWithoutClass_studentInput
  }

  export type Class_StudentUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    class?: ClassUpdateOneRequiredWithoutClass_studentsNestedInput
    student?: UserUpdateOneRequiredWithoutClass_studentsNestedInput
    class_installments?: Class_InstallmentUpdateManyWithoutClass_studentNestedInput
  }

  export type Class_StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    class_installments?: Class_InstallmentUncheckedUpdateManyWithoutClass_studentNestedInput
  }

  export type Class_StudentCreateManyInput = {
    id?: number
    class_id: number
    student_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
  }

  export type Class_StudentUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Class_StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Class_InstallmentCreateInput = {
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    installments_Due_Date?: Date | string
    class_student: Class_StudentCreateNestedOneWithoutClass_installmentsInput
  }

  export type Class_InstallmentUncheckedCreateInput = {
    id?: number
    class_student_id: number
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    installments_Due_Date?: Date | string
  }

  export type Class_InstallmentUpdateInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    installments_Due_Date?: DateTimeFieldUpdateOperationsInput | Date | string
    class_student?: Class_StudentUpdateOneRequiredWithoutClass_installmentsNestedInput
  }

  export type Class_InstallmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_student_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    installments_Due_Date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Class_InstallmentCreateManyInput = {
    id?: number
    class_student_id: number
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    installments_Due_Date?: Date | string
  }

  export type Class_InstallmentUpdateManyMutationInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    installments_Due_Date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Class_InstallmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_student_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    installments_Due_Date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocalRecordingAppointmentCreateInput = {
    date: string
    status: string
    note?: string | null
    details?: VocalRecordingAppointmentDetailCreateNestedManyWithoutAppointmentInput
  }

  export type VocalRecordingAppointmentUncheckedCreateInput = {
    id?: number
    date: string
    status: string
    note?: string | null
    details?: VocalRecordingAppointmentDetailUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type VocalRecordingAppointmentUpdateInput = {
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    details?: VocalRecordingAppointmentDetailUpdateManyWithoutAppointmentNestedInput
  }

  export type VocalRecordingAppointmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    details?: VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type VocalRecordingAppointmentCreateManyInput = {
    id?: number
    date: string
    status: string
    note?: string | null
  }

  export type VocalRecordingAppointmentUpdateManyMutationInput = {
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VocalRecordingAppointmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VocalRecordingAppointmentDetailCreateInput = {
    time_in: string
    time_out: string
    note?: string | null
    status?: string
    isCancel?: boolean
    user: UserCreateNestedOneWithoutAppointmentsInput
    appointment: VocalRecordingAppointmentCreateNestedOneWithoutDetailsInput
    payments?: PaymentCreateNestedManyWithoutAppointmentInput
  }

  export type VocalRecordingAppointmentDetailUncheckedCreateInput = {
    id?: number
    appointment_id: number
    time_in: string
    time_out: string
    note?: string | null
    user_id: number
    status?: string
    isCancel?: boolean
    payments?: PaymentUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type VocalRecordingAppointmentDetailUpdateInput = {
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    appointment?: VocalRecordingAppointmentUpdateOneRequiredWithoutDetailsNestedInput
    payments?: PaymentUpdateManyWithoutAppointmentNestedInput
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointment_id?: IntFieldUpdateOperationsInput | number
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
    payments?: PaymentUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type VocalRecordingAppointmentDetailCreateManyInput = {
    id?: number
    appointment_id: number
    time_in: string
    time_out: string
    note?: string | null
    user_id: number
    status?: string
    isCancel?: boolean
  }

  export type VocalRecordingAppointmentDetailUpdateManyMutationInput = {
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointment_id?: IntFieldUpdateOperationsInput | number
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentCreateInput = {
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    user: UserCreateNestedOneWithoutPaymentsInput
    appointment: VocalRecordingAppointmentDetailCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    user_id: number
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    appointment_id: number
  }

  export type PaymentUpdateInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    appointment?: VocalRecordingAppointmentDetailUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    appointment_id?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentCreateManyInput = {
    id?: number
    user_id: number
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    appointment_id: number
  }

  export type PaymentUpdateManyMutationInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    appointment_id?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserTypeScalarRelationFilter = {
    is?: UserTypeWhereInput
    isNot?: UserTypeWhereInput
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type VocalRecordingAppointmentDetailListRelationFilter = {
    every?: VocalRecordingAppointmentDetailWhereInput
    some?: VocalRecordingAppointmentDetailWhereInput
    none?: VocalRecordingAppointmentDetailWhereInput
  }

  export type Class_StudentListRelationFilter = {
    every?: Class_StudentWhereInput
    some?: Class_StudentWhereInput
    none?: Class_StudentWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VocalRecordingAppointmentDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Class_StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    password?: SortOrder
    typeId?: SortOrder
    contactNumber?: SortOrder
    address?: SortOrder
    city?: SortOrder
    district?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    typeId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    password?: SortOrder
    typeId?: SortOrder
    contactNumber?: SortOrder
    address?: SortOrder
    city?: SortOrder
    district?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    password?: SortOrder
    typeId?: SortOrder
    contactNumber?: SortOrder
    address?: SortOrder
    city?: SortOrder
    district?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    typeId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserTypeOrderByRelevanceInput = {
    fields: UserTypeOrderByRelevanceFieldEnum | UserTypeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type UserTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type UserTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type UserTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AttendanceOrderByRelevanceInput = {
    fields: AttendanceOrderByRelevanceFieldEnum | AttendanceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    date?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrder
    note?: SortOrder
  }

  export type AttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    date?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrder
    note?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    date?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrder
    note?: SortOrder
  }

  export type AttendanceSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EventOrderByRelevanceInput = {
    fields: EventOrderByRelevanceFieldEnum | EventOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    location?: SortOrder
    time?: SortOrder
    note?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    location?: SortOrder
    time?: SortOrder
    note?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    location?: SortOrder
    time?: SortOrder
    note?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ClassOrderByRelevanceInput = {
    fields: ClassOrderByRelevanceFieldEnum | ClassOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    installments_count?: SortOrder
    installments_price?: SortOrder
    full_price?: SortOrder
    startDate?: SortOrder
  }

  export type ClassAvgOrderByAggregateInput = {
    id?: SortOrder
    installments_count?: SortOrder
    installments_price?: SortOrder
    full_price?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    installments_count?: SortOrder
    installments_price?: SortOrder
    full_price?: SortOrder
    startDate?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    installments_count?: SortOrder
    installments_price?: SortOrder
    full_price?: SortOrder
    startDate?: SortOrder
  }

  export type ClassSumOrderByAggregateInput = {
    id?: SortOrder
    installments_count?: SortOrder
    installments_price?: SortOrder
    full_price?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ClassScalarRelationFilter = {
    is?: ClassWhereInput
    isNot?: ClassWhereInput
  }

  export type Class_InstallmentListRelationFilter = {
    every?: Class_InstallmentWhereInput
    some?: Class_InstallmentWhereInput
    none?: Class_InstallmentWhereInput
  }

  export type Class_InstallmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Class_StudentCountOrderByAggregateInput = {
    id?: SortOrder
    class_id?: SortOrder
    student_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
  }

  export type Class_StudentAvgOrderByAggregateInput = {
    id?: SortOrder
    class_id?: SortOrder
    student_id?: SortOrder
  }

  export type Class_StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    class_id?: SortOrder
    student_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
  }

  export type Class_StudentMinOrderByAggregateInput = {
    id?: SortOrder
    class_id?: SortOrder
    student_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
  }

  export type Class_StudentSumOrderByAggregateInput = {
    id?: SortOrder
    class_id?: SortOrder
    student_id?: SortOrder
  }

  export type Class_StudentScalarRelationFilter = {
    is?: Class_StudentWhereInput
    isNot?: Class_StudentWhereInput
  }

  export type Class_InstallmentOrderByRelevanceInput = {
    fields: Class_InstallmentOrderByRelevanceFieldEnum | Class_InstallmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type Class_InstallmentCountOrderByAggregateInput = {
    id?: SortOrder
    class_student_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    installments_Due_Date?: SortOrder
  }

  export type Class_InstallmentAvgOrderByAggregateInput = {
    id?: SortOrder
    class_student_id?: SortOrder
    amount?: SortOrder
  }

  export type Class_InstallmentMaxOrderByAggregateInput = {
    id?: SortOrder
    class_student_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    installments_Due_Date?: SortOrder
  }

  export type Class_InstallmentMinOrderByAggregateInput = {
    id?: SortOrder
    class_student_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    installments_Due_Date?: SortOrder
  }

  export type Class_InstallmentSumOrderByAggregateInput = {
    id?: SortOrder
    class_student_id?: SortOrder
    amount?: SortOrder
  }

  export type VocalRecordingAppointmentOrderByRelevanceInput = {
    fields: VocalRecordingAppointmentOrderByRelevanceFieldEnum | VocalRecordingAppointmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VocalRecordingAppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    note?: SortOrder
  }

  export type VocalRecordingAppointmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VocalRecordingAppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    note?: SortOrder
  }

  export type VocalRecordingAppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    note?: SortOrder
  }

  export type VocalRecordingAppointmentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VocalRecordingAppointmentScalarRelationFilter = {
    is?: VocalRecordingAppointmentWhereInput
    isNot?: VocalRecordingAppointmentWhereInput
  }

  export type VocalRecordingAppointmentDetailOrderByRelevanceInput = {
    fields: VocalRecordingAppointmentDetailOrderByRelevanceFieldEnum | VocalRecordingAppointmentDetailOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VocalRecordingAppointmentDetailCountOrderByAggregateInput = {
    id?: SortOrder
    appointment_id?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrder
    note?: SortOrder
    user_id?: SortOrder
    status?: SortOrder
    isCancel?: SortOrder
  }

  export type VocalRecordingAppointmentDetailAvgOrderByAggregateInput = {
    id?: SortOrder
    appointment_id?: SortOrder
    user_id?: SortOrder
  }

  export type VocalRecordingAppointmentDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    appointment_id?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrder
    note?: SortOrder
    user_id?: SortOrder
    status?: SortOrder
    isCancel?: SortOrder
  }

  export type VocalRecordingAppointmentDetailMinOrderByAggregateInput = {
    id?: SortOrder
    appointment_id?: SortOrder
    time_in?: SortOrder
    time_out?: SortOrder
    note?: SortOrder
    user_id?: SortOrder
    status?: SortOrder
    isCancel?: SortOrder
  }

  export type VocalRecordingAppointmentDetailSumOrderByAggregateInput = {
    id?: SortOrder
    appointment_id?: SortOrder
    user_id?: SortOrder
  }

  export type EnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[]
    notIn?: $Enums.PaymentType[]
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type VocalRecordingAppointmentDetailScalarRelationFilter = {
    is?: VocalRecordingAppointmentDetailWhereInput
    isNot?: VocalRecordingAppointmentDetailWhereInput
  }

  export type PaymentOrderByRelevanceInput = {
    fields: PaymentOrderByRelevanceFieldEnum | PaymentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    paymentType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    appointment_id?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    appointment_id?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    paymentType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    appointment_id?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    paymentType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleteStatus?: SortOrder
    appointment_id?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    appointment_id?: SortOrder
  }

  export type EnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[]
    notIn?: $Enums.PaymentType[]
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type UserTypeCreateNestedOneWithoutUsersInput = {
    create?: XOR<UserTypeCreateWithoutUsersInput, UserTypeUncheckedCreateWithoutUsersInput>
    connectOrCreate?: UserTypeCreateOrConnectWithoutUsersInput
    connect?: UserTypeWhereUniqueInput
  }

  export type AttendanceCreateNestedManyWithoutUserInput = {
    create?: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput> | AttendanceCreateWithoutUserInput[] | AttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutUserInput | AttendanceCreateOrConnectWithoutUserInput[]
    createMany?: AttendanceCreateManyUserInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type VocalRecordingAppointmentDetailCreateNestedManyWithoutUserInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutUserInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput> | VocalRecordingAppointmentDetailCreateWithoutUserInput[] | VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput | VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput[]
    createMany?: VocalRecordingAppointmentDetailCreateManyUserInputEnvelope
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
  }

  export type Class_StudentCreateNestedManyWithoutStudentInput = {
    create?: XOR<Class_StudentCreateWithoutStudentInput, Class_StudentUncheckedCreateWithoutStudentInput> | Class_StudentCreateWithoutStudentInput[] | Class_StudentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Class_StudentCreateOrConnectWithoutStudentInput | Class_StudentCreateOrConnectWithoutStudentInput[]
    createMany?: Class_StudentCreateManyStudentInputEnvelope
    connect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput> | AttendanceCreateWithoutUserInput[] | AttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutUserInput | AttendanceCreateOrConnectWithoutUserInput[]
    createMany?: AttendanceCreateManyUserInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type VocalRecordingAppointmentDetailUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutUserInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput> | VocalRecordingAppointmentDetailCreateWithoutUserInput[] | VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput | VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput[]
    createMany?: VocalRecordingAppointmentDetailCreateManyUserInputEnvelope
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
  }

  export type Class_StudentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<Class_StudentCreateWithoutStudentInput, Class_StudentUncheckedCreateWithoutStudentInput> | Class_StudentCreateWithoutStudentInput[] | Class_StudentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Class_StudentCreateOrConnectWithoutStudentInput | Class_StudentCreateOrConnectWithoutStudentInput[]
    createMany?: Class_StudentCreateManyStudentInputEnvelope
    connect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserTypeUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<UserTypeCreateWithoutUsersInput, UserTypeUncheckedCreateWithoutUsersInput>
    connectOrCreate?: UserTypeCreateOrConnectWithoutUsersInput
    upsert?: UserTypeUpsertWithoutUsersInput
    connect?: UserTypeWhereUniqueInput
    update?: XOR<XOR<UserTypeUpdateToOneWithWhereWithoutUsersInput, UserTypeUpdateWithoutUsersInput>, UserTypeUncheckedUpdateWithoutUsersInput>
  }

  export type AttendanceUpdateManyWithoutUserNestedInput = {
    create?: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput> | AttendanceCreateWithoutUserInput[] | AttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutUserInput | AttendanceCreateOrConnectWithoutUserInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutUserInput | AttendanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AttendanceCreateManyUserInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutUserInput | AttendanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutUserInput | AttendanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type VocalRecordingAppointmentDetailUpdateManyWithoutUserNestedInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutUserInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput> | VocalRecordingAppointmentDetailCreateWithoutUserInput[] | VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput | VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput[]
    upsert?: VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutUserInput | VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VocalRecordingAppointmentDetailCreateManyUserInputEnvelope
    set?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    disconnect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    delete?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    update?: VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutUserInput | VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutUserInput | VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VocalRecordingAppointmentDetailScalarWhereInput | VocalRecordingAppointmentDetailScalarWhereInput[]
  }

  export type Class_StudentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<Class_StudentCreateWithoutStudentInput, Class_StudentUncheckedCreateWithoutStudentInput> | Class_StudentCreateWithoutStudentInput[] | Class_StudentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Class_StudentCreateOrConnectWithoutStudentInput | Class_StudentCreateOrConnectWithoutStudentInput[]
    upsert?: Class_StudentUpsertWithWhereUniqueWithoutStudentInput | Class_StudentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: Class_StudentCreateManyStudentInputEnvelope
    set?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    disconnect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    delete?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    connect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    update?: Class_StudentUpdateWithWhereUniqueWithoutStudentInput | Class_StudentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: Class_StudentUpdateManyWithWhereWithoutStudentInput | Class_StudentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: Class_StudentScalarWhereInput | Class_StudentScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AttendanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput> | AttendanceCreateWithoutUserInput[] | AttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutUserInput | AttendanceCreateOrConnectWithoutUserInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutUserInput | AttendanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AttendanceCreateManyUserInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutUserInput | AttendanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutUserInput | AttendanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutUserInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput> | VocalRecordingAppointmentDetailCreateWithoutUserInput[] | VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput | VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput[]
    upsert?: VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutUserInput | VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VocalRecordingAppointmentDetailCreateManyUserInputEnvelope
    set?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    disconnect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    delete?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    update?: VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutUserInput | VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutUserInput | VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VocalRecordingAppointmentDetailScalarWhereInput | VocalRecordingAppointmentDetailScalarWhereInput[]
  }

  export type Class_StudentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<Class_StudentCreateWithoutStudentInput, Class_StudentUncheckedCreateWithoutStudentInput> | Class_StudentCreateWithoutStudentInput[] | Class_StudentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Class_StudentCreateOrConnectWithoutStudentInput | Class_StudentCreateOrConnectWithoutStudentInput[]
    upsert?: Class_StudentUpsertWithWhereUniqueWithoutStudentInput | Class_StudentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: Class_StudentCreateManyStudentInputEnvelope
    set?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    disconnect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    delete?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    connect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    update?: Class_StudentUpdateWithWhereUniqueWithoutStudentInput | Class_StudentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: Class_StudentUpdateManyWithWhereWithoutStudentInput | Class_StudentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: Class_StudentScalarWhereInput | Class_StudentScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutTypeInput = {
    create?: XOR<UserCreateWithoutTypeInput, UserUncheckedCreateWithoutTypeInput> | UserCreateWithoutTypeInput[] | UserUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTypeInput | UserCreateOrConnectWithoutTypeInput[]
    createMany?: UserCreateManyTypeInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTypeInput = {
    create?: XOR<UserCreateWithoutTypeInput, UserUncheckedCreateWithoutTypeInput> | UserCreateWithoutTypeInput[] | UserUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTypeInput | UserCreateOrConnectWithoutTypeInput[]
    createMany?: UserCreateManyTypeInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutTypeNestedInput = {
    create?: XOR<UserCreateWithoutTypeInput, UserUncheckedCreateWithoutTypeInput> | UserCreateWithoutTypeInput[] | UserUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTypeInput | UserCreateOrConnectWithoutTypeInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTypeInput | UserUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: UserCreateManyTypeInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTypeInput | UserUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTypeInput | UserUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutTypeNestedInput = {
    create?: XOR<UserCreateWithoutTypeInput, UserUncheckedCreateWithoutTypeInput> | UserCreateWithoutTypeInput[] | UserUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTypeInput | UserCreateOrConnectWithoutTypeInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTypeInput | UserUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: UserCreateManyTypeInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTypeInput | UserUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTypeInput | UserUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAttendanceInput = {
    create?: XOR<UserCreateWithoutAttendanceInput, UserUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendanceInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAttendanceNestedInput = {
    create?: XOR<UserCreateWithoutAttendanceInput, UserUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendanceInput
    upsert?: UserUpsertWithoutAttendanceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAttendanceInput, UserUpdateWithoutAttendanceInput>, UserUncheckedUpdateWithoutAttendanceInput>
  }

  export type Class_StudentCreateNestedManyWithoutClassInput = {
    create?: XOR<Class_StudentCreateWithoutClassInput, Class_StudentUncheckedCreateWithoutClassInput> | Class_StudentCreateWithoutClassInput[] | Class_StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: Class_StudentCreateOrConnectWithoutClassInput | Class_StudentCreateOrConnectWithoutClassInput[]
    createMany?: Class_StudentCreateManyClassInputEnvelope
    connect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
  }

  export type Class_StudentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<Class_StudentCreateWithoutClassInput, Class_StudentUncheckedCreateWithoutClassInput> | Class_StudentCreateWithoutClassInput[] | Class_StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: Class_StudentCreateOrConnectWithoutClassInput | Class_StudentCreateOrConnectWithoutClassInput[]
    createMany?: Class_StudentCreateManyClassInputEnvelope
    connect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type Class_StudentUpdateManyWithoutClassNestedInput = {
    create?: XOR<Class_StudentCreateWithoutClassInput, Class_StudentUncheckedCreateWithoutClassInput> | Class_StudentCreateWithoutClassInput[] | Class_StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: Class_StudentCreateOrConnectWithoutClassInput | Class_StudentCreateOrConnectWithoutClassInput[]
    upsert?: Class_StudentUpsertWithWhereUniqueWithoutClassInput | Class_StudentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: Class_StudentCreateManyClassInputEnvelope
    set?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    disconnect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    delete?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    connect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    update?: Class_StudentUpdateWithWhereUniqueWithoutClassInput | Class_StudentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: Class_StudentUpdateManyWithWhereWithoutClassInput | Class_StudentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: Class_StudentScalarWhereInput | Class_StudentScalarWhereInput[]
  }

  export type Class_StudentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<Class_StudentCreateWithoutClassInput, Class_StudentUncheckedCreateWithoutClassInput> | Class_StudentCreateWithoutClassInput[] | Class_StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: Class_StudentCreateOrConnectWithoutClassInput | Class_StudentCreateOrConnectWithoutClassInput[]
    upsert?: Class_StudentUpsertWithWhereUniqueWithoutClassInput | Class_StudentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: Class_StudentCreateManyClassInputEnvelope
    set?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    disconnect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    delete?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    connect?: Class_StudentWhereUniqueInput | Class_StudentWhereUniqueInput[]
    update?: Class_StudentUpdateWithWhereUniqueWithoutClassInput | Class_StudentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: Class_StudentUpdateManyWithWhereWithoutClassInput | Class_StudentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: Class_StudentScalarWhereInput | Class_StudentScalarWhereInput[]
  }

  export type ClassCreateNestedOneWithoutClass_studentsInput = {
    create?: XOR<ClassCreateWithoutClass_studentsInput, ClassUncheckedCreateWithoutClass_studentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutClass_studentsInput
    connect?: ClassWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClass_studentsInput = {
    create?: XOR<UserCreateWithoutClass_studentsInput, UserUncheckedCreateWithoutClass_studentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClass_studentsInput
    connect?: UserWhereUniqueInput
  }

  export type Class_InstallmentCreateNestedManyWithoutClass_studentInput = {
    create?: XOR<Class_InstallmentCreateWithoutClass_studentInput, Class_InstallmentUncheckedCreateWithoutClass_studentInput> | Class_InstallmentCreateWithoutClass_studentInput[] | Class_InstallmentUncheckedCreateWithoutClass_studentInput[]
    connectOrCreate?: Class_InstallmentCreateOrConnectWithoutClass_studentInput | Class_InstallmentCreateOrConnectWithoutClass_studentInput[]
    createMany?: Class_InstallmentCreateManyClass_studentInputEnvelope
    connect?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
  }

  export type Class_InstallmentUncheckedCreateNestedManyWithoutClass_studentInput = {
    create?: XOR<Class_InstallmentCreateWithoutClass_studentInput, Class_InstallmentUncheckedCreateWithoutClass_studentInput> | Class_InstallmentCreateWithoutClass_studentInput[] | Class_InstallmentUncheckedCreateWithoutClass_studentInput[]
    connectOrCreate?: Class_InstallmentCreateOrConnectWithoutClass_studentInput | Class_InstallmentCreateOrConnectWithoutClass_studentInput[]
    createMany?: Class_InstallmentCreateManyClass_studentInputEnvelope
    connect?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
  }

  export type ClassUpdateOneRequiredWithoutClass_studentsNestedInput = {
    create?: XOR<ClassCreateWithoutClass_studentsInput, ClassUncheckedCreateWithoutClass_studentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutClass_studentsInput
    upsert?: ClassUpsertWithoutClass_studentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutClass_studentsInput, ClassUpdateWithoutClass_studentsInput>, ClassUncheckedUpdateWithoutClass_studentsInput>
  }

  export type UserUpdateOneRequiredWithoutClass_studentsNestedInput = {
    create?: XOR<UserCreateWithoutClass_studentsInput, UserUncheckedCreateWithoutClass_studentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClass_studentsInput
    upsert?: UserUpsertWithoutClass_studentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClass_studentsInput, UserUpdateWithoutClass_studentsInput>, UserUncheckedUpdateWithoutClass_studentsInput>
  }

  export type Class_InstallmentUpdateManyWithoutClass_studentNestedInput = {
    create?: XOR<Class_InstallmentCreateWithoutClass_studentInput, Class_InstallmentUncheckedCreateWithoutClass_studentInput> | Class_InstallmentCreateWithoutClass_studentInput[] | Class_InstallmentUncheckedCreateWithoutClass_studentInput[]
    connectOrCreate?: Class_InstallmentCreateOrConnectWithoutClass_studentInput | Class_InstallmentCreateOrConnectWithoutClass_studentInput[]
    upsert?: Class_InstallmentUpsertWithWhereUniqueWithoutClass_studentInput | Class_InstallmentUpsertWithWhereUniqueWithoutClass_studentInput[]
    createMany?: Class_InstallmentCreateManyClass_studentInputEnvelope
    set?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
    disconnect?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
    delete?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
    connect?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
    update?: Class_InstallmentUpdateWithWhereUniqueWithoutClass_studentInput | Class_InstallmentUpdateWithWhereUniqueWithoutClass_studentInput[]
    updateMany?: Class_InstallmentUpdateManyWithWhereWithoutClass_studentInput | Class_InstallmentUpdateManyWithWhereWithoutClass_studentInput[]
    deleteMany?: Class_InstallmentScalarWhereInput | Class_InstallmentScalarWhereInput[]
  }

  export type Class_InstallmentUncheckedUpdateManyWithoutClass_studentNestedInput = {
    create?: XOR<Class_InstallmentCreateWithoutClass_studentInput, Class_InstallmentUncheckedCreateWithoutClass_studentInput> | Class_InstallmentCreateWithoutClass_studentInput[] | Class_InstallmentUncheckedCreateWithoutClass_studentInput[]
    connectOrCreate?: Class_InstallmentCreateOrConnectWithoutClass_studentInput | Class_InstallmentCreateOrConnectWithoutClass_studentInput[]
    upsert?: Class_InstallmentUpsertWithWhereUniqueWithoutClass_studentInput | Class_InstallmentUpsertWithWhereUniqueWithoutClass_studentInput[]
    createMany?: Class_InstallmentCreateManyClass_studentInputEnvelope
    set?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
    disconnect?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
    delete?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
    connect?: Class_InstallmentWhereUniqueInput | Class_InstallmentWhereUniqueInput[]
    update?: Class_InstallmentUpdateWithWhereUniqueWithoutClass_studentInput | Class_InstallmentUpdateWithWhereUniqueWithoutClass_studentInput[]
    updateMany?: Class_InstallmentUpdateManyWithWhereWithoutClass_studentInput | Class_InstallmentUpdateManyWithWhereWithoutClass_studentInput[]
    deleteMany?: Class_InstallmentScalarWhereInput | Class_InstallmentScalarWhereInput[]
  }

  export type Class_StudentCreateNestedOneWithoutClass_installmentsInput = {
    create?: XOR<Class_StudentCreateWithoutClass_installmentsInput, Class_StudentUncheckedCreateWithoutClass_installmentsInput>
    connectOrCreate?: Class_StudentCreateOrConnectWithoutClass_installmentsInput
    connect?: Class_StudentWhereUniqueInput
  }

  export type Class_StudentUpdateOneRequiredWithoutClass_installmentsNestedInput = {
    create?: XOR<Class_StudentCreateWithoutClass_installmentsInput, Class_StudentUncheckedCreateWithoutClass_installmentsInput>
    connectOrCreate?: Class_StudentCreateOrConnectWithoutClass_installmentsInput
    upsert?: Class_StudentUpsertWithoutClass_installmentsInput
    connect?: Class_StudentWhereUniqueInput
    update?: XOR<XOR<Class_StudentUpdateToOneWithWhereWithoutClass_installmentsInput, Class_StudentUpdateWithoutClass_installmentsInput>, Class_StudentUncheckedUpdateWithoutClass_installmentsInput>
  }

  export type VocalRecordingAppointmentDetailCreateNestedManyWithoutAppointmentInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutAppointmentInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput> | VocalRecordingAppointmentDetailCreateWithoutAppointmentInput[] | VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput | VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput[]
    createMany?: VocalRecordingAppointmentDetailCreateManyAppointmentInputEnvelope
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
  }

  export type VocalRecordingAppointmentDetailUncheckedCreateNestedManyWithoutAppointmentInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutAppointmentInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput> | VocalRecordingAppointmentDetailCreateWithoutAppointmentInput[] | VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput | VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput[]
    createMany?: VocalRecordingAppointmentDetailCreateManyAppointmentInputEnvelope
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
  }

  export type VocalRecordingAppointmentDetailUpdateManyWithoutAppointmentNestedInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutAppointmentInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput> | VocalRecordingAppointmentDetailCreateWithoutAppointmentInput[] | VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput | VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput[]
    upsert?: VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutAppointmentInput | VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutAppointmentInput[]
    createMany?: VocalRecordingAppointmentDetailCreateManyAppointmentInputEnvelope
    set?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    disconnect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    delete?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    update?: VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutAppointmentInput | VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutAppointmentInput[]
    updateMany?: VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutAppointmentInput | VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutAppointmentInput[]
    deleteMany?: VocalRecordingAppointmentDetailScalarWhereInput | VocalRecordingAppointmentDetailScalarWhereInput[]
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutAppointmentNestedInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutAppointmentInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput> | VocalRecordingAppointmentDetailCreateWithoutAppointmentInput[] | VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput | VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput[]
    upsert?: VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutAppointmentInput | VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutAppointmentInput[]
    createMany?: VocalRecordingAppointmentDetailCreateManyAppointmentInputEnvelope
    set?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    disconnect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    delete?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput | VocalRecordingAppointmentDetailWhereUniqueInput[]
    update?: VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutAppointmentInput | VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutAppointmentInput[]
    updateMany?: VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutAppointmentInput | VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutAppointmentInput[]
    deleteMany?: VocalRecordingAppointmentDetailScalarWhereInput | VocalRecordingAppointmentDetailScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type VocalRecordingAppointmentCreateNestedOneWithoutDetailsInput = {
    create?: XOR<VocalRecordingAppointmentCreateWithoutDetailsInput, VocalRecordingAppointmentUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: VocalRecordingAppointmentCreateOrConnectWithoutDetailsInput
    connect?: VocalRecordingAppointmentWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutAppointmentInput = {
    create?: XOR<PaymentCreateWithoutAppointmentInput, PaymentUncheckedCreateWithoutAppointmentInput> | PaymentCreateWithoutAppointmentInput[] | PaymentUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutAppointmentInput | PaymentCreateOrConnectWithoutAppointmentInput[]
    createMany?: PaymentCreateManyAppointmentInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutAppointmentInput = {
    create?: XOR<PaymentCreateWithoutAppointmentInput, PaymentUncheckedCreateWithoutAppointmentInput> | PaymentCreateWithoutAppointmentInput[] | PaymentUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutAppointmentInput | PaymentCreateOrConnectWithoutAppointmentInput[]
    createMany?: PaymentCreateManyAppointmentInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    upsert?: UserUpsertWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppointmentsInput, UserUpdateWithoutAppointmentsInput>, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type VocalRecordingAppointmentUpdateOneRequiredWithoutDetailsNestedInput = {
    create?: XOR<VocalRecordingAppointmentCreateWithoutDetailsInput, VocalRecordingAppointmentUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: VocalRecordingAppointmentCreateOrConnectWithoutDetailsInput
    upsert?: VocalRecordingAppointmentUpsertWithoutDetailsInput
    connect?: VocalRecordingAppointmentWhereUniqueInput
    update?: XOR<XOR<VocalRecordingAppointmentUpdateToOneWithWhereWithoutDetailsInput, VocalRecordingAppointmentUpdateWithoutDetailsInput>, VocalRecordingAppointmentUncheckedUpdateWithoutDetailsInput>
  }

  export type PaymentUpdateManyWithoutAppointmentNestedInput = {
    create?: XOR<PaymentCreateWithoutAppointmentInput, PaymentUncheckedCreateWithoutAppointmentInput> | PaymentCreateWithoutAppointmentInput[] | PaymentUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutAppointmentInput | PaymentCreateOrConnectWithoutAppointmentInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutAppointmentInput | PaymentUpsertWithWhereUniqueWithoutAppointmentInput[]
    createMany?: PaymentCreateManyAppointmentInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutAppointmentInput | PaymentUpdateWithWhereUniqueWithoutAppointmentInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutAppointmentInput | PaymentUpdateManyWithWhereWithoutAppointmentInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutAppointmentNestedInput = {
    create?: XOR<PaymentCreateWithoutAppointmentInput, PaymentUncheckedCreateWithoutAppointmentInput> | PaymentCreateWithoutAppointmentInput[] | PaymentUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutAppointmentInput | PaymentCreateOrConnectWithoutAppointmentInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutAppointmentInput | PaymentUpsertWithWhereUniqueWithoutAppointmentInput[]
    createMany?: PaymentCreateManyAppointmentInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutAppointmentInput | PaymentUpdateWithWhereUniqueWithoutAppointmentInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutAppointmentInput | PaymentUpdateManyWithWhereWithoutAppointmentInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type VocalRecordingAppointmentDetailCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutPaymentsInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutPaymentsInput
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput
  }

  export type EnumPaymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentType
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type VocalRecordingAppointmentDetailUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<VocalRecordingAppointmentDetailCreateWithoutPaymentsInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: VocalRecordingAppointmentDetailCreateOrConnectWithoutPaymentsInput
    upsert?: VocalRecordingAppointmentDetailUpsertWithoutPaymentsInput
    connect?: VocalRecordingAppointmentDetailWhereUniqueInput
    update?: XOR<XOR<VocalRecordingAppointmentDetailUpdateToOneWithWhereWithoutPaymentsInput, VocalRecordingAppointmentDetailUpdateWithoutPaymentsInput>, VocalRecordingAppointmentDetailUncheckedUpdateWithoutPaymentsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[]
    notIn?: $Enums.PaymentType[]
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[]
    notIn?: $Enums.PaymentType[]
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type UserTypeCreateWithoutUsersInput = {
    name: string
  }

  export type UserTypeUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
  }

  export type UserTypeCreateOrConnectWithoutUsersInput = {
    where: UserTypeWhereUniqueInput
    create: XOR<UserTypeCreateWithoutUsersInput, UserTypeUncheckedCreateWithoutUsersInput>
  }

  export type AttendanceCreateWithoutUserInput = {
    date: Date | string
    time_in: Date | string
    time_out?: Date | string | null
    note?: string | null
  }

  export type AttendanceUncheckedCreateWithoutUserInput = {
    id?: number
    date: Date | string
    time_in: Date | string
    time_out?: Date | string | null
    note?: string | null
  }

  export type AttendanceCreateOrConnectWithoutUserInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput>
  }

  export type AttendanceCreateManyUserInputEnvelope = {
    data: AttendanceCreateManyUserInput | AttendanceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VocalRecordingAppointmentDetailCreateWithoutUserInput = {
    time_in: string
    time_out: string
    note?: string | null
    status?: string
    isCancel?: boolean
    appointment: VocalRecordingAppointmentCreateNestedOneWithoutDetailsInput
    payments?: PaymentCreateNestedManyWithoutAppointmentInput
  }

  export type VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput = {
    id?: number
    appointment_id: number
    time_in: string
    time_out: string
    note?: string | null
    status?: string
    isCancel?: boolean
    payments?: PaymentUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type VocalRecordingAppointmentDetailCreateOrConnectWithoutUserInput = {
    where: VocalRecordingAppointmentDetailWhereUniqueInput
    create: XOR<VocalRecordingAppointmentDetailCreateWithoutUserInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput>
  }

  export type VocalRecordingAppointmentDetailCreateManyUserInputEnvelope = {
    data: VocalRecordingAppointmentDetailCreateManyUserInput | VocalRecordingAppointmentDetailCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type Class_StudentCreateWithoutStudentInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    class: ClassCreateNestedOneWithoutClass_studentsInput
    class_installments?: Class_InstallmentCreateNestedManyWithoutClass_studentInput
  }

  export type Class_StudentUncheckedCreateWithoutStudentInput = {
    id?: number
    class_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    class_installments?: Class_InstallmentUncheckedCreateNestedManyWithoutClass_studentInput
  }

  export type Class_StudentCreateOrConnectWithoutStudentInput = {
    where: Class_StudentWhereUniqueInput
    create: XOR<Class_StudentCreateWithoutStudentInput, Class_StudentUncheckedCreateWithoutStudentInput>
  }

  export type Class_StudentCreateManyStudentInputEnvelope = {
    data: Class_StudentCreateManyStudentInput | Class_StudentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutUserInput = {
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    appointment: VocalRecordingAppointmentDetailCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    appointment_id: number
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserTypeUpsertWithoutUsersInput = {
    update: XOR<UserTypeUpdateWithoutUsersInput, UserTypeUncheckedUpdateWithoutUsersInput>
    create: XOR<UserTypeCreateWithoutUsersInput, UserTypeUncheckedCreateWithoutUsersInput>
    where?: UserTypeWhereInput
  }

  export type UserTypeUpdateToOneWithWhereWithoutUsersInput = {
    where?: UserTypeWhereInput
    data: XOR<UserTypeUpdateWithoutUsersInput, UserTypeUncheckedUpdateWithoutUsersInput>
  }

  export type UserTypeUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserTypeUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceUpsertWithWhereUniqueWithoutUserInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutUserInput, AttendanceUncheckedUpdateWithoutUserInput>
    create: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutUserInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutUserInput, AttendanceUncheckedUpdateWithoutUserInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutUserInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutUserInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: IntFilter<"Attendance"> | number
    user_id?: IntFilter<"Attendance"> | number
    date?: DateTimeFilter<"Attendance"> | Date | string
    time_in?: DateTimeFilter<"Attendance"> | Date | string
    time_out?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    note?: StringNullableFilter<"Attendance"> | string | null
  }

  export type VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutUserInput = {
    where: VocalRecordingAppointmentDetailWhereUniqueInput
    update: XOR<VocalRecordingAppointmentDetailUpdateWithoutUserInput, VocalRecordingAppointmentDetailUncheckedUpdateWithoutUserInput>
    create: XOR<VocalRecordingAppointmentDetailCreateWithoutUserInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutUserInput>
  }

  export type VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutUserInput = {
    where: VocalRecordingAppointmentDetailWhereUniqueInput
    data: XOR<VocalRecordingAppointmentDetailUpdateWithoutUserInput, VocalRecordingAppointmentDetailUncheckedUpdateWithoutUserInput>
  }

  export type VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutUserInput = {
    where: VocalRecordingAppointmentDetailScalarWhereInput
    data: XOR<VocalRecordingAppointmentDetailUpdateManyMutationInput, VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutUserInput>
  }

  export type VocalRecordingAppointmentDetailScalarWhereInput = {
    AND?: VocalRecordingAppointmentDetailScalarWhereInput | VocalRecordingAppointmentDetailScalarWhereInput[]
    OR?: VocalRecordingAppointmentDetailScalarWhereInput[]
    NOT?: VocalRecordingAppointmentDetailScalarWhereInput | VocalRecordingAppointmentDetailScalarWhereInput[]
    id?: IntFilter<"VocalRecordingAppointmentDetail"> | number
    appointment_id?: IntFilter<"VocalRecordingAppointmentDetail"> | number
    time_in?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    time_out?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    note?: StringNullableFilter<"VocalRecordingAppointmentDetail"> | string | null
    user_id?: IntFilter<"VocalRecordingAppointmentDetail"> | number
    status?: StringFilter<"VocalRecordingAppointmentDetail"> | string
    isCancel?: BoolFilter<"VocalRecordingAppointmentDetail"> | boolean
  }

  export type Class_StudentUpsertWithWhereUniqueWithoutStudentInput = {
    where: Class_StudentWhereUniqueInput
    update: XOR<Class_StudentUpdateWithoutStudentInput, Class_StudentUncheckedUpdateWithoutStudentInput>
    create: XOR<Class_StudentCreateWithoutStudentInput, Class_StudentUncheckedCreateWithoutStudentInput>
  }

  export type Class_StudentUpdateWithWhereUniqueWithoutStudentInput = {
    where: Class_StudentWhereUniqueInput
    data: XOR<Class_StudentUpdateWithoutStudentInput, Class_StudentUncheckedUpdateWithoutStudentInput>
  }

  export type Class_StudentUpdateManyWithWhereWithoutStudentInput = {
    where: Class_StudentScalarWhereInput
    data: XOR<Class_StudentUpdateManyMutationInput, Class_StudentUncheckedUpdateManyWithoutStudentInput>
  }

  export type Class_StudentScalarWhereInput = {
    AND?: Class_StudentScalarWhereInput | Class_StudentScalarWhereInput[]
    OR?: Class_StudentScalarWhereInput[]
    NOT?: Class_StudentScalarWhereInput | Class_StudentScalarWhereInput[]
    id?: IntFilter<"Class_Student"> | number
    class_id?: IntFilter<"Class_Student"> | number
    student_id?: IntFilter<"Class_Student"> | number
    createdAt?: DateTimeFilter<"Class_Student"> | Date | string
    updatedAt?: DateTimeFilter<"Class_Student"> | Date | string
    deleteStatus?: BoolFilter<"Class_Student"> | boolean
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    user_id?: IntFilter<"Payment"> | number
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    note?: StringNullableFilter<"Payment"> | string | null
    status?: StringFilter<"Payment"> | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    paymentMethod?: StringFilter<"Payment"> | string
    paymentType?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    deleteStatus?: BoolFilter<"Payment"> | boolean
    appointment_id?: IntFilter<"Payment"> | number
  }

  export type UserCreateWithoutTypeInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    attendance?: AttendanceCreateNestedManyWithoutUserInput
    appointments?: VocalRecordingAppointmentDetailCreateNestedManyWithoutUserInput
    class_students?: Class_StudentCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTypeInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    attendance?: AttendanceUncheckedCreateNestedManyWithoutUserInput
    appointments?: VocalRecordingAppointmentDetailUncheckedCreateNestedManyWithoutUserInput
    class_students?: Class_StudentUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTypeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTypeInput, UserUncheckedCreateWithoutTypeInput>
  }

  export type UserCreateManyTypeInputEnvelope = {
    data: UserCreateManyTypeInput | UserCreateManyTypeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutTypeInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTypeInput, UserUncheckedUpdateWithoutTypeInput>
    create: XOR<UserCreateWithoutTypeInput, UserUncheckedCreateWithoutTypeInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTypeInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTypeInput, UserUncheckedUpdateWithoutTypeInput>
  }

  export type UserUpdateManyWithWhereWithoutTypeInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTypeInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    typeId?: IntFilter<"User"> | number
    contactNumber?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    district?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deleteStatus?: BoolFilter<"User"> | boolean
  }

  export type UserCreateWithoutAttendanceInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    type: UserTypeCreateNestedOneWithoutUsersInput
    appointments?: VocalRecordingAppointmentDetailCreateNestedManyWithoutUserInput
    class_students?: Class_StudentCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAttendanceInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    typeId: number
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    appointments?: VocalRecordingAppointmentDetailUncheckedCreateNestedManyWithoutUserInput
    class_students?: Class_StudentUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAttendanceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAttendanceInput, UserUncheckedCreateWithoutAttendanceInput>
  }

  export type UserUpsertWithoutAttendanceInput = {
    update: XOR<UserUpdateWithoutAttendanceInput, UserUncheckedUpdateWithoutAttendanceInput>
    create: XOR<UserCreateWithoutAttendanceInput, UserUncheckedCreateWithoutAttendanceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAttendanceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAttendanceInput, UserUncheckedUpdateWithoutAttendanceInput>
  }

  export type UserUpdateWithoutAttendanceInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    type?: UserTypeUpdateOneRequiredWithoutUsersNestedInput
    appointments?: VocalRecordingAppointmentDetailUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAttendanceInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    appointments?: VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type Class_StudentCreateWithoutClassInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    student: UserCreateNestedOneWithoutClass_studentsInput
    class_installments?: Class_InstallmentCreateNestedManyWithoutClass_studentInput
  }

  export type Class_StudentUncheckedCreateWithoutClassInput = {
    id?: number
    student_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    class_installments?: Class_InstallmentUncheckedCreateNestedManyWithoutClass_studentInput
  }

  export type Class_StudentCreateOrConnectWithoutClassInput = {
    where: Class_StudentWhereUniqueInput
    create: XOR<Class_StudentCreateWithoutClassInput, Class_StudentUncheckedCreateWithoutClassInput>
  }

  export type Class_StudentCreateManyClassInputEnvelope = {
    data: Class_StudentCreateManyClassInput | Class_StudentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type Class_StudentUpsertWithWhereUniqueWithoutClassInput = {
    where: Class_StudentWhereUniqueInput
    update: XOR<Class_StudentUpdateWithoutClassInput, Class_StudentUncheckedUpdateWithoutClassInput>
    create: XOR<Class_StudentCreateWithoutClassInput, Class_StudentUncheckedCreateWithoutClassInput>
  }

  export type Class_StudentUpdateWithWhereUniqueWithoutClassInput = {
    where: Class_StudentWhereUniqueInput
    data: XOR<Class_StudentUpdateWithoutClassInput, Class_StudentUncheckedUpdateWithoutClassInput>
  }

  export type Class_StudentUpdateManyWithWhereWithoutClassInput = {
    where: Class_StudentScalarWhereInput
    data: XOR<Class_StudentUpdateManyMutationInput, Class_StudentUncheckedUpdateManyWithoutClassInput>
  }

  export type ClassCreateWithoutClass_studentsInput = {
    name: string
    description?: string | null
    duration: string
    day: string
    startTime: string
    endTime?: string | null
    installments_count: number
    installments_price: Decimal | DecimalJsLike | number | string
    full_price: Decimal | DecimalJsLike | number | string
    startDate?: Date | string
  }

  export type ClassUncheckedCreateWithoutClass_studentsInput = {
    id?: number
    name: string
    description?: string | null
    duration: string
    day: string
    startTime: string
    endTime?: string | null
    installments_count: number
    installments_price: Decimal | DecimalJsLike | number | string
    full_price: Decimal | DecimalJsLike | number | string
    startDate?: Date | string
  }

  export type ClassCreateOrConnectWithoutClass_studentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutClass_studentsInput, ClassUncheckedCreateWithoutClass_studentsInput>
  }

  export type UserCreateWithoutClass_studentsInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    type: UserTypeCreateNestedOneWithoutUsersInput
    attendance?: AttendanceCreateNestedManyWithoutUserInput
    appointments?: VocalRecordingAppointmentDetailCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClass_studentsInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    typeId: number
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    attendance?: AttendanceUncheckedCreateNestedManyWithoutUserInput
    appointments?: VocalRecordingAppointmentDetailUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClass_studentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClass_studentsInput, UserUncheckedCreateWithoutClass_studentsInput>
  }

  export type Class_InstallmentCreateWithoutClass_studentInput = {
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    installments_Due_Date?: Date | string
  }

  export type Class_InstallmentUncheckedCreateWithoutClass_studentInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    installments_Due_Date?: Date | string
  }

  export type Class_InstallmentCreateOrConnectWithoutClass_studentInput = {
    where: Class_InstallmentWhereUniqueInput
    create: XOR<Class_InstallmentCreateWithoutClass_studentInput, Class_InstallmentUncheckedCreateWithoutClass_studentInput>
  }

  export type Class_InstallmentCreateManyClass_studentInputEnvelope = {
    data: Class_InstallmentCreateManyClass_studentInput | Class_InstallmentCreateManyClass_studentInput[]
    skipDuplicates?: boolean
  }

  export type ClassUpsertWithoutClass_studentsInput = {
    update: XOR<ClassUpdateWithoutClass_studentsInput, ClassUncheckedUpdateWithoutClass_studentsInput>
    create: XOR<ClassCreateWithoutClass_studentsInput, ClassUncheckedCreateWithoutClass_studentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutClass_studentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutClass_studentsInput, ClassUncheckedUpdateWithoutClass_studentsInput>
  }

  export type ClassUpdateWithoutClass_studentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    installments_count?: IntFieldUpdateOperationsInput | number
    installments_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    full_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassUncheckedUpdateWithoutClass_studentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    installments_count?: IntFieldUpdateOperationsInput | number
    installments_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    full_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutClass_studentsInput = {
    update: XOR<UserUpdateWithoutClass_studentsInput, UserUncheckedUpdateWithoutClass_studentsInput>
    create: XOR<UserCreateWithoutClass_studentsInput, UserUncheckedCreateWithoutClass_studentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClass_studentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClass_studentsInput, UserUncheckedUpdateWithoutClass_studentsInput>
  }

  export type UserUpdateWithoutClass_studentsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    type?: UserTypeUpdateOneRequiredWithoutUsersNestedInput
    attendance?: AttendanceUpdateManyWithoutUserNestedInput
    appointments?: VocalRecordingAppointmentDetailUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClass_studentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    attendance?: AttendanceUncheckedUpdateManyWithoutUserNestedInput
    appointments?: VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type Class_InstallmentUpsertWithWhereUniqueWithoutClass_studentInput = {
    where: Class_InstallmentWhereUniqueInput
    update: XOR<Class_InstallmentUpdateWithoutClass_studentInput, Class_InstallmentUncheckedUpdateWithoutClass_studentInput>
    create: XOR<Class_InstallmentCreateWithoutClass_studentInput, Class_InstallmentUncheckedCreateWithoutClass_studentInput>
  }

  export type Class_InstallmentUpdateWithWhereUniqueWithoutClass_studentInput = {
    where: Class_InstallmentWhereUniqueInput
    data: XOR<Class_InstallmentUpdateWithoutClass_studentInput, Class_InstallmentUncheckedUpdateWithoutClass_studentInput>
  }

  export type Class_InstallmentUpdateManyWithWhereWithoutClass_studentInput = {
    where: Class_InstallmentScalarWhereInput
    data: XOR<Class_InstallmentUpdateManyMutationInput, Class_InstallmentUncheckedUpdateManyWithoutClass_studentInput>
  }

  export type Class_InstallmentScalarWhereInput = {
    AND?: Class_InstallmentScalarWhereInput | Class_InstallmentScalarWhereInput[]
    OR?: Class_InstallmentScalarWhereInput[]
    NOT?: Class_InstallmentScalarWhereInput | Class_InstallmentScalarWhereInput[]
    id?: IntFilter<"Class_Installment"> | number
    class_student_id?: IntFilter<"Class_Installment"> | number
    amount?: DecimalFilter<"Class_Installment"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Class_Installment"> | string
    paymentDate?: DateTimeFilter<"Class_Installment"> | Date | string
    paymentMethod?: StringFilter<"Class_Installment"> | string
    createdAt?: DateTimeFilter<"Class_Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Class_Installment"> | Date | string
    deleteStatus?: BoolFilter<"Class_Installment"> | boolean
    installments_Due_Date?: DateTimeFilter<"Class_Installment"> | Date | string
  }

  export type Class_StudentCreateWithoutClass_installmentsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    class: ClassCreateNestedOneWithoutClass_studentsInput
    student: UserCreateNestedOneWithoutClass_studentsInput
  }

  export type Class_StudentUncheckedCreateWithoutClass_installmentsInput = {
    id?: number
    class_id: number
    student_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
  }

  export type Class_StudentCreateOrConnectWithoutClass_installmentsInput = {
    where: Class_StudentWhereUniqueInput
    create: XOR<Class_StudentCreateWithoutClass_installmentsInput, Class_StudentUncheckedCreateWithoutClass_installmentsInput>
  }

  export type Class_StudentUpsertWithoutClass_installmentsInput = {
    update: XOR<Class_StudentUpdateWithoutClass_installmentsInput, Class_StudentUncheckedUpdateWithoutClass_installmentsInput>
    create: XOR<Class_StudentCreateWithoutClass_installmentsInput, Class_StudentUncheckedCreateWithoutClass_installmentsInput>
    where?: Class_StudentWhereInput
  }

  export type Class_StudentUpdateToOneWithWhereWithoutClass_installmentsInput = {
    where?: Class_StudentWhereInput
    data: XOR<Class_StudentUpdateWithoutClass_installmentsInput, Class_StudentUncheckedUpdateWithoutClass_installmentsInput>
  }

  export type Class_StudentUpdateWithoutClass_installmentsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    class?: ClassUpdateOneRequiredWithoutClass_studentsNestedInput
    student?: UserUpdateOneRequiredWithoutClass_studentsNestedInput
  }

  export type Class_StudentUncheckedUpdateWithoutClass_installmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VocalRecordingAppointmentDetailCreateWithoutAppointmentInput = {
    time_in: string
    time_out: string
    note?: string | null
    status?: string
    isCancel?: boolean
    user: UserCreateNestedOneWithoutAppointmentsInput
    payments?: PaymentCreateNestedManyWithoutAppointmentInput
  }

  export type VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput = {
    id?: number
    time_in: string
    time_out: string
    note?: string | null
    user_id: number
    status?: string
    isCancel?: boolean
    payments?: PaymentUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type VocalRecordingAppointmentDetailCreateOrConnectWithoutAppointmentInput = {
    where: VocalRecordingAppointmentDetailWhereUniqueInput
    create: XOR<VocalRecordingAppointmentDetailCreateWithoutAppointmentInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput>
  }

  export type VocalRecordingAppointmentDetailCreateManyAppointmentInputEnvelope = {
    data: VocalRecordingAppointmentDetailCreateManyAppointmentInput | VocalRecordingAppointmentDetailCreateManyAppointmentInput[]
    skipDuplicates?: boolean
  }

  export type VocalRecordingAppointmentDetailUpsertWithWhereUniqueWithoutAppointmentInput = {
    where: VocalRecordingAppointmentDetailWhereUniqueInput
    update: XOR<VocalRecordingAppointmentDetailUpdateWithoutAppointmentInput, VocalRecordingAppointmentDetailUncheckedUpdateWithoutAppointmentInput>
    create: XOR<VocalRecordingAppointmentDetailCreateWithoutAppointmentInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutAppointmentInput>
  }

  export type VocalRecordingAppointmentDetailUpdateWithWhereUniqueWithoutAppointmentInput = {
    where: VocalRecordingAppointmentDetailWhereUniqueInput
    data: XOR<VocalRecordingAppointmentDetailUpdateWithoutAppointmentInput, VocalRecordingAppointmentDetailUncheckedUpdateWithoutAppointmentInput>
  }

  export type VocalRecordingAppointmentDetailUpdateManyWithWhereWithoutAppointmentInput = {
    where: VocalRecordingAppointmentDetailScalarWhereInput
    data: XOR<VocalRecordingAppointmentDetailUpdateManyMutationInput, VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutAppointmentInput>
  }

  export type UserCreateWithoutAppointmentsInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    type: UserTypeCreateNestedOneWithoutUsersInput
    attendance?: AttendanceCreateNestedManyWithoutUserInput
    class_students?: Class_StudentCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    typeId: number
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    attendance?: AttendanceUncheckedCreateNestedManyWithoutUserInput
    class_students?: Class_StudentUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
  }

  export type VocalRecordingAppointmentCreateWithoutDetailsInput = {
    date: string
    status: string
    note?: string | null
  }

  export type VocalRecordingAppointmentUncheckedCreateWithoutDetailsInput = {
    id?: number
    date: string
    status: string
    note?: string | null
  }

  export type VocalRecordingAppointmentCreateOrConnectWithoutDetailsInput = {
    where: VocalRecordingAppointmentWhereUniqueInput
    create: XOR<VocalRecordingAppointmentCreateWithoutDetailsInput, VocalRecordingAppointmentUncheckedCreateWithoutDetailsInput>
  }

  export type PaymentCreateWithoutAppointmentInput = {
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutAppointmentInput = {
    id?: number
    user_id: number
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
  }

  export type PaymentCreateOrConnectWithoutAppointmentInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutAppointmentInput, PaymentUncheckedCreateWithoutAppointmentInput>
  }

  export type PaymentCreateManyAppointmentInputEnvelope = {
    data: PaymentCreateManyAppointmentInput | PaymentCreateManyAppointmentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAppointmentsInput = {
    update: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateWithoutAppointmentsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    type?: UserTypeUpdateOneRequiredWithoutUsersNestedInput
    attendance?: AttendanceUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    attendance?: AttendanceUncheckedUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VocalRecordingAppointmentUpsertWithoutDetailsInput = {
    update: XOR<VocalRecordingAppointmentUpdateWithoutDetailsInput, VocalRecordingAppointmentUncheckedUpdateWithoutDetailsInput>
    create: XOR<VocalRecordingAppointmentCreateWithoutDetailsInput, VocalRecordingAppointmentUncheckedCreateWithoutDetailsInput>
    where?: VocalRecordingAppointmentWhereInput
  }

  export type VocalRecordingAppointmentUpdateToOneWithWhereWithoutDetailsInput = {
    where?: VocalRecordingAppointmentWhereInput
    data: XOR<VocalRecordingAppointmentUpdateWithoutDetailsInput, VocalRecordingAppointmentUncheckedUpdateWithoutDetailsInput>
  }

  export type VocalRecordingAppointmentUpdateWithoutDetailsInput = {
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VocalRecordingAppointmentUncheckedUpdateWithoutDetailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUpsertWithWhereUniqueWithoutAppointmentInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutAppointmentInput, PaymentUncheckedUpdateWithoutAppointmentInput>
    create: XOR<PaymentCreateWithoutAppointmentInput, PaymentUncheckedCreateWithoutAppointmentInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutAppointmentInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutAppointmentInput, PaymentUncheckedUpdateWithoutAppointmentInput>
  }

  export type PaymentUpdateManyWithWhereWithoutAppointmentInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutAppointmentInput>
  }

  export type UserCreateWithoutPaymentsInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    type: UserTypeCreateNestedOneWithoutUsersInput
    attendance?: AttendanceCreateNestedManyWithoutUserInput
    appointments?: VocalRecordingAppointmentDetailCreateNestedManyWithoutUserInput
    class_students?: Class_StudentCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    typeId: number
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    attendance?: AttendanceUncheckedCreateNestedManyWithoutUserInput
    appointments?: VocalRecordingAppointmentDetailUncheckedCreateNestedManyWithoutUserInput
    class_students?: Class_StudentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type VocalRecordingAppointmentDetailCreateWithoutPaymentsInput = {
    time_in: string
    time_out: string
    note?: string | null
    status?: string
    isCancel?: boolean
    user: UserCreateNestedOneWithoutAppointmentsInput
    appointment: VocalRecordingAppointmentCreateNestedOneWithoutDetailsInput
  }

  export type VocalRecordingAppointmentDetailUncheckedCreateWithoutPaymentsInput = {
    id?: number
    appointment_id: number
    time_in: string
    time_out: string
    note?: string | null
    user_id: number
    status?: string
    isCancel?: boolean
  }

  export type VocalRecordingAppointmentDetailCreateOrConnectWithoutPaymentsInput = {
    where: VocalRecordingAppointmentDetailWhereUniqueInput
    create: XOR<VocalRecordingAppointmentDetailCreateWithoutPaymentsInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    type?: UserTypeUpdateOneRequiredWithoutUsersNestedInput
    attendance?: AttendanceUpdateManyWithoutUserNestedInput
    appointments?: VocalRecordingAppointmentDetailUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    attendance?: AttendanceUncheckedUpdateManyWithoutUserNestedInput
    appointments?: VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type VocalRecordingAppointmentDetailUpsertWithoutPaymentsInput = {
    update: XOR<VocalRecordingAppointmentDetailUpdateWithoutPaymentsInput, VocalRecordingAppointmentDetailUncheckedUpdateWithoutPaymentsInput>
    create: XOR<VocalRecordingAppointmentDetailCreateWithoutPaymentsInput, VocalRecordingAppointmentDetailUncheckedCreateWithoutPaymentsInput>
    where?: VocalRecordingAppointmentDetailWhereInput
  }

  export type VocalRecordingAppointmentDetailUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: VocalRecordingAppointmentDetailWhereInput
    data: XOR<VocalRecordingAppointmentDetailUpdateWithoutPaymentsInput, VocalRecordingAppointmentDetailUncheckedUpdateWithoutPaymentsInput>
  }

  export type VocalRecordingAppointmentDetailUpdateWithoutPaymentsInput = {
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    appointment?: VocalRecordingAppointmentUpdateOneRequiredWithoutDetailsNestedInput
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointment_id?: IntFieldUpdateOperationsInput | number
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AttendanceCreateManyUserInput = {
    id?: number
    date: Date | string
    time_in: Date | string
    time_out?: Date | string | null
    note?: string | null
  }

  export type VocalRecordingAppointmentDetailCreateManyUserInput = {
    id?: number
    appointment_id: number
    time_in: string
    time_out: string
    note?: string | null
    status?: string
    isCancel?: boolean
  }

  export type Class_StudentCreateManyStudentInput = {
    id?: number
    class_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
  }

  export type PaymentCreateManyUserInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    appointment_id: number
  }

  export type AttendanceUpdateWithoutUserInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time_in?: DateTimeFieldUpdateOperationsInput | Date | string
    time_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendanceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time_in?: DateTimeFieldUpdateOperationsInput | Date | string
    time_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendanceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time_in?: DateTimeFieldUpdateOperationsInput | Date | string
    time_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VocalRecordingAppointmentDetailUpdateWithoutUserInput = {
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
    appointment?: VocalRecordingAppointmentUpdateOneRequiredWithoutDetailsNestedInput
    payments?: PaymentUpdateManyWithoutAppointmentNestedInput
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointment_id?: IntFieldUpdateOperationsInput | number
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
    payments?: PaymentUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointment_id?: IntFieldUpdateOperationsInput | number
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Class_StudentUpdateWithoutStudentInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    class?: ClassUpdateOneRequiredWithoutClass_studentsNestedInput
    class_installments?: Class_InstallmentUpdateManyWithoutClass_studentNestedInput
  }

  export type Class_StudentUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    class_installments?: Class_InstallmentUncheckedUpdateManyWithoutClass_studentNestedInput
  }

  export type Class_StudentUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentUpdateWithoutUserInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    appointment?: VocalRecordingAppointmentDetailUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    appointment_id?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    appointment_id?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateManyTypeInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    password: string
    contactNumber?: string | null
    address?: string | null
    city?: string | null
    district?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
  }

  export type UserUpdateWithoutTypeInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    attendance?: AttendanceUpdateManyWithoutUserNestedInput
    appointments?: VocalRecordingAppointmentDetailUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    attendance?: AttendanceUncheckedUpdateManyWithoutUserNestedInput
    appointments?: VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutUserNestedInput
    class_students?: Class_StudentUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Class_StudentCreateManyClassInput = {
    id?: number
    student_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
  }

  export type Class_StudentUpdateWithoutClassInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    student?: UserUpdateOneRequiredWithoutClass_studentsNestedInput
    class_installments?: Class_InstallmentUpdateManyWithoutClass_studentNestedInput
  }

  export type Class_StudentUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    class_installments?: Class_InstallmentUncheckedUpdateManyWithoutClass_studentNestedInput
  }

  export type Class_StudentUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Class_InstallmentCreateManyClass_studentInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
    installments_Due_Date?: Date | string
  }

  export type Class_InstallmentUpdateWithoutClass_studentInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    installments_Due_Date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Class_InstallmentUncheckedUpdateWithoutClass_studentInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    installments_Due_Date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Class_InstallmentUncheckedUpdateManyWithoutClass_studentInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    installments_Due_Date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocalRecordingAppointmentDetailCreateManyAppointmentInput = {
    id?: number
    time_in: string
    time_out: string
    note?: string | null
    user_id: number
    status?: string
    isCancel?: boolean
  }

  export type VocalRecordingAppointmentDetailUpdateWithoutAppointmentInput = {
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    payments?: PaymentUpdateManyWithoutAppointmentNestedInput
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateWithoutAppointmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
    payments?: PaymentUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type VocalRecordingAppointmentDetailUncheckedUpdateManyWithoutAppointmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    time_in?: StringFieldUpdateOperationsInput | string
    time_out?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isCancel?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentCreateManyAppointmentInput = {
    id?: number
    user_id: number
    amount: Decimal | DecimalJsLike | number | string
    note?: string | null
    status?: string
    paymentDate?: Date | string
    paymentMethod?: string
    paymentType?: $Enums.PaymentType
    createdAt?: Date | string
    updatedAt?: Date | string
    deleteStatus?: boolean
  }

  export type PaymentUpdateWithoutAppointmentInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutAppointmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentUncheckedUpdateManyWithoutAppointmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleteStatus?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}