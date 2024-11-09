export default function Home() {
  return (
    <div className="flex flex-col p-24 space-y-16">
      <header className="font-bold text-4xl">
        This is the requested App using Next 14, Typescript, TailwindCSS, Prisma, TRPC, zod, Zustand, JWT and Postgres.
        Also i have used shadcn/ui library for a clean and pretty interface.
      </header>
      <p className="font-semibold text-lg">
        Perform crud operations for users in a postgres database. Create, update and delete operations need
        authentication. You can see still the current users without authentication. Api calls using TRPC, zod for
        validation, state management with Zustand, TailwindCSS framework for styling and i have also used shadcn/ui
        library for a clean consistent and pretty interface!
      </p>
      <ul className="font-semibold text-md px-6 space-y-2">
        <li>1: Users List link for showing users (no need for authentication).</li>
        <li>
          2: By running <code className="bg-primary/90 text-white p-1">pnpm prisma db seed</code> you get an admin and a
          user accounts to demo.
        </li>
        <li>
          3: Admin Account: username{' '}
          <span className="bg-primary/80 italic text-white p-1">ve2maxAdmin@example.com</span> password{' '}
          <span className="bg-primary/80 italic text-white p-1">admin123</span> issuing a jwt for crud
        </li>
        <li>
          4: User Account: username <span className="bg-primary/80 italic text-white p-1">ve2maxUser@example.com</span>{' '}
          password <span className="bg-primary/80 italic text-white p-1">user123</span>
        </li>
        <li>
          5: Click Login Admin link to <span className="underline">authenticate</span>
        </li>
        <li>6: Authentication validates the token on the server and the db</li>
        <li>
          7: Create, update and delete operations of users on a postgres database (needs authentication via Login Admin
          link)
        </li>
        <li>
          8: I have also included some screenshots of the app and i have also included links with my portfolio website,
          github account and resume! Feel free to explore them!
        </li>
      </ul>
    </div>
  );
}
