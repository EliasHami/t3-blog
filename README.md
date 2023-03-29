# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


alors pour comprendre 

1. dans prisma tu crée ton model et lance la commande pour generer le type et la bdd
2. dans server/api/root tu crée une route avec createTRPCRouter
  1. puis tu crée tes procédures avec publicProcedure
  2. tu valide les arguments avec input et zod
      ( bytheway ici tu peux extraire du schéma zod les arguments par exemple pour save un post)
  3. ensuite tu utilise query ou mutation 
  4. enfin tu utilise prisma pour faire une action CRUD
3. dans server/api/root tu rajoute ta route

4. côté client tu query en appelant la procédure 
    le retour est déjà typé ! 
6. pour poster tu utilise la mutation 
      dans le error tu as de quoi afficher l'erreur de submit
5. si tu veux generer la page en avance getstaticprops
    1. tu utilise createProxySSGHelpers pour pouvoir prefetch
    2. tu prefetch et tu retourne l'id en props
    3. tu utilise useQuery pour récupérer les données qui instantanément disponible car déjà prefetch 
