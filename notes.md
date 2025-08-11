# short summary
# 🧠 Next.js + Auth + Env Summary

- `page.js` and `layout.js` are **hardcoded filenames** in the `app/` directory used for routing and layout structure.
- Next.js supports **file-based routing**, meaning folder structure defines the routes (`/about/page.js` becomes `/about`).
- `.env.local` is a **hardcoded filename** used to store sensitive environment variables like API keys or DB URIs.
- Variable **names in `.env.local` are not hardcoded**; you can define custom names and reference them via `process.env.YOUR_VAR`.
- `route.js` (when used) is a **custom file**, not hardcoded — but is commonly created by devs to manage routes cleanly (especially in React, not required in Next.js).
- OAuth (e.g., GitHub, Google) allows users to log in via their credentials; it's set up using provider client ID/secret stored in `.env.local`.

- onlClick{()=>{signIn("github)}}, without arrow function then argument starts executing on rendering itself

- hardcoded Files : [username], page.js, layout.js, .env.local

- Use <Link> for internal navigation in Next.js to preserve React state and avoid full page reloads, unlike <a> which resets the app and loses state data. Use <Link> for user-initiated navigation and useRouter().push() for programmatic redirects in code logic.

- param param na raha, ab next-15 mai await kerna padta hai, Asynchronous

# 1 📚 Routing in React vs Next.js
React uses `react-router-dom` for routing, requiring manual setup and component-based route declarations.  
Next.js uses file-based routing where special files like `page.js` and `layout.js` are hardcoded entry points.  
In React, routes are mapped in `App.js`, while in Next.js, file structure directly defines the routes.  
Next.js simplifies dynamic routing with folder names like `[id]`, and handles navigation with `Link` and `useRouter`.  
Choose React for full routing control; choose Next.js for convention, speed, and SEO benefits.


# 2
In Next.js App Router, routing is based on special file names like `page.js` and `layout.js`.  
These are hardcoded conventions—`page.js` defines the route’s content, and `layout.js` defines the UI wrapper.  
Each `page.js` is automatically passed as the `children` prop to the nearest `layout.js`.  
Layouts commonly include shared UI like `<Navbar />` and `<Footer />` around the page.  
This structure keeps your app clean, modular, and DRY (Don’t Repeat Yourself).

## 3-Liner Summary
The `/dashboard` route was being overridden by the `[username]` dynamic route because they were on the same level.  
I fixed it by creating a static `dashboard/` folder directly inside `app/`, so Next.js prioritizes it over the dynamic route.  

## 4-Liner Explanation
- Next.js uses **file-system routing** where folder names map to URLs.  
- **Static routes** (e.g., `dashboard/`) always take priority over **dynamic routes** (e.g., `[username]/`) at the same hierarchy level.  
- If both exist as siblings, `/dashboard` will resolve to the static folder first.  
- Placing `dashboard/` in `app/` alongside `[username]/` ensures `/dashboard` is not treated as a username.  


## 5- Problems
1. Using onBlur with Link - link ka link chal nahi raha tha bcz onBlur option's ko pehle hi band ker de rhaa tha, i.e link ka href fire hi nahi hu rhaa tha.

## 6- Yes — when you use session in NextAuth, you’re automatically using this JWT verification system under the hood (unless you switch to a database session strategy).

## 7-So useSession() or getServerSession() is basically reading the verified JWT and giving you the user info it contains

## 8-Without server actions

Client ➡ fetch() ➡ API route ➡ Database ➡ Return JSON ➡ Render

With server actions

Client ➡ directly call server function (skips API route) ➡ Database ➡ Return


## 9-script vs Script-nextjs-component
In Next.js, <Script> is a built-in component for loading and optimizing external scripts with control over load timing (beforeInteractive, afterInteractive, lazyOnload).

<script> is the standard HTML tag for adding JavaScript, but it lacks Next.js’s built-in optimizations.

Use <Script> in Next.js when you want performance benefits and controlled execution, and plain <script> only for very basic inline or static use cases.


## pese input leta hai ye, 10 != ₹10 , but 1000 = ₹10
                                    {[1000, 2000, 3000].map((preset) => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => pay(preset)}
                                            className="flex-1 bg-orange-500 py-2 rounded hover:bg-orange-600"
                                        >
                                            ₹{preset}


## 