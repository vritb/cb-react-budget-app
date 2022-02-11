# React Budget App (Typescript version)

To run:

```sh
npm install 
npm start 
```

## Acknowledgements

This work is based on [Chris Blakely's Video](https://www.youtube.com/watch?v=aeYxBd1it7I).
Code on [github](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa2F6WnhjOHpNRkQtczVRakhVVVIyTy1KUU4xd3xBQ3Jtc0ttd3lkaWYzTF9qX2JtcmVWQzJBTWZLbDQyN1JGYkg1LWYtcjFqTWtYa2YxM1JhYWp1UWkyN0ZDRkxURXR4b1NVLTM5T3lKRTljVU1hRkkyRDVBWDU5c085ODVOeGNXUE9ZWWdmeFd1SV9aa2dFbzJZNA&q=https%3A%2F%2Fgithub.com%2Fchrisblakely01%2Freact-budget-app).

## Modifications

### Environment

* Typescript 4.4.4

### Preparations

1. Install needed packages

   ```sh
   npm install
   npm install -D @types/uuid
   ```

1. Rename files

   `*.js | *.jsx --> *.tsx`

1. Rename HTML Attributes

   `class` -> `className`
   `for` -> `htmlFor`

1. Make sure Typescript is available

   ```sh
   tsc --version
   ```

1. Create Typescript Configuration

   Create the TypeScript configuration in file `tsconfig.json`.

   ```sh
   touch tsconfig.json
   ```

   Copy the following snippet into `tsconfig.json`

   ```json
    {
    "compilerOptions": {
        "target": "es5",
        "jsx": "react",
        "module": "esnext",
        "moduleResolution": "node",
        "allowJs": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noImplicitAny": true,
        "skipLibCheck": true,
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowSyntheticDefaultImports": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true
    },
    "include": ["src"]
    }

## Migration Tasks

Migrating JavaScript to TypeScript has different layers that need to be addressed:

* Using a typed language
* Adapting development artefacts

## Code-Walk-Through

Error messages and warnings will guide us to the migration process.
Don't get flattened by the high number of errors and/or files marked in red.
They will dispappear while fixing.

This appliation uses React Hooks to communicate via `createContext()`, `useContext()` and `useState()` between the components making up the application.
These will we used frequently so let us address them first.

Please be aware that Typescript is a typed language. In consequence we have to provide type information for the objects we want to use.

`createContext<T>(...)` is a hook/method that forces us to introduce a type for the objects we want to store and retrieve from the context.

In file `AppContext.tsx` we define the interface `AppContextInterface` which can be used as a type parameter to the `createContext()` method.

Our context contains two data objects *budget* and *expenses*. Both have to be typed.
*budget* is a number. *expenses* is an array of expense-objects.
We have to make the type of an expense object explicit so we define another interface Expense.

```typescript
export interface AppContextInterface {
  budget: number,
  expenses: Expense[],
  dispatch: (type: string, payload:any) => void,
}
```

```typescript
export interface Expense {
    id: string;
  name: string;
  cost: number;
}

```

The corrected code line should be

```typescript
export const AppContext = createContext<AppContextInterface|null>(null);
```

Next Problem: How to deal with `props` passed to our component? The existing code copies the contents of the `props.children` to the output.
We add a type to the children property we want to use:

```typescript
export const AppProvider = (children:React.ReactNode) => {...}
```

Now we can replace `props.children` with `children`.
